import { Link, useParams } from 'react-router-dom';
import { Page, StatCard } from './sharedScreen';
import { loans } from './libraryMockData';

export default function LoanDetail() {
  const { id } = useParams();
  const loan = loans.find((item) => item.id === id) || loans[0];

  return (
    <Page
      title="Chi tiet phieu muon"
      description="Theo doi thong tin phieu, sach trong phieu va cac moc xu ly."
      crumbs={['Muon tra', loan.id]}
      actions={<><Link className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white" to="/loans/return">Tra sach</Link><Link className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold" to="/loans/renew">Gia han</Link></>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard label="Doc gia" value={loan.reader} note={`Ma phieu ${loan.id}`} icon="badge" />
        <StatCard label="Ngay muon" value={loan.date} note={`Han tra ${loan.due}`} icon="event" />
        <StatCard label="Trang thai" value={loan.status} note="Cap nhat luc 08:30" icon="task_alt" />
      </div>
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h2 className="text-lg font-semibold text-slate-950">Sach trong phieu</h2>
        <div className="mt-4 grid gap-3">
          {loan.books.map((book, index) => (
            <div key={book} className="rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
              <div><p className="font-semibold text-slate-900">{book}</p><p className="text-xs text-slate-500">BK-{1020 + index} / Ke A{index + 1}-02</p></div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Dang muon</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
