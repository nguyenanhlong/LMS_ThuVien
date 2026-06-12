import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { LoadingState } from './sharedUI';

export default function StatisticsCharts() {
  const [data, setData] = useState({ months: [], values: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Giả lập lấy số liệu thống kê mượn sách 6 tháng gần nhất từ backend
      await api.getLoans(); // just to simulate delay
      setData({
        months: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        values: [120, 150, 180, 140, 210, 250]
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/reports" className="hover:text-primary">Báo cáo</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Biểu đồ</span>
            </nav>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Biểu đồ thống kê</h1>
            <p className="text-sm text-slate-500 mt-1">Trực quan hóa dữ liệu hoạt động của thư viện.</p>
          </div>

          {loading ? <LoadingState /> : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-6">Lưu lượng mượn sách (6 tháng qua)</h3>
                <div className="h-64 flex items-end justify-between gap-2 pb-6 border-b border-slate-200">
                  {data.values.map((v, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2 group">
                      <div className="w-full bg-primary-container/20 rounded-t-md relative flex-1 flex items-end">
                        <div 
                          className="w-full bg-primary-container rounded-t-md transition-all group-hover:brightness-110" 
                          style={{ height: `${(v / Math.max(...data.values)) * 100}%` }}
                        ></div>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">{v}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{data.months[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 relative mb-6">
                  {/* CSS pie chart trick using conic-gradient */}
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-emerald-500 border-r-emerald-500 border-b-amber-500 transform rotate-45"></div>
                </div>
                <h3 className="font-bold text-slate-900 mb-4">Tỷ lệ sách theo trạng thái</h3>
                <div className="flex gap-6 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-600">Sẵn sàng (60%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-slate-600">Đang mượn (25%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <span className="text-sm text-slate-600">Bảo trì (15%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
