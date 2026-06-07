import { Page } from './sharedScreen';

export default function RenewLoan() {
  return (
    <Page title="Gia han sach" description="Dieu chinh han tra va ghi nhan ly do gia han." crumbs={['Muon tra', 'Gia han']}>
      <div className="bg-white rounded-3xl p-6 card-shadow grid gap-5 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Ma phieu muon" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" type="date" />
        <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"><option>Gia han 7 ngay</option><option>Gia han 14 ngay</option><option>Gia han tuy chinh</option></select>
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Nguoi xu ly" />
        <textarea className="md:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm" rows="4" placeholder="Ly do gia han" />
        <button className="md:col-span-2 rounded-2xl bg-primary-container py-3 text-sm font-semibold text-white">Luu gia han</button>
      </div>
    </Page>
  );
}
