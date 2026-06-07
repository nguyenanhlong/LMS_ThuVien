import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const showToast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mockApi.login(email, password);
      showToast('Đăng nhập thành công!', 'success');
      navigate('/');
    } catch (err) {
      showToast(err.message || 'Lỗi đăng nhập', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    showToast('Vui lòng liên hệ quản trị viên để cấp lại mật khẩu.', 'info');
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_520px] bg-slate-950">
      <section className="hidden lg:flex flex-col justify-between p-12 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
        <div className="rounded-2xl bg-slate-950/70 px-5 py-4 text-white backdrop-blur">
          <h1 className="text-3xl font-bold">Library</h1>
          <p className="mt-2 text-sm text-slate-200">Quản lý sách, độc giả và lưu lượng mượn trả trên một giao diện tập trung.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
          <div className="h-12 w-12 rounded-2xl bg-primary-container text-white flex items-center justify-center">
            <span className="material-symbols-outlined">local_library</span>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-950">Đăng nhập hệ thống</h2>
          <p className="mt-2 text-sm text-slate-500">Nhập tài khoản thủ thư hoặc admin để tiếp tục.</p>
          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <input 
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              placeholder="Email (admin@library.vn / librarian@library.vn)" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              placeholder="Mật khẩu" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="text-primary focus:ring-primary" /> Ghi nhớ đăng nhập</label>
              <a className="font-semibold text-primary" href="#" onClick={handleForgotPassword}>Quên mật khẩu?</a>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-primary-container py-3 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
