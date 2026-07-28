import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import type { Procedure } from "../types";
interface ProcedureCardProps {
  procedure: Procedure;
}
export default function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: 3,
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
            {procedure.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 0.5, color: "#1976d2", alignItems: "center" }}
          >
            <MedicalServicesIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
              {procedure.description}
            </Typography>
          </Stack>
        </Box>
        {procedure.price !== undefined && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1, fontStyle: "italic" }}
          >
            "${procedure.price.toFixed(2)}"
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
