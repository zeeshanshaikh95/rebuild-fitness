import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { Wordmark } from '@/components/Wordmark';

const NAV = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/products', label: 'Programs' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/settings', label: 'Settings' },
];

export function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-coal lg:flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 transform border-r border-forge-400/15 bg-iron transition-transform duration-300 ease-editorial lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-6 py-7">
          <div className="flex items-start justify-between">
            <Wordmark size="sm" withTagline asLink={false} className="items-start" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-chalk/50 hover:text-forge-300 lg:hidden"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-1" aria-label="Admin">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between border-l px-3 py-2.5 text-[11px] uppercase tracking-wide2 transition-colors ${
                    isActive
                      ? 'border-forge-400 bg-forge-400/10 text-forge-200'
                      : 'border-transparent text-chalk/50 hover:text-chalk'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-forge-400/15 pt-5">
            <p className="truncate text-[10px] uppercase tracking-wide2 text-chalk/40">{admin?.email}</p>
            <div className="mt-3 flex flex-col gap-2 text-[10px] uppercase tracking-wide2">
              <Link to="/admin/password" className="text-chalk/60 hover:text-forge-300">
                Change password
              </Link>
              <Link to="/" target="_blank" className="text-chalk/60 hover:text-forge-300">
                View site ↗
              </Link>
              <button type="button" onClick={logout} className="text-left text-chalk/60 hover:text-forge-300">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-coal/70 lg:hidden"
        />
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-forge-400/15 bg-iron px-5 py-3 lg:hidden">
          <button type="button" onClick={() => setOpen(true)} className="text-[10px] uppercase tracking-wide2 text-forge-300">
            ☰ Menu
          </button>
          <span className="text-[10px] uppercase tracking-wide2 text-dust">Rebuild Admin</span>
        </div>

        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
