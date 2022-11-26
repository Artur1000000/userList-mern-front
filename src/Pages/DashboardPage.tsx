import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import {
  check,
  checkAllOff,
  checkAllOn,
  getUsers,
} from "../redux/slices/userSlice";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Toolbar from "../Component/Toolbar";
// import "./App.css";


export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);
  const auth = useAppSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const stateCheck: () => boolean = () => {
    return (
      users.filter((element) => element.cheked === true).length === users.length
    );
  };

  const handleCheckboxAll = () => {
    stateCheck() ? dispatch(checkAllOff()) : dispatch(checkAllOn());
  };

  const stringDate = (prop: number) => {
    return String(new Date(prop));
  };

  return (
    <>
      <Toolbar />
      <TableContainer
        component={Paper}
        sx={{ padding: 5, boxSizing: "border-box" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  checked={stateCheck()}
                  onChange={handleCheckboxAll}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Registration</TableCell>
              <TableCell align="right">Last Visit</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user, index) => {
                return (
                  <TableRow key={user.id} className={`${auth?.id===user.id && "current"}`}>
                    <TableCell align="left">
                      <Checkbox
                        checked={user.cheked}
                        onChange={() => dispatch(check(user.id))}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell align="left">{index}</TableCell>
                    <TableCell align="right">{user.userName}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      {stringDate(user.localRegDate)}
                    </TableCell>
                    <TableCell align="right">
                      {stringDate(user.localLoginDate)}
                    </TableCell>
                    <TableCell align="right">
                      {user.status ? "active" : "block"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
