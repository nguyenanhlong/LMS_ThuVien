import { DataTable, Page, StatCard } from './sharedScreen';

const rows = [
  { id: 'FN-001', reader: 'Nguyen Van A', reason: 'Qua han 2 ngay', amount: '20,000 VND', status: 'Chua thu' },
  { id: 'FN-002', reader: 'Le Minh C', reason: 'Hu hong bia sach', amount: '80,000 VND', status: 'Da thu' },
];

export default function Fines() {
  return (
    <Page title="Quan ly tien phat" description="Tinh phi qua han, cap nhat thanh toan va lich su phat." crumbs={['Tien phat']} actions={<button className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white">Them khoan phat</button>}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Chua thu" value="245k" note="8 khoan phat" icon="payments" />
        <StatCard label="Da thu" value="1.8m" note="Trong thang" icon="receipt" />
        <StatCard label="Qua han" value="12" note="Can nhac no" icon="notification_important" />
      </div>
      <DataTable rows={rows} columns={['id', 'reader', 'reason', 'amount', 'status']} />
    </Page>
  );
}
