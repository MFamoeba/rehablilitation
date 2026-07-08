import { AuthProvider } from './features/auth/context/AuthContext';
import RouterComponent from "./routes";


function App() {
  return (
 <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  );
}

export default App;