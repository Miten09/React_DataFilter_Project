import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (name === "miten" && password === "1234") {
      navigate("/encounters");
      localStorage.setItem("Login", name);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Login")) {
      navigate("/encounters");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "10%" }}>
      <h2>Login Form</h2>
      <TextField
        id="outlined-basic"
        value={name}
        name="name"
        label="Your Name"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        type="email"
        required
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        value={password}
        label="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        type="password"
        required
      />
      <br />
      <br />
      <Button variant="contained" color="success" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
