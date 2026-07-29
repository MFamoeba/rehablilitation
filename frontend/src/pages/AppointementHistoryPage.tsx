import React from "react";
import { Container, Typography, Box } from "@mui/material";
import PatientAppointmentList from "../features/appointment/components/PatientAppointmentList";
export default function AppointementHistoryPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Moja historia wizyt
        </Typography>
        <PatientAppointmentList />
      </Box>
    </Container>
  );
}
