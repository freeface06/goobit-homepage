/**
 * @intent Service domains, competencies, methodology, and client track record SSOT
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import { ServiceDomain } from '../types';

export const SERVICES_DATA: ServiceDomain[] = [
  {
    id: 'public-si',
    title: '공공 정보화 SI',
    englishTitle: 'Public Sector System Integration',
    shortDesc: '전자정부 표준프레임워크 기반의 고신뢰 대국민·대행정 정보화 시스템 구축',
    fullDesc: '중앙행정기관 및 공공기관의 복잡한 비즈니스 로직을 표준화하고, 대국민 서비스 안정성과 엄격한 국가 보안 규격을 완벽하게 충족하는 엔터프라이즈 시스템 구축을 수행합니다. 클라우드 네이티브 기반 전자정부 표준프레임워크 4.x를 적용하여 변화하는 정책에 유연하게 대응합니다.',
    coreCompetencies: [
      '전자정부 표준프레임워크(eGovFrame) 기반 클라우드 네이티브 아키텍처 수립',
      '국가정보원 보안성 검토 및 개인정보 영향평가 100% 대응 체계',
      '장애인·고령자 차별 없는 KWCAG 2.1 웹 접근성 품질마크 획득 보장',
      '레거시 행정 DB 무중단 마이그레이션 및 이기종 연계 표준 API 구현',
    ],
    majorClients: ['농림축산식품부', 'KOTRA', '경찰청', '서울특별시', '농정원(EPIS)'],
    techStack: ['Java 17', 'Spring Boot 3', '전자정부 표준프레임워크 4.x', 'Tibero', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
  {
    id: 'telecom-ito',
    title: '통신·미디어 대용량 ITO',
    englishTitle: 'Telecom & Media High-Volume ITO',
    shortDesc: '초대용량 트래픽 환경의 24/365 무중단 운영 및 시스템 최적화',
    fullDesc: '수천만 사용자가 동시에 이용하는 대한민국 최대 통신사 KT의 주요 포털 및 미디어 플랫폼을 전담 운영해 온 노하우로, 피크 시간대에도 지연 없는 고가용성 IT 아웃소싱 서비스를 제공합니다. 장애 사전 감지 및 능동적 예방 체계를 통해 서비스 연속성을 극대화합니다.',
    coreCompetencies: [
      '일 방문자 수천만 명 규모 대용량 트래픽 분산 및 고속 캐싱 아키텍처',
      '실시간 APM 모니터링 기반 장애 징후 사전 감지 및 자동 복구(Auto-healing)',
      'SLA(서비스 수준 협약) 99.99% 이상의 고신뢰 운영 지표 10개년 유지',
      '마케팅 프로모션 및 신규 단말 출시 시점 탄력적 오토스케일링 제어',
    ],
    majorClients: ['KT (올레닷컴)', 'KT (C-Cube 미디어)', 'KT 멤버십', 'KT DS'],
    techStack: ['Spring Cloud', 'Redis Cluster', 'Apache Kafka', 'Nginx', 'WhaTap APM', 'ELK Stack'],
  },
  {
    id: 'edutech',
    title: '스마트 교육 & LMS',
    englishTitle: 'Smart EduTech & Learning Management',
    shortDesc: '차세대 인터랙티브 교육 플랫폼 및 기업 맞춤형 학습 관리 시스템 구축',
    fullDesc: '원격 교육의 품질과 몰입도를 극대화하는 차세대 에듀테크 솔루션을 설계합니다. 대규모 동시 접속 온라인 강의 스트리밍부터 학습자 개별 성취도 분석, 실시간 평가 관리까지 교육의 전 과정을 디지털로 연결합니다.',
    coreCompetencies: [
      '동시 접속 5만 명 이상 고품질 동영상 스트리밍 및 글로벌 CDN 최적화',
      'SCORM/xAPI 표준 기반 학습자 진도 및 상호작용 행동 데이터 실시간 수집',
      'PC·태블릿·스마트폰 100% 반응형 반응형 크로스플랫폼 학습 인터페이스',
      '온라인 시험 부정행위 방지 및 실시간 자동 채점·성적 리포트 엔진',
    ],
    majorClients: ['EBS (한국교육방송공사)', '현대자동차 글로벌 인재개발원', '공공 인재개발 포털'],
    techStack: ['React', 'Node.js', 'WebRTC', 'AWS MediaServices', 'Python Analytics', 'MariaDB'],
  },
  {
    id: 'consulting',
    title: 'AI·DX 아키텍처 컨설팅',
    englishTitle: 'AI & Digital Transformation Consulting',
    shortDesc: '기업 맞춤형 지식그래프 모델링 및 생성형 AI 도입 로드맵 수립',
    fullDesc: '조직의 현업 프로세스를 정밀 진단하고, 데이터 자산의 가치를 극대화할 수 있는 실현 가능한 AI 도입 전략을 제시합니다. 비정형 문서의 지식자산화부터 RAG 타당성 PoC, 온프레미스 인프라 사이징까지 전문 컨설턴트가 전 과정을 함께합니다.',
    coreCompetencies: [
      '사내 규정 및 비정형 문서 기반 지식그래프(Knowledge Graph) 온톨로지 설계',
      '엔터프라이즈 생성형 AI 도입 타당성 검증(PoC) 및 ROI 정량적 산출',
      '데이터 외부 유출 방지를 위한 망분리 온프레미스 AI 보안 거버넌스 수립',
      '레거시 모놀리식 시스템의 마이크로서비스(MSA) 전환 기술 로드맵',
    ],
    majorClients: ['공공 연구원', '제조 대기업', '금융·보험 컴플라이언스 조직', '문화재단'],
    techStack: ['Neo4j', 'LangChain', 'LlamaIndex', 'vLLM', 'pgvector', 'FastAPI'],
  },
];

export const SERVICE_METHODOLOGY = [
  {
    step: '01',
    phase: '분석 및 진단 (Analysis)',
    description: '고객 비즈니스 프로세스 상세 분석, 데이터 자산 진단, AI 도입 요건 및 법적 규제 준수 여부 정밀 검토',
  },
  {
    step: '02',
    phase: '아키텍처 설계 (Architecture)',
    description: '전자정부 표준프레임워크 및 클라우드 네이티브 MSA 설계, 지식그래프 온톨로지 및 보안 거버넌스 수립',
  },
  {
    step: '03',
    phase: '개발 및 검증 (Implementation & PoC)',
    description: '애자일 스프린트 기반 고품질 컴포넌트 개발, RAG 정확도 검증, 웹 접근성 및 성능 부하 테스트',
  },
  {
    step: '04',
    phase: '운영 및 AI 고도화 (Operation & Evolution)',
    description: '무중단 서비스 런칭, 24/365 모니터링 체계 가동, 사용자 피드백 기반 파인튜닝 및 지속적 지식 업데이트',
  },
];
