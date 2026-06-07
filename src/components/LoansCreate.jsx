import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const borrower = {
  name: 'Nguyễn Văn A',
  code: 'DG2024001',
  status: 'Hoạt động',
  rank: 'Kim cương',
  role: 'VIP',
};

const selectedBooks = [
  {
    id: '01',
    title: 'Cấu trúc dữ liệu và Giải thuật',
    isbn: '978-604-12-345-5',
    location: 'Kệ A1-02',
  },
  {
    id: '02',
    title: 'Lập trình hướng đối tượng với Java',
    isbn: '978-604-12-567-9',
    location: 'Kệ B2-15',
  },
];

export default function LoansCreate() {
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
              <span className="cursor-default">Quản lý mượn trả</span>
              <span>›</span>
              <span className="font-semibold text-slate-900">Tạo phiếu mượn</span>
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Lập phiếu mượn sách</h1>
              <p className="text-sm text-on-surface-variant">Hệ thống ghi nhận và quản lý quy trình mượn sách chuyên nghiệp.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">Đã xác thực</span>
              <span className="rounded-full bg-primary-container/10 text-primary px-3 py-1 text-xs font-semibold">Tối đa 05 cuốn</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-200">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full border border-primary flex items-center justify-center text-primary font-semibold">1</div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">Xác thực độc giả</div>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Nhập mã thẻ hoặc ID độc giả</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Đã xác thực</span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] items-end">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input className="mt-2 w-full rounded-[28px] border border-slate-200 bg-white px-12 py-4 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10" placeholder="DG2024001" />
                  </div>
                  <button className="h-full rounded-[28px] bg-primary-container px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-105">Kiểm tra</button>
                </div>

                <div className="mt-6 rounded-[32px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary-container/10 text-primary flex items-center justify-center text-2xl font-semibold">NV</div>
                      <div>
                        <div className="text-lg font-semibold text-slate-900">{borrower.name}</div>
                        <div className="text-xs text-slate-500">ID: {borrower.code}</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      VIP
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Hạng</div>
                      <div className="mt-2 text-sm font-semibold text-slate-900">{borrower.rank}</div>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Tình trạng</div>
                      <div className="mt-2 text-sm font-semibold text-slate-900">{borrower.status}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 card-shadow">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full border border-primary flex items-center justify-center text-primary font-semibold">2</div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">Chọn sách mượn</div>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Tìm kiếm sách và thêm vào phiếu mượn.</p>
                    </div>
                  </div>
                  <button className="h-full rounded-[28px] bg-primary-container px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-105">Thêm sách</button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] items-end">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input className="mt-2 w-full rounded-[28px] border border-slate-200 bg-white px-12 py-4 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10" placeholder="Nhập mã sách hoặc tiêu đề..." />
                  </div>
                  <button className="h-full rounded-[28px] bg-primary-container px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-105">Tìm kiếm</button>
                </div>

                <div className="mt-6 overflow-hidden rounded-3xl border border-outline-variant">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-4 text-slate-900 font-semibold">STT</th>
                        <th className="px-4 py-4 text-slate-900 font-semibold">Thông tin tài liệu</th>
                        <th className="px-4 py-4 text-slate-900 font-semibold">Vị trí</th>
                        <th className="px-4 py-4 text-slate-900 font-semibold">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBooks.map((book) => (
                        <tr key={book.id} className="border-t border-slate-200">
                          <td className="px-4 py-4 text-slate-900 font-semibold">{book.id}</td>
                          <td className="px-4 py-4">
                            <div className="font-semibold text-slate-900">{book.title}</div>
                            <div className="text-xs text-slate-500">ISBN: {book.isbn}</div>
                          </td>
                          <td className="px-4 py-4 text-slate-900">{book.location}</td>
                          <td className="px-4 py-4 text-slate-900">
                            <button className="text-rose-600 hover:underline">Xóa</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-3xl p-6 card-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-on-surface-variant">Tổng kết phiếu mượn</p>
                    <h3 className="text-xl font-semibold mt-2">Thông tin độc giả</h3>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Mới</span>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>Độc giả</span>
                    <span>{borrower.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số lượng tài liệu</span>
                    <span>{selectedBooks.length} cuốn</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ngày trả dự kiến</span>
                    <span>11/20/2024</span>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold">Lưu ý nghiệp vụ</p>
                  <ul className="mt-3 space-y-2 list-disc pl-5">
                    <li>Kiểm tra hiện trạng và vị trí sách trước khi giao.</li>
                    <li>In biên lai mượn sách nếu độc giả có yêu cầu.</li>
                    <li>Lưu ý: Độc giả có 01 sách quá hạn chưa trả.</li>
                  </ul>
                </div>

                <button className="mt-6 w-full rounded-3xl bg-primary-container px-5 py-4 text-sm font-semibold text-white hover:brightness-105 transition-all">
                  Xác nhận tạo phiếu
                </button>
                <button className="mt-3 w-full rounded-3xl border border-outline-variant px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                  Hủy bỏ
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
