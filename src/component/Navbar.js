import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("Login");

  function handleLogout() {
    localStorage.removeItem("Login");
    navigate("/login");
  }

  const location = useLocation();

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Welcome {name}</div>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <hr />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "1200px",
            width: "10%",
            border: "1px solid black",
            margin: "5px",
          }}
        >
          {location.pathname === "/encounters" ? (
            "Encounters"
          ) : (
            <NavLink to="/encounters">Encounters</NavLink>
          )}
          <br />
          <br />
          {location.pathname === "/patients" ? (
            "Patients"
          ) : (
            <NavLink to="/patients">Patients</NavLink>
          )}

          <Divider />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
