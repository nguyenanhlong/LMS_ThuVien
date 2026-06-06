import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const defaultMenuItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'Tra cứu tài liệu', icon: 'search', to: '/search' },
  { label: 'Quản lý sách', icon: 'menu_book', to: '/catalog' },
  { label: 'Quản lý mượn trả', icon: 'receipt_long', to: '/loans' },
  { label: 'Độc giả', icon: 'group', to: '/readers' },
  { label: 'Thông báo', icon: 'notifications', to: '/notifications' },
  { label: 'Báo cáo', icon: 'analytics', to: '/reports' },
];

const loanSubmenuItems = [
  { label: 'Tạo phiếu mượn', icon: 'add', to: '/loans/create' },
];

const defaultActionItems = [
  { label: 'Help Center', icon: 'help', to: '#', external: true },
  { label: 'Logout', icon: 'logout', to: '#', external: true },
];

export default function Sidebar({ menuItems = defaultMenuItems, actionItems = defaultActionItems }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-on-background flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h1 className="font-app-name text-app-name text-surface-container-lowest leading-tight">
              Lumina
            </h1>
            <p className="text-[10px] text-outline-variant uppercase tracking-widest">
              Admin Console
            </p>
          </div>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = !item.external && (item.to === '/' ? currentPath === '/' : currentPath.startsWith(item.to));
            const itemClasses = isActive
              ? 'sidebar-active px-4 py-3 flex items-center gap-3 transition-all'
              : 'text-outline-variant hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-all';

            return (
              <div key={item.label}>
                {item.external ? (
                  <a className={itemClasses} href={item.to}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-body-md text-body-md">{item.label}</span>
                  </a>
                ) : (
                  <Link className={itemClasses} to={item.to}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-body-md text-body-md">{item.label}</span>
                  </Link>
                )}
                {item.to === '/loans' && currentPath.startsWith('/loans') && (
                  <div className="mt-1 space-y-1 pl-10">
                    {loanSubmenuItems.map((subItem) => {
                      const subActive = currentPath === subItem.to;
                      const subClasses = subActive
                        ? 'sidebar-active px-3 py-2 rounded-xl flex items-center gap-2 transition-all bg-white/10'
                        : 'text-outline-variant hover:text-white px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all';

                      return (
                        <Link key={subItem.label} className={subClasses} to={subItem.to}>
                          <span className="material-symbols-outlined text-sm">{subItem.icon}</span>
                          <span className="text-body-sm">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-1">
        <button className="w-full bg-primary-container text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-6 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add</span>
          New Entry
        </button>
        {actionItems.map((item) => (
          <a key={item.label} className="text-outline-variant hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-all" href={item.to}>
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-body-md text-body-md">{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
