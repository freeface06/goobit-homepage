/**
 * @intent Enterprise GNB Header with full-width mega menu drawer on hover (Hancom-style featured card + 3-column subitems)
 * @agent  manager-design
 * @branch feat/fullwidth-megamenu
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Building2, Layers, Cpu, Mail, Sparkles, PhoneCall, Newspaper } from 'lucide-react';
import { NAVIGATION_MENUS } from '../../data/companyData';
import { NavigationMenuId } from '../../types';

interface HeaderProps {
  currentView: 'home' | NavigationMenuId;
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

interface MegaMenuContent {
  featuredCard: {
    image: string;
    badge: string;
    title: string;
    description: string;
    targetView: NavigationMenuId;
    targetAnchor?: string;
  };
  columns: {
    title: string;
    items: {
      id: string;
      label: string;
      description: string;
      badge?: string;
      anchor?: string;
    }[];
  }[];
}

const MEGA_MENU_DATA: Record<NavigationMenuId, MegaMenuContent> = {
  company: {
    featuredCard: {
      image: '/images/goobit_ai_dashboard.jpg',
      badge: 'ABOUT GOOBIT',
      title: '가치에 진심을 담는 기업',
      description: '공공·통신 10여 년의 미션 크리티컬 시스템 운영 노하우와 지속가능한 DX 파트너십',
      targetView: 'company',
      targetAnchor: 'overview',
    },
    columns: [
      {
        title: '기업 개요',
        items: [
          { id: 'overview', label: '기업 개요 및 비전', description: '가치에 진심을 담는 기술 중심 기업', anchor: 'overview' },
          { id: 'ceo', label: 'CEO 인사말', description: '고객 성공과 지속가능한 DX 파트너십', anchor: 'ceo' },
          { id: 'history', label: '주요 연혁', description: '2015년부터 축적된 기술 혁신의 궤적', anchor: 'history' },
        ],
      },
      {
        title: '신뢰 & 인증',
        items: [
          { id: 'certifications', label: '인증 및 특허', description: '소프트웨어 저작권 및 벤처기업 인증', badge: 'GS/특허', anchor: 'certifications' },
          { id: 'mainbiz', label: '경영혁신형 기업', description: '중소벤처기업부 Main-Biz 인증', anchor: 'certifications' },
        ],
      },
      {
        title: '찾아오시는 길',
        items: [
          { id: 'location', label: '문정 본사 안내', description: '현대지식산업센터 C동 408호', anchor: 'location' },
          { id: 'directions', label: '대중교통 및 주차', description: '8호선 문정역 4번 출구 도보 5분', anchor: 'location' },
        ],
      },
    ],
  },
  products: {
    featuredCard: {
      image: '/images/goobit_ai_dashboard.jpg',
      badge: 'FLAGSHIP AI SUITE',
      title: 'Goobit AI Suite',
      description: '지식그래프 & 하이브리드 RAG로 완성하는 엔터프라이즈 자율형 인공지능 플랫폼',
      targetView: 'products',
      targetAnchor: 'ai-suite',
    },
    columns: [
      {
        title: '차세대 AI 솔루션',
        items: [
          { id: 'ai-suite', label: 'Goobit AI Suite', description: '지식그래프 & RAG 기반 엔터프라이즈 AI', badge: 'NEW', anchor: 'ai-suite' },
          { id: 'ai-rag', label: '하이브리드 RAG 엔진', description: '0.1% 미만 환각률의 심층 추론 기술', anchor: 'ai-suite' },
          { id: 'ai-agent', label: '자율 AI 에이전트', description: '업무 파이프라인 자동화 워크플로우', anchor: 'ai-suite' },
        ],
      },
      {
        title: '공공 & 웹 CMS',
        items: [
          { id: 'tbcms', label: 'TBCMS 3.0', description: '통합 콘텐츠 및 전자정부 반응형 CMS', badge: 'GS 1등급', anchor: 'tbcms' },
          { id: 'kwcag', label: '웹 접근성 엔진', description: 'KWCAG 2.2 표준 인증 준수 컴포넌트', anchor: 'tbcms' },
        ],
      },
      {
        title: '특화 운영 플랫폼',
        items: [
          { id: 'opms', label: 'OPMS 2.0', description: '공연 단체 및 오케스트라 통합 관리', badge: '특허등록', anchor: 'opms' },
          { id: 'symphony', label: '서울시향 구축 사례', description: '공연 일정·단원·악보 자산 단일화', anchor: 'opms' },
        ],
      },
    ],
  },
  services: {
    featuredCard: {
      image: '/images/goobit_ai_agent_flow.jpg',
      badge: 'ENTERPRISE DX',
      title: '공공·통신 대규모 SI & ITO',
      description: '24/365 무중단 고신뢰 아키텍처와 엔터프라이즈 최적화 DX 컨설팅',
      targetView: 'services',
      targetAnchor: 'public-si',
    },
    columns: [
      {
        title: '공공 정보화 SI',
        items: [
          { id: 'public-si', label: '공공 시스템 구축', description: '전자정부 표준프레임워크 기반 대규모 SI', anchor: 'public-si' },
          { id: 'public-infra', label: '행정·대국민 포털', description: '안정적인 다중 분산 아키텍처 설계', anchor: 'public-si' },
        ],
      },
      {
        title: '통신·미디어 ITO',
        items: [
          { id: 'telecom-ito', label: '통신 플랫폼 운영', description: 'KT 대용량 플랫폼 24/365 고신뢰 운영', anchor: 'telecom-ito' },
          { id: 'traffic-mgmt', label: '대용량 트래픽 관제', description: '무장애 무중단 서비스 레벨 보장', anchor: 'telecom-ito' },
        ],
      },
      {
        title: '에듀테크 & DX 컨설팅',
        items: [
          { id: 'edutech', label: '스마트 교육 및 LMS', description: 'EBS 등 차세대 에듀테크 플랫폼 아키텍처', anchor: 'edutech' },
          { id: 'consulting', label: 'AI·DX 로드맵 수립', description: '기업 맞춤형 인공지능 전환 및 인프라 설계', anchor: 'consulting' },
        ],
      },
    ],
  },
  news: {
    featuredCard: {
      image: '/images/goobit_video_poster.jpg',
      badge: 'GOOBIT NEWSROOM',
      title: '구비트 최신 카드뉴스',
      description: '국책 연구과제 주관기관 선정 및 신제품 릴리즈, 사내 혁신 스토리를 카드뉴스로 확인하세요',
      targetView: 'news',
      targetAnchor: 'all',
    },
    columns: [
      {
        title: '보도자료',
        items: [
          { id: 'press', label: '보도자료 전체', description: '언론 속 구비트와 주요 사업 성과 발표', anchor: 'press' },
          { id: 'rag-grant', label: 'RAG 국책과제 선정', description: 'AI 지식그래프 하이브리드 RAG 주관', badge: '주요성과', anchor: 'press' },
        ],
      },
      {
        title: '기술·DX 스토리',
        items: [
          { id: 'tech', label: '기술 아티클', description: '지식그래프 & RAG 아키텍처 심층 해부', anchor: 'tech' },
          { id: 'cms-release', label: 'TBCMS 3.0 개발기', description: 'KWCAG 2.2 웹 접근성 준수 기술', anchor: 'tech' },
        ],
      },
      {
        title: '사내 소식 & 컬처',
        items: [
          { id: 'culture', label: '피플 & 사내소식', description: '문정 신사옥 확장 이전 및 연구소 신설', anchor: 'culture' },
          { id: 'hackathon', label: '사내 해커톤 현장', description: 'AI 에이전트로 업무 생산성 극대화', anchor: 'culture' },
        ],
      },
    ],
  },
  contact: {
    featuredCard: {
      image: '/images/goobit_ai_dashboard.jpg',
      badge: 'PROJECT INQUIRY',
      title: '맞춤형 기술 도입 상담',
      description: '24시간 이내 전문 엔지니어가 비즈니스 요구사항에 맞춘 최적의 아키텍처와 솔루션을 제안합니다',
      targetView: 'contact',
      targetAnchor: 'inquiry',
    },
    columns: [
      {
        title: '프로젝트 상담',
        items: [
          { id: 'inquiry', label: '프로젝트 도입 문의', description: '요구사항 분석 및 무상 견적 제안', anchor: 'inquiry' },
          { id: 'poc', label: 'AI PoC 검증 신청', description: '기업 데이터 기반 지식그래프 사전 실증', anchor: 'inquiry' },
        ],
      },
      {
        title: '고객 지원 데스크',
        items: [
          { id: 'support', label: '기술 지원 데스크', description: '운영 중인 고객사 시스템 전담 지원', anchor: 'support' },
          { id: 'hotline', label: '긴급 유지보수 핫라인', description: '24시간 기술 지원 및 장애 대응 안내', anchor: 'support' },
        ],
      },
      {
        title: '본사 방문 안내',
        items: [
          { id: 'directions', label: '오시는 길 안내', description: '문정 현대지식산업센터 C동 408호', anchor: 'directions' },
          { id: 'parking', label: '주차 및 방문 예약', description: '방문객 2시간 무료 주차 지원', anchor: 'directions' },
        ],
      },
    ],
  },
};

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<NavigationMenuId | null>(null);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getMenuIcon = (id: NavigationMenuId) => {
    switch (id) {
      case 'company':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'products':
        return <Cpu className="w-4 h-4 text-amber-500" />;
      case 'services':
        return <Layers className="w-4 h-4 text-blue-600" />;
      case 'news':
        return <Newspaper className="w-4 h-4 text-emerald-600" />;
      case 'contact':
        return <Mail className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  const currentMegaData = activeDropdown ? MEGA_MENU_DATA[activeDropdown] : null;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs text-slate-800 transition-all duration-200"
      role="banner"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Official CI Logo */}
          <button
            onClick={() => {
              onNavigate('home');
              setActiveDropdown(null);
            }}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg group"
            aria-label="주식회사 구비트 홈으로 이동"
          >
            <img
              src="/images/logo/ci.png"
              alt="주식회사 구비트"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </button>

          {/* Desktop GNB Navigation */}
          <nav className="hidden lg:flex items-center h-full" role="navigation" aria-label="메인 메뉴">
            {NAVIGATION_MENUS.map((menu) => {
              const isActive = currentView === menu.id;
              const isDropdownOpen = activeDropdown === menu.id;

              return (
                <div
                  key={menu.id}
                  className="relative h-full flex items-center px-1"
                  onMouseEnter={() => setActiveDropdown(menu.id)}
                >
                  <button
                    onClick={() => {
                      onNavigate(menu.id);
                      setActiveDropdown(null);
                    }}
                    onFocus={() => setActiveDropdown(menu.id)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className={`relative h-full px-4 text-sm font-semibold flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      isActive || isDropdownOpen
                        ? 'text-slate-900 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-amber-500' : 'text-slate-400'
                      }`}
                    />

                    {/* Hancom-style Brand Amber Bottom Underline Indicator */}
                    {(isDropdownOpen || isActive) && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-amber-500 rounded-full transition-all duration-200" />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Action: Goobit Amber CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate('contact', 'inquiry');
                setActiveDropdown(null);
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2.5 shrink-0 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
            >
              <span>도입 문의하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('contact', 'inquiry')}
              className="px-3 py-1.5 text-xs font-bold rounded-md bg-amber-500 text-slate-900"
            >
              문의
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '전체 메뉴 열기'}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width Mega Menu Dropdown (Hancom-Style White Drawer) */}
      {activeDropdown && currentMegaData && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 w-full bg-white border-b border-slate-200/90 shadow-2xl transition-all duration-200 z-50 animate-fadeIn"
          role="menu"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 lg:py-9">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Hancom-style Featured Visual Card */}
              <div className="col-span-4 pr-6 border-r border-slate-100">
                <div
                  onClick={() => {
                    onNavigate(currentMegaData.featuredCard.targetView, currentMegaData.featuredCard.targetAnchor);
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-amber-400/80 p-5 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full"
                >
                  {/* Card Visual with Image */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900">
                    <img
                      src={currentMegaData.featuredCard.image}
                      alt={currentMegaData.featuredCard.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-900 shadow-xs">
                        {currentMegaData.featuredCard.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Bottom Orange Circle Arrow Button (Exact Hancom Match) */}
                  <div className="flex items-end justify-between gap-4 mt-auto pt-2">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {currentMegaData.featuredCard.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                        {currentMegaData.featuredCard.description}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 group-hover:translate-x-1 group-hover:bg-amber-600 transition-all shadow-xs">
                      <ArrowRight className="w-4 h-4 text-slate-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Columns: 3 Categorized Submenu Columns */}
              <div className="col-span-8 pl-2 grid grid-cols-3 gap-6 lg:gap-8">
                {currentMegaData.columns.map((col, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <span>{col.title}</span>
                    </h4>
                    
                    <div className="space-y-1.5">
                      {col.items.map((item) => (
                        <button
                          key={item.id}
                          role="menuitem"
                          onClick={() => {
                            onNavigate(activeDropdown, item.anchor);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition-colors group flex items-start gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Subtle Backdrop Blur Overlay below header when mega menu is open */}
      {activeDropdown && (
        <div
          className="hidden lg:block fixed inset-x-0 bottom-0 top-[65px] bg-slate-900/15 backdrop-blur-xs z-40 pointer-events-none transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[58px] bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-58px)] overflow-y-auto p-4 transition-all text-slate-800">
          <div className="space-y-4">
            {NAVIGATION_MENUS.map((menu) => (
              <div key={menu.id} className="border-b border-slate-100 pb-3">
                <button
                  onClick={() => {
                    onNavigate(menu.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-left py-2 font-bold text-slate-900 text-base hover:text-blue-600"
                >
                  <div className="flex items-center gap-2">
                    {getMenuIcon(menu.id)}
                    <span>{menu.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
                <div className="pl-6 space-y-1.5 mt-1">
                  {menu.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onNavigate(menu.id, sub.anchor);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-1 text-sm text-slate-600 hover:text-slate-900 flex items-center justify-between"
                    >
                      <span>{sub.label}</span>
                      {sub.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                          {sub.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('contact', 'inquiry');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center font-bold text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg shadow-sm"
              >
                무료 기술 컨설팅 및 도입 문의
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 py-1">
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span>대표전화: 02-517-5520 (평일 09:00 - 18:00)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
