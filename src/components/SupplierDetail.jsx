import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';
import { LoadingState } from './sharedUI';

export default function SupplierDetail() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      setLoading(true);
      const data = await mockApi.getSuppliers();
      const s = data.find(x => x.id === id);
      setSupplier(s);
      setLoading(false);
    };
    fetchSupplier();
  }, [id]);

  if (loading) return <div className="dashboard-container"><Sidebar /><main className="ml-sidebar-width min-h-screen flex flex-col bg-background"><Header /><LoadingState /></main></div>;
  if (!supplier) return <div className="p-8">Không tìm thấy nhà cung cấp</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-3xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/suppliers" className="hover:text-primary">Nhà cung cấp</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">{supplier.name}</span>
            </nav>
          </div>

          <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{supplier.name}</h1>
            <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">Mã NCC: {supplier.id}</p>

            <div className="space-y-4 text-sm">
              <div className="flex">
                <span className="w-1/3 text-slate-500 font-medium">Người liên hệ</span>
                <span className="w-2/3 font-semibold text-slate-900">{supplier.contact}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 text-slate-500 font-medium">Số điện thoại</span>
                <span className="w-2/3 font-semibold text-slate-900">{supplier.phone}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 text-slate-500 font-medium">Email</span>
                <span className="w-2/3 font-semibold text-slate-900">{supplier.email}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 text-slate-500 font-medium">Số lượng sách cung cấp</span>
                <span className="w-2/3 font-semibold text-primary">{supplier.books} cuốn</span>
              </div>
              <div className="flex">
                <span className="w-1/3 text-slate-500 font-medium">Trạng thái</span>
                <span className="w-2/3">
                  <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${supplier.status === 'Dang hop tac' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {supplier.status}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
