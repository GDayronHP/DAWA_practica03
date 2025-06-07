import api from './api';
import jwt from 'jsonwebtoken';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);
      if (response.data.token) {
        const token = response.data.token;
        console.log('Token received:', token);
        localStorage.setItem('token', token);

        // Decodifica el token sin verificar (no expone el secret)
        const decoded = jwt.decode(token);
        console.log('Decoded token:', decoded);

        const user = {
          id: decoded?.id,
          role: decoded?.role,
        };

        localStorage.setItem('user', JSON.stringify(user));

        return {
          ...response.data,
          user,
        };
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error en el login' };
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/api/auth/register', {
        username: userData.nombre,
        email: userData.email,
        password: userData.password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error en el registro' };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    return JSON.parse(user);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
