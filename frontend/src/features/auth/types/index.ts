export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
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
export interface AccountState {
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
