import React from "react";
import { TextField } from "@mui/material";
import { IField } from "../types";

export const Field: React.FC<IField> = ({
  name,
  label,
  type,
  id,
  error,
  helperText,
  register,
}) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={type ? type : "text"}
      id={id}
      size="small"
      error={error}
      helperText={helperText}
      {...register}
    />
  );
};
