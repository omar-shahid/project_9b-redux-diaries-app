import { createServer, Response } from "miragejs";
import * as yup from "yup";
import { v4 } from "uuid";

const USERS = [];
const NOTES = [];
/**
 * type Notes = {
 *  content: string
 *  createdAt: date
 *  userId: number
 * }
 */

/**
 * type User = {
 *   name: string
 *   email: string
 *   password: string
 * }
 */

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should atleast have 8 characters"),
  confPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup.string().required("Password is required"),
});

function startServer() {
  createServer({
    routes() {
      this.namespace = "api";
      this.post("/register", (schema, req) => {
        const body = JSON.parse(req.requestBody);
        // registerSchema.
        return registerSchema
          .validate(body.values, { abortEarly: false })
          .then((user) => {
            user.token = v4();
            USERS.push(user);
            return {
              token: user.token,
              name: user.name,
              userId: USERS.length - 1,
            };
          })
          .catch((e) => {
            console.log(e.inner[0]);
            return new Response(
              400,
              {},
              e.inner.map((el) => el.message)
            );
          });
      });

      this.post("/login", (_, req) => {
        const body = JSON.parse(req.requestBody);
        return loginSchema
          .validate(body.values, { abortEarly: false })
          .then((user) => {
            const userFound = USERS.find((el) => el.email === user.email);
            if (!userFound) return new Response(400, {}, ["User not found"]);
            if (userFound.password !== user.password)
              return new Response(400, {}, ["Icorrect Password"]);
            const token = v4();
            USERS[USERS.indexOf(userFound)].token = token;
            return {
              token,
              name: userFound.name,
              userId: USERS.indexOf(userFound),
            };
          })
          .catch((e) => {
            console.log(e);
            return new Response(
              400,
              {},
              e.inner.map((el) => el.message)
            );
          });
      });

      this.post("/notes", (_, req) => {
        const { values } = JSON.parse(req.requestBody);
        if (!values.token || values.token !== USERS[values.userId].token)
          return new Response(400, {}, ["invalid token"]);
        return NOTES.filter((el) => el.userId === values.userId);
      });

      this.get("/users", () => USERS);
      this.post("/notes/create", (_, req) => {
        const { values } = JSON.parse(req.requestBody);

        if (!values.token || values.token !== USERS[values.userId].token)
          return new Response(400, {}, ["invalid token"]);
        const newNote = {
          id: v4(),
          content: values.content,
          createdAt: new Date(),
          userId: values.userId,
        };
        NOTES.push(newNote);
        return newNote;
      });

      this.post("/notes/edit", (_, req) => {
        const { values } = JSON.parse(req.requestBody);

        if (!values.token || values.token !== USERS[values.userId].token)
          return new Response(400, {}, ["invalid token"]);

        const notesFound = NOTES.find((el) => el.id === values.note.id);
        if (!notesFound) return new Response(404, {}, ["note not found"]);
        NOTES[NOTES.indexOf(notesFound)] = values.note;
        return NOTES[NOTES.indexOf(notesFound)];
      });
    },
  });
}

export default startServer;
