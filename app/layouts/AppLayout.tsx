import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
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

      {/* Simplified Footer */}
      {!isToolPage && (
        <footer className="border-t border-zinc-900 bg-black mt-auto py-8">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500">
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              <span>Credits:</span>
              <a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">ReactBits</a>
              <span>·</span>
              <a href="https://threejs.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Three.js</a>
              <span>·</span>
              <a href="https://github.com/oopsaune/ogl" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">OGL</a>
              <span>·</span>
              <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Lucide Icons</a>
              <span>·</span>
              <a href="https://github.com/pmndrs/drei" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Drei</a>
              <span>·</span>
              <a href="https://gsap.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">GSAP</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/docs" className="text-zinc-300 hover:text-white font-bold transition-colors">Documentation</Link>
              <span>·</span>
              <span>© 2026 Onyx Tools</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
