import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { LoadingState, EmptyState } from './sharedUI';

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const data = await mockApi.getAuditLogs();
    setLogs(data);
    setLoading(false);
  };

  const filteredLogs = logs.filter(l => {
    return (l.action + l.user + l.details).toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Nhật ký hệ thống</h1>
              <p className="text-sm text-slate-500 mt-1">Lưu trữ các thao tác và thay đổi dữ liệu trong hệ thống.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm border border-slate-100">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-primary" 
                placeholder="Tìm thao tác, người dùng..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-sm">Lọc log</button>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : filteredLogs.length === 0 ? <EmptyState /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                      <th className="px-4 py-3">Thời gian</th>
                      <th className="px-4 py-3">Người dùng</th>
                      <th className="px-4 py-3">Thao tác</th>
                      <th className="px-4 py-3">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLogs.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-600 font-mono text-xs">{new Date(l.date).toLocaleString('vi-VN')}</td>
                        <td className="px-4 py-4 font-semibold text-slate-900">{l.user}</td>
                        <td className="px-4 py-4 font-medium text-primary">{l.action}</td>
                        <td className="px-4 py-4 text-slate-600">{l.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
