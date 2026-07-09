import { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Alert } from "@mui/material";
import type { Therapist } from "../types";
import { therapistService } from "../services/therapistService";
import TherapistCard from "./TherapistCard";
export default function TherapistList() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    therapistService
      .getAllTherapists()
      .then((data) => {
        setTherapists(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Nie udało się załadować listy terapeutów.");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "30vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }
  if (therapists.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Brak zarejestrowanych terapeutów w systemie.
      </Alert>
    );
  }
  return (
    <Grid container spacing={3}>
      {therapists.map((therapist) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={therapist.id}>
          <TherapistCard therapist={therapist} />
        </Grid>
      ))}
    </Grid>
  );
}
