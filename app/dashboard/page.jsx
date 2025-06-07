'use client';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { ROLE_NAMES } from '../utils/constants';
import Link from 'next/link'; // Asegúrate de importar Link

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Bienvenido al Dashboard
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Laboratorios */}
                <Link href="/dashboard/laboratorios" className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-100 transition">
                  <div className="p-5 cursor-pointer">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="text-2xl">🧪</div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Laboratorios
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestión de laboratorios
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Órdenes de Compra */}
                <Link href="/dashboard/ordencompra" className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-100 transition">
                  <div className="p-5 cursor-pointer">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="text-2xl">📋</div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Órdenes de Compra
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestión de órdenes
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}