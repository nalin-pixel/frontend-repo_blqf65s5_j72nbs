import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const Card = ({ title, children, actions }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {actions}
    </div>
    <div>{children}</div>
  </div>
);

const Divider = () => <div className="h-px w-full bg-gray-100" />;

const mockInvoices = [
  { no: 'INV-1001', date: '2025-01-12', due: '2025-01-27', amount: 1200, status: 'Paid' },
  { no: 'INV-1002', date: '2025-01-18', due: '2025-02-02', amount: 540, status: 'Unpaid' },
  { no: 'INV-1003', date: '2025-02-05', due: '2025-02-20', amount: 320, status: 'Overdue' },
];

function Badge({ status }) {
  const map = {
    Paid: 'bg-green-50 text-green-700 border-green-200',
    Unpaid: 'bg-amber-50 text-amber-700 border-amber-200',
    Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${map[status]}`}>{status}</span>;
}

function Table({ columns, data, onPay }) {
  return (
    <div className="overflow-auto">
      <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 font-medium">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.no} className="rounded-lg bg-white shadow-sm">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-3 text-sm text-gray-700 align-middle">
                  {c.key === 'status' ? (
                    <Badge status={row.status} />
                  ) : c.key === 'pay' ? (
                    <button
                      onClick={() => onPay(row)}
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Pay Now
                    </button>
                  ) : (
                    row[c.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PayModal({ open, onClose, invoice }) {
  if (!open || !invoice) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Pay Invoice {invoice.no}</h3>
            <p className="text-sm text-gray-500">Amount due: ${invoice.amount}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-gray-500 hover:bg-gray-100">✕</button>
        </div>
        <form className="space-y-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Cardholder Name</label>
            <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Card Number</label>
            <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">Expiry</label>
              <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="MM/YY" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">CVC</label>
              <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="123" />
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">Pay ${invoice.amount}</button>
        </form>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
      <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
    </div>
  );
}

export default function Content({ activeKey, role }) {
  const [payOpen, setPayOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const onPay = (invoice) => {
    setSelectedInvoice(invoice);
    setPayOpen(true);
  };

  const page = useMemo(() => {
    switch (activeKey) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Hero />
            <div className="grid gap-6 md:grid-cols-3">
              <Card title="Receivables" actions={<span className="text-xs text-gray-500">This month</span>}>
                <div className="text-2xl font-semibold text-gray-900">$18,240</div>
                <p className="mt-1 text-sm text-gray-500">+8% vs last month</p>
              </Card>
              <Card title="Payables" actions={<span className="text-xs text-gray-500">This month</span>}>
                <div className="text-2xl font-semibold text-gray-900">$12,910</div>
                <p className="mt-1 text-sm text-gray-500">-3% vs last month</p>
              </Card>
              <Card title="Invoices">
                <div className="flex items-center gap-3">
                  <Badge status="Paid" />
                  <Badge status="Unpaid" />
                  <Badge status="Overdue" />
                </div>
              </Card>
            </div>
          </div>
        );
      case 'masters/products':
      case 'masters/contacts':
      case 'masters/taxes':
      case 'masters/chart-of-accounts':
        return (
          <div className="space-y-4">
            <Card title="Master List" actions={role === 'Admin' ? <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">Add New</button> : <span className="text-xs text-gray-500">Read only</span>}>
              <div className="text-sm text-gray-600">Mock table content for {activeKey.replace('masters/', '')}.</div>
            </Card>
          </div>
        );
      case 'transactions/invoices':
        return (
          <div className="space-y-4">
            <Card title="Invoices">
              <Table
                columns={[
                  { key: 'no', label: 'No' },
                  { key: 'date', label: 'Date' },
                  { key: 'due', label: 'Due Date' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'status', label: 'Status' },
                  { key: 'pay', label: 'Pay Now' },
                ]}
                data={mockInvoices}
                onPay={onPay}
              />
            </Card>
          </div>
        );
      case 'transactions/sales-order':
      case 'transactions/purchase-order':
      case 'transactions/vendor-bill':
      case 'transactions/payments':
        return (
          <div className="space-y-4">
            <Card title="Form">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Customer</label>
                  <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Select or type" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Date</label>
                  <input type="date" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm text-gray-600">Notes</label>
                  <textarea className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" rows={3} />
                </div>
              </div>
            </Card>
            <Card title="Line Items" actions={<button className="rounded-md border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50">Add Line</button>}>
              <div className="text-sm text-gray-600">Mock items grid with totals.</div>
            </Card>
          </div>
        );
      case 'reports/balance-sheet':
      case 'reports/profit-loss':
      case 'reports/stock':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Report Filters">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-600">From</label>
                  <input type="date" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">To</label>
                  <input type="date" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                </div>
              </div>
            </Card>
            <Card title="{Report}">
              <div className="h-48 rounded-lg bg-gradient-to-br from-indigo-50 to-white" />
            </Card>
          </div>
        );
      case 'customer-dashboard':
        return (
          <div className="space-y-4">
            <Card title="My Invoices">
              <Table
                columns={[
                  { key: 'no', label: 'No' },
                  { key: 'date', label: 'Date' },
                  { key: 'due', label: 'Due Date' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'status', label: 'Status' },
                  { key: 'pay', label: 'Pay Now' },
                ]}
                data={mockInvoices}
                onPay={onPay}
              />
            </Card>
          </div>
        );
      default:
        return <div className="text-sm text-gray-600">Page not found</div>;
    }
  }, [activeKey, role]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <PayModal open={payOpen} onClose={() => setPayOpen(false)} invoice={selectedInvoice} />
    </>
  );
}
