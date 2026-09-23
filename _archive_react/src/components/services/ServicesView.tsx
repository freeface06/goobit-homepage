/**
 * @intent Services sub-view with engineering service domains, 4-phase methodology, and tech stack details
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { SERVICES_DATA, SERVICE_METHODOLOGY } from '../../data/servicesData';
import {
  Layers,
  Landmark,
  Radio,
  GraduationCap,
  Compass,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface ServicesViewProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'public-si':
        return <Landmark className="w-6 h-6 text-ai-cyan" />;
      case 'telecom-ito':
        return <Radio className="w-6 h-6 text-ai-blue" />;
      case 'edutech':
        return <GraduationCap className="w-6 h-6 text-indigo-400" />;
      case 'consulting':
        return <Compass className="w-6 h-6 text-emerald-400" />;
      default:
        return <Layers className="w-6 h-6 text-ai-cyan" />;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-surface-section">
      {/* Page Header Banner */}
      <div className="bg-navy-950 text-white py-16 lg:py-20 border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-850 border border-ai-cyan/30 text-xs font-bold text-ai-cyan">
              <Layers className="w-3.5 h-3.5" />
              <span>ENTERPRISE SERVICES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              전문 엔지니어링 서비스
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              전자정부 표준프레임워크 기반 공공 SI부터 24/365 대용량 통신 ITO, AI 컨설팅까지 검증된 방법론으로 프로젝트 성공을 보장합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-nav Anchor Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 gap-6 text-sm font-semibold text-gray-600">
            <a href="#methodology" className="hover:text-ai-blue whitespace-nowrap">구축 방법론 (Methodology)</a>
            <a href="#public-si" className="hover:text-ai-blue whitespace-nowrap">공공 정보화 SI</a>
            <a href="#telecom-ito" className="hover:text-ai-blue whitespace-nowrap">통신·미디어 ITO</a>
            <a href="#edutech" className="hover:text-ai-blue whitespace-nowrap">스마트 교육 & LMS</a>
            <a href="#consulting" className="hover:text-ai-blue whitespace-nowrap">AI·DX 컨설팅</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* 1. Methodology Section */}
        <section id="methodology" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-ai-blue uppercase tracking-wider">PROCESS & QUALITY GATES</span>
            <h2 className="text-3xl font-extrabold text-navy-900">
              구비트 엔터프라이즈 4단계 수행 방법론
            </h2>
            <p className="text-content-body text-base max-w-3xl">
              10년의 SI/ITO 프로젝트 수행 데이터와 CMMI/ISO 품질 체계를 기반으로 설계된 표준 구축 절차입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_METHODOLOGY.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-enterprise flex flex-col justify-between space-y-4 hover:border-ai-cyan transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-ai-cyan">
                      {step.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-ai-blue"></span>
                  </div>
                  <h3 className="text-base font-bold text-navy-900">
                    {step.phase}
                  </h3>
                  <p className="text-xs text-content-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-400">
                  품질 게이트 (TRUST 5 준수)
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Detailed Service Domains */}
        <div className="space-y-16">
          {SERVICES_DATA.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-32 p-8 sm:p-12 rounded-3xl bg-white border border-gray-200 shadow-enterprise space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-navy-950 text-white shrink-0">
                    {getDomainIcon(service.id)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-ai-blue uppercase tracking-wider">
                      {service.englishTitle}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                      {service.title}
                    </h2>
                    <p className="text-sm font-semibold text-gray-600">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('contact', 'inquiry')}
                  className="px-6 py-3 rounded-lg text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors shrink-0 flex items-center gap-2"
                >
                  <span>해당 분야 사업 제안 요청</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-content-body leading-relaxed">
                {service.fullDesc}
              </p>

              {/* Competencies */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  핵심 수행 역량
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.coreCompetencies.map((comp, cIdx) => (
                    <div key={cIdx} className="p-3.5 rounded-xl bg-surface-card border border-surface-border flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-ai-cyan shrink-0 mt-0.5" />
                      <span className="text-xs text-navy-800 font-medium leading-relaxed">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Clients & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
                <div className="space-y-2">
                  <span className="font-bold text-navy-900 block">주요 실적 기관 및 고객사</span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.majorClients.map((client, clIdx) => (
                      <span key={clIdx} className="px-2.5 py-1 rounded-md bg-blue-50 text-ai-blue border border-blue-200 font-semibold">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-navy-900 block">사용 기술 스택</span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
};
