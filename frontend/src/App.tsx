import { AuthProvider, useAuth } from './features/auth/context/AuthContext';
import { LoginForm } from './features/auth/components/LoginForm';

// Komponent pomocniczy, który decyduje co wyświetlić na podstawie stanu autoryzacji
const NavigationController = () => {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1>Witaj w systemie rehabilitacji!</h1>
        <p>Jesteś pomyślnie uwierzytelniony tokenem JWT.</p>
        <button 
          onClick={logout} 
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Wyloguj się
        </button>
      </div>
    );
  }

  return <LoginForm />;
};

function App() {
  return (
    <AuthProvider>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <NavigationController />
      </div>
    </AuthProvider>
  );
}

export default App;