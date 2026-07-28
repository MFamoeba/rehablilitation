import { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Alert } from "@mui/material";
import type { Procedure } from "../types";
import { procedureService } from "../services/procedureService";
import ProcedureCard from "./ProcedureCard";
export default function ProceduresList() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    procedureService
      .getAllProcedures()
      .then((data) => {
        setProcedures(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Nie udało się załadować listy procedur.");
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
  if (procedures.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Brak zarejestrowanych procedur w systemie.
      </Alert>
    );
  }
  return (
    <Grid container spacing={3}>
      {procedures.map((procedure) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={procedure.id}>
          <ProcedureCard procedure={procedure} />
        </Grid>
      ))}
    </Grid>
  );
}
