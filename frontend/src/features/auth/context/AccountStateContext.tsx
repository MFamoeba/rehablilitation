import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

export interface PersonalAccountType {
  email: string;
  firstname: string;
  lastname: string;
}
export interface TokenType {
  exp: number;
  iat: number;
  sub: string; // identyfikator użytkownika
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}
interface AccountState {
  token: string | null;
  setToken: (token: string | null) => void;
  parsedToken: TokenType | null;
  setParsedToken: (token: TokenType | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const AccountStateContext = createContext<AccountState | null>(null);
export const AccountStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [parsedToken, setParsedToken] = useState<TokenType | null>(
    token ? jwtDecode<TokenType>(token) : null,
  );

  // Synchronizacja tokenu z localStorage i automatyczne parsowanie przy zmianie
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setParsedToken(jwtDecode<TokenType>(token));
    } else {
      localStorage.removeItem("token");
      setParsedToken(null);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
  };

  const login = (newToken: string) => {
    setToken(newToken);
  };

  // Wyliczanie stanów pomocniczych na podstawie sparsowanego tokenu
  const isAuthenticated = !!token && !!parsedToken;
  const isAdmin = parsedToken ? parsedToken.role === "ROLE_ADMIN" : false;
  const isManager = parsedToken ? parsedToken.role === "ROLE_MANAGER" : false;
  return (
    <AccountStateContext.Provider
      value={{
        token,
        setToken,
        parsedToken,
        setParsedToken,
        isAuthenticated,
        isAdmin,
        isManager,
        login,
        logout,
      }}
    >
      {children}
    </AccountStateContext.Provider>
  );
};
export const useAccountState = () => {
  const accountState = useContext(AccountStateContext);
  if (!accountState) {
    throw new Error("You forgot about AccountStateContextProvider!");
  }
  return accountState;
};
