'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';

export default function ProtectedRoute({ 
  children, 
  requiredPermission = null,
  resource = null 
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (requiredPermission && resource) {
        if (!hasPermission(user.role, requiredPermission, resource)) {
          router.push('/dashboard');
          return;
        }
      }
    }
  }, [user, loading, router, requiredPermission, resource]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredPermission && resource) {
    if (!hasPermission(user.role, requiredPermission, resource)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-red-600">No tienes permisos para acceder a esta página</div>
        </div>
      );
    }
  }

  return children;
}