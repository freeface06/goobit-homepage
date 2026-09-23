/**
 * @intent Company introduction view with dedicated CI branding section (ci.png, logo.webp, brand color codes), CEO Message, History, Credentials, and Directions
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import {
  COMPANY_OVERVIEW,
  CEO_MESSAGE,
  COMPANY_HISTORY,
  CERTIFICATIONS,
  LOCATION_DIRECTIONS,
  LEGAL_INFO
} from '../../data/companyData';
import { NaverMapFixed } from '../common/NaverMapFixed';
import {
  Building2,
  Quote,
  History,
  Award,
  MapPin,
  CheckCircle2,
  Compass,
  FileCheck2,
  Calendar,
  Train,
  Bus,
  Car,
  Phone,
  Mail,
  Palette,
  Download
} from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface CompanyViewProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const CompanyView: React.FC<CompanyViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Page Header Banner */}
      <div className="bg-[#162846] text-white py-16 lg:py-20 border-b border-slate-700/60 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-amber-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>ABOUT GOOBIT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              회사소개 (About Us)
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              가치에 진심을 담아 고객의 지속가능한 비즈니스 혁신을 이끄는 엔터프라이즈 AI·DX 파트너, 주식회사 구비트를 소개합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-navigation Anchor Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 gap-6 text-sm font-semibold text-slate-600">
            <a href="#overview" className="hover:text-blue-700 whitespace-nowrap">기업 개요 및 비전</a>
            <a href="#ci" className="hover:text-blue-700 whitespace-nowrap">CI 소개</a>
            <a href="#ceo" className="hover:text-blue-700 whitespace-nowrap">CEO 인사말</a>
            <a href="#history" className="hover:text-blue-700 whitespace-nowrap">주요 연혁</a>
            <a href="#certifications" className="hover:text-blue-700 whitespace-nowrap">인증 및 특허</a>
            <a href="#location" className="hover:text-blue-700 whitespace-nowrap">찾아오시는 길</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* 1. Overview & Vision Section */}
        <section id="overview" className="scroll-mt-32 space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">VISION & MISSION</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              기업 개요 및 경영 비전
            </h2>
            <p className="text-slate-600 text-base max-w-3xl">
              구비트는 2015년 설립 이래 공공 정보화와 대용량 통신 시스템의 최전선에서 신뢰를 쌓아온 엔터프라이즈 전문 기업입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Vision Banner Card */}
            <div className="lg:col-span-7 rounded-3xl bg-[#162846] text-white p-8 sm:p-10 flex flex-col justify-between border border-slate-700 shadow-md">
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-900 border border-slate-700 text-amber-400">
                  <Compass className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-amber-400">구비트 핵심 슬로건</div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    "{COMPANY_OVERVIEW.slogan}"
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {COMPANY_OVERVIEW.subSlogan}
                </p>
              </div>

              <div className="pt-8 border-t border-slate-700 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">설립 연월</span>
                  <span className="text-base font-bold text-white">{COMPANY_OVERVIEW.establishedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">전문 인력</span>
                  <span className="text-base font-bold text-amber-400">{COMPANY_OVERVIEW.employeeCount}</span>
                </div>
              </div>
            </div>

            {/* Business Scope List */}
            <div className="lg:col-span-5 rounded-3xl bg-white p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  주요 사업 분야 (Core Business)
                </h4>
                <ul className="space-y-3">
                  {COMPANY_OVERVIEW.businessScope.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('contact', 'inquiry')}
                  className="w-full py-3 rounded-lg text-xs font-bold bg-[#162846] text-white hover:bg-slate-800 transition-colors"
                >
                  기업 소개서 및 사업 제안서 요청 &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CI (Corporate Identity) Section */}
        <section id="ci" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">CORPORATE IDENTITY</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              CI (Corporate Identity) 소개
            </h2>
            <p className="text-slate-600 text-base max-w-3xl">
              주식회사 구비트의 CI는 기술에 대한 진정성과 고객 신뢰, 그리고 엔터프라이즈 DX의 미래를 열어가는 혁신 에너지를 상징합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* CI Full Horizontal Mark */}
            <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">OFFICIAL LOGOTYPE</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    ci.png
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  구비트 공식 심볼 및 로고타입 (Full CI)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  딥 네이비의 신뢰감과 웜 골드/앰버의 혁신 에너지가 결합된 공식 시그니처 마크입니다.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center min-h-[160px]">
                <img
                  src="/images/logo/ci.png"
                  alt="주식회사 구비트 공식 로고"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span>표준 가로형 조합 (심볼 + 워드마크)</span>
                <span className="text-slate-400 font-medium">public/images/logo/ci.png</span>
              </div>
            </div>

            {/* CI Square Icon Mark */}
            <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SYMBOL ICON</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    logo.webp
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  구비트 아이콘 및 파비콘 마크 (Symbol Mark)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  모바일 앱, 파비콘, 소프트웨어 프로덕트 아이콘에 사용되는 구비트 정방형 심볼입니다.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center min-h-[160px]">
                <img
                  src="/images/logo/logo.webp"
                  alt="주식회사 구비트 정방형 심볼 아이콘"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl shadow-xs"
                />
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span>정방형 단독 심볼 (App Icon / Favicon)</span>
                <span className="text-slate-400 font-medium">public/images/logo/logo.webp</span>
              </div>
            </div>
          </div>

          {/* Official Brand Colors Palette */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Palette className="w-4 h-4 text-blue-600" />
              <span>구비트 브랜드 컬러 시스템 (Color Palette)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Goobit Navy */}
              <div className="rounded-xl border border-slate-200 overflow-hidden space-y-3 p-4 bg-slate-50">
                <div className="h-16 rounded-lg bg-[#162846] shadow-xs"></div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Goobit Navy</div>
                  <div className="text-xs text-blue-700 font-bold">#162846</div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    신뢰와 안정성, 미션 크리티컬 엔터프라이즈 기술의 깊이를 상징
                  </p>
                </div>
              </div>

              {/* Goobit Amber */}
              <div className="rounded-xl border border-slate-200 overflow-hidden space-y-3 p-4 bg-slate-50">
                <div className="h-16 rounded-lg bg-[#F5A623] shadow-xs"></div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Goobit Amber</div>
                  <div className="text-xs text-amber-600 font-bold">#F5A623</div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    사람 중심의 가치, 창의적인 AI 혁신과 성장 에너지를 상징
                  </p>
                </div>
              </div>

              {/* Goobit Blue */}
              <div className="rounded-xl border border-slate-200 overflow-hidden space-y-3 p-4 bg-slate-50">
                <div className="h-16 rounded-lg bg-[#2563EB] shadow-xs"></div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Goobit Blue</div>
                  <div className="text-xs text-blue-600 font-bold">#2563EB</div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    스마트 데이터 연계, 시스템의 연결성과 무결성을 표현
                  </p>
                </div>
              </div>

              {/* Enterprise Slate */}
              <div className="rounded-xl border border-slate-200 overflow-hidden space-y-3 p-4 bg-slate-50">
                <div className="h-16 rounded-lg bg-[#0F172A] shadow-xs"></div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Enterprise Slate</div>
                  <div className="text-xs text-slate-700 font-bold">#0F172A</div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    명확한 가독성과 정돈된 엔터프라이즈 표준 환경을 제공
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CEO Message Section */}
        <section id="ceo" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">LEADERSHIP</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              CEO 인사말
            </h2>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
            <div className="max-w-4xl space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                  <Quote className="w-8 h-8" />
                </div>
                <div>
                  <blockquote className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    "{CEO_MESSAGE.quote}"
                  </blockquote>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
                {CEO_MESSAGE.bodyParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-extrabold text-slate-900">
                    {CEO_MESSAGE.signName}
                  </div>
                  <div className="text-xs text-slate-500">
                    주식회사 구비트 대표이사
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Goobit Co., Ltd. Executive Office
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. History Timeline Section */}
        <section id="history" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">MILESTONES</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              주요 연혁 (History)
            </h2>
            <p className="text-slate-600 text-base">
              2015년 설립부터 현재까지, 기술 혁신과 고객 신뢰로 일궈온 구비트의 발자취입니다.
            </p>
          </div>

          <div className="space-y-6">
            {COMPANY_HISTORY.map((mile, mIdx) => (
              <div
                key={mIdx}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-colors"
              >
                <div className="md:col-span-3 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#162846] text-amber-400 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {mile.year}
                    </h3>
                    <span className="text-xs text-blue-700 font-semibold">도약 및 확장</span>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <ul className="space-y-2.5">
                    {mile.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Certifications & Patents Section */}
        <section id="certifications" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">CREDENTIALS</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              인증 및 소프트웨어 저작권 현황
            </h2>
            <p className="text-slate-600 text-base">
              한국저작권위원회 공식 등록 소프트웨어 및 국가 공인 기술 혁신 벤처기업 인증 현황입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {cert.title}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        발급처: {cert.issuer} ({cert.date})
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white shrink-0">
                    {cert.registrationNumber}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Location & Directions Section */}
        <section id="location" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">HEADQUARTERS</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              찾아오시는 길 (본사 위치)
            </h2>
            <p className="text-slate-600 text-base">
              서울 송파구 문정현대지식산업센터에 위치한 구비트 본사 오시는 길을 네이버 지도와 함께 상세히 안내해 드립니다.
            </p>
          </div>

          {/* Dedicated High-Fidelity Fixed Naver Map */}
          <NaverMapFixed />

          {/* Transit & Parking Detailed Guides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subway */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Train className="w-4 h-4 text-blue-600" />
                <span>지하철 이용 안내</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {LOCATION_DIRECTIONS.subway.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bus */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Bus className="w-4 h-4 text-emerald-600" />
                <span>버스 이용 안내</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {LOCATION_DIRECTIONS.bus.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Car & Parking */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Car className="w-4 h-4 text-indigo-600" />
                <span>자가용 및 주차 안내</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {LOCATION_DIRECTIONS.car.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyView;
