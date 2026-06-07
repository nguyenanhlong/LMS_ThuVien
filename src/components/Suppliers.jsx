import { DataTable, Page } from './sharedScreen';
import { suppliers } from './libraryMockData';

export default function Suppliers() {
  return (
    <Page title="Quan ly nha cung cap" description="Theo doi don vi cung cap sach, dau moi lien he va trang thai hop tac." crumbs={['Nha cung cap']} actions={<button className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white">Them nha cung cap</button>}>
      <DataTable rows={suppliers} columns={['id', 'name', 'contact', 'phone', 'email', 'books', 'status']} />
    </Page>
  );
}
