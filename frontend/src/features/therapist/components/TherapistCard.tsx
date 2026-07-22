import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import type { Therapist } from "../types";
interface TherapistCardProps {
  therapist: Therapist;
}
export default function TherapistCard({ therapist }: TherapistCardProps) {
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
            {therapist.firstName} {therapist.lastName}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 0.5, color: "#1976d2", alignItems: "center" }}
          >
            <MedicalServicesIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
              {therapist.specialization}
            </Typography>
          </Stack>
        </Box>
        {therapist.brief && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1, fontStyle: "italic" }}
          >
            "{therapist.brief}"
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
