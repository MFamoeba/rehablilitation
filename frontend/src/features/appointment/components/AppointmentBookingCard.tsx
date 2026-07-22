import type { AppointmentSlot } from "../types";
interface AppointmentBookingCardProps {
  slot: AppointmentSlot;
  onBook: (slotId: string) => void;
}
export default function AppointmentBookingCard({
  slot,
  onBook,
}: AppointmentBookingCardProps) {
  const time = new Date(slot.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <span>Godzina: {time}</span>
      <button
        style={{ marginLeft: "10px", cursor: "pointer" }}
        onClick={() => onBook(slot.id)}
      >
        Zarezerwuj
      </button>
    </div>
  );
}
