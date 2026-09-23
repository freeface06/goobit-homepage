/**
 * @intent Floating scroll-to-top button (quick demo and quote buttons removed per user request)
 * @agent  manager-design
 * @branch feat/remove-floating-buttons
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface FloatingQuickBarProps {
  onNavigate?: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const FloatingQuickBar: React.FC<FloatingQuickBarProps> = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <aside
      className="fixed bottom-6 right-6 z-40"
      aria-label="화면 상단으로 이동"
    >
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="p-3.5 rounded-full bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 group"
        aria-label="화면 상단으로 이동"
        title="맨 위로 이동"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </aside>
  );
};

export default FloatingQuickBar;
