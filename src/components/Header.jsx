import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    status: 'danger',
    title: 'Nhắc hạn trả sách: Sách "The Clean Architecture" (ID: BK-7702) đã quá hạn 2 ngày.',
    description: 'Vui lòng hoàn trả hoặc gia hạn ngay để tránh phí phạt tích lũy.',
    action: 'Hoàn trả ngay',
  },
  {
    id: 2,
    status: 'warning',
    title: 'Sách đặt trước đã có mặt: Cuốn "Design Patterns: Elements of Reusable Object-Oriented Software" bạn đặt trước đã được trả về.',
    description: 'Chúng tôi sẽ giữ sách tại quầy trong 48 giờ tới.',
    action: 'Xem lịch hẹn lấy',
  },
  {
    id: 3,
    status: 'info',
    title: 'Cập nhật chính sách: Thư viện điều chỉnh thời gian mượn tối đa cho sách chuyên ngành từ 14 ngày lên 21 ngày.',
    description: 'Áp dụng từ ngày 01/08/2024.',
    action: 'Đọc toàn văn',
  },
];

const badgeStyle = {
  danger: 'bg-rose-100 text-rose-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-sky-100 text-sky-700',
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-surface dark:bg-surface-dim h-16 px-gutter flex justify-between items-center border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-white border-2 border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-gray-400"
            placeholder="Tìm kiếm sách, tác giả hoặc mã số..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center border-r border-outline-variant pr-4 gap-2" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors relative"
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">
              settings
            </span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-3 w-[360px] rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Thông báo mới</p>
                    <p className="text-xs text-slate-500">Bạn có {notifications.length} thông báo</p>
                  </div>
                  <Link to="/notifications" className="text-xs font-semibold text-primary hover:underline">
                    Xem tất cả
                  </Link>
                </div>
              </div>
              <div className="max-h-[340px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-b border-slate-200 last:border-b-0 p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeStyle[notification.status]}`}>
                        {notification.status === 'danger' ? 'Khẩn cấp' : notification.status === 'warning' ? 'Chú ý' : 'Thông tin'}
                      </span>
                      <span className="text-xs text-slate-500">mới</span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-slate-900 truncate" title={notification.title}>
                      {notification.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2">{notification.description}</p>
                    <button className="mt-3 rounded-full bg-primary-container px-3 py-2 text-xs font-semibold text-white hover:brightness-105 transition-all">
                      {notification.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="font-body-sm text-body-sm font-bold text-on-surface">
              Admin Lumina
            </p>
            <p className="text-[11px] text-on-surface-variant">Librarian</p>
          </div>
          <img
            alt="Librarian profile picture"
            className="w-9 h-9 rounded-full border-2 border-primary-container object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1MIRlxiu0qf1ifXHNU2EXzkSWYIfk5R_VwfhQDr7ZKf1BKpBlLJLRvGSGyydAT7iYjpQ7dTMvG4G_0t3MKxaEcSO_HKNFbN8JLTPzg1QAva71wXTcWQdzIsIdkpHWYylHJZdj8U_EtF1FKuRcW9hhEorX-2EXAvJedi4ft7Ay1zVd5qmfu0nw7UqqsQZlw8uz0QKcLYatXH3MwLFRsXlZiDzf1wsf56SBbYL_2sQwHlxsFSlGyb6dnMbABQRUHLrivfKcEzDpMWI"
          />
        </div>
      </div>
    </header>
  );
}
