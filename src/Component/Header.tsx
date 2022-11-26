import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ButtonLink } from "./ButtonLink";
import { useAppDispatch, useAppSelector } from "../hook";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/slices/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);
  const local = useLocation();

  const navigate = useNavigate();
  const submitLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "end" }}>
          {!isAuth && local.pathname === "/registration" && (
            <ButtonLink path="/login" title="Login" />
          )}
          {!isAuth && local.pathname === "/login" && (
            <ButtonLink path="/registration" title="Registration" />
          )}
          {isAuth && local.pathname === "/dashboard" && (
            <ButtonLink path="/login" title="Logout" onClick={submitLogout} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
