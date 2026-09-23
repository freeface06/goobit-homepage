/**
 * @intent Company profile, vision, CEO greetings, history, and legal SSOT data
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import { CompanyOverview, HistoryMilestone, CertificationItem, LegalInfo, MainMenuItem } from '../types';

export const LEGAL_INFO: LegalInfo = {
  companyName: '주식회사 구비트 (Goobit Co., Ltd.)',
  ceoName: '구본일',
  businessRegistrationNumber: '698-86-00102',
  address: '서울특별시 송파구 법원로 11길 7 문정현대지식산업센터 C동 408호 (우편번호: 05836)',
  tel: '02-517-5520',
  fax: '02-517-5521',
  email: 'contact@goobit.co.kr',
  privacyManager: '구본일 (privacy@goobit.co.kr)',
  copyrightYear: 2026,
};

export const NAVIGATION_MENUS: MainMenuItem[] = [
  {
    id: 'company',
    label: '회사소개',
    englishLabel: 'About Us',
    subItems: [
      { id: 'overview', label: '기업 개요 및 비전', description: '가치에 진심을 담는 기술 중심 기업', anchor: 'overview' },
      { id: 'ceo', label: 'CEO 인사말', description: '고객 성공과 지속가능한 DX 파트너십', anchor: 'ceo' },
      { id: 'history', label: '주요 연혁', description: '2015년부터 축적된 기술 혁신의 궤적', anchor: 'history' },
      { id: 'certifications', label: '인증 및 특허', description: '소프트웨어 저작권 및 벤처 인증 현황', anchor: 'certifications' },
      { id: 'location', label: '찾아오시는 길', description: '문정 현대지식산업센터 본사 오시는 길', anchor: 'location' },
    ],
  },
  {
    id: 'products',
    label: '제품',
    englishLabel: 'Products',
    subItems: [
      { id: 'ai-suite', label: 'Goobit AI Suite', description: '지식그래프 및 RAG 기반 엔터프라이즈 AI', badge: 'NEW', anchor: 'ai-suite' },
      { id: 'tbcms', label: 'TBCMS', description: '통합 콘텐츠 및 반응형 포털 관리 솔루션', badge: 'GS 1등급', anchor: 'tbcms' },
      { id: 'opms', label: 'OPMS', description: '스마트 오케스트라 및 공연 단체 운영 관리 시스템', badge: '특허등록', anchor: 'opms' },
    ],
  },
  {
    id: 'services',
    label: '서비스',
    englishLabel: 'Services',
    subItems: [
      { id: 'public-si', label: '공공 정보화 SI', description: '전자정부 표준프레임워크 기반 대규모 시스템 구축', anchor: 'public-si' },
      { id: 'telecom-ito', label: '통신·미디어 ITO', description: 'KT 대용량 플랫폼 24/365 고신뢰 운영 및 유지관리', anchor: 'telecom-ito' },
      { id: 'edutech', label: '스마트 교육 및 LMS', description: 'EBS 등 차세대 에듀테크 플랫폼 아키텍처', anchor: 'edutech' },
      { id: 'consulting', label: 'AI·DX 컨설팅', description: '기업 맞춤형 인공지능 전환 및 인프라 로드맵 수립', anchor: 'consulting' },
    ],
  },
  {
    id: 'news',
    label: '회사소식',
    englishLabel: 'Newsroom',
    subItems: [
      { id: 'all', label: '전체 소식', description: '구비트의 최신 동향과 기술 스토리', anchor: 'all' },
      { id: 'press', label: '보도자료', description: '언론 속 구비트와 주요 성과 발표', anchor: 'press' },
      { id: 'tech', label: '기술·DX 스토리', description: 'AI 지식그래프 및 RAG 개발기', anchor: 'tech' },
      { id: 'culture', label: '사내 소식', description: '구비트 피플과 조직 문화 이야기', anchor: 'culture' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    englishLabel: 'Contact Us',
    subItems: [
      { id: 'inquiry', label: '프로젝트 도입 문의', description: 'AI 솔루션 및 시스템 구축 견적 상담', anchor: 'inquiry' },
      { id: 'support', label: '기술 지원 데스크', description: '솔루션 유지보수 및 핫라인 안내', anchor: 'support' },
      { id: 'directions', label: '오시는 길 안내', description: '대중교통 및 주차 안내', anchor: 'directions' },
    ],
  },
];

export const COMPANY_OVERVIEW: CompanyOverview = {
  slogan: '가치에 진심을 담다, AI로 엔터프라이즈의 미래를 열다',
  subSlogan: '공공·통신 10여 년의 미션 크리티컬 시스템 운영 노하우와 지식그래프 기반 최신 엔터프라이즈 AI 기술을 융합합니다.',
  establishedDate: '2015년 7월',
  employeeCount: '50+ 전문 엔지니어 및 AI 연구원',
  businessScope: [
    '지식그래프 & RAG 기반 엔터프라이즈 AI 솔루션 개발 (Goobit AI Suite)',
    '전자정부 표준프레임워크 기반 공공 정보화 SI 구축',
    '대용량 트래픽 통신·미디어 포털 24/365 ITO 운영',
    '공연 예술 및 콘텐츠 단체 맞춤형 운영 플랫폼 (OPMS, TBCMS)',
    '클라우드 네이티브 전환 및 DX 컨설팅',
  ],
};

export const CEO_MESSAGE = {
  quote: '기술의 본질은 고객의 비즈니스 가치를 높이고 사람의 가능성을 확장하는 데 있습니다.',
  bodyParagraphs: [
    '주식회사 구비트는 2015년 설립 이래 공공, 통신, 교육, 문화예술 등 대한민국 핵심 산업의 중추 시스템을 구축하고 무중단으로 운영하며 고객과 함께 성장해 왔습니다.',
    '농림축산식품부, KT, 서울시립교향악단 등 신뢰도가 최우선인 엔터프라이즈 고객사들이 10년 넘게 구비트를 선택해 주신 이유는 오직 하나, \'가치에 진심을 담는다\'는 원칙을 단 한 번도 타협하지 않았기 때문입니다.',
    '이제 우리는 생성형 AI와 지식그래프(Knowledge Graph), RAG(검색 증강 생성) 기술이 주도하는 거대한 디지털 전환(DX)의 문턱에 서 있습니다. 구비트는 검증된 대규모 SI 아키텍처 역량 위에 최첨단 엔터프라이즈 AI 기술을 결합하여, 단순한 기술 공급자를 넘어 고객의 영구적인 AI 혁신 파트너가 될 것을 약속드립니다.',
  ],
  signName: '주식회사 구비트 대표이사 구본일',
};

export const COMPANY_HISTORY: HistoryMilestone[] = [
  {
    year: '2024 - 2026',
    items: [
      '엔터프라이즈 지식그래프 기반 Goobit AI Suite 1.0 출시',
      '공공 행정 및 법령 문서 특화 RAG 파이프라인 실증 사업 수주',
      '통신 미디어 차세대 AI 큐레이션 엔진 아키텍처 PoC 완료',
      'TBCMS v3.0 클라우드 네이티브 마이크로서비스 아키텍처 개편',
    ],
  },
  {
    year: '2021 - 2023',
    items: [
      '벤처기업 확인 및 기술평가 우수기업(T-4) 인증 획득',
      '농림축산식품부 및 공공기관 차세대 클라우드 정보화 SI 완료',
      '서울시립교향악단 스마트 공연운영시스템(OPMS) 고도화 및 전국 배포',
      'KT 올레닷컴·C-Cube 대용량 미디어 포털 5개년 연속 무중단 ITO 달성',
    ],
  },
  {
    year: '2018 - 2020',
    items: [
      '스마트 오케스트라 운영관리 솔루션(OPMS) 소프트웨어 저작권 등록 (제C-2018-005128호)',
      '현대자동차 글로벌 교육 커리큘럼 시스템 및 LMS 공급',
      '서울디지털재단 공공 데이터 포털 및 반응형 CMS 구축',
      '경영혁신형 중소기업(Main-Biz) 공식 인증',
    ],
  },
  {
    year: '2015 - 2017',
    items: [
      '주식회사 구비트 법인 설립 (2015년 7월)',
      '통합 게시판 및 콘텐츠 관리 솔루션(TBCMS) 소프트웨어 저작권 등록 (제C-2015-021021호)',
      'KT 마케팅 인프라 및 프로모션 시스템 운영 유지보수 전담 개시',
      '공공 정보화 전문 SI 솔루션 기업 입지 구축',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: '통합 콘텐츠 관리 솔루션 (TBCMS)',
    issuer: '한국저작권위원회',
    date: '2015.08',
    registrationNumber: '제C-2015-021021호',
    category: 'copyright',
    description: '웹 표준 및 웹 접근성 100% 준수 반응형 게시판/콘텐츠 관리 플랫폼 소프트웨어 저작권 공식 등록',
  },
  {
    id: 'cert-2',
    title: '스마트 오케스트라 운영관리 솔루션 (OPMS)',
    issuer: '한국저작권위원회',
    date: '2018.03',
    registrationNumber: '제C-2018-005128호',
    category: 'copyright',
    description: '공연 편성, 아티스트 스케줄링, 악보 라이브러리 및 계약 자산 전주기 관리 소프트웨어 저작권 등록',
  },
  {
    id: 'cert-3',
    title: '벤처기업 인증 (혁신성장유형)',
    issuer: '중소벤처기업진흥공단',
    date: '2023.04',
    registrationNumber: '제20230412030045호',
    category: 'venture',
    description: 'AI RAG 파이프라인 및 엔터프라이즈 솔루션 기술 혁신 역량과 성장 잠재력 공인',
  },
  {
    id: 'cert-4',
    title: '경영혁신형 중소기업 (Main-Biz)',
    issuer: '중소벤처기업부',
    date: '2022.09',
    registrationNumber: '제R220202-0123호',
    category: 'quality',
    description: '프로젝트 관리 품질, 정보보안 및 안정적 경영시스템 체계 보유 인증',
  },
];

export const LOCATION_DIRECTIONS = {
  address: '서울특별시 송파구 법원로 11길 7 문정현대지식산업센터 C동 408호 (우편번호: 05836)',
  subway: [
    '지하철 8호선 문정역 3번 또는 4번 출구에서 도보 약 350m (약 5분 소요)',
    '문정 컬처밸리 지하연결통로를 통해 C동 연결 엘리베이터 이용 가능',
  ],
  bus: [
    '문정법조단지·건영아파트 정류장: 간선 302, 303, 360, 362 / 지선 3414, 3422',
    '문정현대지식산업센터 정류장: 마을버스 강남06, 송파02',
  ],
  car: [
    '송파대로 문정법조단지 입구 사거리에서 법원로 방면 200m 진입',
    '문정현대지식산업센터 지하 1층~지하 4층 자주식 주차장 완비 (방문객 무료 1시간 제공)',
  ],
};
