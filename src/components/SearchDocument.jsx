import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { LoadingState, EmptyState } from './sharedUI';
import '../styles/frontend.css';

export default function SearchDocument() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('Mới nhất');

  // Pagination
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const data = await api.getBooks();
      setBooks(data);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    let result = books.filter(b => {
      const matchSearch = (b.title + b.code + b.author).toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = categoryFilter === 'Tất cả' || b.category === categoryFilter;
      const matchStatus = statusFilter === 'Tất cả' || b.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });

    if (sortBy === 'Hết sách') {
      result.sort((a, b) => a.status === 'Sẵn sàng' ? 1 : -1);
    } else if (sortBy === 'Mới nhất') {
      result.sort((a, b) => b.code.localeCompare(a.code));
    }
    // 'Phổ biến' could be random or based on logic, leaving as is for now.

    return result;
  }, [books, searchQuery, categoryFilter, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const currentBooks = filteredBooks.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Tra cứu tài liệu</h1>
            <p className="text-sm text-slate-500 mt-1">Tìm kiếm sách và tài liệu trong thư viện</p>
          </div>

          {/* Search Header */}
          <div className="bg-white p-6 rounded-3xl card-shadow border border-slate-100 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-slate-50 focus:bg-white" 
                  placeholder="Nhập tên sách, tác giả hoặc từ khóa..." 
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setActivePage(1); }}
                />
              </div>
              <button className="px-8 py-3 bg-primary-container text-white rounded-xl font-semibold hover:brightness-110 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">search</span>
                Tìm kiếm
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Thể loại:</span>
                <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setActivePage(1); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  <option>Tất cả</option>
                  <option>Kỹ thuật</option>
                  <option>Nghệ thuật</option>
                  <option>Lịch sử</option>
                  <option>Kỹ năng mềm</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Trạng thái:</span>
                <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setActivePage(1); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  <option>Tất cả</option>
                  <option>Sẵn sàng</option>
                  <option>Đang mượn</option>
                  <option>Bảo trì</option>
                </select>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-slate-700">Sắp xếp:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  <option>Mới nhất</option>
                  <option>Phổ biến</option>
                  <option>Hết sách</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>Tìm thấy <span className="font-bold text-slate-900">{filteredBooks.length}</span> kết quả phù hợp</p>
          </div>

          {/* Grid view */}
          {loading ? <LoadingState /> : currentBooks.length === 0 ? <EmptyState title="Không tìm thấy tài liệu" message="Hãy thử sử dụng các từ khóa khác hoặc xóa bớt bộ lọc." /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentBooks.map(book => (
                <div key={book.code} className="bg-white rounded-2xl card-shadow border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-48 bg-slate-100 relative p-4 flex justify-center">
                    <img src={book.cover} alt="Cover" className="h-full object-cover rounded shadow-md" />
                    <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${book.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-700' : book.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {book.status}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-primary mb-1">{book.category}</span>
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-2" title={book.title}>{book.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{book.author}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2">
                      <Link to={`/catalog/${book.code}`} className="flex-1 py-2 text-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Chi tiết
                      </Link>
                      <Link to={`/catalog/${book.code}/reserve`} className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold text-white transition-colors ${book.status === 'Sẵn sàng' ? 'bg-primary-container hover:brightness-110' : 'bg-slate-300 pointer-events-none'}`}>
                        Đặt mượn
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 card-shadow">
                <button onClick={() => setActivePage(p => Math.max(p - 1, 1))} disabled={activePage === 1} className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 disabled:opacity-50">‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setActivePage(p)} className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${p === activePage ? 'bg-primary-container text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setActivePage(p => Math.min(p + 1, totalPages))} disabled={activePage === totalPages} className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 disabled:opacity-50">›</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
