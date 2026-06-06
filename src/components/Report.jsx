import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Report() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <section className="p-8 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-on-surface">Báo cáo thư viện</h1>
              <p className="text-sm text-on-surface-variant mt-2">
                Tổng hợp số liệu mượn trả, lượng độc giả và hiệu suất sách trong tháng gần nhất.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition-all">
                Xuất PDF
              </button>
              <button className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-all">
                Xuất Excel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <article className="bg-white p-6 rounded-3xl card-shadow">
              <p className="text-xs uppercase tracking-[0.2em] text-outline">Lượt mượn tháng</p>
              <h2 className="mt-4 text-3xl font-bold text-on-surface">3,820</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Tăng 14% so với tháng trước</p>
            </article>
            <article className="bg-white p-6 rounded-3xl card-shadow">
              <p className="text-xs uppercase tracking-[0.2em] text-outline">Sách trễ hạn</p>
              <h2 className="mt-4 text-3xl font-bold text-on-surface">128</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Giảm 3% so với kỳ trước</p>
            </article>
            <article className="bg-white p-6 rounded-3xl card-shadow">
              <p className="text-xs uppercase tracking-[0.2em] text-outline">Độc giả mới</p>
              <h2 className="mt-4 text-3xl font-bold text-on-surface">242</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Đăng ký trong 30 ngày qua</p>
            </article>
            <article className="bg-white p-6 rounded-3xl card-shadow">
              <p className="text-xs uppercase tracking-[0.2em] text-outline">Yêu cầu đặt trước</p>
              <h2 className="mt-4 text-3xl font-bold text-on-surface">56</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Đang chờ xử lý</p>
            </article>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
            <section className="bg-white p-6 rounded-3xl card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-on-surface">Xu hướng mượn sách</h2>
                  <p className="text-sm text-on-surface-variant">Theo tuần trong tháng</p>
                </div>
                <div className="text-xs text-on-surface-variant">Đơn vị: lượt mượn</div>
              </div>
              <div className="mt-8 grid grid-cols-7 items-end gap-3 h-64">
                {[72, 90, 85, 110, 100, 95, 120].map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="w-full rounded-full bg-primary-container/15" style={{ height: `${value}%` }}></div>
                    <span className="text-[10px] text-on-surface-variant">T{index + 1}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl card-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-on-surface">Tổng quan phân loại</h2>
                  <p className="text-sm text-on-surface-variant">Số lượng sách theo thể loại</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Đã xuất</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Tài liệu tham khảo', value: '42%' },
                  { label: 'Văn học', value: '28%' },
                  { label: 'Khoa học tự nhiên', value: '18%' },
                  { label: 'Khác', value: '12%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <p className="text-sm text-on-surface">{item.label}</p>
                    <p className="text-sm font-semibold text-on-surface">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white p-6 rounded-3xl card-shadow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-on-surface">Top sách mượn nhiều</h2>
                <p className="text-sm text-on-surface-variant">Bảng xếp hạng theo lượt mượn trong tháng</p>
              </div>
              <button className="rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-highest transition-all">
                Xem chi tiết
              </button>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm text-on-surface">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.2em] text-outline">
                    <th className="py-4 pr-6">Mã sách</th>
                    <th className="py-4 pr-6">Tên sách</th>
                    <th className="py-4 pr-6">Lượt mượn</th>
                    <th className="py-4 pr-6">Thể loại</th>
                    <th className="py-4">Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: 'BK-1832', title: 'Thiết kế hệ thống thông tin', count: 184, category: 'CNTT', status: 'Hoạt động' },
                    { code: 'BK-2091', title: 'Kinh tế vĩ mô cơ bản', count: 162, category: 'Kinh tế', status: 'Hoạt động' },
                    { code: 'BK-3478', title: 'Giải tích 2', count: 147, category: 'Toán', status: 'Hết sách' },
                    { code: 'BK-1123', title: 'Lập trình hướng đối tượng', count: 135, category: 'CNTT', status: 'Hoạt động' },
                    { code: 'BK-7740', title: 'Marketing căn bản', count: 128, category: 'Quản trị', status: 'Hoạt động' },
                  ].map((row) => (
                    <tr key={row.code} className="border-t border-slate-200">
                      <td className="py-4 pr-6 font-semibold text-on-surface">{row.code}</td>
                      <td className="py-4 pr-6 text-on-surface-variant">{row.title}</td>
                      <td className="py-4 pr-6 font-semibold text-on-surface">{row.count}</td>
                      <td className="py-4 pr-6 text-on-surface-variant">{row.category}</td>
                      <td className="py-4">
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${row.status === 'Hết sách' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
