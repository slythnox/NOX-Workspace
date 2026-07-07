import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import CommandPalette from '@/components/command-palette/CommandPalette';
import { cn } from '@/lib/utils';

export default function AppLayout() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith('/tools');

  return (
    <div className={cn("min-h-screen flex flex-col bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white", isToolPage && "h-screen overflow-hidden")}>
      {/* Floating Navbar */}
      {!isToolPage && <Navbar />}

      {/* Main Content Area */}
      <main className={cn('flex-1 flex flex-col min-h-0', !isToolPage && 'pt-20')}>
        <Outlet />
      </main>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Rich Footer */}
      {!isToolPage && (
        <footer className="border-t border-zinc-900 bg-black mt-auto">
          {/* Main footer content */}
          <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* Brand column */}
            <div className="sm:col-span-1 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-sm bg-white" />
                </div>
                <span className="font-mono text-sm font-bold text-white tracking-tight">Onyx Tools</span>
              </div>
              <p className="font-mono text-[10px] text-zinc-500 leading-relaxed max-w-[180px]">
                Precision-built developer tools. Open source. Always free.
              </p>
            </div>

            {/* Spacer on small screens */}
            <div className="hidden sm:block sm:col-span-1" />

            {/* Links columns */}
            <div className="sm:col-span-1 grid grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-3">Product</div>
                <ul className="space-y-2">
                  {[
                    { label: 'Components', href: '/tools/components' },
                    { label: 'Background Studio', href: '/tools/backgrounds' },
                    { label: 'Icon Studio', href: '/tools/icons' },
                    { label: 'Code Snippets', href: '/tools/snippets' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="font-mono text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-3">Community</div>
                <ul className="space-y-2">
                  {[
                    { label: 'GitHub', href: 'https://github.com/slythnox/Onyx-Tools' },
                    { label: 'ReactBits', href: 'https://reactbits.dev' },
                    { label: 'Lucide Icons', href: 'https://lucide.dev' },
                    { label: 'Three.js', href: 'https://threejs.org' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom copyright bar */}
          <div className="border-t border-zinc-900">
            <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="font-mono text-[10px] text-zinc-700">
                Created with <span className="text-red-600">♥</span> by{' '}
                <a href="https://github.com/slythnox" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
                  slythnox
                </a>
              </p>
              <p className="font-mono text-[10px] text-zinc-700">
                © 2026 Onyx Tools · Open Source · MIT License
              </p>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
