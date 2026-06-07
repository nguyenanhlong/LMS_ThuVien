import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useToast } from '../context/ToastContext';
import mockApi from '../services/mockApi';

export default function ChangePassword() {
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ current: '', newPass: '', confirm: '' });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPass !== formData.confirm) {
      return showToast('Mật khẩu mới không khớp', 'error');
    }
    if (formData.newPass.length < 6) {
      return showToast('Mật khẩu phải có ít nhất 6 ký tự', 'error');
    }
    setLoading(true);
    setTimeout(() => {
      mockApi.addAuditLog('Đổi mật khẩu', 'Người dùng đổi mật khẩu');
      showToast('Đổi mật khẩu thành công', 'success');
      setFormData({ current: '', newPass: '', confirm: '' });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-2xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-semibold">Đổi mật khẩu</h1>
            <p className="text-sm text-slate-500 mt-1">Cập nhật mật khẩu để bảo vệ tài khoản.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Mật khẩu hiện tại</label>
                <div className="relative">
                  <input 
                    type={showCurrent ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-primary transition-all bg-slate-50 focus:bg-white" 
                    value={formData.current}
                    onChange={e => setFormData({...formData, current: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{showCurrent ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-900 mb-2">Mật khẩu mới</label>
                <div className="relative">
                  <input 
                    type={showNew ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-primary transition-all bg-slate-50 focus:bg-white" 
                    value={formData.newPass}
                    onChange={e => setFormData({...formData, newPass: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{showNew ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <input 
                    type={showConfirm ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-primary transition-all bg-slate-50 focus:bg-white" 
                    value={formData.confirm}
                    onChange={e => setFormData({...formData, confirm: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{showConfirm ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 flex items-center gap-2">
                  {loading && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                  Cập nhật mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
