import React from 'react';
import { Search, User, LogOut, Menu } from 'lucide-react';

const roles = ["Admin", "Invoicing User", "Customer"];

export default function Navbar({ role, setRole, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="text-lg font-semibold tracking-tight text-gray-900">
              Shiv Accounts Cloud
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Search invoices, contacts, products..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              aria-label="Select role"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="hidden items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-700 md:flex">
              <User className="h-4 w-4 text-gray-500" />
              <span className="truncate max-w-[120px]">{role}</span>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
