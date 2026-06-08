import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { LoadingState, EmptyState } from './sharedUI';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const showToast = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const data = await api.getNotifications();
    setNotifications(data);
    setLoading(false);
  };

  const handleMarkRead = async (id) => {
    await api.markNotificationRead(id);
    fetchNotifications();
  };

  const handleMarkAllRead = async () => {
    await api.markAllNotificationsRead();
    showToast('Đã đánh dấu tất cả là đã đọc', 'success');
    fetchNotifications();
  };

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Thông báo</h1>
              <p className="text-sm text-slate-500 mt-1">Cập nhật hệ thống và yêu cầu từ người dùng.</p>
            </div>
            <button onClick={handleMarkAllRead} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 text-sm">
              Đánh dấu tất cả đã đọc
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-primary-container text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Tất cả</button>
            <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === 'unread' ? 'bg-primary-container text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Chưa đọc</button>
            <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === 'read' ? 'bg-primary-container text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Đã đọc</button>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : filtered.length === 0 ? <EmptyState title="Không có thông báo" message="Bạn đã xem hết các thông báo." /> : (
              <div className="space-y-4">
                {filtered.map(n => (
                  <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border ${n.isRead ? 'bg-white border-slate-100' : 'bg-slate-50 border-primary-container/20 shadow-sm'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      n.type === 'warning' || n.type === 'danger' || n.type === 'error' ? 'bg-rose-100 text-rose-600' :
                      n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'
                    }`}>
                      <span className="material-symbols-outlined">
                        {n.type === 'warning' || n.type === 'error' || n.type === 'danger' ? 'warning' : n.type === 'success' ? 'check_circle' : 'info'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-semibold ${n.isRead ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</h3>
                        <span className="text-xs text-slate-400">{new Date(n.date).toLocaleString('vi-VN')}</span>
                      </div>
                      <p className={`text-sm mt-1 ${n.isRead ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>{n.message}</p>
                      {!n.isRead && (
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => handleMarkRead(n.id)} className="px-3 py-1.5 text-xs font-semibold bg-primary-container/10 text-primary rounded-lg hover:bg-primary-container/20">
                            Đánh dấu đã đọc
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
