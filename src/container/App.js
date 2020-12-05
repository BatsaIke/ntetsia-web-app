import { ApiProvider } from 'context/apiContext';
import { ComponentProvider } from 'context/componentContext';
import { AuthProvider } from 'context/userContext';
import { BrowserRouter } from 'react-router-dom';
import Router from 'routes/router';

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <ComponentProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ComponentProvider>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;
