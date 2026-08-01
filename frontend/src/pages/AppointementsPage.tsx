import { useState } from "react";
import { Typography, Box, TextField } from "@mui/material";
import TherapistPicker from "../features/therapist/components/TherapistPicker";
import ProcedurePicker from "../features/procedures/components/ProceduresPicker";
import AppointmentBookingList from "../features/appointment/components/AppointmentBookingList";

export default function AppointmentsPage() {
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("");
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];

  const handleProcedureChange = (newProcedureId: string) => {
    setSelectedProcedureId(newProcedureId);
    setSelectedTherapistId("");
    setDate("");
  };

  return (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Umów się na wizytę
      </Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          Krok 1: Wybierz zabieg
        </Typography>
        <ProcedurePicker
          value={selectedProcedureId}
          onChange={handleProcedureChange}
        />
      </Box>

      {selectedProcedureId && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Krok 2: Wybierz terapeutę
          </Typography>
          <TherapistPicker
            value={selectedTherapistId}
            onChange={setSelectedTherapistId}
            procedureId={selectedProcedureId}
          />
        </Box>
      )}

      {selectedTherapistId && (
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
      )}

      {date && selectedTherapistId && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Krok 4: Wybierz godzinę
          </Typography>
          <AppointmentBookingList
            therapistId={selectedTherapistId}
            procedureId={selectedProcedureId}
            date={date}
          />
        </Box>
      )}
    </Box>
  );
}
