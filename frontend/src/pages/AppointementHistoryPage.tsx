import React from "react";
import { Typography, Box } from "@mui/material";
import PatientAppointmentHistoryList from "../features/appointment/components/PatientAppointmentHistoryList";

export default function AppointementHistoryPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Moja historia wizyt
      </Typography>
      <PatientAppointmentHistoryList />
    </Box>
  );
}
