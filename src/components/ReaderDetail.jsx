import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { LoadingState } from './sharedUI';
import '../styles/frontend.css';

export default function ReaderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  
  const [reader, setReader] = useState(null);
  const [loans, setLoans] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const r = await api.getReaderById(id);
      if (!r) {
        showToast('Không tìm thấy độc giả', 'error');
        navigate('/readers');
        return;
      }
      setReader(r);
      
      const allLoans = await api.getLoans();
      const readerLoans = allLoans.filter(l => l.readerId === id);
      setLoans(readerLoans);
      
      const allFines = await api.getFines();
      const readerFines = allFines.filter(f => f.readerId === id);
      setFines(readerFines);
      
      setLoading(false);
    };
    fetchData();
  }, [id, navigate, showToast]);

  if (loading) return <div className="dashboard-container"><Sidebar /><main className="ml-sidebar-width min-h-screen flex flex-col bg-background"><Header /><LoadingState /></main></div>;
  if (!reader) return null;

  const totalBorrowed = loans.length;
  const currentlyBorrowing = loans.filter(l => l.status === 'Đang mượn').length;
  const overdueLoans = loans.filter(l => {
    if (l.status === 'Đã trả') return false;
    return new Date() > new Date(l.due);
  }).length;
  const totalFines = fines.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-6xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/readers" className="hover:text-primary">Độc giả</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">{reader.name}</span>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-3">
                Hồ sơ độc giả
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${reader.status === 'Hoat dong' ? 'bg-emerald-100 text-emerald-700' : reader.status === 'Tam khoa' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {reader.status}
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">Thông tin cá nhân và lịch sử mượn trả.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg font-medium hover:bg-slate-50">Khóa thẻ</button>
              <button className="px-4 py-2 bg-primary-container text-white rounded-lg font-medium hover:brightness-110">Cập nhật hồ sơ</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Info card */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
                  <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{reader.name}</h2>
                <p className="text-sm text-slate-500 font-medium">{reader.id}</p>
                
                <div className="mt-6 space-y-3 text-sm text-left">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Loại thẻ</span>
                    <span className="font-medium text-slate-900">{reader.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Số thẻ</span>
                    <span className="font-medium text-slate-900">{reader.card}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">SĐT</span>
                    <span className="font-medium text-slate-900">{reader.phone}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium text-slate-900 truncate ml-2">{reader.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content right */}
            <div className="md:col-span-3 space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Tổng sách đã mượn</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{totalBorrowed}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Đang mượn</p>
                  <p className="text-2xl font-bold text-primary mt-2">{currentlyBorrowing}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Quá hạn</p>
                  <p className="text-2xl font-bold text-rose-600 mt-2">{overdueLoans}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Tiền phạt</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{totalFines.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>

              {/* Lịch sử */}
              <div className="bg-white rounded-2xl card-shadow border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Lịch sử mượn sách</h3>
                </div>
                {loans.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">Độc giả này chưa từng mượn sách.</div>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                        <th className="px-6 py-3">Mã phiếu</th>
                        <th className="px-6 py-3">Ngày mượn</th>
                        <th className="px-6 py-3">Hạn trả</th>
                        <th className="px-6 py-3">Số lượng</th>
                        <th className="px-6 py-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loans.map(l => (
                        <tr key={l.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900"><Link to={`/loans/${l.id}`} className="hover:underline text-primary">{l.id}</Link></td>
                          <td className="px-6 py-4 text-slate-600">{l.date}</td>
                          <td className="px-6 py-4 text-slate-600">{l.due}</td>
                          <td className="px-6 py-4 font-medium">{l.books.length} cuốn</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${l.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : l.status === 'Đã trả' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
