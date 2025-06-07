'use client';
import { useState, useEffect } from 'react';

export default function OrdenCompraForm({ 
  ordencompra = null, 
  laboratorios = [],
  onSubmit, 
  onCancel, 
  loading = false 
}) {
  const [formData, setFormData] = useState({
    fechaEmision: '',
    Situacion: 'pendiente',
    Total: '',
    CodLab: '',
    NroFacturaProv: ''
  });

  useEffect(() => {
    if (ordencompra) {
      setFormData({
        fechaEmision: ordencompra.fechaEmision ? ordencompra.fechaEmision.split('T')[0] : '',
        Situacion: ordencompra.Situacion || 'pendiente',
        Total: ordencompra.Total?.toString() || '',
        CodLab: ordencompra.CodLab?.toString() || '',
        NroFacturaProv: ordencompra.NroFacturaProv?.toString() || ''
      });
    }
  }, [ordencompra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convierte los campos numéricos
    onSubmit({
      ...formData,
      Total: parseFloat(formData.Total),
      CodLab: parseInt(formData.CodLab),
      NroFacturaProv: formData.NroFacturaProv ? parseInt(formData.NroFacturaProv) : null,
      fechaEmision: formData.fechaEmision ? new Date(formData.fechaEmision).toISOString() : null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fechaEmision" className="block text-sm font-medium text-gray-700">
            Fecha de Emisión *
          </label>
          <input
            type="date"
            id="fechaEmision"
            name="fechaEmision"
            required
            value={formData.fechaEmision}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="Situacion" className="block text-sm font-medium text-gray-700">
            Situación *
          </label>
          <select
            id="Situacion"
            name="Situacion"
            value={formData.Situacion}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="pendiente">Pendiente</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="Total" className="block text-sm font-medium text-gray-700">
          Total (S/) *
        </label>
        <input
          type="number"
          step="0.01"
          id="Total"
          name="Total"
          required
          value={formData.Total}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="CodLab" className="block text-sm font-medium text-gray-700">
          Laboratorio *
        </label>
        <select
          id="CodLab"
          name="CodLab"
          required
          value={formData.CodLab}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Seleccione un laboratorio</option>
          {laboratorios.map(lab => (
            <option key={lab.CodLab} value={lab.CodLab}>
              {lab.razonSocial}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="NroFacturaProv" className="block text-sm font-medium text-gray-700">
          Nro. Factura Proveedor
        </label>
        <input
          type="number"
          id="NroFacturaProv"
          name="NroFacturaProv"
          value={formData.NroFacturaProv}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : (ordencompra ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
}