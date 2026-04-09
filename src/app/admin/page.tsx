'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin/copy');
    } else {
      setError('Password errata');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080C] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-12 text-center">
          <img src="/brand/logo bianco.png" alt="Gleeye" className="h-10 mx-auto mb-3" />
          <p className="font-satoshi text-[10px] uppercase tracking-[0.25em] text-white/20">
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 font-jakarta text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            {error && (
              <p className="mt-2 text-xs text-red-400 font-jakarta">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 rounded-xl font-satoshi font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-30"
            style={{ background: 'linear-gradient(135deg, #614aa2, #4e92d8)' }}
          >
            {loading ? 'Accesso...' : 'Entra'}
          </button>
        </form>
      </div>
    </div>
  );
}
