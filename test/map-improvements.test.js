/**
 * @intent Comprehensive test suite for map marker, fullscreen button removal, brand logos, mobile app deep linking, and CSS animations
 * @agent  manager-develop
 * @branch feat/map-marker-and-app-links
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// File paths
const rootDir = path.resolve(__dirname, '..');
const mapJsPath = path.join(rootDir, 'js', 'map.js');
const cssPath = path.join(rootDir, 'css', 'style.css');
const companyHtmlPath = path.join(rootDir, 'company.html');
const contactHtmlPath = path.join(rootDir, 'contact.html');
const { NaverMapController } = require('../js/map.js');

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
console.log('Starting Map Marker, App Links, & UI Polish Test Suite');
console.log('================================================================');

// Read files
const mapJsContent = fs.readFileSync(mapJsPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const companyHtmlContent = fs.readFileSync(companyHtmlPath, 'utf8');
const contactHtmlContent = fs.readFileSync(contactHtmlPath, 'utf8');
const testFileContent = fs.readFileSync(__filename, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testFileContent), false, 'test file must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/map.js must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(mapJsContent), false, 'js/map.js must not contain emoji');
});

runTest('Strict No-Emoji Policy: css/style.css map styles must not contain unicode emoji', () => {
  const mapCssMatch = cssContent.match(/Map High-Visibility Marker Animations[\s\S]*$/);
  assert.ok(mapCssMatch, 'Map marker animation section must exist in style.css');
  assert.strictEqual(emojiRegex.test(mapCssMatch[0]), false, 'style.css map section must not contain emoji');
});

// 2. Annotation Verification
runTest('Annotation: js/map.js must contain standard header annotations with branch feat/map-marker-and-app-links', () => {
  assert.ok(mapJsContent.includes('@agent  manager-develop') || mapJsContent.includes('@agent manager-develop'));
  assert.ok(mapJsContent.includes('@branch feat/map-marker-and-app-links'));
  assert.ok(mapJsContent.includes('@author @goobit-dev'));
  assert.ok(mapJsContent.includes('@date   2026-09-28') || mapJsContent.includes('@date 2026-09-28'));
});

runTest('Annotation: css/style.css must contain standard annotations for map marker animations', () => {
  assert.ok(cssContent.includes('@branch feat/map-marker-and-app-links'));
  assert.ok(cssContent.includes('@intent Enterprise map location pin subtle breathing bounce motion and accessibility'));
});

// 3. Embedded Map & Fullscreen Button Removal Verification
runTest('Map Iframe: allowfullscreen attribute must NOT be present in iframe (suppressing <> button)', () => {
  assert.strictEqual(/allowfullscreen/i.test(mapJsContent), false, 'allowfullscreen attribute must be omitted');
});

runTest('Map Iframe: Google Maps embed URL must target 문정현대지식산업센터 C동 with zoom 17', () => {
  assert.ok(mapJsContent.includes('maps.google.com/maps?q='), 'Google maps embed base URL must exist');
  assert.ok(mapJsContent.includes('z=17'), 'Map zoom level must be 17 for precise building level view');
  const controller = new NaverMapController();
  const encodedQuery = encodeURIComponent('문정현대지식산업센터 C동');
  assert.ok(controller.MAP_EMBED_URL.includes(encodedQuery), 'Embed query must encode 문정현대지식산업센터 C동');
});

// 4. High-Visibility Location Marker & Persistent Badge Verification
runTest('Map Overlay: High-visibility center pin marker must be rendered with company title and animate-bounce-gentle', () => {
  assert.ok(mapJsContent.includes('company-map-marker'), 'company-map-marker container must exist');
  assert.ok(mapJsContent.includes('animate-bounce-gentle'), 'Marker must use animate-bounce-gentle');
  assert.ok(mapJsContent.includes('(주)구비트 본사 · C동 408호'), 'Marker must show company name and suite number');
  assert.ok(mapJsContent.includes('pointer-events-none'), 'Marker must have pointer-events-none to prevent blocking map interaction');
});

runTest('Map Overlay: Top-left persistent location badge must be present', () => {
  assert.ok(mapJsContent.includes('company-map-badge'), 'company-map-badge container must exist');
  assert.ok(mapJsContent.includes('구비트 본사: 문정현대지식산업센터 C동 408호'), 'Badge must display readable location text');
});

// 5. Brand Logos Verification for Kakao, Naver, Google Maps
runTest('Brand Logos: Kakao Map button must include official Kakao color (#FEE500) and SVG icon', () => {
  assert.ok(mapJsContent.includes('#FEE500'), 'Kakao official yellow background must be used');
  assert.ok(mapJsContent.includes('data-map-service="kakao"'), 'Kakao button must declare data-map-service="kakao"');
  assert.ok(mapJsContent.includes('카카오 지도'), 'Kakao text must be present');
});

runTest('Brand Logos: Naver Map button must include official Naver green (#03C75A) and N logo SVG', () => {
  assert.ok(mapJsContent.includes('#03C75A'), 'Naver official green background must be used');
  assert.ok(mapJsContent.includes('data-map-service="naver"'), 'Naver button must declare data-map-service="naver"');
  assert.ok(mapJsContent.includes('네이버 지도'), 'Naver text must be present');
});

runTest('Brand Logos: Google Maps button must include multi-colored Google Maps pin SVG', () => {
  assert.ok(mapJsContent.includes('#4285F4') && mapJsContent.includes('#EA4335') && mapJsContent.includes('#FBBC04') && mapJsContent.includes('#34A853'), 'Google Maps 4-color palette must be present in SVG');
  assert.ok(mapJsContent.includes('data-map-service="google"'), 'Google button must declare data-map-service="google"');
  assert.ok(mapJsContent.includes('구글 지도'), 'Google text must be present');
});

// 6. Mobile Native App Deep Linking Logic Verification
runTest('App Deep Linking: NaverMapController must instantiate and expose getAppScheme and openMapApp methods', () => {
  const controller = new NaverMapController();
  assert.strictEqual(typeof controller.getAppScheme, 'function');
  assert.strictEqual(typeof controller.openMapApp, 'function');
});

runTest('App Deep Linking: getAppScheme for Kakao Map generates correct Android and iOS schemes', () => {
  const controller = new NaverMapController();
  const androidScheme = controller.getAppScheme('kakao', 'android');
  const iosScheme = controller.getAppScheme('kakao', 'ios');

  assert.ok(androidScheme.startsWith('intent://search?q='), 'Android Kakao scheme must use intent protocol');
  assert.ok(androidScheme.includes('scheme=kakaomap'), 'Android Kakao scheme must specify kakaomap scheme');
  assert.ok(androidScheme.includes('package=net.daum.android.map'), 'Android Kakao scheme must specify package');

  assert.ok(iosScheme.startsWith('kakaomap://search?q='), 'iOS Kakao scheme must use kakaomap://');
});

runTest('App Deep Linking: getAppScheme for Naver Map generates correct Android and iOS schemes', () => {
  const controller = new NaverMapController();
  const androidScheme = controller.getAppScheme('naver', 'android');
  const iosScheme = controller.getAppScheme('naver', 'ios');

  assert.ok(androidScheme.startsWith('intent://search?query='), 'Android Naver scheme must use intent protocol');
  assert.ok(androidScheme.includes('scheme=nmap'), 'Android Naver scheme must specify nmap scheme');
  assert.ok(androidScheme.includes('package=com.nhn.android.nmap'), 'Android Naver scheme must specify package');

  assert.ok(iosScheme.startsWith('nmap://search?query='), 'iOS Naver scheme must use nmap://');
});

runTest('App Deep Linking: getAppScheme for Google Maps generates correct Android and iOS schemes', () => {
  const controller = new NaverMapController();
  const androidScheme = controller.getAppScheme('google', 'android');
  const iosScheme = controller.getAppScheme('google', 'ios');

  assert.ok(androidScheme.startsWith('geo:37.4854,127.1224?q='), 'Android Google scheme must use geo protocol with coordinates');
  assert.ok(iosScheme.startsWith('comgooglemaps://?q='), 'iOS Google scheme must use comgooglemaps://');
});

// 7. CSS Animation & Accessibility Verification
runTest('CSS Animation: .animate-bounce-gentle must declare bounceGentle with cubic-bezier(0.16, 1, 0.3, 1)', () => {
  assert.ok(cssContent.includes('.animate-bounce-gentle'), '.animate-bounce-gentle class must exist');
  assert.ok(cssContent.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'Must use required cubic-bezier easing');
  assert.ok(cssContent.includes('will-change: transform'), 'Must declare will-change: transform');
});

runTest('CSS Animation: @keyframes bounceGentle must use only composited transform property', () => {
  const keyframesMatch = cssContent.match(/@keyframes bounceGentle\s*\{([\s\S]*?)\}/);
  assert.ok(keyframesMatch, '@keyframes bounceGentle must exist');
  const body = keyframesMatch[1];
  assert.ok(body.includes('transform: translate(-50%, -100%)'), 'Keyframe must maintain -50%, -100% anchor centering');
  assert.strictEqual(body.includes('top:') || body.includes('left:') || body.includes('margin:'), false, 'Only composited properties must be animated');
});

runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must disable map marker animation', () => {
  assert.ok(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion media query must exist');
  assert.ok(cssContent.includes('.animate-bounce-gentle') && cssContent.includes('animation: none !important'), 'Bounce animation must be cancelled when reduced motion is preferred');
});

// 8. HTML Template Integration Verification
runTest('HTML Integration: company.html and contact.html must contain #naver-map-root and load js/map.js', () => {
  assert.ok(companyHtmlContent.includes('id="naver-map-root"'), 'company.html must contain id="naver-map-root"');
  assert.ok(companyHtmlContent.includes('src="js/map.js"'), 'company.html must import js/map.js');
  assert.ok(contactHtmlContent.includes('id="naver-map-root"'), 'contact.html must contain id="naver-map-root"');
  assert.ok(contactHtmlContent.includes('src="js/map.js"'), 'contact.html must import js/map.js');
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}
