import { useParams } from 'react-router-dom';
import { Field, Page, StatCard } from './sharedScreen';
import { loans, readers } from './libraryMockData';

export default function ReaderDetail() {
  const { id } = useParams();
  const reader = readers.find((item) => item.id === id) || readers[0];

  return (
    <Page title="Chi tiet doc gia" description="Xem ho so, lich su muon va trang thai thanh vien." crumbs={['Doc gia', reader.id]}>
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <aside className="bg-white rounded-3xl p-6 card-shadow">
          <div className="h-20 w-20 rounded-full bg-primary-container/10 text-primary flex items-center justify-center text-2xl font-bold">
            {reader.name.split(' ').slice(-1)[0][0]}
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-950">{reader.name}</h2>
          <p className="text-sm text-slate-500">{reader.card}</p>
          <div className="mt-6 grid gap-3">
            <Field label="Loai doc gia" value={reader.type} />
            <Field label="Dien thoai" value={reader.phone} />
            <Field label="Email" value={reader.email} />
            <Field label="Trang thai" value={reader.status} />
          </div>
        </aside>
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Dang muon" value="3" note="Trong gioi han 5 cuon" icon="outbox" />
            <StatCard label="Qua han" value="1" note="Can nhac tra sach" icon="warning" />
            <StatCard label="Tien phat" value="45k" note="Chua thanh toan" icon="payments" />
          </div>
          <div className="bg-white rounded-3xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-slate-950">Lich su gan day</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr><th className="px-4 py-3">Phieu</th><th className="px-4 py-3">Tai lieu</th><th className="px-4 py-3">Ngay</th><th className="px-4 py-3">Trang thai</th></tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} className="border-t">
                      <td className="px-4 py-4 font-semibold">{loan.id}</td>
                      <td className="px-4 py-4">{loan.books[0]}</td>
                      <td className="px-4 py-4">{loan.date}</td>
                      <td className="px-4 py-4">{loan.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
