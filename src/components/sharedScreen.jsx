import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/frontend.css';

export function Page({ title, description, crumbs, actions, children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="ml-sidebar-width min-h-screen flex flex-col bg-background">
        <Header />
        <section className="p-8 space-y-8">
          <div className="rounded-3xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
            <nav className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <Link className="text-primary hover:underline" to="/dashboard">Dashboard</Link>
              {crumbs.map((crumb) => (
                <Fragment key={crumb}>
                  <span>/</span>
                  <span className="font-semibold text-slate-900">{crumb}</span>
                </Fragment>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}

export function StatCard({ label, value, note, icon }) {
  return (
    <article className="bg-white p-6 rounded-2xl card-shadow">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <h2 className="mt-4 text-3xl font-bold text-slate-950">{value}</h2>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </article>
  );
}

export function Field({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function DataTable({ rows, columns }) {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 font-semibold text-slate-900">{col.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-200">
              {columns.map((col) => (
                <td key={col} className="px-4 py-4 text-slate-900">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
