/**
 * @intent High-fidelity company location map with high-visibility marker, removal of fullscreen button, Kakao/Naver/Google brand logos and mobile native app deep linking with web fallback
 * @agent  manager-develop
 * @branch feat/map-marker-and-app-links
 * @author @goobit-dev
 * @date   2026-09-28
 */

class NaverMapController {
  constructor(containerId = 'naver-map-root') {
    this.containerId = containerId;
    this.container = null;

    this.COMPANY_NAME = '주식회사 구비트 (GOOBIT)';
    this.TEL = '02-517-5520';
    this.FAX = '02-517-5521';
    this.EMAIL = 'contact@goobit.co.kr';
    this.ROAD_ADDRESS = '서울특별시 송파구 법원로 11길 7';
    this.BUILDING_ADDRESS = '문정현대지식산업센터 C동 408호';
    this.ZIP_CODE = '05836';
    this.FULL_ADDRESS = `${this.ROAD_ADDRESS} ${this.BUILDING_ADDRESS} (우편번호: ${this.ZIP_CODE})`;
    this.COPY_ADDRESS_TEXT = `${this.ROAD_ADDRESS} ${this.BUILDING_ADDRESS}`;
    this.SUBWAY_GUIDE = '지하철 8호선 문정역 4번 출구 도보 5분 (약 350m)';

    this.KAKAO_MAP_URL = `https://map.kakao.com/?q=${encodeURIComponent('서울특별시 송파구 법원로 11길 7 문정현대지식산업센터')}`;
    this.NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent('서울특별시 송파구 법원로 11길 7 문정현대지식산업센터')}`;
    this.GOOGLE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('서울특별시 송파구 법원로 11길 7 문정현대지식산업센터 C동 408호')}`;

