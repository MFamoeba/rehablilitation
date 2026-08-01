import { useState } from "react";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoctorAppointmentsList from "@/features/appointment/components/DoctorAppointmentsList";
export default function TherapistAppointmentsPage() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const handlePrevDay = () => {
    if (!date) return;
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d.toISOString().split("T")[0]);
  };
  const handleNextDay = () => {
    if (!date) return;
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d.toISOString().split("T")[0]);
  };
  return (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Mój harmonogram wizyt
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, maxWidth: 400 }}
      >
        <IconButton
          onClick={handlePrevDay}
          color="primary"
          sx={{ bgcolor: "primary.50", "&:hover": { bgcolor: "primary.100" } }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <TextField
          type="date"
          label="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <IconButton
          onClick={handleNextDay}
          color="primary"
          sx={{ bgcolor: "primary.50", "&:hover": { bgcolor: "primary.100" } }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box>
        <DoctorAppointmentsList date={date} />
      </Box>
    </Box>
  );
}
