const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper to execute HTTP requests with automatic Bearer token injection
 */
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('hisabdo_jwt_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.details = data?.details;
    throw err;
  }

  return data;
};

export const api = {
  // Auth API
  register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getMe: () => fetchAPI('/auth/me', { method: 'GET' }),

  // Student API (Protected)
  getStudents: (searchQuery = '') => {
    const query = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
    return fetchAPI(`/students${query}`, { method: 'GET' });
  },
  getStudentById: (id) => fetchAPI(`/students/${id}`, { method: 'GET' }),
  createStudent: (studentData) => fetchAPI('/students', { method: 'POST', body: JSON.stringify(studentData) }),
  updateStudent: (id, studentData) => fetchAPI(`/students/${id}`, { method: 'PUT', body: JSON.stringify(studentData) }),
  deleteStudent: (id) => fetchAPI(`/students/${id}`, { method: 'DELETE' })
};
