/**
 * @intent Enterprise global data store for Goobit corporate website including menus, legal info, mega menu, products, services, case studies, and card news
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

const LEGAL_INFO = {
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

const NAVIGATION_MENUS = [
  {
    id: 'company',
    label: '회사소개',
    englishLabel: 'About Us',
    url: 'company.html',
    subItems: [
      { id: 'overview', label: '기업 개요 및 비전', description: '가치에 진심을 담는 기술 중심 기업', anchor: 'overview', url: 'company.html#overview' },
      { id: 'ceo', label: 'CEO 인사말', description: '고객 성공과 지속가능한 DX 파트너십', anchor: 'ceo', url: 'company.html#ceo' },
      { id: 'history', label: '주요 연혁', description: '2015년부터 축적된 기술 혁신의 궤적', anchor: 'history', url: 'company.html#history' },
      { id: 'certifications', label: '인증 및 특허', description: '소프트웨어 저작권 및 벤처 인증 현황', anchor: 'certifications', url: 'company.html#certifications' },
      { id: 'location', label: '찾아오시는 길', description: '문정 현대지식산업센터 본사 오시는 길', anchor: 'location', url: 'company.html#location' },
    ],
  },
  {
    id: 'products',
    label: '제품',
    englishLabel: 'Products',
    url: 'products.html',
    subItems: [
      { id: 'ai-suite', label: 'Goobit AI Suite', description: '지식그래프 및 RAG 기반 엔터프라이즈 AI', badge: 'NEW', anchor: 'ai-suite', url: 'products.html#ai-suite' },
      { id: 'tbcms', label: 'TBCMS', description: '통합 콘텐츠 및 반응형 포털 관리 솔루션', badge: 'GS 1등급', anchor: 'tbcms', url: 'products.html#tbcms' },
      { id: 'opms', label: 'OPMS', description: '스마트 오케스트라 및 공연 단체 운영 관리 시스템', badge: '특허등록', anchor: 'opms', url: 'products.html#opms' },
    ],
  },
  {
    id: 'services',
    label: '서비스',
    englishLabel: 'Services',
    url: 'services.html',
    subItems: [
      { id: 'public-si', label: '공공 정보화 SI', description: '전자정부 표준프레임워크 기반 대규모 시스템 구축', anchor: 'public-si', url: 'services.html#public-si' },
      { id: 'telecom-ito', label: '통신·미디어 ITO', description: 'KT 대용량 플랫폼 24/365 고신뢰 운영 및 유지관리', anchor: 'telecom-ito', url: 'services.html#telecom-ito' },
      { id: 'edutech', label: '스마트 교육 및 LMS', description: 'EBS 등 차세대 에듀테크 플랫폼 아키텍처', anchor: 'edutech', url: 'services.html#edutech' },
      { id: 'consulting', label: 'AI·DX 컨설팅', description: '기업 맞춤형 인공지능 전환 및 인프라 로드맵 수립', anchor: 'consulting', url: 'services.html#consulting' },
    ],
  },
  {
    id: 'news',
    label: '회사소식',
    englishLabel: 'Newsroom',
    url: 'news.html',
    subItems: [
      { id: 'all', label: '전체 소식', description: '구비트의 최신 동향과 기술 스토리', anchor: 'all', url: 'news.html?category=all' },
      { id: 'press', label: '보도자료', description: '언론 속 구비트와 주요 성과 발표', anchor: 'press', url: 'news.html?category=press' },
      { id: 'tech', label: '기술·DX 스토리', description: 'AI 지식그래프 및 RAG 개발기', anchor: 'tech', url: 'news.html?category=tech' },
      { id: 'culture', label: '사내 소식', description: '구비트 피플과 조직 문화 이야기', anchor: 'culture', url: 'news.html?category=culture' },
    ],
  },
  {
    id: 'contact',
    label: '문의하기',
    englishLabel: 'Contact Us',
    url: 'contact.html',
    subItems: [
      { id: 'inquiry', label: '프로젝트 도입 문의', description: 'AI 솔루션 및 시스템 구축 견적 상담', anchor: 'inquiry', url: 'contact.html#inquiry' },
      { id: 'support', label: '기술 지원 데스크', description: '솔루션 유지보수 및 핫라인 안내', anchor: 'support', url: 'contact.html#support' },
      { id: 'directions', label: '오시는 길 안내', description: '대중교통 및 주차 안내', anchor: 'directions', url: 'contact.html#directions' },
    ],
  },
];

const MEGA_MENU_DATA = {
  company: {
    featuredCard: {
      image: 'images/goobit_ai_dashboard.jpg',
      badge: '기업 소개',
      title: '가치에 진심을 담는 기업',
      description: '공공·통신 10여 년의 미션 크리티컬 시스템 운영 노하우와 지속가능한 DX 파트너십',
      targetUrl: 'company.html#overview',
    },
    columns: [
      {
        title: '기업 개요',
        items: [
          { id: 'overview', label: '기업 개요 및 비전', description: '가치에 진심을 담는 기술 중심 기업', url: 'company.html#overview' },
          { id: 'ceo', label: 'CEO 인사말', description: '고객 성공과 지속가능한 DX 파트너십', url: 'company.html#ceo' },
          { id: 'history', label: '주요 연혁', description: '2015년부터 축적된 기술 혁신의 궤적', url: 'company.html#history' },
        ],
      },
      {
        title: '신뢰 & 인증',
        items: [
          { id: 'certifications', label: '인증 및 특허', description: '소프트웨어 저작권 및 벤처기업 인증', badge: 'GS/특허', url: 'company.html#certifications' },
          { id: 'mainbiz', label: '경영혁신형 기업', description: '중소벤처기업부 Main-Biz 인증', url: 'company.html#certifications' },
        ],
      },
      {
        title: '찾아오시는 길',
        items: [
          { id: 'location', label: '문정 본사 안내', description: '현대지식산업센터 C동 408호', url: 'company.html#location' },
          { id: 'directions', label: '대중교통 및 주차', description: '8호선 문정역 4번 출구 도보 5분', url: 'company.html#location' },
        ],
      },
    ],
  },
  products: {
    featuredCard: {
      image: 'images/goobit_ai_dashboard.jpg',
      badge: '핵심 AI 솔루션',
      title: 'Goobit AI Suite',
      description: '지식그래프 & 하이브리드 RAG로 완성하는 엔터프라이즈 자율형 인공지능 플랫폼',
      targetUrl: 'products.html#ai-suite',
    },
    columns: [
      {
        title: '차세대 AI 솔루션',
        items: [
          { id: 'ai-suite', label: 'Goobit AI Suite', description: '지식그래프 & RAG 기반 엔터프라이즈 AI', badge: 'NEW', url: 'products.html#ai-suite' },
          { id: 'ai-rag', label: '하이브리드 RAG 엔진', description: '0.1% 미만 환각률의 심층 추론 기술', url: 'products.html#ai-suite' },
          { id: 'ai-agent', label: '자율 AI 에이전트', description: '업무 파이프라인 자동화 워크플로우', url: 'products.html#ai-suite' },
        ],
      },
      {
        title: '공공 & 웹 CMS',
        items: [
          { id: 'tbcms', label: 'TBCMS 3.0', description: '통합 콘텐츠 및 전자정부 반응형 CMS', badge: 'GS 1등급', url: 'products.html#tbcms' },
          { id: 'kwcag', label: '웹 접근성 엔진', description: 'KWCAG 2.2 표준 인증 준수 컴포넌트', url: 'products.html#tbcms' },
        ],
      },
      {
        title: '특화 운영 플랫폼',
        items: [
          { id: 'opms', label: 'OPMS 2.0', description: '공연 단체 및 오케스트라 통합 관리', badge: '특허등록', url: 'products.html#opms' },
          { id: 'symphony', label: '서울시향 구축 사례', description: '공연 일정·단원·악보 자산 단일화', url: 'products.html#opms' },
        ],
      },
    ],
  },
  services: {
    featuredCard: {
      image: 'images/goobit_ai_agent_flow.jpg',
      badge: '엔터프라이즈 DX',
      title: '공공·통신 대규모 SI & ITO',
      description: '24/365 무중단 고신뢰 아키텍처와 엔터프라이즈 최적화 DX 컨설팅',
      targetUrl: 'services.html#public-si',
    },
    columns: [
      {
        title: '공공 정보화 SI',
        items: [
          { id: 'public-si', label: '공공 시스템 구축', description: '전자정부 표준프레임워크 기반 대규모 SI', url: 'services.html#public-si' },
          { id: 'public-infra', label: '행정·대국민 포털', description: '안정적인 다중 분산 아키텍처 설계', url: 'services.html#public-si' },
        ],
      },
      {
        title: '통신·미디어 ITO',
        items: [
          { id: 'telecom-ito', label: '통신 플랫폼 운영', description: 'KT 대용량 플랫폼 24/365 고신뢰 운영', url: 'services.html#telecom-ito' },
          { id: 'traffic-mgmt', label: '대용량 트래픽 관제', description: '무장애 무중단 서비스 레벨 보장', url: 'services.html#telecom-ito' },
        ],
      },
      {
        title: '에듀테크 & DX 컨설팅',
        items: [
          { id: 'edutech', label: '스마트 교육 및 LMS', description: 'EBS 등 차세대 에듀테크 플랫폼 아키텍처', url: 'services.html#edutech' },
          { id: 'consulting', label: 'AI·DX 로드맵 수립', description: '기업 맞춤형 인공지능 전환 및 인프라 설계', url: 'services.html#consulting' },
        ],
      },
    ],
  },
  news: {
    featuredCard: {
      image: 'images/goobit_video_poster.jpg',
      badge: '구비트 뉴스룸',
      title: '구비트 최신 카드뉴스',
      description: '국책 연구과제 주관기관 선정 및 신제품 릴리즈, 사내 혁신 스토리를 카드뉴스로 확인하세요',
      targetUrl: 'news.html',
    },
    columns: [
      {
        title: '보도자료',
        items: [
          { id: 'press', label: '보도자료 전체', description: '언론 속 구비트와 주요 사업 성과 발표', url: 'news.html?category=press' },
          { id: 'rag-grant', label: 'RAG 국책과제 선정', description: 'AI 지식그래프 하이브리드 RAG 주관', badge: '주요성과', url: 'news.html?category=press' },
        ],
      },
      {
        title: '기술·DX 스토리',
        items: [
          { id: 'tech', label: '기술 아티클', description: '지식그래프 & RAG 아키텍처 심층 해부', url: 'news.html?category=tech' },
          { id: 'cms-release', label: 'TBCMS 3.0 개발기', description: 'KWCAG 2.2 웹 접근성 준수 기술', url: 'news.html?category=tech' },
        ],
      },
      {
        title: '사내 소식 & 컬처',
        items: [
          { id: 'culture', label: '피플 & 사내소식', description: '문정 신사옥 확장 이전 및 연구소 신설', url: 'news.html?category=culture' },
          { id: 'hackathon', label: '사내 해커톤 현장', description: 'AI 에이전트로 업무 생산성 극대화', url: 'news.html?category=culture' },
        ],
      },
    ],
  },
  contact: {
    featuredCard: {
      image: 'images/goobit_ai_dashboard.jpg',
      badge: '프로젝트 도입 상담',
      title: '맞춤형 기술 도입 상담',
      description: '24시간 이내 전문 엔지니어가 비즈니스 요구사항에 맞춘 최적의 아키텍처와 솔루션을 제안합니다',
      targetUrl: 'contact.html#inquiry',
    },
    columns: [
      {
        title: '프로젝트 상담',
        items: [
          { id: 'inquiry', label: '프로젝트 도입 문의', description: '요구사항 분석 및 무상 견적 제안', url: 'contact.html#inquiry' },
          { id: 'poc', label: 'AI PoC 검증 신청', description: '기업 데이터 기반 지식그래프 사전 실증', url: 'contact.html#inquiry' },
        ],
      },
      {
        title: '고객 지원 데스크',
        items: [
          { id: 'support', label: '기술 지원 데스크', description: '운영 중인 고객사 시스템 전담 지원', url: 'contact.html#support' },
          { id: 'hotline', label: '긴급 유지보수 핫라인', description: '24시간 기술 지원 및 장애 대응 안내', url: 'contact.html#support' },
        ],
      },
      {
        title: '본사 방문 안내',
        items: [
          { id: 'directions', label: '오시는 길 안내', description: '문정 현대지식산업센터 C동 408호', url: 'contact.html#directions' },
          { id: 'parking', label: '주차 및 방문 예약', description: '방문객 2시간 무료 주차 지원', url: 'contact.html#directions' },
        ],
      },
    ],
  },
};

const COMPANY_OVERVIEW = {
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

const CEO_MESSAGE = {
  quote: '기술의 본질은 고객의 비즈니스 가치를 높이고 사람의 가능성을 확장하는 데 있습니다.',
  bodyParagraphs: [
    '주식회사 구비트는 2015년 설립 이래 공공, 통신, 교육, 문화예술 등 대한민국 핵심 산업의 중추 시스템을 구축하고 무중단으로 운영하며 고객과 함께 성장해 왔습니다.',
    '농림축산식품부, KT, 서울시립교향악단 등 신뢰도가 최우선인 엔터프라이즈 고객사들이 10년 넘게 구비트를 선택해 주신 이유는 오직 하나, \'가치에 진심을 담는다\'는 원칙을 단 한 번도 타협하지 않았기 때문입니다.',
    '이제 우리는 생성형 AI와 지식그래프(Knowledge Graph), RAG(검색 증강 생성) 기술이 주도하는 거대한 디지털 전환(DX)의 문턱에 서 있습니다. 구비트는 검증된 대규모 SI 아키텍처 역량 위에 최첨단 엔터프라이즈 AI 기술을 결합하여, 단순한 기술 공급자를 넘어 고객의 영구적인 AI 혁신 파트너가 될 것을 약속드립니다.',
  ],
  signName: '주식회사 구비트 대표이사 구본일',
};

const COMPANY_HISTORY = [
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

const CERTIFICATIONS = [
  {
    id: 'cert-venture',
    title: '벤처기업확인서',
    shortTitle: '벤처기업',
    category: 'venture',
    categoryLabel: '벤처·혁신',
    issuer: '기술보증기금 이사장',
    date: '2015.11',
    image: 'images/certifications/venture.png',
    badge: '국가공인',
    description: '벤처기업육성에 관한 특별조치법 제25조 규정에 의거 우수한 기술력과 성장 잠재력을 공식 입증받은 벤처기업 확인서',
  },
  {
    id: 'cert-innobiz',
    title: '기술혁신형 중소기업(Inno-Biz) 확인서',
    shortTitle: '기술혁신형 중소기업(Inno-biz) 확인서',
    category: 'venture',
    categoryLabel: '벤처·혁신',
    issuer: '중소벤처기업부장관',
    date: '2023.06',
    image: 'images/certifications/innobiz.jpg',
    badge: '중기부 인증',
    description: '중소기업기술혁신촉진법에 따라 기술 우위를 바탕으로 경쟁력을 확보한 기술혁신형 중소기업(Inno-Biz) 공식 인증',
  },
  {
    id: 'cert-iso',
    title: '품질경영시스템인증서 (ISO 9001:2015)',
    shortTitle: '품질경영시스템인증서',
    category: 'quality',
    categoryLabel: '품질·기술평가',
    issuer: 'ICR 국제인증원 / JCR',
    date: '2021.02',
    image: 'images/certifications/iso.png',
    badge: '국제 표준',
    description: '응용 소프트웨어 개발, 인프라 구축 및 시스템 운영 컨설팅 등 ICT 전 영역의 국제 표준 품질경영 규격 인증',
  },
  {
    id: 'cert-nice',
    title: '우수기술기업 인증서 (T4 우수기업)',
    shortTitle: '우수기술기업 인증서',
    category: 'quality',
    categoryLabel: '품질·기술평가',
    issuer: 'NICE평가정보 대표이사',
    date: '2020.11',
    image: 'images/certifications/cta_nice.png',
    badge: 'NICE 공인',
    description: '나이스디앤비 및 나이스평가정보의 기술신용평가(TCB) 결과 상위 기술등급(T4)을 획득하여 입증된 기술 경쟁력',
  },
  {
    id: 'cert-koita',
    title: '기업부설연구소 인정서',
    shortTitle: '기업부설연구소',
    category: 'venture',
    categoryLabel: '연구개발',
    issuer: '미래창조과학부 · 한국산업기술진흥협회',
    date: '2015.08',
    image: 'images/certifications/koita.png',
    badge: '연구소 공인',
    description: '기초연구진흥 및 기술개발지원에 관한 법률에 의거 (주)구비트 기술연구소로 공식 지정 및 R&D 역량 공인',
  },
  {
    id: 'cert-software',
    title: '소프트웨어사업자 신고확인서',
    shortTitle: '소프트웨어 사업자',
    category: 'official',
    categoryLabel: '공식 면허',
    issuer: '한국소프트웨어산업협회장',
    date: '2015.06',
    image: 'images/certifications/software.png',
    badge: 'KOSA 공인',
    description: '소프트웨어산업진흥법 제24조에 따라 시스템 통합 및 솔루션 개발 전문 기업으로 등록된 공인 사업자',
  },
  {
    id: 'cert-jungso',
    title: '중소기업확인서 [소기업]',
    shortTitle: '중소기업확인서',
    category: 'official',
    categoryLabel: '경영·기업',
    issuer: '중소벤처기업부',
    date: '2020.04',
    image: 'images/certifications/jungso.jpg',
    badge: '중기부 확인',
    description: '중소기업기본법 제2조 및 같은 법 시행령 제8조에 의거 성실 납세 및 정상 운영을 공인받은 중소기업 확인',
  },
  {
    id: 'cert-hpe',
    title: 'HPE 공식 파트너 (Business Partner)',
    shortTitle: 'HPE 파트너',
    category: 'official',
    categoryLabel: '파트너십',
    issuer: 'Hewlett Packard Enterprise',
    date: '2015.09',
    image: 'images/certifications/hpe.png',
    badge: '글로벌 파트너',
    description: '글로벌 엔터프라이즈 IT 기업 HPE의 공식 비즈니스 파트너로서 고성능 서버/스토리지 인프라 협력 체계 가동',
  },
  {
    id: 'cert-opms',
    title: 'OPMS 공연관리시스템 저작권등록증',
    shortTitle: 'OPMS 저작권등록증',
    category: 'copyright',
    categoryLabel: 'SW 저작권',
    issuer: '한국저작권위원회',
    date: '2017.09',
    image: 'images/certifications/program.jpg',
    badge: '원천 저작권',
    description: '오케스트라 및 공연 예술 단체의 단원, 일정, 악보 아카이브를 통합 관리하는 솔루션(OPMS) 원천 저작권 등록',
  },
  {
    id: 'cert-tbcms',
    title: 'TBCMS 콘텐츠관리시스템 저작권등록증',
    shortTitle: 'TBCMS 저작권등록증',
    category: 'copyright',
    categoryLabel: 'SW 저작권',
    issuer: '한국저작권위원회',
    date: '2015.08',
    image: 'images/certifications/program.jpg',
    badge: '원천 저작권',
    description: '다채널 반응형 포털 게시판 및 통합 콘텐츠 관리 소프트웨어(TBCMS)의 고유 기술 원천 저작권 등록',
  },
  {
    id: 'cert-gs-cms',
    title: 'TBCMS GS 인증서 (소프트웨어품질인증 1등급)',
    shortTitle: 'TBCMS GS 인증서',
    category: 'quality',
    categoryLabel: '품질인증 1등급',
    issuer: '한국정보통신기술협회 (TTA)',
    date: '2021.02',
    image: 'images/certifications/gs_cms.png',
    badge: 'GS 1등급',
    description: '과기정통부 국가 소프트웨어 품질인증 규격(Good Software) 최고 1등급을 획득하여 신뢰성·보안성 공식 입증',
  },
  {
    id: 'cert-gv-cms',
    title: 'TBCMS 전자정부 표준프레임워크 호환성 확인서',
    shortTitle: 'TBCMS 전자정부프레임워크 호환성 인증',
    category: 'quality',
    categoryLabel: '공공 호환성',
    issuer: '한국지능정보사회진흥원 (NIA)',
    date: '2021.02',
    image: 'images/certifications/gv_cms.png',
    badge: 'eGov 호환성',
    description: '행정안전부 전자정부 표준프레임워크(eGovFrame)와 상호 호환성을 100% 만족함을 공식 검증받은 솔루션',
  },
];

const LOCATION_DIRECTIONS = {
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

const STATS_DATA = [
  {
    iconName: 'calendar',
    value: '10+',
    unit: '년',
    label: '엔터프라이즈 업력',
    description: '2015년 법인 설립 이래 미션 크리티컬 SI/ITO 전담',
  },
  {
    iconName: 'check-square',
    value: '100+',
    unit: '건',
    label: '메이저 프로젝트 완수',
    description: '중앙부처, 지자체, 통신 대기업 정보화 레퍼런스',
  },
  {
    iconName: 'activity',
    value: '99.9%',
    unit: '가용성',
    label: '무중단 서비스 연속성',
    description: '일 트래픽 5,000만 뷰 통신 포털 8개년 연속 무장애',
  },
  {
    iconName: 'handshake',
    value: '15+',
    unit: '개사',
    label: '핵심 고객사 & 파트너',
    description: 'KT, 농림축산식품부, 서울시향 등 장기 파트너십',
  },
];

const AI_CAPABILITIES = [
  {
    iconName: 'network',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/60',
    badge: '지식 구조화 & RAG',
    title: '하이브리드 지식그래프 & RAG',
    summary: '비정형 문서를 온톨로지로 지식자산화하여 99.8% 무환각 검색 증강 생성을 실현합니다.',
    metric: '정확도 99.8%',
    targetAnchor: 'ai-suite',
    url: 'products.html#ai-suite',
  },
  {
    iconName: 'workflow',
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-200/60',
    badge: '업무 프로세스 혁신',
    title: 'AI 업무 자동화 & 인텔리전트 코딩',
    summary: '공공 행정 양식 조판과 대용량 통신 트래픽 장애 모니터링을 자율 에이전트로 전면 자동화합니다.',
    metric: '공수 75% 절감',
    targetAnchor: 'ai-suite',
    url: 'products.html#ai-suite',
  },
  {
    iconName: 'bot',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/60',
    badge: '폐쇄망 온프레미스 보안',
    title: '엔터프라이즈 Agentic AI & 보안',
    summary: '국정원 보안 지침을 충족하는 사내 망분리 온프레미스 sLLM 배포로 데이터를 완벽히 보호합니다.',
    metric: '데이터 유출 0%',
    targetAnchor: 'ai-suite',
    url: 'products.html#ai-suite',
  },
];

const PRODUCTS_DATA = [
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

const SERVICES_DATA = [
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
      'PC·태블릿·스마트폰 100% 반응형 크로스플랫폼 학습 인터페이스',
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

const SERVICE_METHODOLOGY = [
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

const CASE_STUDIES = [
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

const FAQ_LIST = [
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

const PARTNERS_LIST = [
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

const CARD_NEWS_DATA = [
  {
    id: 'news-rag-national-project',
    category: 'press',
    categoryLabel: '보도자료',
    title: '구비트, AI 지식그래프 기반 하이브리드 RAG 국책 연구과제 주관기관 최종 선정',
    summary: '과기정통부 주관 엔터프라이즈 AI 데이터 신뢰성 검증 및 지식그래프 연계 하이브리드 RAG 기술 개발 총괄 주관기관으로 선정되어 3개년간 연구개발을 이끕니다.',
    date: '2026.03.18',
    readTime: '3분 읽기',
    cardCount: 5,
    coverGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    tags: ['AI지식그래프', '하이브리드RAG', '국책과제', '생성형AI', '엔터프라이즈AI'],
    views: 1420,
    author: '구비트 AI R&D 연구소',
    slides: [
      {
        slideNumber: 1,
        badge: '국책과제 선정',
        headline: 'AI 지식그래프 기반 하이브리드 RAG 국책과제 주관기관 최종 선정',
        subheadline: '과학기술정보통신부 및 정보통신산업진흥원(NIPA) 공모',
        description: '구비트가 공공 및 엔터프라이즈 문서의 환각(Hallucination) 현상을 원천 차단하고 온프레미스 지식 자산의 구조적 탐색을 가능케 하는 차세대 AI 연구과제의 총괄 주관기관으로 공식 선정되었습니다.',
        keyPoints: [
          '총 3개년 대규모 국책 연구개발 과제 단독 주관',
          '공공·엔터프라이즈 지식체계의 그래프 데이터베이스화 기술 실증',
          '국내 주요 산학연 컨소시엄 구성 및 기술 상용화 로드맵 가동',
        ],
        statCallout: {
          value: '99.8%',
          label: '환각 억제 및 근거 추적 정확도 목표',
        },
        bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
        accentColor: 'amber',
      },
      {
        slideNumber: 2,
        badge: '연구 배경 & 과제',
        headline: '기존 벡터 검색 RAG의 한계를 넘어 지식그래프와 결합',
        subheadline: '단순 임베딩 유사도 검색의 문맥 단절 문제 해결',
        description: '기존 벡터 DB 기반 RAG는 단어 유사도에 의존하여 복잡한 행정 규정, 법령, 기업 사규 간의 다단계 상관관계를 온전히 파악하지 못하는 한계가 있었습니다.',
        keyPoints: [
          '다단계 추론(Multi-hop Reasoning) 부재로 인한 단편적 답변 한계',
          '엔터프라이즈 도메인 특화 용어 및 엔티티 간 상호 연관성 유실 방지',
          '문서 내 표, 수식, 서식 구조의 정밀 보존 필요성 증대',
        ],
        statCallout: {
          value: '4.2배',
          label: '복합 질의 처리 심층 정확도 향상',
        },
        bgGradient: 'from-slate-900 via-navy-900 to-slate-950',
        accentColor: 'cyan',
      },
      {
        slideNumber: 3,
        badge: '핵심 아키텍처',
        headline: '구비트 하이브리드 RAG: 벡터 DB와 지식그래프의 이중 결합',
        subheadline: '고속 벡터 검색과 엄밀한 그래프 온톨로지 엔진의 상호보완 구조',
        description: '구비트의 독자 기술인 이중 색인 파이프라인은 정형 데이터와 비정형 문서를 실시간으로 엔티티-관계(Entity-Relation) 트리플로 변환하여 질문의 맥락을 완벽히 이해합니다.',
        keyPoints: [
          'Neo4j / GraphDB 기반 엔터프라이즈 온톨로지 실시간 자동 생성',
          '밀집 벡터(Dense Vector)와 희소 키워드(BM25)의 앙상블 리랭킹',
          '출처 문서의 문단 및 페이지 번호까지 100% 추적 가능한 레퍼런스 링크',
        ],
        statCallout: {
          value: '0.35초',
          label: '밀리초 단위 지식그래프 순회 탐색 속도',
        },
        bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
        accentColor: 'blue',
      },
      {
        slideNumber: 4,
        badge: '실증 및 적용 분야',
        headline: '공공 행정 법령 질의응답 및 금융·통신 특화 솔루션 탑재',
        subheadline: 'Goobit AI Suite에 국책 연구 성과 전면 이식',
        description: '개발된 핵심 기술은 구비트의 상용 엔터프라이즈 AI 제품인 Goobit AI Suite에 통합되어 보안이 필수적인 폐쇄망 환경 고객사들에 우선 공급됩니다.',
        keyPoints: [
          '망분리 폐쇄망 환경 완벽 지원 온프레미스 패키지 구성',
          '공공기관 민원 서식 및 내부 규정 질의 자동화 샌드박스 실증',
          '통신 고객센터 대화 이력 기반 상담 에이전트 어시스턴트 적용',
        ],
        statCallout: {
          value: '70%+',
          label: '내부 행정 업무 및 자료 검토 소요시간 절감',
        },
        bgGradient: 'from-slate-900 via-slate-950 to-navy-900',
        accentColor: 'emerald',
      },
      {
        slideNumber: 5,
        badge: '미래 비전',
        headline: '국내 최고 수준의 신뢰성 AI(Trustworthy AI) 표준 확립',
        subheadline: 'AI 기술 혁신으로 고객 기업의 비즈니스 가치 극대화',
        description: '구비트는 이번 국책과제를 계기로 인공지능이 도출한 모든 답변의 논리적 근거를 설명할 수 있는 설명 가능한 AI(XAI) 생태계를 선도하겠습니다.',
        keyPoints: [
          '산학연 협력 생태계 구축 및 국내외 특허 4건 출원 예정',
          '공공 디지털 플랫폼 정부(DPG) 혁신 모델 선도 공급',
          '엔터프라이즈 지식 자산의 가치를 극대화하는 책임 있는 AI 파트너',
        ],
        statCallout: {
          value: '2026',
          label: '국가 차세대 AI 표준 아키텍처 실증 완료',
        },
        bgGradient: 'from-blue-950 via-navy-900 to-slate-900',
        accentColor: 'amber',
      },
    ],
  },
  {
    id: 'news-tbcms-update',
    category: 'tech',
    categoryLabel: '기술·DX',
    title: 'TBCMS 3.0 대규모 업데이트: 웹 접근성 KWCAG 2.2 인증 및 차세대 공공 CMS 엔진 혁신',
    summary: '10년 이상 100여 개 공공·기관에 검증된 통합 콘텐츠 관리 솔루션 TBCMS가 마이크로서비스 아키텍처와 한국형 웹 콘텐츠 접근성 지침 2.2 인증을 완벽 탑재했습니다.',
    date: '2026.02.24',
    readTime: '3분 읽기',
    cardCount: 5,
    coverGradient: 'from-slate-900 via-slate-800 to-blue-950',
    tags: ['TBCMS', '웹접근성', 'KWCAG2.2', '공공CMS', '전자정부표준프레임워크'],
    views: 1180,
    author: '솔루션 사업본부 TBCMS팀',
    slides: [
      {
        slideNumber: 1,
        badge: '메이저 업데이트',
        headline: 'TBCMS 3.0 정식 릴리즈: 공공 콘텐츠 관리의 새로운 기준',
        subheadline: '한국저작권위원회 등록 솔루션의 클라우드 네이티브 진화',
        description: '누적 100건 이상의 공공 납품 실적을 보유한 구비트의 주력 CMS 솔루션 TBCMS가 클라우드 네이티브 아키텍처와 최신 웹 표준을 집약한 3.0 버전을 공식 발표했습니다.',
        keyPoints: [
          '전자정부 표준프레임워크 최신 호환성 인증 완료',
          '헤드리스(Headless) API 및 반응형 템플릿 엔진 전면 개편',
          '다기관·다포털 멀티 사이트 통합 관리 콘솔 제공',
        ],
        statCallout: {
          value: '100+',
          label: '공공기관 및 지자체 누적 납품 실적',
        },
        bgGradient: 'from-slate-900 via-navy-900 to-slate-950',
        accentColor: 'blue',
      },
      {
        slideNumber: 2,
        badge: '웹 접근성 KWCAG 2.2',
        headline: '한국형 웹 콘텐츠 접근성 지침(KWCAG) 2.2 완벽 준수',
        subheadline: '장애인 및 고령자 정보 접근성 보장을 위한 33개 세부 지침 반영',
        description: '공공기관 웹사이트의 필수 요건인 웹 접근성을 시스템 차원에서 자동 강제화하여, 비전문가 담당자도 지침 위반 없는 웹 콘텐츠를 손쉽게 배포할 수 있습니다.',
        keyPoints: [
          '이미지 업로드 시 대체 텍스트(Alt Text) AI 자동 추천 기능',
          '명도 대비 4.5:1 이상 자동 보정 및 색각 이상자 전용 테마 지원',
          '스크린 리더 완벽 호환 ARIA 랜드마크 및 건너뛰기 링크 내장',
        ],
        statCallout: {
          value: '100점',
          label: '웹 접근성 품질인증 사전 평가 통과율',
        },
        bgGradient: 'from-navy-950 via-slate-900 to-slate-950',
        accentColor: 'cyan',
      },
      {
        slideNumber: 3,
        badge: '강력한 보안 체계',
        headline: '국정원 보안 가이드라인 및 소프트웨어 개발보안(시큐어코딩) 준수',
        subheadline: 'OWASP Top 10 취약점 및 웹 취약점 100% 원천 차단',
        description: '공공 정보시스템의 생명인 보안성을 위해 시큐어 코딩 기준을 엄격히 적용하였으며, 강력한 첨부파일 악성코드 필터링 및 권한별 접근제어 체계를 구축했습니다.',
        keyPoints: [
          'SQL 인젝션, XSS, CSRF 공격 3중 방어 필터',
          '개인정보(주민등록번호, 전화번호, 이메일) 자동 마스킹 엔진 탑재',
          '관리자 2단계 인증(MFA) 및 세밀한 메뉴별 RBAC 권한 매트릭스',
        ],
        statCallout: {
          value: '0건',
          label: '최근 10개년 보안 사고 발생 이력',
        },
        bgGradient: 'from-slate-950 via-slate-900 to-navy-900',
        accentColor: 'emerald',
      },
      {
        slideNumber: 4,
        badge: '운영 효율성 혁신',
        headline: '드래그 앤 드롭 블록 빌더와 실시간 트래픽 오토스케일링',
        subheadline: '개발자 없이도 10분 만에 랜딩 페이지 제작 가능',
        description: 'UI 컴포넌트 블록 빌더를 통해 코딩 없이 직관적으로 페이지 레이아웃을 구성하며, 비상 상황의 대량 트래픽 유입에도 탄력적인 컨테이너 확장이 지원됩니다.',
        keyPoints: [
          '컴포넌트 단위 위젯 라이브러리 50종 기본 탑재',
          '대량 접속 폭주 대비 멀티 티어 캐싱(Redis/Varnish) 구조',
          '게시물 예약 발행 및 결재 승인 워크플로우 엔진 내장',
        ],
        statCallout: {
          value: '60%',
          label: '신규 페이지 기획 및 개설 공수 단축',
        },
        bgGradient: 'from-slate-900 via-blue-950 to-slate-950',
        accentColor: 'amber',
      },
      {
        slideNumber: 5,
        badge: '도입 가이드',
        headline: '기존 시스템 무중단 마이그레이션 및 전담 기술지원 보장',
        subheadline: '구비트 전문 엔지니어링팀의 책임 구축 및 SLA 기반 유지보수',
        description: '구비트는 구형 CMS나 레거시 프레임워크 기반 시스템으로부터 데이터 유실 없는 안정적인 이전 서비스를 제공합니다.',
        keyPoints: [
          '레거시 DB 스키마 자동 변환 ETL 스크립트 무상 지원',
          '정부 권장 클라우드(공공 클라우드 CSAP 인증 인프라) 최적화 배치',
          '24/365 전담 긴급 장애 대응 핫라인 및 정기 방문 점검 운영',
        ],
        statCallout: {
          value: '99.99%',
          label: '연간 시스템 가용성 보장 SLA',
        },
        bgGradient: 'from-navy-900 via-slate-900 to-blue-950',
        accentColor: 'cyan',
      },
    ],
  },
  {
    id: 'news-office-expansion',
    category: 'culture',
    categoryLabel: '사내소식',
    title: '가치에 진심을 담는 사람들: 문정 현대지식산업센터 신사옥 확장 이전 및 AI R&D 연구소 신설',
    summary: '구비트가 창립 11주년을 앞두고 송파구 문정 비즈니스 밸리 현대지식산업센터 C동으로 사옥을 확장 이전하며 전용 AI 연구소를 정식 개소했습니다.',
    date: '2026.02.10',
    readTime: '2분 읽기',
    cardCount: 4,
    coverGradient: 'from-amber-950 via-slate-900 to-slate-950',
    tags: ['사옥이전', '조직문화', 'AI연구소', '문정현대지식산업센터', '구비트피플'],
    views: 950,
    author: '피플 & 컬처팀',
    slides: [
      {
        slideNumber: 1,
        badge: '새로운 도약',
        headline: '문정 비즈니스 밸리 중심에서 구비트의 새로운 역사를 엽니다',
        subheadline: '송파구 법원로 11길 7 현대지식산업센터 C동 408호 확장 이전',
        description: '지하철 8호선 문정역 도보 5분 거리에 위치한 현대지식산업센터로 쾌적한 연구 개발 공간과 고객 협업 라운지를 갖춘 신사옥으로 전격 이전했습니다.',
        keyPoints: [
          '전용 면적 2배 확장으로 엔지니어링 및 R&D 독립 공간 확보',
          '고성능 GPU 서버룸 및 폐쇄망 온프레미스 AI 샌드박스 완비',
          '고객사 대상 솔루션 시연 및 세미나를 위한 스마트 컨퍼런스 룸 구축',
        ],
        statCallout: {
          value: '2.3배',
          label: '연구 개발 및 오피스 공간 확장 비율',
        },
        bgGradient: 'from-amber-950 via-slate-900 to-navy-950',
        accentColor: 'amber',
      },
      {
        slideNumber: 2,
        badge: '연구 환경 혁신',
        headline: 'AI R&D 전용 연구소 신설: 차세대 모델 파인튜닝과 지식그래프 집약',
        subheadline: '최신 인프라와 자율적 연구 문화가 결합된 엔지니어 중심 환경',
        description: '최첨단 딥러닝 워크스테이션과 분산 학습 클러스터를 갖춘 AI R&D 연구소가 신설되어 사내 개발자들의 연구 역량을 극대화합니다.',
        keyPoints: [
          '엔지니어 1인당 듀얼 모니터 및 인체공학 모션데스크 전면 지급',
          '최신 LLM 모델 가중치 서빙을 위한 사내 고속 로컬 네트워크망',
          '도서 구매 무제한 지원 및 글로벌 AI 콘퍼런스 참가 장려',
        ],
        statCallout: {
          value: '100%',
          label: '연구 개발 인프라 최신화 달성',
        },
        bgGradient: 'from-slate-900 via-navy-900 to-slate-950',
        accentColor: 'cyan',
      },
      {
        slideNumber: 3,
        badge: '구비트 컬처',
        headline: '\'가치에 진심을 담다\' 원칙이 녹아든 유연하고 건강한 일터',
        subheadline: '자율과 책임, 배려와 성장이 공존하는 구비트만의 피플 정책',
        description: '구비트는 엔지니어 한 명 한 명의 성장과 웰빙이 최고의 소프트웨어 품질로 이어진다는 믿음으로 업무 환경을 설계했습니다.',
        keyPoints: [
          '시차 출퇴근제 도입으로 유연한 업무 리듬 지원',
          '프리미엄 스낵바 & 에스프레소 머신 구비 카페테리아 상시 운영',
          '주기적인 테크 런치(Tech Lunch)와 크로스 도메인 지식 공유회 개최',
        ],
        statCallout: {
          value: '95%+',
          label: '임직원 조직 문화 및 근무 환경 만족도',
        },
        bgGradient: 'from-slate-950 via-slate-900 to-amber-950',
        accentColor: 'amber',
      },
      {
        slideNumber: 4,
        badge: '열린 초대',
        headline: '언제든 편안하게 찾아오실 수 있는 열린 파트너십 공간',
        subheadline: '고객과 파트너를 위한 원스톱 테크 컨설팅 라운지 상시 가동',
        description: '신사옥은 구비트 임직원뿐만 아니라 함께 고민하고 혁신을 만들어가는 고객사와 파트너 여러분 모두를 위해 활짝 열려 있습니다.',
        keyPoints: [
          '방문객 전용 무료 주차권 및 쾌적한 웰컴 티 라운지 제공',
          '현장 라이브 데모를 통한 Goobit AI Suite 및 TBCMS 시연 가능',
          '기술 상담 및 프로젝트 견적 실시간 1:1 심층 미팅 지원',
        ],
        statCallout: {
          value: '350m',
          label: '문정역 3·4번 출구에서 본사까지의 거리',
        },
        bgGradient: 'from-slate-900 via-blue-950 to-slate-900',
        accentColor: 'emerald',
      },
    ],
  },
  {
    id: 'news-rag-architecture',
    category: 'tech',
    categoryLabel: '기술·DX',
    title: '거대 언어모델(LLM)과 엔터프라이즈 데이터의 결합: 구비트 하이브리드 RAG 아키텍처 완전 해부',
    summary: '사내 비정형 문서와 정형 DB를 지식그래프로 구조화하여 LLM의 환각을 해결하는 구비트 하이브리드 RAG 파이프라인의 핵심 기술을 공개합니다.',
    date: '2026.01.28',
    readTime: '4분 읽기',
    cardCount: 5,
    coverGradient: 'from-slate-900 via-indigo-950 to-navy-950',
    tags: ['RAG', '지식그래프', 'LLM', '하이브리드검색', '온프레미스AI'],
    views: 1680,
    author: '구비트 기술연구소 AI 아키텍트',
    slides: [
      {
        slideNumber: 1,
        badge: '기술 아키텍처',
        headline: '엔터프라이즈 AI 도입의 가장 큰 장벽: 환각과 보안',
        subheadline: '공공·기업 환경에서 범용 LLM을 그대로 사용할 수 없는 이유',
        description: '생성형 AI의 잠재력에도 불구하고 기업들은 사실과 다른 정보를 생성하는 환각(Hallucination)과 사내 기밀 유출 위험 때문에 선뜻 실무에 적용하지 못하고 있습니다.',
        keyPoints: [
          '부정확한 답변으로 인한 법적·행정적 리스크 발생 가능성',
          '외부 퍼블릭 클라우드 전송에 따른 민감 내부 데이터 보안 우려',
          '수시로 개정되는 내부 규정과 지침의 실시간 반영 불가',
        ],
        statCallout: {
          value: '84%',
          label: '기업들이 꼽은 생성형 AI 도입 시 우려 요인 (정확도·보안)',
        },
        bgGradient: 'from-slate-950 via-navy-950 to-slate-900',
        accentColor: 'amber',
      },
      {
        slideNumber: 2,
        badge: '파이프라인 1단계',
        headline: '비정형 문서의 정밀 파싱과 엔티티 지식그래프 화',
        subheadline: 'PDF, 한글(HWP/HWPX), Word 내 복합 표와 문서 계층 구조 완벽 보존',
        description: '단순 텍스트 추출 방식은 문서의 맥락을 파괴합니다. 구비트 파서는 문서의 목차, 장-절-조-항 구조 및 다중 셀 표를 온톨로지 지식그래프로 재구성합니다.',
        keyPoints: [
          'HWP/HWPX 공공 표준 서식 및 복합 표 데이터 완벽 복원 파싱',
          '개체명 인식(NER) 기반 인물, 조직, 법조항, 날짜 간 관계 매핑',
          '그래프 트리플(주어-술어-목적어) 기반 인과관계 색인 구축',
        ],
        statCallout: {
          value: '99.5%',
          label: '복잡한 공공 행정 문서 표 구조 파싱 재현율',
        },
        bgGradient: 'from-slate-900 via-indigo-950 to-slate-950',
        accentColor: 'cyan',
      },
      {
        slideNumber: 3,
        badge: '파이프라인 2단계',
        headline: '하이브리드 멀티 쿼리 라우팅과 앙상블 검색',
        subheadline: '사용자 질의의 숨겨진 의미를 파악하는 지능형 검색 에이전트',
        description: '사용자가 질문을 던지면 AI 오케스트레이터가 질문을 다각도로 분석하여 벡터 유사도 검색과 그래프 횡단 탐색을 동시에 수행합니다.',
        keyPoints: [
          '질문 분해(Query Decomposition): 복합 질의를 하위 쿼리로 자동 분할',
          '지식그래프 2-hop / 3-hop 관계 추적으로 간접 연결된 맥락 탐색',
          'Cohere / BGE 기반 Cross-Encoder 리랭킹으로 상위 최적 근거 선별',
        ],
        statCallout: {
          value: '0.28초',
          label: '밀집 벡터 및 지식그래프 결합 앙상블 검색 지연 시간',
        },
        bgGradient: 'from-navy-950 via-slate-900 to-indigo-950',
        accentColor: 'blue',
      },
      {
        slideNumber: 4,
        badge: '파이프라인 3단계',
        headline: '근거 기반 생성 및 출처 역추적(Provenance Tracking)',
        subheadline: '답변 문장마다 마우스를 올리면 원문 페이지와 근거 구절이 즉시 표시',
        description: '구비트 하이브리드 RAG는 근거 자료에 없는 내용을 임의로 지어내는 것을 시스템 차원에서 차단하며, 투명한 인용 정보를 제공합니다.',
        keyPoints: [
          '인라인 각주를 통한 원본 문서(PDF/HWP) 뷰어 즉시 연동',
          '사전 정의된 근거 충실도 검증(Fact-Check) 레이어 작동',
          '근거 데이터가 불충분할 경우 솔직하게 "자료 없음"을 명시하는 안전 장치',
        ],
        statCallout: {
          value: '0.1%',
          label: '근거 없는 허위 정보 생성(환각) 발생률 미만',
        },
        bgGradient: 'from-slate-900 via-slate-950 to-navy-900',
        accentColor: 'emerald',
      },
      {
        slideNumber: 5,
        badge: '도입 효과',
        headline: '100% 폐쇄망 구동 가능한 엔터프라이즈 패키지',
        subheadline: '사내 인프라 내 완전한 데이터 주권과 보안 준수',
        description: '인터넷 연결이 차단된 온프레미스 망에서도 경량화 오픈소스 모델(sLLM)과 결합하여 최고 성능을 발휘하도록 최적화되어 있습니다.',
        keyPoints: [
          '단일 GPU 서버로도 구동 가능한 양자화(vLLM) 고속 서빙 엔진',
          '사내 Active Directory 및 그룹웨어 SSO 계정 연동 지원',
          '직급 및 부서별 열람 권한에 맞춘 문서 보안 자동 필터링',
        ],
        statCallout: {
          value: '100%',
          label: '외부 데이터 유출 차단 온프레미스 보안',
        },
        bgGradient: 'from-blue-950 via-slate-900 to-navy-950',
        accentColor: 'amber',
      },
    ],
  },
  {
    id: 'news-opms-innovation',
    category: 'press',
    categoryLabel: '보도자료',
    title: '서울시립교향악단 공연 단체 통합 관리 시스템(OPMS), 디지털 혁신 우수 사례 선정',
    summary: '아시아 최고 권위 오케스트라인 서울시립교향악단에 구축된 구비트 OPMS가 공연 행정 프로세스 디지털 전환 우수 사례로 선정되었습니다.',
    date: '2026.01.15',
    readTime: '3분 읽기',
    cardCount: 4,
    coverGradient: 'from-blue-950 via-slate-900 to-slate-950',
    tags: ['OPMS', '서울시향', '디지털혁신', '공연예술DX', '소프트웨어저작권'],
    views: 1250,
    author: '공공문화사업본부',
    slides: [
      {
        slideNumber: 1,
        badge: '우수 사례 선정',
        headline: '서울시립교향악단 OPMS, 문화예술 DX 혁신 대표 모델로 공인',
        subheadline: '공연 편성부터 악보 대여, 연주단원 스케줄링까지 전주기 전산화',
        description: '주식회사 구비트의 특허 등록 및 저작권 보유 솔루션인 OPMS가 국내 대표 예술단체인 서울시립교향악단의 행정 프로세스를 전면 디지털화한 공로를 인정받았습니다.',
        keyPoints: [
          '아날로그 장부 및 수작업 엑셀 의존 업무 방식 100% 디지털 전환',
          '지휘자, 협연자, 100여 명 단원의 복잡한 리허설 및 공연 일정 동기화',
          '고가의 클래식 악보 자산 대여·반납 및 저작권 이력 체계적 DB화',
        ],
        statCallout: {
          value: '75%',
          label: '공연 기획 및 일정 편성 소요 기간 단축',
        },
        bgGradient: 'from-blue-950 via-slate-900 to-navy-950',
        accentColor: 'blue',
      },
      {
        slideNumber: 2,
        badge: '핵심 기능',
        headline: '오케스트라 현장의 고유한 페인 포인트(Pain Point)를 해결한 맞춤 기능',
        subheadline: '공연 예술 전문 도메인 지식이 녹아든 특화 플랫폼',
        description: '일반 ERP로는 수용할 수 없는 오케스트라 고유의 악기 편성(Instrumentation), 객원 연주자 섭외, 악기별 이동 동선까지 꼼꼼히 반영했습니다.',
        keyPoints: [
          '악보 라이브러리 및 디지털 파트보(Part Score) 버전 관리',
          '연주 단원 전용 모바일 웹 앱을 통한 실시간 출석 및 악보 열람',
          '공연장 백스테이지 및 운송 일정 타임라인 자동 간트차트 생성',
        ],
        statCallout: {
          value: '10,000+',
          label: '체계적으로 디지털화된 클래식 악보 자산 건수',
        },
        bgGradient: 'from-slate-900 via-navy-900 to-slate-950',
        accentColor: 'cyan',
      },
      {
        slideNumber: 3,
        badge: '정량적 성과',
        headline: '업무 누락 제로화와 운영 생산성의 획기적 향상',
        subheadline: '행정 비용 절감과 아티스트 중심의 연습 환경 조성',
        description: '시스템 도입 이후 행정 담당자들의 반복적인 연락 및 일정 조율 부담이 급감하였으며, 단원들 역시 모바일 앱을 통해 최신 정보를 즉각 확인하고 있습니다.',
        keyPoints: [
          '공연 당일 일정 변경 공지 도달 시간: 기존 2시간에서 3초로 단축',
          '외부 객원 연주자 계약 및 정산 자동 연동으로 회계 투명성 확보',
          '국내외 유수 오케스트라 및 국공립 예술단체들의 벤치마킹 문의 쇄도',
        ],
        statCallout: {
          value: '98%',
          label: '서울시립교향악단 실무진 및 단원 만족도',
        },
        bgGradient: 'from-slate-950 via-slate-900 to-blue-950',
        accentColor: 'emerald',
      },
      {
        slideNumber: 4,
        badge: '시장 확장',
        headline: '전국 국공립 예술단체 및 해외 오케스트라로의 솔루션 확산',
        subheadline: '대한민국 문화예술 IT 솔루션의 글로벌 스탠다드 도약',
        description: '구비트는 서울시향의 성공 사례를 바탕으로 전국 시·도립 교향악단, 합창단, 오페라단 및 해외 문화예술 단체로 OPMS 보급을 본격 확대합니다.',
        keyPoints: [
          '소규모 앙상블부터 대형 오페라단까지 유연한 모듈형 라이선스 체계',
          '클라우드 SaaS 버전 출시로 초기 도입 비용 대폭 절감',
          '문화체육관광부 K-컬처 디지털 혁신 사업과의 연계 강화',
        ],
        statCallout: {
          value: '2026',
          label: '차세대 SaaS형 OPMS 클라우드 글로벌 런칭',
        },
        bgGradient: 'from-navy-950 via-slate-900 to-slate-900',
        accentColor: 'amber',
      },
    ],
  },
  {
    id: 'news-tech-sync-hackathon',
    category: 'culture',
    categoryLabel: '사내소식',
    title: '2026 구비트 Tech Sync & 해커톤: 자율 AI 에이전트로 업무 생산성 3배 높이기',
    summary: '구비트 전사 엔지니어들이 모여 최신 멀티 에이전트 프레임워크와 MCP(Model Context Protocol)를 활용해 사내 업무를 자동화하는 해커톤을 성황리에 마쳤습니다.',
    date: '2026.01.05',
    readTime: '2분 읽기',
    cardCount: 4,
    coverGradient: 'from-emerald-950 via-slate-900 to-slate-950',
    tags: ['해커톤', 'AI에이전트', 'TechSync', '생산성혁신', '개발문화'],
    views: 1100,
    author: '구비트 개발자 연합',
    slides: [
      {
        slideNumber: 1,
        badge: '사내 해커톤',
        headline: '2026 구비트 Tech Sync & Autonomous Agent 해커톤 개최',
        subheadline: 'SI 현장의 지루한 반복 작업을 자율 AI로 완전 자동화하라',
        description: '구비트 기술연구소와 SI/ITO 사업본부 전 엔지니어들이 한자리에 모여, 최신 AI 에이전트 기술을 실무 개발 및 운영 파이프라인에 적용하는 사내 해커톤을 열었습니다.',
        keyPoints: [
          '총 8개 팀 참가: 기획자, 풀스택 개발자, AI 연구원 융합 팀 구성',
          'LLM 함수 호출(Function Calling)과 MCP 기반 도구 연동 구현',
          '실제 구비트의 프로젝트 유지보수 및 코드 리뷰 환경을 대상으로 실험',
        ],
        statCallout: {
          value: '48시간',
          label: '집중 몰입 스프린트 및 프로토타입 실증',
        },
        bgGradient: 'from-emerald-950 via-slate-900 to-navy-950',
        accentColor: 'emerald',
      },
      {
        slideNumber: 2,
        badge: '대상 수상작',
        headline: '전자정부 표준프레임워크 단위 테스트 자동 생성 에이전트 \'EgovGenie\'',
        subheadline: '컨트롤러와 서비스 코드를 분석하여 테스트 커버리지 90% 달성',
        description: '대상을 차지한 EgovGenie 팀은 레거시 스프링(Spring) 코드와 전자정부 프레임워크 코드를 분석하여 Mock 기반 JUnit 테스트 코드를 전자동 생성하는 에이전트를 선보였습니다.',
        keyPoints: [
          '반복적인 DTO/Entity 매핑 및 테스트 픽스처(Fixture) 작성 1초 완성',
          '시큐어 코딩 규칙 및 SQL 취약점 패턴 실시간 감지 및 자동 리팩토링',
          '실제 차기 공공 SI 프로젝트 현장에 표준 개발 도구로 즉시 채택',
        ],
        statCallout: {
          value: '80%',
          label: '단위 테스트 코드 작성 시간 획기적 감축',
        },
        bgGradient: 'from-slate-900 via-slate-950 to-emerald-950',
        accentColor: 'cyan',
      },
      {
        slideNumber: 3,
        badge: '혁신 성과',
        headline: '경쟁을 넘어 사내 엔지니어링 표준으로의 빠른 전파',
        subheadline: '해커톤 결과물 중 3건을 구비트 공식 내부 개발 도구로 채택',
        description: '단순한 일회성 행사에 그치지 않고, 수상팀들의 창의적인 프로토타입을 실제 사내 CI/CD 파이프라인과 인트라넷 시스템에 성공적으로 통합했습니다.',
        keyPoints: [
          '서버 인프라 로그 이상 감지 및 슬랙 자동 경보 봇 운영 개시',
          'RFC 문서 및 제안서 초안 작성을 돕는 도메인 특화 RAG 비서 배포',
          '참가자 전원에게 최신 AI 기술 도서 및 연구비 지원',
        ],
        statCallout: {
          value: '3배',
          label: '실무 도입 팀들의 일일 코드 검증 속도 향상',
        },
        bgGradient: 'from-slate-950 via-navy-900 to-slate-900',
        accentColor: 'amber',
      },
      {
        slideNumber: 4,
        badge: '미래 지향',
        headline: '기술에 진심인 개발자들이 즐겁게 성장하는 구비트',
        subheadline: '정기적인 Tech Sync로 최신 AI 트렌드를 함께 탐구합니다',
        description: '구비트는 모든 구성원이 빠르게 진화하는 인공지능 시대의 주역이 될 수 있도록 분기별 Tech Sync와 사내 오픈소스 활동을 전폭적으로 후원하고 있습니다.',
        keyPoints: [
          '매월 마지막 주 금요일 사내 라이브 테크 토크 세션 정례화',
          '개인 연구 프로젝트의 특허 출원 및 오픈소스 공개 시 전액 지원',
          '최고의 동료들과 함께 기술의 한계를 넓혀가는 문화 조성',
        ],
        statCallout: {
          value: 'Quarterly',
          label: '분기별 전사 기술 지식 공유 및 해커톤 정례화',
        },
        bgGradient: 'from-slate-900 via-emerald-950 to-slate-900',
        accentColor: 'emerald',
      },
    ],
  },
];

// Attach to window for global access across vanilla scripts
if (typeof window !== 'undefined') {
  window.LEGAL_INFO = LEGAL_INFO;
  window.NAVIGATION_MENUS = NAVIGATION_MENUS;
  window.MEGA_MENU_DATA = MEGA_MENU_DATA;
  window.COMPANY_OVERVIEW = COMPANY_OVERVIEW;
  window.CEO_MESSAGE = CEO_MESSAGE;
  window.COMPANY_HISTORY = COMPANY_HISTORY;
  window.CERTIFICATIONS = CERTIFICATIONS;
  window.LOCATION_DIRECTIONS = LOCATION_DIRECTIONS;
  window.STATS_DATA = STATS_DATA;
  window.AI_CAPABILITIES = AI_CAPABILITIES;
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.SERVICES_DATA = SERVICES_DATA;
  window.SERVICE_METHODOLOGY = SERVICE_METHODOLOGY;
  window.CASE_STUDIES = CASE_STUDIES;
  window.FAQ_LIST = FAQ_LIST;
  window.PARTNERS_LIST = PARTNERS_LIST;
  window.CARD_NEWS_DATA = CARD_NEWS_DATA;
}
