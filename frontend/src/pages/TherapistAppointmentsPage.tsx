import { useState } from "react";
import { Container, Typography, Box, TextField, Paper } from "@mui/material";
import DoctorAppointmentsList from "@/features/appointment/components/DoctorAppointmentsList";
export default function TherapistAppointmentPage() {
  const [date, setDate] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];

  return (
    <Container maxWidth="md">
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
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Moja historia wizyt
        </Typography>
        <DoctorAppointmentsList date={date} />
      </Box>
    </Container>
  );
}
