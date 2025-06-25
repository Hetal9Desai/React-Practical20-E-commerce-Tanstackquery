import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector } from "./Hooks/hooks";
import { ProtectedRoute } from "./componennts/ProtectedRoute/ProtectedRoute";
import { Navbar } from "./componennts/Navbar/Navbar";
import { SignIn } from "./componennts/SignIn/SignIn";
import { SignUp } from "./componennts/SignUp/SignUp";
import { ProductList } from "./componennts/Product/ProductList";
import { ProductForm } from "./componennts/Product/ProductForm";
import { NotFound } from "./componennts/NotFound/NotFound";

const AppRoutes: React.FC = () => {
  const { user, status } = useAppSelector((state) => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (status === "idle" && user) {
      setSnackbarOpen(true);
    }
  }, [status, user]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const HomeRedirect = () => {
    return user ? (
      <Navigate to="/products" replace />
    ) : (
      <Navigate to="/signin" replace />
    );
  };

  return (
    <>
      <Navbar />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login successful
        </Alert>
      </Snackbar>

      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<ProtectedRoute reverse />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="products" element={<ProductList />} />
          <Route path="add-product" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
