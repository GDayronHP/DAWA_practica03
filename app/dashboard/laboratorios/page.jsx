'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import LaboratorioForm from '../../components/laboratorio/LaboratorioForm';
import { laboratorioService } from '../../services/laboratorioService';
import { useAuth } from '../../context/AuthContext';
import { canCreate, canUpdate, canDelete } from '../../utils/permissions';

export default function LaboratoriosPage() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLaboratorio, setEditingLaboratorio] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user } = useAuth();

  // Filtro usando los campos correctos
  const filteredLaboratorios = laboratorios.filter(lab =>
    (lab.razonSocial && lab.razonSocial.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.direccion && lab.direccion.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.telefono && lab.telefono.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.email && lab.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.contacto && lab.contacto.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    loadLaboratorios();
  }, []);

  const loadLaboratorios = async () => {
    try {
      setLoading(true);
      const data = await laboratorioService.getAll();
      // Mapea los datos para que coincidan con el modelo real
      const adaptados = data.map(lab => ({
        CodLab: lab.CodLab,
        razonSocial: lab.razonSocial,
        direccion: lab.direccion,
        telefono: lab.telefono,
        email: lab.email,
        contacto: lab.contacto,
      }));
      setLaboratorios(adaptados);
    } catch (err) {
      setError('Error al cargar laboratorios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingLaboratorio(null);
    setShowForm(true);
  };

  const handleEdit = (laboratorio) => {
    setEditingLaboratorio(laboratorio);
    setShowForm(true);
  };

  const handleDelete = async (CodLab) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este laboratorio?')) {
      try {
        await laboratorioService.delete(CodLab);
        await loadLaboratorios();
      } catch (err) {
        setError('Error al eliminar laboratorio');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingLaboratorio) {
        await laboratorioService.update(editingLaboratorio.CodLab, formData);
      } else {
        await laboratorioService.create(formData);
      }
      setShowForm(false);
      setEditingLaboratorio(null);
      await loadLaboratorios();
    } catch (err) {
      setError('Error al guardar laboratorio');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLaboratorio(null);
  };

  return (
    <ProtectedRoute requiredPermission="read" resource="laboratorio">
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Laboratorios</h1>
                {canCreate(user?.role, 'laboratorio') && (
                  <button
                    onClick={handleCreate}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Nuevo Laboratorio
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {/* Barra de búsqueda */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Buscar laboratorios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {showForm && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {editingLaboratorio ? 'Editar Laboratorio' : 'Nuevo Laboratorio'}
                  </h2>
                  <LaboratorioForm
                    laboratorio={editingLaboratorio}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                  />
                </div>
              )}

              {loading ? (
                <div className="text-center py-4">Cargando...</div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {filteredLaboratorios.length === 0 ? (
                      <li className="px-6 py-4 text-center text-gray-500">
                        No se encontraron laboratorios
                      </li>
                    ) : (
                      filteredLaboratorios.map((lab) => (
                        <li key={lab.CodLab} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {lab.razonSocial}
                              </h3>
                              {lab.direccion && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {lab.direccion}
                                </p>
                              )}
                              {lab.telefono && (
                                <p className="text-sm text-gray-500 mt-1">
                                  📞 {lab.telefono}
                                </p>
                              )}
                              {lab.email && (
                                <p className="text-sm text-gray-500 mt-1">
                                  ✉️ {lab.email}
                                </p>
                              )}
                              {lab.contacto && (
                                <p className="text-sm text-gray-500 mt-1">
                                  👤 {lab.contacto}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              {canUpdate(user?.role, 'laboratorio') && (
                                <button
                                  onClick={() => handleEdit(lab)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                >
                                  Editar
                                </button>
                              )}
                              {canDelete(user?.role, 'laboratorio') && (
                                <button
                                  onClick={() => handleDelete(lab.CodLab)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                >
                                  Eliminar
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}