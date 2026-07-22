import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { Therapist } from "../types";
import { therapistService } from "../services/therapistService";
interface TherapistSelectProps {
  value: string;
  onChange: (therapistId: string) => void;
}
export default function TherapistPicker({
  value,
  onChange,
}: TherapistSelectProps) {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    therapistService
      .getAllTherapists()
      .then((data) => {
        setTherapists(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać listy terapeutów.");
        setLoading(false);
      });
  }, []);
  if (loading) return <CircularProgress size={24} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="therapist-select-label">Wybierz terapeutę</InputLabel>
      <Select
        labelId="therapist-select-label"
        value={value}
        label="Wybierz terapeutę"
        onChange={(e) => onChange(e.target.value)}
      >
        {therapists.map((therapist) => {
          return (
            <MenuItem key={therapist.id} value={therapist.id}>
              {therapist.firstName} {therapist.lastName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
