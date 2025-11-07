import React from 'react';
import { Home, FolderKanban, ShoppingCart, FileText, Layers, Users, Package, Percent, BookOpen, Receipt, CreditCard } from 'lucide-react';

const sections = [
  {
    title: 'Dashboard',
    items: [
      { label: 'Home', icon: Home, key: 'dashboard' },
    ],
  },
  {
    title: 'Masters',
    items: [
      { label: 'Contacts', icon: Users, key: 'masters/contacts' },
      { label: 'Products', icon: Package, key: 'masters/products' },
      { label: 'Taxes', icon: Percent, key: 'masters/taxes' },
      { label: 'Chart of Accounts', icon: BookOpen, key: 'masters/chart-of-accounts' },
    ],
  },
  {
    title: 'Transactions',
    items: [
      { label: 'Sales Order', icon: FolderKanban, key: 'transactions/sales-order' },
      { label: 'Purchase Order', icon: ShoppingCart, key: 'transactions/purchase-order' },
      { label: 'Invoices', icon: Receipt, key: 'transactions/invoices' },
      { label: 'Vendor Bill', icon: FileText, key: 'transactions/vendor-bill' },
      { label: 'Payments', icon: CreditCard, key: 'transactions/payments' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { label: 'Balance Sheet', icon: Layers, key: 'reports/balance-sheet' },
      { label: 'Profit & Loss', icon: Layers, key: 'reports/profit-loss' },
      { label: 'Stock', icon: Layers, key: 'reports/stock' },
    ],
  },
];

export default function Sidebar({ activeKey, setActiveKey, role, open }) {
  const linkBase = 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50';
  return (
    <aside
      className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-72 transform border-r border-gray-200 bg-white p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <nav className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map(({ label, icon: Icon, key }) => {
                // Role-based visibility: customers only see dashboard and invoices
                if (role === 'Customer' && !['dashboard', 'transactions/invoices'].includes(key)) return null;
                return (
                  <li key={key}>
                    <button
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm ${activeKey === key ? 'bg-indigo-50 text-indigo-700' : linkBase}`}
                      onClick={() => setActiveKey(key)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
