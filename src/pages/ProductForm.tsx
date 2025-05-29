import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import * as api from "../api/productsApi";
import type { Product } from "../types/Product";

interface FormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  rating: number;
  photo: string;
}

export const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user)!;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      discount: 0,
      rating: 0,
      photo: "",
    },
  });

  const photoUrl = watch("photo");
  const [previewSrc, setPreviewSrc] = useState<string>("/fallback-image.png");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (photoUrl && photoUrl.trim() !== "") {
      if (photoUrl !== previewSrc) {
        setPreviewSrc(photoUrl);
        setHasError(false);
      }
    } else {
      if (previewSrc !== "/fallback-image.png") {
        setPreviewSrc("/fallback-image.png");
        setHasError(false);
      }
    }
  }, [photoUrl, previewSrc]);

  useEffect(() => {
    if (!isEdit) return;
    api
      .fetchProduct(id!, user.id)
      .then((prod) => {
        if (prod.ownerId !== user.id) {
          navigate("/products");
        } else {
          reset(prod);
        }
      })
      .catch(() => navigate("/products"));
  }, [id, isEdit, reset, user.id, navigate]);

  const onSubmit = async (data: FormValues) => {
    const payload: Omit<Product, "id"> = {
      ...data,
      ownerId: user.id,
    };

    try {
      if (isEdit) {
        await api.updateProduct(id!, payload);
      } else {
        await api.createProduct(payload);
      }
      navigate("/products");
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const onImageError = () => {
    if (!hasError) {
      setPreviewSrc("/fallback-image.png");
      setHasError(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          {isEdit ? "Edit Product" : "Add New Product"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 2, display: "flex", gap: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 240,
              height: 240,
              borderRadius: 2,
              backgroundColor: "#f0f0f0",
            }}
          >
            <Box
              component="img"
              src={previewSrc}
              alt="Preview Image"
              onError={onImageError}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>

          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              {...register("name", { required: true })}
              fullWidth
            />
            <TextField
              label="Description"
              {...register("description")}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", { required: true })}
              fullWidth
            />
            <TextField
              label="Category"
              {...register("category", { required: true })}
              fullWidth
            />
            <TextField
              label="Discount (%)"
              type="number"
              {...register("discount")}
              fullWidth
            />
            <TextField
              label="Rating"
              type="number"
              inputProps={{ step: 0.1, min: 0, max: 5 }}
              {...register("rating")}
              fullWidth
            />
            <TextField label="Photo URL" {...register("photo")} fullWidth />

            <Box textAlign="center" mt={2}>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isEdit ? "Update Product" : "Create Product"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
