import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useToast } from '../context/ToastContext';
import mockApi from '../services/mockApi';

export default function Profile() {
  const showToast = useToast();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('authUser', JSON.stringify(user));
      mockApi.addAuditLog('Cập nhật hồ sơ', 'Thay đổi thông tin cá nhân');
      showToast('Cập nhật hồ sơ thành công', 'success');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-3xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-semibold">Hồ sơ cá nhân</h1>
            <p className="text-sm text-slate-500 mt-1">Quản lý thông tin tài khoản của bạn.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-24 h-24 rounded-full bg-primary-container text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{user.name || 'Người dùng'}</h2>
                  <p className="text-slate-500 uppercase text-xs font-semibold tracking-wider mt-1">{user.role}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Họ và tên</label>
                <input 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary transition-all bg-slate-50 focus:bg-white" 
                  value={user.name}
                  onChange={e => setUser({...user, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input 
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary transition-all bg-slate-50 focus:bg-white" 
                  value={user.email}
                  onChange={e => setUser({...user, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Quyền hạn</label>
                <input 
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed capitalize" 
                  value={user.role}
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 flex items-center gap-2">
                  {loading && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
