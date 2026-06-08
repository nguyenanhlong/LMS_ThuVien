import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import api from '../services/api';
import { LoadingState } from './sharedUI';
import '../styles/frontend.css';

export default function CatalogDetail() {
  const { code } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const data = await api.getBookByCode(code);
      setBook(data);
      setLoading(false);
    };
    fetchBook();
  }, [code]);

  if (loading) return <div className="dashboard-container"><Sidebar /><main className="ml-sidebar-width min-h-screen flex flex-col bg-background"><Header /><LoadingState /></main></div>;

  if (!book) return <div className="dashboard-container"><Sidebar /><main className="ml-sidebar-width min-h-screen flex flex-col bg-background"><Header /><div className="p-8">Không tìm thấy sách</div></main></div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        <div className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link className="hover:text-primary cursor-pointer" to="/">Dashboard</Link>
              <span>›</span>
              <Link className="hover:text-primary cursor-pointer" to="/catalog">Quản lý sách</Link>
              <span>›</span>
              <span className="font-semibold text-slate-900">{book.title}</span>
            </nav>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Chi tiết sách</h1>
              <p className="text-sm text-on-surface-variant">Thông tin chi tiết, lịch sử mượn trả và trạng thái của sách.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Chỉnh sửa
              </button>
              <Link to={`/catalog/${book.code}/reserve`} className="px-4 py-2 bg-primary-container text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:brightness-110">
                <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                Đặt trước sách
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cột trái: Thông tin sách */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 text-center">
                <img src={book.cover} alt="Cover" className="w-48 h-64 object-cover mx-auto rounded-lg shadow-md mb-6" />
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${book.status === 'Sẵn sàng' ? 'bg-emerald-100 text-emerald-700' : book.status === 'Đang mượn' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {book.status}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{book.title}</h2>
                <p className="text-slate-600 font-medium">{book.author}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl card-shadow border border-slate-100 space-y-4">
                <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-3">Thông tin xuất bản</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã sách</span>
                    <span className="font-medium text-slate-900">{book.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thể loại</span>
                    <span className="font-medium text-slate-900">{book.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nhà xuất bản</span>
                    <span className="font-medium text-slate-900">NXB Giáo Dục</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Năm xuất bản</span>
                    <span className="font-medium text-slate-900">2022</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Lịch sử và thông tin khác */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Số lần mượn</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">24</p>
                </div>
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Đánh giá</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-2xl font-bold text-slate-900">4.8</p>
                    <span className="material-symbols-outlined text-amber-400 text-lg">star</span>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl card-shadow border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">Vị trí lưu trữ</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">Kệ A3</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl card-shadow border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Lịch sử mượn trả</h3>
                  <button className="text-sm font-medium text-primary hover:underline">Xem tất cả</button>
                </div>
                <div className="p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-3 font-semibold text-slate-500">Ngày mượn</th>
                        <th className="px-6 py-3 font-semibold text-slate-500">Người mượn</th>
                        <th className="px-6 py-3 font-semibold text-slate-500">Hạn trả</th>
                        <th className="px-6 py-3 font-semibold text-slate-500">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4">03/06/2026</td>
                        <td className="px-6 py-4 font-medium text-slate-900">Nguyễn Văn A</td>
                        <td className="px-6 py-4">17/06/2026</td>
                        <td className="px-6 py-4"><span className="text-amber-600 bg-amber-50 px-2 py-1 rounded">Đang mượn</span></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">15/05/2026</td>
                        <td className="px-6 py-4 font-medium text-slate-900">Trần Thị B</td>
                        <td className="px-6 py-4">29/05/2026</td>
                        <td className="px-6 py-4"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Đã trả</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-2xl card-shadow border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Tóm tắt nội dung</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Cuốn sách cung cấp nền tảng vững chắc về kiến trúc phần mềm, từ những nguyên lý thiết kế cơ bản đến các mẫu thiết kế nâng cao. Phù hợp cho cả sinh viên và lập trình viên chuyên nghiệp muốn nâng cao kỹ năng thiết kế hệ thống.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
