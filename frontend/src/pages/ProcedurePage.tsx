import { Box, Typography } from "@mui/material";
import ProceduresList from "../features/procedures/components/ProceduresList";
export default function ProcedurePage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
      >
        Nase Zabiegi
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Poznaj nasz zespół wykwalifikowanych specjalistów gotowych pomóc Ci w
        powrocie do zdrowia.
      </Typography>
      {/* Wyrenderowanie listy z całego feature-u */}
      <ProceduresList />
    </Box>
  );
}
