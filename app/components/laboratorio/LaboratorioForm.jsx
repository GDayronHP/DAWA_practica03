'use client';
import { useState, useEffect } from 'react';

export default function LaboratorioForm({ 
  laboratorio = null, 
  onSubmit, 
  onCancel, 
  loading = false 
}) {
  const [formData, setFormData] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: ''
  });

  useEffect(() => {
    if (laboratorio) {
      setFormData({
        razonSocial: laboratorio.razonSocial || '',
        direccion: laboratorio.direccion || '',
        telefono: laboratorio.telefono || '',
        email: laboratorio.email || '',
        contacto: laboratorio.contacto || ''
      });
    }
  }, [laboratorio]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700">
          Razón Social *
        </label>
        <input
          type="text"
          id="razonSocial"
          name="razonSocial"
          required
          value={formData.razonSocial}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
          Dirección *
        </label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          required
          value={formData.direccion}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono *
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          required
          value={formData.telefono}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="contacto" className="block text-sm font-medium text-gray-700">
          Contacto *
        </label>
        <input
          type="text"
          id="contacto"
          name="contacto"
          required
          value={formData.contacto}
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
          {loading ? 'Guardando...' : (laboratorio ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
}