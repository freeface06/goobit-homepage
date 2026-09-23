/**
 * @intent Contact Us sub-view with interactive validated inquiry form, support desk, location, and FAQ accordion
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState } from 'react';
import { LEGAL_INFO, LOCATION_DIRECTIONS } from '../../data/companyData';
import { NaverMapFixed } from '../common/NaverMapFixed';
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Train,
  Bus,
  AlertCircle
} from 'lucide-react';
import { InquiryFormData, NavigationMenuId } from '../../types';

interface ContactViewProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceCategory: 'Goobit AI Suite 도입',
    budgetRange: '미정 (견적 상담 필요)',
    projectPeriod: '3개월 이내 착수',
    message: '',
    privacyAgreed: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Form validation
    if (!formData.companyName.trim()) {
      setValidationError('회사명 또는 기관명을 입력해 주세요.');
      return;
    }
    if (!formData.contactPerson.trim()) {
      setValidationError('담당자 성함을 입력해 주세요.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('유효한 이메일 주소를 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('연락 가능한 전화번호를 입력해 주세요.');
      return;
    }
    if (!formData.message.trim()) {
      setValidationError('문의 및 요구사항 내용을 입력해 주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      setValidationError('개인정보 수집 및 이용 동의에 체크해 주세요.');
      return;
    }

    // Success simulation
    setFormSubmitted(true);
  };



  return (
    <div className="pt-24 pb-20 bg-surface-section">
      {/* Page Header Banner */}
      <div className="bg-navy-950 text-white py-16 lg:py-20 border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-850 border border-ai-cyan/30 text-xs font-bold text-ai-cyan">
              <Mail className="w-3.5 h-3.5" />
              <span>CONTACT & SUPPORT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              도입 문의 및 고객 지원
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              엔터프라이즈 AI 솔루션 도입, 시스템 구축 견적, 유지보수 기술 지원 등 구비트 전문 컨설턴트가 신속히 답변해 드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-nav Anchor Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 gap-6 text-sm font-semibold text-gray-600">
            <a href="#inquiry" className="hover:text-ai-blue whitespace-nowrap">1:1 도입 문의 양식</a>
            <a href="#support" className="hover:text-ai-blue whitespace-nowrap">기술 지원 데스크</a>
            <a href="#directions" className="hover:text-ai-blue whitespace-nowrap">본사 오시는 길</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* 1. Interactive Inquiry Form Section */}
        <section id="inquiry" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-ai-blue uppercase tracking-wider">PROJECT INQUIRY</span>
            <h2 className="text-3xl font-extrabold text-navy-900">
              1:1 맞춤 견적 및 프로젝트 제안 문의
            </h2>
            <p className="text-content-body text-base max-w-3xl">
              요구하시는 프로젝트 범위와 솔루션을 선택해 주시면, 전담 엔지니어가 24시간 이내에 1차 기술 검토 후 연락드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-8 rounded-3xl bg-white p-8 sm:p-10 border border-gray-200 shadow-enterprise">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900">
                    문의가 성공적으로 접수되었습니다.
                  </h3>
                  <p className="text-sm text-content-body max-w-md mx-auto leading-relaxed">
                    입력해 주신 연락처(<span className="font-semibold text-navy-900">{formData.email}</span>)로 접수 확인 안내를 발송해 드렸습니다. 영업일 기준 24시간 이내에 담당자가 연락드리겠습니다.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          companyName: '',
                          contactPerson: '',
                          email: '',
                          phone: '',
                          serviceCategory: 'Goobit AI Suite 도입',
                          budgetRange: '미정 (견적 상담 필요)',
                          projectPeriod: '3개월 이내 착수',
                          message: '',
                          privacyAgreed: false,
                        });
                      }}
                      className="px-6 py-2.5 rounded-lg text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                    >
                      추가 문의 작성하기
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {validationError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs font-bold">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="companyName" className="text-xs font-bold text-navy-900">
                        회사명 / 기관명 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        placeholder="예: (주)한국기업 또는 OO청"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contactPerson" className="text-xs font-bold text-navy-900">
                        담당자명 및 직급 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contactPerson"
                        type="text"
                        placeholder="예: 홍길동 팀장"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-navy-900">
                        업무용 이메일 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@company.co.kr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-navy-900">
                        연락처 / 직통전화 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="010-0000-0000 또는 02-000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="serviceCategory" className="text-xs font-bold text-navy-900">
                        문의 솔루션 / 서비스 분야
                      </label>
                      <select
                        id="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      >
                        <option value="Goobit AI Suite 도입">Goobit AI Suite (지식그래프/RAG)</option>
                        <option value="TBCMS 구축">TBCMS (콘텐츠/포털 관리)</option>
                        <option value="OPMS 도입">OPMS (스마트 공연 ERP)</option>
                        <option value="공공 정보화 SI">공공 정보화 SI 구축</option>
                        <option value="통신·미디어 ITO">통신·미디어 ITO 운영</option>
                        <option value="스마트 교육 LMS">스마트 교육 & LMS</option>
                        <option value="기타 컨설팅">AI·DX 기술 컨설팅</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budgetRange" className="text-xs font-bold text-navy-900">
                        예상 예산 범위
                      </label>
                      <select
                        id="budgetRange"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      >
                        <option value="미정 (견적 상담 필요)">미정 (견적 상담 필요)</option>
                        <option value="5천만 원 미만">5천만 원 미만</option>
                        <option value="5천만 ~ 1억 원">5천만 ~ 1억 원</option>
                        <option value="1억 ~ 3억 원">1억 ~ 3억 원</option>
                        <option value="3억 원 이상">3억 원 이상 대규모 프로젝트</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="projectPeriod" className="text-xs font-bold text-navy-900">
                        희망 착수 시기
                      </label>
                      <select
                        id="projectPeriod"
                        value={formData.projectPeriod}
                        onChange={(e) => setFormData({ ...formData, projectPeriod: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                      >
                        <option value="즉시 착수 가능">즉시 착수 가능</option>
                        <option value="1개월 이내">1개월 이내</option>
                        <option value="3개월 이내 착수">3개월 이내 착수</option>
                        <option value="차기 년도 예산 편성">차기 년도 예산 편성</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-navy-900">
                      문의 및 요구사항 상세 내용 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="구축하고자 하는 시스템의 목적, 현재 보유 데이터 형태(HWP, PDF, DB), 특별 요구사항(망분리 여부 등)을 자유롭게 기재해 주세요."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ai-cyan focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Privacy Agreement */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                    <input
                      id="privacyAgreed"
                      type="checkbox"
                      checked={formData.privacyAgreed}
                      onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-ai-blue focus:ring-ai-cyan"
                    />
                    <label htmlFor="privacyAgreed" className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-bold text-navy-900">[필수] 개인정보 수집 및 이용 동의</span>
                      <br />
                      수집 항목: 회사명, 성명, 이메일, 전화번호 | 수집 목적: 프로젝트 견적 상담 및 기술 제안서 발송 | 보유 기간: 상담 완료 후 1년 또는 요청 시 즉시 파기.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-slate-900" />
                    <span>프로젝트 도입 및 견적 문의 발송</span>
                  </button>
                </form>
              )}
            </div>

            {/* Support Desk Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-navy-950 text-white border border-navy-800 shadow-enterprise space-y-6">
                <div className="space-y-1 border-b border-navy-800 pb-4">
                  <span className="text-xs font-bold text-ai-cyan uppercase tracking-wider">
                    FAST CONTACT
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    유선 상담 및 긴급 핫라인
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <div className="text-gray-400">대표전화</div>
                    <a href={`tel:${LEGAL_INFO.tel}`} className="text-xl font-extrabold text-white hover:text-ai-cyan transition-colors block">
                      {LEGAL_INFO.tel}
                    </a>
                    <div className="text-gray-400">평일 09:00 - 18:00 (공휴일 제외)</div>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-navy-800">
                    <div className="text-gray-400">기술 지원 이메일</div>
                    <a href={`mailto:${LEGAL_INFO.email}`} className="text-sm font-bold text-ai-cyan hover:underline">
                      {LEGAL_INFO.email}
                    </a>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-navy-800">
                    <div className="text-gray-400">팩스 번호</div>
                    <div className="text-xs text-gray-200">{LEGAL_INFO.fax}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>24/365 유지보수 관제</span>
                  </div>
                  <p className="text-gray-400">
                    계약 고객사 전용 비상 긴급대응 체계가 24시간 가동 중입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Office Directions Section */}
        <section id="directions" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-ai-blue uppercase tracking-wider">LOCATION & DIRECTIONS</span>
            <h2 className="text-3xl font-extrabold text-navy-900">
              오시는 길 안내
            </h2>
            <p className="text-content-body text-base">
              주식회사 구비트 서울 본사 방문을 환영합니다. 네이버 지도로 최적의 경로를 확인하세요.
            </p>
          </div>

          {/* Dedicated High-Fidelity Fixed Naver Map */}
          <NaverMapFixed />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <MapPin className="w-5 h-5 text-ai-blue" />
                <span>본사 주소</span>
              </div>
              <p className="text-xs text-content-body leading-relaxed">
                {LOCATION_DIRECTIONS.address}
              </p>
              <div className="text-[11px] text-gray-400 font-medium">
                문정현대지식산업센터 C동 408호
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <Train className="w-5 h-5 text-ai-cyan" />
                <span>지하철</span>
              </div>
              <p className="text-xs text-content-body leading-relaxed">
                8호선 문정역 3·4번 출구 도보 5분 (문정 컬처밸리 지하연결통로 이용 가능)
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span>방문 및 주차 안내</span>
              </div>
              <p className="text-xs text-content-body leading-relaxed">
                지하 1~4층 자주식 주차장 완비 (방문 차량 1시간 무료 주차권 제공)
              </p>
            </div>
          </div>
        </section>



      </div>
    </div>
  );
};
