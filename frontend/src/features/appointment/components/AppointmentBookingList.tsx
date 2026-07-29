import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import AppointmentBookingCard from "./AppointmentBookingCard";
import { appointmentService } from "../services/appointmentService";
import type { AppointmentSlot } from "../types";
interface Props {
  therapistId: string;
  date: string;
}
export default function AppointmentBookingList({ therapistId, date }: Props) {
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!therapistId || !date) {
      setSlots([]);
      return;
    }
    setLoading(true);
    setError(null);
    appointmentService
      .getAppointmentSlotsForDate(therapistId, date)
      .then((data) => {
        setSlots(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd pobierania slotów", err);
        setError("Nie udało się pobrać dostępnych terminów.");
        setLoading(false);
      });
  }, [therapistId, date]);
  const handleBook = (slotId: string) => {
    appointmentService
      .bookAppointmentSlot(slotId)
      .then(() => alert("Rezerwacja udana!"))
      .catch(() => alert("Błąd rezerwacji"));
  };
  if (!therapistId || !date) {
    return (
      <Typography variant="body2" color="text.secondary">
        Wybierz terapeutę oraz datę, aby zobaczyć wolne terminy.
      </Typography>
    );
  }
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
  if (slots.length === 0) {
    return <Alert severity="info">Brak wolnych terminów w tym dniu.</Alert>;
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
      {slots.map((slot) => (
        <AppointmentBookingCard key={slot.id} slot={slot} onBook={handleBook} />
      ))}
    </Box>
  );
}
