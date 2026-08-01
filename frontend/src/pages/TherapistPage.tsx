import { Box, Typography } from "@mui/material";
import TherapistList from "../features/therapist/components/TherapistList";

export default function TherapistsPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Nasi Terapeuci
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Poznaj nasz zespół wykwalifikowanych specjalistów gotowych pomóc Ci w
        powrocie do zdrowia.
      </Typography>
      <TherapistList />
    </Box>
  );
}
