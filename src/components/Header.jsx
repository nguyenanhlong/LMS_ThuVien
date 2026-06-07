import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';

const profileImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MIRlxiu0qf1ifXHNU2EXzkSWYIfk5R_VwfhQDr7ZKf1BKpBlLJLRvGSGyydAT7iYjpQ7dTMvG4G_0t3MKxaEcSO_HKNFbN8JLTPzg1QAva71wXTcWQdzIsIdkpHWYylHJZdj8U_EtF1FKuRcW9hhEorX-2EXAvJedi4ft7Ay1zVd5qmfu0nw7UqqsQZlw8uz0QKcLYatXH3MwLFRsXlZiDzf1wsf56SBbYL_2sQwHlxsFSlGyb6dnMbABQRUHLrivfKcEzDpMWI';

const badgeStyle = {
  danger: 'bg-rose-100 text-rose-700',
  error: 'bg-rose-100 text-rose-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-sky-100 text-sky-700',
  success: 'bg-emerald-100 text-emerald-700',
};

export default function Header() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({ name: 'Admin', role: 'admin', email: 'admin@library.vn' });

  useEffect(() => {
    const fetchNotifs = async () => {
      const data = await mockApi.getNotifications();
      setNotifications(data.slice(0, 5)); // only top 5 for header
    };
    fetchNotifs();

    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await mockApi.logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative border-r border-outline-variant pr-4" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setNotificationOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors relative"
            aria-label="Thông báo"
          >
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-full mt-3 w-[360px] rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 z-50 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 shrink-0">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Thông báo mới</p>
                    <p className="text-xs text-slate-500">Bạn có {unreadCount} thông báo chưa đọc</p>
                  </div>
                  <Link to="/notifications" onClick={() => setNotificationOpen(false)} className="text-xs font-semibold text-primary hover:underline">
                    Xem tất cả
                  </Link>
                </div>
              </div>
              <div className="max-h-[340px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`border-b border-slate-200 last:border-b-0 p-4 transition-colors ${notification.isRead ? 'bg-white' : 'bg-slate-50'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeStyle[notification.type] || badgeStyle.info}`}>
                        {notification.type === 'error' || notification.type === 'danger' ? 'Khẩn cấp' : notification.type === 'warning' ? 'Chú ý' : 'Thông tin'}
                      </span>
                      {!notification.isRead && <span className="text-xs text-slate-500 text-primary font-bold">mới</span>}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-slate-900 truncate" title={notification.title}>
                      {notification.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2">{notification.message}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="p-4 text-center text-sm text-slate-500">Không có thông báo nào</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-2 rounded-2xl hover:bg-surface-container-high pr-2 py-1 transition-colors"
            aria-label="Tài khoản"
          >
            <div className="text-right">
              <p className="font-body-sm text-body-sm font-bold text-on-surface">{user.name}</p>
              <p className="text-[11px] text-on-surface-variant capitalize">{user.role}</p>
            </div>
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-primary-container object-cover"
              src={profileImage}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-3 w-[280px] rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 z-50 overflow-hidden">
              <div className="p-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-primary-container object-cover"
                    src={profileImage}
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-950">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    <span className="mt-2 inline-flex rounded-full bg-primary-container/10 px-3 py-1 text-[11px] font-semibold text-primary capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Link onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" to="/profile">
                  <span className="material-symbols-outlined text-base">account_circle</span>
                  Hồ sơ cá nhân
                </Link>
                <Link onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" to="/change-password">
                  <span className="material-symbols-outlined text-base">lock_reset</span>
                  Đổi mật khẩu
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50">
                  <span className="material-symbols-outlined text-base">logout</span>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
