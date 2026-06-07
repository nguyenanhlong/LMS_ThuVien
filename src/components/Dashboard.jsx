import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

export default function Dashboard() {
  useEffect(() => {
    // Simple Interaction: Search field focus effect
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('scale-[1.02]');
        searchInput.parentElement.classList.add('transition-transform');
      });
      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('scale-[1.02]');
      });
    }

    // Toggle hover effects for sidebar
    document.querySelectorAll('aside nav a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('sidebar-active')) {
          link.style.paddingLeft = '1.5rem';
        }
      });
      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('sidebar-active')) {
          link.style.paddingLeft = '1rem';
        }
      });
    });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Books */}
            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                  <span className="material-symbols-outlined">auto_stories</span>
                </div>
                <span className="text-xs font-bold text-success flex items-center text-emerald-600">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  12%
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase">
                Tổng số sách
              </h3>
              <p className="font-kpi-number text-kpi-number text-on-surface mt-1">
                12,842
              </p>
            </div>

            {/* Borrowed */}
            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-fixed rounded-lg text-secondary">
                  <span className="material-symbols-outlined">outbox</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  5.4%
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase">
                Đang cho mượn
              </h3>
              <p className="font-kpi-number text-kpi-number text-on-surface mt-1">
                1,420
              </p>
            </div>

            {/* New Members */}
            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary-fixed rounded-lg text-tertiary">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
                <span className="text-xs font-bold text-rose-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_down
                  </span>
                  2.1%
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase">
                Thành viên mới
              </h3>
              <p className="font-kpi-number text-kpi-number text-on-surface mt-1">
                184
              </p>
            </div>

            {/* Late Returns */}
            <div className="bg-white p-6 rounded-2xl card-shadow group hover:border-primary-container transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-error-container rounded-lg text-error">
                  <span className="material-symbols-outlined">priority_high</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_down
                  </span>
                  8%
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase">
                Trả trễ hạn
              </h3>
              <p className="font-kpi-number text-kpi-number text-on-surface mt-1">
                42
              </p>
            </div>
          </div>

          {/* Main Workspace Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Performance Chart (Simulated) */}
            <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl card-shadow h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-section-title text-section-title text-on-surface">
                    Thống kê lưu thông
                  </h2>
                  <p className="text-body-sm text-outline-variant">
                    Hoạt động mượn trả trong 7 ngày qua
                  </p>
                </div>
                <select className="bg-surface-container-low border-outline-variant rounded-lg text-sm px-3 py-1.5 focus:ring-primary">
                  <option>Tuần này</option>
                  <option>Tháng trước</option>
                </select>
              </div>
              <div className="flex-1 w-full bg-slate-50 rounded-xl relative flex items-end justify-between p-8 gap-4 overflow-hidden">
                {/* Simulated Chart Bars */}
                {[80, 90, 70, 85, 40, 65, 95].map((height, index) => (
                  <div
                    key={index}
                    className="w-full bg-primary-container/20 h-[60%] rounded-t-lg relative group"
                  >
                    <div
                      className="absolute bottom-0 w-full bg-primary-container rounded-t-lg transition-all group-hover:brightness-110"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl card-shadow h-[400px] flex flex-col">
              <h2 className="font-section-title text-section-title text-on-surface mb-6">
                Thông báo
              </h2>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-orange-600 text-sm">
                      warning
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">
                      Yêu cầu nhập sách mới
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Bộ phận học thuật yêu cầu 50 cuốn...
                    </p>
                    <span className="text-[10px] text-outline mt-1 block">
                      10 phút trước
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-blue-600 text-sm">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">
                      Thành viên mới đăng ký
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Nguyễn Văn A vừa hoàn tất hồ sơ...
                    </p>
                    <span className="text-[10px] text-outline mt-1 block">
                      1 giờ trước
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">
                      Hệ thống đã cập nhật
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Phiên bản v2.4.1 đã sẵn sàng...
                    </p>
                    <span className="text-[10px] text-outline mt-1 block">
                      3 giờ trước
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* EMPTY STATE SEARCH RESULTS */}
            <div className="col-span-12 bg-white rounded-2xl card-shadow min-h-[400px] flex flex-col items-center justify-center p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline text-5xl opacity-40">
                    manage_search
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-error text-lg">
                    close
                  </span>
                </div>
              </div>
              <h2 className="text-[#0F172A] text-[20px] font-semibold mb-2">
                Không tìm thấy sách phù hợp
              </h2>
              <p className="text-[#64748B] text-[14px] max-w-sm mb-8">
                Thử thay đổi từ khóa tìm kiếm hoặc kiểm tra lại bộ lọc. Chúng tôi
                không tìm thấy kết quả nào khớp với tiêu chí của bạn.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95">
                  <span className="material-symbols-outlined text-lg">
                    filter_list_off
                  </span>
                  Xóa bộ lọc
                </button>
                <button className="px-6 py-2.5 bg-primary-container text-white rounded-lg font-medium hover:brightness-110 shadow-sm transition-all active:scale-95">
                  Thử lại
                </button>
              </div>
              {/* Subtle Decorative Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-10 right-20 w-32 h-32 border-4 border-outline-variant/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-20 w-48 h-48 border-4 border-primary-container/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-auto p-8 border-t border-outline-variant flex justify-between items-center text-outline-variant text-xs">
          <p>© 2024 Library Management System. v2.4.1</p>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">
              Quy định thư viện
            </a>
            <a className="hover:text-primary" href="#">
              Bảo mật hệ thống
            </a>
            <a className="hover:text-primary" href="#">
              Liên hệ hỗ trợ
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
