import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { Modal, ConfirmDialog, LoadingState, EmptyState } from './sharedUI';
import '../styles/frontend.css';

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả thể loại');
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const [formData, setFormData] = useState({ code: '', title: '', author: '', category: '', status: 'Sẵn sàng' });
  const showToast = useToast();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await api.getBooks();
      setBooks(data);
    } catch (e) {
      showToast('Lỗi khi tải dữ liệu sách', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchSearch = (b.title + b.code + b.author).toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'Tất cả thể loại' || b.category === category;
      return matchSearch && matchCategory;
    });
  }, [books, search, category]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const currentBooks = filteredBooks.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const stats = useMemo(() => {
    return {
      total: books.length,
      available: books.filter(b => b.status === 'Sẵn sàng').length,
      borrowed: books.filter(b => b.status === 'Đang mượn').length,
      maintenance: books.filter(b => b.status === 'Bảo trì').length,
    };
  }, [books]);

  const handleExportCSV = () => {
    const headers = ['Mã', 'Tên sách', 'Tác giả', 'Thể loại', 'Trạng thái'];
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(',') + '\n'
      + filteredBooks.map(b => `${b.code},"${b.title}","${b.author}",${b.category},${b.status}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "danh_sach_sach.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất file Excel', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await api.updateBook(formData.code, formData);
        showToast('Cập nhật sách thành công');
      } else {
        await api.createBook({ ...formData, cover: 'https://via.placeholder.com/70x100?text=Cover' });
        showToast('Thêm sách thành công');
      }
      setIsModalOpen(false);
      fetchBooks();
    } catch (err) {
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setFormData({ code: `BK-${Math.floor(Math.random()*9000)+1000}`, title: '', author: '', category: 'Kỹ thuật', status: 'Sẵn sàng' });
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setFormData(book);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.deleteBook(deletingId);
      showToast('Đã xóa sách', 'success');
      fetchBooks();
    } catch (err) {
      showToast('Lỗi khi xóa', 'error');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-primary cursor-pointer">Dashboard</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Quản lý sách</span>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Quản lý sách</h1>
              <p className="text-sm text-on-surface-variant">Quản lý danh sách sách trong hệ thống thư viện.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg font-medium hover:bg-slate-50">Lọc nâng cao</button>
              <button onClick={openAddModal} className="px-4 py-2 bg-primary-container text-white rounded-lg font-medium hover:brightness-110">Thêm sách mới</button>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex flex-wrap items-center gap-4 shadow-sm border border-slate-100">
            <input 
              className="flex-1 min-w-[200px] pl-4 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              placeholder="Tên sách, mã sách, tác giả..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActivePage(1); }}
            />
            <select 
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setActivePage(1); }}
            >
              <option>Tất cả thể loại</option>
              <option>Kỹ thuật</option>
              <option>Nghệ thuật</option>
              <option>Lịch sử</option>
              <option>Kỹ năng mềm</option>
            </select>
            <button onClick={handleExportCSV} className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất Excel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng số sách</h4>
              <div className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sẵn sàng</h4>
              <div className="text-3xl font-bold text-emerald-600 mt-2">{stats.available}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đang mượn</h4>
              <div className="text-3xl font-bold text-amber-600 mt-2">{stats.borrowed}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bảo trì</h4>
              <div className="text-3xl font-bold text-rose-600 mt-2">{stats.maintenance}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
            {loading ? <LoadingState /> : currentBooks.length === 0 ? <EmptyState /> : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mã</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Ảnh bìa</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Tên sách</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Tác giả</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Thể loại</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBooks.map((b) => (
                        <tr key={b.code} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 text-sm font-medium text-slate-900">{b.code}</td>
                          <td className="px-4 py-4">
                            <img src={b.cover} alt={`${b.title} cover`} className="w-12 h-16 rounded-md object-cover border border-slate-200 shadow-sm" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-semibold text-slate-900 line-clamp-1">{b.title}</div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600">{b.author}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">
                            <span className="bg-slate-100 px-2.5 py-1 rounded-md">{b.category}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-700' : b.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link to={`/catalog/${b.code}/reserve`} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors" title="Đặt trước">
                                <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                              </Link>
                              <Link to={`/catalog/${b.code}`} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-primary transition-colors" title="Xem chi tiết">
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </Link>
                              <button onClick={() => openEditModal(b)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-sky-600 transition-colors" title="Chỉnh sửa">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button onClick={() => { setDeletingId(b.code); setIsConfirmOpen(true); }} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors" title="Xóa">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500">Hiển thị {(activePage - 1) * itemsPerPage + 1} đến {Math.min(activePage * itemsPerPage, filteredBooks.length)} của {filteredBooks.length} sách</p>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setActivePage(p => Math.max(p - 1, 1))} disabled={activePage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50">‹</button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => setActivePage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === activePage ? 'bg-primary-container text-white border-primary-container' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                          {p}
                        </button>
                      ))}
                      <button onClick={() => setActivePage(p => Math.min(p + 1, totalPages))} disabled={activePage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50">›</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBook ? "Cập nhật sách" : "Thêm sách mới"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mã sách</label>
            <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} disabled={!!editingBook} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary disabled:bg-slate-100" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tên sách</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tác giả</label>
            <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Thể loại</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary bg-white">
                <option>Kỹ thuật</option>
                <option>Nghệ thuật</option>
                <option>Lịch sử</option>
                <option>Kỹ năng mềm</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Trạng thái</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary bg-white">
                <option>Sẵn sàng</option>
                <option>Đang mượn</option>
                <option>Bảo trì</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-3 justify-end">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary-container text-white font-semibold hover:brightness-110">
              {editingBook ? "Lưu thay đổi" : "Thêm sách"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa sách"
        message="Bạn có chắc chắn muốn xóa sách này khỏi hệ thống? Hành động này không thể hoàn tác."
      />
    </div>
  );
}
