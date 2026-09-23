/**
 * @intent Dedicated Newsroom sub-view displaying enterprise Card News grid with filtering, searching, and modal reader
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Layers,
  Eye,
  Calendar,
  ArrowRight,
  Filter,
  RotateCcw,
  FileQuestion,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import { CARD_NEWS_DATA } from '../../data/newsData';
import { CardNewsItem, NavigationMenuId } from '../../types';
import { CardNewsModal } from './CardNewsModal';

interface NewsViewProps {
  onNavigate: (view: 'home' | NavigationMenuId, anchor?: string) => void;
  initialCategory?: string;
}

type CategoryFilter = 'all' | 'press' | 'tech' | 'culture';
type SortOption = 'latest' | 'views';

export const NewsView: React.FC<NewsViewProps> = ({ onNavigate, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [activeModalItem, setActiveModalItem] = useState<CardNewsItem | null>(null);

  // Sync initialCategory prop if passed (e.g. from header sub-menu dropdown)
  useEffect(() => {
    if (initialCategory && ['all', 'press', 'tech', 'culture'].includes(initialCategory)) {
      setSelectedCategory(initialCategory as CategoryFilter);
    }
  }, [initialCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: CARD_NEWS_DATA.length,
      press: CARD_NEWS_DATA.filter((i) => i.category === 'press').length,
      tech: CARD_NEWS_DATA.filter((i) => i.category === 'tech').length,
      culture: CARD_NEWS_DATA.filter((i) => i.category === 'culture').length,
    };
  }, []);

  // Filter and sort
  const filteredItems = useMemo(() => {
    return CARD_NEWS_DATA.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query check (title, summary, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(query);
        const summaryMatch = item.summary.toLowerCase().includes(query);
        const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(query));
        return titleMatch || summaryMatch || tagMatch;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'views') {
        return b.views - a.views;
      }
      // 'latest' by date descending
      return b.date.localeCompare(a.date);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('latest');
  };

  const getCategoryBadgeColor = (category: string) => {
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
    <div className="pt-20 pb-24 bg-white min-h-screen">
      {/* 1. Newsroom Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-navy-900 to-navy-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-4 tracking-wider uppercase">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Goobit Newsroom &amp; Card News</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              구비트의 최신 혁신 소식과<br className="hidden sm:inline" />
              기술 이야기를 <span className="text-amber-400">카드뉴스</span>로 만나보세요
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              인공지능 지식그래프 R&amp;D 국책 연구부터 미션 크리티컬 공공 SI 구축 사례, 열정 넘치는 사내 문화까지 구비트의 공식 소식을 한눈에 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Controls Section: Tabs, Search Bar, Sort */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-enterprise border border-slate-200/90 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" role="tablist">
              <button
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  selectedCategory === 'all'
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>전체 소식</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-extrabold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {categoryCounts.all}
                </span>
              </button>

              <button
                role="tab"
                aria-selected={selectedCategory === 'press'}
                onClick={() => setSelectedCategory('press')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  selectedCategory === 'press'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>보도자료</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === 'press'
                      ? 'bg-white text-blue-700 font-extrabold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {categoryCounts.press}
                </span>
              </button>

              <button
                role="tab"
                aria-selected={selectedCategory === 'tech'}
                onClick={() => setSelectedCategory('tech')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  selectedCategory === 'tech'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-extrabold'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>기술·DX</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === 'tech'
                      ? 'bg-slate-900 text-white font-extrabold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {categoryCounts.tech}
                </span>
              </button>

              <button
                role="tab"
                aria-selected={selectedCategory === 'culture'}
                onClick={() => setSelectedCategory('culture')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  selectedCategory === 'culture'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>사내소식</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === 'culture'
                      ? 'bg-white text-emerald-800 font-extrabold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {categoryCounts.culture}
                </span>
              </button>
            </div>

            {/* Right: Search Input & Sort Options */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="제목, 태그, 키워드 검색"
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50 hover:bg-white text-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                    title="검색어 지우기"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold shrink-0">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    sortBy === 'latest'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  최신순
                </button>
                <button
                  onClick={() => setSortBy('views')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    sortBy === 'views'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  조회순
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Card News Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                {/* Visual Card Face (4:3 ratio cover styled like card news) */}
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${item.coverGradient} p-6 flex flex-col justify-between overflow-hidden text-white`}
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                  {/* Top Row: Category Badge & Card Count */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getCategoryBadgeColor(
                        item.category
                      )}`}
                    >
                      {item.categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-xs text-amber-400 text-xs font-bold border border-amber-400/20">
                      <Layers className="w-3.5 h-3.5" />
                      <span>카드 {item.cardCount}장</span>
                    </div>
                  </div>

                  {/* Center/Cover Headline */}
                  <div className="relative z-10 my-auto py-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Goobit Card News #{item.id.replace('news-', '').toUpperCase()}
                    </div>
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
                      <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                        열기 &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Below Cover: Summary, Tags, and Action */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
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
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-4">
              <FileQuestion className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              검색 조건에 맞는 소식이 없습니다
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              입력하신 검색어 '{searchQuery}' 또는 선택된 카테고리에 해당하는 게시물이 없습니다. 검색어를 변경하거나 필터를 초기화해 보세요.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>전체 소식 보기</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. Bottom Consultation Prompt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-navy-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-enterprise">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>구비트와 함께 만드는 미래</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              구비트의 차세대 AI 기술과 솔루션을 귀사에 도입하세요
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              지식그래프 기반 하이브리드 RAG, TBCMS, 공공·통신 SI 구축에 대한 상세한 기술 컨설팅을 제공해 드립니다.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact', 'inquiry')}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm transition-all duration-200 shadow-enterprise flex items-center gap-2 shrink-0"
          >
            <span>도입 문의하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Card News Fullscreen Reader Modal */}
      {activeModalItem && (
        <CardNewsModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </div>
  );
};

export default NewsView;
