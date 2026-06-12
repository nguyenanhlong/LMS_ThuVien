import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    // Đã xóa 'Content-Type': 'application/json' để Axios tự động nhận diện FormData khi upload ảnh
  },
});

client.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('authUser') || 'null');

  if (user?.name) {
    config.headers['X-User-Name'] = user.name;
  }

  if (user?.email) {
    config.headers['X-User-Email'] = user.email;
  }

  return config;
});

const unwrap = (promise) => promise.then((response) => response.data);

export const getBooks = () => unwrap(client.get('/books'));
export const getBookByCode = (code) => unwrap(client.get(`/books/${encodeURIComponent(code)}`));
export const createBook = (payload) => unwrap(client.post('/books', payload));
// Quan trọng: Đổi put thành post để hỗ trợ upload file qua FormData (kết hợp với _method='PUT' ở Frontend)
export const updateBook = (code, payload) => unwrap(client.post(`/books/${encodeURIComponent(code)}`, payload));
export const deleteBook = (code) => unwrap(client.delete(`/books/${encodeURIComponent(code)}`));

export const getReaders = () => unwrap(client.get('/readers'));
export const getReaderById = (id) => unwrap(client.get(`/readers/${encodeURIComponent(id)}`));
export const createReader = (payload) => unwrap(client.post('/readers', payload));
export const updateReader = (id, payload) => unwrap(client.put(`/readers/${encodeURIComponent(id)}`, payload));
export const deleteReader = (id) => unwrap(client.delete(`/readers/${encodeURIComponent(id)}`));

export const getLoans = () => unwrap(client.get('/loans'));
export const getLoanById = (id) => unwrap(client.get(`/loans/${encodeURIComponent(id)}`));
export const createLoan = (payload) => unwrap(client.post('/loans', payload));
export const updateLoan = (id, payload) => unwrap(client.put(`/loans/${encodeURIComponent(id)}`, payload));

export const getFines = () => unwrap(client.get('/fines'));
export const createFine = (payload) => unwrap(client.post('/fines', payload));
export const markFinePaid = (id) => unwrap(client.patch(`/fines/${encodeURIComponent(id)}/paid`));

export const getReservations = () => unwrap(client.get('/reservations'));
export const createReservation = (payload) => unwrap(client.post('/reservations', payload));

export const getAuditLogs = () => unwrap(client.get('/audit-logs'));
export const addAuditLog = (action, details) => unwrap(client.post('/audit-logs', { action, details }));

export const getNotifications = () => unwrap(client.get('/notifications'));
export const markNotificationRead = (id) => unwrap(client.patch(`/notifications/${encodeURIComponent(id)}/read`));
export const markAllNotificationsRead = () => unwrap(client.patch('/notifications/read-all'));
export const addNotification = (title, message, type = 'info') =>
  unwrap(client.post('/notifications', { title, message, type }));

export const login = async (email, password) => {
  const user = await unwrap(client.post('/auth/login', { email, password }));
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
};

export const logout = async () => {
  await unwrap(client.post('/auth/logout'));
  localStorage.removeItem('authUser');
};

export const changePassword = (current, newPass) => {
  const user = JSON.parse(localStorage.getItem('authUser') || 'null');

  return unwrap(client.post('/auth/change-password', {
    email: user?.email,
    current,
    newPass,
  }));
};

export const updateProfile = async (payload) => {
  const updatedUser = await unwrap(client.put('/auth/profile', payload));
  localStorage.setItem('authUser', JSON.stringify(updatedUser));
  return updatedUser;
};

export const getSuppliers = () => unwrap(client.get('/suppliers'));
export const getSupplierById = (id) => unwrap(client.get(`/suppliers/${encodeURIComponent(id)}`));

export const getReportSummary = () => unwrap(client.get('/reports/summary'));
export const getMonthlyLoans = () => unwrap(client.get('/reports/monthly-loans'));

export const resetData = () => {
  alert('Dữ liệu hiện đã nằm trong backend. Muốn reset database thì chạy: php artisan migrate:fresh --seed');
};

const api = {
  getBooks,
  getBookByCode,
  createBook,
  updateBook,
  deleteBook,

  getReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader,

  getLoans,
  getLoanById,
  createLoan,
  updateLoan,

  getFines,
  createFine,
  markFinePaid,

  getReservations,
  createReservation,

  getAuditLogs,
  addAuditLog,

  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  addNotification,

  login,
  logout,
  changePassword,
  updateProfile,

  getSuppliers,
  getSupplierById,

  getReportSummary,
  getMonthlyLoans,

  resetData,
};

export default api;