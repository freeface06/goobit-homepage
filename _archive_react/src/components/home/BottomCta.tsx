/**
 * @intent Enterprise Bottom CTA banner in Goobit Navy & Amber with ScrollReveal zoom-in entrance and pulse glow
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { NavigationMenuId } from '../../types';
import { LEGAL_INFO } from '../../data/companyData';
import { ScrollReveal } from '../common/ScrollReveal';

interface BottomCtaProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const BottomCta: React.FC<BottomCtaProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-32 lg:py-44 bg-[#162846] text-white overflow-hidden" aria-label="프로젝트 상담 신청">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <ScrollReveal animation="zoom-in" duration={800} delay={100}>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-extrabold text-amber-400 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>START YOUR AI & DX JOURNEY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            차세대 시스템 구축과 AI 전환,<br />
            <span className="text-amber-400">구비트 엔지니어링 전문가</span>와 함께하세요
          </h2>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            공공 정보화, 대용량 통신망, 독자 솔루션 노하우로 최적의 솔루션을 제안합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('contact', 'inquiry')}
              className="w-full sm:w-auto px-10 py-4.5 rounded-2xl text-base font-extrabold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all duration-300 shadow-lg ring-4 ring-amber-400/30 hover:ring-amber-400/60 hover:scale-105 flex items-center justify-center gap-2.5 group"
            >
              <span>1:1 맞춤 견적 및 데모 요청</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href={`tel:${LEGAL_INFO.tel}`}
              className="w-full sm:w-auto px-10 py-4.5 rounded-2xl text-base font-bold bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 hover:border-slate-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <PhoneCall className="w-5 h-5 text-amber-400" />
              <span>유선 상담: {LEGAL_INFO.tel}</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              초기 기술 컨설팅 무료
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              사전 NDA(비밀유지협약) 보장
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default BottomCta;
