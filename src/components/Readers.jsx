import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';
import { Modal, ConfirmDialog, LoadingState, EmptyState } from './sharedUI';
import '../styles/frontend.css';

export default function Readers() {
  const [readers, setReaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const navigate = useNavigate();
  const showToast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: 'Sinh vien', status: 'Hoat dong' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReaders();
  }, []);

  const fetchReaders = async () => {
    setLoading(true);
    const data = await mockApi.getReaders();
    setReaders(data);
    setLoading(false);
  };

  const filteredReaders = useMemo(() => {
    return readers.filter(r => {
      const matchSearch = (r.name + r.id + r.phone + r.email).toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'Tất cả' || r.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [readers, search, typeFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newReader = {
        ...formData,
        id: `RD-${Math.floor(Math.random() * 9000) + 1000}`,
        card: `LIB-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`
      };
      await mockApi.createReader(newReader);
      showToast('Thêm độc giả thành công', 'success');
      setIsModalOpen(false);
      fetchReaders();
    } catch (err) {
      showToast('Có lỗi xảy ra', 'error');
    } finally {
      setSubmitting(false);
    }
  };

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
              <span className="font-semibold text-slate-900">Quản lý độc giả</span>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Độc giả & Thẻ thư viện</h1>
              <p className="text-sm text-slate-500 mt-1">Quản lý hồ sơ độc giả và thẻ thành viên.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg font-medium hover:bg-slate-50">Xuất danh sách</button>
              <button onClick={() => { setFormData({ name: '', phone: '', email: '', type: 'Sinh vien', status: 'Hoat dong' }); setIsModalOpen(true); }} className="px-4 py-2 bg-primary-container text-white rounded-lg font-medium hover:brightness-110 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Thêm mới độc giả
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex flex-wrap items-center gap-4 shadow-sm border border-slate-100">
            <input 
              className="flex-1 min-w-[200px] pl-4 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-primary" 
              placeholder="Tên, mã thẻ, SĐT..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select 
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:ring-1 focus:ring-primary"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option>Tất cả</option>
              <option>Sinh vien</option>
              <option>Giang vien</option>
              <option>Nghien cuu sinh</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : filteredReaders.length === 0 ? <EmptyState /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                      <th className="px-4 py-3">Mã ĐG</th>
                      <th className="px-4 py-3">Họ và tên</th>
                      <th className="px-4 py-3">Liên hệ</th>
                      <th className="px-4 py-3">Loại độc giả</th>
                      <th className="px-4 py-3">Trạng thái thẻ</th>
                      <th className="px-4 py-3 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReaders.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4 font-semibold text-slate-900">{r.id}</td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">{r.name}</p>
                          <p className="text-xs text-slate-500">{r.card}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          <p>{r.email}</p>
                          <p className="text-xs">{r.phone}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{r.type}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${r.status === 'Hoat dong' ? 'bg-emerald-100 text-emerald-700' : r.status === 'Tam khoa' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button onClick={() => navigate(`/readers/${r.id}`)} className="px-3 py-1.5 rounded bg-slate-100 text-primary font-semibold hover:bg-slate-200 transition-colors">Chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm mới độc giả">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Họ và tên <span className="text-rose-500">*</span></label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" placeholder="Nhập họ tên đầy đủ" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Số điện thoại <span className="text-rose-500">*</span></label>
              <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" placeholder="VD: 0901234567" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email <span className="text-rose-500">*</span></label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" placeholder="VD: email@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Đối tượng</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary bg-white">
                <option>Sinh vien</option>
                <option>Giang vien</option>
                <option>Nghien cuu sinh</option>
                <option>Khac</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Trạng thái</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary bg-white">
                <option>Hoat dong</option>
                <option>Tam khoa</option>
                <option>Da khoa</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">Hủy</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 disabled:opacity-50">
              Lưu thông tin
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
