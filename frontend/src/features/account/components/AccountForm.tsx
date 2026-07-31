import React, { useState, useEffect, useActionState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Typography,
  useTheme,
  alpha,
  InputAdornment,
} from "@mui/material";
import { Email, Badge, Person, Phone, Save } from "@mui/icons-material";
import { authService } from "../services/accountService";
export const AccountForm = () => {
  const theme = useTheme();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getMyAccount();
        setInitialData(data);
      } catch (err) {
        setFetchError("Nie udało się pobrać danych profilu z serwera.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  const [formState, formAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      try {
        const requestPayload = {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          phoneNumber: formData.get("phoneNumber") as string,
        };
        const updatedProfile =
          await authService.updateMyAccount(requestPayload);
        setInitialData(updatedProfile);
        return {
          success: true,
          message: "Profil został zaktualizowany pomyślnie!",
        };
      } catch (err) {
        return {
          error: true,
          message: "Wystąpił błąd podczas zapisywania zmian.",
        };
      }
    },
    null,
  );
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (fetchError || !initialData) {
    return (
      <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        {fetchError}
      </Alert>
    );
  }
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        <Box
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Moje Konto
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Zarządzaj swoimi danymi osobowymi oraz informacjami kontaktowymi.
            </Typography>
          </Box>
        </Box>
        <Box
          component="form"
          action={formAction}
          key={
            initialData.firstName +
            initialData.lastName +
            initialData.phoneNumber
          }
          sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}
        >
          {formState?.error && (
            <Alert severity="error">{formState.message}</Alert>
          )}
          {formState?.success && (
            <Alert severity="success">{formState.message}</Alert>
          )}
          <TextField
            label="Adres e-mail"
            name="email"
            defaultValue={initialData.email}
            disabled
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="Imię"
              name="firstName"
              defaultValue={initialData.firstName}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Nazwisko"
              name="lastName"
              defaultValue={initialData.lastName}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <TextField
            label="Numer telefonu"
            name="phoneNumber"
            defaultValue={initialData.phoneNumber}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              startIcon={<Save />}
              size="large"
              sx={{
                px: 4,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                "&:hover": {
                  boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.6)}`,
                },
              }}
            >
              {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
