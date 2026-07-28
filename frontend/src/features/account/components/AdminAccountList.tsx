import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { authService } from "@/features/account/services/accountService";
import type { userAccountResponse } from "@/features/account/types";
export function AdminAccountList() {
  const [accounts, setAccounts] = useState<userAccountResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const handleMakeDoctor = async (accountId: string) => {
    try {
      await authService.changeRoleOfAccount(accountId, "ROLE_DOCTOR");
      alert("Udało się zmienić rolę");
      fetchAccounts();
    } catch (error) {
      console.error("Błąd zmiany roli:", error);
    }
  };

  if (isLoading) return <div>Ładowanie danych...</div>;
  if (accounts.length === 0) return <div>Brak kont w bazie.</div>;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Imię i Nazwisko</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Akcje</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>
                {account.firstName} {account.lastName}
              </TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleMakeDoctor(account.id)}>
                  Uczyń Lekarzem
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
