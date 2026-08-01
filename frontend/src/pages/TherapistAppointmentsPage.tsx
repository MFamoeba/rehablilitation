import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoctorAppointmentsList from "@/features/appointment/components/DoctorAppointmentsList";
import { buildTherapistAppointementListLink } from "@/routes/pathnames";

export default function TherapistAppointmentsPage() {
  const { appointmentDate } = useParams<{ appointmentDate?: string }>();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const activeDate = appointmentDate || today;

  const handlePrevDay = () => {
    const d = new Date(activeDate);
    d.setDate(d.getDate() - 1);
    const newDate = d.toISOString().split("T")[0];
    navigate(buildTherapistAppointementListLink(newDate));
  };

  const handleNextDay = () => {
    const d = new Date(activeDate);
    d.setDate(d.getDate() + 1);
    const newDate = d.toISOString().split("T")[0];
    navigate(buildTherapistAppointementListLink(newDate));
  };

  const handleDateChange = (newDate: string) => {
    if (newDate) {
      navigate(buildTherapistAppointementListLink(newDate));
    }
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
          value={activeDate}
          onChange={(e) => handleDateChange(e.target.value)}
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
        <DoctorAppointmentsList date={activeDate} />
      </Box>
    </Box>
  );
}
