import './global.css';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Sistema de Gestión',
  description: 'Sistema de gestión con autenticación y roles',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}