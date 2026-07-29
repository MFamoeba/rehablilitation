import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { appointmentService } from "../services/appointmentService";
import type { AppointmentSlotDetails } from "../types";
interface Props {
  date: string;
}

export default function DoctorAppointmentList({ date }: Props) {
  const [appointments, setAppointments] = useState<AppointmentSlotDetails[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!date) {
      setAppointments([]);
      return;
    }
    setLoading(true);
    appointmentService
      .getMyScheduledAppointmentsForDate(date)
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Nie udało się pobrać historii wizyt.");
        setLoading(false);
      });
  }, [date]);
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (appointments.length === 0)
    return <Alert severity="info">Brak historii wizyt.</Alert>;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {appointments.map((appt) => (
        <DoctorAppointmentCard key={appt.id} appointment={appt} />
      ))}
    </Box>
  );
}
