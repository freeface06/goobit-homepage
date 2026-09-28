/**
 * @intent Controller for dedicated News Detail page with Inline Dual-Viewer (interactive slider + vertical scroll view), breadcrumb, share URL toast, and related news
 * @agent  manager-develop
 * @branch task-dedicated-news-detail-page
 * @author @goobit-dev
 * @date   2026-09-28
 */

class NewsDetailController {
  constructor(options = {}) {
    this.dataSource = options.dataSource || (typeof CARD_NEWS_DATA !== 'undefined' ? CARD_NEWS_DATA : []);
    this.currentItem = null;
    this.currentSlideIndex = 0;
    this.viewMode = 'slider'; // 'slider' or 'expanded'
    this.touchStartX = null;
    this.boundKeyDown = this.handleKeyDown.bind(this);
    this.isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  init() {
    if (!this.isBrowser) return;

    const urlParams = new URLSearchParams(window.location.search);
    const requestedId = urlParams.get('id');
    this.loadNews(requestedId);

    // Register keyboard navigation
    window.addEventListener('keydown', this.boundKeyDown);

    // Re-initialize Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  destroy() {
    if (!this.isBrowser) return;
    window.removeEventListener('keydown', this.boundKeyDown);
  }

  loadNews(newsId) {
    if (!this.dataSource || this.dataSource.length === 0) {
      console.warn('CARD_NEWS_DATA is not available.');
      return;
    }

    let found = this.dataSource.find((item) => item.id === newsId);
    const fallbackBanner = this.isBrowser ? document.getElementById('news-fallback-notice') : null;

    if (!found) {
      found = this.dataSource[0];
      if (newsId && fallbackBanner) {
        fallbackBanner.classList.remove('hidden');
      }
    } else {
      if (fallbackBanner) {
        fallbackBanner.classList.add('hidden');
      }
    }

    this.currentItem = found;
    this.currentSlideIndex = 0;

    if (this.isBrowser) {
      // Update page title and meta
      document.title = `${found.title} | 회사소식 | 주식회사 구비트 (Goobit)`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', found.summary);
      }

      this.renderAll();
    }
  }

  renderAll() {
    if (!this.isBrowser || !this.currentItem) return;
    this.renderBreadcrumb();
    this.renderHeader();
    this.renderSliderView();
    this.renderThumbnailStrip();
    this.renderExpandedView();
    this.renderBottomMeta();
    this.renderRelatedNews();
    this.updateViewMode(this.viewMode);

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  getCategoryBadgeStyles(cat) {
    switch (cat) {
      case 'press':
        return {
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
          dotClass: 'bg-blue-600',
          label: '보도자료',
        };
      case 'tech':
        return {
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          dotClass: 'bg-amber-500',
          label: '기술·DX',
        };
      case 'culture':
        return {
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dotClass: 'bg-emerald-600',
          label: '사내소식',
        };
      default:
        return {
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          dotClass: 'bg-slate-600',
          label: '공식소식',
        };
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
          borderAccent: 'border-amber-400/50',
          stepBadge: 'bg-amber-500 text-slate-950',
        };
      case 'cyan':
        return {
          pill: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
          statBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          activeBar: 'bg-cyan-400',
          dot: 'bg-cyan-400',
          borderAccent: 'border-cyan-400/50',
          stepBadge: 'bg-cyan-500 text-slate-950',
        };
      case 'emerald':
        return {
          pill: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
          statBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          activeBar: 'bg-emerald-400',
          dot: 'bg-emerald-400',
          borderAccent: 'border-emerald-400/50',
          stepBadge: 'bg-emerald-500 text-slate-950',
        };
      case 'blue':
      default:
        return {
          pill: 'bg-blue-400/20 text-blue-300 border-blue-400/40',
          statBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          activeBar: 'bg-blue-400',
          dot: 'bg-blue-400',
          borderAccent: 'border-blue-400/50',
          stepBadge: 'bg-blue-500 text-white',
        };
    }
  }

