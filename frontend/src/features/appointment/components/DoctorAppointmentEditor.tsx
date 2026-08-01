import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import type {
  AppointmentSlotDetails,
  UpdateAppointmentSlotDetails,
} from "../types";
import { appointmentService } from "../services/appointmentService";
import TherapistPatientAppointmentHistoryList from "./TherapistPatientAppointmentHistoryList";
interface AppointmentSlotEditorProps {
  appointmentId: string;
  onSuccess?: () => void;
}
export default function AppointmentSlotEditor({
  appointmentId,
  onSuccess,
}: AppointmentSlotEditorProps) {
  const [appointment, setAppointment] = useState<AppointmentSlotDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateAppointmentSlotDetails>({
    status: "SCHEDULED",
    isPaid: false,
    notes: "",
    medicalAdvice: "",
  });
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data =
          await appointmentService.getAppointmentDetails(appointmentId);

        setAppointment(data);

        setFormData({
          status: data.status,
          isPaid: data.isPaid,
          notes: data.notes || "",
          medicalAdvice: data.medicalAdvice || "",
        });
      } catch (err) {
        console.error("Błąd pobierania wizyty", err);
        setError("Nie udało się pobrać szczegółów wizyty.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointment();
  }, [appointmentId]);
  const handleChange = (
    field: keyof UpdateAppointmentSlotDetails,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setError(null);
      await appointmentService.updateAppointmentDetails(
        appointmentId,
        formData,
      );
      alert("Zapisano zmiany!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Błąd zapisu:", err);
      setError("Wystąpił błąd podczas zapisywania zmian na serwerze.");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !appointment) {
    return (
      <Box sx={{ p: 4, maxWidth: 650, mx: "auto" }}>
        <Alert severity="error">{error || "Brak danych wizyty."}</Alert>
      </Box>
    );
  }
  const patientName = appointment.patient
    ? `${appointment.patient.firstName || ""} ${appointment.patient.lastName || ""}`
    : "Brak przypisanego pacjenta";
  return (
    <Paper
      elevation={3}
      sx={{ p: 4, maxWidth: 650, mx: "auto", borderRadius: 3 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold" }}
      >
        Edycja Wizyty
      </Typography>
      <Box sx={{ mb: 4, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Pacjent: <strong>{patientName}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Zabieg: <strong>{appointment.procedureName}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Termin:{" "}
          <strong>
            {new Date(appointment.startTime).toLocaleString()} -{" "}
            {new Date(appointment.endTime).toLocaleTimeString()}
          </strong>
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleSave}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <MenuItem value="SCHEDULED">Zaplanowane (SCHEDULED)</MenuItem>
                  <MenuItem value="COMPLETED">Zakończone (COMPLETED)</MenuItem>
                  <MenuItem value="PATIENT_ABSENT">
                    Nieobecność (PATIENT_ABSENT)
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPaid}
                    onChange={(e) => handleChange("isPaid", e.target.checked)}
                    color="primary"
                  />
                }
                label={formData.isPaid ? "Wizyta opłacona" : "Brak płatności"}
              />
            </Box>
          </Box>
          <TextField
            label="Notatki wewnętrzne (widoczne dla personelu)"
            multiline
            rows={3}
            fullWidth
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
          <TextField
            label="Zalecenia medyczne (widoczne dla pacjenta)"
            multiline
            rows={4}
            fullWidth
            value={formData.medicalAdvice}
            onChange={(e) => handleChange("medicalAdvice", e.target.value)}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1 }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSaving}
            >
              {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
            </Button>
          </Box>
        </Box>
      </form>
      <Box>
        <TherapistPatientAppointmentHistoryList
          patientId={appointment.patient.id}
        />
      </Box>
    </Paper>
  );
}
