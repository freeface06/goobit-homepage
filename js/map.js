/**
 * @intent High-fidelity enterprise location map component matching reference layout (Left: Contact & Address, Right: Embedded Real Interactive Map with Kakao/Naver/Google outlinks and clipboard copy)
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
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

    this.MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent('서울특별시 송파구 법원로 11길 7 문정현대지식산업센터')}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  mount() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm transition-all" aria-label="찾아오시는 길 및 본사 지도 안내">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Left Column: Contact & Address Information (Matching Reference Image) -->
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

          <!-- Right Column: Real Interactive Embedded Map & Outlinks (Matching Reference Image) -->
          <div class="lg:col-span-8 space-y-5">
            
            <!-- Real Embedded Map Container -->
            <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xs">
              <iframe
                src="${this.MAP_EMBED_URL}"
                class="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                allowfullscreen=""
                referrerpolicy="no-referrer-when-downgrade"
                title="${this.COMPANY_NAME} 본사 위치 지도"
                aria-label="${this.COMPANY_NAME} 본사 지도">
              </iframe>
            </div>

            <!-- Map Action Outlink Buttons (Matching Reference Image) -->
            <div class="flex items-center gap-3 flex-wrap justify-between sm:justify-start">
              <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <a href="${this.KAKAO_MAP_URL}" target="_blank" rel="noopener noreferrer" class="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-2 group whitespace-nowrap">
                  <span>카카오 지도</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                </a>
                <a href="${this.NAVER_MAP_URL}" target="_blank" rel="noopener noreferrer" class="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-2 group whitespace-nowrap">
                  <span>네이버 지도</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                </a>
                <a href="${this.GOOGLE_MAP_URL}" target="_blank" rel="noopener noreferrer" class="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-2 group whitespace-nowrap">
                  <span>구글 지도</span>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                </a>
              </div>

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

    this.attachCopyHandler();
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
document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('naver-map-root');
  if (mapElement) {
    const naverMap = new NaverMapController('naver-map-root');
    naverMap.mount();
    window.naverMap = naverMap;
  }
});
