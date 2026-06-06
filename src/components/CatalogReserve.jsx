import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const bookCatalog = [
  {
    code: 'BK-0921',
    title: 'Kỹ thuật lập trình hiện đại',
    author: 'Nguyễn Văn A',
    category: 'Kỹ thuật',
    status: 'Sẵn sàng',
    isbn: '978-604-12-345-5',
    publisher: 'NXB Khoa Học và Kỹ Thuật',
    year: '2024',
    location: 'Kệ A1-02',
    cover: 'https://via.placeholder.com/220x300?text=Cover',
  },
  {
    code: 'BK-1104',
    title: 'Thiết kế UI/UX cơ bản',
    author: 'Trần Thị B',
    category: 'Nghệ thuật',
    status: 'Đang mượn',
    isbn: '978-604-98-765-1',
    publisher: 'NXB Mỹ Thuật',
    year: '2023',
    location: 'Kệ B2-15',
    cover: 'https://via.placeholder.com/220x300?text=Cover',
  },
  {
    code: 'BK-0082',
    title: 'Lịch sử văn minh nhân loại',
    author: 'Lê Văn C',
    category: 'Lịch sử',
    status: 'Bảo trì',
    isbn: '978-604-54-321-7',
    publisher: 'NXB Lịch Sử',
    year: '2022',
    location: 'Kệ C3-01',
    cover: 'https://via.placeholder.com/220x300?text=Cover',
  },
];

export default function CatalogReserve() {
  const { code } = useParams();
  const book = bookCatalog.find((item) => item.code === code);

  if (!book) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
          <Header />
          <div className="p-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h1 className="text-2xl font-semibold">Không tìm thấy sách</h1>
              <p className="mt-3 text-slate-600">Mã sách <strong>{code}</strong> không tồn tại hoặc không đủ thông tin.</p>
              <Link className="mt-6 inline-flex items-center rounded-full bg-primary-container px-5 py-3 text-sm font-semibold text-white hover:brightness-105 transition-all" to="/catalog">
                Quay lại Catalog
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link className="text-primary hover:underline" to="/catalog">Catalog</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Đặt trước sách</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
            <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
              <div className="flex flex-col items-center gap-6">
                <img src={book.cover} alt={`${book.title} cover`} className="w-full rounded-3xl object-cover" />
                <div className="w-full space-y-4 text-slate-700">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Mã sách</div>
                    <div className="text-lg font-semibold text-slate-900">{book.code}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Trạng thái</div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${book.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-700' : book.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {book.status}
                    </span>
                  </div>
                  <div className="text-sm space-y-2">
                    <div><span className="font-semibold">Tác giả:</span> {book.author}</div>
                    <div><span className="font-semibold">Thể loại:</span> {book.category}</div>
                    <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>
                    <div><span className="font-semibold">NXB:</span> {book.publisher}</div>
                    <div><span className="font-semibold">Năm xuất bản:</span> {book.year}</div>
                    <div><span className="font-semibold">Vị trí:</span> {book.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold">Đăng ký đặt trước</h1>
                    <p className="text-sm text-slate-500">Nhập thông tin độc giả và phương thức nhận thông báo.</p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">3 người đang chờ</div>
                </div>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-600">
                      Họ và tên người đăng ký
                      <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="Phạm Văn C" />
                    </label>
                    <label className="space-y-2 text-sm text-slate-600">
                      Email nhận thông báo
                      <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="pvc***@lms.edu.vn" />
                    </label>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                    <div className="text-sm font-semibold text-slate-900 mb-3">Phương thức nhận thông báo</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 cursor-pointer">
                        <input type="radio" name="notify" defaultChecked className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Email (mặc định)</div>
                          <div className="text-xs text-slate-500">pvc***@lms.edu.vn</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 cursor-pointer">
                        <input type="radio" name="notify" className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Tin nhắn SMS</div>
                          <div className="text-xs text-slate-500">098***321</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-700">
                    Tôi đã đọc và đồng ý với <span className="font-semibold">quy định mượn trả tài liệu</span> và cam kết nhận sách trong vòng 48h kể từ khi có thông báo.
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" className="w-full rounded-3xl bg-primary-container px-6 py-4 text-sm font-semibold text-white hover:brightness-105 transition-all">
                      Xác nhận giữ chỗ
                    </button>
                    <Link to="/catalog" className="w-full rounded-3xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 text-center hover:bg-slate-100 transition-all">
                      Hủy thao tác
                    </Link>
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
                <div className="text-sm text-slate-500">Lưu ý:</div>
                <p className="mt-3 text-sm text-slate-600">Bạn chỉ có thể đặt trước tối đa 03 tài liệu cùng lúc trên toàn hệ thống LMS.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
