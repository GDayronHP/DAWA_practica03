import api from './api';

export const laboratorioService = {
  async getAll() {
    const response = await api.get('/api/laboratorio');
    return response.data;
  },

  async create(laboratorio) {
    const response = await api.post('/api/laboratorio', laboratorio);
    return response.data;
  },

  async update(id, laboratorio) {
    const response = await api.put(`/api/laboratorio/${id}`, laboratorio);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/api/laboratorio/${id}`);
  }
};