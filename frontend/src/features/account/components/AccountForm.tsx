import React, { useState, useEffect, useActionState } from "react";
import { TextField, Button, Box, CircularProgress, Alert } from "@mui/material";
import { authService } from "../services/accountService";
export const AccountForm = () => {
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
  if (loading) return <CircularProgress />;
  if (fetchError || !initialData)
    return <Alert severity="error">{fetchError}</Alert>;
  return (
    <Box
      component="form"
      action={formAction}
      key={
        initialData.firstName + initialData.lastName + initialData.phoneNumber
      }
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
    >
      {formState?.error && <Alert severity="error">{formState.message}</Alert>}
      {formState?.success && (
        <Alert severity="success">{formState.message}</Alert>
      )}

      <TextField
        label="Adres e-mail"
        name="email"
        defaultValue={initialData.email}
        disabled
      />

      <TextField
        label="Rola systemowa"
        name="role"
        defaultValue={initialData.role?.replace("ROLE_", "")}
        disabled
      />
      <TextField
        label="Imię"
        name="firstName"
        defaultValue={initialData.firstName}
        required
      />

      <TextField
        label="Nazwisko"
        name="lastName"
        defaultValue={initialData.lastName}
        required
      />

      <TextField
        label="Numer telefonu"
        name="phoneNumber"
        defaultValue={initialData.phoneNumber}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending}
      >
        {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
      </Button>
    </Box>
  );
};
