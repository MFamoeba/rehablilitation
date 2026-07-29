import { useEffect, useState } from "react";
import { Typography, CircularProgress, Alert, Box } from "@mui/material";
import { appointmentService } from "../services/appointmentService";
import type { AppointmentSlotDetails } from "../types";
import AppointmentHistoryCard from "./AppointmentHistoryCard";
export default function PatientAppointmentList() {
  const [appointments, setAppointments] = useState<AppointmentSlotDetails[]>(
    [],
  );
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
        console.error("Błąd pobierania historii wizyt", err);
        setError(
          "Nie udało się pobrać historii wizyt. Spróbuj ponownie później.",
        );
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (appointments.length === 0) {
    return <Alert severity="info">Brak historii wizyt na Twoim koncie.</Alert>;
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {appointments.map((appointment) => (
        <AppointmentHistoryCard
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </Box>
  );
}
