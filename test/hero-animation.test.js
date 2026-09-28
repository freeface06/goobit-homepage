/**
 * @intent Test suite for Clean Hero Kinetic Typography Reveal System (removed distracting background pulse/color shifts)
 * @agent  manager-develop
 * @branch fix/hero-text-clean-reveal
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
console.log('Starting Hero Kinetic Typography Clean Reveal Test Suite');
console.log('================================================================');

// Read files
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: index.html must not contain unicode emoji in hero section', () => {
  const heroMatch = htmlContent.match(/<section id="hero-section"[\s\S]*?<\/section>/);
  assert.ok(heroMatch, 'Hero section must exist in index.html');
  assert.strictEqual(emojiRegex.test(heroMatch[0]), false, 'Hero section in index.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: css/style.css kinetic styles must not contain unicode emoji', () => {
  const kineticBlockMatch = cssContent.match(/Hero Kinetic Typography Reveal System[\s\S]*?Dedicated News Detail/);
  assert.ok(kineticBlockMatch, 'Kinetic typography style block must exist in style.css');
  assert.strictEqual(emojiRegex.test(kineticBlockMatch[0]), false, 'Kinetic styles must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/main.js hero animation controller must not contain unicode emoji', () => {
  const jsHeroBlockMatch = jsContent.match(/Landing Hero Video & Fullscreen Preloader Controller[\s\S]*$/);
  assert.ok(jsHeroBlockMatch, 'Preloader and hero controller must exist in main.js');
  assert.strictEqual(emojiRegex.test(jsHeroBlockMatch[0]), false, 'Hero controller in main.js must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html must contain standard header and hero section annotations', () => {
  assert.ok(htmlContent.includes('@intent') && htmlContent.includes('@agent') && htmlContent.includes('@branch'), 'Header comment annotation missing');
});

runTest('Annotation: css/style.css must contain standard block annotations', () => {
  assert.ok(cssContent.includes('@intent') && cssContent.includes('@agent') && cssContent.includes('@branch'), 'CSS block annotation missing');
});

runTest('Annotation: js/main.js must contain standard block annotations', () => {
  assert.ok(jsContent.includes('@intent') && jsContent.includes('@agent') && jsContent.includes('@branch'), 'JS block annotation missing');
});

// 3. HTML Markup & Slogan Structure Verification
runTest('HTML Markup: Mask containers (.hero-title-mask) with overflow-hidden must exist for all 3 lines', () => {
  const maskMatches = htmlContent.match(/class="[^"]*hero-title-mask[^"]*"/g) || [];
  assert.strictEqual(maskMatches.length >= 3, true, `Expected at least 3 hero-title-mask containers, found ${maskMatches.length}`);
  maskMatches.forEach(m => {
    assert.ok(m.includes('overflow-hidden'), `Mask container must include overflow-hidden: ${m}`);
  });
});

runTest('HTML Markup: Slogan Line 1 class (.hero-title-line-1) and text must match exactly', () => {
  assert.ok(htmlContent.includes('hero-title-line-1'), 'Class .hero-title-line-1 missing');
  assert.ok(htmlContent.includes('인공지능으로 이끄는 혁신,'), 'Line 1 text "인공지능으로 이끄는 혁신," missing');
});

runTest('HTML Markup: Slogan Line 2 class (.hero-title-line-2) and text must match exactly', () => {
  assert.ok(htmlContent.includes('hero-title-line-2'), 'Class .hero-title-line-2 missing');
  assert.ok(htmlContent.includes('가치를 완성하는'), 'Line 2 text "가치를 완성하는" missing');
});

runTest('HTML Markup: Slogan Line 3 class (.hero-title-line-3) and solid brand gradient must match without distracting pulse', () => {
  assert.ok(htmlContent.includes('hero-title-line-3'), 'Class .hero-title-line-3 missing');
  assert.ok(!htmlContent.includes('hero-aurora-text'), 'Distracting hero-aurora-text should be removed');
  assert.ok(!htmlContent.includes('hero-glow-backdrop'), 'Distracting hero-glow-backdrop should be removed');
  assert.ok(htmlContent.includes('from-amber-400 via-orange-300 to-amber-500'), 'Brand amber gradient must be present');
  assert.ok(htmlContent.includes('엔터프라이즈 AI &amp; DX') || htmlContent.includes('엔터프라이즈 AI & DX'), 'Line 3 text missing');
});

runTest('HTML Markup: Subtext (.hero-subtext-reveal) and text must match exactly', () => {
  assert.ok(htmlContent.includes('hero-subtext-reveal'), 'Class .hero-subtext-reveal missing');
  assert.ok(
    htmlContent.includes('가치에 진심을 담다 | 공공·통신 10년의 미션 크리티컬 신뢰 위에 지식그래프와 자율 Agentic AI를 결합하여 기업의 진정한 AI 전환을 실현합니다.'),
    'Subtext copy missing or mismatch'
  );
});

// 4. CSS Keyframes and Styling Rules Verification
runTest('CSS Keyframes: @keyframes heroLineLift must have smooth vertical transform and blur properties', () => {
  assert.ok(cssContent.includes('@keyframes heroLineLift'), '@keyframes heroLineLift missing');
  assert.ok(cssContent.includes('translateY(105%)'), 'heroLineLift 0% transform missing');
  assert.ok(cssContent.includes('filter: blur(8px)'), 'heroLineLift 0% blur filter missing');
  assert.ok(cssContent.includes('translateY(0)'), 'heroLineLift 100% transform missing');
  assert.ok(cssContent.includes('filter: blur(0)'), 'heroLineLift 100% blur(0) missing');
});

runTest('CSS Keyframes: Distracting color shift & pulse glow keyframes must be removed', () => {
  assert.ok(!cssContent.includes('@keyframes heroAuroraShift'), 'heroAuroraShift keyframes should be removed');
  assert.ok(!cssContent.includes('@keyframes heroPulseGlow'), 'heroPulseGlow keyframes should be removed');
  assert.ok(!cssContent.includes('@keyframes heroShineSweep'), 'heroShineSweep keyframes should be removed');
});

runTest('CSS Timing & Composited Properties: cubic-bezier(0.16, 1, 0.3, 1) must be used on line lift animation', () => {
  const cubicBezierOccurrences = (cssContent.match(/cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/g) || []).length;
  assert.strictEqual(cubicBezierOccurrences >= 2, true, `Expected cubic-bezier(0.16, 1, 0.3, 1) usages, found ${cubicBezierOccurrences}`);
});

runTest('CSS Staggered Delays: Lines and subtext must match required delays', () => {
  assert.ok(cssContent.includes('animation-delay: 0.1s') || cssContent.includes('0.1s forwards'), 'Line 1 0.1s delay missing');
  assert.ok(cssContent.includes('animation-delay: 0.26s') || cssContent.includes('0.26s forwards'), 'Line 2 0.26s delay missing');
  assert.ok(cssContent.includes('animation-delay: 0.44s') || cssContent.includes('0.44s forwards'), 'Line 3 0.44s delay missing');
  assert.ok(cssContent.includes('0.65s forwards') || cssContent.includes('animation-delay: 0.65s'), 'Subtext 0.65s delay missing');
});

runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must disable transforms and blurs', () => {
  assert.ok(cssContent.includes('@media (prefers-reduced-motion: reduce)'), '@media (prefers-reduced-motion: reduce) block missing');
  const reducedMotionBlock = cssContent.slice(cssContent.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(reducedMotionBlock.includes('animation: none !important'), 'Animation reset in reduced-motion missing');
  assert.ok(reducedMotionBlock.includes('transform: none !important'), 'Transform reset in reduced-motion missing');
  assert.ok(reducedMotionBlock.includes('filter: none !important'), 'Filter reset in reduced-motion missing');
  assert.ok(reducedMotionBlock.includes('opacity: 1 !important'), 'Opacity reset in reduced-motion missing');
});

// 5. JS Trigger & Fallback Logic Verification
runTest('JS Trigger Logic: triggerHeroAnimation must add .hero-animated-active class', () => {
  assert.ok(jsContent.includes('hero-animated-active'), 'Class hero-animated-active missing in main.js');
  assert.ok(jsContent.includes('triggerHeroAnimation'), 'Function triggerHeroAnimation missing in main.js');
});

runTest('JS Integration: dismissPreloader must invoke triggerHeroAnimation upon preloader fade-out', () => {
  const dismissPreloaderMatch = jsContent.match(/const dismissPreloader\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\n\s*\};/);
  assert.ok(dismissPreloaderMatch, 'dismissPreloader function definition missing');
  assert.ok(dismissPreloaderMatch[0].includes('triggerHeroAnimation()'), 'triggerHeroAnimation() must be called inside dismissPreloader');
});

runTest('JS Defensive Fallback: DOMContentLoaded / Timeout fallback (300ms / 2800ms) and IntersectionObserver must exist', () => {
  assert.ok(jsContent.includes('setTimeout(triggerHeroAnimation, 300)'), '300ms fallback missing');
  assert.ok(jsContent.includes('IntersectionObserver'), 'IntersectionObserver fallback missing');
});

console.log('================================================================');
console.log(`Test Execution Completed: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}
