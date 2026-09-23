/**
 * @intent Dedicated full-screen interactive Card News Reader modal controller supporting segmented progress, keyboard navigation, touch swipe, and URL copy
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

class CardNewsReader {
  constructor() {
    this.modalEl = null;
    this.currentItem = null;
    this.currentSlideIndex = 0;
    this.touchStartX = null;
    this.boundKeyDownHandler = this.handleKeyDown.bind(this);
    this.init();
  }

  init() {
    // Create modal container if not exists
    let container = document.getElementById('card-news-modal-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'card-news-modal-root';
      document.body.appendChild(container);
    }
    this.container = container;

    // Attach click listener for any elements with [data-news-id]
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-news-id]');
      if (trigger) {
        e.preventDefault();
        const newsId = trigger.getAttribute('data-news-id');
        this.open(newsId);
      }
    });
  }

  open(newsId, slideIndex = 0) {
    if (typeof CARD_NEWS_DATA === 'undefined') return;
    const item = CARD_NEWS_DATA.find((n) => n.id === newsId);
    if (!item) return;

    this.currentItem = item;
    this.currentSlideIndex = slideIndex;
    document.body.style.overflow = 'hidden';

    this.render();
    window.addEventListener('keydown', this.boundKeyDownHandler);
  }

  close() {
    this.container.innerHTML = '';
    this.currentItem = null;
    this.currentSlideIndex = 0;
    document.body.style.overflow = '';
    window.removeEventListener('keydown', this.boundKeyDownHandler);
  }

  goToSlide(index) {
    if (!this.currentItem) return;
    const total = this.currentItem.slides.length;
    if (index >= 0 && index < total) {
      this.currentSlideIndex = index;
      this.render();
    }
  }

  nextSlide() {
    if (!this.currentItem) return;
    if (this.currentSlideIndex < this.currentItem.slides.length - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }

  handleKeyDown(e) {
    if (!this.currentItem) return;
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      e.preventDefault();
      this.nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prevSlide();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
    }
  }

  handleTouchEnd(e) {
    if (this.touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = this.touchStartX - touchEndX;
    const threshold = 50;

    if (diff > threshold) {
      this.nextSlide();
    } else if (diff < -threshold) {
      this.prevSlide();
    }
    this.touchStartX = null;
  }

  copyShareUrl() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      const toast = document.getElementById('card-share-toast');
      if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2000);
      }
    }
  }

  getAccentStyles(accent) {
    switch (accent) {
      case 'amber':
        return {
          pill: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
          statBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          activeBar: 'bg-amber-400',
          dot: 'bg-amber-400',
        };
      case 'cyan':
        return {
          pill: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
          statBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          activeBar: 'bg-cyan-400',
          dot: 'bg-cyan-400',
        };
      case 'emerald':
        return {
          pill: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
          statBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          activeBar: 'bg-emerald-400',
          dot: 'bg-emerald-400',
        };
      case 'blue':
      default:
        return {
          pill: 'bg-blue-400/20 text-blue-300 border-blue-400/40',
          statBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          activeBar: 'bg-blue-400',
          dot: 'bg-blue-400',
        };
    }
  }

  render() {
    if (!this.currentItem) return;
    const item = this.currentItem;
    const total = item.slides.length;
    const slide = item.slides[this.currentSlideIndex] || item.slides[0];
    const accent = this.getAccentStyles(slide.accentColor);

    // Segmented Bars
    const progressBarsHtml = item.slides.map((_, idx) => {
      let innerClass = 'bg-transparent';
      if (idx < this.currentSlideIndex) innerClass = 'bg-slate-400';
      else if (idx === this.currentSlideIndex) innerClass = accent.activeBar;

      return `
        <button onclick="cardNewsModal.goToSlide(${idx})" aria-label="슬라이드 ${idx + 1}로 이동" class="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-800 transition-all focus:outline-none">
          <div class="h-full transition-all duration-300 ${innerClass}"></div>
        </button>
      `;
    }).join('');

    // Key points
    const keyPointsHtml = (slide.keyPoints || []).map((point) => `
      <div class="flex items-start gap-2.5">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 mt-1 shrink-0"></i>
        <span class="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">${point}</span>
      </div>
    `).join('');

    // Stat Callout
    const statCalloutHtml = slide.statCallout ? `
      <div class="p-4 rounded-xl border flex items-center justify-between gap-4 mt-4 backdrop-blur-sm ${accent.statBg}">
        <div>
          <div class="text-2xl sm:text-3xl font-extrabold tracking-tight">${slide.statCallout.value}</div>
          <div class="text-xs sm:text-sm text-slate-300 mt-0.5">${slide.statCallout.label}</div>
        </div>
        <div class="hidden sm:flex items-center gap-1 text-xs opacity-75 font-mono">
          <span>Goobit Verified</span>
        </div>
      </div>
    ` : '';

    // Bottom Dots
    const dotsHtml = item.slides.map((_, idx) => `
      <button onclick="cardNewsModal.goToSlide(${idx})" aria-label="${idx + 1}번 슬라이드" class="h-2 rounded-full transition-all focus:outline-none ${
        idx === this.currentSlideIndex ? `w-5 ${accent.dot}` : 'w-2 bg-slate-700 hover:bg-slate-500'
      }"></button>
    `).join('');

    const modalHtml = `
      <div id="card-news-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="card-news-headline">
        <div id="card-news-dialog" class="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white transition-all max-h-[92vh]">
          
          <!-- Top Segmented Progress Bar -->
          <div class="px-6 pt-4 pb-2 bg-slate-950/60 border-b border-slate-800">
            <div class="flex items-center gap-1.5 w-full">
              ${progressBarsHtml}
            </div>

            <!-- Header Info -->
            <div class="flex items-center justify-between mt-3 text-xs text-slate-400">
              <div class="flex items-center gap-2 truncate pr-2">
                <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  ${item.categoryLabel}
                </span>
                <span class="truncate font-medium text-slate-300 hidden sm:inline">
                  ${item.title}
                </span>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <span class="font-mono text-slate-400 text-xs">
                  ${String(this.currentSlideIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}
                </span>
                <button onclick="cardNewsModal.copyShareUrl()" class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1" title="공유하기" aria-label="카드뉴스 링크 복사">
                  <i data-lucide="share-2" class="w-4 h-4"></i>
                  <span id="card-share-toast" class="text-[11px] hidden text-emerald-400 font-bold">복사됨</span>
                </button>
                <button onclick="cardNewsModal.close()" class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" aria-label="닫기">
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Slide Body Content -->
          <div id="card-slide-body" class="flex-1 overflow-y-auto p-6 sm:p-10 bg-gradient-to-br ${slide.bgGradient} flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            <div>
              <div class="flex items-center justify-between mb-4">
                ${slide.badge ? `
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${accent.pill}">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    <span>${slide.badge}</span>
                  </div>
                ` : '<div></div>'}
                <div class="text-xs text-slate-400 font-mono flex items-center gap-1 ml-auto">
                  <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                  <span>${item.date}</span>
                </div>
              </div>

              <h2 id="card-news-headline" class="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug sm:leading-tight mb-2">
                ${slide.headline}
              </h2>

              ${slide.subheadline ? `
                <p class="text-sm sm:text-base text-slate-300 font-medium mb-4 leading-relaxed">
                  ${slide.subheadline}
                </p>
              ` : ''}

              <p class="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-6 font-normal">
                ${slide.description}
              </p>

              ${keyPointsHtml ? `
                <div class="space-y-2 mb-6">
                  ${keyPointsHtml}
                </div>
              ` : ''}

              ${statCalloutHtml}
            </div>

            <!-- Slide Footer -->
            <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-slate-300">주식회사 구비트</span>
                <span class="text-slate-600">|</span>
                <span class="text-slate-400">${item.author}</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="layers" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>${this.currentSlideIndex + 1} / ${total}</span>
              </div>
            </div>
          </div>

          <!-- Floating Navigation Arrows -->
          ${this.currentSlideIndex > 0 ? `
            <button onclick="cardNewsModal.prevSlide()" aria-label="이전 카드 슬라이드" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              <i data-lucide="chevron-left" class="w-6 h-6"></i>
            </button>
          ` : ''}

          ${this.currentSlideIndex < total - 1 ? `
            <button onclick="cardNewsModal.nextSlide()" aria-label="다음 카드 슬라이드" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              <i data-lucide="chevron-right" class="w-6 h-6"></i>
            </button>
          ` : ''}

          <!-- Bottom Control Bar -->
          <div class="px-6 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
            <button onclick="cardNewsModal.prevSlide()" ${this.currentSlideIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors ${
              this.currentSlideIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }">
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
              <span>이전 카드</span>
            </button>

            <div class="flex items-center gap-1.5">
              ${dotsHtml}
            </div>

            ${this.currentSlideIndex < total - 1 ? `
              <button onclick="cardNewsModal.nextSlide()" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-xs">
                <span>다음 카드</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
            ` : `
              <button onclick="cardNewsModal.close()" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1 transition-all shadow-xs">
                <span>목록으로 돌아가기</span>
              </button>
            `}
          </div>

        </div>
      </div>
    `;

    this.container.innerHTML = modalHtml;

    // Attach click outside to close
    const overlay = document.getElementById('card-news-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    // Touch Swipe listeners
    const bodyEl = document.getElementById('card-slide-body');
    if (bodyEl) {
      bodyEl.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      bodyEl.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ root: this.container });
    }
  }
}

// Global Singleton
const cardNewsModal = new CardNewsReader();
if (typeof window !== 'undefined') {
  window.cardNewsModal = cardNewsModal;
}
