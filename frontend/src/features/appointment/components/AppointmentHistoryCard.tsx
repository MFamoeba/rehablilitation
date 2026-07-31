import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import type { AppointmentSlotDetails } from "../types";
import AppointmentStatusChip from "./AppointmentStatusChip";
interface Props {
  appointment: AppointmentSlotDetails;
}
export default function AppointmentHistoryCard({ appointment }: Props) {
  const dateObj = new Date(appointment.startTime);
  const date = dateObj.toLocaleDateString("pl-PL");
  const time = dateObj.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CalendarMonthIcon /> {date}
          </Typography>
          <AppointmentStatusChip status={appointment.status} />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 1.5 }}>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AccessTimeIcon color="action" /> Godzina: <strong>{time}</strong>
          </Typography>

          {appointment.therapist && (
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PersonIcon color="action" /> Terapeuta:{" "}
              <strong>
                {appointment.therapist.firstName}{" "}
                {appointment.therapist.lastName}
              </strong>
            </Typography>
          )}
          {appointment.procedureName && (
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MedicalServicesIcon color="action" /> Zabieg:{" "}
              <strong>{appointment.procedureName}</strong>
            </Typography>
          )}
        </Box>
        {appointment.medicalAdvice && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ backgroundColor: "#e3f2fd", p: 1.5, borderRadius: 1 }}>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  fontWeight: 500,
                }}
              >
                <NotesIcon fontSize="small" color="primary" />
                Zalecenia: {appointment.medicalAdvice}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
