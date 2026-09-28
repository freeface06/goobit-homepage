/**
 * @intent Test suite for high-resolution card news generated cover images, data schema, markup, and dynamic binding
 * @agent  manager-develop
 * @branch feat/card-news-generated-images
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

// File paths
const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'js', 'data.js');
const indexHtmlPath = path.join(rootDir, 'index.html');
const newsHtmlPath = path.join(rootDir, 'news.html');
const newsDetailJsPath = path.join(rootDir, 'js', 'news-detail.js');

const expectedImages = [
  {
    id: 'news-rag-national-project',
    relativePath: 'images/news/news_rag_national_project.jpg',
    expectedAlt: '구비트, AI 지식그래프 기반 하이브리드 RAG 국책 연구과제 주관기관 최종 선정',
  },
  {
    id: 'news-tbcms-update',
    relativePath: 'images/news/news_tbcms_update.jpg',
    expectedAlt: 'TBCMS 3.0 대규모 업데이트: 웹 접근성 KWCAG 2.2 인증 및 차세대 공공 CMS 엔진 혁신',
  },
  {
    id: 'news-office-expansion',
    relativePath: 'images/news/news_office_expansion.jpg',
    expectedAlt: '가치에 진심을 담는 사람들: 문정 현대지식산업센터 신사옥 확장 이전 및 AI R&D 연구소 신설',
  },
];

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
console.log('Starting Card News Generated Cover Images Test Suite');
console.log('================================================================');

// Read files
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
const newsHtmlContent = fs.readFileSync(newsHtmlPath, 'utf8');
const newsDetailJsContent = fs.readFileSync(newsDetailJsPath, 'utf8');
const testFileContent = fs.readFileSync(__filename, 'utf8');

// Strict No-Emoji Check Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testFileContent), false, 'test file must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/data.js must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(dataJsContent), false, 'js/data.js must not contain emoji');
});

runTest('Strict No-Emoji Policy: index.html latest news section must not contain unicode emoji', () => {
  const newsSecMatch = indexHtmlContent.match(/<!-- 8\. LatestNewsSection[\s\S]*?<\/section>/);
  assert.ok(newsSecMatch, 'News section must exist in index.html');
  assert.strictEqual(emojiRegex.test(newsSecMatch[0]), false, 'index.html news section must not contain emoji');
});

runTest('Strict No-Emoji Policy: news.html must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(newsHtmlContent), false, 'news.html must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/news-detail.js must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(newsDetailJsContent), false, 'js/news-detail.js must not contain emoji');
});

// 2. Annotation Verification
runTest('Annotation: js/data.js must contain standard header block annotation with branch feat/card-news-generated-images', () => {
  assert.ok(dataJsContent.includes('@intent'), '@intent missing in js/data.js');
  assert.ok(dataJsContent.includes('@agent'), '@agent missing in js/data.js');
  assert.ok(dataJsContent.includes('@branch feat/card-news-generated-images'), 'Branch feat/card-news-generated-images missing in js/data.js');
  assert.ok(dataJsContent.includes('@author'), '@author missing in js/data.js');
  assert.ok(dataJsContent.includes('@date'), '@date missing in js/data.js');
});

runTest('Annotation: index.html news section must contain standard block annotation with branch feat/card-news-generated-images', () => {
  const newsSecMatch = indexHtmlContent.match(/<!-- 8\. LatestNewsSection[\s\S]*?<\/section>/);
  assert.ok(newsSecMatch, 'News section missing in index.html');
  const sec = newsSecMatch[0];
  assert.ok(sec.includes('@intent'), '@intent missing in news section of index.html');
  assert.ok(sec.includes('@agent'), '@agent missing in news section of index.html');
  assert.ok(sec.includes('@branch feat/card-news-generated-images'), 'Branch feat/card-news-generated-images missing in news section of index.html');
  assert.ok(sec.includes('@author'), '@author missing in news section of index.html');
  assert.ok(sec.includes('@date'), '@date missing in news section of index.html');
});

runTest('Annotation: news.html must contain standard header block annotation with branch feat/card-news-generated-images', () => {
  assert.ok(newsHtmlContent.includes('@intent'), '@intent missing in news.html');
  assert.ok(newsHtmlContent.includes('@agent'), '@agent missing in news.html');
  assert.ok(newsHtmlContent.includes('@branch feat/card-news-generated-images'), 'Branch feat/card-news-generated-images missing in news.html');
});

runTest('Annotation: js/news-detail.js must contain standard header block annotation with branch feat/card-news-generated-images', () => {
  assert.ok(newsDetailJsContent.includes('@intent'), '@intent missing in js/news-detail.js');
  assert.ok(newsDetailJsContent.includes('@agent'), '@agent missing in js/news-detail.js');
  assert.ok(newsDetailJsContent.includes('feat/card-news-generated-images'), 'Branch feat/card-news-generated-images missing in js/news-detail.js');
});

// 3. Real High-Res Cover Image Files Verification
expectedImages.forEach((imgSpec) => {
  runTest(`Image File Integrity: ${imgSpec.relativePath} must exist and be valid (> 100KB)`, () => {
    const absPath = path.join(rootDir, imgSpec.relativePath);
    assert.ok(fs.existsSync(absPath), `Image file does not exist: ${absPath}`);
    const stats = fs.statSync(absPath);
    assert.ok(stats.isFile(), `Expected file but got directory: ${absPath}`);
    const minSize = 100 * 1024; // 100KB
    assert.ok(
      stats.size > minSize,
      `Image file size (${stats.size} bytes) is smaller than required 100KB (${minSize} bytes): ${absPath}`
    );
  });
});

// 4. Data Store (js/data.js) coverImage Schema Verification
runTest('Data Schema: js/data.js CARD_NEWS_DATA must define coverImage on all 3 target news items', () => {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(dataJsContent, sandbox);

  const cardNewsData = sandbox.window.CARD_NEWS_DATA;
  assert.ok(Array.isArray(cardNewsData), 'CARD_NEWS_DATA must be an array');

  expectedImages.forEach((imgSpec) => {
    const item = cardNewsData.find((n) => n.id === imgSpec.id);
    assert.ok(item, `News item with id '${imgSpec.id}' not found in CARD_NEWS_DATA`);
    assert.strictEqual(
      item.coverImage,
      imgSpec.relativePath,
      `News item '${imgSpec.id}' coverImage mismatch: expected '${imgSpec.relativePath}', got '${item.coverImage}'`
    );
    // Verify referenced file on disk
    const fullImgPath = path.join(rootDir, item.coverImage);
    assert.ok(fs.existsSync(fullImgPath), `File referenced in coverImage does not exist: ${fullImgPath}`);
  });
});

// 5. Landing Page (index.html) Static Markup Verification
runTest('Landing Page index.html: Must contain 3 real cover image tags with lazy loading and zoom transition', () => {
  expectedImages.forEach((imgSpec) => {
    // Assert <img> tag with src
    assert.ok(
      indexHtmlContent.includes(`src="${imgSpec.relativePath}"`),
      `index.html must contain img with src="${imgSpec.relativePath}"`
    );
    // Assert loading="lazy"
    const imgRegex = new RegExp(`<img[^>]*src="${imgSpec.relativePath.replace(/\//g, '[/\\\\]')}"[^>]*>`, 'i');
    const match = indexHtmlContent.match(imgRegex);
    assert.ok(match, `Could not match full img tag for ${imgSpec.relativePath}`);
    const imgTag = match[0];
    assert.ok(imgTag.includes('loading="lazy"'), `img tag for ${imgSpec.relativePath} must have loading="lazy"`);
    assert.ok(imgTag.includes('object-cover'), `img tag for ${imgSpec.relativePath} must have object-cover`);
    assert.ok(imgTag.includes('group-hover:scale-105'), `img tag for ${imgSpec.relativePath} must have group-hover:scale-105`);
    assert.ok(imgTag.includes('transition-transform'), `img tag for ${imgSpec.relativePath} must have transition-transform`);
  });
});

runTest('Landing Page index.html: Must contain cinematic atmospheric gradient overlays for readability', () => {
  const overlayPattern = 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40';
  const matches = indexHtmlContent.split(overlayPattern).length - 1;
  assert.ok(matches >= 3, `Expected at least 3 cinematic overlays in index.html, found ${matches}`);

  const radialPattern = 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]';
  const radialMatches = indexHtmlContent.split(radialPattern).length - 1;
  assert.ok(radialMatches >= 3, `Expected at least 3 radial pattern overlays in index.html, found ${radialMatches}`);
});

runTest('Landing Page index.html: 4:3 cover aspect ratio containers must have dark backdrop and group-hover shadow', () => {
  const aspectContainers = indexHtmlContent.match(/aspect-\[4\/3\][^"]*group-hover:shadow-lg/g) || [];
  assert.ok(aspectContainers.length >= 3, `Expected at least 3 aspect-[4/3] containers with group-hover:shadow-lg in index.html, found ${aspectContainers.length}`);
});

// 6. Newsroom List Page (news.html) Dynamic Binding Verification
runTest('Newsroom news.html: renderNewsGrid must dynamically render coverImage with graceful fallback', () => {
  assert.ok(newsHtmlContent.includes('${item.coverImage ?'), 'news.html must check item.coverImage');
  assert.ok(newsHtmlContent.includes('src="${item.coverImage}"'), 'news.html must bind src to item.coverImage');
  assert.ok(newsHtmlContent.includes('loading="lazy"'), 'news.html cover img must have loading="lazy"');
  assert.ok(newsHtmlContent.includes('group-hover:scale-105'), 'news.html cover img must have hover zoom');
  assert.ok(
    newsHtmlContent.includes('bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40'),
    'news.html must include cinematic gradient overlay'
  );
});

// 7. News Detail Page (js/news-detail.js) Related News Dynamic Binding Verification
runTest('News Detail js/news-detail.js: renderRelatedNews must dynamically render coverImage with graceful fallback', () => {
  assert.ok(newsDetailJsContent.includes('${item.coverImage ?'), 'js/news-detail.js must check item.coverImage');
  assert.ok(newsDetailJsContent.includes('src="${item.coverImage}"'), 'js/news-detail.js must bind src to item.coverImage');
  assert.ok(newsDetailJsContent.includes('loading="lazy"'), 'js/news-detail.js cover img must have loading="lazy"');
  assert.ok(newsDetailJsContent.includes('group-hover:scale-105'), 'js/news-detail.js cover img must have hover zoom');
  assert.ok(
    newsDetailJsContent.includes('bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40'),
    'js/news-detail.js must include cinematic gradient overlay'
  );
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
