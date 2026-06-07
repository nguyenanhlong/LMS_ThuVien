import { DataTable, Page } from './sharedScreen';

const rows = [
  { id: 'LOG-9001', user: 'Admin Lumina', action: 'Tao phieu muon LN-1023', time: '07/06/2026 08:12', ip: '192.168.1.10' },
  { id: 'LOG-9002', user: 'Thu thu Mai', action: 'Cap nhat sach BK-0921', time: '07/06/2026 09:20', ip: '192.168.1.12' },
  { id: 'LOG-9003', user: 'Admin Lumina', action: 'Thu tien phat FN-002', time: '07/06/2026 10:05', ip: '192.168.1.10' },
];

export default function AuditLog() {
  return (
    <Page title="Audit Log" description="Tra cuu lich su thao tac nguoi dung va su kien he thong." crumbs={['Audit Log']}>
      <div className="bg-surface-container-low rounded-2xl p-4 grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Tim theo nguoi dung, hanh dong..." />
        <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" type="date" />
        <button className="rounded-xl bg-primary-container text-sm font-semibold text-white">Loc log</button>
      </div>
      <DataTable rows={rows} columns={['id', 'user', 'action', 'time', 'ip']} />
    </Page>
  );
}
