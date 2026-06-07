import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const sampleBooks = [
  {
    code: 'BK-0921',
    cover: 'https://via.placeholder.com/70x100?text=Cover',
    title: 'Kỹ thuật lập trình hiện đại',
    author: 'Nguyễn Văn A',
    category: 'Kỹ thuật',
    status: 'Sẵn sàng',
  },
  {
    code: 'BK-1104',
    cover: 'https://via.placeholder.com/70x100?text=Cover',
    title: 'Thiết kế UI/UX cơ bản',
    author: 'Trần Thị B',
    category: 'Nghệ thuật',
    status: 'Đang mượn',
  },
  {
    code: 'BK-0082',
    cover: 'https://via.placeholder.com/70x100?text=Cover',
    title: 'Lịch sử văn minh nhân loại',
    author: 'Lê Văn C',
    category: 'Lịch sử',
    status: 'Bảo trì',
  },
];

export default function Catalog() {
  const [activePage, setActivePage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="hover:text-primary cursor-default">Dashboard</span>
              <span>›</span>
              <span className="font-semibold text-slate-900">Quản lý sách</span>
            </nav>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Quản lý sách</h1>
              <p className="text-sm text-on-surface-variant">Quản lý danh sách sách trong hệ thống thư viện.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg">Lọc nâng cao</button>
              <button className="px-4 py-2 bg-primary-container text-white rounded-lg">Thêm sách mới</button>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-4">
            <input className="flex-1 pl-4 pr-3 py-2 rounded-md border border-outline-variant" placeholder="Tên sách, mã sách..." />
            <select className="px-3 py-2 rounded-md border border-outline-variant">
              <option>Tất cả thể loại</option>
              <option>Kỹ thuật</option>
              <option>Nghệ thuật</option>
              <option>Lịch sử</option>
            </select>
            <button className="px-3 py-2 bg-white border border-outline-variant rounded-md">Xuất Excel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl card-shadow">
              <h4 className="text-label-caps text-outline uppercase">Tổng số sách</h4>
              <div className="text-kpi-number font-bold text-on-surface mt-2">1,248</div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow">
              <h4 className="text-label-caps text-outline uppercase">Sẵn sàng</h4>
              <div className="text-kpi-number font-bold text-on-surface mt-2">892</div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow">
              <h4 className="text-label-caps text-outline uppercase">Đang mượn</h4>
              <div className="text-kpi-number font-bold text-on-surface mt-2">320</div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow">
              <h4 className="text-label-caps text-outline uppercase">Bảo trì</h4>
              <div className="text-kpi-number font-bold text-on-surface mt-2">36</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 card-shadow">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-outline-variant">
                  <th className="px-4 py-3">Mã</th>
                  <th className="px-4 py-3">Ảnh bìa</th>
                  <th className="px-4 py-3">Tên sách</th>
                  <th className="px-4 py-3">Tác giả</th>
                  <th className="px-4 py-3">Thể loại</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {sampleBooks.map((b) => (
                  <tr key={b.code} className="border-t">
                    <td className="px-4 py-4 text-sm" style={{ color: '#0F172A' }}>{b.code}</td>
                    <td className="px-4 py-4">
                      <img src={b.cover} alt={`${b.title} cover`} className="w-14 h-20 rounded-lg object-cover border border-slate-200" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium" style={{ color: '#0F172A' }}>{b.title}</div>
                      <div className="text-xs" style={{ color: '#64748B' }}>ISBN: —</div>
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#334155' }}>{b.author}</td>
                    <td className="px-4 py-4 text-sm" style={{ color: '#475569' }}>{b.category}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${b.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-600' : b.status === 'Đang mượn' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Link className="text-on-surface-variant hover:text-primary" to={`/catalog/${b.code}/reserve`}>✎</Link>
                        <Link className="text-on-surface-variant hover:text-primary" to={`/catalog/${b.code}`}>👁</Link>
                        <button className="text-on-surface-variant hover:text-rose-600">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-end mt-6 gap-2">
              <button
                type="button"
                onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded hover:bg-slate-100"
                disabled={activePage === 1}
              >
                ‹
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  className={`px-3 py-1 rounded ${
                    page === activePage
                      ? 'bg-primary-container text-white'
                      : 'border bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActivePage((prev) => Math.min(prev + 1, pages.length))}
                className="px-3 py-1 border rounded hover:bg-slate-100"
                disabled={activePage === pages.length}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
