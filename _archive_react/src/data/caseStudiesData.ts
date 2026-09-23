/**
 * @intent Enterprise Case Studies and References SSOT data
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import { CaseStudyItem, FaqItem } from '../types';

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'case-kt',
    client: 'KT',
    category: 'telecom',
    categoryLabel: '통신·미디어',
    projectTitle: 'KT 올레닷컴 및 C-Cube 통합 미디어 포털 무중단 ITO 운영',
    period: '2016 - 2024 (8개년 연속 수행)',
    description: '대한민국 최대 통신사의 대고객 핵심 접점인 올레닷컴 포털과 C-Cube 콘텐츠 유통 플랫폼의 대규모 트래픽을 24/365 무중단으로 운영하며 무장애 시스템 환경을 유지했습니다.',
    keyOutcomes: [
      '일 평균 트래픽 수천만 건 처리 시 99.99% 가용성 및 0건의 중대 장애 달성',
      '신규 아이폰 출시 및 대규모 이벤트 시 분당 수십만 트래픽 자동 확장 제어',
      '자체 APM 모니터링 연동으로 장애 인지 시간 5분 이내 단축',
    ],
    techHighlights: ['Spring Cloud', 'Redis Cluster', 'Nginx L4/L7 로드밸런싱', 'Kafka', 'WhaTap'],
  },
  {
    id: 'case-mafra',
    client: '농림축산식품부',
    category: 'public',
    categoryLabel: '공공 정보화',
    projectTitle: '차세대 대국민 농정 정보 포털 및 행정 지원 시스템 고도화',
    period: '2021 - 2023',
    description: '농림축산식품부의 대국민 서비스 창구를 통합하고, 행정 실무자가 손쉽게 정책 정보를 배포·관리할 수 있도록 자체 솔루션 TBCMS를 기반으로 전면 재구축했습니다.',
    keyOutcomes: [
      '웹 접근성(WA) 품질인증 마크 획득 및 전 국민 모바일·PC 반응형 정보 접근권 보장',
      '분산되어 있던 15개 산하 행정 웹페이지를 단일 TBCMS 관리자 플랫폼으로 통합',
      '전자정부 표준프레임워크 4.x 기반으로 데이터 보안 규격 및 국정원 보안성 검토 완료',
    ],
    techHighlights: ['전자정부 표준프레임워크', 'TBCMS', 'Tibero DBMS', 'KRDS 표준 가이드라인'],
  },
  {
    id: 'case-spo',
    client: '서울시립교향악단',
    category: 'culture',
    categoryLabel: '문화예술',
    projectTitle: '스마트 오케스트라 운영관리 솔루션 (OPMS) 구축 및 디지털 전환',
    period: '2018 - 2024 (지속 고도화)',
    description: '국내 최고 권위의 서울시립교향악단의 복잡한 공연 편성, 아티스트 스케줄링, 수만 권의 악보 자산을 체계적으로 관리하는 전용 ERP 솔루션 OPMS를 구축했습니다.',
    keyOutcomes: [
      '수작업으로 진행되던 단원/객원 연주자 스케줄링 및 출연료 정산 시간 80% 절감',
      '디지털 악보 바코드 추적 시스템 구축으로 악보 분실률 0% 달성',
      '모바일 웹 PUSH 기반 긴급 리허설 변경 사항 실시간 전송 체계 확립',
    ],
    techHighlights: ['OPMS (저작권 등록)', 'React', 'RESTful API', '모바일 웹 PUSH', '바코드 스캐너 연동'],
  },
  {
    id: 'case-hyundai',
    client: '현대자동차',
    category: 'education',
    categoryLabel: '스마트 교육',
    projectTitle: '현대자동차 글로벌 인재개발원 디지털 학습 플랫폼(LMS) 구축',
    period: '2019 - 2021',
    description: '전 세계 사업장의 임직원들이 물리적 제약 없이 직무 교육과 인터랙티브 기술 트레이닝을 이수할 수 있는 고성능 글로벌 학습 관리 시스템을 공급했습니다.',
    keyOutcomes: [
      '동시 접속 3만 명 이상 부하 테스트 통과 및 전 세계 저지연 CDN 동영상 스트리밍',
      '학습자 인터랙티브 퀴즈 및 AI 추천 학습 경로 매칭으로 이수율 35% 향상',
      'SCORM 2004 및 xAPI 국제 표준 규격 준수 데이터 수집 파이프라인 완성',
    ],
    techHighlights: ['React', 'Node.js', 'AWS CloudFront', 'MediaConvert', 'Redis'],
  },
  {
    id: 'case-police',
    client: '경찰청',
    category: 'public',
    categoryLabel: '공공 정보화',
    projectTitle: '치안 행정 민원 서비스 웹 표준화 및 보안 인프라 강화',
    period: '2020 - 2022',
    description: '대국민 치안 민원 접수 및 행정 절차 안내 시스템의 노후화된 액티브X를 100% 제거하고, 시각장애인 및 고령자 친화적 웹 환경으로 개편했습니다.',
    keyOutcomes: [
      '노-플러그인(No-Plugin) 완전 웹 표준 전환 및 보안 모듈 전자서명 간소화',
      '행정안전부 대국민 서비스 웹 호환성 및 웹 접근성 전수 검사 만점 획득',
    ],
    techHighlights: ['HTML5/CSS3', '전자정부 프레임워크', 'GPKI 인증 연동', '보안 취약점 제로화'],
  },
  {
    id: 'case-kotra',
    client: 'KOTRA (대한무역투자진흥공사)',
    category: 'public',
    categoryLabel: '공공 정보화',
    projectTitle: '글로벌 무역 전시 및 사이버 바이어 상담 지원 플랫폼 구축',
    period: '2021 - 2022',
    description: '국내 수출 중소기업과 해외 바이어를 온라인으로 연결하는 다국어 화상 상담 및 디지털 쇼케이스 플랫폼을 구축하여 비대면 수출 활성화에 기여했습니다.',
    keyOutcomes: [
      '다국어(영어, 중국어, 스페인어 등 5개 국어) 자동 번역 및 콘텐츠 동기화',
      '글로벌 바이어의 시차를 고려한 스마트 상담 매칭 알고리즘 적용',
    ],
    techHighlights: ['다국어 CMS', 'WebRTC 화상 솔루션 연동', 'AWS Global Accelerator'],
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'AI 솔루션',
    question: 'Goobit AI Suite는 사내 망분리(폐쇄망) 환경에서도 설치 및 운영이 가능한가요?',
    answer: '네, 가능합니다. Goobit AI Suite는 외부 인터넷 연결이 차단된 완전한 폐쇄망 온프레미스(On-Premise) 환경에 구축할 수 있도록 경량 고성능 오픈소스 LLM(Llama 3, EXAONE 등)과 온프레미스 벡터 DB 및 지식그래프 엔진을 완벽히 지원합니다. 고객사의 기밀 문서가 외부로 1바이트도 유출되지 않도록 엄격한 보안을 보장합니다.',
  },
  {
    id: 'faq-2',
    category: '도입 기간',
    question: 'AI 솔루션 또는 CMS 도입 시 평균 구축 기간과 절차는 어떻게 되나요?',
    answer: '표준 솔루션(TBCMS, OPMS)의 경우 기본 커스터마이징 포함 약 1~2개월 내에 오픈이 가능합니다. Goobit AI Suite의 경우, 사전 데이터 진단 및 지식그래프 모델링 PoC(약 3~4주)를 거쳐 본 시스템 구축(약 2~3개월) 순서로 안전하게 진행됩니다.',
  },
  {
    id: 'faq-3',
    category: '솔루션 호환성',
    question: 'TBCMS는 기존에 사용 중인 그룹웨어 및 대내 레거시 시스템과 연동이 가능한가요?',
    answer: 'TBCMS는 행정안전부 전자정부 표준프레임워크 최신 4.x 기반으로 설계되어 있습니다. 표준 RESTful API, SSO(단일 로그인), LDAP, 사내 그룹웨어 및 DBMS(Tibero, Oracle, PostgreSQL 등)와 유연하고 안정적인 연동을 보장합니다.',
  },
  {
    id: 'faq-4',
    category: '문화예술 ERP',
    question: 'OPMS는 오케스트라 외에 합창단, 무용단, 극단 등 다른 공연 예술 단체에서도 활용할 수 있나요?',
    answer: '네, 문화예술 단체 전반에 걸쳐 맞춤 적용이 가능합니다. 아티스트 파트 편성, 연습실 및 리허설 캘린더, 객원 출연자 전자계약, 대여 자산 관리 등 문화예술 단체에 공통적으로 요구되는 핵심 기능이 모듈화되어 있어 단체 성격에 맞게 선택 도입하실 수 있습니다.',
  },
  {
    id: 'faq-5',
    category: '견적 및 기술 지원',
    question: '유지보수 서비스 및 기술 지원 SLA 체계는 어떻게 구성되나요?',
    answer: '구비트는 KT 대용량 통신 포털 8개년 연속 무중단 ITO를 수행한 전문 운영 인력을 보유하고 있습니다. 장애 접수 즉시 30분 이내 대응, 2시간 이내 1차 조치를 원칙으로 하는 24/365 핫라인 운영과 월간 정기 점검 리포트를 기본 제공합니다.',
  },
];

export const PARTNERS_LIST = [
  { name: 'KT', englishName: 'KT Corporation', role: '통신·미디어 파트너' },
  { name: '농림축산식품부', englishName: 'MAFRA', role: '중앙행정기관' },
  { name: '서울시립교향악단', englishName: 'Seoul Philharmonic Orchestra', role: '문화예술 파트너' },
  { name: '현대자동차', englishName: 'Hyundai Motor Company', role: '엔터프라이즈' },
  { name: '경찰청', englishName: 'Korean National Police Agency', role: '공공 치안' },
  { name: 'KOTRA', englishName: 'KOTRA', role: '글로벌 무역진흥' },
  { name: 'EBS', englishName: 'Korea Educational Broadcasting System', role: '교육 미디어' },
  { name: '서울특별시', englishName: 'Seoul Metropolitan Government', role: '지자체' },
  { name: '농림수산식품교육문화정보원', englishName: 'EPIS', role: '공공 교육' },
  { name: '서울디지털재단', englishName: 'Seoul Digital Foundation', role: '스마트 시티' },
];
