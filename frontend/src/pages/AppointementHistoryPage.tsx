import { useEffect, useState } from "react";
import {
  CircularProgress,
  Alert,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { appointmentService } from "../features/appointment/services/appointmentService";
import type { AppointmentSlot } from "../features/appointment/types";
import AppointmentHistoryCard from "../features/appointment/components/AppointmentHistoryCard";
export default function AppointementHistoryPage() {
  const [appointments, setAppointments] = useState<AppointmentSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    appointmentService
      .getMyAppointmentHistory()
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Wystąpił błąd podczas pobierania historii wizyt.");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
      >
        Moje Wizyty
      </Typography>
      {appointments.length === 0 ? (
        <Alert severity="info">
          Nie masz jeszcze żadnych zapisanych wizyt.
        </Alert>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {appointments.map((appointment) => (
            <AppointmentHistoryCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
