import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const notifications = [
  {
    id: 1,
    type: 'error',
    title: 'Nhắc hạn trả sách: Sách "The Clean Architecture" (ID: BK-7702) đã quá hạn 2 ngày.',
    description: 'Vui lòng hoàn trả hoặc gia hạn ngay để tránh phí phạt tích lũy.',
    time: '24/05/2024 · 10:45 AM',
    action: 'Hoàn trả ngay',
    secondary: 'Chi tiết',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Sách đặt trước đã có mặt: Cuốn "Design Patterns: Elements of Reusable Object-Oriented Software" bạn đặt trước đã được trả về.',
    description: 'Chúng tôi sẽ giữ sách tại quầy trong 48 giờ tới.',
    time: '24/05/2024 · 08:30 AM',
    action: 'Xem lịch hẹn lấy',
    secondary: 'Hủy đặt',
  },
  {
    id: 3,
    type: 'info',
    title: 'Cập nhật chính sách: Thư viện điều chỉnh thời gian mượn tối đa cho sách chuyên ngành từ 14 ngày lên 21 ngày.',
    description: 'Áp dụng từ ngày 01/08/2024.',
    time: '23/05/2024 · Hôm qua',
    action: 'Đọc toàn văn',
  },
  {
    id: 4,
    type: 'success',
    title: 'Xác nhận trả sách: Hệ thống ghi nhận bạn đã trả sách "Atomic Habits" thành công.',
    description: 'Cảm ơn bạn đã sử dụng dịch vụ.',
    time: '22/05/2024 · Hôm qua',
    action: 'Xem biên lai',
  },
];

const badgeClasses = {
  error: 'bg-rose-100 text-rose-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-sky-100 text-sky-700',
  success: 'bg-emerald-100 text-emerald-700',
};

export default function Notifications() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="cursor-default">Dashboard</span>
              <span>›</span>
              <span className="font-semibold text-slate-900">Thông báo</span>
            </nav>
          </div>

          <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Trung tâm thông báo</h1>
                <p className="text-sm text-slate-500">Quản lý và theo dõi các cập nhật quan trọng từ hệ thống thư viện.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all">Tất cả</button>
                <button className="rounded-full bg-white border border-outline-variant px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-all">Chưa đọc (3)</button>
                <button className="rounded-full bg-white border border-outline-variant px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-all">Đã đọc</button>
              </div>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="rounded-3xl border border-slate-200 p-5 shadow-sm hover:border-primary transition-all">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses[notification.type]}`}>
                          {notification.type === 'error' ? 'Thông báo gấp' : notification.type === 'warning' ? 'Thông báo' : notification.type === 'info' ? 'Cập nhật' : 'Thành công'}
                        </span>
                        <span className="text-xs text-slate-500">{notification.time}</span>
                      </div>
                      <h2 className="mt-4 text-base font-semibold text-slate-900 truncate" style={{ maxWidth: '72ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {notification.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600">{notification.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white hover:brightness-105 transition-all">
                        {notification.action}
                      </button>
                      {notification.secondary && (
                        <button className="rounded-full border border-outline-variant bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-all">
                          {notification.secondary}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button className="rounded-full border border-outline-variant bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all">
                Tải thêm thông báo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
