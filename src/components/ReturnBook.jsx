import { Field, Page } from './sharedScreen';

export default function ReturnBook() {
  return (
    <Page title="Tra sach" description="Ghi nhan sach duoc tra, tinh trang sach va phi phat neu co." crumbs={['Muon tra', 'Tra sach']}>
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <section className="bg-white rounded-3xl p-6 card-shadow space-y-5">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Nhap ma phieu muon hoac quet ma vach" />
          {['Thiet ke he thong thong tin', 'Clean Architecture'].map((book) => (
            <label key={book} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <span><b>{book}</b><span className="block text-xs text-slate-500">Tinh trang: Tot</span></span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
          <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" rows="4" placeholder="Ghi chu tinh trang sach..." />
        </section>
        <aside className="bg-white rounded-3xl p-6 card-shadow">
          <h2 className="text-lg font-semibold text-slate-950">Tong ket tra sach</h2>
          <div className="mt-5 space-y-3"><Field label="So sach tra" value="2 cuon" /><Field label="Qua han" value="2 ngay" /><Field label="Phi phat tam tinh" value="20,000 VND" /></div>
          <button className="mt-6 w-full rounded-2xl bg-primary-container py-3 text-sm font-semibold text-white">Xac nhan tra sach</button>
        </aside>
      </div>
    </Page>
  );
}
