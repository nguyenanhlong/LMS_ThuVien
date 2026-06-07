import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';
import { LoadingState } from './sharedUI';
import '../styles/frontend.css';

export default function LoanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  
  const [loan, setLoan] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const l = await mockApi.getLoanById(id);
      if (!l) {
        showToast('Phiếu mượn không tồn tại', 'error');
        navigate('/loans');
        return;
      }
      setLoan(l);
      
      const bookData = [];
      for (const code of l.books) {
        const b = await mockApi.getBookByCode(code);
        if (b) bookData.push(b);
      }
      setBooks(bookData);
      setLoading(false);
    };
    fetchData();
  }, [id, navigate, showToast]);

  if (loading) return <div className="dashboard-container"><Sidebar /><main className="ml-sidebar-width min-h-screen flex flex-col bg-background"><Header /><LoadingState /></main></div>;
  if (!loan) return null;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-5xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/loans" className="hover:text-primary">Mượn trả</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">{loan.id}</span>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-3">
                Phiếu mượn {loan.id}
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${loan.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : loan.status === 'Đã trả' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {loan.status}
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">Chi tiết phiếu mượn và danh sách sách mượn.</p>
            </div>
            {loan.status === 'Đang mượn' && (
              <div className="flex items-center gap-3">
                <Link to={`/loans/renew?id=${loan.id}`} className="px-4 py-2 bg-white border border-outline-variant text-slate-700 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-[18px]">update</span>
                  Gia hạn
                </Link>
                <Link to={`/loans/return?id=${loan.id}`} className="px-4 py-2 bg-primary-container text-white rounded-lg font-medium hover:brightness-110 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-[18px]">assignment_return</span>
                  Trả sách
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 text-sm uppercase tracking-wider">Thông tin chung</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Người mượn</span>
                  <Link to={`/readers/${loan.readerId}`} className="font-medium text-primary hover:underline">{loan.readerName}</Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã độc giả</span>
                  <span className="font-medium text-slate-900">{loan.readerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ngày tạo phiếu</span>
                  <span className="font-medium text-slate-900">{loan.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hạn trả</span>
                  <span className="font-medium text-rose-600">{loan.due}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 text-sm uppercase tracking-wider">Sách đã mượn ({books.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map(b => (
                <div key={b.code} className="flex gap-4 p-4 border border-slate-100 rounded-xl">
                  <img src={b.cover} alt="Cover" className="w-16 h-24 object-cover rounded shadow-sm" />
                  <div>
                    <Link to={`/catalog/${b.code}`} className="font-semibold text-slate-900 text-sm hover:text-primary line-clamp-2">{b.title}</Link>
                    <p className="text-xs text-slate-500 mt-1">{b.code}</p>
                    <p className="text-xs text-slate-500">{b.author}</p>
                    {loan.status === 'Đã trả' ? (
                      <span className="mt-2 inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">Đã trả</span>
                    ) : (
                      <span className="mt-2 inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">Đang mượn</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
