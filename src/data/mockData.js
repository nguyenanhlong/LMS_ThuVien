export const initialBooks = [
  { code: 'BK-0921', cover: 'https://via.placeholder.com/70x100?text=Cover', title: 'Kỹ thuật lập trình hiện đại', author: 'Nguyễn Văn A', category: 'Kỹ thuật', status: 'Sẵn sàng' },
  { code: 'BK-1104', cover: 'https://via.placeholder.com/70x100?text=Cover', title: 'Thiết kế UI/UX cơ bản', author: 'Trần Thị B', category: 'Nghệ thuật', status: 'Đang mượn' },
  { code: 'BK-0082', cover: 'https://via.placeholder.com/70x100?text=Cover', title: 'Lịch sử văn minh nhân loại', author: 'Lê Văn C', category: 'Lịch sử', status: 'Bảo trì' },
  { code: 'BK-2023', cover: 'https://via.placeholder.com/70x100?text=Cover', title: 'Clean Architecture', author: 'Robert C. Martin', category: 'Kỹ thuật', status: 'Sẵn sàng' },
  { code: 'BK-3041', cover: 'https://via.placeholder.com/70x100?text=Cover', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ năng mềm', status: 'Sẵn sàng' },
];

export const initialReaders = [
  { id: 'RD-1001', name: 'Nguyen Van A', card: 'LIB-2024-001', phone: '090 123 4567', email: 'vana.nguyen@email.com', type: 'Sinh vien', status: 'Hoat dong' },
  { id: 'RD-1002', name: 'Tran Thi B', card: 'LIB-2024-002', phone: '091 888 9999', email: 'b.tran@email.com', type: 'Giang vien', status: 'Da khoa' },
];

export const initialLoans = [
  { id: 'LN-1023', readerId: 'RD-1001', readerName: 'Nguyen Van A', date: '2026-06-03', due: '2026-06-17', status: 'Đang mượn', books: ['BK-0921', 'BK-2023'] },
  { id: 'LN-1022', readerId: 'RD-1002', readerName: 'Tran Thi B', date: '2026-06-01', due: '2026-06-15', status: 'Đã trả', books: ['BK-1104'] },
];

export const initialFines = [
  { id: 'FN-001', loanId: 'LN-1020', readerId: 'RD-1001', readerName: 'Nguyen Van A', amount: 50000, reason: 'Quá hạn 5 ngày', status: 'Chưa thu', date: '2026-06-01' }
];

export const initialSuppliers = [
  { id: 'SUP-001', name: 'Nha sach Tri Tue', contact: 'Mai Anh', phone: '028 3822 1122', email: 'sales@tritue.vn', books: 420, status: 'Dang hop tac' },
  { id: 'SUP-002', name: 'NXB Khoa Hoc Tre', contact: 'Hoang Nam', phone: '024 5566 7788', email: 'partner@khtr.vn', books: 280, status: 'Tam dung' },
];

export const initialNotifications = [
  { id: 'NT-1', title: 'Yêu cầu nhập sách mới', message: 'Bộ phận học thuật yêu cầu 50 cuốn...', type: 'warning', date: new Date(Date.now() - 10*60000).toISOString(), isRead: false },
  { id: 'NT-2', title: 'Thành viên mới đăng ký', message: 'Nguyễn Văn A vừa hoàn tất hồ sơ...', type: 'info', date: new Date(Date.now() - 60*60000).toISOString(), isRead: false },
  { id: 'NT-3', title: 'Hệ thống đã cập nhật', message: 'Phiên bản v2.4.1 đã sẵn sàng...', type: 'success', date: new Date(Date.now() - 180*60000).toISOString(), isRead: true },
];

export const initialAuditLogs = [
  { id: 'AL-1', action: 'Thêm sách mới', user: 'Admin', details: 'Thêm sách Kỹ thuật lập trình hiện đại', date: new Date(Date.now() - 120*60000).toISOString() },
  { id: 'AL-2', action: 'Tạo phiếu mượn', user: 'Librarian', details: 'Phiếu mượn LN-1023', date: new Date(Date.now() - 140*60000).toISOString() }
];

export const initialReservations = [
  { id: 'RS-1', bookCode: 'BK-1104', readerName: 'Lê Văn C', email: 'levanc@email.com', status: 'Chờ nhận', date: new Date().toISOString() }
];
