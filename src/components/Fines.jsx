import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';
import { Modal, LoadingState, EmptyState } from './sharedUI';
import '../styles/frontend.css';

export default function Fines() {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ readerId: '', amount: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    setLoading(true);
    const data = await mockApi.getFines();
    setFines(data);
    setLoading(false);
  };

  const handleCollect = async (id) => {
    try {
      await mockApi.markFinePaid(id);
      showToast('Đã thu tiền phạt thành công', 'success');
      fetchFines();
    } catch(err) {
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const rd = await mockApi.getReaderById(formData.readerId);
      if (!rd) {
        showToast('Không tìm thấy mã độc giả', 'error');
        setSubmitting(false);
        return;
      }
      const newFine = {
        id: `FN-${Math.floor(Math.random()*9000)+1000}`,
        loanId: 'Tạo thủ công',
        readerId: rd.id,
        readerName: rd.name,
        amount: Number(formData.amount),
        reason: formData.reason,
        status: 'Chưa thu',
        date: new Date().toISOString()
      };
      await mockApi.createFine(newFine);
      showToast('Thêm khoản phạt thành công', 'success');
      setIsModalOpen(false);
      fetchFines();
    } catch(err) {
      showToast('Có lỗi xảy ra', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const totalUnpaid = fines.filter(f => f.status === 'Chưa thu').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = fines.filter(f => f.status === 'Đã thu').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Quản lý khoản phạt</h1>
              <p className="text-sm text-slate-500 mt-1">Theo dõi các khoản phí trễ hạn và đền bù.</p>
            </div>
            <button onClick={() => { setFormData({ readerId: '', amount: '', reason: '' }); setIsModalOpen(true); }} className="px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:brightness-110 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add_card</span>
              Thêm khoản phạt
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl text-rose-600">warning</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">Chưa thu</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{totalUnpaid.toLocaleString('vi-VN')} đ</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">Đã thu</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{totalPaid.toLocaleString('vi-VN')} đ</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : fines.length === 0 ? <EmptyState /> : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                    <th className="px-4 py-3">Mã phạt</th>
                    <th className="px-4 py-3">Phiếu mượn</th>
                    <th className="px-4 py-3">Độc giả</th>
                    <th className="px-4 py-3">Lý do</th>
                    <th className="px-4 py-3">Số tiền</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fines.map(f => (
                    <tr key={f.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 font-medium text-slate-900">{f.id}</td>
                      <td className="px-4 py-4 text-slate-600">{f.loanId}</td>
                      <td className="px-4 py-4 font-medium text-primary"><Link to={`/readers/${f.readerId}`}>{f.readerName}</Link></td>
                      <td className="px-4 py-4 text-slate-600 truncate max-w-[200px]">{f.reason}</td>
                      <td className="px-4 py-4 font-bold text-slate-900">{f.amount.toLocaleString('vi-VN')} đ</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${f.status === 'Chưa thu' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {f.status === 'Chưa thu' && (
                          <button onClick={() => handleCollect(f.id)} className="px-3 py-1.5 rounded bg-emerald-50 text-emerald-600 font-semibold hover:bg-emerald-100 transition-colors">
                            Đã thu
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm khoản phạt">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mã độc giả <span className="text-rose-500">*</span></label>
            <input required value={formData.readerId} onChange={e => setFormData({...formData, readerId: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" placeholder="VD: RD-1001" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Số tiền (VNĐ) <span className="text-rose-500">*</span></label>
            <input type="number" required min="1000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" placeholder="VD: 50000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Lý do <span className="text-rose-500">*</span></label>
            <textarea required rows="3" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" placeholder="Nhập lý do phạt..." />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">Hủy</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 disabled:opacity-50">
              Thêm khoản phạt
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
