/**
 * @intent Scrolling enterprise client and partner marquee strip in clean bright pure white tone
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { PARTNERS_LIST } from '../../data/caseStudiesData';
import { ShieldCheck, Building2 } from 'lucide-react';

export const PartnerMarquee: React.FC = () => {
  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...PARTNERS_LIST, ...PARTNERS_LIST];

  return (
    <section className="py-14 bg-white border-y border-slate-200/80 overflow-hidden" aria-label="주요 고객사 및 파트너">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              ENTERPRISE CLIENTS & PARTNERS
            </span>
          </div>
          <span className="text-xs text-slate-500">
            대한민국 대표 공공기관 및 대기업 신뢰 파트너십
          </span>
        </div>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Edge Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee space-x-5">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0 hover:border-amber-400 hover:bg-white hover:shadow-xs transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  {item.name}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
