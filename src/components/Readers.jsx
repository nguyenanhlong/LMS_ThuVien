import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const sampleReaders = [
  {
    id: 'RD-1001',
    name: 'Nguyễn Văn A',
    card: 'LIB-2024-001',
    email: 'vana.nguyen@email.com',
    phone: '090 123 4567',
    joined: '12/01/2024',
    status: 'Hoạt động',
  },
  {
    id: 'RD-1002',
    name: 'Trần Thị B',
    card: 'LIB-2024-002',
    email: 'b.tran@email.com',
    phone: '091 888 9999',
    joined: '05/02/2024',
    status: 'Đã khóa',
  },
  {
    id: 'RD-1003',
    name: 'Lê Hoàng Nam',
    card: 'LIB-2023-988',
    email: 'nam.lb@email.com',
    phone: '098 555 1212',
    joined: '20/12/2023',
    status: 'Hoạt động',
  },
];

export default function Readers() {
  const [search, setSearch] = useState('');

  const filteredReaders = sampleReaders.filter((reader) =>
    [reader.name, reader.card, reader.email].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="cursor-default">Dashboard</span>
              <span>›</span>
              <span className="font-semibold text-slate-900">Quản lý độc giả</span>
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Thông tin độc giả</h1>
              <p className="text-sm text-on-surface-variant">Quản lý dữ liệu độc giả và trạng thái thành viên thư viện.</p>
            </div>
            <button className="rounded-full bg-primary-container px-5 py-3 text-sm font-semibold text-white hover:brightness-105 transition-all">
              Thêm mới độc giả
            </button>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-4 md:flex-row md:items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-outline-variant bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Tìm theo tên, mã thẻ hoặc email..."
            />
            <button className="rounded-xl bg-white border border-outline-variant px-4 py-3 text-sm hover:bg-slate-100 transition-all">
              Bộ lọc
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
              <div>
                <h2 className="font-section-title text-section-title text-on-surface">Danh sách độc giả</h2>
                <p className="text-sm text-on-surface-variant">Hiển thị độc giả đang hoạt động, đã khóa và những người mới đăng ký.</p>
              </div>
              <span className="rounded-full bg-primary-container/10 px-4 py-2 text-sm font-semibold text-primary">Tổng: {filteredReaders.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Độc giả</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Mã thẻ</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Email</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Liên hệ</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Ngày tham gia</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Trạng thái</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReaders.map((reader) => (
                    <tr key={reader.id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">{reader.name}</div>
                        <div className="text-xs text-slate-500">Thành viên phổ thông</div>
                      </td>
                      <td className="px-4 py-4 text-slate-900">{reader.card}</td>
                      <td className="px-4 py-4 text-slate-900">{reader.email}</td>
                      <td className="px-4 py-4 text-slate-900">{reader.phone}</td>
                      <td className="px-4 py-4 text-slate-900">{reader.joined}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${reader.status === 'Hoạt động' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                          {reader.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-900">
                        <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-all">
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
