/**
 * @intent KRDS/WCAG 2.1 AA compliant keyboard skip navigation link
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-5 focus:py-3 focus:bg-navy-900 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-enterprise-lg focus:border-2 focus:border-ai-cyan focus:outline-none"
    >
      본문 바로가기 (Skip to Main Content)
    </a>
  );
};
