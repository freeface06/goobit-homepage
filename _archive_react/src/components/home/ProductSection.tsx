/**
 * @intent Streamlined 3 clean white cards for Goobit AI Suite, TBCMS, and OPMS with ScrollReveal and shimmer effects
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { Cpu, LayoutTemplate, Music, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { NavigationMenuId } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

interface ProductSectionProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ onNavigate }) => {
  const products = [
    {
      id: 'ai-suite',
      name: 'Goobit AI Suite',
      badge: '신규 출시',
      badgeGlow: 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-400/20',
      category: 'ENTERPRISE AI PLATFORM',
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 border-amber-200/60',
      definition: '지식그래프 및 하이브리드 RAG 기반 엔터프라이즈 업무 혁신 AI 솔루션',
      tags: ['#온프레미스', '#지식그래프', '#전자정부4.x'],
      proof: '공공 행정 · 대용량 ITO 최적화',
    },
    {
      id: 'tbcms',
      name: 'TBCMS v3.5',
      badge: 'GS 1등급',
      badgeGlow: 'bg-blue-50 text-blue-700 border-blue-200/70',
      category: 'CONTENTS MANAGEMENT',
      icon: <LayoutTemplate className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-200/60',
      definition: '공공 대국민 서비스 및 대용량 포털 전용 고성능 콘텐츠 관리 솔루션',
      tags: ['#GS인증 1등급', '#국정원 보안검증', '#대용량 트래픽'],
      proof: '저작권 등록 제C-2015-021021호',
    },
    {
      id: 'opms',
      name: 'OPMS v2.0',
      badge: '저작권 등록',
      badgeGlow: 'bg-amber-50 text-amber-700 border-amber-200/70',
      category: 'ORCHESTRA PROGRAM',
      icon: <Music className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 border-amber-200/60',
      definition: '문화예술 기관 및 오케스트라 전용 디지털 악보 자산화 및 통합 운영 솔루션',
      tags: ['#디지털 악보', '#서울시향 구축', '#저작권 관리'],
      proof: '저작권 등록 제C-2018-005128호',
    },
  ];

  return (
    <section className="py-28 lg:py-36 bg-[#F8FAFC] border-t border-slate-200/80" aria-label="구비트 주요 제품 라인업">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-extrabold text-blue-700 shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>PROVEN SOFTWARE SOLUTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#162846] tracking-tight leading-snug">
              검증된 독자 솔루션 및 제품 라인업
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-3xl mx-auto">
              10년의 공공·문화 엔터프라이즈 실전 노하우가 집약된 소프트웨어 제품군을 만나보세요.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Clean White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, idx) => (
            <ScrollReveal
              key={product.id}
              animation="fade-up"
              delay={idx * 150}
              duration={700}
              className="h-full"
            >
              <div
                className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 lg:p-11 flex flex-col justify-between hover:border-amber-400 hover:shadow-card-hover hover:-translate-y-2.5 transition-all duration-300 group shimmer-card h-full"
              >
                <div className="space-y-6">
                  {/* Header: Icon, Category & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-4 rounded-2xl ${product.iconBg} border shadow-xs group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300`}>
                      {product.icon}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${product.badgeGlow}`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Product Name & 1-line Definition */}
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                      {product.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#162846] group-hover:text-blue-600 transition-colors tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                      {product.definition}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Legal Proof & Action */}
                <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {product.proof}
                  </span>

                  <button
                    onClick={() => onNavigate('products', product.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs group-hover:bg-blue-600"
                  >
                    <span>자세히 보기</span>
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

export default ProductSection;
