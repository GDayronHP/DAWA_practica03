import api from './api';

export const ordencompraService = {
  async getAll() {
    const response = await api.get('/api/ordencompra');
    return response.data;
  },

  async create(ordencompra) {
    const response = await api.post('/api/ordencompra', ordencompra);
    return response.data;
  },

  async update(id, ordencompra) {
    const response = await api.put(`/api/ordencompra/${id}`, ordencompra);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/api/ordencompra/${id}`);
  }
};