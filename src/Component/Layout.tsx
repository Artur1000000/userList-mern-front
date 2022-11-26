import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { checkIsAuth, getMe } from "../redux/slices/authSlice";
import Header from "./Header";

export const Layout = () => {
  const isAuth = useAppSelector(checkIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.data);

  useEffect(() => {
    let token = window.localStorage.getItem("token");

    if (!isAuth && !token) return navigate("/login", { replace: true });
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, users]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
