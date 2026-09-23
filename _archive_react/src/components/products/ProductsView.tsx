/**
 * @intent Products sub-view with full product lineup, live AI dashboard showcase, agent pipeline architecture diagram, and feature comparison
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../../data/productsData';
import {
  Cpu,
  LayoutTemplate,
  Music,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  Sparkles,
  Server,
  Network,
  Shield,
  FileCheck2,
  Database,
  Lock,
  Activity,
  GitBranch,
  Bot,
  Workflow,
  Eye
} from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface ProductsViewProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onNavigate }) => {
  const [archViewTab, setArchViewTab] = useState<'layers' | 'agent-flow'>('layers');

  const comparisonData = [
    {
      feature: '지식그래프(Knowledge Graph) 인과 추론',
      goobitAi: '기본 내장 (개체 간 관계 그래프 자동 생성)',
      generalLlm: '미지원 (단순 텍스트 매칭)',
      legacySearch: '미지원 (키워드 검색 한계)',
    },
    {
      feature: '환각(Hallucination) 억제율',
      goobitAi: '99.8% (Ground Truth 원문 인용 검증)',
      generalLlm: '낮음 (빈번한 그럴듯한 거짓 답변)',
      legacySearch: '해당 없음 (검색 결과 링크만 제공)',
    },
    {
      feature: '사내 폐쇄망 온프레미스 배포',
      goobitAi: '100% 지원 (망분리 국정원 보안 규격 충족)',
      generalLlm: '제한적 (외부 클라우드 API 필수 의존)',
      legacySearch: '지원 가능',
    },
    {
      feature: '전자정부 표준프레임워크 4.x 연동',
      goobitAi: '자체 커넥터 기본 탑재 및 100% 호환',
      generalLlm: '별도 커스텀 엔지니어링 필요',
      legacySearch: '부분 지원',
    },
    {
      feature: '부서/직급별 세분화 권한 제어 (RBAC)',
      goobitAi: '문서/청크 단위 세밀한 ACL 필터링',
      generalLlm: '미지원 (프롬프트 레벨 보안 취약)',
      legacySearch: '기본 DB 권한 제어',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-section">
      {/* Page Header Banner */}
      <div className="bg-navy-950 text-white py-16 lg:py-20 border-b border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-850 border border-ai-cyan/30 text-xs font-bold text-ai-cyan">
              <Cpu className="w-3.5 h-3.5" />
              <span>ENTERPRISE PRODUCTS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              소프트웨어 제품 라인업
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              지식그래프 기반 Goobit AI Suite부터 국가 공인 저작권 소프트웨어 TBCMS, OPMS까지 신뢰할 수 있는 엔터프라이즈 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-nav Anchor Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 gap-6 text-sm font-semibold text-gray-600">
            <a href="#ai-suite" className="hover:text-ai-blue whitespace-nowrap">Goobit AI Suite</a>
            <a href="#architecture" className="hover:text-ai-blue whitespace-nowrap">AI 아키텍처 다이어그램</a>
            <a href="#comparison" className="hover:text-ai-blue whitespace-nowrap">솔루션 비교 분석</a>
            <a href="#tbcms" className="hover:text-ai-blue whitespace-nowrap">TBCMS (콘텐츠 관리)</a>
            <a href="#opms" className="hover:text-ai-blue whitespace-nowrap">OPMS (공연 관리 ERP)</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* 1. Goobit AI Suite Feature Deep Dive & Dashboard Showcase */}
        <section id="ai-suite" className="scroll-mt-32 space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-ai-cyan/20 text-ai-cyan border border-ai-cyan/30">
                FLAGSHIP AI SOLUTION
              </span>
              <span className="text-xs font-bold text-navy-600">2026 차세대 엔터프라이즈 AI</span>
            </div>
            <h2 className="text-3xl font-extrabold text-navy-900">
              Goobit AI Suite: 지식그래프 기반 하이브리드 RAG 플랫폼
            </h2>
            <p className="text-content-body text-base max-w-3xl leading-relaxed">
              조직 내 축적된 수십만 건의 비정형 행정 문서, 규정집, 매뉴얼을 지식그래프(Knowledge Graph)로 온톨로지화하고, 자체 온프레미스 sLLM과 연결하여 오차 없는 업무 지능을 구현합니다.
            </p>
          </div>

          {/* Feature Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-enterprise space-y-3">
              <div className="p-3 rounded-xl bg-blue-50 text-ai-blue w-fit">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">지식그래프 자동 생성 & 시각화</h3>
              <p className="text-xs text-content-body leading-relaxed">
                법령 조항, 업무 지침, 결재 문서 간의 상호 참조 관계를 그래프 노드와 엣지로 자동 변환하여 인과관계 기반 정밀 추론을 가능하게 합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-enterprise space-y-3">
              <div className="p-3 rounded-xl bg-cyan-50 text-ai-cyan w-fit">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">하이브리드 RAG (Vector + Graph)</h3>
              <p className="text-xs text-content-body leading-relaxed">
                단순 텍스트 임베딩 벡터 검색의 한계를 넘어 지식그래프 탐색을 동시 수행함으로써 맥락을 놓치지 않는 99.8% 정확도의 답변을 생성합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-enterprise space-y-3">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">완전한 폐쇄망 온프레미스 배포</h3>
              <p className="text-xs text-content-body leading-relaxed">
                인터넷 연결이 차단된 사내 서버 환경에 구축되어 고객사의 기밀 자산 유출을 원천 방지하며, 부서별 열람 권한 필터링(RBAC)을 보장합니다.
              </p>
            </div>
          </div>

          {/* Integrated AI Dashboard Visual Showcase Card */}
          <div className="rounded-3xl bg-navy-950 p-6 sm:p-10 border border-navy-800 shadow-2xl space-y-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold text-ai-cyan tracking-wider uppercase">
                    LIVE CONSOLE SCREENSHOT
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Goobit AI Suite 엔터프라이즈 통합 관제 콘솔 화면
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-3 py-1 rounded bg-navy-900 text-gray-300 border border-navy-700">
                  온프레미스 망분리 관제 v2.6
                </span>
              </div>
            </div>

            {/* High-Resolution Dashboard Mockup Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-navy-700 bg-navy-900 shadow-enterprise group">
              <img
                src="/images/goobit_ai_dashboard.jpg"
                alt="Goobit AI Suite 엔터프라이즈 통합 관제 콘솔 실물 화면"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              
              {/* Dark Ambient Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Status Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-3 py-1.5 rounded-lg bg-navy-950/90 text-xs font-bold text-ai-cyan border border-ai-cyan/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Activity className="w-3.5 h-3.5 text-ai-cyan animate-pulse" />
                  실시간 온톨로지 노드 1,420개 활성
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-950/90 text-xs font-bold text-emerald-400 border border-emerald-800/60 backdrop-blur-md hidden sm:flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  RBAC 다단계 권한 필터링 통제
                </span>
              </div>
            </div>

            {/* Dashboard Feature Highlights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1">
                <div className="text-xs font-bold text-ai-cyan">Neo4j 지식그래프 브라우저</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  비정형 문서 간 의미적 연결망을 3차원 클러스터로 실시간 시각화 및 탐색
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1">
                <div className="text-xs font-bold text-blue-400">온프레미스 sLLM 지연율 관제</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  사내 GPU 클러스터 부하 및 토큰 생성 속도(평균 12ms) 실시간 텔레메트리
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400">데이터 외부 유출 원천 차단</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  인터넷 폐쇄망 환경에서 100% 무결점 동작하며 국정원 보안성 검토 기준 충족
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Enterprise AI Architecture & Agent Pipeline Section */}
        <section id="architecture" className="scroll-mt-32 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-ai-blue uppercase tracking-wider">SYSTEM ARCHITECTURE & AGENT PIPELINE</span>
              <h2 className="text-3xl font-extrabold text-navy-900">
                Goobit AI Suite 엔터프라이즈 아키텍처
              </h2>
              <p className="text-content-body text-base max-w-3xl">
                데이터 인제스천부터 지식그래프 모델링, 다중 에이전트 협업, 보안 거버넌스에 이르는 전주기 엔터프라이즈 파이프라인입니다.
              </p>
            </div>

            {/* Architecture View Switcher Tab */}
            <div className="flex p-1 rounded-xl bg-gray-200 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setArchViewTab('layers')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  archViewTab === 'layers'
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'text-gray-600 hover:text-navy-900'
                }`}
              >
                5계층 시스템 구조
              </button>
              <button
                onClick={() => setArchViewTab('agent-flow')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  archViewTab === 'agent-flow'
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'text-gray-600 hover:text-navy-900'
                }`}
              >
                AI 에이전트 흐름도
              </button>
            </div>
          </div>

          {/* View Tab 1: 5-Layer Blueprint */}
          {archViewTab === 'layers' && (
            <div className="rounded-3xl bg-navy-950 p-6 sm:p-12 text-white border border-navy-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                <div className="flex items-center gap-2 text-ai-cyan font-bold text-sm">
                  <Layers className="w-5 h-5" />
                  <span>5-Layer Enterprise Blueprint</span>
                </div>
                <span className="text-xs text-gray-400">KRDS & 국정원 보안 기준 충족</span>
              </div>

              {/* Architecture 5-Layer Visualization */}
              <div className="space-y-3">
                {/* Layer 5: Application Layer */}
                <div className="p-4 rounded-xl bg-navy-900 border border-navy-700 hover:border-ai-cyan/60 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-ai-cyan uppercase">Layer 5: 사용자 인터페이스 & AI Agent</span>
                    <span className="text-[11px] text-gray-400">Web Portal, Chat UI, OpenAPI, HWP 보고서 자동 생성</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">행정 질의응답 포털</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">규정 교차 검증 Agent</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">결재 초안 작성기</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">이상 징후 모니터링</div>
                  </div>
                </div>

                {/* Layer 4: Orchestration & RAG Engine */}
                <div className="p-4 rounded-xl bg-navy-900 border border-ai-blue/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase">Layer 4: 하이브리드 RAG & 추론 오케스트레이션</span>
                    <span className="text-[11px] text-gray-400">Re-ranking, Ground Truth Verification, Hallucination Filter</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-navy-850 border border-blue-900 text-blue-200">Graph Traversal 추론기</div>
                    <div className="p-2 rounded bg-navy-850 border border-blue-900 text-blue-200">밀집 벡터 Re-Ranker</div>
                    <div className="p-2 rounded bg-navy-850 border border-blue-900 text-blue-200">환각 탐지 & 원문 인용 검증기</div>
                  </div>
                </div>

                {/* Layer 3: Knowledge Graph & Vector DB */}
                <div className="p-4 rounded-xl bg-navy-900 border border-navy-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Layer 3: 지식 저장소 & 온톨로지 엔진</span>
                    <span className="text-[11px] text-gray-400">Neo4j Graph DBMS + pgvector / Milvus Vector Store</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">온톨로지 엔티티 저장소</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">청크 단위 벡터 인덱스</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">역할 기반 접근제어 (RBAC)</div>
                  </div>
                </div>

                {/* Layer 2: Model & Execution Engine */}
                <div className="p-4 rounded-xl bg-navy-900 border border-navy-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase">Layer 2: AI 모델 런타임 (sLLM & Embedding)</span>
                    <span className="text-[11px] text-gray-400">vLLM, TensorRT-LLM (폐쇄망 GPU 인프라 최적화)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">온프레미스 sLLM (Llama 3)</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">한국어 특화 EXAONE</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">고정밀 다국어 임베딩</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-200">클라우드 API (GPT-4o)</div>
                  </div>
                </div>

                {/* Layer 1: Data Ingestion & Integration */}
                <div className="p-4 rounded-xl bg-navy-900 border border-navy-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase">Layer 1: 데이터 연계 & 비정형 문서 파서</span>
                    <span className="text-[11px] text-gray-400">HWP, PDF, DOCX, 전자정부 RDBMS, 공공 API 연계</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-300">한글(HWP) 구조화 파서</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-300">표/이미지 OCR 엔진</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-300">Tibero / Oracle 커넥터</div>
                    <div className="p-2 rounded bg-navy-800/80 border border-navy-700 text-gray-300">그룹웨어/ERP 표준 API</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Tab 2: AI Agent & Multi-Agent Flow Diagram */}
          {archViewTab === 'agent-flow' && (
            <div className="rounded-3xl bg-navy-950 p-6 sm:p-12 text-white border border-navy-800 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
                <div className="flex items-center gap-2 text-ai-cyan font-bold text-sm">
                  <GitBranch className="w-5 h-5" />
                  <span>자율 에이전트 & RAG 오케스트레이션 파이프라인 흐름도</span>
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-navy-900 px-2.5 py-1 rounded border border-navy-800">
                  LangGraph Multi-Agent Architecture
                </span>
              </div>

              {/* Agent Flow Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-navy-700 bg-navy-900 shadow-enterprise group">
                <img
                  src="/images/goobit_ai_agent_flow.jpg"
                  alt="Goobit AI 다중 자율 에이전트 업무 파이프라인 흐름도"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 bg-navy-950/90 border border-navy-800 p-3 rounded-xl backdrop-blur-md">
                  <div className="text-xs font-bold text-ai-cyan flex items-center gap-1.5">
                    <Workflow className="w-4 h-4" />
                    <span>다중 전문 에이전트 파이프라인 (Planner &rarr; Retriever &rarr; Reasoner &rarr; Verifier)</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-1">
                    질의 분석부터 지식그래프 탐색, 벡터 Re-ranking, 국정원 보안성 필터링 및 최종 HWP 보고서 조판까지 자율 완수합니다.
                  </p>
                </div>
              </div>

              {/* Multi-Agent Stages Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
                  <div className="text-ai-cyan font-bold mb-1">01. Query Analyzer</div>
                  <div className="text-gray-400 text-[11px]">사용자 질문의 의도 분석 및 온톨로지 핵심 엔티티 추출</div>
                </div>
                <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
                  <div className="text-blue-400 font-bold mb-1">02. Hybrid Retriever</div>
                  <div className="text-gray-400 text-[11px]">Neo4j 그래프 경로와 벡터 DB 동시 탐색 및 가중치 합산</div>
                </div>
                <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
                  <div className="text-cyan-400 font-bold mb-1">03. Graph Reasoner</div>
                  <div className="text-gray-400 text-[11px]">다단계 추론 및 법령/규정 간 상충 관계 논리적 검증</div>
                </div>
                <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
                  <div className="text-emerald-400 font-bold mb-1">04. Fact Verifier</div>
                  <div className="text-gray-400 text-[11px]">원문 인용 출처(Ground Truth) 100% 매칭 및 환각 차단</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3. Feature Comparison Table */}
        <section id="comparison" className="scroll-mt-32 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-ai-blue uppercase tracking-wider">BENCHMARK</span>
            <h2 className="text-3xl font-extrabold text-navy-900">
              기술 솔루션 비교 분석
            </h2>
            <p className="text-content-body text-base">
              일반 상용 LLM 래퍼 서비스 및 기존 검색 엔진과 비교할 때 Goobit AI Suite가 제공하는 압도적 차별성입니다.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-enterprise">
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="border-b border-gray-200 bg-navy-950 text-white">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">비교 평가 항목</th>
                  <th className="p-4 text-xs font-bold text-ai-cyan uppercase tracking-wider bg-navy-900 border-x border-navy-800">
                    Goobit AI Suite
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-300 uppercase tracking-wider">일반 LLM 래퍼 솔루션</th>
                  <th className="p-4 text-xs font-bold text-gray-300 uppercase tracking-wider">레거시 검색 엔진</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-navy-900 font-medium">
                {comparisonData.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-bold text-navy-900 bg-gray-50/50">{row.feature}</td>
                    <td className="p-4 font-bold text-ai-blue bg-blue-50/30 border-x border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.goobitAi}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.generalLlm}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{row.legacySearch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. TBCMS Deep Dive */}
        <section id="tbcms" className="scroll-mt-32 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-enterprise space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-ai-blue">
                    저작권 등록 제C-2015-021021호
                  </span>
                  <span className="text-xs font-medium text-gray-500">웹 표준·접근성 100% 준수</span>
                </div>
                <h3 className="text-2xl font-extrabold text-navy-900">
                  TBCMS (Total Board & Content Management System)
                </h3>
              </div>
              <button
                onClick={() => onNavigate('contact', 'inquiry')}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors shrink-0"
              >
                도입 견적 문의
              </button>
            </div>

            <p className="text-sm text-content-body leading-relaxed">
              TBCMS는 농림축산식품부, KOTRA, 서울디지털재단 등 국가 공공기관 포털에서 지난 10년간 검증된 최적의 콘텐츠 관리 플랫폼입니다. 개발 지식이 없는 현업 실무자도 직관적인 블록 에디터를 통해 대국민 공지사항, 웹진, 미디어 자료를 웹 표준에 맞게 배포할 수 있습니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
                <div className="font-bold text-navy-900">멀티 사이트 통합 관제</div>
                <p className="text-content-body">수십 개 산하기관 웹사이트 단일 어드민 통제</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
                <div className="font-bold text-navy-900">KRDS & 접근성 자동 검증</div>
                <p className="text-content-body">명도 대비, 대체 텍스트 누락 실시간 알림</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
                <div className="font-bold text-navy-900">전자정부 프레임워크 4.x</div>
                <p className="text-content-body">Spring Boot 3 기반 고성능/보안 규격 충족</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. OPMS Deep Dive */}
        <section id="opms" className="scroll-mt-32 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-enterprise space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                    저작권 등록 제C-2018-005128호
                  </span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    서울시립교향악단 공식 채택
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-navy-900">
                  OPMS (Orchestra & Performance Management System)
                </h3>
              </div>
              <button
                onClick={() => onNavigate('contact', 'inquiry')}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors shrink-0"
              >
                솔루션 시연 신청
              </button>
            </div>

            <p className="text-sm text-content-body leading-relaxed">
              OPMS는 국내 유일의 문화예술 단체 전용 스마트 운영 ERP 솔루션입니다. 복잡한 단원/객원 아티스트 스케줄링부터 수만 권에 달하는 악보 라이브러리 추적, 고가 악기 자산 관리, 표준 전자계약 체결까지 원스톱으로 처리하여 예술 행정의 디지털 혁신을 주도합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
                <div className="font-bold text-navy-900">리허설 스마트 캘린더</div>
                <p className="text-content-body">파트별 편성표 자동화 및 모바일 PUSH 실시간 전송</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
                <div className="font-bold text-navy-900">디지털 악보 바코드 추적</div>
                <p className="text-content-body">총보/파트보 대여 이력 및 저작권 사용료 추적</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
                <div className="font-bold text-navy-900">객원 출연료 자동 정산</div>
                <p className="text-content-body">전자 서명 및 표준 출연 계약서 행정 공수 80% 절감</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductsView;
