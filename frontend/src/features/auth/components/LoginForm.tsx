import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import type { AuthenticationRequest } from '../types/types';

export const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<AuthenticationRequest>({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.email || !formData.password) {
            setError('Uzupełnij wszystkie pola.');
            return;
        }

        setLoading(true);

        try {
            const data = await authService.login(formData);
            login(data.token);
        } catch (err: any) {
            setError(err.message || 'Wystąpił nieoczekiwany błąd logowania.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>Panel Logowania</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <div style={styles.error}>{error}</div>}
                
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        style={styles.input}
                        placeholder="np. jan.kowalski@wp.pl"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Hasło</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        style={styles.input}
                    />
                </div>

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Logowanie w toku...' : 'Zaloguj się'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    card: { maxWidth: '400px', width: '100%', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    title: { textAlign: 'center' as const, marginBottom: '25px', color: '#333', fontFamily: 'Arial, sans-serif' },
    form: { display: 'flex', flexDirection: 'column' as const },
    inputGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' as const },
    label: { marginBottom: '6px', fontSize: '14px', fontWeight: 'bold', color: '#555' },
    input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' },
    button: { padding: '12px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' },
    error: { color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }
};