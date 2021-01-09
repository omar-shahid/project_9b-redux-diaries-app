import React, { useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

function Dashboard() {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <NavBar />
    </>
  );
}

export default Dashboard;
