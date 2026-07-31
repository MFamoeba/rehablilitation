import React from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
  useTheme,
  alpha,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { Procedure } from "../types";
interface ProcedureEditorRowProps {
  procedure: Procedure;
  onChange: (id: string, field: keyof Procedure, value: any) => void;
  onRemove: (id: string) => void;
}
export default function ProcedureEditorRow({
  procedure,
  onChange,
  onRemove,
}: ProcedureEditorRowProps) {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 8px 24px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
      }}
    >
      <Tooltip title="Trwale usuń zabieg">
        <IconButton
          color="error"
          onClick={() => onRemove(procedure.id)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            opacity: 0.7,
            "&:hover": { opacity: 1 },
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pr: 5 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            label="Nazwa zabiegu"
            variant="outlined"
            fullWidth
            value={procedure.name}
            onChange={(e) => onChange(procedure.id, "name", e.target.value)}
            placeholder="np. Masaż klasyczny"
          />
          <TextField
            label="Cena"
            variant="outlined"
            type="number"
            sx={{ width: { xs: "100%", sm: 200 } }}
            value={procedure.price === 0 ? "" : procedure.price}
            onChange={(e) =>
              onChange(procedure.id, "price", parseFloat(e.target.value) || 0)
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">PLN</InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <TextField
          label="Opis (dla pacjentów)"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={procedure.description}
          onChange={(e) =>
            onChange(procedure.id, "description", e.target.value)
          }
          placeholder="Krótko opisz na czym polega zabieg i komu jest dedykowany..."
        />
      </Box>
    </Paper>
  );
}
