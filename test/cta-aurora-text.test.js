/**
 * @intent Comprehensive test suite for bottom CTA headline living aurora text gradient animation and accessibility
 * @agent  manager-develop
 * @branch feat/cta-title-aurora-gradient
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// File paths
const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'style.css');

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
console.log('Starting CTA Title Living Aurora Text Gradient Test Suite');
console.log('================================================================');

// Read files
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const testFileContent = fs.readFileSync(__filename, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testFileContent), false, 'test file must not contain emoji');
});

runTest('Strict No-Emoji Policy: index.html CTA section must not contain unicode emoji', () => {
  const ctaSecMatch = indexHtmlContent.match(/<section id="bottom-cta-section"[\s\S]*?<\/section>/);
  assert.ok(ctaSecMatch, 'Bottom CTA section must exist in index.html');
  assert.strictEqual(emojiRegex.test(ctaSecMatch[0]), false, 'CTA section in index.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: css/style.css aurora styles must not contain unicode emoji', () => {
  const auroraCssMatch = cssContent.match(/Living Aurora Text Gradient System[\s\S]*?Dedicated News Detail/);
  assert.ok(auroraCssMatch, 'Aurora style section must exist in style.css');
  assert.strictEqual(emojiRegex.test(auroraCssMatch[0]), false, 'style.css aurora section must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html bottom CTA section must contain standard annotations with branch feat/cta-title-aurora-gradient', () => {
  const ctaSecCommentMatch = indexHtmlContent.match(/<!-- 9\. BottomCta[\s\S]*?<section id="bottom-cta-section"/);
  assert.ok(ctaSecCommentMatch, 'CTA header comment block missing in index.html');
  const comment = ctaSecCommentMatch[0];
  assert.ok(comment.includes('@intent'), '@intent missing in CTA section annotation');
  assert.ok(comment.includes('@agent'), '@agent missing in CTA section annotation');
  assert.ok(comment.includes('@branch feat/cta-title-aurora-gradient'), 'Branch feat/cta-title-aurora-gradient missing in CTA section annotation');
  assert.ok(comment.includes('@author'), '@author missing in CTA section annotation');
  assert.ok(comment.includes('@date'), '@date missing in CTA section annotation');
});

runTest('Annotation: css/style.css aurora section must contain standard annotations with branch feat/cta-title-aurora-gradient', () => {
  assert.ok(cssContent.includes('@branch feat/cta-title-aurora-gradient'), 'Branch feat/cta-title-aurora-gradient missing in style.css');
});

// 3. HTML Markup & Title Classes Verification
runTest('HTML Markup: "구비트가 함께합니다" in bottom CTA section must have hero-aurora-text and cta-aurora-text classes', () => {
  const ctaSecMatch = indexHtmlContent.match(/<section id="bottom-cta-section"[\s\S]*?<\/section>/);
  assert.ok(ctaSecMatch, 'Bottom CTA section must exist in index.html');
  const ctaHtml = ctaSecMatch[0];

  assert.ok(ctaHtml.includes('구비트가 함께합니다'), 'Target text "구비트가 함께합니다" must exist in CTA section');

  const spanMatch = ctaHtml.match(/<span[^>]*class="([^"]*)"[^>]*>\s*구비트가 함께합니다\s*<\/span>/);
  assert.ok(spanMatch, 'Span element enclosing "구비트가 함께합니다" must exist');

  const classes = spanMatch[1].split(/\s+/);
  assert.ok(classes.includes('hero-aurora-text'), 'Span must have hero-aurora-text class');
  assert.ok(classes.includes('cta-aurora-text'), 'Span must have cta-aurora-text class');
  assert.ok(classes.includes('bg-clip-text'), 'Span must have bg-clip-text class');
  assert.ok(classes.includes('text-transparent'), 'Span must have text-transparent class');
});

// 4. CSS Styling & Keyframes Verification
runTest('CSS Styling: .cta-aurora-text must share aurora gradient, background-size, animation, and drop-shadow', () => {
  assert.ok(cssContent.includes('.cta-aurora-text'), '.cta-aurora-text selector must exist in style.css');
  const selectorMatch = cssContent.match(/\.hero-aurora-text,\s*\.cta-aurora-text,\s*#hero-type-gradient-target\s*\{([\s\S]*?)\}/);
  assert.ok(selectorMatch, 'Aurora style group rule must exist with .cta-aurora-text');

  const ruleBody = selectorMatch[1];
  assert.ok(ruleBody.includes('linear-gradient(135deg, #F5A623 0%, #FF7A00 25%, #FCD34D 50%, #38BDF8 75%, #F5A623 100%)'), 'Must use 5-stop vibrant aurora gradient');
  assert.ok(ruleBody.includes('background-size: 280% 280%'), 'Must specify background-size: 280% 280%');
  assert.ok(ruleBody.includes('animation: heroAuroraShift 8s ease-in-out infinite'), 'Must declare heroAuroraShift 8s animation');
  assert.ok(ruleBody.includes('filter: drop-shadow(0 2px 14px rgba(245, 166, 35, 0.35))'), 'Must declare warm amber drop-shadow glow');
});

runTest('CSS Keyframes: @keyframes heroAuroraShift must define living gradient shift points', () => {
  assert.ok(cssContent.includes('@keyframes heroAuroraShift'), '@keyframes heroAuroraShift must be defined');
  const kfMatch = cssContent.match(/@keyframes heroAuroraShift\s*\{([\s\S]*?100%\s*\{[\s\S]*?\}\s*\})/);
  assert.ok(kfMatch, 'heroAuroraShift keyframe body must exist');
  const kfBody = kfMatch[1];
  assert.ok(kfBody.includes('0%') && kfBody.includes('background-position: 0% 50%'), '0% position must be 0% 50%');
  assert.ok(kfBody.includes('50%') && kfBody.includes('background-position: 100% 50%'), '50% position must be 100% 50%');
  assert.ok(kfBody.includes('100%') && kfBody.includes('background-position: 0% 50%'), '100% position must be 0% 50%');
});

// 5. Accessibility Verification
runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must suppress aurora animation on .cta-aurora-text', () => {
  const reducedMotionMatch = cssContent.match(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero-aurora-text,\s*\.cta-aurora-text[\s\S]*?\}/);
  assert.ok(reducedMotionMatch, 'prefers-reduced-motion block must include .cta-aurora-text');
  const body = reducedMotionMatch[0];
  assert.ok(body.includes('animation: none !important'), 'Animation must be disabled on reduced motion');
  assert.ok(body.includes('background-position: 0% 50% !important'), 'Background position must be fixed at 0% 50% on reduced motion');
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
