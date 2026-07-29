import { useState } from "react";
import { Container, Typography, Box, TextField, Paper } from "@mui/material";
import TherapistPicker from "../features/therapist/components/TherapistPicker";
import ProcedurePicker from "../features/procedures/components/ProceduresPicker";
import AppointmentBookingList from "../features/appointment/components/AppointmentBookingList";
export default function AppointmentsPage() {
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("");
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h4" component="h1" color="primary">
          Umów się na wizytę
        </Typography>
        <Box>
          <Typography variant="h6" gutterBottom>
            Krok 1: Wybierz terapeutę
          </Typography>
          <TherapistPicker
            value={selectedTherapistId}
            onChange={setSelectedTherapistId}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Krok 2: Wybierz zabieg
          </Typography>
          <ProcedurePicker
            value={selectedProcedureId}
            onChange={setSelectedProcedureId}
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Krok 3: Wybierz datę
          </Typography>
          <TextField
            type="date"
            label="Data wizyty"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              htmlInput: {
                min: today,
              },
            }}
          />
        </Box>
        <Paper sx={{ p: 2, bgcolor: "background.default" }} elevation={0}>
          <Typography variant="body2">
            <strong>Wybrane ID terapeuty:</strong>{" "}
            {selectedTherapistId ? selectedTherapistId : "Jeszcze nie wybrano"}
          </Typography>
          <Typography variant="body2">
            <strong>Wybrana data wizyty:</strong>{" "}
            {date ? date : "Jeszcze nie wybrano"}
          </Typography>
        </Paper>
        <Box>
          <Typography variant="h6" gutterBottom>
            Krok 4: Wybierz godzinę
          </Typography>

          <AppointmentBookingList
            therapistId={selectedTherapistId}
            date={date}
          />
        </Box>
      </Box>
    </Container>
  );
}
