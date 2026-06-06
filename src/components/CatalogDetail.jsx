import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const bookData = [
  {
    code: 'BK-0921',
    cover: 'https://via.placeholder.com/200x280?text=Cover',
    title: 'Kỹ thuật lập trình hiện đại',
    author: 'Nguyễn Văn A',
    category: 'Kỹ thuật',
    status: 'Sẵn sàng',
    isbn: '978-604-12-345-5',
    publisher: 'NXB Khoa Học và Kỹ Thuật',
    year: '2024',
    location: 'Kệ A1-02',
    description:
      'Cuốn sách cung cấp nền tảng lập trình hiện đại, bao gồm cấu trúc dữ liệu, giải thuật và kỹ thuật thiết kế phần mềm. Thích hợp cho sinh viên và kỹ sư phần mềm.',
    history: [
      { user: 'Trần Văn D', date: '01/06/2026', action: 'Trả sách' },
      { user: 'Nguyễn Thị E', date: '25/05/2026', action: 'Mượn sách' },
    ],
  },
  {
    code: 'BK-1104',
    cover: 'https://via.placeholder.com/200x280?text=Cover',
    title: 'Thiết kế UI/UX cơ bản',
    author: 'Trần Thị B',
    category: 'Nghệ thuật',
    status: 'Đang mượn',
    isbn: '978-604-98-765-1',
    publisher: 'NXB Mỹ Thuật',
    year: '2023',
    location: 'Kệ B2-15',
    description:
      'Giới thiệu các nguyên lý cơ bản của thiết kế giao diện và trải nghiệm người dùng, cùng với ví dụ thực tế và case-study ứng dụng.',
    history: [
      { user: 'Lê Minh X', date: '28/05/2026', action: 'Mượn sách' },
      { user: 'Lê Minh X', date: '05/05/2026', action: 'Đặt trước' },
    ],
  },
  {
    code: 'BK-0082',
    cover: 'https://via.placeholder.com/200x280?text=Cover',
    title: 'Lịch sử văn minh nhân loại',
    author: 'Lê Văn C',
    category: 'Lịch sử',
    status: 'Bảo trì',
    isbn: '978-604-54-321-7',
    publisher: 'NXB Lịch Sử',
    year: '2022',
    location: 'Kệ C3-01',
    description:
      'Tổng quan các nền văn minh lớn trong lịch sử nhân loại và tác động của chúng lên văn hóa hiện đại.',
    history: [
      { user: 'Vũ Minh T', date: '15/05/2026', action: 'Trả sách' },
      { user: 'Nguyễn Anh H', date: '01/05/2026', action: 'Mượn sách' },
    ],
  },
];

export default function CatalogDetail() {
  const { code } = useParams();
  const book = bookData.find((item) => item.code === code);

  if (!book) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
          <Header />
          <div className="p-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h1 className="text-2xl font-semibold">Không tìm thấy sách</h1>
              <p className="mt-3 text-slate-600">Không tìm thấy thông tin cho mã sách <strong>{code}</strong>.</p>
              <Link to="/catalog" className="mt-6 inline-flex items-center rounded-full bg-primary-container px-5 py-3 text-sm font-semibold text-white hover:brightness-105 transition-all">
                Quay lại danh sách sách
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
              <Link className="text-primary hover:underline" to="/dashboard">Dashboard</Link>
              <span>›</span>
              <Link className="text-primary hover:underline" to="/catalog">Quản lý sách</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">Chi tiết sách</span>
            </nav>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
            <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
              <img src={book.cover} alt={`${book.title} cover`} className="w-full rounded-3xl object-cover mb-6" />
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Thông tin cơ bản</h2>
                  <ul className="mt-4 space-y-3">
                    <li><span className="font-semibold">Mã sách:</span> {book.code}</li>
                    <li><span className="font-semibold">Tác giả:</span> {book.author}</li>
                    <li><span className="font-semibold">Thể loại:</span> {book.category}</li>
                    <li><span className="font-semibold">ISBN:</span> {book.isbn}</li>
                    <li><span className="font-semibold">NXB:</span> {book.publisher}</li>
                    <li><span className="font-semibold">Năm xuất bản:</span> {book.year}</li>
                    <li><span className="font-semibold">Vị trí:</span> {book.location}</li>
                    <li><span className="font-semibold">Trạng thái:</span> <span className={`px-3 py-1 rounded-full text-xs ${book.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-700' : book.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{book.status}</span></li>
                  </ul>
                </div>
                <Link to="/catalog" className="inline-flex items-center rounded-full bg-primary-container px-5 py-3 text-sm font-semibold text-white hover:brightness-105 transition-all">
                  Quay lại danh sách sách
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">{book.title}</h2>
                <p className="mt-4 text-slate-600 leading-relaxed">{book.description}</p>
              </div>
              <div className="bg-white rounded-3xl p-6 card-shadow border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Lịch sử mượn trả</h2>
                <div className="mt-4 space-y-3">
                  {book.history.map((entry, index) => (
                    <div key={index} className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm text-slate-600">{entry.date}</div>
                      <div className="mt-1 text-sm text-slate-900 font-semibold">{entry.user}</div>
                      <div className="text-sm text-slate-500">{entry.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
