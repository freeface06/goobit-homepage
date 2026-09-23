/**
 * @intent Root application component managing GNB navigation, streamlined 8-step homepage flow, and dedicated sub-views
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SkipLink } from './components/common/SkipLink';
import { FloatingQuickBar } from './components/common/FloatingQuickBar';

// Home Landing Sections (Streamlined 8-step flow matching BI Matrix structure)
import { Hero } from './components/home/Hero';
import { StatBar } from './components/home/StatBar';
import { AiHighlight } from './components/home/AiHighlight';
import { ProductSection } from './components/home/ProductSection';
import { ServiceSection } from './components/home/ServiceSection';
import { CaseStudySection } from './components/home/CaseStudySection';
import { LatestNewsSection } from './components/home/LatestNewsSection';
import { PartnerMarquee } from './components/home/PartnerMarquee';
import { BottomCta } from './components/home/BottomCta';

// Dedicated Sub-views
import { CompanyView } from './components/company/CompanyView';
import { ProductsView } from './components/products/ProductsView';
import { ServicesView } from './components/services/ServicesView';
import { NewsView } from './components/news/NewsView';
import { ContactView } from './components/contact/ContactView';

import { NavigationMenuId } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | NavigationMenuId>('home');
  const [newsCategory, setNewsCategory] = useState<string | undefined>(undefined);

  const handleNavigate = (view: 'home' | NavigationMenuId, anchor?: string) => {
    setCurrentView(view);
    if (view === 'news') {
      setNewsCategory(anchor);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    if (anchor && view !== 'news') {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-content-heading">
      {/* KRDS Skip Navigation */}
      <SkipLink />

      {/* Global GNB (Clean White Backdrop) */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {currentView === 'home' && (
          <>
            {/* 1. Hero (Top Hero + Scroll-expanding Video + Minimalist Overlay) */}
            <Hero onNavigate={handleNavigate} />

            {/* 2. StatBar (Clean bright 4-stat counters) */}
            <StatBar />

            {/* 3. AiHighlight (3 clean cards) */}
            <AiHighlight onNavigate={handleNavigate} />

            {/* 4. ProductSection (3 clean product cards) */}
            <ProductSection onNavigate={handleNavigate} />

            {/* 5. ServiceSection (4 service domains) */}
            <ServiceSection onNavigate={handleNavigate} />

            {/* 6. CaseStudySection (success stories) */}
            <CaseStudySection onNavigate={handleNavigate} />

            {/* 7. LatestNewsSection (interactive card news preview) */}
            <LatestNewsSection onNavigate={handleNavigate} />

            {/* 8. PartnerMarquee (client logos on pure white background) */}
            <PartnerMarquee />

            {/* 9. BottomCta (Goobit Navy & Amber banner) */}
            <BottomCta onNavigate={handleNavigate} />
          </>
        )}

        {currentView === 'company' && (
          <CompanyView onNavigate={handleNavigate} />
        )}

        {currentView === 'products' && (
          <ProductsView onNavigate={handleNavigate} />
        )}

        {currentView === 'services' && (
          <ServicesView onNavigate={handleNavigate} />
        )}

        {currentView === 'news' && (
          <NewsView onNavigate={handleNavigate} initialCategory={newsCategory} />
        )}

        {currentView === 'contact' && (
          <ContactView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating Quick Bar (Demo, Quote, Scroll Top) */}
      <FloatingQuickBar onNavigate={handleNavigate} />

      {/* Enterprise Legal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
