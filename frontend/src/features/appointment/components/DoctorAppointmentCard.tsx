import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import NotesIcon from "@mui/icons-material/Notes";
import type { AppointmentSlotDetails } from "../types";
import AppointmentStatusChip from "./AppointmentStatusChip";
interface Props {
  appointment: AppointmentSlotDetails;
}
export default function DoctorAppointmentCard({ appointment }: Props) {
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
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {appointment.patient && (
              <>
                <PersonIcon color="action" /> Pacjent:{" "}
                <strong>
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </strong>
              </>
            )}
          </Typography>
        </Box>
        {appointment.procedureName && (
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <MedicalServicesIcon color="action" /> Zabieg:{" "}
            <strong>{appointment.procedureName}</strong>
          </Typography>
        )}
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
        {appointment.medicalAdvice && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ backgroundColor: "#f9f9f9", p: 1.5, borderRadius: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
              >
                <NotesIcon fontSize="small" />
                <em>{appointment.medicalAdvice}</em>
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
