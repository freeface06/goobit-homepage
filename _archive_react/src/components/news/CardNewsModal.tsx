/**
 * @intent Interactive full-screen Card News reader modal with segmented progress, keyboard/touch navigation, and enterprise styling
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import { CardNewsItem } from '../../types';

interface CardNewsModalProps {
  item: CardNewsItem | null;
  onClose: () => void;
  initialSlideIndex?: number;
}

export const CardNewsModal: React.FC<CardNewsModalProps> = ({
  item,
  onClose,
  initialSlideIndex = 0,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [copied, setCopied] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync initial slide index when item changes
  useEffect(() => {
    setCurrentSlideIndex(initialSlideIndex);
  }, [item, initialSlideIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  const totalSlides = item?.slides.length ?? 0;

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, goToNextSlide, goToPrevSlide, onClose]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    const threshold = 50;

    if (diff > threshold) {
      // Swiped left -> next
      goToNextSlide();
    } else if (diff < -threshold) {
      // Swiped right -> prev
      goToPrevSlide();
    }
    touchStartXRef.current = null;
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!item) return null;

  const currentSlide = item.slides[currentSlideIndex] || item.slides[0];

  // Accent styling mappings
  const getAccentColorClasses = (accent: string) => {
    switch (accent) {
      case 'amber':
        return {
          pill: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
          statBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          activeBar: 'bg-amber-400',
          dot: 'bg-amber-400',
          ring: 'focus-visible:ring-amber-400',
        };
      case 'cyan':
        return {
          pill: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
          statBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          activeBar: 'bg-cyan-400',
          dot: 'bg-cyan-400',
          ring: 'focus-visible:ring-cyan-400',
        };
      case 'emerald':
        return {
          pill: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
          statBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          activeBar: 'bg-emerald-400',
          dot: 'bg-emerald-400',
          ring: 'focus-visible:ring-emerald-400',
        };
      case 'blue':
      default:
        return {
          pill: 'bg-blue-400/20 text-blue-300 border-blue-400/40',
          statBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          activeBar: 'bg-blue-400',
          dot: 'bg-blue-400',
          ring: 'focus-visible:ring-blue-400',
        };
    }
  };

  const accentStyles = getAccentColorClasses(currentSlide.accentColor);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-news-headline"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white transition-all max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Segmented Progress Bar */}
        <div className="px-6 pt-4 pb-2 bg-slate-950/60 border-b border-slate-800">
          <div className="flex items-center gap-1.5 w-full">
            {item.slides.map((slide, idx) => (
              <button
                key={slide.slideNumber}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`슬라이드 ${idx + 1}로 이동`}
                className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-800 transition-all focus:outline-none"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    idx < currentSlideIndex
                      ? 'bg-slate-400'
                      : idx === currentSlideIndex
                      ? accentStyles.activeBar
                      : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Modal Header Bar */}
          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {item.categoryLabel}
              </span>
              <span className="truncate font-medium text-slate-300 hidden sm:inline">
                {item.title}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-slate-400 text-xs">
                {String(currentSlideIndex + 1).padStart(2, '0')} /{' '}
                {String(totalSlides).padStart(2, '0')}
              </span>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                title="공유하기"
                aria-label="카드뉴스 링크 복사"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span className="text-[11px] hidden sm:inline">
                  {copied ? '복사됨' : '공유'}
                </span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Body Content (Scrollable if necessary) */}
        <div
          className={`flex-1 overflow-y-auto p-6 sm:p-10 bg-gradient-to-br ${currentSlide.bgGradient} flex flex-col justify-between min-h-[380px] sm:min-h-[440px]`}
        >
          {/* Top of Slide: Badge & Category */}
          <div>
            <div className="flex items-center justify-between mb-4">
              {currentSlide.badge && (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${accentStyles.pill}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentSlide.badge}</span>
                </div>
              )}
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1 ml-auto">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            </div>

            {/* Headline */}
            <h2
              id="card-news-headline"
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug sm:leading-tight mb-2 text-balance"
            >
              {currentSlide.headline}
            </h2>

            {/* Subheadline */}
            {currentSlide.subheadline && (
              <p className="text-sm sm:text-base text-slate-300 font-medium mb-4 leading-relaxed">
                {currentSlide.subheadline}
              </p>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-6 font-normal">
              {currentSlide.description}
            </p>

            {/* Key Points list */}
            {currentSlide.keyPoints && currentSlide.keyPoints.length > 0 && (
              <div className="space-y-2 mb-6">
                {currentSlide.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Stat Callout Card */}
            {currentSlide.statCallout && (
              <div
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 mt-4 backdrop-blur-sm ${accentStyles.statBg}`}
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {currentSlide.statCallout.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {currentSlide.statCallout.label}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs opacity-75 font-mono">
                  <span>Goobit Verified</span>
                </div>
              </div>
            )}
          </div>

          {/* Slide Footer: CI Watermark & Tags */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">주식회사 구비트</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">{item.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {currentSlideIndex + 1} / {totalSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Navigation Arrows */}
        {currentSlideIndex > 0 && (
          <button
            onClick={goToPrevSlide}
            aria-label="이전 카드 슬라이드"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentSlideIndex < totalSlides - 1 && (
          <button
            onClick={goToNextSlide}
            aria-label="다음 카드 슬라이드"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Modal Bottom Control Bar */}
        <div className="px-6 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={goToPrevSlide}
            disabled={currentSlideIndex === 0}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors ${
              currentSlideIndex === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 카드</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {item.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`${idx + 1}번 슬라이드로 이동`}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none ${
                  idx === currentSlideIndex
                    ? `w-5 ${accentStyles.dot}`
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={goToNextSlide}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-xs"
            >
              <span>다음 카드</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1 transition-all shadow-xs"
            >
              <span>목록으로 돌아가기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardNewsModal;
