import {
  initialBooks, initialReaders, initialLoans, initialFines,
  initialSuppliers, initialNotifications, initialAuditLogs, initialReservations
} from '../data/mockData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getStorage = (key, initialData) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize
export const resetData = () => {
  localStorage.clear();
  window.location.reload();
};

const mockApi = {
  // Books
  getBooks: async () => {
    await delay();
    return getStorage('books', initialBooks);
  },
  getBookByCode: async (code) => {
    await delay();
    const books = getStorage('books', initialBooks);
    return books.find(b => b.code === code);
  },
  createBook: async (book) => {
    await delay();
    const books = getStorage('books', initialBooks);
    books.push(book);
    setStorage('books', books);
    mockApi.addAuditLog('Thêm sách mới', `Mã sách: ${book.code}`);
    return book;
  },
  updateBook: async (code, data) => {
    await delay();
    const books = getStorage('books', initialBooks);
    const idx = books.findIndex(b => b.code === code);
    if (idx !== -1) {
      books[idx] = { ...books[idx], ...data };
      setStorage('books', books);
      return books[idx];
    }
    throw new Error('Book not found');
  },
  deleteBook: async (code) => {
    await delay();
    let books = getStorage('books', initialBooks);
    books = books.filter(b => b.code !== code);
    setStorage('books', books);
    mockApi.addAuditLog('Xóa sách', `Mã sách: ${code}`);
  },

  // Readers
  getReaders: async () => {
    await delay();
    return getStorage('readers', initialReaders);
  },
  getReaderById: async (id) => {
    await delay();
    const readers = getStorage('readers', initialReaders);
    return readers.find(r => r.id === id);
  },
  createReader: async (reader) => {
    await delay();
    const readers = getStorage('readers', initialReaders);
    readers.push(reader);
    setStorage('readers', readers);
    mockApi.addAuditLog('Thêm độc giả', `Mã độc giả: ${reader.id}`);
    return reader;
  },

  // Loans
  getLoans: async () => {
    await delay();
    return getStorage('loans', initialLoans);
  },
  getLoanById: async (id) => {
    await delay();
    const loans = getStorage('loans', initialLoans);
    return loans.find(l => l.id === id);
  },
  createLoan: async (loan) => {
    await delay();
    const loans = getStorage('loans', initialLoans);
    loans.push(loan);
    setStorage('loans', loans);
    
    // Update book statuses
    const books = getStorage('books', initialBooks);
    loan.books.forEach(bc => {
      const b = books.find(bk => bk.code === bc);
      if (b) b.status = 'Đang mượn';
    });
    setStorage('books', books);
    
    mockApi.addAuditLog('Tạo phiếu mượn', `Phiếu mượn: ${loan.id}`);
    return loan;
  },
  updateLoan: async (id, data) => {
    await delay();
    const loans = getStorage('loans', initialLoans);
    const idx = loans.findIndex(l => l.id === id);
    if (idx !== -1) {
      loans[idx] = { ...loans[idx], ...data };
      setStorage('loans', loans);
      return loans[idx];
    }
    throw new Error('Loan not found');
  },

  // Fines
  getFines: async () => {
    await delay();
    return getStorage('fines', initialFines);
  },
  createFine: async (fine) => {
    await delay();
    const fines = getStorage('fines', initialFines);
    fines.push(fine);
    setStorage('fines', fines);
    return fine;
  },
  markFinePaid: async (id) => {
    await delay();
    const fines = getStorage('fines', initialFines);
    const idx = fines.findIndex(f => f.id === id);
    if (idx !== -1) {
      fines[idx].status = 'Đã thu';
      setStorage('fines', fines);
      mockApi.addAuditLog('Thu tiền phạt', `Khoản phạt: ${id}`);
    }
  },

  // Reservations
  createReservation: async (res) => {
    await delay();
    const reservations = getStorage('reservations', initialReservations);
    reservations.push(res);
    setStorage('reservations', reservations);
    mockApi.addAuditLog('Đặt trước sách', `Sách: ${res.bookCode}, Người đặt: ${res.readerName}`);
    return res;
  },

  // Audit Logs
  getAuditLogs: async () => {
    await delay();
    return getStorage('auditLogs', initialAuditLogs).sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  addAuditLog: (action, details) => {
    const logs = getStorage('auditLogs', initialAuditLogs);
    const user = JSON.parse(localStorage.getItem('authUser'))?.name || 'System';
    logs.push({
      id: `AL-${Date.now()}`,
      action,
      details,
      user,
      date: new Date().toISOString()
    });
    setStorage('auditLogs', logs);
  },

  // Notifications
  getNotifications: async () => {
    await delay();
    return getStorage('notifications', initialNotifications).sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  markNotificationRead: async (id) => {
    await delay(200);
    const notifs = getStorage('notifications', initialNotifications);
    const idx = notifs.findIndex(n => n.id === id);
    if (idx !== -1) {
      notifs[idx].isRead = true;
      setStorage('notifications', notifs);
    }
  },
  markAllNotificationsRead: async () => {
    await delay(200);
    const notifs = getStorage('notifications', initialNotifications);
    notifs.forEach(n => n.isRead = true);
    setStorage('notifications', notifs);
  },
  addNotification: (title, message, type = 'info') => {
    const notifs = getStorage('notifications', initialNotifications);
    notifs.push({
      id: `NT-${Date.now()}`,
      title, message, type, isRead: false, date: new Date().toISOString()
    });
    setStorage('notifications', notifs);
  },

  // Auth
  login: async (email, password) => {
    await delay(800);
    if (email === 'admin@library.vn' && password === 'admin123') {
      const user = { email, name: 'Admin User', role: 'admin' };
      localStorage.setItem('authUser', JSON.stringify(user));
      return user;
    }
    if (email === 'librarian@library.vn' && password === '123456') {
      const user = { email, name: 'Librarian', role: 'librarian' };
      localStorage.setItem('authUser', JSON.stringify(user));
      return user;
    }
    throw new Error('Email hoặc mật khẩu không đúng');
  },
  logout: async () => {
    await delay();
    localStorage.removeItem('authUser');
  },
  
  // Suppliers
  getSuppliers: async () => {
    await delay();
    return getStorage('suppliers', initialSuppliers);
  }
};

export default mockApi;
