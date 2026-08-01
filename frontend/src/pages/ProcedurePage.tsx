import { Box, Typography } from "@mui/material";
import ProceduresList from "../features/procedures/components/ProceduresList";

export default function ProcedurePage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Nasze Zabiegi
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Poznaj nasz zespół wykwalifikowanych specjalistów gotowych pomóc Ci w
        powrocie do zdrowia.
      </Typography>
      <ProceduresList />
    </Box>
  );
}
