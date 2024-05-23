import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../features/auth';
import { NotistackProvider } from '@cnask/shared/feature';
import { ThemeProvider } from '@cnask/shared/ui';
import { RouterProvider } from 'react-router-dom';
import client from './apollo-client';
import { router } from './router';
import { i18n } from '@cnask/i18n/feature';

i18n.init();

export function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <NotistackProvider>
            <RouterProvider router={router} />
          </NotistackProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
