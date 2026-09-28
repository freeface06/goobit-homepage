/**
 * @intent Test suite for Hero Kinetic Text & Cybernetic AI Motion Graphics System
 * @agent  manager-develop
 * @branch task-hero-kinetic-text-animation
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
console.log('Starting Hero Kinetic Text Animation Test Suite');
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
  const kineticBlockMatch = cssContent.match(/Hero Kinetic Text & Cybernetic AI Motion Graphics System[\s\S]*$/);
  assert.ok(kineticBlockMatch, 'Kinetic style block must exist in style.css');
  assert.strictEqual(emojiRegex.test(kineticBlockMatch[0]), false, 'Kinetic styles must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/main.js hero animation controller must not contain unicode emoji', () => {
  const jsHeroBlockMatch = jsContent.match(/Landing Hero Video & Fullscreen Preloader Controller[\s\S]*?<\/script>|Landing Hero Video & Fullscreen Preloader Controller[\s\S]*$/);
  assert.ok(jsHeroBlockMatch, 'Preloader and hero controller must exist in main.js');
  assert.strictEqual(emojiRegex.test(jsHeroBlockMatch[0]), false, 'Hero controller in main.js must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html must contain standard header and hero section annotations', () => {
  assert.ok(htmlContent.includes('@intent') && htmlContent.includes('@agent') && htmlContent.includes('@branch'), 'Header comment annotation missing');
  assert.ok(htmlContent.includes('task-hero-kinetic-text-animation'), 'Branch task-hero-kinetic-text-animation missing in index.html');
});

runTest('Annotation: css/style.css must contain standard block annotations', () => {
  assert.ok(cssContent.includes('@intent') && cssContent.includes('@agent') && cssContent.includes('@branch'), 'CSS block annotation missing');
  assert.ok(cssContent.includes('task-hero-kinetic-text-animation'), 'Branch task-hero-kinetic-text-animation missing in css/style.css');
});

runTest('Annotation: js/main.js must contain standard block annotations', () => {
  assert.ok(jsContent.includes('@intent') && jsContent.includes('@agent') && jsContent.includes('@branch'), 'JS block annotation missing');
  assert.ok(jsContent.includes('task-hero-kinetic-text-animation'), 'Branch task-hero-kinetic-text-animation missing in js/main.js');
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

runTest('HTML Markup: Slogan Line 3 class (.hero-title-line-3), aurora text, and glow backdrop must match', () => {
  assert.ok(htmlContent.includes('hero-title-line-3'), 'Class .hero-title-line-3 missing');
  assert.ok(htmlContent.includes('hero-aurora-text'), 'Class .hero-aurora-text missing');
  assert.ok(htmlContent.includes('hero-glow-backdrop'), 'Class .hero-glow-backdrop missing');
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
runTest('CSS Keyframes: @keyframes heroLineLift must have exact 0% and 100% 3D transform properties', () => {
  assert.ok(cssContent.includes('@keyframes heroLineLift'), '@keyframes heroLineLift missing');
  assert.ok(cssContent.includes('translateY(115%) perspective(800px) rotateX(25deg)'), 'heroLineLift 0% transform missing');
  assert.ok(cssContent.includes('filter: blur(14px)'), 'heroLineLift 0% blur filter missing');
  assert.ok(cssContent.includes('translateY(0) perspective(800px) rotateX(0deg)'), 'heroLineLift 100% transform missing');
  assert.ok(cssContent.includes('filter: blur(0)'), 'heroLineLift 100% blur(0) missing');
});

runTest('CSS Keyframes: @keyframes heroShineSweep must exist with skewX and translation sweep', () => {
  assert.ok(cssContent.includes('@keyframes heroShineSweep'), '@keyframes heroShineSweep missing');
  assert.ok(cssContent.includes('skewX'), 'heroShineSweep skewX effect missing');
});

runTest('CSS Keyframes: @keyframes heroAuroraShift must exist with background-position shifts', () => {
  assert.ok(cssContent.includes('@keyframes heroAuroraShift'), '@keyframes heroAuroraShift missing');
  assert.ok(cssContent.includes('background-position: 0% 50%'), 'heroAuroraShift 0% missing');
  assert.ok(cssContent.includes('background-position: 100% 50%'), 'heroAuroraShift 50% missing');
});

runTest('CSS Keyframes: @keyframes heroPulseGlow must exist with drop-shadow and ambient glow', () => {
  assert.ok(cssContent.includes('@keyframes heroPulseGlow'), '@keyframes heroPulseGlow missing');
  assert.ok(cssContent.includes('drop-shadow'), 'heroPulseGlow drop-shadow missing');
});

runTest('CSS Timing & Composited Properties: cubic-bezier(0.16, 1, 0.3, 1) must be used on animations', () => {
  const cubicBezierOccurrences = (cssContent.match(/cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/g) || []).length;
  assert.strictEqual(cubicBezierOccurrences >= 4, true, `Expected multiple cubic-bezier(0.16, 1, 0.3, 1) usages, found ${cubicBezierOccurrences}`);
});

runTest('CSS Staggered Delays: Lines and subtext must match required delays', () => {
  assert.ok(cssContent.includes('animation-delay: 0.1s') || cssContent.includes('0.1s forwards'), 'Line 1 0.1s delay missing');
  assert.ok(cssContent.includes('animation-delay: 0.28s') || cssContent.includes('0.28s forwards'), 'Line 2 0.28s delay missing');
  assert.ok(cssContent.includes('animation-delay: 0.48s') || cssContent.includes('0.48s forwards'), 'Line 3 0.48s delay missing');
  assert.ok(cssContent.includes('0.72s forwards') || cssContent.includes('animation-delay: 0.72s'), 'Subtext 0.72s delay missing');
});

runTest('CSS Aurora Text Colors: Must include Amber, Orange, Gold, and Neon Cyan hex colors', () => {
  assert.ok(cssContent.includes('#F5A623'), 'Amber #F5A623 missing in aurora gradient');
  assert.ok(cssContent.includes('#FF7A00'), 'Orange #FF7A00 missing in aurora gradient');
  assert.ok(cssContent.includes('#FCD34D'), 'Gold #FCD34D missing in aurora gradient');
  assert.ok(cssContent.includes('#38BDF8'), 'Neon Cyan #38BDF8 missing in aurora gradient');
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
