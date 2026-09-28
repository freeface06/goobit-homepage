/**
 * @intent Comprehensive test suite for dedicated news detail page, inline dual-viewer, list page navigation links, and Krds accessibility
 * @agent  manager-develop
 * @branch task-dedicated-news-detail-page
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// File paths
const rootDir = path.resolve(__dirname, '..');
const newsDetailHtmlPath = path.join(rootDir, 'news-detail.html');
const newsHtmlPath = path.join(rootDir, 'news.html');
const indexHtmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'style.css');
const newsDetailJsPath = path.join(rootDir, 'js', 'news-detail.js');
const cardNewsJsPath = path.join(rootDir, 'js', 'card-news.js');
const dataJsPath = path.join(rootDir, 'js', 'data.js');

let passCount = 0;
let failCount = 0;

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`[PASS] ${testName}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${testName}`);
    console.error(`       Error: ${err.message}`);
    failCount++;
  }
}

console.log('================================================================');
console.log('Starting Dedicated News Detail Page Test Suite');
console.log('================================================================');

// Read files
const newsDetailHtml = fs.readFileSync(newsDetailHtmlPath, 'utf8');
const newsHtml = fs.readFileSync(newsHtmlPath, 'utf8');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const newsDetailJs = fs.readFileSync(newsDetailJsPath, 'utf8');
const cardNewsJs = fs.readFileSync(cardNewsJsPath, 'utf8');
const dataJs = fs.readFileSync(dataJsPath, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: news-detail.html must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(newsDetailHtml), false, 'news-detail.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/news-detail.js must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(newsDetailJs), false, 'js/news-detail.js must not contain emoji');
});

runTest('Strict No-Emoji Policy: news detail CSS section in css/style.css must not contain unicode emoji', () => {
  const cssSectionMatch = cssContent.match(/Dedicated News Detail & Inline Dual-Viewer Card Styles[\s\S]*$/);
  assert.ok(cssSectionMatch, 'News detail CSS section must exist in style.css');
  assert.strictEqual(emojiRegex.test(cssSectionMatch[0]), false, 'News detail CSS must not contain emoji');
});

runTest('Strict No-Emoji Policy: modified news.html must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(newsHtml), false, 'news.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: modified index.html news section must not contain unicode emoji', () => {
  const newsSecMatch = indexHtml.match(/<!-- 8\. LatestNewsSection[\s\S]*?<\/section>/);
  assert.ok(newsSecMatch, 'News section must exist in index.html');
  assert.strictEqual(emojiRegex.test(newsSecMatch[0]), false, 'index.html news section must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: news-detail.html must contain standard header block annotations', () => {
  assert.ok(newsDetailHtml.includes('@intent'), '@intent missing in news-detail.html');
  assert.ok(newsDetailHtml.includes('@agent'), '@agent missing in news-detail.html');
  assert.ok(newsDetailHtml.includes('@branch'), '@branch missing in news-detail.html');
  assert.ok(newsDetailHtml.includes('task-dedicated-news-detail-page'), 'Branch name missing in news-detail.html');
});

runTest('Annotation: js/news-detail.js must contain standard header block annotations', () => {
  assert.ok(newsDetailJs.includes('@intent'), '@intent missing in js/news-detail.js');
  assert.ok(newsDetailJs.includes('@agent'), '@agent missing in js/news-detail.js');
  assert.ok(newsDetailJs.includes('@branch'), '@branch missing in js/news-detail.js');
  assert.ok(newsDetailJs.includes('task-dedicated-news-detail-page'), 'Branch name missing in js/news-detail.js');
});

runTest('Annotation: css/style.css must contain news detail block annotations', () => {
  assert.ok(cssContent.includes('@intent') && cssContent.includes('task-dedicated-news-detail-page'), 'Branch task-dedicated-news-detail-page missing in style.css');
});

// 3. GNB Header & Footer Parity Verification
runTest('GNB Parity: news-detail.html must include standard GNB header with 4 core menus', () => {
  assert.ok(newsDetailHtml.includes('company.html'), 'company.html link missing in GNB');
  assert.ok(newsDetailHtml.includes('products.html'), 'products.html link missing in GNB');
  assert.ok(newsDetailHtml.includes('services.html'), 'services.html link missing in GNB');
  assert.ok(newsDetailHtml.includes('news.html'), 'news.html link missing in GNB');
  assert.ok(newsDetailHtml.includes('id="mega-menu-drawer"'), 'mega-menu-drawer missing');
  assert.ok(newsDetailHtml.includes('id="mega-menu-backdrop"'), 'mega-menu-backdrop missing');
  assert.ok(newsDetailHtml.includes('id="mobile-menu-drawer"'), 'mobile-menu-drawer missing');
  assert.ok(newsDetailHtml.includes('id="mobile-menu-toggle"'), 'mobile-menu-toggle missing');
});

runTest('Footer Parity: news-detail.html must include standard bright footer and legal info', () => {
  assert.ok(newsDetailHtml.includes('role="contentinfo"'), 'Footer role="contentinfo" missing');
  assert.ok(newsDetailHtml.includes('698-86-00102'), 'Business registration number missing in footer');
  assert.ok(newsDetailHtml.includes('02-517-5520'), 'Phone number missing in footer');
  assert.ok(newsDetailHtml.includes('contact@goobit.co.kr'), 'Email missing in footer');
});

// 4. HTML Markup & Layout Structure Verification
runTest('HTML Markup: Breadcrumb, article header, and dual viewer containers must exist', () => {
  assert.ok(newsDetailHtml.includes('id="news-breadcrumb-target"'), '#news-breadcrumb-target missing');
  assert.ok(newsDetailHtml.includes('id="news-header-target"'), '#news-header-target missing');
  assert.ok(newsDetailHtml.includes('id="news-slider-container"'), '#news-slider-container missing');
  assert.ok(newsDetailHtml.includes('id="news-slider-content"'), '#news-slider-content missing');
  assert.ok(newsDetailHtml.includes('id="news-thumbnails-strip"'), '#news-thumbnails-strip missing');
  assert.ok(newsDetailHtml.includes('id="news-expanded-container"'), '#news-expanded-container missing');
  assert.ok(newsDetailHtml.includes('id="news-expanded-content"'), '#news-expanded-content missing');
  assert.ok(newsDetailHtml.includes('id="news-bottom-meta-target"'), '#news-bottom-meta-target missing');
  assert.ok(newsDetailHtml.includes('id="news-related-grid-target"'), '#news-related-grid-target missing');
});

runTest('HTML Markup: View Mode Toggle buttons must have appropriate ARIA attributes', () => {
  assert.ok(newsDetailHtml.includes('id="toggle-btn-slider"'), '#toggle-btn-slider missing');
  assert.ok(newsDetailHtml.includes('id="toggle-btn-expanded"'), '#toggle-btn-expanded missing');
  assert.ok(newsDetailHtml.includes('role="tab"'), 'role="tab" missing on toggle buttons');
  assert.ok(newsDetailHtml.includes('role="tablist"'), 'role="tablist" missing on toggle group');
});

runTest('HTML Markup: Toast notification and consultation CTA banner must exist', () => {
  assert.ok(newsDetailHtml.includes('id="news-toast"'), '#news-toast missing');
  assert.ok(newsDetailHtml.includes('role="status"'), 'role="status" missing on toast');
  assert.ok(newsDetailHtml.includes('aria-live="polite"'), 'aria-live="polite" missing on toast');
  assert.ok(newsDetailHtml.includes('href="contact.html#inquiry"'), 'CTA link to contact.html#inquiry missing');
});

runTest('HTML Markup: KRDS Skip navigation link must exist', () => {
  assert.ok(newsDetailHtml.includes('class="skip-link"'), 'skip-link class missing');
  assert.ok(newsDetailHtml.includes('href="#main-content"'), 'href="#main-content" missing on skip-link');
});

// 5. CSS Animation and Polish Verification
runTest('CSS: Keyframes newsSlideFadeIn and newsToastSlideUp must use cubic-bezier(0.16, 1, 0.3, 1)', () => {
  assert.ok(cssContent.includes('@keyframes newsSlideFadeIn'), 'newsSlideFadeIn missing in style.css');
  assert.ok(cssContent.includes('@keyframes newsToastSlideUp'), 'newsToastSlideUp missing in style.css');
  assert.ok(cssContent.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'cubic-bezier(0.16, 1, 0.3, 1) missing in style.css');
});

runTest('CSS Accessibility: prefers-reduced-motion must be declared for news detail animations', () => {
  const reducedMotionMatch = cssContent.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?news-slide-animate[\s\S]*?\}/);
  assert.ok(reducedMotionMatch, 'prefers-reduced-motion block for news detail elements missing');
  assert.ok(reducedMotionMatch[0].includes('animation: none !important'), 'animation: none missing in reduced-motion');
});

// 6. NewsDetailController Unit Tests in Node.js
// Mock CARD_NEWS_DATA by loading from js/data.js
let CARD_NEWS_DATA;
try {
  const sandbox = {};
  const fn = new Function('window', dataJs + '; return CARD_NEWS_DATA;');
  CARD_NEWS_DATA = fn(sandbox);
} catch (e) {
  assert.fail(`Failed to parse CARD_NEWS_DATA from js/data.js: ${e.message}`);
}

const { NewsDetailController } = require(newsDetailJsPath);

runTest('Controller: Should instantiate with CARD_NEWS_DATA and default to first item', () => {
  const controller = new NewsDetailController({ dataSource: CARD_NEWS_DATA });
  assert.strictEqual(controller.dataSource.length, 6, 'Should load 6 news items');
  controller.loadNews('news-rag-national-project');
  assert.strictEqual(controller.currentItem.id, 'news-rag-national-project');
  assert.strictEqual(controller.currentSlideIndex, 0);
  assert.strictEqual(controller.viewMode, 'slider');
});

runTest('Controller: Should safely fallback to first news item if invalid ID requested', () => {
  const controller = new NewsDetailController({ dataSource: CARD_NEWS_DATA });
  controller.loadNews('non-existent-news-id-12345');
  assert.ok(controller.currentItem, 'Current item should be set');
  assert.strictEqual(controller.currentItem.id, CARD_NEWS_DATA[0].id, 'Should fallback to first item');
});

runTest('Controller: Slide navigation (next, prev, goToSlide) within bounds', () => {
  const controller = new NewsDetailController({ dataSource: CARD_NEWS_DATA });
  controller.loadNews('news-rag-national-project');
  const totalSlides = controller.currentItem.slides.length;
  assert.strictEqual(totalSlides, 5, 'news-rag-national-project should have 5 slides');

  // Next slide
  controller.nextSlide();
  assert.strictEqual(controller.currentSlideIndex, 1);

  // Jump to slide 4
  controller.goToSlide(4);
  assert.strictEqual(controller.currentSlideIndex, 4);

  // Next slide at boundary should stay at 4
  controller.nextSlide();
  assert.strictEqual(controller.currentSlideIndex, 4);

  // Prev slide
  controller.prevSlide();
  assert.strictEqual(controller.currentSlideIndex, 3);

  // Out of bounds jump should be ignored
  controller.goToSlide(99);
  assert.strictEqual(controller.currentSlideIndex, 3);
  controller.goToSlide(-1);
  assert.strictEqual(controller.currentSlideIndex, 3);
});

runTest('Controller: View mode switching (slider <-> expanded)', () => {
  const controller = new NewsDetailController({ dataSource: CARD_NEWS_DATA });
  controller.loadNews('news-tbcms-update');
  assert.strictEqual(controller.viewMode, 'slider');

  controller.setViewMode('expanded');
  assert.strictEqual(controller.viewMode, 'expanded');

  controller.setViewMode('slider');
  assert.strictEqual(controller.viewMode, 'slider');
});

runTest('Controller: Category and Accent style helpers return valid CSS classes', () => {
  const controller = new NewsDetailController({ dataSource: CARD_NEWS_DATA });
  const pressStyle = controller.getCategoryBadgeStyles('press');
  assert.ok(pressStyle.badgeClass.includes('blue'), 'Press badge should have blue styles');

  const techStyle = controller.getCategoryBadgeStyles('tech');
  assert.ok(techStyle.badgeClass.includes('amber'), 'Tech badge should have amber styles');

  const cultureStyle = controller.getCategoryBadgeStyles('culture');
  assert.ok(cultureStyle.badgeClass.includes('emerald'), 'Culture badge should have emerald styles');

  const amberAccent = controller.getAccentStyles('amber');
  assert.ok(amberAccent.activeBar.includes('amber'), 'Amber accent should have amber active bar');

  const cyanAccent = controller.getAccentStyles('cyan');
  assert.ok(cyanAccent.activeBar.includes('cyan'), 'Cyan accent should have cyan active bar');
});

runTest('Controller: Keyboard handler moves slider when in slider view', () => {
  const controller = new NewsDetailController({ dataSource: CARD_NEWS_DATA });
  controller.loadNews('news-office-expansion');
  assert.strictEqual(controller.currentSlideIndex, 0);

  // Right arrow advances slide
  controller.handleKeyDown({ key: 'ArrowRight', preventDefault: () => {} });
  assert.strictEqual(controller.currentSlideIndex, 1);

  // Left arrow steps back
  controller.handleKeyDown({ key: 'ArrowLeft', preventDefault: () => {} });
  assert.strictEqual(controller.currentSlideIndex, 0);

  // When inside an input element, arrow keys should be ignored
  controller.handleKeyDown({ key: 'ArrowRight', target: { tagName: 'INPUT' }, preventDefault: () => {} });
  assert.strictEqual(controller.currentSlideIndex, 0);
});

// 7. List Page Modifications Verification
runTest('List Page news.html: Cards must link to news-detail.html?id=${item.id}', () => {
  assert.ok(newsHtml.includes('href="news-detail.html?id=${item.id}"'), 'news.html card link missing news-detail.html?id=');
  assert.ok(!newsHtml.includes('data-news-id="${item.id}"'), 'data-news-id modal trigger must be removed from news.html grid template');
});

runTest('List Page index.html: 3 Latest news cards must link to news-detail.html?id=...', () => {
  assert.ok(indexHtml.includes('href="news-detail.html?id=news-rag-national-project"'), 'Card 1 link missing in index.html');
  assert.ok(indexHtml.includes('href="news-detail.html?id=news-tbcms-update"'), 'Card 2 link missing in index.html');
  assert.ok(indexHtml.includes('href="news-detail.html?id=news-office-expansion"'), 'Card 3 link missing in index.html');
  assert.ok(!indexHtml.includes('data-news-id="news-rag-national-project"'), 'data-news-id must be removed from Card 1 in index.html');
  assert.ok(!indexHtml.includes('data-news-id="news-tbcms-update"'), 'data-news-id must be removed from Card 2 in index.html');
  assert.ok(!indexHtml.includes('data-news-id="news-office-expansion"'), 'data-news-id must be removed from Card 3 in index.html');
});

runTest('Modal Interceptor card-news.js: Must not hijack regular links with href', () => {
  assert.ok(cardNewsJs.includes('trigger.closest(\'a[href]\')'), 'card-news.js must check for anchor links to prevent hijacking');
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
