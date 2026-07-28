import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { Procedure } from "../types";
import { procedureService } from "../services/procedureService";
interface ProcedureSelectProps {
  value: string;
  onChange: (procedureId: string) => void;
}
export default function ProcedurePicker({
  value,
  onChange,
}: ProcedureSelectProps) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    procedureService
      .getAllProcedures()
      .then((data) => {
        setProcedures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać listy procedur.");
        setLoading(false);
      });
  }, []);
  if (loading) return <CircularProgress size={24} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="procedure-select-label">Wybierz procedurę</InputLabel>
      <Select
        labelId="procedure-select-label"
        value={value}
        label="Wybierz procedurę"
        onChange={(e) => onChange(e.target.value)}
      >
        {procedures.map((procedure) => {
          return (
            <MenuItem key={procedure.id} value={procedure.id}>
              {procedure.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
