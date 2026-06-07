import { Link, useLocation } from 'react-router-dom';

const defaultMenuItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'Tra cuu tai lieu', icon: 'search', to: '/search' },
  { label: 'Quan ly sach', icon: 'menu_book', to: '/catalog' },
  { label: 'Muon tra', icon: 'receipt_long', to: '/loans' },
  { label: 'Doc gia', icon: 'group', to: '/readers' },
  { label: 'Tien phat', icon: 'payments', to: '/fines' },
  { label: 'Nha cung cap', icon: 'inventory_2', to: '/suppliers' },
  { label: 'Thong bao', icon: 'notifications', to: '/notifications' },
  { label: 'Bao cao', icon: 'analytics', to: '/reports' },
  { label: 'Audit Log', icon: 'manage_search', to: '/audit-log' },
];

const loanSubmenuItems = [
  { label: 'Tao phieu muon', icon: 'add', to: '/loans/create' },
  { label: 'Tra sach', icon: 'assignment_return', to: '/loans/return' },
  { label: 'Gia han sach', icon: 'event_repeat', to: '/loans/renew' },
];

const reportSubmenuItems = [
  { label: 'Bieu do thong ke', icon: 'bar_chart', to: '/reports/charts' },
];

function Submenu({ items, currentPath }) {
  return (
    <div className="mt-1 space-y-1 pl-10">
      {items.map((item) => {
        const active = currentPath === item.to;
        const classes = active
          ? 'sidebar-active px-3 py-2 rounded-xl flex items-center gap-2 transition-all bg-white/10'
          : 'text-outline-variant hover:text-white px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all';

        return (
          <Link key={item.label} className={classes} to={item.to}>
            <span className="material-symbols-outlined text-sm">{item.icon}</span>
            <span className="text-body-sm">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Sidebar({ menuItems = defaultMenuItems }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-on-background flex flex-col z-50">
      <div className="p-6 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h1 className="font-app-name text-app-name text-surface-container-lowest leading-tight">
              Library
            </h1>
            <p className="text-[10px] text-outline-variant uppercase tracking-widest">
              Admin Console
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.to === '/' ? currentPath === '/' : currentPath.startsWith(item.to);
            const itemClasses = isActive
              ? 'sidebar-active px-4 py-3 flex items-center gap-3 transition-all'
              : 'text-outline-variant hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-all';

            return (
              <div key={item.label}>
                <Link className={itemClasses} to={item.to}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-body-md text-body-md">{item.label}</span>
                </Link>
                {item.to === '/loans' && currentPath.startsWith('/loans') && (
                  <Submenu items={loanSubmenuItems} currentPath={currentPath} />
                )}
                {item.to === '/reports' && currentPath.startsWith('/reports') && (
                  <Submenu items={reportSubmenuItems} currentPath={currentPath} />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6" />
    </aside>
  );
}
