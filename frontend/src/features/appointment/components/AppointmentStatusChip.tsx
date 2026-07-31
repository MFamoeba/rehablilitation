import { Chip } from "@mui/material";
import type { AppointmentStatus } from "../types";
export const getAppointmentStatusConfig = (status: AppointmentStatus) => {
  switch (status) {
    case "OPEN":
      return { label: "Dostępna", color: "info" as const };
    case "PENDING":
      return { label: "Oczekująca", color: "warning" as const };
    case "SCHEDULED":
      return { label: "Zaplanowana", color: "primary" as const };
    case "COMPLETED":
      return { label: "Zakończona", color: "success" as const };
    case "PATIENT_ABSENT":
      return { label: "Nieobecny", color: "default" as const };
    default:
      return { label: status, color: "default" as const };
  }
};
interface AppointmentStatusChipProps {
  status: AppointmentStatus;
}
export default function AppointmentStatusChip({
  status,
}: AppointmentStatusChipProps) {
  const config = getAppointmentStatusConfig(status);
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ fontWeight: "bold" }}
    />
  );
}
