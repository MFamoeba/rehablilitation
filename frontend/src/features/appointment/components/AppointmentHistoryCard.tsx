import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NotesIcon from "@mui/icons-material/Notes";
import type { AppointmentSlotDetails, AppointmentStatus } from "../types";
interface Props {
  appointment: AppointmentSlotDetails;
}

const getStatusConfig = (status: AppointmentStatus) => {
  switch (status) {
    case "OPEN":
      return { label: "Dostępna", color: "info" as const };
    case "PENDING":
      return { label: "Oczekująca", color: "warning" as const };
    case "CONFIRMED":
      return { label: "Zaplanowana", color: "success" as const };
    case "CANCELLED":
      return { label: "Anulowana", color: "error" as const };
    default:
      return { label: status, color: "default" as const };
  }
};
export default function AppointmentHistoryCard({ appointment }: Props) {
  const dateObj = new Date(appointment.startTime);
  const date = dateObj.toLocaleDateString("pl-PL");
  const time = dateObj.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusConfig = getStatusConfig(appointment.status);
  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 2,
        borderRadius: 2,
        borderLeft: `6px solid ${statusConfig.color === "success" ? "#2e7d32" : statusConfig.color === "error" ? "#d32f2f" : "#ed6c02"}`,
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
          <Chip
            label={statusConfig.label}
            color={statusConfig.color}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 1.5 }}>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AccessTimeIcon color="action" /> Godzina: <strong>{time}</strong>
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonIcon color="action" /> Terapeuta:{" "}
            <strong>
              {appointment.therapist.firstName} {appointment.therapist.lastName}
            </strong>
          </Typography>

          {appointment.room && (
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MeetingRoomIcon color="action" /> Gabinet:{" "}
              <strong>{appointment.room}</strong>
            </Typography>
          )}
        </Box>
        {appointment.notes && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ backgroundColor: "#f9f9f9", p: 1.5, borderRadius: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
              >
                <NotesIcon fontSize="small" />
                <em>{appointment.notes}</em>
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
