import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Intercepteur — injecte le token Bearer sur toutes les requêtes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('admin_token');
};

// Inscription équipe (public)
export const registerTeam = async (teamData) => {
    const response = await api.post('/register', teamData);
    return response.data;
};

export const trackTeam = async (trackingNumber) => {
    const response = await api.get(`/track/${trackingNumber}`);
    return response.data;
};

// Admin
export const fetchTeams = async () => {
    const response = await api.get('/teams');
    return response.data;
};

export const getStats = async () => {
    const response = await api.get('/stats');
    return response.data;
};

export const updateTeamStatus = async (teamId, status) => {
    const response = await api.put(`/teams/${teamId}/status`, { status });
    return response.data;
};

export const exportTeams = `${API_BASE_URL}/export`;

export default api;
