import { Card, CardActionArea, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { AppointmentSlot } from "../types";
interface AppointmentBookingCardProps {
  slot: AppointmentSlot;
  onBook: (slotId: string) => void;
}
export default function AppointmentBookingCard({
  slot,
  onBook,
}: AppointmentBookingCardProps) {
  const time = new Date(slot.startTime).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Card
      variant="outlined"
      sx={{
        width: 130,
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-3px)",
        },
      }}
    >
      <CardActionArea
        onClick={() => onBook(slot.id)}
        sx={{ p: 2, textAlign: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {time}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
