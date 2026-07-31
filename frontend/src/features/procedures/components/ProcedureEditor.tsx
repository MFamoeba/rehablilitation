import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import { Add, Save, MedicalServices } from "@mui/icons-material";

import type { Procedure } from "../types";
import { procedureService } from "../services/procedureService";

import ProcedureEditorRow from "./ProcedureEditorRow";

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function ProcedureEditor() {
  const theme = useTheme();

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        setIsLoading(true);
        const data = await procedureService.getAllProcedures();
        setProcedures(data);
      } catch (error) {
        console.error("Błąd pobierania zabiegów:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  const handleAddProcedure = () => {
    const newProcedure: Procedure = {
      id: `new-${generateId()}`,
      name: "",
      description: "",
      price: 0,
    };
    setProcedures([...procedures, newProcedure]);
  };

  const handleRemoveProcedure = async (id: string) => {
    if (id.startsWith("new-")) {
      setProcedures((prev) => prev.filter((p) => p.id !== id));
      return;
    }

    try {
      setIsLoading(true);
      await procedureService.deleteProcedure(id);
      setProcedures((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Błąd podczas usuwania zabiegu z bazy:", error);
      alert("Wystąpił błąd. Nie udało się trwale usunąć zabiegu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (id: string, field: keyof Procedure, value: any) => {
    setProcedures((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      for (const proc of procedures) {
        if (proc.id.startsWith("new-")) {
          const { id, ...procedureData } = proc;
          await procedureService.addProcedure(procedureData as Procedure);
        } else {
          await procedureService.updateProcedure(proc.id, proc);
        }
      }

      const updatedData = await procedureService.getAllProcedures();
      setProcedures(updatedData);

      alert("Zapisano pomyślnie wszystkie zabiegi!");
    } catch (error) {
      console.error("Błąd zapisu zabiegów:", error);
      alert("Wystąpił błąd podczas zapisu.");
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
        {/* NAGŁÓWEK */}
        <Box
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MedicalServices sx={{ fontSize: 40, opacity: 0.9 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Oferta i Cennik
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Zarządzaj swoimi zabiegami, opisami oraz cennikiem usług.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: 2, md: 4 },
            bgcolor: alpha(theme.palette.background.default, 0.3),
          }}
        >
          {procedures.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
              <Typography variant="h6">
                Nie masz jeszcze żadnych zabiegów.
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Kliknij przycisk poniżej, aby dodać swoją pierwszą usługę do
                oferty.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {procedures.map((proc) => (
                <ProcedureEditorRow
                  key={proc.id}
                  procedure={proc}
                  onChange={handleChange}
                  onRemove={handleRemoveProcedure}
                />
              ))}
            </Box>
          )}

          <Button
            variant="outlined"
            size="large"
            startIcon={<Add />}
            onClick={handleAddProcedure}
            sx={{
              mt: 4,
              borderStyle: "dashed",
              borderWidth: 2,
              borderRadius: 3,
              py: 1.5,
              fontWeight: 600,
              "&:hover": { borderWidth: 2 },
            }}
            fullWidth
          >
            Dodaj nową usługę
          </Button>
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
              boxShadow: `0 4px 14px 0 ${alpha(
                theme.palette.primary.main,
                0.4,
              )}`,
              "&:hover": {
                boxShadow: `0 6px 20px 0 ${alpha(
                  theme.palette.primary.main,
                  0.6,
                )}`,
              },
            }}
          >
            {isSaving ? "Zapisywanie..." : "Zapisz Cennik"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
