import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Breadcrumbs from './components/Breadcrumbs';
import Content from './components/Content';

function Auth({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const title = useMemo(() => ({ login: 'Login', signup: 'Create Account', forgot: 'Forgot Password' })[mode], [mode]);

  function validate() {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (mode !== 'forgot') {
      if (form.password.length < 8) errs.password = 'Min 8 characters';
      if (!/[A-Z]/.test(form.password)) errs.password = 'Include an uppercase letter';
      if (!/[0-9]/.test(form.password)) errs.password = 'Include a number';
    }
    if (mode === 'signup' && form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    // Mock unique email rule
    if (mode === 'signup' && form.email.toLowerCase() === 'admin@shiv.com') {
      setErrors({ email: 'Email already in use' });
      return;
    }
    onAuth({ email: form.email, role: form.email.includes('customer') ? 'Customer' : 'Admin' });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Shiv Accounts Cloud</h1>
          <p className="text-sm text-gray-500">{title} to continue</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-rose-300 ring-rose-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-100'}`}
              placeholder="you@company.com"
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>
          {mode !== 'forgot' && (
            <>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-rose-300 ring-rose-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-100'}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
              </div>
              {mode === 'signup' && (
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Confirm Password</label>
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.confirm ? 'border-rose-300 ring-rose-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-100'}`}
                    placeholder="••••••••"
                  />
                  {errors.confirm && <p className="mt-1 text-xs text-rose-600">{errors.confirm}</p>}
                </div>
              )}
            </>
          )}
          <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            {mode === 'login' ? 'Login' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-4 flex items-center justify-between text-sm">
          <button className="text-indigo-600 hover:underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Create account' : 'Have an account? Login'}
          </button>
          <button className="text-gray-600 hover:underline" onClick={() => setMode('forgot')}>Forgot password?</button>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">Roles hint: use an email with "customer" to preview customer view.</div>
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState('Admin');
  const [activeKey, setActiveKey] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) {
    return <Auth onAuth={({ role }) => { setAuthed(true); setRole(role); setActiveKey(role === 'Customer' ? 'customer-dashboard' : 'dashboard'); }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={role} setRole={setRole} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <Sidebar role={role} activeKey={activeKey} setActiveKey={(k) => { setActiveKey(k); setSidebarOpen(false); }} open={sidebarOpen} />
          <main className="flex-1">
            <div className="mb-4"><Breadcrumbs activeKey={activeKey} /></div>
            <Content activeKey={activeKey} role={role} />
          </main>
        </div>
      </div>
    </div>
  );
}
