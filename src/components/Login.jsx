import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_520px] bg-slate-950">
      <section className="hidden lg:flex flex-col justify-between p-12 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
        <div className="rounded-2xl bg-slate-950/70 px-5 py-4 text-white backdrop-blur">
          <h1 className="text-3xl font-bold">Lumina Library</h1>
          <p className="mt-2 text-sm text-slate-200">Quan ly sach, doc gia va luong muon tra tren mot giao dien tap trung.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
          <div className="h-12 w-12 rounded-2xl bg-primary-container text-white flex items-center justify-center">
            <span className="material-symbols-outlined">local_library</span>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-950">Dang nhap he thong</h2>
          <p className="mt-2 text-sm text-slate-500">Nhap tai khoan thu thu hoac admin de tiep tuc.</p>
          <div className="mt-8 space-y-4">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Email hoac ten dang nhap" />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Mat khau" type="password" />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" /> Ghi nho dang nhap</label>
              <a className="font-semibold text-primary" href="#">Quen mat khau?</a>
            </div>
            <Link className="flex w-full items-center justify-center rounded-2xl bg-primary-container py-3 text-sm font-semibold text-white" to="/">
              Dang nhap
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
