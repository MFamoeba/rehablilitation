import React from "react";
import { Container, Typography, Box } from "@mui/material";
import PatientPlanedAppointmentList from "@/features/appointment/components/PatientPlanedAppointmentList";
export default function PatientPlannedAppointementPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Moja historia wizyt
        </Typography>
        <PatientPlanedAppointmentList />
      </Box>
    </Container>
  );
}
