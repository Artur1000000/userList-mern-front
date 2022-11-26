import React, { useEffect } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Field } from "../Component/Field";
import { authUser, checkIsAuth } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUserDataSend } from "../types";

export type FormInputs = {
  email: string;
  password: string;
  userName?: string;
};

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const isAuth = useAppSelector(checkIsAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: FormInputs) => {
    const date = new Date();
    const userData: IUserDataSend = {
      email: data.email,
      password: data.password,
      localLoginDate: date.getTime(),
    };
    dispatch(authUser(userData));
  };

  useEffect(() => {
    if (isAuth) navigate("/dashboard");
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
          maxHeight: "300px",
          width: "40%",
          padding: "15px 25px",
          boxSizing: "border-box",
          marginTop: "150px",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
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
            label="Password"
            type="password"
            id="password"
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
                  message: "min 4 symbols",
                },
              }),
            }}
            error={!!errors?.password}
            helperText={errors?.password && errors.password.message}
          />
          {status !== "loading" && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Sign In
            </Button>
          )}
          {status === "loading" && <CircularProgress />}
        </Box>
      </Paper>
    </Grid>
  );
}
