/**
 * @intent Unit test suite for Korean telemetry indicators, dignified copy conversion, and removal of blinking ping dots
 * @agent  manager-develop
 * @branch feat/korean-telemetry-indicators
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// File paths
const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const mainJsPath = path.join(rootDir, 'js', 'main.js');

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
console.log('Starting Korean Telemetry Indicators Test Suite');
console.log('================================================================');

// Read files
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
const testFileContent = fs.readFileSync(__filename, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testFileContent), false, 'test file must not contain emoji');
});

runTest('Strict No-Emoji Policy: index.html modified sections must not contain unicode emoji', () => {
  const aiTelemetryMatch = indexHtmlContent.match(/<div class="ai-telemetry-bar[\s\S]*?<\/div>/);
  assert.ok(aiTelemetryMatch, 'ai-telemetry-bar must exist in index.html');
  assert.strictEqual(emojiRegex.test(aiTelemetryMatch[0]), false, 'ai-telemetry-bar must not contain emoji');

  const caseTelemetryMatch = indexHtmlContent.match(/<div class="case-telemetry-bar[\s\S]*?<\/div>/);
  assert.ok(caseTelemetryMatch, 'case-telemetry-bar must exist in index.html');
  assert.strictEqual(emojiRegex.test(caseTelemetryMatch[0]), false, 'case-telemetry-bar must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/main.js must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(mainJsContent), false, 'js/main.js must not contain emoji');
});

// 2. Annotation Metadata Verification
runTest('Annotation: index.html must contain standard block annotations with branch feat/korean-telemetry-indicators', () => {
  assert.ok(indexHtmlContent.includes('@intent'), '@intent missing in index.html');
  assert.ok(indexHtmlContent.includes('@agent'), '@agent missing in index.html');
  assert.ok(
    indexHtmlContent.includes('@branch feat/korean-telemetry-indicators'),
    'Branch feat/korean-telemetry-indicators missing in index.html'
  );
  assert.ok(indexHtmlContent.includes('@author'), '@author missing in index.html');
  assert.ok(indexHtmlContent.includes('@date'), '@date missing in index.html');
});

runTest('Annotation: js/main.js must contain standard header block annotations with branch feat/korean-telemetry-indicators', () => {
  assert.ok(mainJsContent.includes('@intent'), '@intent missing in js/main.js');
  assert.ok(mainJsContent.includes('@agent'), '@agent missing in js/main.js');
  assert.ok(
    mainJsContent.includes('@branch feat/korean-telemetry-indicators'),
    'Branch feat/korean-telemetry-indicators missing in js/main.js'
  );
  assert.ok(mainJsContent.includes('@author'), '@author missing in js/main.js');
  assert.ok(mainJsContent.includes('@date'), '@date missing in js/main.js');
});

// 3. Blinking Ping Dot (animate-ping) Removal Verification
runTest('Ping Dot Removal: ai-telemetry-bar must NOT contain animate-ping dot', () => {
  const aiTelemetryMatch = indexHtmlContent.match(/<div class="ai-telemetry-bar[\s\S]*?<\/div>/);
  assert.ok(aiTelemetryMatch, 'ai-telemetry-bar must exist');
  assert.strictEqual(
    aiTelemetryMatch[0].includes('animate-ping'),
    false,
    'ai-telemetry-bar must not contain animate-ping element'
  );
});

runTest('Ping Dot Removal: case-telemetry-bar must NOT contain animate-ping dot', () => {
  const caseTelemetryMatch = indexHtmlContent.match(/<div class="case-telemetry-bar[\s\S]*?<\/div>/);
  assert.ok(caseTelemetryMatch, 'case-telemetry-bar must exist');
  assert.strictEqual(
    caseTelemetryMatch[0].includes('animate-ping'),
    false,
    'case-telemetry-bar must not contain animate-ping element'
  );
});

// 4. Korean Telemetry Text & Guidance in index.html
runTest('HTML Markup: #scrolly-stage-indicator initial text must be in natural Korean', () => {
  const scrollyMatch = indexHtmlContent.match(/<span id="scrolly-stage-indicator"[^>]*>([\s\S]*?)<\/span>/);
  assert.ok(scrollyMatch, '#scrolly-stage-indicator must exist');
  const text = scrollyMatch[1].trim();
  assert.ok(
    text.includes('단계 01 / 03 : 지식그래프 &amp; RAG') || text.includes('단계 01 / 03 : 지식그래프 & RAG'),
    `Expected Korean stage text but got: ${text}`
  );
  assert.strictEqual(text.includes('STAGE 01'), false, 'English STAGE text must be removed');
});

runTest('HTML Markup: #case-stage-indicator initial text must be in natural Korean', () => {
  const caseMatch = indexHtmlContent.match(/<span id="case-stage-indicator"[^>]*>([\s\S]*?)<\/span>/);
  assert.ok(caseMatch, '#case-stage-indicator must exist');
  const text = caseMatch[1].trim();
  assert.ok(
    text.includes('사례 01 / 04 : KT 통신·미디어 ITO'),
    `Expected Korean case text but got: ${text}`
  );
  assert.strictEqual(text.includes('CASE 01'), false, 'English CASE text must be removed');
});

runTest('HTML Markup: case telemetry guidance must display Korean scroll prompt', () => {
  assert.ok(
    indexHtmlContent.includes('<span>스크롤하여 사례 탐색</span>'),
    'SCROLL DOWN TO EXPLORE must be replaced with 스크롤하여 사례 탐색'
  );
  assert.strictEqual(
    indexHtmlContent.includes('SCROLL DOWN TO EXPLORE'),
    false,
    'SCROLL DOWN TO EXPLORE must not exist in index.html'
  );
});

runTest('HTML Markup: case section reference badge must be written in Korean', () => {
  assert.ok(
    indexHtmlContent.includes('엔터프라이즈 구축 실적 · 레퍼런스'),
    'Reference chip must be translated to 엔터프라이즈 구축 실적 · 레퍼런스'
  );
  assert.strictEqual(
    indexHtmlContent.includes('엔터프라이즈 구축 실적 · Reference'),
    false,
    'English Reference chip text must not exist'
  );
});

// 5. JavaScript Controller (js/main.js) Stage and Case Titles
runTest('JS Controller: stageTitles dictionary must define natural Korean titles for all 3 stages', () => {
  assert.ok(mainJsContent.includes("'단계 01 / 03 : 지식그래프 & RAG'"), 'Stage 1 Korean title missing');
  assert.ok(mainJsContent.includes("'단계 02 / 03 : 자율 에이전트 & 자동화'"), 'Stage 2 Korean title missing');
  assert.ok(mainJsContent.includes("'단계 03 / 03 : 폐쇄망 온프레미스 sLLM'"), 'Stage 3 Korean title missing');
});

runTest('JS Controller: caseTitles dictionary must define natural Korean titles for all 4 cases', () => {
  assert.ok(mainJsContent.includes("'사례 01 / 04 : KT 통신·미디어 ITO'"), 'Case 1 Korean title missing');
  assert.ok(mainJsContent.includes("'사례 02 / 04 : 농림축산식품부 공공 SI'"), 'Case 2 Korean title missing');
  assert.ok(mainJsContent.includes("'사례 03 / 04 : 서울시립교향악단 ERP 구축'"), 'Case 3 Korean title missing');
  assert.ok(mainJsContent.includes("'사례 04 / 04 : 현대자동차 클라우드 LMS'"), 'Case 4 Korean title missing');
});

runTest('JS Controller: mobile stage and case text formatting must use Korean prefix', () => {
  assert.ok(mainJsContent.includes('`단계 0${targetStage} / 03`'), 'Mobile stage target text must use 단계');
  assert.ok(mainJsContent.includes('`단계 0${activeStage} / 03`'), 'Mobile stage active text must use 단계');
  assert.ok(mainJsContent.includes('`사례 0${targetStage} / 04`'), 'Mobile case target text must use 사례');
  assert.ok(mainJsContent.includes('`사례 0${activeCaseStage} / 04`'), 'Mobile case active text must use 사례');
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
