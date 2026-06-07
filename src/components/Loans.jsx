import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

const recentLoans = [
  { id: 'LN-1023', borrower: 'Nguyễn Văn A', date: '03/06/2026', due: '17/06/2026', status: 'Đang mượn' },
  { id: 'LN-1022', borrower: 'Trần Thị B', date: '01/06/2026', due: '15/06/2026', status: 'Đã trả' },
  { id: 'LN-1021', borrower: 'Lê Văn C', date: '30/05/2026', due: '13/06/2026', status: 'Đang mượn' },
];

export default function Loans() {
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
              <span className="font-semibold text-slate-900">Quản lý mượn trả</span>
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Quản lý mượn trả</h1>
              <p className="text-sm text-on-surface-variant">Theo dõi phiếu mượn, tình trạng trả sách và ghi nhận lịch sử.</p>
            </div>
            <Link
              to="/loans/create"
              className="inline-flex items-center justify-center rounded-[28px] bg-primary-container px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
            >
              <span className="material-symbols-outlined">add</span>
              Tạo phiếu mượn
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 card-shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
              <div>
                <h2 className="font-section-title text-section-title text-on-surface">Phiếu mượn gần đây</h2>
                <p className="text-sm text-on-surface-variant">Danh sách các phiếu mượn mới nhất trong hệ thống.</p>
              </div>
              <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all">
                Xem tất cả
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Mã phiếu</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Độc giả</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Ngày mượn</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Ngày trả dự kiến</th>
                    <th className="px-4 py-4 text-slate-900 font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoans.map((loan) => (
                    <tr key={loan.id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-4 text-slate-900 font-semibold">{loan.id}</td>
                      <td className="px-4 py-4 text-slate-900">{loan.borrower}</td>
                      <td className="px-4 py-4 text-slate-900">{loan.date}</td>
                      <td className="px-4 py-4 text-slate-900">{loan.due}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${loan.status === 'Đã trả' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {loan.status}
                        </span>
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
