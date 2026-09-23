/**
 * @intent Enterprise 16:9 corporate video showcase with Goobit branding watermark, chapter navigation, and video integration guide
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
  Video,
  Layers,
  Network,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  Clock,
  Activity,
  FileCheck2,
  Building2,
  Sparkles
} from 'lucide-react';
import { NavigationMenuId } from '../../types';

interface VideoShowcaseProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

interface VideoChapter {
  id: number;
  chapterNumber: string;
  title: string;
  subTitle: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  timeDisplay: string;
  description: string;
  keyMetric: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    chapterNumber: '01',
    title: '구비트 비전 & 사업 소개',
    subTitle: '가치에 진심을 담은 10여 년의 여정',
    startTime: 0,
    endTime: 105,
    timeDisplay: '00:00 - 01:45',
    description: '2015년 법인 설립 이래 공공 정보화 및 통신 대기업 미션 크리티컬 시스템 구축으로 쌓아온 구비트의 기술 철학과 비전을 소개합니다.',
    keyMetric: '10+년 축적된 엔터프라이즈 업력',
    icon: Building2
  },
  {
    id: 2,
    chapterNumber: '02',
    title: 'AI 기반 공공·통신 솔루션',
    subTitle: '지식그래프 & 하이브리드 RAG 코어 엔진',
    startTime: 105,
    endTime: 210,
    timeDisplay: '01:45 - 03:30',
    description: '비정형 문서를 온톨로지로 자산화하고 환각률을 0.2% 미만으로 억제하는 Goobit AI Suite의 하이브리드 RAG 실물 파이프라인을 시연합니다.',
    keyMetric: '환각 억제율 99.8%',
    icon: Layers
  },
  {
    id: 3,
    chapterNumber: '03',
    title: '고객 성공 사례',
    subTitle: '일 5,000만 뷰 무중단 & 행정 혁신 레퍼런스',
    startTime: 210,
    endTime: 320,
    timeDisplay: '03:30 - 05:20',
    description: 'KT 미디어 포털 8개년 연속 무중단 운영과 주요 정부 부처 및 공공기관에 성공적으로 도입된 실전 구축 사례를 상세히 공개합니다.',
    keyMetric: 'KT 8개년 연속 무중단 ITO',
    icon: ShieldCheck
  }
];

const TOTAL_VIDEO_DURATION = 320; // 5m 20s

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(TOTAL_VIDEO_DURATION);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      setCurrentTime(curr);

      const chIdx = CHAPTERS.findIndex(
        (ch) => curr >= ch.startTime && curr < ch.endTime
      );
      if (chIdx !== -1) {
        setActiveChapterIndex(chIdx);
      }
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

  // Simulated interactive playback fallback when video file is not yet dropped into public/videos/
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
          const chIdx = CHAPTERS.findIndex(
            (ch) => next >= ch.startTime && next < ch.endTime
          );
          if (chIdx !== -1) {
            setActiveChapterIndex(chIdx);
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, hasVideoError, duration, playbackSpeed]);

  const togglePlay = () => {
    if (videoRef.current && !hasVideoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setHasVideoError(true);
          setIsPlaying(true);
        });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleChapterClick = (index: number) => {
    const chapter = CHAPTERS[index];
    setActiveChapterIndex(index);
    setCurrentTime(chapter.startTime);

    if (videoRef.current && !hasVideoError) {
      videoRef.current.currentTime = chapter.startTime;
      if (!isPlaying) {
        videoRef.current.play().catch(() => setHasVideoError(true));
        setIsPlaying(true);
      }
    } else {
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);

    if (videoRef.current && !hasVideoError) {
      videoRef.current.currentTime = targetTime;
    }

    const chIdx = CHAPTERS.findIndex(
      (ch) => targetTime >= ch.startTime && targetTime < ch.endTime
    );
    if (chIdx !== -1) {
      setActiveChapterIndex(chIdx);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSpeedCycle = () => {
    const speeds = [1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);

    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const currentChapter = CHAPTERS[activeChapterIndex];
  const progressPercent = (currentTime / duration) * 100;

  return (
    <section
      className="py-20 lg:py-28 bg-[#162846] text-white relative overflow-hidden border-t border-slate-700/60"
      aria-label="주식회사 구비트 솔루션 소개 영상"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-amber-400">
            <Video className="w-3.5 h-3.5" />
            <span>CORPORATE SOLUTION SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            주식회사 구비트 솔루션 소개 영상
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            공공·통신 10여 년의 신뢰와 지식그래프 기반 생성형 AI 기술을 담은 엔터프라이즈 솔루션 소개 영상입니다.
          </p>
        </div>

        {/* Video Placement Notice Box (Korean Enterprise User Guidance) */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5 sm:mt-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                실제 동영상 파일 연동 안내
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                동영상 파일(MP4/WebM)을 <code className="px-1.5 py-0.5 rounded bg-slate-950 text-amber-400 font-medium border border-slate-800">public/videos/goobit-intro.mp4</code> 경로에 넣으시면 실제 영상으로 바로 재생됩니다.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-medium px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
            스튜디오 모니터 모드
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 16:9 Corporate Video Frame (Studio Monitor Bezel Style)                   */}
        {/* ========================================================================= */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={playerContainerRef}
            className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl group"
          >
            {/* HTML5 Video Tag */}
            <video
              ref={videoRef}
              src="/videos/goobit-intro.mp4"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleVideoError}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                hasVideoError ? 'hidden' : 'block'
              }`}
            />

            {/* Studio Monitor Standby Visual Backdrop (when video file is not yet present) */}
            {hasVideoError && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0E1A30] via-[#162846] to-[#0A1220] flex flex-col justify-between p-6 sm:p-10 select-none">
                
                {/* Center Title & Chapter Display */}
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>CHAPTER {currentChapter.chapterNumber}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
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
              <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-slate-200/50">
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

            {/* Center Big Play / Pause Button with Soft Pulse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? '동영상 일시정지' : '동영상 재생'}
                className={`pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? 'opacity-0 hover:opacity-100 bg-slate-900/80 text-white backdrop-blur-md scale-95 hover:scale-100 border border-slate-700'
                    : 'opacity-100 bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-xl ring-4 ring-amber-500/20 hover:scale-105'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-slate-900" />
                )}
              </button>
            </div>

            {/* Bottom Scrim & Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 sm:p-5 space-y-3 z-20">
              
              {/* Progress & Chapter Scrubber Bar */}
              <div className="relative w-full group/scrubber">
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-amber-500 transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Chapter Marker Ticks */}
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  <div className="w-0.5 h-full bg-white/40"></div>
                  <div
                    className="w-0.5 h-full bg-white/40"
                    style={{ left: `${(105 / TOTAL_VIDEO_DURATION) * 100}%` }}
                  ></div>
                  <div
                    className="w-0.5 h-full bg-white/40"
                    style={{ left: `${(210 / TOTAL_VIDEO_DURATION) * 100}%` }}
                  ></div>
                </div>

                {/* Accessible Native Range Slider on Top */}
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

                {/* Right Controls: Volume, Speed, Fullscreen */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleSpeedCycle}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 border border-slate-700"
                    title="재생 속도 변경"
                  >
                    {playbackSpeed}x
                  </button>

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

          {/* ========================================================================= */}
          {/* Realistic Chapter Index Buttons Strip (01, 02, 03)                        */}
          {/* ========================================================================= */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHAPTERS.map((ch, idx) => {
              const ChIcon = ch.icon;
              const isActive = activeChapterIndex === idx;

              return (
                <button
                  key={ch.id}
                  onClick={() => handleChapterClick(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                    isActive
                      ? 'bg-slate-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-amber-500 text-slate-900'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        CHAPTER {ch.chapterNumber}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {ch.timeDisplay}
                      </span>
                    </div>

                    <div className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                      <ChIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{ch.title}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ch.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-emerald-400">
                      {ch.keyMetric}
                    </span>
                    <span
                      className={`text-[11px] font-bold transition-colors ${
                        isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {isActive && isPlaying ? '재생 중' : '챕터 시청'} &rarr;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Technology Trust Badges Strip */}
          <div className="mt-8 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-center">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>환각 없는 지식그래프 검증 시연</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>전자정부 표준프레임워크 4.x 호환</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>초당 5,000만 뷰 KT 통신 무중단 ITO</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>사내 망분리 온프레미스 배포 보장</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact', 'inquiry')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>온프레미스 실물 데모 및 기술 문의</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('products', 'ai-suite')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-slate-300" />
              <span>소프트웨어 제품 라인업 전체보기</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoShowcase;
