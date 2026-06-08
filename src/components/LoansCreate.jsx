import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/frontend.css';

export default function LoansCreate() {
  const navigate = useNavigate();
  const showToast = useToast();
  
  const [readerCode, setReaderCode] = useState('');
  const [reader, setReader] = useState(null);
  
  const [bookQuery, setBookQuery] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  
  const [submitting, setSubmitting] = useState(false);

  const handleCheckReader = async () => {
    if (!readerCode) return showToast('Vui lòng nhập mã độc giả', 'error');
    const rd = await api.getReaderById(readerCode);
    if (rd) {
      setReader(rd);
      showToast('Đã tìm thấy độc giả', 'success');
    } else {
      setReader(null);
      showToast('Không tìm thấy độc giả', 'error');
    }
  };

  const handleAddBook = async () => {
    if (!bookQuery) return showToast('Vui lòng nhập mã sách', 'error');
    if (selectedBooks.length >= 5) return showToast('Chỉ được mượn tối đa 5 cuốn', 'error');
    
    if (selectedBooks.some(b => b.code === bookQuery)) {
      return showToast('Sách này đã được thêm', 'error');
    }

    const b = await api.getBookByCode(bookQuery);
    if (!b) return showToast('Không tìm thấy sách', 'error');
    if (b.status !== 'Sẵn sàng') return showToast(`Sách hiện đang ${b.status}`, 'warning');
    
    setSelectedBooks([...selectedBooks, b]);
    setBookQuery('');
  };

  const handleRemoveBook = (code) => {
    setSelectedBooks(selectedBooks.filter(b => b.code !== code));
  };

  const handleCreateLoan = async () => {
    if (!reader) return showToast('Vui lòng kiểm tra thông tin độc giả', 'error');
    if (selectedBooks.length === 0) return showToast('Vui lòng thêm sách vào phiếu mượn', 'error');
    
    setSubmitting(true);
    try {
      const today = new Date();
      const due = new Date();
      due.setDate(due.getDate() + 14); // 14 days default
      
      const newLoan = {
        id: `LN-${Math.floor(Math.random() * 9000) + 1000}`,
        readerId: reader.id,
        readerName: reader.name,
        date: today.toISOString().split('T')[0],
        due: due.toISOString().split('T')[0],
        status: 'Đang mượn',
        books: selectedBooks.map(b => b.code)
      };
      
      await api.createLoan(newLoan);
      showToast('Tạo phiếu mượn thành công!', 'success');
      navigate(`/loans/${newLoan.id}`);
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
        <div className="p-8 space-y-8 max-w-5xl mx-auto w-full">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary">Dashboard</Link>
              <span>›</span>
              <Link to="/loans" className="hover:text-primary">Mượn trả</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Tạo phiếu mượn</span>
            </nav>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Tạo phiếu mượn mới</h1>
            <p className="text-sm text-slate-500 mt-1">Ghi nhận thông tin mượn sách cho độc giả.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span>
                  Thông tin độc giả
                </h3>
                <div className="flex gap-3 mb-4">
                  <input 
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary text-sm"
                    placeholder="Nhập mã độc giả (VD: RD-1001)"
                    value={readerCode}
                    onChange={e => setReaderCode(e.target.value)}
                  />
                  <button onClick={handleCheckReader} className="px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                    Kiểm tra
                  </button>
                </div>
                {reader && (
                  <div className="p-4 bg-primary-container/5 rounded-xl border border-primary-container/20">
                    <p className="font-bold text-slate-900">{reader.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{reader.email} • {reader.phone}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Thẻ hợp lệ
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">book</span>
                  Thêm sách
                </h3>
                <div className="flex gap-3 mb-2">
                  <input 
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary text-sm"
                    placeholder="Nhập mã sách (VD: BK-0921)"
                    value={bookQuery}
                    onChange={e => setBookQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddBook()}
                  />
                  <button onClick={handleAddBook} className="px-4 py-2.5 bg-primary-container text-white font-semibold rounded-lg hover:brightness-110 text-sm">
                    Thêm
                  </button>
                </div>
                <p className="text-xs text-slate-500">Giới hạn tối đa 5 cuốn cho mỗi phiếu mượn.</p>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 h-full flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <h3 className="font-bold text-slate-900">Danh sách mượn</h3>
                  <span className="text-sm font-semibold text-primary">{selectedBooks.length} / 5 cuốn</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 mb-6">
                  {selectedBooks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                      <span className="material-symbols-outlined text-4xl mb-2">library_add</span>
                      <p className="text-sm">Chưa có sách nào được chọn</p>
                    </div>
                  ) : (
                    selectedBooks.map(book => (
                      <div key={book.code} className="flex gap-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                        <img src={book.cover} alt="Cover" className="w-12 h-16 object-cover rounded shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{book.title}</p>
                          <p className="text-xs text-slate-500 truncate">{book.code} • {book.author}</p>
                        </div>
                        <button onClick={() => handleRemoveBook(book.code)} className="w-8 h-8 flex items-center justify-center rounded-full text-rose-500 hover:bg-rose-50 transition-colors">
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button onClick={() => setSelectedBooks([])} className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 text-sm w-1/3">
                    Xóa tất cả
                  </button>
                  <button onClick={handleCreateLoan} disabled={submitting || selectedBooks.length === 0 || !reader} className="flex-1 py-3 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110 disabled:opacity-50 text-sm flex items-center justify-center gap-2">
                    {submitting && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                    Xác nhận tạo phiếu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
