import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { appointmentService } from "../services/appointmentService";
import type { AppointmentSlotDetails } from "../types";
interface Props {
  patientId: string;
}

export default function TherapistPatientAppointmentHistoryList({
  patientId,
}: Props) {
  const [appointments, setAppointments] = useState<AppointmentSlotDetails[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!patientId) {
      setAppointments([]);
      return;
    }
    setLoading(true);
    appointmentService
      .getMyPatientAppointmentHistory(patientId)
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Nie udało się pobrać historii wizyt.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (appointmentId: string) => {
    try {
      await appointmentService.deleteAppointment(appointmentId);
      setAppointments((prev) =>
        prev.filter((appt) => appt.id !== appointmentId),
      );
    } catch (err) {
      console.error("Błąd podczas usuwania slotu", err);
      alert("Nie udało się usunąć wizyty.");
    }
  };
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
        <DoctorAppointmentCard
          key={appt.id}
          appointment={appt}
          onDelete={handleDelete}
        />
      ))}
    </Box>
  );
}
