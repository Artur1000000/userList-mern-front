import React, { useEffect } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Field } from "../Component/Field";
import { useForm } from "react-hook-form";
import { FormInputs } from "./AuthPage";
import {
  checkIsAuth,
  registerUser,
} from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { useNavigate } from "react-router-dom";
import { ISendData } from "../types";

export default function RegistrationPage() {
  const isAuth = useAppSelector(checkIsAuth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      userName: "",
      password: "",
    },
  });

  const onSubmit = (data: FormInputs) => {
    const date = new Date();
    const sendData: ISendData = {
      email: data.email,
      password: data.password,
      userName: data.userName,
      localLoginDate: date.getTime(),
      localRegDate: date.getTime(),
    };
    dispatch(registerUser(sendData));
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <Grid
      className="body-page"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          maxHeight: "400px",
          width: "40%",
          padding: "15px 25px",
          boxSizing: "border-box",
          marginTop: "150px",
        }}
      >
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Field
            id="email"
            label="Email"
            register={{
              ...register("email", {
                required: "Required Field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Incorrect Email",
                },
              }),
            }}
            error={!!errors?.email}
            helperText={errors?.email && errors.email.message}
          />
          <Field
            id="userName"
            label="User Name"
            register={{
              ...register("userName", {
                required: "Required Field",
                minLength: {
                  value: 1,
                  message: "min 1 symbols",
                },
              }),
            }}
            error={!!errors?.userName}
            helperText={errors?.userName && errors.userName.message}
          />
          <Field
            id="password"
            label="Password"
            type="password"
            register={{
              ...register("password", {
                required: "Required Field",
                pattern: {
                  value: /[A-Za-z0-9]{1,30}/,
                  message: "A-Z, a-z, 0-9",
                },
                maxLength: {
                  value: 30,
                  message: "max 30 symbols",
                },
                minLength: {
                  value: 1,
                  message: "min 1 symbols",
                },
              }),
            }}
            error={!!errors?.password}
            helperText={errors?.password && errors.password.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid}
          >
            Registration
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
