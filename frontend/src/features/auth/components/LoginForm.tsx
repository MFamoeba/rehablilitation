import React, { useState, useEffect } from "react";
import { useAccountState } from "../context/AccountStateContext";
import { authService } from "../services/authService";
import type { AuthenticationRequest } from "../types";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

export const LoginForm: React.FC = () => {
  const { login, isAuthenticated, parsedToken } = useAccountState();
  const [formData, setFormData] = useState<AuthenticationRequest>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && parsedToken) {
      if (
        parsedToken.role === "ROLE_ADMIN" ||
        parsedToken.role === "ROLE_MANAGER"
      ) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/appointments", { replace: true });
      }
    }
  }, [isAuthenticated, parsedToken, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Uzupełnij wszystkie pola.");
      return;
    }

    setLoading(true);

    try {
      const data = await authService.login(formData);
      login(data.token);
    } catch (err: any) {
      setError(err.message || "Wystąpił nieoczekiwany błąd logowania.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        width: "100%",
        padding: 4,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: 1,
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Panel Logowania
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <TextField
          type="email"
          id="email"
          name="email"
          label="Email"
          placeholder="np. jan.kowalski@wp.pl"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          fullWidth
          required
        />

        <TextField
          type="password"
          id="password"
          name="password"
          label="Hasło"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          fullWidth
          endIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <LoginIcon />
            )
          }
        >
          {loading ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </Box>
    </Box>
  );
};
