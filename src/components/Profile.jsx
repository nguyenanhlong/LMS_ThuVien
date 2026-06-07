import { Page } from './sharedScreen';

export default function Profile() {
  return (
    <Page title="Ho so ca nhan" description="Cap nhat thong tin tai khoan, lien he va thiet lap hien thi." crumbs={['Tai khoan', 'Ho so']}>
      <div className="bg-white rounded-3xl p-6 card-shadow grid gap-5 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="Admin Library" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="admin@lumina.vn" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="Thu thu truong" />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="090 000 1122" />
        <button className="md:col-span-2 rounded-2xl bg-primary-container py-3 text-sm font-semibold text-white">Luu thay doi</button>
      </div>
    </Page>
  );
}
