import { AccountStateContextProvider } from './features/auth/context/AccountStateContext';
import RouterComponent from "./routes";


function App() {
  return (
 <AccountStateContextProvider>
      <RouterComponent />
    </AccountStateContextProvider>
  );
}

export default App;