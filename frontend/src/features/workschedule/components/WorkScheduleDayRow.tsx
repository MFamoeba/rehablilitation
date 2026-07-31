import React from "react";
import {
  Box,
  Typography,
  Switch,
  IconButton,
  Button,
  TextField,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import { Delete, Add, AccessTime } from "@mui/icons-material";
import type { TimeSlot } from "./WorkScheduleEditor";
import type { DayOfWeek } from "../types";
interface WorkScheduleDayRowProps {
  dayValue: DayOfWeek;
  dayLabel: string;
  slots: TimeSlot[];
  onToggle: (day: DayOfWeek) => void;
  onAddSlot: (day: DayOfWeek) => void;
  onRemoveSlot: (day: DayOfWeek, slotId: string) => void;
  onTimeChange: (
    day: DayOfWeek,
    slotId: string,
    field: "startTime" | "endTime",
    value: string,
  ) => void;
}
export default function WorkScheduleDayRow({
  dayValue,
  dayLabel,
  slots,
  onToggle,
  onAddSlot,
  onRemoveSlot,
  onTimeChange,
}: WorkScheduleDayRowProps) {
  const theme = useTheme();
  const isActive = slots.length > 0;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "flex-start" },
        p: 3,
        gap: 3,
        bgcolor: isActive
          ? alpha(theme.palette.primary.main, 0.02)
          : "transparent",
        transition: "background-color 0.3s ease",
        "&:hover": {
          bgcolor: isActive
            ? alpha(theme.palette.primary.main, 0.04)
            : alpha(theme.palette.action.hover, 0.5),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 180 },
          flexShrink: 0,
        }}
      >
        <Switch
          checked={isActive}
          onChange={() => onToggle(dayValue)}
          color="primary"
        />
        <Typography
          variant="h6"
          sx={{
            ml: 1,
            fontWeight: isActive ? 600 : 400,
            color: isActive ? "text.primary" : "text.secondary",
          }}
        >
          {dayLabel}
        </Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {isActive ? (
          slots.map((slot) => (
            <Box
              key={slot.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <AccessTime sx={{ color: "text.secondary" }} />
              <TextField
                type="time"
                size="small"
                value={slot.startTime}
                onChange={(e) =>
                  onTimeChange(dayValue, slot.id, "startTime", e.target.value)
                }
                slotProps={{ htmlInput: { step: 1800 } }}
                sx={{ width: 130 }}
              />
              <Typography sx={{ color: "text.secondary" }}>-</Typography>
              <TextField
                type="time"
                size="small"
                value={slot.endTime}
                onChange={(e) =>
                  onTimeChange(dayValue, slot.id, "endTime", e.target.value)
                }
                slotProps={{ htmlInput: { step: 300 } }}
                sx={{ width: 130 }}
              />
              <Tooltip title="Usuń ten przedział">
                <IconButton
                  color="error"
                  onClick={() => onRemoveSlot(dayValue, slot.id)}
                  size="small"
                  sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ py: 1, fontStyle: "italic", color: "text.disabled" }}
          >
            Dzień wolny od pracy
          </Typography>
        )}
        {isActive && (
          <Box>
            <Button
              size="small"
              startIcon={<Add />}
              onClick={() => onAddSlot(dayValue)}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Dodaj kolejne godziny
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