  renderBreadcrumb() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-breadcrumb-target');
    if (!el || !this.currentItem) return;
    const catStyle = this.getCategoryBadgeStyles(this.currentItem.category);

    el.innerHTML = `
      <ol class="flex items-center flex-wrap gap-2 text-xs text-slate-500 font-medium">
        <li>
          <a href="index.html" class="hover:text-amber-600 transition-colors flex items-center gap-1">
            <i data-lucide="home" class="w-3.5 h-3.5"></i>
            <span>홈</span>
          </a>
        </li>
        <li class="text-slate-300">/</li>
        <li>
          <a href="news.html" class="hover:text-amber-600 transition-colors">회사소식</a>
        </li>
        <li class="text-slate-300">/</li>
        <li>
          <a href="news.html?category=${this.currentItem.category}" class="hover:text-amber-600 transition-colors">
            ${catStyle.label}
          </a>
        </li>
        <li class="text-slate-300">/</li>
        <li class="text-slate-800 font-bold truncate max-w-xs sm:max-w-md" aria-current="page">
          ${this.currentItem.title}
        </li>
      </ol>
    `;
  }

  renderHeader() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-header-target');
    if (!el || !this.currentItem) return;
    const item = this.currentItem;
    const catStyle = this.getCategoryBadgeStyles(item.category);

    el.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center flex-wrap gap-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${catStyle.badgeClass}">
            <span class="w-1.5 h-1.5 rounded-full ${catStyle.dotClass}"></span>
            <span>${item.categoryLabel}</span>
          </span>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
            <i data-lucide="layers" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>총 카드 ${item.cardCount}장 구성</span>
          </div>
        </div>

        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight">
          ${item.title}
        </h1>

        <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          ${item.summary}
        </p>

        <!-- Meta info & Actions Row -->
        <div class="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-500">
            <div class="flex items-center gap-1.5 font-medium text-slate-700">
              <i data-lucide="building-2" class="w-4 h-4 text-slate-400"></i>
              <span>${item.author}</span>
            </div>
            <span class="hidden sm:inline text-slate-300">|</span>
            <div class="flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
              <span>${item.date}</span>
            </div>
            <span class="hidden sm:inline text-slate-300">|</span>
            <div class="flex items-center gap-1.5">
              <i data-lucide="eye" class="w-4 h-4 text-slate-400"></i>
              <span>조회 ${item.views.toLocaleString()}회</span>
            </div>
            <span class="hidden sm:inline text-slate-300">|</span>
            <div class="flex items-center gap-1.5">
              <i data-lucide="clock" class="w-4 h-4 text-slate-400"></i>
              <span>${item.readTime || '3분 읽기'}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button
              id="btn-copy-url"
              onclick="newsDetailController.copyShareUrl()"
              class="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="URL 복사하기"
            >
              <i data-lucide="share-2" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>URL 복사하기</span>
            </button>
            <a
              href="news.html"
              class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="회사소식 목록으로 이동"
            >
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>소식 목록으로</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderSliderView() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-slider-content');
    if (!el || !this.currentItem) return;

    const item = this.currentItem;
    const total = item.slides.length;
    const slide = item.slides[this.currentSlideIndex] || item.slides[0];
    const accent = this.getAccentStyles(slide.accentColor);

    // Segmented progress bars
    const progressBarsHtml = item.slides.map((_, idx) => {
      let fillClass = 'bg-slate-800';
      if (idx < this.currentSlideIndex) fillClass = 'bg-slate-400';
      else if (idx === this.currentSlideIndex) fillClass = accent.activeBar;

      return `
        <button
          onclick="newsDetailController.goToSlide(${idx})"
          aria-label="카드 ${idx + 1}번으로 이동"
          class="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-800/90 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <div class="h-full transition-all duration-300 ${fillClass}"></div>
        </button>
      `;
    }).join('');

    // Key points checklist
    const keyPointsHtml = (slide.keyPoints || []).map((pt) => `
      <div class="flex items-start gap-2.5">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 mt-1 shrink-0"></i>
        <span class="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">${pt}</span>
      </div>
    `).join('');

    // Stat callout box
    const statCalloutHtml = slide.statCallout ? `
      <div class="p-4 rounded-xl border flex items-center justify-between gap-4 mt-6 backdrop-blur-sm ${accent.statBg}">
        <div>
          <div class="text-2xl sm:text-3xl font-extrabold tracking-tight">${slide.statCallout.value}</div>
          <div class="text-xs sm:text-sm text-slate-300 mt-0.5">${slide.statCallout.label}</div>
        </div>
        <div class="hidden sm:flex items-center gap-1.5 text-xs opacity-80 font-mono text-slate-300">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
          <span>Goobit Verified</span>
        </div>
      </div>
    ` : '';

    // Bottom dots
    const dotsHtml = item.slides.map((_, idx) => `
      <button
        onclick="newsDetailController.goToSlide(${idx})"
        aria-label="${idx + 1}번 슬라이드"
        class="h-2 rounded-full transition-all focus:outline-none ${
          idx === this.currentSlideIndex ? `w-6 ${accent.dot}` : 'w-2 bg-slate-700 hover:bg-slate-500'
        }"
      ></button>
    `).join('');

    el.innerHTML = `
      <div class="relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white transition-all">
        <!-- Top Header & Segmented Progress -->
        <div class="px-6 pt-5 pb-3 bg-slate-900/90 border-b border-slate-800">
          <div class="flex items-center gap-1.5 w-full">
            ${progressBarsHtml}
          </div>

          <div class="flex items-center justify-between mt-3 text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
                ${item.categoryLabel}
              </span>
              <span class="text-slate-300 font-medium hidden sm:inline truncate max-w-sm">
                ${item.title}
              </span>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <span class="font-mono text-xs text-amber-400 font-bold bg-slate-950/60 px-2.5 py-1 rounded-full border border-amber-400/20">
                ${String(this.currentSlideIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <!-- Slide Body Container -->
        <div
          id="news-slide-stage"
          class="relative flex-1 p-6 sm:p-10 lg:p-12 bg-gradient-to-br ${slide.bgGradient} flex flex-col justify-between min-h-[420px] sm:min-h-[460px] news-slide-animate"
        >
          <!-- Subtle Radial Grid Pattern -->
          <div class="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

          <div class="relative z-10">
            <!-- Top Slide Badge & Meta -->
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

            <!-- Slide Headline -->
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-2">
              ${slide.headline}
            </h2>

            <!-- Slide Subheadline -->
            ${slide.subheadline ? `
              <p class="text-sm sm:text-base text-amber-300/90 font-semibold mb-4 leading-relaxed">
                ${slide.subheadline}
              </p>
            ` : ''}

            <!-- Slide Description -->
            <p class="text-sm sm:text-base text-slate-200/90 leading-relaxed mb-6 font-normal">
              ${slide.description}
            </p>

            <!-- Key Points Checklist -->
            ${keyPointsHtml ? `
              <div class="space-y-2 mb-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                ${keyPointsHtml}
              </div>
            ` : ''}

            <!-- Stat Callout -->
            ${statCalloutHtml}
          </div>

          <!-- Slide Footer Branding -->
          <div class="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-300">주식회사 구비트</span>
              <span class="text-slate-600">|</span>
              <span class="text-slate-400">${item.author}</span>
            </div>
            <div class="flex items-center gap-1.5 font-mono text-slate-400">
              <i data-lucide="layers" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>카드 ${this.currentSlideIndex + 1} / ${total}</span>
            </div>
          </div>

          <!-- Floating Left Arrow -->
          ${this.currentSlideIndex > 0 ? `
            <button
              onclick="newsDetailController.prevSlide()"
              aria-label="이전 카드 슬라이드로 이동"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 z-20"
            >
              <i data-lucide="chevron-left" class="w-6 h-6"></i>
            </button>
          ` : ''}

          <!-- Floating Right Arrow -->
          ${this.currentSlideIndex < total - 1 ? `
            <button
              onclick="newsDetailController.nextSlide()"
              aria-label="다음 카드 슬라이드로 이동"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 z-20"
            >
              <i data-lucide="chevron-right" class="w-6 h-6"></i>
            </button>
          ` : ''}
        </div>

        <!-- Bottom Controls Bar -->
        <div class="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onclick="newsDetailController.prevSlide()"
            ${this.currentSlideIndex === 0 ? 'disabled' : ''}
            class="px-3.5 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-colors ${
              this.currentSlideIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }"
          >
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
            <span>이전 카드</span>
          </button>

          <div class="flex items-center gap-1.5">
            ${dotsHtml}
          </div>

          ${this.currentSlideIndex < total - 1 ? `
            <button
              onclick="newsDetailController.nextSlide()"
              class="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-xs"
            >
              <span>다음 카드</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          ` : `
            <button
              onclick="newsDetailController.setViewMode('expanded')"
              class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1 transition-all shadow-xs"
            >
              <span>전체 펼쳐보기</span>
              <i data-lucide="layout-list" class="w-4 h-4"></i>
            </button>
          `}
        </div>
      </div>
    `;

    // Attach touch swipe listeners
    const stageEl = document.getElementById('news-slide-stage');
    if (stageEl) {
      stageEl.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      stageEl.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    }
  }

  renderThumbnailStrip() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-thumbnails-strip');
    if (!el || !this.currentItem) return;

    const item = this.currentItem;
    el.innerHTML = item.slides.map((s, idx) => {
      const isActive = idx === this.currentSlideIndex;
      return `
        <button
          onclick="newsDetailController.goToSlide(${idx})"
          class="shrink-0 w-36 sm:w-44 text-left p-3 rounded-2xl border transition-all text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            isActive
              ? 'bg-slate-900 border-amber-400 text-white shadow-md ring-1 ring-amber-400/50'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }"
          aria-label="카드 ${idx + 1}번: ${s.headline}"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
            }">
              Card ${String(idx + 1).padStart(2, '0')}
            </span>
            ${s.badge ? `
              <span class="text-[10px] font-semibold truncate ml-1 text-slate-400">
                ${s.badge}
              </span>
            ` : ''}
          </div>
          <p class="font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-800'}">
            ${s.headline}
          </p>
        </button>
      `;
    }).join('');
  }

  renderExpandedView() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-expanded-content');
    if (!el || !this.currentItem) return;

    const item = this.currentItem;
    const total = item.slides.length;

    el.innerHTML = `
      <div class="space-y-6">
        ${item.slides.map((slide, idx) => {
          const accent = this.getAccentStyles(slide.accentColor);
          const keyPointsHtml = (slide.keyPoints || []).map((pt) => `
            <div class="flex items-start gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 mt-1 shrink-0"></i>
              <span class="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">${pt}</span>
            </div>
          `).join('');

          const statCalloutHtml = slide.statCallout ? `
            <div class="p-4 rounded-xl border flex items-center justify-between gap-4 mt-5 bg-slate-50 border-slate-200">
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${slide.statCallout.value}</div>
                <div class="text-xs sm:text-sm text-slate-500 mt-0.5">${slide.statCallout.label}</div>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
                <span>Goobit Verified</span>
              </div>
            </div>
          ` : '';

          return `
            <article class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div class="flex items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-8 h-8 rounded-xl font-bold font-mono text-xs flex items-center justify-center ${accent.stepBadge}">
                    ${String(idx + 1).padStart(2, '0')}
                  </span>
                  ${slide.badge ? `
                    <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      ${slide.badge}
                    </span>
                  ` : ''}
                </div>
                <span class="text-xs text-slate-400 font-mono">${idx + 1} / ${total}</span>
              </div>

              <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                ${slide.headline}
              </h2>

              ${slide.subheadline ? `
                <p class="text-sm sm:text-base text-blue-600 font-semibold mb-3 leading-relaxed">
                  ${slide.subheadline}
                </p>
              ` : ''}

              <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                ${slide.description}
              </p>

              ${keyPointsHtml ? `
                <div class="space-y-2 mb-4 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                  ${keyPointsHtml}
                </div>
              ` : ''}

              ${statCalloutHtml}
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  renderBottomMeta() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-bottom-meta-target');
    if (!el || !this.currentItem) return;

    const item = this.currentItem;
    const currentIndex = this.dataSource.findIndex((n) => n.id === item.id);
    const prevItem = currentIndex > 0 ? this.dataSource[currentIndex - 1] : null;
    const nextItem = currentIndex < this.dataSource.length - 1 ? this.dataSource[currentIndex + 1] : null;

    el.innerHTML = `
      <div class="space-y-8">
        <!-- Tag List -->
        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">관련 키워드 태그</h3>
          <div class="flex flex-wrap gap-2">
            ${item.tags.map((t) => `
              <a
                href="news.html"
                class="text-xs font-medium px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300 transition-colors shadow-xs"
              >
                #${t}
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Prev / Next Post Links -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <!-- Prev Post -->
          <div class="h-full">
            ${prevItem ? `
              <a
                href="news-detail.html?id=${prevItem.id}"
                class="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3 h-full group"
              >
                <div class="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0 mt-0.5">
                  <i data-lucide="chevron-left" class="w-4 h-4"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-[11px] font-bold text-slate-400 block mb-0.5">이전 소식</span>
                  <p class="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    ${prevItem.title}
                  </p>
                  <span class="text-[11px] text-slate-400 mt-1 block">${prevItem.date}</span>
                </div>
              </a>
            ` : `
              <div class="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex items-center gap-3 h-full text-slate-400 text-xs">
                <i data-lucide="minus-circle" class="w-4 h-4 shrink-0"></i>
                <span>가장 최신 소식입니다.</span>
              </div>
            `}
          </div>

          <!-- Next Post -->
          <div class="h-full">
            ${nextItem ? `
              <a
                href="news-detail.html?id=${nextItem.id}"
                class="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex items-start justify-between gap-3 h-full group text-right"
              >
                <div class="min-w-0 flex-1">
                  <span class="text-[11px] font-bold text-slate-400 block mb-0.5">다음 소식</span>
                  <p class="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    ${nextItem.title}
                  </p>
                  <span class="text-[11px] text-slate-400 mt-1 block">${nextItem.date}</span>
                </div>
                <div class="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0 mt-0.5">
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </div>
              </a>
            ` : `
              <div class="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-end gap-3 h-full text-slate-400 text-xs text-right">
                <span>마지막 소식입니다.</span>
                <i data-lucide="minus-circle" class="w-4 h-4 shrink-0"></i>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  renderRelatedNews() {
    if (!this.isBrowser) return;
    const el = document.getElementById('news-related-grid-target');
    if (!el || !this.currentItem) return;

    const currentId = this.currentItem.id;
    const relatedItems = this.dataSource.filter((n) => n.id !== currentId).slice(0, 3);

    el.innerHTML = relatedItems.map((item) => `
      <a
        href="news-detail.html?id=${item.id}"
        class="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-2 block text-slate-900 no-underline h-full"
        aria-label="${item.title}"
      >
        <div class="relative aspect-[4/3] bg-gradient-to-br ${item.coverGradient} p-5 flex flex-col justify-between overflow-hidden text-white">
          <div class="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

          <div class="relative z-10 flex items-center justify-between gap-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg border ${this.getCategoryBadgeStyles(item.category).badgeClass}">
              ${item.categoryLabel}
            </span>
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-xs text-amber-400 text-xs font-bold border border-amber-400/20">
              <i data-lucide="layers" class="w-3.5 h-3.5"></i>
              <span>카드 ${item.cardCount}장</span>
            </div>
          </div>

          <div class="relative z-10 my-auto py-2">
            <h3 class="text-sm sm:text-base font-bold text-white leading-snug line-clamp-3 group-hover:text-amber-300 transition-colors">
              ${item.title}
            </h3>
          </div>

          <div class="relative z-10 flex items-center justify-between text-xs text-slate-300/80 pt-2 border-t border-white/10">
            <div class="flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>${item.date}</span>
            </div>
            <span class="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              <span>열기</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>

        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            ${item.summary}
          </p>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span class="truncate">${item.author}</span>
            <span class="text-blue-600 font-bold group-hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              상세보기 &rarr;
            </span>
          </div>
        </div>
      </a>
    `).join('');
  }

  setViewMode(mode) {
    this.viewMode = mode;
    if (this.isBrowser) {
      this.updateViewMode(mode);
    }
  }

  updateViewMode(mode) {
    if (!this.isBrowser) return;
    const sliderContainer = document.getElementById('news-slider-container');
    const expandedContainer = document.getElementById('news-expanded-container');
    const btnSlider = document.getElementById('toggle-btn-slider');
    const btnExpanded = document.getElementById('toggle-btn-expanded');

    if (mode === 'slider') {
      if (sliderContainer) sliderContainer.classList.remove('hidden');
      if (expandedContainer) expandedContainer.classList.add('hidden');

      if (btnSlider) {
        btnSlider.className = 'px-3.5 py-1.5 rounded-xl font-bold text-xs bg-slate-900 text-white shadow-xs flex items-center gap-1.5 transition-all';
        btnSlider.setAttribute('aria-selected', 'true');
      }
      if (btnExpanded) {
        btnExpanded.className = 'px-3.5 py-1.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition-all';
        btnExpanded.setAttribute('aria-selected', 'false');
      }
    } else {
      if (sliderContainer) sliderContainer.classList.add('hidden');
      if (expandedContainer) expandedContainer.classList.remove('hidden');

      if (btnSlider) {
        btnSlider.className = 'px-3.5 py-1.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition-all';
        btnSlider.setAttribute('aria-selected', 'false');
      }
      if (btnExpanded) {
        btnExpanded.className = 'px-3.5 py-1.5 rounded-xl font-bold text-xs bg-slate-900 text-white shadow-xs flex items-center gap-1.5 transition-all';
        btnExpanded.setAttribute('aria-selected', 'true');
      }
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  goToSlide(index) {
    if (!this.currentItem) return;
    const total = this.currentItem.slides.length;
    if (index >= 0 && index < total) {
      this.currentSlideIndex = index;
      if (this.isBrowser) {
        this.renderSliderView();
        this.renderThumbnailStrip();

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      }
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
    // Avoid hijacking when typing into inputs
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      return;
    }
    if (this.viewMode !== 'slider') return;

    if (e.key === 'ArrowRight') {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      this.nextSlide();
    } else if (e.key === 'ArrowLeft') {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      this.prevSlide();
    }
  }

  handleTouchStart(e) {
    if (e.touches && e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
    }
  }

  handleTouchEnd(e) {
    if (this.touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = this.touchStartX - touchEndX;
    const threshold = 40;

    if (diff > threshold) {
      this.nextSlide();
    } else if (diff < -threshold) {
      this.prevSlide();
    }
    this.touchStartX = null;
  }

  copyShareUrl() {
    if (!this.isBrowser) return;
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('URL이 클립보드에 복사되었습니다.');
      }).catch(() => {
        this.fallbackCopyText(url);
      });
    } else {
      this.fallbackCopyText(url);
    }
  }

  fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast('URL이 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('URL copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  showToast(message) {
    const toast = document.getElementById('news-toast');
    const toastMsg = document.getElementById('news-toast-message');
    if (!toast) return;

    if (toastMsg) {
      toastMsg.textContent = message;
    }
    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2400);
  }
}

// Global initialization in browser
if (typeof window !== 'undefined') {
  window.NewsDetailController = NewsDetailController;
  window.newsDetailController = new NewsDetailController();
  document.addEventListener('DOMContentLoaded', () => {
    window.newsDetailController.init();
  });
}

// Node.js module export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NewsDetailController };
}
