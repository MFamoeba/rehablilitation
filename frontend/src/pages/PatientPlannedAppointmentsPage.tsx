import React from "react";
import { Typography, Box } from "@mui/material";
import PatientPlanedAppointmentList from "@/features/appointment/components/PatientPlanedAppointmentList";
export default function PatientPlannedAppointementPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Moje zaplanowane wizyty
      </Typography>
      <PatientPlanedAppointmentList />
    </Box>
  );
}
