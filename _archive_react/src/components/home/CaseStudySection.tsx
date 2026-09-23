/**
 * @intent Streamlined minimalist case study cards with ScrollReveal entrance and filter transitions
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/caseStudiesData';
import { Trophy, Building, CheckCircle2, ChevronRight } from 'lucide-react';
import { NavigationMenuId } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

interface CaseStudySectionProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'public' | 'telecom' | 'education' | 'culture'>('all');

  const filterTabs = [
    { key: 'all', label: '전체 보기' },
    { key: 'public', label: '공공 정보화' },
    { key: 'telecom', label: '통신·미디어' },
    { key: 'culture', label: '문화예술' },
    { key: 'education', label: '스마트 교육' },
  ];

  const filteredCases = filter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === filter);

  return (
    <section className="py-28 lg:py-36 bg-[#F8FAFC] border-t border-slate-200/80" aria-label="고객 성공 사례">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-extrabold text-amber-600 shadow-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>PROVEN TRACK RECORD</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#162846] tracking-tight leading-snug">
              엔터프라이즈 고객 성공 사례
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-3xl mx-auto">
              농림축산식품부, KT, 서울시향, 현대자동차 등 주요 고객사와 함께 완성한 핵심 레퍼런스입니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14" role="tablist">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === tab.key
                  ? 'bg-[#162846] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Minimalist Cards Grid with Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredCases.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={(idx % 6) * 100}
              duration={650}
              className="h-full"
            >
              <article
                className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-card-hover hover:border-amber-400 hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div className="space-y-5">
                  {/* Client Logo/Name Header & Category */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Building className="w-5 h-5" />
                      </div>
                      <span className="text-base font-extrabold text-[#162846]">{item.client}</span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* 1-line Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {item.projectTitle}
                  </h3>

                  {/* 1-line Key Achievement */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      핵심 성과
                    </div>
                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        {item.keyOutcomes[0] || '성공적 구축 및 SLA 기준 충족'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Year & View More */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                  <span className="text-xs text-slate-400 font-medium">
                    {item.period}
                  </span>

                  <button
                    onClick={() => onNavigate('contact', 'inquiry')}
                    className="font-extrabold text-slate-700 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>상세 제안서 요청</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudySection;