    this.MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent('문정현대지식산업센터 C동')}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  }

  mount() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;
    this.render();
  }

  getAppScheme(service, platform = 'android') {
    const query = encodeURIComponent('문정현대지식산업센터 C동');
    const isIOS = platform === 'ios';

    switch (service) {
      case 'kakao':
        return isIOS
          ? `kakaomap://search?q=${query}`
          : `intent://search?q=${query}#Intent;scheme=kakaomap;package=net.daum.android.map;end`;
      case 'naver':
        return isIOS
          ? `nmap://search?query=${query}&appname=com.goobit.homepage`
          : `intent://search?query=${query}&appname=com.goobit.homepage#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;
      case 'google':
        return isIOS
          ? `comgooglemaps://?q=${query}`
          : `geo:37.4854,127.1224?q=${query}`;
      default:
        return '';
    }
  }

  openMapApp(service, event) {
    if (event) {
      event.preventDefault();
    }

    const webUrls = {
      kakao: this.KAKAO_MAP_URL,
      naver: this.NAVER_MAP_URL,
      google: this.GOOGLE_MAP_URL,
    };

    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isMobile = isAndroid || isIOS || (typeof window !== 'undefined' && window.innerWidth <= 768 && 'ontouchstart' in window);

    if (!isMobile) {
      if (typeof window !== 'undefined' && window.open) {
        window.open(webUrls[service], '_blank', 'noopener,noreferrer');
      }
      return;
    }

    const platform = isIOS ? 'ios' : 'android';
    const appUrl = this.getAppScheme(service, platform);

    if (!appUrl) {
      if (typeof window !== 'undefined') window.location.href = webUrls[service];
      return;
    }

    if (typeof window !== 'undefined') {
      const clickedAt = Date.now();
      if (isAndroid && appUrl.startsWith('intent://')) {
        window.location.href = appUrl;
      } else {
        window.location.href = appUrl;
        setTimeout(() => {
          if (Date.now() - clickedAt < 2000 && !document.hidden) {
            window.location.href = webUrls[service];
          }
        }, 1200);
      }
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm transition-all" aria-label="찾아오시는 길 및 본사 지도 안내">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Left Column: Contact & Address Information -->
          <div class="lg:col-span-4 space-y-8 pr-0 lg:pr-4">
            
            <!-- 연락처 (Contact) -->
            <div class="space-y-4">
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">연락처</h3>
              <div class="space-y-3 text-sm sm:text-base">
                <div class="flex items-start gap-4">
                  <span class="text-slate-400 font-medium min-w-[70px] shrink-0">대표전화</span>
                  <a href="tel:${this.TEL}" class="font-bold text-slate-900 hover:text-amber-600 transition-colors">${this.TEL}</a>
                </div>
                <div class="flex items-start gap-4">
                  <span class="text-slate-400 font-medium min-w-[70px] shrink-0">팩스번호</span>
                  <span class="font-semibold text-slate-800">${this.FAX}</span>
                </div>
                <div class="flex items-start gap-4">
                  <span class="text-slate-400 font-medium min-w-[70px] shrink-0">일반문의</span>
                  <a href="mailto:${this.EMAIL}" class="font-semibold text-slate-800 hover:text-amber-600 transition-colors">${this.EMAIL}</a>
                </div>
              </div>
            </div>

            <!-- 주소 (Address) -->
            <div class="space-y-4 pt-6 border-t border-slate-100">
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">주소</h3>
              <div class="space-y-1 text-sm sm:text-base leading-relaxed">
                <p class="font-bold text-slate-900">${this.ROAD_ADDRESS}</p>
                <p class="font-bold text-slate-900">${this.BUILDING_ADDRESS}</p>
                <p class="text-xs text-slate-400 font-medium pt-0.5">(우편번호: ${this.ZIP_CODE})</p>
              </div>
              <div class="pt-2 text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200 shrink-0">교통안내</span>
                <span class="leading-relaxed">${this.SUBWAY_GUIDE}</span>
              </div>
            </div>

          </div>

          <!-- Right Column: Real Interactive Embedded Map & Outlinks -->
          <div class="lg:col-span-8 space-y-5">
            
            <!-- Real Embedded Map Container with Prominent Location Marker -->
            <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xs">
              <iframe
                src="${this.MAP_EMBED_URL}"
                class="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="${this.COMPANY_NAME} 본사 위치 지도"
                aria-label="${this.COMPANY_NAME} 본사 지도">
              </iframe>

              <!-- Top-Left Persistent Location Badge -->
              <div class="company-map-badge absolute top-3.5 left-3.5 z-10 pointer-events-none bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-sm flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span class="text-xs font-bold text-slate-800 tracking-tight">구비트 본사: 문정현대지식산업센터 C동 408호</span>
              </div>

              <!-- High-Visibility Center Company Pin Marker -->
              <div class="company-map-marker absolute top-1/2 left-1/2 pointer-events-none z-10 flex flex-col items-center animate-bounce-gentle" aria-hidden="true">
                <div class="px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-extrabold shadow-xl border border-amber-400 flex items-center gap-1.5 whitespace-nowrap backdrop-blur-xs">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>(주)구비트 본사 · C동 408호</span>
                </div>
                <div class="w-2.5 h-2.5 bg-slate-900 rotate-45 -mt-1 border-r border-b border-amber-400"></div>
                <div class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] mt-1"></div>
              </div>
            </div>

            <!-- Map Action Outlink & App Deep Linking Buttons with Brand Logos -->
            <div class="flex items-center gap-3 flex-wrap justify-between sm:justify-start">
              <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <!-- Kakao Map Button with Logo -->
                <a href="${this.KAKAO_MAP_URL}" data-map-service="kakao" target="_blank" rel="noopener noreferrer" class="map-app-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-2.5 group whitespace-nowrap" aria-label="카카오 지도 앱 또는 웹에서 위치 보기">
                  <span class="w-5 h-5 rounded-md bg-[#FEE500] flex items-center justify-center shrink-0 shadow-xs">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#191919" aria-hidden="true">
                      <path d="M12 3C6.477 3 2 6.477 2 10.767c0 2.76 1.87 5.18 4.675 6.48-.205.76-.74 2.76-.847 3.19-.133.535.195.528.412.384.17-.113 2.71-1.84 3.79-2.58.64.09 1.3.14 1.97.14 5.523 0 10-3.477 10-7.767C22 6.477 17.523 3 12 3z"/>
                    </svg>
                  </span>
                  <span>카카오 지도</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                </a>

                <!-- Naver Map Button with Logo -->
                <a href="${this.NAVER_MAP_URL}" data-map-service="naver" target="_blank" rel="noopener noreferrer" class="map-app-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-2.5 group whitespace-nowrap" aria-label="네이버 지도 앱 또는 웹에서 위치 보기">
                  <span class="w-5 h-5 rounded-md bg-[#03C75A] flex items-center justify-center shrink-0 shadow-xs">
                    <svg class="w-3 h-3 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.273 12.845L7.382 0H0v24h7.727V11.155L16.618 24H24V0h-7.727z"/>
                    </svg>
                  </span>
                  <span>네이버 지도</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                </a>

                <!-- Google Maps Button with Logo -->
                <a href="${this.GOOGLE_MAP_URL}" data-map-service="google" target="_blank" rel="noopener noreferrer" class="map-app-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-2.5 group whitespace-nowrap" aria-label="구글 지도 앱 또는 웹에서 위치 보기">
                  <span class="w-5 h-5 rounded-md bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 32 32" aria-hidden="true">
                      <path fill="#4285F4" d="M16 2C10.48 2 6 6.48 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.52-4.48-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                      <path fill="#EA4335" d="M16 2c-5.52 0-10 4.48-10 10 0 3.25 1.58 6.77 4.12 10.25L16 16V2z"/>
                      <path fill="#FBBC04" d="M10.12 22.25c1.88 2.58 3.88 4.75 4.88 5.75V16l-4.88 6.25z"/>
                      <path fill="#34A853" d="M16 28c1-1 3-3.17 4.88-5.75L16 16v12z"/>
                    </svg>
                  </span>
                  <span>구글 지도</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                </a>
              </div>

              <!-- Address Clipboard Copy Button -->
              <button type="button" id="copy-address-btn" class="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shrink-0 ml-auto group whitespace-nowrap" title="주소 텍스트 클립보드 복사">
                <i data-lucide="copy" class="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors"></i>
                <span id="copy-address-label">주소 복사</span>
              </button>
            </div>

            <!-- Toast Feedback for Copy -->
            <div id="map-copy-toast" role="status" aria-live="polite" class="hidden text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200 flex items-center gap-2 animate-fadeIn">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 shrink-0"></i>
              <span>주소가 클립보드에 안전하게 복사되었습니다.</span>
            </div>

          </div>

        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ root: this.container });
    }

    this.attachMapButtonHandlers();
    this.attachCopyHandler();
  }

  attachMapButtonHandlers() {
    const mapButtons = this.container.querySelectorAll('.map-app-btn');
    mapButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const service = btn.getAttribute('data-map-service');
        if (service) {
          this.openMapApp(service, e);
        }
      });
    });
  }

  attachCopyHandler() {
    const copyBtn = this.container.querySelector('#copy-address-btn');
    const toast = this.container.querySelector('#map-copy-toast');
    const copyLabel = this.container.querySelector('#copy-address-label');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.COPY_ADDRESS_TEXT).then(() => {
          if (copyLabel) copyLabel.textContent = '복사 완료!';
          if (toast) toast.classList.remove('hidden');
          setTimeout(() => {
            if (copyLabel) copyLabel.textContent = '주소 복사';
            if (toast) toast.classList.add('hidden');
          }, 2500);
        }).catch(() => {
          // Fallback if clipboard API is blocked
          const textarea = document.createElement('textarea');
          textarea.value = this.COPY_ADDRESS_TEXT;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          if (copyLabel) copyLabel.textContent = '복사 완료!';
          if (toast) toast.classList.remove('hidden');
          setTimeout(() => {
            if (copyLabel) copyLabel.textContent = '주소 복사';
            if (toast) toast.classList.add('hidden');
          }, 2500);
        });
      }
    });
  }
}

// Global Initialization
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('naver-map-root');
    if (mapElement) {
      const naverMap = new NaverMapController('naver-map-root');
      naverMap.mount();
      window.naverMap = naverMap;
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NaverMapController };
}
