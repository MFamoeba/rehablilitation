import { useParams, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DoctorAppointmentEditor from "../features/appointment/components/DoctorAppointmentEditor";

export default function TherapistAppointmentDetailsPage() {
  const { appointmentId: id } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        Brak poprawnego ID wizyty w adresie URL.
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, maxWidth: 650, mx: "auto" }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Wróć do grafiku
      </Button>
      <DoctorAppointmentEditor appointmentId={id} />
    </Box>
  );
}
