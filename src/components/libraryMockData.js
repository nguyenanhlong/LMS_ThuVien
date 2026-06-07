export const readers = [
  { id: 'RD-1001', name: 'Nguyen Van A', card: 'LIB-2024-001', phone: '090 123 4567', email: 'vana.nguyen@email.com', type: 'Sinh vien', status: 'Hoat dong' },
  { id: 'RD-1002', name: 'Tran Thi B', card: 'LIB-2024-002', phone: '091 888 9999', email: 'b.tran@email.com', type: 'Giang vien', status: 'Da khoa' },
];

export const loans = [
  { id: 'LN-1023', reader: 'Nguyen Van A', date: '03/06/2026', due: '17/06/2026', status: 'Dang muon', books: ['Thiet ke he thong thong tin', 'Clean Architecture'] },
  { id: 'LN-1022', reader: 'Tran Thi B', date: '01/06/2026', due: '15/06/2026', status: 'Da tra', books: ['Lap trinh Java can ban'] },
];

export const suppliers = [
  { id: 'SUP-001', name: 'Nha sach Tri Tue', contact: 'Mai Anh', phone: '028 3822 1122', email: 'sales@tritue.vn', books: 420, status: 'Dang hop tac' },
  { id: 'SUP-002', name: 'NXB Khoa Hoc Tre', contact: 'Hoang Nam', phone: '024 5566 7788', email: 'partner@khtr.vn', books: 280, status: 'Tam dung' },
];
