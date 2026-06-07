import { useParams } from 'react-router-dom';
import { DataTable, Field, Page } from './sharedScreen';
import { suppliers } from './libraryMockData';

export default function SupplierDetail() {
  const { id } = useParams();
  const supplier = suppliers.find((item) => item.id === id) || suppliers[0];

  return (
    <Page title="Chi tiet nha cung cap" description="Thong tin hop tac, lien he va so luong sach da nhap." crumbs={['Nha cung cap', supplier.id]}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Field label="Ten don vi" value={supplier.name} />
        <Field label="Dau moi" value={supplier.contact} />
        <Field label="Dien thoai" value={supplier.phone} />
        <Field label="Email" value={supplier.email} />
      </div>
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h2 className="text-lg font-semibold">Lich su nhap sach</h2>
        <DataTable rows={[{ id: 'PO-1001', name: 'Nhap sach CNTT', contact: '120 cuon', phone: '04/06/2026', email: 'Da nhan' }]} columns={['id', 'name', 'contact', 'phone', 'email']} />
      </div>
    </Page>
  );
}
