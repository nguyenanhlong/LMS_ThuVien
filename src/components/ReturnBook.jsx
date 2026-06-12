import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/frontend.css';

export default function ReturnBook() {
  const [searchParams] = useSearchParams();
  const initId = searchParams.get('id') || '';
  
  const navigate = useNavigate();
  const showToast = useToast();
  
  const [loanId, setLoanId] = useState(initId);
  const [loan, setLoan] = useState(null);
  const [books, setBooks] = useState([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [fines, setFines] = useState(0);

  useEffect(() => {
    if (initId) handleCheckLoan(initId);
  }, [initId]);

  const handleCheckLoan = async (idToCheck = loanId) => {
    if (!idToCheck) return showToast('Vui lòng nhập mã phiếu mượn', 'error');
    const l = await api.getLoanById(idToCheck);
    if (!l) {
      setLoan(null);
      setBooks([]);
      return showToast('Không tìm thấy phiếu mượn', 'error');
    }
    if (l.status === 'Đã trả') {
      return showToast('Phiếu mượn này đã được hoàn tất', 'warning');
    }
    
    setLoan(l);
    
    // Tính tiền phạt (nếu có)
    const due = new Date(l.due);
    const today = new Date();
    if (today > due) {
      const diffTime = Math.abs(today - due);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setFines(diffDays * 10000 * l.books.length); // 10k/day/book
    } else {
      setFines(0);
    }

    const bookData = [];
    for (const code of l.books) {
      const b = await api.getBookByCode(code);
      if (b) bookData.push(b);
    }
    setBooks(bookData);
    showToast('Đã tìm thấy phiếu mượn', 'success');
  };

  const handleReturn = async () => {
    setSubmitting(true);
    try {
      // update books
      for (const b of books) {
        await api.updateBook(b.code, { status: 'Sẵn sàng' });
      }
      
      // update loan
      await api.updateLoan(loan.id, { status: 'Đã trả' });
      
      // add fine if any
      if (fines > 0) {
        await api.createFine({
          id: `FN-${Math.floor(Math.random()*9000)+1000}`,
          loanId: loan.id,
          readerId: loan.readerId,
          readerName: loan.readerName,
          amount: fines,
          reason: 'Trả sách trễ hạn',
          status: 'Chưa thu',
          date: new Date().toISOString()
        });
      }
      
      api.addAuditLog('Trả sách', `Phiếu mượn: ${loan.id}`);
      showToast('Trả sách thành công', 'success');
      navigate(`/loans/${loan.id}`);
    } catch (err) {
      showToast('Lỗi khi trả sách', 'error');
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
              <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/loans" className="hover:text-primary">Mượn trả</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Trả sách</span>
            </nav>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Hoàn trả sách</h1>
            <p className="text-sm text-slate-500 mt-1">Ghi nhận trả sách và tính phí trễ hạn nếu có.</p>
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
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-900">Thông tin phiếu mượn</h3>
                  <p className="text-sm text-slate-600 mt-1">Độc giả: <span className="font-semibold text-slate-900">{loan.readerName}</span> ({loan.readerId})</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-slate-500">Hạn trả: <span className="font-semibold text-slate-900">{loan.due}</span></p>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Danh sách sách trả</h4>
                <div className="space-y-3 mb-6">
                  {books.map(b => (
                    <div key={b.code} className="flex gap-4 p-3 border border-slate-100 rounded-xl bg-slate-50">
                      <img src={b.cover} alt="Cover" className="w-12 h-16 object-cover rounded shadow-sm" />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{b.title}</p>
                        <p className="text-xs text-slate-500">{b.code}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                      </div>
                    </div>
                  ))}
                </div>

                {fines > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-500">warning</span>
                    <div>
                      <h4 className="font-bold text-rose-700">Phát hiện trễ hạn</h4>
                      <p className="text-sm text-rose-600 mt-1">Phiếu mượn này đã quá hạn. Hệ thống sẽ tự động tạo khoản phạt trị giá <strong>{fines.toLocaleString('vi-VN')} VND</strong>.</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  <button onClick={() => { setLoan(null); setLoanId(''); }} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 text-sm">
                    Hủy bỏ
                  </button>
                  <button onClick={handleReturn} disabled={submitting} className="px-6 py-2.5 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 disabled:opacity-50 text-sm flex items-center gap-2">
                    {submitting && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                    Xác nhận trả sách
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
