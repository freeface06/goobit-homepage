/**
 * @intent Enterprise footer redesigned with bright tone theme (bg-slate-50 / bg-white), official CI logo, trust badges, and 5-menu sitemap
 * @agent  manager-design
 * @branch feat/bright-footer
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';
import { LEGAL_INFO, NAVIGATION_MENUS } from '../../data/companyData';
import { ShieldCheck, Award, FileCheck2, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface FooterProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200" role="contentinfo">
      {/* Top Banner: Enterprise Trust & Certification Badges */}
      <div className="border-b border-slate-200/90 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">TBCMS 저작권 등록</div>
                <div className="text-[11px] text-slate-500">제C-2015-021021호</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">OPMS 저작권 등록</div>
                <div className="text-[11px] text-slate-500">제C-2018-005128호</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">벤처기업 확인 (혁신성장)</div>
                <div className="text-[11px] text-slate-500">중소벤처기업진흥공단</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Main-Biz 경영혁신형 중소기업</div>
                <div className="text-[11px] text-slate-500">중소벤처기업부 인증</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <img
                src="/images/logo/ci.png"
                alt="주식회사 구비트"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              가치에 진심을 담다. 공공·통신 10여 년의 미션 크리티컬 시스템 운영 노하우와 지식그래프 기반 최신 엔터프라이즈 AI 기술을 융합하는 AI·DX 전문 솔루션 기업입니다.
            </p>

            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{LEGAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>TEL: {LEGAL_INFO.tel} | FAX: {LEGAL_INFO.fax}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>E-mail: {LEGAL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Sitemap Links: 5 Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {NAVIGATION_MENUS.map((menu) => (
              <div key={menu.id} className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-wider">
                  <button
                    onClick={() => onNavigate(menu.id)}
                    className="hover:text-amber-600 transition-colors focus:outline-none flex items-center gap-1 group"
                  >
                    <span>{menu.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  </button>
                </h3>
                <ul className="space-y-2 text-xs text-slate-500">
                  {menu.subItems.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => onNavigate(menu.id, sub.anchor)}
                        className="hover:text-slate-900 transition-colors focus:outline-none hover:underline text-left"
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p>
              {LEGAL_INFO.companyName} | 대표이사: {LEGAL_INFO.ceoName} | 사업자등록번호: {LEGAL_INFO.businessRegistrationNumber}
            </p>
            <p>
              개인정보보호책임자: {LEGAL_INFO.privacyManager} | 통신판매업신고: 송파구청 제2015-서울송파-0982호
            </p>
            <p className="text-slate-600 font-medium">
              Copyright {LEGAL_INFO.copyrightYear} {LEGAL_INFO.companyName}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('contact', 'directions')}
              className="text-slate-500 hover:text-amber-600 transition-colors"
            >
              오시는 길
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
