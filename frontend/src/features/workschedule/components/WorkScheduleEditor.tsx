import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import WorkScheduleDayRow from "./WorkScheduleDayRow";
import type { DayOfWeek, WorkScheduleItemDto } from "../types";
import { therapistService } from "../services/workscheduleService";
const DAYS_OF_WEEK: { value: DayOfWeek; label: string }[] = [
  { value: "MONDAY", label: "Poniedziałek" },
  { value: "TUESDAY", label: "Wtorek" },
  { value: "WEDNESDAY", label: "Środa" },
  { value: "THURSDAY", label: "Czwartek" },
  { value: "FRIDAY", label: "Piątek" },
  { value: "SATURDAY", label: "Sobota" },
  { value: "SUNDAY", label: "Niedziela" },
];
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}
export type ScheduleState = Record<DayOfWeek, TimeSlot[]>;
const generateId = () => Math.random().toString(36).substring(2, 9);
const defaultEmptySchedule: ScheduleState = {
  MONDAY: [],
  TUESDAY: [],
  WEDNESDAY: [],
  THURSDAY: [],
  FRIDAY: [],
  SATURDAY: [],
  SUNDAY: [],
};
const defaultTimeSlot = (): TimeSlot => ({
  id: generateId(),
  startTime: "08:00",
  endTime: "16:00",
});
export default function WorkScheduleEditor() {
  const theme = useTheme();

  const [schedule, setSchedule] = useState<ScheduleState>(defaultEmptySchedule);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        const data = await therapistService.getMyWorkSchedule();

        const stateMapping: ScheduleState = {
          MONDAY: [],
          TUESDAY: [],
          WEDNESDAY: [],
          THURSDAY: [],
          FRIDAY: [],
          SATURDAY: [],
          SUNDAY: [],
        };

        data.forEach((item, index) => {
          stateMapping[item.dayOfWeek].push({
            id: `api-slot-${index}-${generateId()}`,
            startTime: item.startTime.substring(0, 5),
            endTime: item.endTime.substring(0, 5),
          });
        });

        setSchedule(stateMapping);
      } catch (error) {
        console.error("Błąd pobierania harmonogramu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);
  const handleToggleDay = (day: DayOfWeek) => {
    setSchedule((prev) => {
      const currentSlots = prev[day];
      if (currentSlots.length > 0) {
        return { ...prev, [day]: [] };
      } else {
        return { ...prev, [day]: [defaultTimeSlot()] };
      }
    });
  };
  const handleAddSlot = (day: DayOfWeek) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], defaultTimeSlot()],
    }));
  };
  const handleRemoveSlot = (day: DayOfWeek, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== slotId),
    }));
  };
  const handleTimeChange = (
    day: DayOfWeek,
    slotId: string,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot,
      ),
    }));
  };
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload: WorkScheduleItemDto[] = [];
      Object.entries(schedule).forEach(([dayOfWeek, slots]) => {
        slots.forEach((slot) => {
          payload.push({
            dayOfWeek: dayOfWeek as DayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
          });
        });
      });
      await therapistService.addNewWorkSchedule(payload);
      alert("Pomyślnie zapisano harmonogram!");
    } catch (error) {
      console.error("Błąd zapisu:", error);
      alert("Wystąpił błąd podczas zapisywania.");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
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
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Harmonogram Pracy
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Zdefiniuj swoje stałe godziny pracy. Możesz dodać kilka przedziałów
            czasowych dla każdego dnia.
          </Typography>
        </Box>

        <Box sx={{ p: 0 }}>
          {DAYS_OF_WEEK.map((dayObj, index) => (
            <React.Fragment key={dayObj.value}>
              <WorkScheduleDayRow
                dayValue={dayObj.value}
                dayLabel={dayObj.label}
                slots={schedule[dayObj.value]}
                onToggle={handleToggleDay}
                onAddSlot={handleAddSlot}
                onRemoveSlot={handleRemoveSlot}
                onTimeChange={handleTimeChange}
              />
              {index < DAYS_OF_WEEK.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
        <Box
          sx={{
            p: 3,
            bgcolor: alpha(theme.palette.background.default, 0.5),
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={isSaving}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
              "&:hover": {
                boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.6)}`,
              },
            }}
          >
            {isSaving ? "Zapisywanie..." : "Zapisz Harmonogram"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
