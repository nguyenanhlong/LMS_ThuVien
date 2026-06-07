import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';
import { LoadingState } from './sharedUI';

export default function Report() {
  const [stats, setStats] = useState({
    books: 0,
    readers: 0,
    loans: 0,
    fines: 0
  });
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const [b, r, l, f] = await Promise.all([
        mockApi.getBooks(),
        mockApi.getReaders(),
        mockApi.getLoans(),
        mockApi.getFines()
      ]);
      setStats({
        books: b.length,
        readers: r.length,
        loans: l.length,
        fines: f.reduce((s, x) => s + x.amount, 0)
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const handleExport = () => {
    showToast('Đang tạo báo cáo, vui lòng đợi...', 'success');
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-2xl font-semibold">Báo cáo tổng hợp</h1>
              <p className="text-sm text-slate-500 mt-1">Dữ liệu tổng quan về hoạt động của thư viện.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleExport} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-[18px]">print</span>
                In báo cáo
              </button>
              <button onClick={() => navigate('/reports/charts')} className="px-4 py-2 bg-primary-container text-white rounded-lg font-medium hover:brightness-110 flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                Xem biểu đồ
              </button>
            </div>
          </div>

          {loading ? <LoadingState /> : (
            <div className="bg-white rounded-3xl p-10 card-shadow border border-slate-100 max-w-4xl mx-auto printable-area">
              <div className="text-center mb-10 border-b border-slate-200 pb-8">
                <h2 className="text-3xl font-bold text-slate-900">Báo Cáo Hoạt Động Thư Viện</h2>
                <p className="text-slate-500 mt-2">Kỳ báo cáo: Năm 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Sách trong kho</h3>
                  <p className="text-4xl font-bold text-slate-900">{stats.books}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Số lượng độc giả</h3>
                  <p className="text-4xl font-bold text-slate-900">{stats.readers}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng số phiếu mượn</h3>
                  <p className="text-4xl font-bold text-slate-900">{stats.loans}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng doanh thu phạt</h3>
                  <p className="text-4xl font-bold text-slate-900">{stats.fines.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>

              <div className="text-sm text-slate-500 text-center border-t border-slate-200 pt-8">
                <p>Báo cáo được trích xuất tự động từ Hệ thống Quản lý Thư viện.</p>
                <p className="mt-1">Ngày xuất: {new Date().toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
