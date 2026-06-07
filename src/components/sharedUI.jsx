import React, { useEffect } from 'react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
      <span className="material-symbols-outlined animate-spin text-4xl mb-4 text-primary">autorenew</span>
      <p>Đang tải dữ liệu...</p>
    </div>
  );
}

export function EmptyState({ title = "Không có dữ liệu", message = "Thử thay đổi bộ lọc hoặc thêm mới." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100">
      <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">inbox</span>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm max-w-sm">{message}</p>
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Xác nhận", type = "danger" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 text-center animate-in zoom-in-95 duration-300">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${type === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-primary-container/20 text-primary'}`}>
          <span className="material-symbols-outlined text-3xl">
            {type === 'danger' ? 'warning' : 'info'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-8">{message}</p>
        <div className="flex items-center gap-3 justify-center">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
            Hủy bỏ
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }} 
            className={`px-6 py-2.5 rounded-xl font-semibold text-white transition-colors ${type === 'danger' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-primary-container hover:brightness-110'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
