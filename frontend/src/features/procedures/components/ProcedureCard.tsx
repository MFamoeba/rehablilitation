import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import type { Procedure } from "../types";
interface ProcedureCardProps {
  procedure: Procedure;
}
export default function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 2,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {procedure.name}
          </Typography>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "primary.50",
              display: "flex",
            }}
          >
            <MedicalServicesIcon color="primary" />
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flexGrow: 1,
            whiteSpace: "pre-line",
            lineHeight: 1.6,
          }}
        >
          {procedure.description}
        </Typography>
        {procedure.price !== undefined && procedure.price > 0 && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: "medium" }}
              >
                Cena zabiegu
              </Typography>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                {procedure.price.toFixed(2)} PLN
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
