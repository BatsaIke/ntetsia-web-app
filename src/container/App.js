import { ApiProvider } from 'context/apiContext';
import { ComponentProvider } from 'context/componentContext';
import { AuthProvider } from 'context/userContext';
import { BrowserRouter } from 'react-router-dom';
import Router from 'routes/router';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <AuthProvider>
          <ComponentProvider>
            <Router />
          </ComponentProvider>
        </AuthProvider>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
