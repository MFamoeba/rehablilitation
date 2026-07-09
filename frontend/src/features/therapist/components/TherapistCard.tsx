import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// Dostosuj import typu w zależności od tego, jak nazwałeś plik z typem (np. '../types/therapist' lub '../types')
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
        {/* Imię, Nazwisko i Specjalizacja */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
            {therapist.firstname} {therapist.lastname}
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
        {/* Krótki opis (biogram) */}
        {therapist.brief && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1, fontStyle: "italic" }}
          >
            "{therapist.brief}"
          </Typography>
        )}
        {/* Dane kontaktowe */}
        <Stack
          spacing={1}
          sx={{ pt: 2, borderTop: "1px solid #e0e0e0", mt: "auto" }}
        >
          {therapist.phoneNumber && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 0.5, color: "#1976d2", alignItems: "center" }}
            >
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">{therapist.phoneNumber}</Typography>
            </Stack>
          )}
          {therapist.email && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 0.5, color: "#1976d2", alignItems: "center" }}
            >
              <EmailIcon fontSize="small" />
              <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                {therapist.email}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
