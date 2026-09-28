/**
 * @intent Test suite for bottom CTA 3D luminous neon background ultra-subtle serene organic wave undulation & breathing drift motion
 * @agent  manager-develop
 * @branch feat/cta-undulation-subtle
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
console.log('Starting CTA Background Organic Wave Undulation Test Suite');
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

runTest('Strict No-Emoji Policy: css/style.css CTA undulation styles must not contain unicode emoji', () => {
  const ctaCssMatch = cssContent.match(/Bottom CTA Background Organic Wave Undulation[\s\S]*$/);
  assert.ok(ctaCssMatch, 'CTA undulation styles must exist in style.css');
  assert.strictEqual(emojiRegex.test(ctaCssMatch[0]), false, 'CTA undulation styles must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html bottom CTA section must contain standard annotations with branch feat/cta-undulation-subtle', () => {
  const ctaSecCommentMatch = indexHtmlContent.match(/<!-- 9\. BottomCta[\s\S]*?<section id="bottom-cta-section"/);
  assert.ok(ctaSecCommentMatch, 'CTA header comment block missing in index.html');
  const comment = ctaSecCommentMatch[0];
  assert.ok(comment.includes('@intent'), '@intent missing in CTA section annotation');
  assert.ok(comment.includes('@agent'), '@agent missing in CTA section annotation');
  assert.ok(comment.includes('@branch feat/cta-undulation-subtle'), 'Branch feat/cta-undulation-subtle missing in CTA section annotation');
  assert.ok(comment.includes('@author'), '@author missing in CTA section annotation');
  assert.ok(comment.includes('@date'), '@date missing in CTA section annotation');
});

runTest('Annotation: css/style.css must contain standard block annotations with branch feat/cta-undulation-subtle', () => {
  const ctaCssMatch = cssContent.match(/Bottom CTA Background Organic Wave Undulation[\s\S]*$/);
  assert.ok(ctaCssMatch, 'CTA style block missing in style.css');
  const block = ctaCssMatch[0];
  assert.ok(block.includes('@intent'), '@intent missing in style.css CTA annotation');
  assert.ok(block.includes('@agent'), '@agent missing in style.css CTA annotation');
  assert.ok(block.includes('@branch feat/cta-undulation-subtle'), 'Branch feat/cta-undulation-subtle missing in style.css CTA annotation');
  assert.ok(block.includes('@author'), '@author missing in style.css CTA annotation');
  assert.ok(block.includes('@date'), '@date missing in style.css CTA annotation');
});

// 3. HTML Markup & Structure Verification
runTest('HTML Markup: #cta-luminous-backdrop must exist with parallax classes and zero conflict architecture', () => {
  const backdropMatch = indexHtmlContent.match(/<div id="cta-luminous-backdrop"[^>]*>/);
  assert.ok(backdropMatch, '#cta-luminous-backdrop must exist in index.html');
  const tag = backdropMatch[0];
  assert.ok(tag.includes('absolute inset-0'), '#cta-luminous-backdrop must have absolute inset-0');
  assert.ok(tag.includes('pointer-events-none'), '#cta-luminous-backdrop must have pointer-events-none');
  assert.ok(tag.includes('transition-transform duration-700 ease-out'), '#cta-luminous-backdrop must preserve scroll transition-transform');
});

runTest('HTML Markup: .cta-wave-motion-wrap container must enclose animated image and shimmer layer', () => {
  assert.ok(indexHtmlContent.includes('cta-wave-motion-wrap'), '.cta-wave-motion-wrap class must exist in index.html');
  assert.ok(indexHtmlContent.includes('cta-wave-animated-img'), '.cta-wave-animated-img class must exist in index.html');
  assert.ok(indexHtmlContent.includes('cta-wave-shimmer'), '.cta-wave-shimmer class must exist in index.html');

  // Verify image asset
  assert.ok(
    indexHtmlContent.includes('src="images/goobit_ai_luminous_wave.jpg"'),
    'img tag must reference images/goobit_ai_luminous_wave.jpg'
  );
  const imgPath = path.join(rootDir, 'images', 'goobit_ai_luminous_wave.jpg');
  assert.ok(fs.existsSync(imgPath), `Background image file must exist: ${imgPath}`);
});

runTest('HTML Markup: SVG fluid distortion ripple filter #cta-wave-ripple must be tuned for ultra-subtle 30s micro-ripple', () => {
  assert.ok(indexHtmlContent.includes('id="cta-wave-ripple"'), '#cta-wave-ripple filter must exist in index.html');
  assert.ok(indexHtmlContent.includes('<feTurbulence'), 'feTurbulence element must exist inside SVG');
  assert.ok(indexHtmlContent.includes('attributeName="baseFrequency"'), 'Animated baseFrequency must exist inside feTurbulence');
  assert.ok(indexHtmlContent.includes('dur="30s"'), 'Animation duration must be extended to 30s for slow serenity');
  assert.ok(indexHtmlContent.includes('<feDisplacementMap'), 'feDisplacementMap element must exist inside filter');
  assert.ok(indexHtmlContent.includes('scale="5"'), 'Displacement scale must be lowered to 5 for subtle undulation');
});

// 4. CSS Keyframes & Styles Verification
runTest('CSS Styling: .cta-wave-animated-img must declare 32s drift and 18s breathe animations with SVG filter', () => {
  assert.ok(cssContent.includes('.cta-wave-animated-img'), '.cta-wave-animated-img class missing in style.css');
  assert.ok(cssContent.includes('filter: url(#cta-wave-ripple) blur(0.3px)'), 'SVG ripple filter missing on animated img');
  assert.ok(cssContent.includes('ctaWaveDrift 32s ease-in-out infinite alternate'), 'ctaWaveDrift 32s animation declaration missing');
  assert.ok(cssContent.includes('ctaWaveBreathe 18s ease-in-out infinite'), 'ctaWaveBreathe 18s animation declaration missing');
  assert.ok(cssContent.includes('will-change: transform, opacity, filter'), 'will-change declaration missing on animated img');
});

runTest('CSS Styling: .cta-wave-shimmer must declare radial gradient and 22s ctaShimmerPulse animation', () => {
  assert.ok(cssContent.includes('.cta-wave-shimmer'), '.cta-wave-shimmer class missing in style.css');
  assert.ok(cssContent.includes('ctaShimmerPulse 22s ease-in-out infinite alternate'), 'ctaShimmerPulse 22s animation declaration missing');
});

runTest('CSS Keyframes: @keyframes ctaWaveDrift must be defined with micro-displacement wave motion points', () => {
  assert.ok(cssContent.includes('@keyframes ctaWaveDrift'), '@keyframes ctaWaveDrift missing in style.css');
  const driftMatch = cssContent.match(/@keyframes ctaWaveDrift\s*\{([\s\S]*?)\n\}/);
  assert.ok(driftMatch, 'ctaWaveDrift block could not be extracted');
  const body = driftMatch[1];
  assert.ok(body.includes('scale(1.06)'), 'ctaWaveDrift must start with subtle scale(1.06)');
  assert.ok(body.includes('translate('), 'ctaWaveDrift must contain translate transforms');
  assert.ok(body.includes('rotate('), 'ctaWaveDrift must contain rotate transforms');
});

runTest('CSS Keyframes: @keyframes ctaWaveBreathe must gently modulate opacity between 0.36 and 0.44', () => {
  assert.ok(cssContent.includes('@keyframes ctaWaveBreathe'), '@keyframes ctaWaveBreathe missing in style.css');
  const breatheMatch = cssContent.match(/@keyframes ctaWaveBreathe\s*\{([\s\S]*?)\n\}/);
  assert.ok(breatheMatch, 'ctaWaveBreathe block could not be extracted');
  const body = breatheMatch[1];
  assert.ok(body.includes('opacity: 0.36') && body.includes('opacity: 0.44'), 'ctaWaveBreathe must modulate opacity gently between 0.36 and 0.44');
  assert.ok(body.includes('brightness('), 'ctaWaveBreathe must modulate filter brightness');
});

runTest('CSS Keyframes: @keyframes ctaShimmerPulse must modulate opacity and transform', () => {
  assert.ok(cssContent.includes('@keyframes ctaShimmerPulse'), '@keyframes ctaShimmerPulse missing in style.css');
  const shimmerMatch = cssContent.match(/@keyframes ctaShimmerPulse\s*\{([\s\S]*?)\n\}/);
  assert.ok(shimmerMatch, 'ctaShimmerPulse block could not be extracted');
  const body = shimmerMatch[1];
  assert.ok(body.includes('opacity: 0.18') || body.includes('opacity: 0.32'), 'ctaShimmerPulse must modulate opacity');
  assert.ok(body.includes('transform: scale('), 'ctaShimmerPulse must modulate transform scale');
});

// 5. Accessibility Verification
runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must disable CTA undulation animations and filters', () => {
  const ctaCssMatch = cssContent.match(/Bottom CTA Background Organic Wave Undulation[\s\S]*$/);
  assert.ok(ctaCssMatch, 'CTA style block missing in style.css');
  const block = ctaCssMatch[0];
  assert.ok(block.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion query missing in CTA style block');
  assert.ok(block.includes('animation: none !important'), 'Reduced motion must disable animation');
  assert.ok(block.includes('filter: none !important'), 'Reduced motion must disable filter');
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
