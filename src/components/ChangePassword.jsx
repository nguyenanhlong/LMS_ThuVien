import { Page } from './sharedScreen';

export default function ChangePassword() {
  return (
    <Page title="Doi mat khau" description="Thay doi mat khau tai khoan va bat buoc xac nhan lai." crumbs={['Tai khoan', 'Doi mat khau']}>
      <div className="max-w-xl bg-white rounded-3xl p-6 card-shadow space-y-4">
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" type="password" placeholder="Mat khau hien tai" />
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" type="password" placeholder="Mat khau moi" />
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" type="password" placeholder="Nhap lai mat khau moi" />
        <button className="w-full rounded-2xl bg-primary-container py-3 text-sm font-semibold text-white">Cap nhat mat khau</button>
      </div>
    </Page>
  );
}
