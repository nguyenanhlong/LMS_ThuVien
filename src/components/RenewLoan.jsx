import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import mockApi from '../services/mockApi';
import { useToast } from '../context/ToastContext';
import '../styles/frontend.css';

export default function RenewLoan() {
  const [searchParams] = useSearchParams();
  const initId = searchParams.get('id') || '';
  
  const navigate = useNavigate();
  const showToast = useToast();
  
  const [loanId, setLoanId] = useState(initId);
  const [loan, setLoan] = useState(null);
  
  const [days, setDays] = useState(7);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initId) handleCheckLoan(initId);
  }, [initId]);

  const handleCheckLoan = async (idToCheck = loanId) => {
    if (!idToCheck) return showToast('Vui lòng nhập mã phiếu mượn', 'error');
    const l = await mockApi.getLoanById(idToCheck);
    if (!l) {
      setLoan(null);
      return showToast('Không tìm thấy phiếu mượn', 'error');
    }
    if (l.status === 'Đã trả') {
      return showToast('Phiếu mượn này đã được trả, không thể gia hạn', 'warning');
    }
    setLoan(l);
    showToast('Đã tìm thấy phiếu mượn', 'success');
  };

  const handleRenew = async () => {
    setSubmitting(true);
    try {
      const oldDue = new Date(loan.due);
      oldDue.setDate(oldDue.getDate() + Number(days));
      const newDueStr = oldDue.toISOString().split('T')[0];
      
      await mockApi.updateLoan(loan.id, { due: newDueStr });
      mockApi.addAuditLog('Gia hạn phiếu mượn', `Phiếu mượn: ${loan.id}, Thêm ${days} ngày`);
      
      showToast('Gia hạn thành công', 'success');
      navigate(`/loans/${loan.id}`);
    } catch (err) {
      showToast('Lỗi khi gia hạn', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8 max-w-4xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/loans" className="hover:text-primary">Mượn trả</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Gia hạn sách</span>
            </nav>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Gia hạn phiếu mượn</h1>
            <p className="text-sm text-slate-500 mt-1">Cập nhật lại hạn trả sách cho độc giả.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
            <label className="block text-sm font-semibold text-slate-900 mb-2">Mã phiếu mượn</label>
            <div className="flex gap-3">
              <input 
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary text-sm max-w-md"
                placeholder="VD: LN-1023"
                value={loanId}
                onChange={e => setLoanId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCheckLoan()}
              />
              <button onClick={() => handleCheckLoan()} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                Tìm kiếm
              </button>
            </div>
          </div>

          {loan && (
            <div className="bg-white rounded-2xl card-shadow border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-900">Thông tin phiếu mượn</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Độc giả:</span>
                    <p className="font-semibold text-slate-900">{loan.readerName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Số lượng sách:</span>
                    <p className="font-semibold text-slate-900">{loan.books.length} cuốn</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Hạn trả hiện tại:</span>
                    <p className="font-semibold text-rose-600">{loan.due}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">Thời gian gia hạn thêm</label>
                <div className="flex gap-4 mb-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="days" value="7" checked={days == 7} onChange={e => setDays(e.target.value)} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">7 ngày</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="days" value="14" checked={days == 14} onChange={e => setDays(e.target.value)} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">14 ngày</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="days" value="21" checked={days == 21} onChange={e => setDays(e.target.value)} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">21 ngày</span>
                  </label>
                </div>

                <div className="flex gap-3 justify-end">
                  <button onClick={() => { setLoan(null); setLoanId(''); }} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 text-sm">
                    Hủy bỏ
                  </button>
                  <button onClick={handleRenew} disabled={submitting} className="px-6 py-2.5 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 disabled:opacity-50 text-sm flex items-center gap-2">
                    {submitting && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                    Lưu gia hạn
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
