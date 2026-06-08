import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { LoadingState, EmptyState } from './sharedUI';

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    const data = await api.getLoans();
    setLoans(data);
    setLoading(false);
  };

  const filteredLoans = useMemo(() => {
    return loans.filter(l => {
      const matchSearch = (l.id + l.readerName).toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'Tất cả' || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [loans, search, statusFilter]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Quản lý mượn trả</span>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Phiếu mượn sách</h1>
              <p className="text-sm text-slate-500 mt-1">Danh sách các phiếu mượn và trạng thái hoàn trả.</p>
            </div>
            <Link to="/loans/create" className="px-4 py-2 bg-primary-container text-white rounded-lg font-medium hover:brightness-110 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo phiếu mượn
            </Link>
          </div>

          <div className="bg-white p-4 rounded-xl flex flex-wrap items-center gap-4 shadow-sm border border-slate-100">
            <div className="relative flex-1 min-w-[250px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-primary" 
                placeholder="Tìm mã phiếu, tên độc giả..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:ring-1 focus:ring-primary">
              <option>Tất cả</option>
              <option>Đang mượn</option>
              <option>Đã trả</option>
              <option>Quá hạn</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : filteredLoans.length === 0 ? <EmptyState /> : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                    <th className="px-4 py-3">Mã phiếu</th>
                    <th className="px-4 py-3">Độc giả</th>
                    <th className="px-4 py-3">Ngày mượn</th>
                    <th className="px-4 py-3">Hạn trả</th>
                    <th className="px-4 py-3">Sách mượn</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLoans.map(loan => (
                    <tr key={loan.id} onClick={() => navigate(`/loans/${loan.id}`)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-4 py-4 font-semibold text-slate-900">{loan.id}</td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">{loan.readerName}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{loan.date}</td>
                      <td className="px-4 py-4 text-slate-600">{loan.due}</td>
                      <td className="px-4 py-4 font-medium text-primary">{loan.books.length} cuốn</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${loan.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : loan.status === 'Đã trả' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
