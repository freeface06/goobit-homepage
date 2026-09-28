/**
 * @intent Test suite for AI Prompt Typing Animation and Living Aurora Text Gradient with Brand Slogan
 * @agent  manager-develop
 * @branch task-brand-slogan-hero-copywriting
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Target file paths
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'style.css');
const jsPath = path.join(rootDir, 'js', 'main.js');

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
console.log('Starting Hero AI Prompt Typing & Living Aurora Text Gradient Test Suite');
console.log('================================================================');

// Read files
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');
const testContent = fs.readFileSync(__filename, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: index.html must not contain unicode emoji in hero section', () => {
  const heroMatch = htmlContent.match(/<section id="hero-section"[\s\S]*?<\/section>/);
  assert.ok(heroMatch, 'Hero section must exist in index.html');
  assert.strictEqual(emojiRegex.test(heroMatch[0]), false, 'Hero section in index.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: css/style.css hero typing and aurora styles must not contain unicode emoji', () => {
  const typingBlockMatch = cssContent.match(/Hero AI Prompt Typing Motion[\s\S]*?Dedicated News Detail/);
  assert.ok(typingBlockMatch, 'Hero AI prompt typing style block must exist in style.css');
  assert.strictEqual(emojiRegex.test(typingBlockMatch[0]), false, 'Typing and aurora styles must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/main.js hero animation controller must not contain unicode emoji', () => {
  const jsHeroBlockMatch = jsContent.match(/Landing Hero Video & Fullscreen Preloader Controller[\s\S]*$/);
  assert.ok(jsHeroBlockMatch, 'Preloader and hero controller must exist in main.js');
  assert.strictEqual(emojiRegex.test(jsHeroBlockMatch[0]), false, 'Hero controller in main.js must not contain emoji');
});

runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testContent), false, 'Test file must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html must contain standard header and hero typing annotations with branch name', () => {
  assert.ok(htmlContent.includes('@intent') && htmlContent.includes('@agent') && htmlContent.includes('@branch'), 'Header comment annotation missing');
  assert.ok(
    htmlContent.includes('task-brand-slogan-hero-copywriting') ||
    htmlContent.includes('task-hero-aurora-text-gradient-restoration'),
    'Branch task-brand-slogan-hero-copywriting missing in index.html'
  );
});

runTest('Annotation: css/style.css must contain standard block annotations with branch name', () => {
  assert.ok(cssContent.includes('@intent') && cssContent.includes('@agent') && cssContent.includes('@branch'), 'CSS block annotation missing');
  assert.ok(
    cssContent.includes('task-brand-slogan-hero-copywriting') ||
    cssContent.includes('task-hero-aurora-text-gradient-restoration'),
    'Branch task-brand-slogan-hero-copywriting missing in css/style.css'
  );
});

runTest('Annotation: js/main.js must contain standard block annotations with branch name', () => {
  assert.ok(jsContent.includes('@intent') && jsContent.includes('@agent') && jsContent.includes('@branch'), 'JS block annotation missing');
  assert.ok(
    jsContent.includes('task-brand-slogan-hero-copywriting') ||
    jsContent.includes('task-hero-aurora-text-gradient-restoration'),
    'Branch task-brand-slogan-hero-copywriting missing in js/main.js'
  );
});

// 3. HTML Markup & Exclusion Verification
runTest('HTML Markup: h1 tag must have aria-label and accessible sr-only text for screen readers', () => {
  const h1Match = htmlContent.match(/<h1[^>]*aria-label="가치에 진심을 담다, 인공지능으로 이끄는 혁신 엔터프라이즈 AI (?:&amp;|&) DX"[^>]*>/);
  assert.ok(h1Match, 'h1 must contain required aria-label attribute');
  assert.ok(
    htmlContent.includes('<span class="sr-only">가치에 진심을 담다, 인공지능으로 이끄는 혁신 엔터프라이즈 AI & DX</span>') ||
    htmlContent.includes('<span class="sr-only">가치에 진심을 담다, 인공지능으로 이끄는 혁신 엔터프라이즈 AI &amp; DX</span>'),
    'sr-only text must be present for accessibility'
  );
});

runTest('HTML Markup: 3 Hero Type Line containers must exist with required IDs and classes', () => {
  assert.ok(htmlContent.includes('id="hero-type-line-1"'), 'hero-type-line-1 missing');
  assert.ok(htmlContent.includes('id="hero-type-line-2"'), 'hero-type-line-2 missing');
  assert.ok(htmlContent.includes('id="hero-type-line-3"'), 'hero-type-line-3 missing');
  assert.ok(htmlContent.includes('hero-type-line block min-h-[1.18em]'), 'hero-type-line class structure missing');
});

runTest('HTML Markup: Line 3 gradient target must match exact restoration specification', () => {
  assert.ok(htmlContent.includes('id="hero-type-gradient-target"'), 'hero-type-gradient-target missing');
  assert.ok(htmlContent.includes('class="hero-aurora-text bg-clip-text text-transparent"'), 'hero-aurora-text classes missing on gradient target');
  assert.ok(
    htmlContent.includes('<span id="hero-type-line-3" class="hero-type-line block min-h-[1.18em]"><span id="hero-type-gradient-target" class="hero-aurora-text bg-clip-text text-transparent"></span></span>'),
    'Exact line-3 container structure must match specification'
  );
});

runTest('Strict Exclusion: hero-glow-backdrop must NEVER exist in index.html', () => {
  assert.strictEqual(htmlContent.includes('hero-glow-backdrop'), false, 'hero-glow-backdrop backdrop must NOT exist in index.html');
});

runTest('HTML Markup: Neon amber cursor elements and subtext must exist', () => {
  assert.ok(htmlContent.includes('id="hero-typing-cursor"'), 'hero-typing-cursor missing');
  assert.ok(htmlContent.includes('hero-typing-cursor'), 'hero-typing-cursor class missing');
  assert.ok(htmlContent.includes('bg-amber-400'), 'bg-amber-400 missing on cursor');
  assert.ok(htmlContent.includes('shadow-[0_0_12px_rgba(245,166,35,0.85)]'), 'Neon glow shadow missing on cursor');
  assert.ok(htmlContent.includes('id="hero-subtext"'), 'id="hero-subtext" missing');
  assert.ok(htmlContent.includes('hero-subtext-reveal'), 'hero-subtext-reveal missing');
  assert.ok(htmlContent.includes('공공·통신 10년의 미션 크리티컬 신뢰 위에 지식그래프와 자율 Agentic AI를 결합하여, 고객과 함께 지속 가능한 엔터프라이즈 DX의 미래 가치를 완성합니다.'), 'Subtext copy missing');
});

// 4. CSS Keyframes and Styling Rules Verification
runTest('CSS Keyframes: @keyframes heroAuroraShift must be defined with 0%, 50%, 100% background-position points', () => {
  assert.ok(cssContent.includes('@keyframes heroAuroraShift'), '@keyframes heroAuroraShift missing');
  const auroraKeyframes = cssContent.slice(cssContent.indexOf('@keyframes heroAuroraShift'));
  const closingBraceIdx = auroraKeyframes.indexOf('}');
  const fullBlock = auroraKeyframes.slice(0, auroraKeyframes.indexOf('}', closingBraceIdx + 15));
  assert.ok(fullBlock.includes('background-position: 0% 50%'), '0% background-position missing');
  assert.ok(fullBlock.includes('background-position: 100% 50%'), '50% background-position missing');
});

runTest('CSS Styling: .hero-aurora-text and #hero-type-gradient-target must implement full living aurora gradient specification', () => {
  assert.ok(cssContent.includes('.hero-aurora-text'), '.hero-aurora-text selector missing');
  assert.ok(cssContent.includes('#hero-type-gradient-target'), '#hero-type-gradient-target selector missing');
  assert.ok(cssContent.includes('linear-gradient(135deg, #F5A623 0%, #FF7A00 25%, #FCD34D 50%, #38BDF8 75%, #F5A623 100%)'), 'Living aurora color stops missing');
  assert.ok(cssContent.includes('background-size: 280% 280%'), 'background-size: 280% 280% missing');
  assert.ok(cssContent.includes('-webkit-background-clip: text'), '-webkit-background-clip missing');
  assert.ok(cssContent.includes('background-clip: text'), 'background-clip: text missing');
  assert.ok(cssContent.includes('-webkit-text-fill-color: transparent'), '-webkit-text-fill-color missing');
  assert.ok(cssContent.includes('display: inline-block'), 'display: inline-block missing');
  assert.ok(cssContent.includes('animation: heroAuroraShift 8s ease-in-out infinite'), 'heroAuroraShift 8s ease-in-out infinite animation missing');
  assert.ok(cssContent.includes('drop-shadow(0 2px 14px rgba(245, 166, 35, 0.35))'), 'drop-shadow glow filter missing');
});

runTest('Strict Exclusion: hero-glow-backdrop must NEVER exist in css/style.css', () => {
  assert.strictEqual(cssContent.includes('hero-glow-backdrop'), false, 'hero-glow-backdrop styles must NOT exist in style.css');
});

runTest('CSS Keyframes: @keyframes heroCursorBlink must have high-visibility blinking opacity curve', () => {
  assert.ok(cssContent.includes('@keyframes heroCursorBlink'), '@keyframes heroCursorBlink missing');
  assert.ok(cssContent.includes('0%, 45%'), 'heroCursorBlink 0%, 45% missing');
  assert.ok(cssContent.includes('50%, 95%'), 'heroCursorBlink 50%, 95% missing');
  assert.ok(cssContent.includes('.hero-cursor-blink'), '.hero-cursor-blink missing');
  assert.ok(cssContent.includes('.hero-cursor-hidden'), '.hero-cursor-hidden missing');
});

runTest('CSS Timing & Composited Properties: cubic-bezier(0.16, 1, 0.3, 1) and composited properties only for subtext', () => {
  assert.ok(cssContent.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'cubic-bezier(0.16, 1, 0.3, 1) must be used');
  assert.ok(cssContent.includes('.hero-subtext-reveal'), '.hero-subtext-reveal styles missing');
  assert.ok(cssContent.includes('.hero-subtext-active .hero-subtext-reveal') || cssContent.includes('.hero-subtext-reveal.revealed'), 'Subtext revealed rule missing');
});

runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must disable aurora animation and blinking', () => {
  assert.ok(cssContent.includes('@media (prefers-reduced-motion: reduce)'), '@media (prefers-reduced-motion: reduce) block missing');
  const typingBlock = cssContent.slice(cssContent.indexOf('Hero AI Prompt Typing Motion'));
  const reducedMotionIdx = typingBlock.indexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(reducedMotionIdx !== -1, 'Reduced motion block inside hero typing section missing');
  const reducedMotionSection = typingBlock.slice(reducedMotionIdx, typingBlock.indexOf('/* ===', reducedMotionIdx));
  assert.ok(reducedMotionSection.includes('animation: none !important'), 'Animation reset in reduced-motion missing');
  assert.ok(reducedMotionSection.includes('background-position: 0% 50% !important'), 'Aurora background-position reset in reduced-motion missing');
});

// 5. JS Controller Logic Verification
runTest('JS Controller: initHeroTypingAnimation function must be defined and exported', () => {
  assert.ok(jsContent.includes('function initHeroTypingAnimation'), 'initHeroTypingAnimation function definition missing in main.js');
  const mainModule = require('../js/main.js');
  assert.strictEqual(typeof mainModule.initHeroTypingAnimation, 'function', 'initHeroTypingAnimation must be exported');
});

runTest('JS Controller: Typing line strings and timing constants must match specification', () => {
  assert.ok(jsContent.includes('가치에 진심을 담다,'), 'Line 1 string missing');
  assert.ok(jsContent.includes('인공지능으로 이끄는 혁신'), 'Line 2 string missing');
  assert.ok(jsContent.includes('엔터프라이즈 AI & DX'), 'Line 3 string missing');
  assert.ok(jsContent.includes('140'), 'Comma 140ms pause missing');
  assert.ok(jsContent.includes('160'), 'Line transition 160ms pause missing');
  assert.ok(jsContent.includes('1500'), 'Completion 1.5s (1500ms) cursor pause missing');
});

runTest('JS Controller: Integration with dismissPreloader, triggerHeroAnimation and IntersectionObserver', () => {
  assert.ok(jsContent.includes('initHeroTypingAnimation()'), 'Typing controller initialization missing');
  assert.ok(jsContent.includes('triggerHeroAnimation'), 'triggerHeroAnimation missing');
  assert.ok(jsContent.includes('hasStarted'), 'hasStarted guard missing');
  assert.ok(jsContent.includes('hasTyped'), 'hasTyped flag missing');
});

// 6. Controller Simulation in Mock DOM Environment
runTest('JS Simulation: initHeroTypingAnimation finishInstantly sets text and hides cursor', () => {
  const line1 = { textContent: '', appendChild: (c) => { line1._cursor = c; } };
  const line2 = { textContent: '', appendChild: (c) => { line2._cursor = c; } };
  const line3 = { textContent: '', appendChild: (c) => { line3._cursor = c; } };
  const gradientTarget = { textContent: '' };
  const cursor = {
    classList: {
      classes: new Set(['hero-cursor-blink']),
      add(cls) { this.classes.add(cls); },
      remove(cls) { this.classes.delete(cls); },
      contains(cls) { return this.classes.has(cls); }
    }
  };
  const subtext = {
    classList: {
      classes: new Set(),
      add(cls) { this.classes.add(cls); },
      contains(cls) { return this.classes.has(cls); }
    }
  };
  const heroSection = {
    classList: {
      classes: new Set(),
      add(cls) { this.classes.add(cls); },
      contains(cls) { return this.classes.has(cls); }
    }
  };

  const originalDocument = global.document;
  global.document = {
    getElementById(id) {
      if (id === 'hero-type-line-1') return line1;
      if (id === 'hero-type-line-2') return line2;
      if (id === 'hero-type-line-3') return line3;
      if (id === 'hero-type-gradient-target') return gradientTarget;
      if (id === 'hero-typing-cursor') return cursor;
      if (id === 'hero-subtext') return subtext;
      if (id === 'hero-section') return heroSection;
      return null;
    },
    querySelector(sel) {
      if (sel === '.hero-subtext-reveal') return subtext;
      return null;
    },
    addEventListener() {}
  };

  const mainModule = require('../js/main.js');
  const controller = mainModule.initHeroTypingAnimation();
  assert.strictEqual(typeof controller.start, 'function');
  assert.strictEqual(typeof controller.finishInstantly, 'function');

  controller.finishInstantly();

  assert.strictEqual(line1.textContent, '가치에 진심을 담다,');
  assert.strictEqual(line2.textContent, '인공지능으로 이끄는 혁신');
  assert.strictEqual(gradientTarget.textContent, '엔터프라이즈 AI & DX');
  assert.ok(cursor.classList.contains('hero-cursor-hidden'), 'Cursor must be hidden after finishInstantly');
  assert.ok(subtext.classList.contains('revealed'), 'Subtext must have revealed class');
  assert.strictEqual(controller.hasTyped(), true, 'hasTyped must be true');

  // Restore document
  global.document = originalDocument;
});

console.log('================================================================');
console.log(`Test Execution Completed: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}
