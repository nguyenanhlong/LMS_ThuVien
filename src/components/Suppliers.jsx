import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { LoadingState, EmptyState } from './sharedUI';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    const data = await api.getSuppliers();
    setSuppliers(data);
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Nhà cung cấp</h1>
              <p className="text-sm text-slate-500 mt-1">Danh sách đối tác và nhà cung cấp sách.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : suppliers.length === 0 ? <EmptyState /> : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                    <th className="px-4 py-3">Mã NCC</th>
                    <th className="px-4 py-3">Tên nhà cung cấp</th>
                    <th className="px-4 py-3">Liên hệ</th>
                    <th className="px-4 py-3">Số lượng sách</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {suppliers.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 font-semibold text-slate-900">{s.id}</td>
                      <td className="px-4 py-4 font-medium text-slate-900">{s.name}</td>
                      <td className="px-4 py-4 text-slate-600">
                        <p>{s.contact}</p>
                        <p className="text-xs">{s.phone} • {s.email}</p>
                      </td>
                      <td className="px-4 py-4 font-bold text-primary">{s.books}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${s.status === 'Dang hop tac' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button onClick={() => navigate(`/suppliers/${s.id}`)} className="px-3 py-1.5 rounded bg-slate-100 text-primary font-semibold hover:bg-slate-200">Xem</button>
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
