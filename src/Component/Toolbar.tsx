import React, { useEffect, useState } from "react";
import { Button, IconButton, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hook";
import {
  blockUsers,
  deleteUsers,
  unblockUsers,
} from "../redux/slices/userSlice";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { IUserData } from "../types";

export default function Toolbar() {
  const [stateButton, setStateButton] = useState(true);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);

  const checkUsersId = (props: IUserData[]) => {
    let ids: string[] = [];
    props.forEach((element: IUserData) => {
      if (element.cheked) {
        ids.push(element.id);
      }
    });
    return ids;
  };

  useEffect(() => {
    setStateButton(!Boolean(users.filter((element) => element.cheked === true).length))
  }, [users]);

  return (
    <Paper sx={{ mt: 2, mb: 2, padding: 1 }}>
      <Button
        variant="contained"
        onClick={() => dispatch(blockUsers(checkUsersId(users)))}
        disabled={stateButton}
      >
        block
      </Button>
      <IconButton
        color="primary"
        onClick={() => dispatch(unblockUsers(checkUsersId(users)))}
        disabled={stateButton}
      >
        <LockOpenIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => dispatch(deleteUsers(checkUsersId(users)))}
        disabled={stateButton}
      >
        <PersonRemoveIcon />
      </IconButton>
    </Paper>
  );
}
