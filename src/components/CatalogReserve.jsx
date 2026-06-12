import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { LoadingState } from './sharedUI';
import '../styles/frontend.css';

export default function CatalogReserve() {
  const { code } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    readerName: '',
    email: '',
    phone: '',
    notifyMethod: 'email',
    notes: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const data = await api.getBookByCode(code);
      if (!data) {
        showToast('Sách không tồn tại', 'error');
        navigate('/catalog');
      } else {
        setBook(data);
      }
      setLoading(false);
    };
    fetchBook();
  }, [code, navigate, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.readerName || !formData.email) {
      showToast('Vui lòng điền họ tên và email', 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      await api.createReservation({
        bookCode: book.code,
        readerName: formData.readerName,
        email: formData.email,
        phone: formData.phone,
        status: 'Chờ nhận',
        date: new Date().toISOString()
      });
      showToast('Đặt trước sách thành công!', 'success');
      navigate(`/catalog/${code}`);
    } catch (err) {
      showToast('Có lỗi xảy ra', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="dashboard-container"><Sidebar /><main className="ml-sidebar-width min-h-screen flex flex-col bg-background"><Header /><LoadingState /></main></div>;
  if (!book) return null;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link className="hover:text-primary cursor-pointer" to="/dashboard">Dashboard</Link>
              <span>›</span>
              <Link className="hover:text-primary cursor-pointer" to="/catalog">Quản lý sách</Link>
              <span>›</span>
              <Link className="hover:text-primary cursor-pointer" to={`/catalog/${book.code}`}>{book.title}</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Đặt trước</span>
            </nav>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Đặt trước sách</h1>
            <p className="text-sm text-slate-500 mt-1">Điền thông tin để đăng ký giữ chỗ cuốn sách này.</p>
          </div>

          <div className="bg-white rounded-3xl card-shadow border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col items-center text-center">
              <img src={book.cover} alt="Cover" className="w-32 h-48 object-cover rounded-lg shadow-md mb-6" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">{book.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{book.author}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {book.status}
              </span>
            </div>
            
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Họ và tên <span className="text-rose-500">*</span></label>
                    <input 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-slate-50 focus:bg-white" 
                      placeholder="Nhập họ tên đầy đủ"
                      value={formData.readerName}
                      onChange={e => setFormData({...formData, readerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Số điện thoại</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-slate-50 focus:bg-white" 
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email liên hệ <span className="text-rose-500">*</span></label>
                  <input 
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-slate-50 focus:bg-white" 
                    placeholder="ví dụ: nguyenvana@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Phương thức nhận thông báo</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="notify" value="email" checked={formData.notifyMethod === 'email'} onChange={e => setFormData({...formData, notifyMethod: e.target.value})} className="w-4 h-4 text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-700">Qua Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="notify" value="sms" checked={formData.notifyMethod === 'sms'} onChange={e => setFormData({...formData, notifyMethod: e.target.value})} className="w-4 h-4 text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-700">Qua SMS</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Ghi chú (Tùy chọn)</label>
                  <textarea 
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-slate-50 focus:bg-white resize-none" 
                    placeholder="Nhập ghi chú thêm nếu có..."
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Link to={`/catalog/${book.code}`} className="px-6 py-3 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    Hủy bỏ
                  </Link>
                  <button type="submit" disabled={submitting} className="px-6 py-3 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-70">
                    {submitting && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                    Xác nhận giữ chỗ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
