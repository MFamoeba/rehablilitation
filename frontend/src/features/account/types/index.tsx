export interface userAccountResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface updateUserAccountRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface changeRoleRequest {
  role: string;
}
