import { Box, Typography, useTheme, alpha, Paper } from "@mui/material";
import { MedicalInformation } from "@mui/icons-material";
import TherapistProfileForm from "../features/therapist/components/ThrapistProfileForm";
export default function TherapistProfilePage() {
  const theme = useTheme();
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        <Box
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MedicalInformation sx={{ fontSize: 40, opacity: 0.9 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Profil Terapeuty
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Zarządzaj swoimi specjalizacjami, opisem oraz przypisanymi
              zabiegami.
            </Typography>
          </Box>
        </Box>
        <TherapistProfileForm />
      </Paper>
    </Box>
  );
}
