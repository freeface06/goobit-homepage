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

  const openMegaMenu = (menuId) => {
    activeMenuId = menuId;
    renderMegaMenu(menuId);
    if (megaMenuDrawer) {
      megaMenuDrawer.classList.remove('hidden');
    }
    if (megaMenuBackdrop) {
      megaMenuBackdrop.classList.remove('hidden');
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
    if (megaMenuDrawer) {
      megaMenuDrawer.classList.add('hidden');
    }
    if (megaMenuBackdrop) {
      megaMenuBackdrop.classList.add('hidden');
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
    btn.addEventListener('mouseenter', () => {
      const menuId = btn.getAttribute('data-menu-target');
      if (menuId) openMegaMenu(menuId);
    });
    btn.addEventListener('focus', () => {
      const menuId = btn.getAttribute('data-menu-target');
      if (menuId) openMegaMenu(menuId);
    });
  });

  if (header) {
    header.addEventListener('mouseleave', () => {
      closeMegaMenu();
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

  // 10. Core AI Technology Showcase Interactive Tabs & Scroll Sync
  const aiTabButtons = document.querySelectorAll('[data-ai-tab]');
  const aiVisualPanels = document.querySelectorAll('[data-ai-visual]');
  if (aiTabButtons.length > 0 && aiVisualPanels.length > 0) {
    const switchAiTab = (targetId) => {
      aiTabButtons.forEach((btn) => {
        const id = btn.getAttribute('data-ai-tab');
        const isActive = id === targetId;
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          btn.classList.add('bg-white/10', 'border-amber-400', 'shadow-enterprise');
          btn.classList.remove('bg-transparent', 'border-slate-800', 'opacity-60');
          const indicator = btn.querySelector('.tab-indicator');
          if (indicator) indicator.classList.remove('scale-x-0', 'opacity-0');
        } else {
          btn.classList.remove('bg-white/10', 'border-amber-400', 'shadow-enterprise');
          btn.classList.add('bg-transparent', 'border-slate-800', 'opacity-60');
          const indicator = btn.querySelector('.tab-indicator');
          if (indicator) indicator.classList.add('scale-x-0', 'opacity-0');
        }
      });

      aiVisualPanels.forEach((panel) => {
        const panelId = panel.getAttribute('data-ai-visual');
        if (panelId === targetId) {
          panel.classList.remove('is-inactive', 'hidden');
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
          panel.classList.add('is-inactive', 'hidden');
        }
      });
    };

    aiTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-ai-tab');
        if (targetId) switchAiTab(targetId);
      });
    });
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


