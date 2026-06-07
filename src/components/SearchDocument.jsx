import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const sampleBooks = [
  {
    code: 'BK-0921',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    title: 'Cấu trúc dữ liệu và giải thuật',
    author: 'Nguyễn Văn A',
    category: 'Khoa học & kỹ thuật',
    status: 'Còn sách',
    badge: 'Cổ điển',
  },
  {
    code: 'BK-1104',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=400&q=80',
    title: 'Lịch sử Mỹ thuật thế giới',
    author: 'Trần Thị B',
    category: 'Nghệ thuật',
    status: 'Hết sách',
    badge: 'Mới',
  },
  {
    code: 'BK-0082',
    cover: 'https://images.unsplash.com/photo-1496104679561-38b4b8f8c4a8?auto=format&fit=crop&w=400&q=80',
    title: 'Quản trị dự án hiện đại',
    author: 'Dr. James Wilson',
    category: 'Kinh tế - Quản lý',
    status: 'Còn sách',
    badge: 'Sách hot',
  },
  {
    code: 'BK-2333',
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    title: 'Những ngọn đồi xanh thẳm',
    author: 'Lê Minh C',
    category: 'Văn học',
    status: 'Còn sách',
    badge: 'Bán chạy',
  },
  {
    code: 'BK-5510',
    cover: 'https://images.unsplash.com/photo-1499010284473-46bd332dd3a1?auto=format&fit=crop&w=400&q=80',
    title: 'Nhập môn tư duy logic',
    author: 'GS. Ngô Bảo D',
    category: 'Khoa học',
    status: 'Hết sách',
    badge: 'Tuyển chọn',
  },
  {
    code: 'BK-7781',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
    title: 'Đồ họa và con người',
    author: 'Phạm Thúy L',
    category: 'Nghệ thuật',
    status: 'Còn sách',
    badge: 'Đề xuất',
  },
];

export default function SearchDocument() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Khoa học & kỹ thuật', 'Nghệ thuật']);
  const [yearFilter, setYearFilter] = useState('Tất cả năm');
  const [availability, setAvailability] = useState('all');
  const [activePage, setActivePage] = useState(1);
  const pages = [1, 2, 3];

  const filteredBooks = sampleBooks.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase()) || book.code.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(book.category);
    const matchesAvailability = availability === 'all' || (availability === 'available' && book.status === 'Còn sách') || (availability === 'unavailable' && book.status !== 'Còn sách');
    return matchesQuery && matchesCategory && matchesAvailability;
  });

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Tra cứu tài liệu</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">Tra cứu tài liệu hệ thống</h1>
                <p className="text-sm text-slate-500 mt-2">Tìm kiếm sách, tác giả hoặc mã ISBN và lọc nhanh theo danh mục.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-[360px]">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-full border border-slate-300 bg-slate-50 py-3 pl-5 pr-32 text-sm text-slate-900 outline-none focus:border-blue-500"
                    placeholder="Tìm tên sách, tác giả hoặc mã ISBN..."
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary-container px-5 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-12 xl:col-span-3 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Bộ lọc</h2>
                  <p className="text-sm text-slate-500">Tinh chỉnh kết quả tìm kiếm</p>
                </div>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategories([]);
                    setYearFilter('Tất cả năm');
                    setAvailability('all');
                  }}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Thể loại</h3>
                  {['Khoa học & kỹ thuật', 'Văn học nghệ thuật', 'Kinh tế - Quản lý', 'Lịch sử'].map((category) => (
                    <label key={category} className="flex items-center gap-3 text-sm text-slate-700 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Năm xuất bản</h3>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                  >
                    <option>Tất cả năm</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Trạng thái</h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="availability"
                        value="all"
                        checked={availability === 'all'}
                        onChange={() => setAvailability('all')}
                        className="h-4 w-4 text-primary"
                      />
                      Tất cả
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="availability"
                        value="available"
                        checked={availability === 'available'}
                        onChange={() => setAvailability('available')}
                        className="h-4 w-4 text-primary"
                      />
                      Còn sách
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="availability"
                        value="unavailable"
                        checked={availability === 'unavailable'}
                        onChange={() => setAvailability('unavailable')}
                        className="h-4 w-4 text-primary"
                      />
                      Hết sách
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            <section className="col-span-12 xl:col-span-9 space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                <div>
                  <p className="text-sm text-slate-500">Kết quả: {filteredBooks.length} tài liệu</p>
                  <p className="text-xs text-slate-400">Hiển thị danh sách theo bộ lọc đang chọn</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>Sắp xếp:</span>
                  <select className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 outline-none">
                    <option>Mới nhất</option>
                    <option>Phổ biến</option>
                    <option>Hết sách</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredBooks.map((book) => (
                  <div key={book.code} className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <img src={book.cover} alt={book.title} className="h-36 w-28 rounded-3xl object-cover" />
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 items-center mb-3">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">{book.badge}</span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">{book.status}</span>
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">{book.title}</h2>
                        <p className="text-sm text-slate-500 mt-2">{book.author}</p>
                        <p className="text-sm text-slate-500 mt-1">{book.category}</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            to={`/catalog/${book.code}`}
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            Chi tiết
                          </Link>
                          <Link
                            to={`/catalog/${book.code}/reserve`}
                            className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                          >
                            Đặt trước
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Trang {activePage} / {pages.length}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    ‹ Trước
                  </button>
                  {pages.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setActivePage(page)}
                      className={`rounded-full px-4 py-2 text-sm ${page === activePage ? 'bg-primary-container text-white' : 'border border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setActivePage((prev) => Math.min(prev + 1, pages.length))}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    Sau ›
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
