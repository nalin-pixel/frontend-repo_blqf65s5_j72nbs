import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ activeKey }) {
  const parts = activeKey.split('/');
  const mapping = {
    dashboard: 'Dashboard',
    masters: 'Masters',
    contacts: 'Contacts',
    products: 'Products',
    taxes: 'Taxes',
    'chart-of-accounts': 'Chart of Accounts',
    transactions: 'Transactions',
    'sales-order': 'Sales Order',
    'purchase-order': 'Purchase Order',
    invoices: 'Invoices',
    'vendor-bill': 'Vendor Bill',
    payments: 'Payments',
    reports: 'Reports',
    'balance-sheet': 'Balance Sheet',
    'profit-loss': 'Profit & Loss',
    stock: 'Stock',
    'customer-dashboard': 'Customer Dashboard',
  };

  const labels = parts.map((p) => mapping[p] || p);

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      {labels.map((label, idx) => (
        <React.Fragment key={`${label}-${idx}`}>
          <span className={idx === labels.length - 1 ? 'text-gray-900 font-medium' : ''}>{label}</span>
          {idx < labels.length - 1 && <ChevronRight className="h-4 w-4 text-gray-400" />}
        </React.Fragment>
      ))}
    </div>
  );
}
