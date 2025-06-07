'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import OrdenCompraForm from '../../components/ordencompra/OrdenCompraForm';
import { ordencompraService } from '../../services/ordencompraService';
import { laboratorioService } from '../../services/laboratorioService';
import { useAuth } from '../../context/AuthContext';
import { canCreate, canUpdate, canDelete } from '../../utils/permissions';

export default function OrdenCompraPage() {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOrden, setEditingOrden] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  
  const { user } = useAuth();

  // Adaptador de datos
  const adaptOrdenes = (data) =>
    data.map(orden => ({
      id: orden.nroCompra,
      fechaEmision: orden.fechaEmision,
      Situacion: orden.Situacion,
      Total: orden.Total,
      CodLab: orden.CodLab,
      NroFacturaProv: orden.NroFacturaProv,
      laboratorio: orden.laboratorio,
    }));

  const filteredOrdenes = ordenesCompra.filter(orden => {
    const matchesSearch = 
      (orden.id?.toString().includes(searchTerm) ||
      orden.laboratorio?.razonSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (orden.NroFacturaProv && orden.NroFacturaProv.toString().includes(searchTerm)));
    
    const matchesFilter = !filterEstado || (orden.Situacion && orden.Situacion.toLowerCase() === filterEstado);
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    loadOrdenes();
    loadLaboratorios();
  }, []);

  const loadOrdenes = async () => {
    try {
      setLoading(true);
      const data = await ordencompraService.getAll();
      setOrdenesCompra(adaptOrdenes(data));
    } catch (err) {
      setError('Error al cargar órdenes de compra');
    } finally {
      setLoading(false);
    }
  };

  const loadLaboratorios = async () => {
    try {
      const data = await laboratorioService.getAll();
      setLaboratorios(data);
    } catch (err) {
      // Puedes manejar el error si lo deseas
    }
  };

  const handleCreate = () => {
    setEditingOrden(null);
    setShowForm(true);
  };

  const handleEdit = (orden) => {
    setEditingOrden(orden);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta orden de compra?')) {
      try {
        await ordencompraService.delete(id);
        await loadOrdenes();
      } catch (err) {
        setError('Error al eliminar orden de compra');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingOrden) {
        // Para update, usa los nombres en minúscula
        await ordencompraService.update(editingOrden.id, {
          fechaEmision: formData.fechaEmision,
          situacion: formData.Situacion,
          total: formData.Total,
          codLab: formData.CodLab,
          nrofacturaProv: formData.NroFacturaProv
        });
      } else {
        await ordencompraService.create(formData);
      }
      setShowForm(false);
      setEditingOrden(null);
      await loadOrdenes();
    } catch (err) {
      setError('Error al guardar orden de compra');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOrden(null);
  };

  const getEstadoBadgeColor = (estado) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      aprobada: 'bg-green-100 text-green-800',
      rechazada: 'bg-red-100 text-red-800',
      completada: 'bg-blue-100 text-blue-800'
    };
    return colors[estado?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  return (
    <ProtectedRoute requiredPermission="read" resource="ordencompra">
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Órdenes de Compra</h1>
                {canCreate(user?.role, 'ordencompra') && (
                  <button
                    onClick={handleCreate}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Nueva Orden de Compra
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Buscar órdenes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="aprobada">Aprobada</option>
                  <option value="rechazada">Rechazada</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              {showForm && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {editingOrden ? 'Editar Orden de Compra' : 'Nueva Orden de Compra'}
                  </h2>
                  <OrdenCompraForm
                    ordencompra={editingOrden}
                    laboratorios={laboratorios}
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
                    {filteredOrdenes.length === 0 ? (
                      <li className="px-6 py-4 text-center text-gray-500">
                        No se encontraron órdenes de compra
                      </li>
                    ) : (
                      filteredOrdenes.map((orden) => (
                        <li key={orden.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-medium text-gray-900">
                                  #{orden.id}
                                </h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoBadgeColor(orden.Situacion)}`}>
                                  {orden.Situacion?.charAt(0).toUpperCase() + orden.Situacion?.slice(1)}
                                </span>
                              </div>
                              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Laboratorio:</span> {orden.laboratorio?.razonSocial}
                                </div>
                                <div>
                                  <span className="font-medium">Fecha:</span> {formatDate(orden.fechaEmision)}
                                </div>
                                <div>
                                  <span className="font-medium">Total:</span> {formatMoney(orden.Total)}
                                </div>
                              </div>
                              {orden.NroFacturaProv && (
                                <p className="text-sm text-gray-500 mt-2">
                                  Factura: {orden.NroFacturaProv}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              {canUpdate(user?.role, 'ordencompra') && (
                                <button
                                  onClick={() => handleEdit(orden)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                >
                                  Editar
                                </button>
                              )}
                              {canDelete(user?.role, 'ordencompra') && (
                                <button
                                  onClick={() => handleDelete(orden.id)}
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