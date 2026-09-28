/**
 * @intent Test suite verifying the unified telemetry HUD band and dark glassmorphism engineering cockpit deck
 * @agent  manager-develop
 * @branch task-metrics-and-domains-redesign
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
console.log('Starting Metrics HUD & Domain Cockpit Redesign Test Suite');
console.log('================================================================');

// Read files
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const testContent = fs.readFileSync(__filename, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: index.html metrics and services sections must not contain unicode emoji', () => {
  const metricsMatch = htmlContent.match(/<section id="metrics-section"[\s\S]*?<\/section>/);
  assert.ok(metricsMatch, 'Metrics section must exist in index.html');
  assert.strictEqual(emojiRegex.test(metricsMatch[0]), false, 'Metrics section in index.html must not contain emoji');

  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  assert.ok(servicesMatch, 'Services section must exist in index.html');
  assert.strictEqual(emojiRegex.test(servicesMatch[0]), false, 'Services section in index.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: css/style.css telemetry and cockpit styles must not contain unicode emoji', () => {
  const cockpitBlockMatch = cssContent.match(/Telemetry HUD Band & Dark Glassmorphism Cockpit Styles[\s\S]*$/);
  assert.ok(cockpitBlockMatch, 'Telemetry & Cockpit style block must exist in style.css');
  assert.strictEqual(emojiRegex.test(cockpitBlockMatch[0]), false, 'Cockpit styles must not contain emoji');
});

runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testContent), false, 'Test file must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html must contain standard annotations for metrics and service domain sections', () => {
  assert.ok(htmlContent.includes('@intent') && htmlContent.includes('@agent') && htmlContent.includes('@branch'), 'Header comment annotation missing');
  assert.ok(htmlContent.includes('task-metrics-and-domains-redesign'), 'Branch task-metrics-and-domains-redesign missing in index.html');
});

runTest('Annotation: css/style.css must contain telemetry and cockpit block annotation', () => {
  assert.ok(cssContent.includes('Telemetry HUD Band & Dark Glassmorphism Cockpit Styles'), 'CSS block header missing');
  assert.ok(cssContent.includes('task-metrics-and-domains-redesign'), 'Branch task-metrics-and-domains-redesign missing in style.css');
});

// 3. Section A: 4-Stat Metrics HUD Band (#metrics-section)
runTest('Metrics HUD: Section container must use dark cybernetic navy background and laser border', () => {
  const metricsMatch = htmlContent.match(/<section id="metrics-section"[^>]*>/);
  assert.ok(metricsMatch, '#metrics-section must exist');
  const sectionTag = metricsMatch[0];
  assert.ok(sectionTag.includes('bg-[#0A0F1D]'), '#metrics-section must use bg-[#0A0F1D]');
  assert.ok(sectionTag.includes('border-y') && sectionTag.includes('border-white/10'), '#metrics-section must use border-y border-white/10');
});

runTest('Metrics HUD: Must NOT use separate white card boxes (integrated single telemetry band)', () => {
  const metricsMatch = htmlContent.match(/<section id="metrics-section"[\s\S]*?<\/section>/);
  assert.ok(metricsMatch, '#metrics-section must exist');
  const content = metricsMatch[0];
  assert.strictEqual(content.includes('bg-slate-50/80'), false, 'Separate slate-50 cards must be abolished');
  assert.ok(content.includes('telemetry-hud-band'), 'Unified telemetry-hud-band class must exist');
  assert.ok(content.includes('divide-white/10'), 'Integrated divide-white/10 grid separator must exist');
  assert.ok(content.includes('backdrop-blur-xl'), 'Backdrop blur must exist on the band');
});

runTest('Metrics HUD: Must contain 4 columns with tech badges, icons, and micro pulse dots', () => {
  const metricsMatch = htmlContent.match(/<section id="metrics-section"[\s\S]*?<\/section>/);
  assert.ok(metricsMatch, '#metrics-section must exist');
  const content = metricsMatch[0];
  assert.ok(content.includes('01 / TRACK RECORD'), 'Track record badge missing');
  assert.ok(content.includes('02 / PROJECTS'), 'Projects badge missing');
  assert.ok(content.includes('03 / AVAILABILITY'), 'Availability badge missing');
  assert.ok(content.includes('04 / PARTNERS'), 'Partners badge missing');

  const pulseDotMatches = content.match(/animate-pulse/g);
  assert.ok(pulseDotMatches && pulseDotMatches.length >= 4, 'Micro pulse dots must exist for all 4 columns');

  const colGlowMatches = content.match(/telemetry-col-glow/g);
  assert.ok(colGlowMatches && colGlowMatches.length >= 4, 'Interactive neon HUD beam backlights must exist for all 4 columns');
});

runTest('Metrics HUD: Stat counter attributes and typography must be fully preserved', () => {
  const metricsMatch = htmlContent.match(/<section id="metrics-section"[\s\S]*?<\/section>/);
  assert.ok(metricsMatch, '#metrics-section must exist');
  const content = metricsMatch[0];

  assert.ok(content.includes('data-target="10"'), 'Counter target 10 missing');
  assert.ok(content.includes('data-target="100"'), 'Counter target 100 missing');
  assert.ok(content.includes('data-target="99.9"'), 'Counter target 99.9 missing');
  assert.ok(content.includes('data-target="15"'), 'Counter target 15 missing');
  assert.ok(content.includes('data-decimals="1"'), 'Counter decimals 1 missing');

  const counterMatches = content.match(/stat-counter/g);
  assert.strictEqual(counterMatches && counterMatches.length, 4, 'Exactly 4 stat-counter elements must exist');

  assert.ok(content.includes('text-4xl sm:text-5xl font-black text-white'), 'Bold white typography must be used for stat counters');
});

// 4. Section B: 4-Domain Cockpit Panels (#services-matrix-section)
runTest('Domain Cockpit: Section container must use deep space dark canvas and 4 ambient aura glows', () => {
  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[^>]*>/);
  assert.ok(servicesMatch, '#services-matrix-section must exist');
  const sectionTag = servicesMatch[0];
  assert.ok(sectionTag.includes('bg-[#070B16]'), '#services-matrix-section must use bg-[#070B16]');
  assert.ok(sectionTag.includes('border-t') && sectionTag.includes('border-white/10'), '#services-matrix-section must use border-t border-white/10');

  const sectionFullMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  const sectionContent = sectionFullMatch[0];
  assert.ok(sectionContent.includes('bg-cyan-500/10'), 'Cyan aura glow missing in corner');
  assert.ok(sectionContent.includes('bg-pink-500/10'), 'Pink aura glow missing in corner');
  assert.ok(sectionContent.includes('bg-blue-600/10'), 'Royal blue aura glow missing in corner');
  assert.ok(sectionContent.includes('bg-amber-500/10'), 'Amber aura glow missing in corner');
});

runTest('Domain Cockpit: Must NOT use plain white box cards (dark glassmorphism panels used)', () => {
  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  assert.ok(servicesMatch, '#services-matrix-section must exist');
  const content = servicesMatch[0];
  assert.strictEqual(content.includes('service-matrix-card bg-white'), false, 'Plain white cards must be eliminated');

  const panelMatches = content.match(/domain-cockpit-panel/g);
  assert.strictEqual(panelMatches && panelMatches.length, 4, 'Exactly 4 domain-cockpit-panel cards must exist');
});

runTest('Domain Cockpit: 4 Domains must have correct codes, theme classes, and services.html links', () => {
  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  assert.ok(servicesMatch, '#services-matrix-section must exist');
  const content = servicesMatch[0];

  assert.ok(content.includes('DOMAIN // 01'), 'DOMAIN // 01 missing');
  assert.ok(content.includes('DOMAIN // 02'), 'DOMAIN // 02 missing');
  assert.ok(content.includes('DOMAIN // 03'), 'DOMAIN // 03 missing');
  assert.ok(content.includes('DOMAIN // 04'), 'DOMAIN // 04 missing');

  assert.ok(content.includes('domain-panel-cyan'), 'Cyan theme panel missing');
  assert.ok(content.includes('domain-panel-pink'), 'Pink theme panel missing');
  assert.ok(content.includes('domain-panel-blue'), 'Blue theme panel missing');
  assert.ok(content.includes('domain-panel-amber'), 'Amber theme panel missing');

  assert.ok(content.includes('services.html#public-si'), 'Public SI link missing');
  assert.ok(content.includes('services.html#telecom-ito'), 'Telecom ITO link missing');
  assert.ok(content.includes('services.html#edutech'), 'Edutech link missing');
  assert.ok(content.includes('services.html#consulting'), 'Consulting link missing');
});

runTest('Domain Cockpit: Must include 3-step cybernetic interactive engineering rails (total 12 steps)', () => {
  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  assert.ok(servicesMatch, '#services-matrix-section must exist');
  const content = servicesMatch[0];

  const stepMatches = content.match(/engineering-rail-step/g);
  assert.strictEqual(stepMatches && stepMatches.length, 12, 'Must have 12 interactive engineering rail steps across 4 panels');
  assert.ok(content.includes('표준 아키텍처'), 'Rail step text missing');
  assert.ok(content.includes('국정원 보안검증'), 'Rail step text missing');
  assert.ok(content.includes('SLA 99.99%'), 'Rail step text missing');
  assert.ok(content.includes('사내 RAG 안착'), 'Rail step text missing');
});

runTest('Domain Cockpit: Must include real-time neon metric badges in bottom bar', () => {
  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  assert.ok(servicesMatch, '#services-matrix-section must exist');
  const content = servicesMatch[0];

  assert.ok(content.includes('보안 침해 사고 0건'), 'Security metric badge missing');
  assert.ok(content.includes('가용성 99.99% 무중단'), 'Availability metric badge missing');
  assert.ok(content.includes('추천 정확도 94.2%'), 'Accuracy metric badge missing');
  assert.ok(content.includes('검색 정확도 98.7%'), 'Search accuracy metric badge missing');
});

runTest('Domain Cockpit: Standard methodology lifecycle bar must match unified dark glassmorphism theme', () => {
  const servicesMatch = htmlContent.match(/<section id="services-matrix-section"[\s\S]*?<\/section>/);
  assert.ok(servicesMatch, '#services-matrix-section must exist');
  const content = servicesMatch[0];

  assert.ok(content.includes('구비트 엔터프라이즈 4단계 품질 보증 라이프사이클'), 'Lifecycle title missing');
  assert.ok(content.includes('PHASE 01') && content.includes('PHASE 02') && content.includes('PHASE 03') && content.includes('PHASE 04'), 'Phase badges missing');
  assert.ok(content.includes('bg-white/[0.03] backdrop-blur-xl border border-white/10'), 'Dark glassmorphism theme on lifecycle bar missing');
});

// 5. Section C: CSS Styling, Motion, & Accessibility
runTest('CSS: Telemetry HUD column and Cockpit panel classes must be defined', () => {
  assert.ok(cssContent.includes('.telemetry-hud-band'), '.telemetry-hud-band missing in CSS');
  assert.ok(cssContent.includes('.telemetry-hud-col'), '.telemetry-hud-col missing in CSS');
  assert.ok(cssContent.includes('.domain-cockpit-panel'), '.domain-cockpit-panel missing in CSS');
  assert.ok(cssContent.includes('.engineering-rail-step'), '.engineering-rail-step missing in CSS');
});

runTest('CSS: Theme hover glow drop-shadow styles must be defined for all 4 domain colors', () => {
  assert.ok(cssContent.includes('.domain-panel-cyan:hover'), 'Cyan hover style missing');
  assert.ok(cssContent.includes('.domain-panel-pink:hover'), 'Pink hover style missing');
  assert.ok(cssContent.includes('.domain-panel-blue:hover'), 'Blue hover style missing');
  assert.ok(cssContent.includes('.domain-panel-amber:hover'), 'Amber hover style missing');
});

runTest('CSS Timing & Composited Properties: Must use cubic-bezier(0.16, 1, 0.3, 1) and composited properties', () => {
  const cockpitSectionMatch = cssContent.match(/Telemetry HUD Band & Dark Glassmorphism Cockpit Styles[\s\S]*$/);
  assert.ok(cockpitSectionMatch, 'Cockpit styles section missing');
  const block = cockpitSectionMatch[0];
  assert.ok(block.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'Must use cubic-bezier(0.16, 1, 0.3, 1)');
  assert.ok(block.includes('will-change: transform'), 'will-change must optimize composited rendering');
});

runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must be declared for telemetry and cockpit panels', () => {
  const cockpitSectionMatch = cssContent.match(/Telemetry HUD Band & Dark Glassmorphism Cockpit Styles[\s\S]*$/);
  assert.ok(cockpitSectionMatch, 'Cockpit styles section missing');
  const block = cockpitSectionMatch[0];
  assert.ok(block.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion media query missing');
  assert.ok(block.includes('.domain-cockpit-panel') && block.includes('.telemetry-hud-col'), 'Elements must be neutralized under reduced motion');
  assert.ok(block.includes('transform: none !important'), 'Transforms must be reset under reduced motion');
});

// Final Summary
console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
