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