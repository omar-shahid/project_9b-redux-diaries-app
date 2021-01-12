import { PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { logout } from "../features/userSlice";
import { AuthErrorResponse } from "../types";

const CheckForToken = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [action, setAction] = useState<[{ payload: unknown }, () => void]>();
  useEffect(() => {
    if (!action) return;
    const payload = action[0].payload as AuthErrorResponse;
    if (
      payload?.haveErrors &&
      payload.errors?.length &&
      payload.errors.includes("invalid token")
    ) {
      dispatch(logout());
      navigate("/login?invalidToken=true");
    } else {
      action[1]();
    }
    return () => {};
  }, [action, dispatch, navigate]);
  return setAction;
};

export default CheckForToken;
