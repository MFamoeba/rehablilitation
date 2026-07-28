import { useEffect, useState } from "react";
import TherapistPicker from "../features/therapist/components/TherapistPicker";
import { TextField } from "@mui/material";
import AppointmentList from "../features/appointment/components/AppointmentList";
import AppointmentBookingCard from "../features/appointment/components/AppointmentBookingCard";
import { appointmentService } from "../features/appointment/services/appointmentService";
import type { AppointmentSlot } from "../features/appointment/types";
import ProcedurePicker from "@/features/procedures/components/ProceduresPicker";

export default function AppointmentsPage() {
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("");
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  useEffect(() => {
    if (!selectedTherapistId || !date) {
      setSlots([]);
      return;
    }
    setLoadingSlots(true);
    appointmentService
      .getAppointmentSlotsForDate(selectedTherapistId, date)
      .then((data) => {
        setSlots(data);
        setLoadingSlots(false);
      })
      .catch((err) => {
        console.error("Błąd pobierania slotów", err);
        setLoadingSlots(false);
      });
  }, [selectedTherapistId, date]);
  const handleBook = (slotId: string) => {
    appointmentService
      .bookAppointmentSlot(slotId)
      .then(() => alert("Rezerwacja udana!"))
      .catch(() => alert("Błąd rezerwacji"));
  };
  return (
    <div>
      <h1>Umów się na wizytę</h1>
      <div>
        <h2>Krok 1: Wybierz terapeutę</h2>
        <TherapistPicker
          value={selectedTherapistId}
          onChange={setSelectedTherapistId}
        />
      </div>
      <div>
        <h2>Krok 2: Wybierz zabieg</h2>
        <ProcedurePicker
          value={selectedProcedureId}
          onChange={setSelectedProcedureId}
        />
      </div>
      <div>
        <h2>Krok 3: Wybierz datę</h2>
        <TextField
          type="date"
          label={"Data wizyty"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              min: today,
            },
          }}
        />
      </div>

      <div>
        <p>
          <strong>Wybrane ID terapeuty:</strong>{" "}
          {selectedTherapistId ? selectedTherapistId : "Jeszcze nie wybrano"}
        </p>
        <p>
          <strong>Wybrana data wizyty:</strong>{" "}
          {date ? date : "Jeszcze nie wybrano"}
        </p>
      </div>
      <div>
        <h2>Krok 4: Wybierz godzinę</h2>
      </div>
      <div>
        <p>
          <strong>Wolne terminy:</strong>
        </p>
        <AppointmentList
          slots={slots}
          loading={loadingSlots}
          renderItem={(slot) => (
            <AppointmentBookingCard
              key={slot.id}
              slot={slot}
              onBook={handleBook}
            />
          )}
        />
      </div>
    </div>
  );
}
