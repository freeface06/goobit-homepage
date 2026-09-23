/**
 * @intent Streamlined 4 clean service domain cards with ScrollReveal stagger and card elevation
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { Landmark, Radio, GraduationCap, Compass, ChevronRight, ArrowRight, Briefcase } from 'lucide-react';
import { NavigationMenuId } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

interface ServiceSectionProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'public-si',
      title: '공공 정보화 SI',
      englishTitle: 'Public Information System Integration',
      icon: <Landmark className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-200/60',
      oneLineCopy: '전자정부 표준프레임워크 기반 공공 행정 및 대국민 정보화 시스템 구축',
      clients: ['농림축산식품부', '국립농산물품질관리원', '공공기관'],
    },
    {
      id: 'telecom-ito',
      title: '통신·미디어 ITO',
      englishTitle: 'Mission-Critical IT Outsourcing',
      icon: <Radio className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 border-amber-200/60',
      oneLineCopy: '일 트래픽 5,000만 뷰 미션 크리티컬 통신 포털 8개년 연속 무중단 운영',
      clients: ['KT 올레닷컴', 'KT 미디어 포털', '대용량 분산 ITO'],
    },
    {
      id: 'edutech',
      title: '스마트 교육 & 에듀테크',
      englishTitle: 'Next-Gen Smart Learning Platform',
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-200/60',
      oneLineCopy: '클라우드 기반 차세대 스마트 학습 플랫폼 및 AI 맞춤형 교육 시스템 개발',
      clients: ['동아출판', '두산에듀테크', '디지털 교육 플랫폼'],
    },
    {
      id: 'consulting',
      title: 'AI & 클라우드 컨설팅',
      englishTitle: 'AI Architecture & Cloud Transformation',
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 border-amber-200/60',
      oneLineCopy: '온프레미스 sLLM 도입, RAG 파이프라인 검증, 클라우드 네이티브 전환 컨설팅',
      clients: ['현대자동차', '엔터프라이즈 기업', '공공 DX 추진단'],
    },
  ];

  return (
    <section className="py-28 lg:py-36 bg-white border-t border-slate-200/80" aria-label="구비트 사업 영역">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-700">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>CORE BUSINESS SERVICES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#162846] tracking-tight leading-snug">
              전문 엔지니어링 서비스 영역
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-3xl mx-auto">
              공공 행정부터 대용량 통신망, 에듀테크, AI 컨설팅까지 검증된 엔지니어링 역량을 제공합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Clean Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              animation="fade-up"
              delay={idx * 120}
              duration={650}
              className="h-full"
            >
              <div
                className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 lg:p-11 hover:border-amber-400/80 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div className="space-y-6">
                  {/* Header: Icon & Titles */}
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${service.iconBg} border shadow-xs group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#162846] group-hover:text-blue-600 transition-colors tracking-tight">
                        {service.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-semibold text-slate-400">
                        {service.englishTitle}
                      </span>
                    </div>
                  </div>

                  {/* Minimal 1-line Copy */}
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    {service.oneLineCopy}
                  </p>

                  {/* Client Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.clients.map((cl, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-md bg-blue-50/80 text-blue-700 border border-blue-100"
                      >
                        {cl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom View More Button */}
                <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => onNavigate('services', service.id)}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-700 group-hover:text-amber-600 transition-colors"
                  >
                    <span>서비스 상세 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default ServiceSection;
