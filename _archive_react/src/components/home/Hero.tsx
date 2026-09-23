/**
 * @intent Minimalist bright-tone Hero with top scroll progress bar, ambient glowing orbs, interactive scroll-down indicator, and expanding 16:9 video showcase
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronRight,
  Info,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface HeroProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

interface VideoChapter {
  id: number;
  chapterNumber: string;
  title: string;
  subTitle: string;
  startTime: number;
  endTime: number;
  description: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    chapterNumber: '01',
    title: '구비트 비전 & 10년 엔터프라이즈 업력',
    subTitle: '가치에 진심을 담은 여정',
    startTime: 0,
    endTime: 90,
    description: '공공 정보화 및 대용량 통신 시스템 10여 년 구축 노하우와 독자 솔루션 역량을 소개합니다.'
  },
  {
    id: 2,
    chapterNumber: '02',
    title: '지식그래프 & 하이브리드 RAG 코어 엔진',
    subTitle: '환각 0.2% 미만 무결점 검증',
    startTime: 90,
    endTime: 180,
    description: '공공 비정형 문서를 온톨로지로 지식자산화하는 Goobit AI Suite의 핵심 파이프라인을 시연합니다.'
  },
  {
    id: 3,
    chapterNumber: '03',
    title: '일 5,000만 뷰 무중단 & 행정 혁신 사례',
    subTitle: 'KT 8개년 연속 무중단 ITO',
    startTime: 180,
    endTime: 300,
    description: 'KT 미디어 포털 8개년 연속 무중단 운영과 중앙부처 차세대 정보화 성공 레퍼런스를 공개합니다.'
  }
];

const TOTAL_DURATION = 300;

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollRatio, setScrollRatio] = useState<number>(0);
  const [windowScrollProgress, setWindowScrollProgress] = useState<number>(0);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Video Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(TOTAL_DURATION);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking for Top Progress Bar and Screen 2 Video Resizing
  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall window scroll progress for top indicator
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setWindowScrollProgress(Math.min(Math.max(window.scrollY / totalDocHeight, 0), 1));
      }

      if (!videoSectionRef.current) return;
      const rect = videoSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start expansion as top enters viewport; reach full size when centered
      const startOffset = windowHeight * 0.85;
      const endOffset = windowHeight * 0.15;
      const current = startOffset - rect.top;
      const total = startOffset - endOffset;

      const ratio = Math.min(Math.max(current / total, 0), 1);
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      setCurrentTime(curr);
      const chIdx = CHAPTERS.findIndex((ch) => curr >= ch.startTime && curr < ch.endTime);
      if (chIdx !== -1) setActiveChapterIndex(chIdx);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
      setHasVideoError(false);
    }
  };

  const handleVideoError = () => {
    setHasVideoError(true);
  };

  // Simulated interactive playback fallback if MP4 is not yet placed
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && hasVideoError) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          const chIdx = CHAPTERS.findIndex((ch) => next >= ch.startTime && next < ch.endTime);
          if (chIdx !== -1) setActiveChapterIndex(chIdx);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, hasVideoError, duration]);

  const togglePlay = () => {
    if (videoRef.current && !hasVideoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setHasVideoError(true);
            setIsPlaying(true);
          });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current && !hasVideoError) {
      videoRef.current.currentTime = targetTime;
    }
    const chIdx = CHAPTERS.findIndex((ch) => targetTime >= ch.startTime && targetTime < ch.endTime);
    if (chIdx !== -1) setActiveChapterIndex(chIdx);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];
  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="relative bg-white text-slate-900 overflow-hidden">
      {/* Fixed Top Scroll Progress Bar (2.5px amber bar showing window scroll progress 0% -> 100%) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
        role="progressbar"
        aria-valuenow={Math.round(windowScrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="페이지 스크롤 진행률"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-[width] duration-100 ease-out shadow-[0_0_10px_rgba(245,166,35,0.7)]"
          style={{ width: `${windowScrollProgress * 100}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: TOP HERO (Bright Tone + Giant Typography + Amber Circular Badge) */}
      {/* ========================================================================= */}
      <section
        className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden text-center"
        aria-label="메인 비주얼"
      >
        {/* Soft Ambient Light Gradient Orbs for Depth */}
        <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[620px] h-[360px] bg-gradient-to-tr from-amber-400/15 via-amber-300/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute top-24 right-1/4 w-[520px] h-[380px] bg-gradient-to-bl from-blue-500/10 via-indigo-500/8 to-transparent rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Giant Typography Area with Floating Circular Badge */}
          <div className="relative inline-block max-w-5xl mx-auto px-2 sm:px-6">
            
            {/* Floating Goobit Amber Circular Badge */}
            <div className="absolute -top-10 sm:-top-12 -right-2 sm:-right-6 md:-right-10 z-20 pointer-events-none">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30 flex flex-col items-center justify-center p-2 text-center transform rotate-6 ring-4 ring-white select-none">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase font-extrabold leading-tight">
                  Enterprise
                </span>
                <span className="text-xs sm:text-sm md:text-base font-black leading-tight text-white drop-shadow-xs">
                  Solution
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold text-slate-900 tracking-wider uppercase leading-tight">
                  Provider
                </span>
              </div>
            </div>

            {/* Giant Minimalist Typography */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-[#162846] tracking-tight leading-[1.02]">
              Leading AI<br />
              Driving Value and DX
            </h1>

            {/* Sub-caption */}
            <p className="mt-8 text-base sm:text-lg md:text-xl font-bold text-slate-500 tracking-normal">
              가치에 진심을 담다 | (주)구비트
            </p>
          </div>

          {/* Floating Bottom Pill Bar */}
          <div className="mt-14 sm:mt-18 max-w-3xl mx-auto px-4">
            <div className="p-3 sm:p-3.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-enterprise flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8">
              <span className="text-sm sm:text-base font-semibold text-slate-700">
                공공·통신 엔터프라이즈 AI 혁신 솔루션을 확인해보세요.
              </span>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onNavigate('products', 'ai-suite')}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors"
                >
                  체험하기
                </button>
                <button
                  onClick={() => onNavigate('contact', 'inquiry')}
                  className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold transition-colors shadow-xs"
                >
                  도입문의
                </button>
              </div>
            </div>
          </div>

          {/* Animated Scroll Down Mouse Indicator */}
          <div
            onClick={() => {
              if (videoSectionRef.current) {
                videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mt-16 sm:mt-20 inline-flex flex-col items-center justify-center gap-2.5 text-slate-400 group cursor-pointer select-none transition-transform hover:-translate-y-0.5"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                videoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="소개 영상 및 콘텐츠로 스크롤 이동"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 transition-colors group-hover:text-amber-600">
              Scroll Down
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-300 group-hover:border-amber-400 flex items-start justify-center p-1.5 transition-colors shadow-xs">
              <div className="w-1.5 h-2.5 bg-amber-500 rounded-full animate-bounce-subtle" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCREEN 2: SCROLL-DRIVEN VIDEO RESIZING & MINIMALIST OVERLAY               */}
      {/* ========================================================================= */}
      <section
        ref={videoSectionRef}
        className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-white via-slate-50 to-white"
        aria-label="구비트 솔루션 소개 영상"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Minimalist Copy */}
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#162846] tracking-tight leading-snug">
              '검증받은 기술력'과 '혁신적인 솔루션'으로<br />
              <span className="text-amber-500">대한민국의 AI·DX 시장을 이끌어 갑니다.</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg font-semibold">
              공공·통신 10여 년 노하우 | TBCMS · OPMS · Goobit AI Suite
            </p>
            <div className="pt-3">
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-slate-300 hover:border-slate-800 text-slate-800 hover:text-slate-950 text-sm font-bold transition-all hover:bg-white shadow-xs"
              >
                <span>VIEW MORE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real Video Integration Notice Box */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-700">
                  동영상 파일(MP4/WebM)을{' '}
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 text-amber-600 border border-slate-200 font-bold">
                    public/videos/goobit-intro.mp4
                  </code>{' '}
                  경로에 넣으시면 실제 영상으로 바로 재생됩니다.
                </span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200 shrink-0">
                16:9 FHD
              </span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* Scroll-Expanding 16:9 Cinematic Video Container                       */}
          {/* Starts at scale-95 (max-w-5xl) and expands smoothly to scale-100 (7xl) */}
          {/* ===================================================================== */}
          <div
            style={{
              transform: `scale(${0.95 + scrollRatio * 0.05})`,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`mx-auto w-full transition-all duration-500 ease-out ${
              scrollRatio > 0.4 ? 'max-w-7xl' : 'max-w-5xl'
            }`}
          >
            <div
              ref={playerContainerRef}
              className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(22,40,70,0.35)] ring-1 ring-white/10 group"
            >
              {/* HTML5 Video Tag */}
              <video
                ref={videoRef}
                src="/videos/goobit-intro.mp4"
                poster="/images/goobit_video_poster.jpg"
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onError={handleVideoError}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  hasVideoError ? 'hidden' : 'block'
                }`}
              />

              {/* Standby Visual Poster / Simulated Player Backdrop */}
              {hasVideoError && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0E1A30] via-[#162846] to-[#0A1220] flex flex-col justify-between p-6 sm:p-10 select-none">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,166,35,0.08),transparent_60%)]"></div>

                  <div className="relative flex-1 flex flex-col items-center justify-center text-center space-y-3 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-amber-400">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span>CHAPTER {currentChapter.chapterNumber}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                      {currentChapter.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                      {currentChapter.description}
                    </p>

                    <div className="text-xs font-medium text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800">
                      STATUS: {isPlaying ? 'CHAPTER PLAYING' : 'READY TO PLAY'} ({formatTime(currentTime)} / {formatTime(duration)})
                    </div>
                  </div>
                </div>
              )}

              {/* Goobit Official CI Watermark Top Left */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-slate-200/60">
                  <img
                    src="/images/logo/ci.png"
                    alt="주식회사 구비트"
                    className="h-5 sm:h-6 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Resolution Tag Top Right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded bg-slate-950/85 text-[11px] font-bold text-slate-300 border border-slate-800 backdrop-blur-md">
                  1080P FHD
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-950/85 text-[11px] font-bold text-amber-400 border border-slate-800 backdrop-blur-md">
                  GOOBIT SUITE
                </span>
              </div>

              {/* Center Big Play / Pause Button with Amber Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? '동영상 일시정지' : '동영상 재생'}
                  className={`pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPlaying
                      ? 'opacity-0 hover:opacity-100 bg-slate-900/80 text-white backdrop-blur-md scale-95 hover:scale-100 border border-slate-700'
                      : 'opacity-100 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xl ring-4 ring-amber-500/25 hover:scale-105'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-slate-950" />
                  )}
                </button>
              </div>

              {/* Bottom Scrim & Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 sm:p-5 space-y-3 z-20">
                
                {/* Progress Scrubber Bar */}
                <div className="relative w-full group/scrubber">
                  <div className="w-full h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-amber-500 transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={duration}
                    step="1"
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="동영상 탐색 바"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  
                  {/* Left Controls: Play/Pause, Time, Active Chapter */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg text-white hover:text-amber-400 transition-colors"
                      aria-label={isPlaying ? '일시정지' : '재생'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    <div className="font-semibold text-xs text-slate-300">
                      <span className="text-white font-bold">{formatTime(currentTime)}</span>
                      <span className="text-slate-500 mx-1">/</span>
                      <span className="text-slate-400">{formatTime(duration)}</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-700 text-xs">
                      <span className="font-bold text-amber-400">
                        CH {currentChapter.chapterNumber}
                      </span>
                      <span className="text-slate-300 truncate max-w-xs">
                        {currentChapter.title}
                      </span>
                    </div>
                  </div>

                  {/* Right Controls: Volume, Fullscreen */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
                      aria-label={isMuted ? '음소거 해제' : '음소거'}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
                      aria-label="전체화면"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Hero;
