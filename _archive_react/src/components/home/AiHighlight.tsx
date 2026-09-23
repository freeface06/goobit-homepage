/**
 * @intent Streamlined 3-card AI highlights with ScrollReveal entrance and interactive card lift
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { Network, Workflow, Bot, ChevronRight, Sparkles } from 'lucide-react';
import { NavigationMenuId } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

interface AiHighlightProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const AiHighlight: React.FC<AiHighlightProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      icon: <Network className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/60',
      badge: '지식 구조화 & RAG',
      title: '하이브리드 지식그래프 & RAG',
      summary: '비정형 문서를 온톨로지로 지식자산화하여 99.8% 무환각 검색 증강 생성을 실현합니다.',
      metric: '정확도 99.8%',
      targetAnchor: 'ai-suite',
    },
    {
      icon: <Workflow className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-200/60',
      badge: '업무 프로세스 혁신',
      title: 'AI 업무 자동화 & 인텔리전트 코딩',
      summary: '공공 행정 양식 조판과 대용량 통신 트래픽 장애 모니터링을 자율 에이전트로 전면 자동화합니다.',
      metric: '공수 75% 절감',
      targetAnchor: 'ai-suite',
    },
    {
      icon: <Bot className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/60',
      badge: '폐쇄망 온프레미스 보안',
      title: '엔터프라이즈 Agentic AI & 보안',
      summary: '국정원 보안 지침을 충족하는 사내 망분리 온프레미스 sLLM 배포로 데이터를 완벽히 보호합니다.',
      metric: '데이터 유출 0%',
      targetAnchor: 'ai-suite',
    },
  ];

  return (
    <section className="py-28 lg:py-36 bg-[#F8FAFC] border-t border-slate-200/80 relative" aria-label="AI 핵심 역량">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-extrabold text-amber-600 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>CORE AI CAPABILITIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#162846] tracking-tight leading-snug">
              엔터프라이즈 실무를 위한 Goobit 핵심 AI 기술
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-3xl mx-auto">
              비정형 데이터 구조화부터 오차 없는 하이브리드 RAG, 폐쇄망 온프레미스 보안까지 검증된 기술을 제공합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Clean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {capabilities.map((item, idx) => (
            <ScrollReveal
              key={idx}
              animation="fade-up"
              delay={idx * 150}
              duration={700}
              className="h-full"
            >
              <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 lg:p-11 flex flex-col justify-between hover:border-amber-400 hover:shadow-card-hover hover:-translate-y-2.5 transition-all duration-300 group h-full">
                <div className="space-y-6">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-2xl ${item.iconBg} shadow-xs group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}>
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bold 1-line Title & 1-line Summary */}
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#162846] group-hover:text-blue-600 transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Metric & View More */}
                <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-100">
                    {item.metric}
                  </span>

                  <button
                    onClick={() => onNavigate('products', item.targetAnchor)}
                    className="text-sm font-extrabold text-slate-700 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors"
                  >
                    <span>VIEW MORE</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AiHighlight;
