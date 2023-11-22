import React from "react";
import Login from "./Login";

const ProtectedRoutes = (props) => {
  const { Component } = props;

  let login = localStorage.getItem("Login");
  if (!login) {
    return <Login />;
  }

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoutes;
