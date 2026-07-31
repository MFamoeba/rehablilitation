import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { therapistService } from "../services/therapistService";
import { procedureService } from "../../procedures/services/procedureService";
import type { Procedure } from "../../procedures/types";
export default function TherapistProfileForm() {
  const [briefBio, setBriefBio] = useState("");
  const [fullBio, setFullBio] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  useEffect(() => {
    Promise.all([
      therapistService.getMyProfile(),
      procedureService.getAllProcedures(),
    ])
      .then(([profileData, proceduresData]) => {
        setBriefBio(profileData.briefBio || "");
        setFullBio(profileData.fullBio || "");
        setSpecialization(profileData.specialization || "");

        if (profileData.procedures) {
          setSelectedProcedures(
            profileData.procedures.map((p: Procedure) => p.id),
          );
        }
        setAllProcedures(proceduresData);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          type: "error",
          text: "Nie udało się załadować danych profilu.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleProcedureChange = (
    event: SelectChangeEvent<typeof selectedProcedures>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedProcedures(typeof value === "string" ? value.split(",") : value);
  };
  const handleSave = () => {
    setSaving(true);
    setMessage(null);

    const proceduresObjectsToSend = selectedProcedures
      .map((id) => allProcedures.find((p) => p.id === id))
      .filter(Boolean) as Procedure[];

    therapistService
      .updateMyProfile({
        briefBio,
        fullBio,
        specialization,
        procedures: proceduresObjectsToSend,
      })
      .then(() => {
        setMessage({ type: "success", text: "Zapisano zmiany pomyślnie!" });
      })
      .catch(() => {
        setMessage({ type: "error", text: "Wystąpił błąd podczas zapisu." });
      })
      .finally(() => {
        setSaving(false);
      });
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      component="form"
      sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}
    >
      {message && <Alert severity={message.type}>{message.text}</Alert>}
      <TextField
        label="Specjalizacja"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Krótki opis (Brief Bio)"
        value={briefBio}
        onChange={(e) => setBriefBio(e.target.value)}
        multiline
        rows={2}
        fullWidth
      />
      <TextField
        label="Pełny opis (Full Bio)"
        value={fullBio}
        onChange={(e) => setFullBio(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="procedures-select-label">
          Wykonywane procedury
        </InputLabel>
        <Select
          labelId="procedures-select-label"
          multiple
          value={selectedProcedures}
          onChange={handleProcedureChange}
          input={<OutlinedInput label="Wykonywane procedury" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const procName =
                  allProcedures.find((p) => p.id === value)?.name ||
                  "Nieznana procedura";
                return (
                  <Chip
                    key={value}
                    label={procName}
                    color="primary"
                    variant="outlined"
                  />
                );
              })}
            </Box>
          )}
        >
          {allProcedures.map((proc) => (
            <MenuItem key={proc.id} value={proc.id}>
              {proc.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSave}
        disabled={saving}
        sx={{ alignSelf: "flex-end", mt: 2 }}
      >
        {saving ? "Zapisywanie..." : "Zapisz profil"}
      </Button>
    </Box>
  );
}
