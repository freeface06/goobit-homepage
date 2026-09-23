/**
 * @intent Latest Card News preview section with ScrollReveal entrance, shimmer hover, and 3D card elevation
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState } from 'react';
import { ArrowRight, Layers, Calendar, Newspaper, Eye } from 'lucide-react';
import { CARD_NEWS_DATA } from '../../data/newsData';
import { CardNewsItem, NavigationMenuId } from '../../types';
import { CardNewsModal } from '../news/CardNewsModal';
import { ScrollReveal } from '../common/ScrollReveal';

interface LatestNewsSectionProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({ onNavigate }) => {
  const [activeModalItem, setActiveModalItem] = useState<CardNewsItem | null>(null);

  // Take the 3 latest articles
  const latestArticles = CARD_NEWS_DATA.slice(0, 3);

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'press':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tech':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'culture':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section className="py-28 lg:py-36 bg-surface-section border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-extrabold mb-4 uppercase tracking-wider">
                <Newspaper className="w-4 h-4" />
                <span>LATEST NEWS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-content-heading tracking-tight leading-snug">
                구비트 최신 카드뉴스
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-content-muted mt-3 font-normal max-w-2xl">
                인공지능 기술 혁신과 주요 프로젝트 소식을 카드뉴스로 전해드립니다.
              </p>
            </div>

            <button
              onClick={() => onNavigate('news')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-300 hover:border-amber-500 bg-white hover:bg-amber-50/50 text-slate-800 hover:text-amber-800 text-sm sm:text-base font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto group"
            >
              <span>회사소식 전체보기</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1.5 transition-all" />
            </button>
          </div>
        </ScrollReveal>

        {/* 3 Latest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {latestArticles.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={idx * 150}
              duration={700}
              className="h-full"
            >
              <article
                onClick={() => setActiveModalItem(item)}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2.5 shimmer-card h-full"
              >
                {/* Card Face (4:3 ratio cover styled like card news) */}
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${item.coverGradient} p-6 flex flex-col justify-between overflow-hidden text-white`}
                >
                  {/* Visual Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                  {/* Top Row: Category Badge & Slide Count */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getCategoryBadgeStyle(
                        item.category
                      )}`}
                    >
                      {item.categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-xs text-amber-400 text-xs font-bold border border-amber-400/20 group-hover:border-amber-400/50 transition-colors">
                      <Layers className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>카드 {item.cardCount}장</span>
                    </div>
                  </div>

                  {/* Cover Headline */}
                  <div className="relative z-10 my-auto py-2">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-3 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Row on Cover */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-slate-300/80 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>열기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Below Cover Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {item.author}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalItem(item);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-amber-600 transition-colors"
                    >
                      <span>카드뉴스 보기</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Card News Fullscreen Reader Modal */}
      {activeModalItem && (
        <CardNewsModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </section>
  );
};

export default LatestNewsSection;
