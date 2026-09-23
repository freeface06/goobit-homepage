/**
 * @intent Product catalog SSOT data for Goobit AI Suite, TBCMS, and OPMS
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import { ProductItem } from '../types';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'ai-suite',
    name: 'Goobit AI Suite',
    category: '엔터프라이즈 AI 플랫폼',
    tagline: '지식그래프와 RAG 기반의 고신뢰 업무 인텔리전스',
    summary: '기업 내 비정형 문서와 데이터를 정밀 지식그래프로 구조화하여, 환각 현상(Hallucination) 없이 즉시 실무에 투입 가능한 차세대 엔터프라이즈 AI 솔루션입니다.',
    description: 'Goobit AI Suite는 단순한 LLM 래퍼가 아닙니다. 조직 내 축적된 방대한 규정집, 사업계획서, 행정 문서, 데이터베이스를 자동으로 분석하여 엔터프라이즈 지식그래프(Knowledge Graph)를 생성하고, 벡터 검색과 하이브리드로 결합하는 최첨단 RAG 아키텍처를 제공합니다. 사내 망 분리 온프레미스 환경부터 하이브리드 클라우드까지 완벽한 보안 거버넌스를 보장합니다.',
    badge: 'NEW AI 2026',
    features: [
      {
        title: '하이브리드 RAG (Graph + Vector)',
        description: '문맥과 개체 간의 인과관계를 놓치지 않는 지식그래프 탐색과 밀집 벡터 검색을 결합하여 99% 이상의 정보 정확도를 구현합니다.',
      },
      {
        title: 'AI Agent 업무 프로세스 자동화',
        description: '자연어 지시만으로 문서 요약, 결재 초안 작성, 법령 조항 교차 검증 등 복합 업무를 자율적으로 완수하는 Agentic 파이프라인을 지원합니다.',
      },
      {
        title: '철저한 데이터 보안 및 망분리 배포',
        description: '기업 내부 데이터를 외부로 반출하지 않는 폐쇄망 온프레미스 소형 LLM(sLLM) 구축 및 세분화된 부서별 접근 권한(RBAC)을 제공합니다.',
      },
      {
        title: '엔터프라이즈 커넥터 생태계',
        description: '사내 그룹웨어, ERP, DBMS, 전자정부 표준프레임워크와 즉시 연동되는 50+ 레디메이드 데이터 커넥터를 탑재했습니다.',
      },
    ],
    specifications: [
      { label: '지원 LLM', value: 'OpenAI GPT-4o, Claude 3.5, Llama 3 (온프레미스 가능), EXAONE' },
      { label: '배포 환경', value: 'On-Premise (폐쇄망), Private Cloud, Kubernetes 컨테이너' },
      { label: '데이터 연동', value: 'RDBMS (Oracle, PostgreSQL), NoSQL, PDF, HWP, DOCX, XLSX' },
      { label: '보안 규격', value: '국정원 보안성 검토 기준 충족, 전자정부 암호화 모듈 연동' },
    ],
    targetUsers: [
      '공공기관 정책 수립 및 규정 검토 행정 담당 부서',
      '대규모 사내 지식자산 및 감사 대응이 필요한 대기업 컴플라이언스 팀',
      '고객 응대 및 전문 기술 상담을 고도화하려는 금융·통신 고객센터',
    ],
    keyReference: '공공기관 행정 법령 특화 AI 검색 PoC, 통신 데이터 큐레이션 아키텍처',
  },
  {
    id: 'tbcms',
    name: 'TBCMS',
    category: '통합 콘텐츠 관리 시스템 (WCMS)',
    tagline: '웹 표준과 접근성을 100% 만족하는 엔터프라이즈 CMS',
    summary: '한국저작권위원회에 공식 등록된 자체 기술 솔루션으로, 대규모 포털과 수십 개의 산하 사이트를 하나의 통합 콘솔에서 안전하고 유연하게 통제합니다.',
    description: 'TBCMS(Total Board & Content Management System)는 2015년 저작권 등록 이후 10여 년간 공공기관과 대기업의 미션 크리티컬 웹 환경에서 검증된 최적의 콘텐츠 관리 플랫폼입니다. 전자정부 표준프레임워크 4.x 기반으로 설계되어 타 행정 시스템과의 연계가 용이하며, 웹 접근성(KWCAG 2.1) 품질인증 마크 획득을 보장하는 자동화 엔진을 내장하고 있습니다.',
    badge: '저작권 등록 제C-2015-021021호',
    features: [
      {
        title: '멀티 사이트 통합 중앙 관제',
        description: '본청 및 산하기관 수십 개의 웹사이트를 단일 관리자 인터페이스에서 통합 관리하여 TCO(총소유비용)를 60% 이상 절감합니다.',
      },
      {
        title: '반응형 UI 빌더 & 드래그 앤 드롭 에디터',
        description: '개발 지식이 없는 실무자도 코딩 없이 손쉽게 웹 표준 반응형 페이지와 메뉴 구조를 생성하고 즉시 배포할 수 있습니다.',
      },
      {
        title: 'KRDS 및 웹 접근성 자동 검증',
        description: '페이지 저장 시점에 명도 대비, 대체 텍스트 누락, 시맨틱 태그 준수 여부를 자동 진단하여 무결점 접근성을 유지합니다.',
      },
      {
        title: '다계층 결재 및 승인 워크플로우',
        description: '콘텐츠 작성자-검수자-최종 승인자로 이어지는 단계별 워크플로우와 변경 이력 버전 관리(Diff) 기능을 제공합니다.',
      },
    ],
    specifications: [
      { label: '기반 프레임워크', value: '전자정부 표준프레임워크 4.x (Spring Boot 3)' },
      { label: '지원 데이터베이스', value: 'Tibero, Oracle, PostgreSQL, MySQL' },
      { label: '호환성', value: '크로스 브라우징 완벽 지원 (Chrome, Edge, Safari, 모바일)' },
      { label: '인증 규격', value: '웹 접근성(WA) 품질인증 기준 100% 충족' },
    ],
    targetUsers: [
      '중앙부처, 지자체 및 공공기관 대국민 정보 포털 운영팀',
      '다수의 브랜드 사이트와 사내 게시판을 운영하는 엔터프라이즈 기업',
      '대학교 및 산학협력단 홍보·학사 정보 포털 관리자',
    ],
    keyReference: '농림축산식품부 대국민 포털, 서울디지털재단, KOTRA 사이버전시관 등',
  },
  {
    id: 'opms',
    name: 'OPMS',
    category: '오케스트라·공연 운영 솔루션 (Art ERP)',
    tagline: '국내 유일의 스마트 오케스트라 및 공연 단체 전문 관리 시스템',
    summary: '국내 최정상 서울시립교향악단의 실무 노하우를 바탕으로 공동 개발·저작권 등록된 국내 독보적 문화예술 단체 특화 ERP 솔루션입니다.',
    description: 'OPMS(Orchestra & Performance Management System)는 복잡한 오케스트라 및 공연 단체의 전주기 운영 프로세스를 디지털화한 전용 플랫폼입니다. 단원 및 객원 연주자 스케줄링부터 악보 라이브러리, 악기 자산 추적, 공연별 예산 및 계약 관리에 이르기까지 예술 행정의 비효율을 혁신적으로 개선합니다.',
    badge: '저작권 등록 제C-2018-005128호',
    features: [
      {
        title: '공연·리허설 스마트 스케줄러',
        description: '악기 파트별(현악, 목관, 금관, 타악) 단원 편성표 자동 매칭 및 리허설 변경 사항의 모바일 실시간 PUSH 알림을 제공합니다.',
      },
      {
        title: '디지털 악보 라이브러리 & 저작권 관리',
        description: '수만 권의 오케스트라 총보 및 파트보 대여 이력, 저작권 사용료 만료일, 바코드 기반 자산 상태를 완벽히 추적합니다.',
      },
      {
        title: '객원 아티스트 계약 및 수당 자동 정산',
        description: '객원 연주자의 출결 확인부터 표준 출연 계약서 전자 서명, 파트별 수당 자동 산출까지 행정 공수를 80% 단축합니다.',
      },
      {
        title: '통합 악기 및 비품 자산 관리',
        description: '고가의 악기 대여, 정기 조율 및 점검 주기, 수리 이력을 사진 및 상태 등급별로 체계화하여 보존 가치를 극대화합니다.',
      },
    ],
    specifications: [
      { label: '아키텍처', value: '반응형 웹 및 모바일 웹 앱 (모든 스마트 기기 지원)' },
      { label: '클라우드 지원', value: 'SaaS 구독형 및 고객사 자체 서버 구축(On-Premise) 선택 가능' },
      { label: '알림 연동', value: '카카오 알림톡, SMS, 모바일 웹 PUSH 연동' },
      { label: '보안 체계', value: '개인정보 암호화 저장, 역할별 접근 제어' },
    ],
    targetUsers: [
      '국공립 및 시·도립 교향악단, 합창단, 국악관현악단',
      '문화예술회관, 아트센터 등 복합 공연장 기획운영 부서',
      '대규모 민간 오케스트라 및 페스티벌 조직위원회',
    ],
    keyReference: '서울시립교향악단(SPO) 스마트 공연운영시스템 도입 및 지속 고도화',
  },
];
