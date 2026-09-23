/**
 * @intent Enterprise AI 3-stage architecture walkthrough with clean Korean B2B enterprise styling and realistic workflow diagrams
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Network,
  Layers,
  Bot,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
  Database,
  GitBranch,
  ChevronRight,
  ChevronLeft,
  FileText,
  SlidersHorizontal,
  Server
} from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface ScrollInteractiveAiProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

interface AiStage {
  id: string;
  stepNumber: string;
  stageName: string;
  title: string;
  subtitle: string;
  description: string;
  categoryBadge: string;
  highlightTag: string;
  icon: React.ComponentType<{ className?: string }>;
  keyCapabilities: string[];
  metrics: { label: string; value: string; note: string }[];
  technicalSpecs: { title: string; detail: string }[];
  diagramSteps: { step: string; desc: string }[];
}

const AI_STAGES: AiStage[] = [
  {
    id: 'stage-knowledge-graph',
    stepNumber: '01',
    stageName: '지식그래프 구축',
    title: '비정형 행정 문서의 온톨로지 지식자산화',
    subtitle: '문서 간 의미 관계를 그래프 노드로 자동 변환',
    description:
      '공공 행정 지침, 표준 규정집, 표준 프레임워크 문서 등 방대한 비정형 HWP/PDF 문서를 파싱하여 핵심 개체(Entity)와 상호 관계(Relationship)를 인과관계 그래프 노드로 자동 모델링합니다.',
    categoryBadge: 'KNOWLEDGE GRAPH',
    highlightTag: '1,420개 이상 노드 실시간 탐색',
    icon: Network,
    keyCapabilities: [
      '공공 표준 HWP 및 PDF 비정형 문서 고정밀 파싱',
      '문서 조항 간 상호 참조 및 인과 관계 온톨로지 생성',
      '엔터프라이즈 그래프 DBMS 기반 대규모 엔티티 매핑',
      '부서 및 직급별 세분화된 보안 접근 통제(RBAC)'
    ],
    metrics: [
      { label: '데이터 구조화율', value: '99.4%', note: '한국어 표준 문서 기준' },
      { label: '관계 추론 속도', value: '0.08초', note: '실시간 인덱싱' },
      { label: '파서 호환성', value: '100%', note: 'HWP / PDF / DB' }
    ],
    technicalSpecs: [
      { title: 'Graph Engine', detail: 'Neo4j Enterprise Cluster' },
      { title: '추출 알고리즘', detail: 'Bi-Encoder Named Entity Graph' }
    ],
    diagramSteps: [
      { step: '01. 문서 수집', desc: '공공 표준 HWP, PDF, 업무 DB 연계' },
      { step: '02. 개체 추출', desc: '문맥 단위 고유명사 및 법령 조항 식별' },
      { step: '03. 관계 매핑', desc: '의미론적 인과관계 온톨로지 노드 생성' },
      { step: '04. 자산 색인', desc: '지식그래프 그래프 탐색 인덱스 구축' }
    ]
  },
  {
    id: 'stage-hybrid-rag',
    stepNumber: '02',
    stageName: '하이브리드 RAG & 심층 추론',
    title: '밀집 벡터 검색과 지식 탐색의 하이브리드 결합',
    subtitle: '환각(Hallucination) 0.2% 미만의 무결점 검증 엔진',
    description:
      '단순 문맥 유사도 매칭에 그치는 일반 벡터 검색의 한계를 극복하기 위해, 지식그래프 탐색(Graph Traversal)과 밀집 벡터 Re-ranking을 결합하여 맥락을 놓치지 않는 정밀한 Ground Truth를 인용합니다.',
    categoryBadge: 'HYBRID RAG & REASONING',
    highlightTag: '환각 억제율 99.8% 달성',
    icon: Layers,
    keyCapabilities: [
      '밀집 임베딩 벡터와 지식그래프 경로 동시 교차 탐색',
      '질문 맥락 기반 다단계 Re-Ranking 및 노이즈 필터링',
      '답변 원문 근거(Ground Truth) 페이지/문단 단위 100% 인용',
      '망분리 폐쇄망 온프레미스 sLLM (Llama 3 / EXAONE) 최적화'
    ],
    metrics: [
      { label: '환각 억제율', value: '99.8%', note: '국정원 보안성 검증' },
      { label: '원문 근거 인용률', value: '100%', note: 'Ground Truth 매핑' },
      { label: '추론 지연시간', value: '< 0.38초', note: '초고속 하이브리드 쿼리' }
    ],
    technicalSpecs: [
      { title: 'Vector Store', detail: 'pgvector / Milvus Engine' },
      { title: 'Re-ranker', detail: 'Cross-Encoder Multi-hop Scoring' }
    ],
    diagramSteps: [
      { step: '01. 자연어 질의', desc: '실무자 일상 언어로 업무 질문 입력' },
      { step: '02. 교차 탐색', desc: '벡터 유사도 + 그래프 경로 동시 탐색' },
      { step: '03. 재순위화', desc: 'Re-Ranking 모델을 통한 핵심 근거 선별' },
      { step: '04. 검증 답변', desc: '출처 페이지 표기 무결점 리포트 생성' }
    ]
  },
  {
    id: 'stage-autonomous-agent',
    stepNumber: '03',
    stageName: '자율 에이전트 업무 자동화',
    title: '다중 전문 에이전트 기반 전주기 행정 업무 수행',
    subtitle: '보고서 자동 조판부터 시스템 장애 모니터링까지',
    description:
      '단순 챗봇의 단답형 질의응답을 넘어 기획, 검토, 결재, 모니터링을 담당하는 전문 AI 에이전트들이 협력 파이프라인을 구성하여 엔터프라이즈의 복합 업무를 스스로 분석하고 실행합니다.',
    categoryBadge: 'AUTONOMOUS WORKFLOW',
    highlightTag: '행정 실무 공수 75% 절감',
    icon: Bot,
    keyCapabilities: [
      '한글(HWP) 행정 양식 준수 기획서 및 보고서 자동 조판',
      '국가정보원 및 전자정부 표준 규격 기반 보안 검토 자동화',
      '통신/공공 미션 크리티컬 대용량 트래픽 이상 징후 실시간 감지',
      '다중 에이전트(Planner, Researcher, Reviewer) 협업 파이프라인'
    ],
    metrics: [
      { label: '실무 공수 절감', value: '75%', note: '문서 작성 및 대조 공수' },
      { label: '데이터 외부 유출', value: '0%', note: '완전 온프레미스 사내망' },
      { label: '보안 기준 충족', value: '100%', note: '전자정부 프레임워크 4.x' }
    ],
    technicalSpecs: [
      { title: 'Agent Framework', detail: 'LangGraph Multi-Agent Core' },
      { title: '배포 환경', detail: 'Air-gapped On-Premises' }
    ],
    diagramSteps: [
      { step: '01. 작업 분해', desc: 'Planner 에이전트의 세부 작업 플랜 수립' },
      { step: '02. 자료 분석', desc: 'Researcher 에이전트의 근거 데이터 취합' },
      { step: '03. 초안 조판', desc: '공공 표준 양식 규격에 맞춘 보고서 작성' },
      { step: '04. 보안 검토', desc: 'Reviewer 에이전트의 규정 준수 검증' }
    ]
  }
];

export const ScrollInteractiveAi: React.FC<ScrollInteractiveAiProps> = ({ onNavigate }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isManualSwitch, setIsManualSwitch] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Desktop Scroll-driven Intersection Observer
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isManualSwitch) {
              setActiveStageIndex(index);
            }
          });
        },
        {
          rootMargin: '-20% 0px -40% 0px',
          threshold: 0.2
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isManualSwitch]);

  const handleStepClick = (index: number) => {
    setIsManualSwitch(true);
    setActiveStageIndex(index);

    const targetEl = stepRefs.current[index];
    if (targetEl && window.innerWidth >= 1024) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(() => {
      setIsManualSwitch(false);
    }, 800);
  };

  const handleMobilePrev = () => {
    setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : AI_STAGES.length - 1));
  };

  const handleMobileNext = () => {
    setActiveStageIndex((prev) => (prev < AI_STAGES.length - 1 ? prev + 1 : 0));
  };

  const currentStage = AI_STAGES[activeStageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <section
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative border-t border-slate-200"
      aria-label="엔터프라이즈 AI 3단계 핵심 파이프라인"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>AI EVOLUTION ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            지식 구축에서 자율 실행까지,<br />
            <span className="text-blue-700">Goobit AI 엔터프라이즈 파이프라인</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            비정형 데이터의 구조적 자산화부터 오차 없는 하이브리드 RAG, 복잡한 실무를 완수하는 자율 에이전트까지 체계적인 기술 진화를 확인하세요.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW (Tab & Clean Slide Layout)                                    */}
        {/* ========================================================================= */}
        <div className="lg:hidden space-y-6">
          {/* Mobile Tabs */}
          <div
            role="tablist"
            aria-label="AI 단계별 탭"
            className="grid grid-cols-3 gap-2 bg-slate-200/70 p-1.5 rounded-xl border border-slate-200"
          >
            {AI_STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                role="tab"
                aria-selected={activeStageIndex === idx}
                onClick={() => setActiveStageIndex(idx)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center gap-0.5 ${
                  activeStageIndex === idx
                    ? 'bg-white text-blue-700 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="text-[10px] opacity-75">단계 {stage.stepNumber}</span>
                <span className="truncate w-full text-center">{stage.stageName}</span>
              </button>
            ))}
          </div>

          {/* Mobile Active Stage Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-5 shadow-sm">
            {/* Header Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 tracking-wider">
                  STAGE {currentStage.stepNumber} / 03
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                  {currentStage.categoryBadge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {currentStage.title}
              </h3>
              <p className="text-xs text-blue-700 font-medium">
                {currentStage.subtitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Workflow Diagram Steps */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                <span>표준 업무 처리 아키텍처 흐름</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentStage.diagramSteps.map((d, i) => (
                  <div key={i} className="p-2 rounded-lg bg-white border border-slate-200 space-y-0.5">
                    <div className="text-[10px] font-bold text-blue-700">{d.step}</div>
                    <div className="text-[11px] text-slate-600 leading-snug">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800">주요 엔터프라이즈 스펙</div>
              <ul className="space-y-1.5">
                {currentStage.keyCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              {currentStage.metrics.map((m, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500">{m.label}</div>
                  <div className="text-xs font-bold text-blue-700 mt-0.5">{m.value}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 truncate">{m.note}</div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={handleMobilePrev}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>이전 단계</span>
              </button>

              <button
                onClick={() => onNavigate('products', 'ai-suite')}
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>솔루션 상세</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={handleMobileNext}
                className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white flex items-center gap-1"
              >
                <span>다음 단계</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (2-Column Sticky Split: Left Steps + Right Visual Panel)     */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Step Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1 mb-2">
              <div className="text-xs font-bold tracking-widest text-blue-700 uppercase flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <p className="text-xs text-slate-500">
                각 단계를 선택하여 Goobit AI의 고도화된 아키텍처 명세를 확인하세요.
              </p>
            </div>

            {AI_STAGES.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isActive = activeStageIndex === idx;

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  onClick={() => handleStepClick(idx)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 relative border ${
                    isActive
                      ? 'bg-white border-blue-500 shadow-md translate-x-1 ring-1 ring-blue-500/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(idx);
                    }
                  }}
                >
                  {/* Left Active Indicator */}
                  <div
                    className={`absolute left-0 top-5 bottom-5 w-1 rounded-r transition-colors ${
                      isActive ? 'bg-blue-600' : 'bg-transparent'
                    }`}
                  ></div>

                  <div className="space-y-3.5">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <StageIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold tracking-wider text-blue-700">
                            STAGE {stage.stepNumber}
                          </div>
                          <div className="text-base font-bold text-slate-900">
                            {stage.stageName}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {stage.categoryBadge}
                      </span>
                    </div>

                    {/* Stage Description */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    {/* Key Capabilities Checklist */}
                    <div className="pt-2.5 border-t border-slate-100">
                      <ul className="space-y-1.5">
                        {stage.keyCapabilities.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isActive ? 'text-blue-600' : 'text-slate-400'
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100">
                      {stage.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-slate-50 p-2 rounded-lg border border-slate-200/80 text-center"
                        >
                          <div className="text-[10px] text-slate-500">{m.label}</div>
                          <div
                            className={`text-xs font-bold mt-0.5 ${
                              isActive ? 'text-blue-700' : 'text-slate-700'
                            }`}
                          >
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Realistic Architecture Console */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xl">
              
              {/* Architecture Console Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-700">
                    GOOBIT ENTERPRISE PIPELINE // STAGE {currentStage.stepNumber}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {currentStage.highlightTag}
                </span>
              </div>

              {/* Realistic Workflow Architecture Diagram */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <CurrentIcon className="w-4 h-4 text-blue-600" />
                      {currentStage.stageName} 실행 파이프라인
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">KRDS v4.2 COMPLIANT</span>
                  </div>

                  {/* Step Diagram Sequence */}
                  <div className="space-y-2">
                    {currentStage.diagramSteps.map((diag, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                            {i + 1}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-800">{diag.step}</div>
                            <div className="text-[11px] text-slate-500">{diag.desc}</div>
                          </div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Quick Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {currentStage.technicalSpecs.map((spec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] text-slate-500">{spec.title}</div>
                      <div className="font-semibold text-slate-800 mt-0.5">{spec.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Real Metrics Strip */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  {currentStage.metrics.map((m, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                      <div className="text-sm font-extrabold text-blue-700 mt-0.5">{m.value}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 truncate">{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  온프레미스 망분리 보안 아키텍처
                </span>
                
                <button
                  onClick={() => onNavigate('products', 'ai-suite')}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>솔루션 아키텍처 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ScrollInteractiveAi;
