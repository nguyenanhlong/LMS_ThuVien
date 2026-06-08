import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import '../styles/frontend.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, borrowed: 0, members: 0, overdue: 0 });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [b, l, r, n] = await Promise.all([
        api.getBooks(),
        api.getLoans(),
        api.getReaders(),
        api.getNotifications()
      ]);
      
      const overdue = l.filter(loan => loan.status !== 'Đã trả' && new Date(loan.due) < new Date()).length;
      
      setStats({
        books: b.length,
        borrowed: b.filter(x => x.status === 'Đang mượn').length,
        members: r.length,
        overdue
      });
      setNotifications(n.slice(0, 5));
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors border border-transparent">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                  <span className="material-symbols-outlined">auto_stories</span>
                </div>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng số sách</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.books}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors border border-transparent">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-fixed rounded-lg text-secondary">
                  <span className="material-symbols-outlined">outbox</span>
                </div>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đang cho mượn</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.borrowed}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors border border-transparent">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary-fixed rounded-lg text-tertiary">
                  <span className="material-symbols-outlined">person</span>
                </div>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thành viên</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.members}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors border border-transparent">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-error-container rounded-lg text-rose-600">
                  <span className="material-symbols-outlined">priority_high</span>
                </div>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trả trễ hạn</h3>
              <p className="text-3xl font-bold text-rose-600 mt-1">{stats.overdue}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl card-shadow h-[400px] flex flex-col border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Thống kê lưu thông</h2>
                  <p className="text-sm text-slate-500">Hoạt động mượn trả trong 7 ngày qua</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary">
                  <option>Tuần này</option>
                  <option>Tháng trước</option>
                </select>
              </div>
              <div className="flex-1 w-full bg-slate-50 rounded-xl relative flex items-end justify-between p-8 gap-4 overflow-hidden border border-slate-100">
                {[80, 90, 70, 85, 40, 65, 95].map((height, index) => (
                  <div key={index} className="w-full bg-primary-container/20 h-[60%] rounded-t-lg relative group">
                    <div className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:brightness-110" style={{ height: `${height}%` }}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl card-shadow h-[400px] flex flex-col border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Thông báo gần đây</h2>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {notifications.map(n => (
                  <div key={n.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.type === 'error' || n.type === 'warning' ? 'bg-orange-100 text-orange-600' : n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                      <span className="material-symbols-outlined text-sm">{n.type === 'error' || n.type === 'warning' ? 'warning' : n.type === 'success' ? 'check_circle' : 'info'}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{n.title}</p>
                      <p className="text-xs text-slate-600 line-clamp-1">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{new Date(n.date).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && <div className="text-center text-slate-500 text-sm py-4">Không có thông báo</div>}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-auto p-8 border-t border-slate-200 flex justify-between items-center text-slate-500 text-xs">
          <p>© 2024 Library Management System. v2.4.1</p>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">Quy định thư viện</a>
            <a className="hover:text-primary" href="#">Bảo mật hệ thống</a>
            <a className="hover:text-primary" href="#">Liên hệ hỗ trợ</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
