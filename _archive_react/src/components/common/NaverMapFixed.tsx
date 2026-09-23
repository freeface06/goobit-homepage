/**
 * @intent Dedicated high-fidelity fixed Naver Map component for Goobit headquarters with interactive controls, route guide, and official Naver Green UI
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Train,
  Layers,
  Compass,
  Building2,
  CheckCircle2
} from 'lucide-react';

export interface NaverMapFixedProps {
  className?: string;
}

export const NaverMapFixed: React.FC<NaverMapFixedProps> = ({ className = '' }) => {
  const [mapMode, setMapMode] = useState<'standard' | 'satellite'>('standard');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const COMPANY_NAME = '주식회사 구비트 (GOOBIT)';
  const EXACT_ADDRESS = '서울특별시 송파구 법원로 11길 7 문정현대지식산업센터 C동 408호 (우편번호: 05836)';
  const COPY_ADDRESS_TEXT = '서울특별시 송파구 법원로 11길 7 문정현대지식산업센터 C동 408호';
  const COORDINATES = '37.4853° N, 127.1215° E';

  const NAVER_MAP_SEARCH_URL = `https://map.naver.com/p/search/${encodeURIComponent('서울특별시 송파구 법원로 11길 7 문정현대지식산업센터')}`;
  const NAVER_MAP_DIRECTIONS_URL = `https://map.naver.com/p/search/${encodeURIComponent('문정현대지식산업센터 C동 구비트')}`;
  const KAKAO_MAP_URL = `https://map.kakao.com/?q=${encodeURIComponent('서울특별시 송파구 법원로 11길 7 문정현대지식산업센터')}`;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 1.75));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.8));
  };

  const handleResetCenter = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(COPY_ADDRESS_TEXT);
      setCopied(true);
      setToastMessage('주소가 클립보드에 복사되었습니다.');
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setToastMessage(null), 2500);
    } catch {
      setToastMessage('주소: ' + COPY_ADDRESS_TEXT);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const isSat = mapMode === 'satellite';

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white shadow-enterprise overflow-hidden flex flex-col transition-all ${className}`}
      aria-label="네이버 지도 찾아오시는 길 안내"
    >
      <style>{`
        @keyframes radarRipple {
          0% {
            r: 12;
            opacity: 0.85;
            stroke-width: 2;
          }
          50% {
            opacity: 0.5;
            stroke-width: 1.5;
          }
          100% {
            r: 58;
            opacity: 0;
            stroke-width: 0.8;
          }
        }
        @keyframes walkDashes {
          0% {
            stroke-dashoffset: 40;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-radar-1 {
          animation: radarRipple 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .animate-radar-2 {
          animation: radarRipple 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          animation-delay: 0.85s;
        }
        .animate-radar-3 {
          animation: radarRipple 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          animation-delay: 1.7s;
        }
        .animate-walking-path {
          stroke-dasharray: 8 6;
          animation: walkDashes 1.6s linear infinite;
        }
      `}</style>

      {/* 1. Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Official Naver Green Brand Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#03C75A] text-white text-xs font-extrabold tracking-wide shadow-xs">
              <span className="font-black text-sm tracking-tighter leading-none">N</span>
              <span className="text-[11px] font-bold">지도</span>
              <span className="text-white/60 text-[10px]">|</span>
              <span className="text-[11px] font-bold">(주)구비트 본사</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              {COORDINATES}
            </span>
          </div>
          <div className="text-xs sm:text-sm font-medium text-slate-200">
            {EXACT_ADDRESS}
          </div>
        </div>

        {/* Header Direct Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <a
            href={NAVER_MAP_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#03C75A]"
            title="네이버 지도 새 창에서 크게보기"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#03C75A]" />
            <span>네이버 지도에서 크게보기</span>
          </a>
          <a
            href={NAVER_MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#03C75A] hover:bg-[#02b350] text-white text-xs font-bold transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
            title="네이버 빠른 길찾기 실행"
          >
            <Navigation className="w-3.5 h-3.5 text-white" />
            <span>빠른 길찾기</span>
          </a>
        </div>
      </div>

      {/* 2. Map Container (Fixed height: h-[420px] md:h-[480px]) */}
      <div
        ref={containerRef}
        className={`relative w-full h-[420px] md:h-[480px] overflow-hidden select-none transition-colors duration-300 ${
          isSat ? 'bg-[#0B132B]' : 'bg-[#F4F4EE]'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="주식회사 구비트 위치 지도 캔버스 (드래그 및 줌 조작 가능)"
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-[#03C75A] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Interactive Controls Overlay - Top Right (Map View Toggle) */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMapMode('standard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              !isSat
                ? 'bg-[#03C75A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            일반지도
          </button>
          <button
            type="button"
            onClick={() => setMapMode('satellite')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              isSat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>위성지도</span>
          </button>
        </div>

        {/* Interactive Controls Overlay - Bottom Right (Zoom & Reset) */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1.5">
          <div className="flex flex-col bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200 overflow-hidden divide-y divide-slate-200">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="지도 확대"
              className="p-2.5 text-slate-700 hover:text-[#03C75A] hover:bg-slate-50 transition-colors"
              title="확대"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="지도 축소"
              className="p-2.5 text-slate-700 hover:text-[#03C75A] hover:bg-slate-50 transition-colors"
              title="축소"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetCenter}
              aria-label="지도 위치 초기화"
              className="p-2.5 text-slate-700 hover:text-[#03C75A] hover:bg-slate-50 transition-colors"
              title="위치 초기화"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Scale Legend */}
          <div className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs border border-slate-300 text-[10px] text-slate-600 font-bold shadow-xs">
            50m
          </div>
        </div>

        {/* Naver Map Watermark - Bottom Left */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs border border-slate-200 shadow-xs pointer-events-none">
          <span className="w-4 h-4 rounded bg-[#03C75A] text-white font-black text-[11px] flex items-center justify-center leading-none">
            N
          </span>
          <span className="text-[11px] font-extrabold text-slate-800 tracking-tight">NAVER</span>
          <span className="text-[9px] text-slate-400 font-medium">| 지도 데이터</span>
        </div>

        {/* Top-left Quick Transport Badge */}
        <div className="absolute top-3.5 left-3.5 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-sm text-xs font-bold text-slate-800">
          <Train className="w-3.5 h-3.5 text-[#EA545D]" />
          <span>8호선 문정역 4번 출구 도보 5분</span>
        </div>

        {/* High-Fidelity SVG Interactive Vector Canvas */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full pointer-events-auto"
          preserveAspectRatio="xMidYMid slice"
        >
          <g
            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
            style={{
              transformOrigin: '500px 300px',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            {/* Background Base */}
            <rect
              width="1000"
              height="600"
              fill={isSat ? '#0B132B' : '#F4F4EE'}
            />

            {/* Satellite Grid Texture or Map Grid Texture */}
            {isSat ? (
              <g opacity="0.15">
                <path d="M 0 100 H 1000 M 0 200 H 1000 M 0 300 H 1000 M 0 400 H 1000 M 0 500 H 1000" stroke="#38BDF8" strokeWidth="1" />
                <path d="M 150 0 V 600 M 300 0 V 600 M 450 0 V 600 M 600 0 V 600 M 750 0 V 600 M 900 0 V 600" stroke="#38BDF8" strokeWidth="1" />
              </g>
            ) : (
              <g opacity="0.35">
                <path d="M 0 150 H 1000 M 0 350 H 1000 M 0 500 H 1000" stroke="#E2E2D8" strokeWidth="1" />
                <path d="M 200 0 V 600 M 500 0 V 600 M 800 0 V 600" stroke="#E2E2D8" strokeWidth="1" />
              </g>
            )}

            {/* Munjeong Culture Valley Pedestrian Plaza (문정컬처밸리 녹지 보행로) */}
            <polygon
              points="840,250 840,320 630,320 630,300 520,300 520,260 630,260 630,250"
              fill={isSat ? '#064E3B' : '#E2F0D9'}
              stroke={isSat ? '#059669' : '#C5E0B4'}
              strokeWidth="1.5"
              opacity={isSat ? 0.45 : 0.9}
            />
            <text
              x="690"
              y="288"
              fill={isSat ? '#34D399' : '#4E7D32'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              문정컬처밸리 (보행자 전용 문화광장)
            </text>

            {/* Surrounding Park Grids */}
            <rect
              x="360"
              y="50"
              width="300"
              height="25"
              rx="4"
              fill={isSat ? '#064E3B' : '#E8F5E9'}
              stroke={isSat ? '#059669' : '#C8E6C9'}
              strokeWidth="1"
              opacity={isSat ? 0.4 : 0.8}
            />

            {/* Songpa-daero (송파대로) - Arterial Highway Road */}
            <rect
              x="850"
              y="0"
              width="90"
              height="600"
              fill={isSat ? '#1E293B' : '#FFEAA7'}
              stroke={isSat ? '#334155' : '#FDCB6E'}
              strokeWidth="2"
            />
            {/* Songpa-daero Lane Markings */}
            <line
              x1="895"
              y1="0"
              x2="895"
              y2="600"
              stroke={isSat ? '#64748B' : '#FFFFFF'}
              strokeWidth="2.5"
              strokeDasharray="14 10"
            />
            <text
              x="895"
              y="70"
              fill={isSat ? '#94A3B8' : '#B7791F'}
              fontSize="12"
              fontWeight="extrabold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              송파대로 (8호선 라인)
            </text>

            {/* Beobwon-ro (법원로) - East-West Main Avenue */}
            <rect
              x="160"
              y="180"
              width="690"
              height="44"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#334155' : '#CBD5E1'}
              strokeWidth="1.5"
            />
            <line
              x1="160"
              y1="202"
              x2="850"
              y2="202"
              stroke={isSat ? '#475569' : '#F1F5F9'}
              strokeWidth="2"
              strokeDasharray="10 8"
            />
            <text
              x="260"
              y="207"
              fill={isSat ? '#94A3B8' : '#64748B'}
              fontSize="12"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
            >
              법원로 &rarr;
            </text>

            {/* Beobwon-ro 11-gil (법원로 11길) - Road passing C-dong */}
            <rect
              x="475"
              y="180"
              width="36"
              height="330"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#334155' : '#CBD5E1'}
              strokeWidth="1.5"
            />
            <text
              x="493"
              y="440"
              transform="rotate(-90 493 440)"
              fill={isSat ? '#94A3B8' : '#64748B'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              법원로 11길
            </text>

            {/* Jeongui-ro (정의로) - South Avenue */}
            <rect
              x="160"
              y="490"
              width="690"
              height="40"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#334155' : '#CBD5E1'}
              strokeWidth="1.5"
            />
            <text
              x="720"
              y="515"
              fill={isSat ? '#94A3B8' : '#64748B'}
              fontSize="12"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
            >
              정의로
            </text>

            {/* Surrounding Landmark Buildings */}
            {/* Seoul Eastern District Court (서울동부지방법원) */}
            <rect
              x="360"
              y="85"
              width="210"
              height="80"
              rx="8"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#38BDF8' : '#D1D5DB'}
              strokeWidth="1.5"
            />
            <text
              x="465"
              y="125"
              fill={isSat ? '#E2E8F0' : '#1F2937'}
              fontSize="12"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              서울동부지방법원
            </text>
            <text
              x="465"
              y="143"
              fill={isSat ? '#94A3B8' : '#6B7280'}
              fontSize="10"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              (송파구 문정법조단지)
            </text>

            {/* Seoul Eastern District Prosecutors' Office (서울동부지방검찰청) */}
            <rect
              x="600"
              y="85"
              width="180"
              height="80"
              rx="8"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#38BDF8' : '#D1D5DB'}
              strokeWidth="1.5"
            />
            <text
              x="690"
              y="130"
              fill={isSat ? '#E2E8F0' : '#1F2937'}
              fontSize="12"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              서울동부지방검찰청
            </text>

            {/* Munjeong Station Terra Tower 1 (문정역 테라타워 1) */}
            <rect
              x="660"
              y="240"
              width="140"
              height="90"
              rx="8"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#475569' : '#D1D5DB'}
              strokeWidth="1.5"
            />
            <text
              x="730"
              y="285"
              fill={isSat ? '#CBD5E1' : '#374151'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              문정역 테라타워 1
            </text>

            {/* M-State (엠스테이트) */}
            <rect
              x="660"
              y="360"
              width="140"
              height="95"
              rx="8"
              fill={isSat ? '#1E293B' : '#FFFFFF'}
              stroke={isSat ? '#475569' : '#D1D5DB'}
              strokeWidth="1.5"
            />
            <text
              x="730"
              y="410"
              fill={isSat ? '#CBD5E1' : '#374151'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              문정 엠스테이트
            </text>

            {/* Hyundai Knowledge Industry Center Complex (문정현대지식산업센터) */}
            {/* A-dong (A동) */}
            <rect
              x="330"
              y="245"
              width="125"
              height="90"
              rx="8"
              fill={isSat ? '#1E293B' : '#F8FAFC'}
              stroke={isSat ? '#475569' : '#CBD5E1'}
              strokeWidth="1.5"
            />
            <text
              x="392"
              y="290"
              fill={isSat ? '#94A3B8' : '#475569'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              현대지식산업센터
            </text>
            <text
              x="392"
              y="308"
              fill={isSat ? '#64748B' : '#64748B'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              A동
            </text>

            {/* B-dong (B동) */}
            <rect
              x="330"
              y="365"
              width="125"
              height="95"
              rx="8"
              fill={isSat ? '#1E293B' : '#F8FAFC'}
              stroke={isSat ? '#475569' : '#CBD5E1'}
              strokeWidth="1.5"
            />
            <text
              x="392"
              y="410"
              fill={isSat ? '#94A3B8' : '#475569'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              현대지식산업센터
            </text>
            <text
              x="392"
              y="428"
              fill={isSat ? '#64748B' : '#64748B'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="Pretendard, sans-serif"
              textAnchor="middle"
            >
              B동
            </text>

            {/* TARGET BUILDING: C-dong (C동 408호 (주)구비트 본사) */}
            <g>
              {/* Outer Glow Halo for C-dong */}
              <rect
                x="526"
                y="246"
                width="118"
                height="118"
                rx="12"
                fill={isSat ? 'rgba(56, 189, 248, 0.15)' : 'rgba(3, 199, 90, 0.12)'}
                stroke={isSat ? '#38BDF8' : '#03C75A'}
                strokeWidth="2.5"
              />
              {/* Building Body */}
              <rect
                x="530"
                y="250"
                width="110"
                height="110"
                rx="10"
                fill={isSat ? '#0F172A' : '#F0FDF4'}
                stroke={isSat ? '#03C75A' : '#03C75A'}
                strokeWidth="2"
              />
              <text
                x="585"
                y="285"
                fill={isSat ? '#FFFFFF' : '#14532D'}
                fontSize="11"
                fontWeight="extrabold"
                fontFamily="Pretendard, sans-serif"
                textAnchor="middle"
              >
                현대지식산업센터
              </text>
              <text
                x="585"
                y="306"
                fill="#03C75A"
                fontSize="14"
                fontWeight="900"
                fontFamily="Pretendard, sans-serif"
                textAnchor="middle"
              >
                C동
              </text>
              <rect
                x="545"
                y="320"
                width="80"
                height="22"
                rx="5"
                fill="#03C75A"
              />
              <text
                x="585"
                y="335"
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="extrabold"
                fontFamily="Pretendard, sans-serif"
                textAnchor="middle"
              >
                408호 [구비트]
              </text>
            </g>

            {/* Subway Station Landmark: 8호선 문정역 */}
            <g transform="translate(850, 270)">
              {/* Station Body Pill */}
              <rect
                x="15"
                y="20"
                width="60"
                height="130"
                rx="12"
                fill={isSat ? '#1E293B' : '#FFFFFF'}
                stroke="#EA545D"
                strokeWidth="2.5"
              />
              {/* Seoul Metro Line 8 Magenta Badge */}
              <circle cx="45" cy="50" r="17" fill="#EA545D" />
              <text
                x="45"
                y="56"
                fill="#FFFFFF"
                fontSize="15"
                fontWeight="900"
                fontFamily="Pretendard, sans-serif"
                textAnchor="middle"
              >
                8
              </text>
              <text
                x="45"
                y="85"
                fill={isSat ? '#FFFFFF' : '#111827'}
                fontSize="12"
                fontWeight="extrabold"
                fontFamily="Pretendard, sans-serif"
                textAnchor="middle"
              >
                문정역
              </text>

              {/* Station Exit 4 */}
              <g transform="translate(-40, 5)">
                <rect
                  x="-8"
                  y="0"
                  width="44"
                  height="22"
                  rx="6"
                  fill="#EA545D"
                />
                <text
                  x="14"
                  y="15"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="Pretendard, sans-serif"
                  textAnchor="middle"
                >
                  4번 출구
                </text>
              </g>

              {/* Station Exit 3 */}
              <g transform="translate(-40, 115)">
                <rect
                  x="-8"
                  y="0"
                  width="44"
                  height="22"
                  rx="6"
                  fill={isSat ? '#334155' : '#64748B'}
                />
                <text
                  x="14"
                  y="15"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="Pretendard, sans-serif"
                  textAnchor="middle"
                >
                  3번 출구
                </text>
              </g>
            </g>

            {/* Walking Path: From Munjeong Station Exit 4 to Hyundai Knowledge Industry Center C-dong */}
            <g>
              {/* Under-glow stroke for high contrast */}
              <path
                d="M 810 286 L 740 286 L 640 286 L 600 286 L 585 305"
                fill="none"
                stroke={isSat ? 'rgba(3, 199, 90, 0.4)' : 'rgba(3, 199, 90, 0.25)'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Dashed Route Line */}
              <path
                d="M 810 286 L 740 286 L 640 286 L 600 286 L 585 305"
                fill="none"
                stroke="#03C75A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-walking-path"
              />

              {/* Waypoint dots */}
              <circle cx="810" cy="286" r="5" fill="#EA545D" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="740" cy="286" r="3.5" fill="#03C75A" />
              <circle cx="640" cy="286" r="3.5" fill="#03C75A" />

              {/* Walking Route Information Badge */}
              <g transform="translate(680, 240)">
                <rect
                  x="-65"
                  y="-16"
                  width="130"
                  height="28"
                  rx="14"
                  fill={isSat ? '#0F172A' : '#FFFFFF'}
                  stroke="#03C75A"
                  strokeWidth="1.8"
                  filter="drop-shadow(0 2px 6px rgba(0,0,0,0.15))"
                />
                <text
                  x="0"
                  y="2"
                  fill={isSat ? '#34D399' : '#047857'}
                  fontSize="11"
                  fontWeight="extrabold"
                  fontFamily="Pretendard, sans-serif"
                  textAnchor="middle"
                >
                  도보 5분 (약 350m) &larr;
                </text>
              </g>
            </g>

            {/* TARGET LOCATION PIN & RADAR (구비트 본사 C동) */}
            <g transform="translate(585, 305)">
              {/* Expanding Radar Circles */}
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="none"
                stroke="#03C75A"
                className="animate-radar-1"
              />
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="none"
                stroke="#03C75A"
                className="animate-radar-2"
              />
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="none"
                stroke="#03C75A"
                className="animate-radar-3"
              />

              {/* Target Spot Center Dot */}
              <circle cx="0" cy="0" r="4.5" fill="#03C75A" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Naver Map Marker Pin */}
              <g transform="translate(0, -10)">
                {/* Pin Shadow */}
                <ellipse cx="0" cy="10" rx="9" ry="3.5" fill="rgba(0,0,0,0.25)" />
                {/* Pin Shape */}
                <path
                  d="M 0 8 C -14 -12 -16 -26 -16 -36 A 16 16 0 1 1 16 -36 C 16 -26 14 -12 0 8 Z"
                  fill="#03C75A"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.25))"
                />
                {/* Inner White Dot / Building Icon */}
                <circle cx="0" cy="-36" r="6" fill="#FFFFFF" />
              </g>

              {/* Custom Naver-Style Marker Tooltip Card */}
              <g transform="translate(0, -96)">
                {/* Tooltip Card Body */}
                <rect
                  x="-125"
                  y="-42"
                  width="250"
                  height="72"
                  rx="10"
                  fill={isSat ? '#0F172A' : '#FFFFFF'}
                  stroke="#03C75A"
                  strokeWidth="2"
                  filter="drop-shadow(0 6px 16px rgba(0,0,0,0.2))"
                />
                {/* Pointer Tail down to the Pin */}
                <polygon
                  points="-8,30 8,30 0,40"
                  fill={isSat ? '#0F172A' : '#FFFFFF'}
                  stroke="#03C75A"
                  strokeWidth="2"
                />
                {/* Overlay to mask the border on the pointer joint */}
                <line x1="-7" y1="29.5" x2="7" y2="29.5" stroke={isSat ? '#0F172A' : '#FFFFFF'} strokeWidth="2.5" />

                {/* Top Green Accent Pill */}
                <rect
                  x="-115"
                  y="-34"
                  width="92"
                  height="16"
                  rx="4"
                  fill="#03C75A"
                />
                <text
                  x="-69"
                  y="-22"
                  fill="#FFFFFF"
                  fontSize="9.5"
                  fontWeight="extrabold"
                  fontFamily="Pretendard, sans-serif"
                  textAnchor="middle"
                >
                  NAVER 지도 인증 본사
                </text>

                {/* Company Name */}
                <text
                  x="-115"
                  y="-3"
                  fill={isSat ? '#FFFFFF' : '#0F172A'}
                  fontSize="13.5"
                  fontWeight="900"
                  fontFamily="Pretendard, sans-serif"
                >
                  주식회사 구비트
                </text>

                {/* Detail Address */}
                <text
                  x="-115"
                  y="15"
                  fill={isSat ? '#94A3B8' : '#475569'}
                  fontSize="10.5"
                  fontWeight="medium"
                  fontFamily="Pretendard, sans-serif"
                >
                  문정현대지식산업센터 C동 408호 (8호선 350m)
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* 3. Bottom Action Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Quick Location & Transport badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-semibold shadow-2xs">
            <Train className="w-3.5 h-3.5 text-[#EA545D]" />
            <span>8호선 문정역 4번 출구 도보 5분</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-semibold shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>문정현대지식산업센터 C동 408호</span>
          </div>
        </div>

        {/* Right: Action Buttons Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Primary Naver Green Button */}
          <a
            href={NAVER_MAP_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <Navigation className="w-4 h-4 text-white shrink-0" />
            <span>네이버 지도에서 길찾기</span>
          </a>

          {/* Copy Address Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
            title="도로명 주소 클립보드 복사"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>주소 복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>주소 복사</span>
              </>
            )}
          </button>

          {/* Kakao Map Secondary Link */}
          <a
            href={KAKAO_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-[#191919] text-xs font-bold transition-all shadow-2xs"
            title="카카오맵에서 위치 보기"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#191919]" />
            <span>카카오맵</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NaverMapFixed;
