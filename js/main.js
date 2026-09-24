/**
 * @intent Enterprise core interactive controller for Tailwind config, Mega Menu hover, scroll animations, mobile drawer, video resizing, and Lucide icons
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

// 1. Dynamic Tailwind Configuration
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'goobit-navy': '#162846',
          'goobit-navyDark': '#0E1A30',
          'goobit-navyLight': '#1A2E51',
          'goobit-amber': '#F5A623',
          'goobit-amberHover': '#E09210',
          'goobit-blue': '#2563EB',
          goobit: {
            navy: '#162846',
            navyDark: '#0E1A30',
            navyLight: '#1A2E51',
            navyMuted: '#2A4365',
            amber: '#F5A623',
            amberHover: '#E09210',
            amberLight: '#FEF3C7',
            blue: '#2563EB',
            blueHover: '#1D4ED8',
          },
          navy: {
            950: '#0E1A30',
            900: '#162846',
            850: '#1A2E51',
            800: '#1E3A5F',
            700: '#2A4365',
            600: '#334155',
          },
          ai: {
            cyan: '#F5A623',
            cyanLight: '#FBBF24',
            blue: '#2563EB',
            indigo: '#1D4ED8',
            glow: 'rgba(245, 166, 35, 0.12)',
          },
          surface: {
            white: '#FFFFFF',
            section: '#F8FAFC',
            card: '#F1F5F9',
            border: '#E2E8F0',
            slate: '#0F172A',
          },
          content: {
            heading: '#0F172A',
            body: '#334155',
            muted: '#64748B',
          },
        },
        fontFamily: {
          sans: ['Pretendard', 'sans-serif'],
          mono: ['Pretendard', 'sans-serif'],
          pretendard: ['Pretendard', 'sans-serif'],
        },
        boxShadow: {
          'enterprise': '0 4px 20px -2px rgba(22, 40, 70, 0.06), 0 2px 6px -1px rgba(22, 40, 70, 0.04)',
          'enterprise-lg': '0 12px 32px -4px rgba(22, 40, 70, 0.1), 0 4px 12px -2px rgba(22, 40, 70, 0.06)',
          'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          'card-hover': '0 10px 25px -5px rgba(22, 40, 70, 0.1), 0 8px 10px -6px rgba(22, 40, 70, 0.06)',
        },
      },
    },
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }


  // 3. Header Mega Menu Hover Interaction
  const header = document.querySelector('header');
  const navItemButtons = document.querySelectorAll('[data-menu-target]');
  const megaMenuDrawer = document.getElementById('mega-menu-drawer');
  const megaMenuBackdrop = document.getElementById('mega-menu-backdrop');
  let activeMenuId = null;

  const renderMegaMenu = (menuId) => {
    if (!megaMenuDrawer || typeof MEGA_MENU_DATA === 'undefined') return;
    const data = MEGA_MENU_DATA[menuId];
    if (!data) return;

    // Featured Card
    const featuredCardHtml = `
      <a href="${data.featuredCard.targetUrl}" class="mega-menu-card group cursor-pointer rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-amber-400/80 p-5 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full text-slate-900 block text-decoration-none whitespace-normal overflow-hidden">
        <div class="relative aspect-[16/10] rounded-xl overflow-hidden mb-3.5 bg-slate-900 shrink-0">
          <img src="${data.featuredCard.image}" alt="${data.featuredCard.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          <div class="absolute top-2.5 left-2.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-900 shadow-xs whitespace-nowrap">
              ${data.featuredCard.badge}
            </span>
          </div>
        </div>
        <div class="flex items-end justify-between gap-3 mt-auto pt-2 min-w-0">
          <div class="space-y-1 min-w-0 flex-1">
            <h4 class="text-sm lg:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors whitespace-normal break-words">
              ${data.featuredCard.title}
            </h4>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal whitespace-normal break-words keep-all">
              ${data.featuredCard.description}
            </p>
          </div>
          <div class="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 group-hover:translate-x-1 group-hover:bg-amber-600 transition-all shadow-xs">
            <i data-lucide="arrow-right" class="w-4 h-4 text-slate-900"></i>
          </div>
        </div>
      </a>
    `;

    // 3 Columns
    const columnsHtml = data.columns.map((col) => `
      <div class="space-y-4 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 tracking-wider uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5 whitespace-normal">
          <span>${col.title}</span>
        </h4>
        <div class="space-y-1.5">
          ${col.items.map((item) => `
            <a href="${item.url}" role="menuitem" class="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition-colors group flex items-start gap-2 block text-decoration-none whitespace-normal">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                    ${item.label}
                  </span>
                  ${item.badge ? `
                    <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0 whitespace-nowrap">
                      ${item.badge}
                    </span>
                  ` : ''}
                </div>
                <p class="text-xs text-slate-400 mt-0.5 line-clamp-1 whitespace-normal break-words">
                  ${item.description}
                </p>
              </div>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"></i>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');

    megaMenuDrawer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 sm:px-8 py-8 lg:py-9">
        <div class="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div class="col-span-4 pr-6 border-r border-slate-100 flex flex-col min-w-0">
            ${featuredCardHtml}
          </div>
          <div class="col-span-8 pl-2 grid grid-cols-3 gap-6 lg:gap-8 min-w-0">
            ${columnsHtml}
          </div>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ root: megaMenuDrawer });
    }
  };

  const isDarkHeader = () => {
    if (!header) return false;
    return header.getAttribute('data-theme') === 'dark' ||
           header.classList.contains('text-slate-100') ||
           header.classList.contains('bg-[#070A12]/85');
  };

  let isClickPinned = false;
  let lastOpenTimestamp = 0;

  const openMegaMenu = (menuId, isClick = false) => {
    activeMenuId = menuId;
    if (isClick) {
      isClickPinned = true;
    }
    lastOpenTimestamp = Date.now();
    renderMegaMenu(menuId);
    if (megaMenuDrawer) {
      megaMenuDrawer.classList.remove('hidden');
    }
    if (megaMenuBackdrop) {
      megaMenuBackdrop.classList.remove('hidden', 'pointer-events-none');
      megaMenuBackdrop.classList.add('pointer-events-auto');
    }

    const dark = isDarkHeader();

    navItemButtons.forEach((btn) => {
      const isTarget = btn.getAttribute('data-menu-target') === menuId;
      const chevron = btn.querySelector('.chevron-icon');
      const indicator = btn.querySelector('.active-indicator');
      const isCurrentPage = btn.classList.contains('is-current-page');

      if (isTarget) {
        if (dark) {
          btn.classList.add('text-white', 'font-bold');
          btn.classList.remove('text-slate-300', 'text-slate-400', 'text-slate-600', 'text-slate-900');
          if (chevron) {
            chevron.classList.add('rotate-180', 'text-amber-400');
            chevron.classList.remove('text-slate-400', 'text-amber-500');
          }
        } else {
          btn.classList.add('text-slate-900', 'font-bold');
          btn.classList.remove('text-slate-600', 'text-slate-300');
          if (chevron) {
            chevron.classList.add('rotate-180', 'text-amber-500');
            chevron.classList.remove('text-slate-400');
          }
        }
        if (indicator) indicator.classList.remove('opacity-0');
      } else {
        if (dark) {
          if (!isCurrentPage) {
            btn.classList.remove('text-white', 'text-slate-900', 'text-slate-600', 'font-bold');
            btn.classList.add('text-slate-300', 'font-semibold');
          }
          if (chevron) {
            chevron.classList.remove('rotate-180', 'text-amber-400', 'text-amber-500');
            chevron.classList.add('text-slate-400');
          }
        } else {
          if (!isCurrentPage) {
            btn.classList.remove('text-slate-900', 'font-bold');
            btn.classList.add('text-slate-600', 'font-semibold');
          }
          if (chevron) {
            chevron.classList.remove('rotate-180', 'text-amber-500');
            chevron.classList.add('text-slate-400');
          }
        }
        if (indicator && !isCurrentPage) {
          indicator.classList.add('opacity-0');
        }
      }
    });
  };

  const closeMegaMenu = () => {
    activeMenuId = null;
    isClickPinned = false;
    if (megaMenuDrawer) {
      megaMenuDrawer.classList.add('hidden');
    }
    if (megaMenuBackdrop) {
      megaMenuBackdrop.classList.add('hidden', 'pointer-events-none');
      megaMenuBackdrop.classList.remove('pointer-events-auto');
    }

    const dark = isDarkHeader();

    navItemButtons.forEach((btn) => {
      const chevron = btn.querySelector('.chevron-icon');
      const indicator = btn.querySelector('.active-indicator');
      const isCurrentPage = btn.classList.contains('is-current-page');

      if (chevron) {
        chevron.classList.remove('rotate-180', 'text-amber-400', 'text-amber-500');
        chevron.classList.add('text-slate-400');
      }
      if (indicator && !isCurrentPage) {
        indicator.classList.add('opacity-0');
      }
      if (!isCurrentPage) {
        if (dark) {
          btn.classList.remove('text-white', 'font-bold', 'text-slate-600', 'text-slate-900');
          btn.classList.add('text-slate-300', 'font-semibold');
        } else {
          btn.classList.remove('text-slate-900', 'font-bold');
          btn.classList.add('text-slate-600', 'font-semibold');
        }
      }
    });
  };

  navItemButtons.forEach((btn) => {
    const menuId = btn.getAttribute('data-menu-target');

    // 1. Hover Preview
    btn.addEventListener('mouseenter', () => {
      if (menuId) openMegaMenu(menuId, false);
    });

    // 2. Keyboard Focus
    btn.addEventListener('focus', () => {
      if (menuId) openMegaMenu(menuId, false);
    });

    // 3. User Click: Prevents immediate page jump and opens/pins mega menu bar
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Stop immediate navigation!
      if (!menuId) return;

      const isDrawerOpen = megaMenuDrawer && !megaMenuDrawer.classList.contains('hidden');

      if (isDrawerOpen && activeMenuId === menuId) {
        // If clicked again after having been open for a while (> 350ms), toggle close
        if (Date.now() - lastOpenTimestamp > 350) {
          closeMegaMenu();
        } else {
          // If clicked immediately following hover, lock it open
          isClickPinned = true;
        }
      } else {
        // Open the menu and pin it
        openMegaMenu(menuId, true);
      }
    });
  });

  // Leave header closes mega menu only if NOT click-pinned
  if (header) {
    header.addEventListener('mouseleave', () => {
      if (!isClickPinned) {
        closeMegaMenu();
      }
    });
  }

  // Backdrop click closes menu
  if (megaMenuBackdrop) {
    megaMenuBackdrop.addEventListener('click', () => {
      closeMegaMenu();
    });
  }

  // Outside click dismisses menu
  document.addEventListener('click', (e) => {
    if (megaMenuDrawer && !megaMenuDrawer.classList.contains('hidden')) {
      const isInsideHeader = header && header.contains(e.target);
      const isInsideDrawer = megaMenuDrawer.contains(e.target);
      if (!isInsideHeader && !isInsideDrawer) {
        closeMegaMenu();
      }
    }
  });

  // Clicking any menu item inside the mega menu drawer navigates and closes drawer
  if (megaMenuDrawer) {
    megaMenuDrawer.addEventListener('click', (e) => {
      const targetLink = e.target.closest('a');
      if (targetLink && targetLink.getAttribute('href')) {
        setTimeout(() => {
          closeMegaMenu();
        }, 120);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMegaMenu();
      const mobileMenu = document.getElementById('mobile-menu-drawer');
      if (mobileMenu) mobileMenu.classList.add('hidden');
    }
  });

  // 4. Mobile Navigation Drawer Toggle
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileToggleBtn && mobileMenuDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      const isHidden = mobileMenuDrawer.classList.contains('hidden');
      if (isHidden) {
        mobileMenuDrawer.classList.remove('hidden');
      } else {
        mobileMenuDrawer.classList.add('hidden');
      }
    });

    // Clicking a link inside the mobile drawer closes it
    mobileMenuDrawer.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        mobileMenuDrawer.classList.add('hidden');
      }
    });
  }


  // 7. IntersectionObserver Scroll Reveal for [data-reveal]
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // 8. Case Study Filter Tabs
  const caseFilterButtons = document.querySelectorAll('[data-case-filter]');
  const caseCards = document.querySelectorAll('[data-case-category]');
  if (caseFilterButtons.length > 0 && caseCards.length > 0) {
    caseFilterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-case-filter');
        caseFilterButtons.forEach((b) => {
          b.classList.remove('bg-[#162846]', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('bg-[#162846]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
        btn.setAttribute('aria-selected', 'true');

        caseCards.forEach((card) => {
          const cat = card.getAttribute('data-case-category');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 9. Floating Scroll-to-Top Button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden', 'opacity-0');
        scrollTopBtn.classList.add('opacity-100');
      } else {
        scrollTopBtn.classList.add('opacity-0');
        setTimeout(() => {
          if (window.scrollY <= 300) scrollTopBtn.classList.add('hidden');
        }, 200);
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * @intent Scrollytelling Pinning & Parallax Interactive Storytelling Controller
   * @agent  manager-develop
   * @branch feat/scroll-storytelling
   * @author @goobit-dev
   * @date   2026-09-23
   */

  // 10-A. Scrollytelling Showcase Controller (Sticky track pinning across 3 stages)
  const scrollyTrack = document.getElementById('ai-scrolly-track');
  if (scrollyTrack) {
    const scrollyPanels = scrollyTrack.querySelectorAll('[data-scrolly-panel]');
    const scrollyCards = scrollyTrack.querySelectorAll('[data-scrolly-card]');
    const indicator = document.getElementById('scrolly-stage-indicator');
    const cardStatuses = {
      1: scrollyTrack.querySelector('[data-scrolly-status="1"]'),
      2: scrollyTrack.querySelector('[data-scrolly-status="2"]'),
      3: scrollyTrack.querySelector('[data-scrolly-status="3"]'),
    };

    const stageTitles = {
      1: 'STAGE 01 / 03 : KNOWLEDGE GRAPH & RAG',
      2: 'STAGE 02 / 03 : AGENTIC AI & AUTOMATION',
      3: 'STAGE 03 / 03 : AIR-GAPPED ON-PREMISE SLLM',
    };

    let activeStage = 1;

    const setScrollyStage = (targetStage) => {
      activeStage = targetStage;

      scrollyPanels.forEach((panel) => {
        const stageNum = parseInt(panel.getAttribute('data-scrolly-panel'), 10);
        if (stageNum === targetStage) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });

      scrollyCards.forEach((card) => {
        const stageNum = parseInt(card.getAttribute('data-scrolly-card'), 10);
        card.setAttribute('aria-selected', stageNum === targetStage ? 'true' : 'false');
        if (stageNum === targetStage) {
          card.classList.add('is-active');
          card.classList.remove('is-completed', 'is-inactive');
          if (cardStatuses[stageNum]) {
            cardStatuses[stageNum].textContent = '진행 중';
            cardStatuses[stageNum].className = 'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300';
          }
        } else if (stageNum < targetStage) {
          card.classList.add('is-completed');
          card.classList.remove('is-active', 'is-inactive');
          if (cardStatuses[stageNum]) {
            cardStatuses[stageNum].textContent = '완료';
            cardStatuses[stageNum].className = 'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400';
          }
        } else {
          card.classList.add('is-inactive');
          card.classList.remove('is-active', 'is-completed');
          if (cardStatuses[stageNum]) {
            cardStatuses[stageNum].textContent = '대기';
            cardStatuses[stageNum].className = 'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-400';
          }
        }
      });

      if (indicator) {
        if (window.innerWidth < 640) {
          indicator.textContent = `STAGE 0${targetStage} / 03`;
        } else if (stageTitles[targetStage]) {
          indicator.textContent = stageTitles[targetStage];
        }
      }
    };

    let isScrollingTrack = false;
    const handleScrollyProgress = () => {
      isScrollingTrack = false;
      const rect = scrollyTrack.getBoundingClientRect();
      const trackHeight = scrollyTrack.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) return;

      // Frame starts sticking at top: 64px. Total travel spans from rect.top = 64 down to rect.top = -trackHeight
      const totalTravel = trackHeight + 64;
      const currentScroll = Math.max(0, 64 - rect.top);
      const progress = Math.max(0, Math.min(1, currentScroll / totalTravel));

      let stage = 1;
      if (progress < 0.333) {
        stage = 1;
      } else if (progress < 0.666) {
        stage = 2;
      } else {
        stage = 3;
      }

      setScrollyStage(stage);
    };

    window.addEventListener('scroll', () => {
      if (!isScrollingTrack) {
        isScrollingTrack = true;
        requestAnimationFrame(handleScrollyProgress);
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (indicator) {
        if (window.innerWidth < 640) {
          indicator.textContent = `STAGE 0${activeStage} / 03`;
        } else if (stageTitles[activeStage]) {
          indicator.textContent = stageTitles[activeStage];
        }
      }
      handleScrollyProgress();
    }, { passive: true });

    // Initial check
    handleScrollyProgress();

    // Click on Card smoothly jumps to exact stage scroll height
    scrollyCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // If clicking on detail link inside card, let link navigate
        if (e.target.closest('a')) return;

        const stageNum = parseInt(card.getAttribute('data-scrolly-card'), 10);
        const trackTop = scrollyTrack.getBoundingClientRect().top + window.scrollY;
        const trackHeight = scrollyTrack.offsetHeight - window.innerHeight;
        if (trackHeight > 0) {
          const totalTravel = trackHeight + 64;
          const ratio = stageNum === 1 ? 0.05 : stageNum === 2 ? 0.50 : 0.90;
          const targetY = trackTop - 64 + (ratio * totalTravel);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        setScrollyStage(stageNum);
      });
    });
  }

  // 10-B. Hero Atmospheric Depth & Smooth Scroll Transition
  const heroSection = document.querySelector('main > section:first-of-type');
  const heroVideoContainer = document.getElementById('hero-video-container');
  const heroContentWrapper = document.getElementById('hero-content-wrapper');
  if (heroVideoContainer || heroContentWrapper) {
    let isHeroScrolling = false;
    const handleHeroParallax = () => {
      isHeroScrolling = false;
      const scrollY = window.scrollY;
      const heroHeight = heroSection ? heroSection.offsetHeight : 1400;

      // Only execute while near or within the hero section
      if (scrollY > heroHeight + 150) return;

      // Ambient AI video gently deepens into the dark space canvas (#070A12) without washed-out grain
      if (heroVideoContainer) {
        const videoRatio = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.85)));
        const opacity = Math.max(0.20, 1 - (videoRatio * 0.70));
        const scale = 1.0 + (videoRatio * 0.05);
        heroVideoContainer.style.opacity = opacity;
        heroVideoContainer.style.transform = `scale(${scale})`;
      }

      // Hero content stays 100% crisp throughout reading, buttons, and cockpit dock
      // Only as the very bottom approaches the exit into the marquee does it gently ease
      if (heroContentWrapper) {
        const exitThreshold = Math.max(300, heroHeight - window.innerHeight);
        if (scrollY > exitThreshold) {
          const exitRatio = Math.min(1, (scrollY - exitThreshold) / (heroHeight - exitThreshold));
          heroContentWrapper.style.opacity = Math.max(0.4, 1 - (exitRatio * 0.6));
        } else {
          heroContentWrapper.style.opacity = 1;
        }
        heroContentWrapper.style.transform = 'none';
      }
    };

    window.addEventListener('scroll', () => {
      if (!isHeroScrolling) {
        isHeroScrolling = true;
        requestAnimationFrame(handleHeroParallax);
      }
    }, { passive: true });

    handleHeroParallax();
  }

  // 10-C. StatBar Animated Counting Up
  const statCounters = document.querySelectorAll('.stat-counter[data-target]');
  const metricsSection = document.getElementById('metrics-section');
  if (statCounters.length > 0 && metricsSection && 'IntersectionObserver' in window) {
    let hasCounted = false;
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          statCounters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            const animateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              const currentVal = (target * ease).toFixed(decimals);
              counter.textContent = currentVal + suffix;

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                counter.textContent = target.toFixed(decimals) + suffix;
              }
            };
            requestAnimationFrame(animateCount);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });

    counterObserver.observe(metricsSection);
  }

  // 10-D. Bottom CTA Backdrop Luminous Parallax
  const bottomCtaSection = document.getElementById('bottom-cta-section');
  const ctaBackdrop = document.getElementById('cta-luminous-backdrop');
  if (bottomCtaSection && ctaBackdrop) {
    let isCtaScrolling = false;
    const handleCtaParallax = () => {
      isCtaScrolling = false;
      const rect = bottomCtaSection.getBoundingClientRect();
      const winHeight = window.innerHeight;
      if (rect.top < winHeight && rect.bottom > 0) {
        const factor = (winHeight - rect.top) / (winHeight + rect.height);
        const scale = 1.0 + Math.min(0.12, Math.max(0, factor * 0.12));
        ctaBackdrop.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', () => {
      if (!isCtaScrolling) {
        isCtaScrolling = true;
        requestAnimationFrame(handleCtaParallax);
      }
    }, { passive: true });
  }

  // 11. Interactive Certificate Gallery Filter (Clean Minimalist View without Modal)
  const certCards = document.querySelectorAll('[data-cert-id]');
  const certFilterBtns = document.querySelectorAll('[data-cert-filter]');

  if (certCards.length > 0 && certFilterBtns.length > 0) {
    certFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-cert-filter');
        certFilterBtns.forEach((b) => {
          b.classList.remove('bg-[#162846]', 'text-white', 'shadow-xs');
          b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
        });
        btn.classList.add('bg-[#162846]', 'text-white', 'shadow-xs');
        btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

        certCards.forEach((card) => {
          const cat = card.getAttribute('data-cert-category');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 12. Landing Hero Video & Fullscreen Preloader Controller
  const preloader = document.getElementById('page-preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderText = document.getElementById('preloader-text');
  const heroBgVideo = document.getElementById('hero-bg-video');

  if (preloader) {
    let isDismissed = false;

    const dismissPreloader = () => {
      if (isDismissed) return;
      isDismissed = true;

      if (preloaderBar) preloaderBar.style.width = '100%';
      if (preloaderText) preloaderText.textContent = '엔터프라이즈 환경 로딩 완료';

      setTimeout(() => {
        if (heroBgVideo) {
          heroBgVideo.muted = true;
          heroBgVideo.play().catch(() => {});
        }
        preloader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 750);
      }, 300);
    };

    if (heroBgVideo) {
      heroBgVideo.muted = true;

      // Progress animation intermediate step
      setTimeout(() => {
        if (!isDismissed && preloaderBar) preloaderBar.style.width = '65%';
      }, 300);

      // Check if video is already buffered or loaded
      if (heroBgVideo.readyState >= 3) {
        dismissPreloader();
      } else {
        heroBgVideo.addEventListener('loadeddata', dismissPreloader, { once: true });
        heroBgVideo.addEventListener('canplaythrough', dismissPreloader, { once: true });
      }

      // Safety timeout guard: Dismiss within 2.5s even under slow networks
      setTimeout(dismissPreloader, 2500);

      // Mobile low-power and strict browser autoplay policy fallback
      const kickstartOnInteraction = () => {
        heroBgVideo.play().catch(() => {});
        window.removeEventListener('touchstart', kickstartOnInteraction);
        window.removeEventListener('scroll', kickstartOnInteraction);
        window.removeEventListener('click', kickstartOnInteraction);
      };
      window.addEventListener('touchstart', kickstartOnInteraction, { passive: true, once: true });
      window.addEventListener('scroll', kickstartOnInteraction, { passive: true, once: true });
      window.addEventListener('click', kickstartOnInteraction, { passive: true, once: true });
    } else {
      setTimeout(dismissPreloader, 400);
    }
  }
});


