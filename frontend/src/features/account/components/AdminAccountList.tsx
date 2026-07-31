import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Box,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { People } from "@mui/icons-material";
import { authService } from "@/features/account/services/accountService";
import type { userAccountResponse } from "@/features/account/types";
export function AdminAccountList() {
  const theme = useTheme();

  const [accounts, setAccounts] = useState<userAccountResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const data = await authService.getAllAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Błąd API:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
  const handleRoleChange = async (accountId: string, newRole: string) => {
    if (!newRole) return;

    try {
      setProcessingId(accountId);
      await authService.changeRoleOfAccount(accountId, newRole);

      const data = await authService.getAllAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Błąd zmiany roli:", error);
      alert("Wystąpił błąd podczas zmiany uprawnień.");
    } finally {
      setProcessingId(null);
    }
  };
  if (isLoading && accounts.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
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
          <People sx={{ fontSize: 40, opacity: 0.9 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Zarządzanie Użytkownikami
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Przypisuj role i zmieniaj uprawnienia dostępu do aplikacji.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 0 }}>
          {accounts.length === 0 ? (
            <Typography
              sx={{ p: 4, textAlign: "center", color: "text.secondary" }}
            >
              Brak kont w bazie.
            </Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead
                  sx={{ bgcolor: alpha(theme.palette.background.default, 0.4) }}
                >
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", py: 2, pl: 4 }}>
                      Imię
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      Nazwisko
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      Telefon
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", py: 2, width: 220, pr: 4 }}
                    >
                      Poziom Dostępu
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {accounts.map((account) => (
                    <TableRow
                      key={account.id}
                      hover
                      sx={{ "&:last-child td": { border: 0 } }}
                    >
                      <TableCell sx={{ pl: 4 }}>{account.firstName}</TableCell>
                      <TableCell>{account.lastName}</TableCell>
                      <TableCell>{account.email}</TableCell>
                      <TableCell>{account.phoneNumber || "-"}</TableCell>
                      <TableCell sx={{ pr: 4 }}>
                        {processingId === account.id ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: 40,
                              pl: 2,
                            }}
                          >
                            <CircularProgress size={20} />
                          </Box>
                        ) : (
                          <FormControl
                            size="small"
                            variant="outlined"
                            fullWidth
                          >
                            <Select
                              value={account.role || ""}
                              onChange={(e) =>
                                handleRoleChange(account.id, e.target.value)
                              }
                              sx={{
                                bgcolor: "background.paper",
                                ...(account.role === "ROLE_ADMIN" && {
                                  color: "error.main",
                                  fontWeight: "bold",
                                }),
                              }}
                            >
                              <MenuItem value="ROLE_USER">Pacjent</MenuItem>
                              <MenuItem value="ROLE_DOCTOR">Terapeuta</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
