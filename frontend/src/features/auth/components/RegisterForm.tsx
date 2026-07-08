import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import type { RegisterRequest } from '../types/types';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const RegisterForm: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<RegisterRequest>({ 
        email: '', 
        password: '',
        firstName: '', 
        lastName: '', 
        phoneNumber: '' 
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.phoneNumber) {
            setError('Uzupełnij wszystkie pola.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków.');
            return;
        }

        setLoading(true);

        try {
            const data = await authService.register(formData);
            login(data.token);
        } catch (err: any) {
            setError(err.message || 'Wystąpił nieoczekiwany błąd podczas rejestracji.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box 
            sx={{ 
                maxWidth: 400, 
                width: '100%', 
                padding: 4, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2, 
                backgroundColor: '#ffffff', 
                boxShadow: 1 
            }}
        >
            <Typography component="h2" variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
                Rejestracja
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {error && (
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                )}
                
                <TextField
                    type="text"
                    id="firstname"
                    name="firstName"
                    label="Imię"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                />

                <TextField
                    type="text"
                    id="lastname"
                    name="lastName"
                    label="Nazwisko"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                />

                <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="np. jan.kowalski@wp.pl"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                />

                <TextField
                    type="tel"
                    id="phonenumber"
                    name="phoneNumber"
                    label="Numer telefonu"
                    placeholder="np. 123456789"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                />

                <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Hasło"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    disabled={loading}
                    fullWidth
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                >
                    {loading ? 'Rejestrowanie...' : 'Zarejestruj się'}
                </Button>
            </Box>
        </Box>
    );
};