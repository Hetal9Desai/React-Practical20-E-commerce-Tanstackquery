import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signup } from "../features/auth/authSlice";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Must be a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((s) => s.auth);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current === "loading" && status === "idle" && !error) {
      setShowSuccess(true);

      setTimeout(() => navigate("/signin", { replace: true }), 1500);
    }

    if (status === "failed" && error) {
      setShowError(true);
    }
    prevStatus.current = status;
  }, [status, error, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    setShowError(false);
    await dispatch(
      signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .catch(() => {});
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Create Account
      </Typography>

      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirm Password"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" disabled={status === "loading"}>
        {status === "loading" ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Link component={RouterLink} to="/signin">
          Sign In
        </Link>
      </Typography>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ width: "100%" }}
        >
          Signup successful! Redirecting to Sign In…
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          onClose={() => setShowError(false)}
          sx={{ width: "100%" }}
        >
          {error ?? "Registration failed, please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};
