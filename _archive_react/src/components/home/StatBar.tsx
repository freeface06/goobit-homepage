/**
 * @intent Enterprise social proof 4-stat metrics bar with ScrollReveal entrance and hover micro-interactions
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { Calendar, CheckSquare, Activity, Handshake } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const StatBar: React.FC = () => {
  const stats = [
    {
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
      value: '10+',
      unit: '년',
      label: '엔터프라이즈 업력',
      description: '2015년 법인 설립 이래 미션 크리티컬 SI/ITO 전담',
    },
    {
      icon: <CheckSquare className="w-5 h-5 text-blue-600" />,
      value: '100+',
      unit: '건',
      label: '메이저 프로젝트 완수',
      description: '중앙부처, 지자체, 통신 대기업 정보화 레퍼런스',
    },
    {
      icon: <Activity className="w-5 h-5 text-amber-500" />,
      value: '99.9%',
      unit: '가용성',
      label: '무중단 서비스 연속성',
      description: '일 트래픽 5,000만 뷰 통신 포털 8개년 연속 무장애',
    },
    {
      icon: <Handshake className="w-5 h-5 text-blue-600" />,
      value: '15+',
      unit: '개사',
      label: '핵심 고객사 & 파트너',
      description: 'KT, 농림축산식품부, 서울시향 등 장기 파트너십',
    },
  ];

  return (
    <section className="bg-white border-y border-slate-200/80 py-20 lg:py-24 relative z-20" aria-label="주요 실적 지표">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <ScrollReveal
              key={idx}
              animation="fade-up"
              delay={idx * 120}
              duration={650}
              className="h-full"
            >
              <div className="flex items-start gap-5 p-7 sm:p-8 rounded-3xl bg-slate-50/90 border border-slate-200/90 hover:border-amber-400 hover:bg-white hover:shadow-card-hover hover:-translate-y-2.5 transition-all duration-300 group cursor-default h-full">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs shrink-0 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#162846] tracking-tight group-hover:scale-105 inline-block transition-transform duration-200 origin-left">
                      {stat.value}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-amber-500">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900">
                    {stat.label}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBar;
