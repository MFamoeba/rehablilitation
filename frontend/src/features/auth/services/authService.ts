import type { AuthenticationRequest, AuthenticationResponse, RegisterRequest } from '../types/types';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const authService = {
    async login(request: AuthenticationRequest): Promise<AuthenticationResponse> {
        const response = await fetch(`${API_BASE_URL}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Nieprawidłowy email lub hasło.');
        }

        return response.json();
    },

async register(request: RegisterRequest): Promise<AuthenticationResponse> {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Wystąpił błąd podczas rejestracji.');
        }

        return response.json();
    },

    logout(): void {
        localStorage.removeItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    }
};