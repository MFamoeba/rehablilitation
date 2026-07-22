import type { AppointmentSlot } from "../types";
import type { ReactNode } from "react";
interface AppointmentList {
  slots: AppointmentSlot[];
  loading: boolean;
  renderItem: (slot: AppointmentSlot) => ReactNode;
}
export default function AppointmentList({
  slots,
  loading,
  renderItem,
}: AppointmentList) {
  if (loading) return <div>Ładowanie terminów...</div>;
  if (slots.length === 0) return <div>Brak wolnych terminów w tym dniu.</div>;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      {slots.map((slot) => renderItem(slot))}
    </div>
  );
}
