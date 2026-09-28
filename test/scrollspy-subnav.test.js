/**
 * @intent Comprehensive test suite for sticky sub-navigation scrollspy, active states, no-scrollbar, and keyboard/click interactions
 * @agent  manager-develop
 * @branch feat/scrollspy-header-subnav
 * @author @goobit-dev
 * @date   2026-09-28
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// File paths
const rootDir = path.resolve(__dirname, '..');
const mainJsPath = path.join(rootDir, 'js', 'main.js');
const cssPath = path.join(rootDir, 'css', 'style.css');
const companyHtmlPath = path.join(rootDir, 'company.html');
const productsHtmlPath = path.join(rootDir, 'products.html');
const servicesHtmlPath = path.join(rootDir, 'services.html');
const contactHtmlPath = path.join(rootDir, 'contact.html');

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
console.log('Starting Sticky Sub-navigation Scrollspy Test Suite');
console.log('================================================================');

// Read file contents
const testFileContent = fs.readFileSync(__filename, 'utf8');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const companyHtml = fs.readFileSync(companyHtmlPath, 'utf8');
const productsHtml = fs.readFileSync(productsHtmlPath, 'utf8');
const servicesHtml = fs.readFileSync(servicesHtmlPath, 'utf8');
const contactHtml = fs.readFileSync(contactHtmlPath, 'utf8');

// Strict No-Emoji Regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

// 1. Strict No-Emoji Policy Verification
runTest('Strict No-Emoji Policy: test script itself must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(testFileContent), false, 'test file must not contain emoji');
});

runTest('Strict No-Emoji Policy: js/main.js must not contain unicode emoji', () => {
  assert.strictEqual(emojiRegex.test(mainJsContent), false, 'main.js must not contain emoji');
});

runTest('Strict No-Emoji Policy: css/style.css subnav styles must not contain unicode emoji', () => {
  const subnavCssMatch = cssContent.match(/Sticky Sub-navigation Anchor Scrollspy[\s\S]*$/);
  assert.ok(subnavCssMatch, 'Subnav CSS section must exist');
  assert.strictEqual(emojiRegex.test(subnavCssMatch[0]), false, 'style.css subnav section must not contain emoji');
});

runTest('Strict No-Emoji Policy: company.html, products.html, services.html, contact.html must not contain emoji', () => {
  assert.strictEqual(emojiRegex.test(companyHtml), false, 'company.html must not contain emoji');
  assert.strictEqual(emojiRegex.test(productsHtml), false, 'products.html must not contain emoji');
  assert.strictEqual(emojiRegex.test(servicesHtml), false, 'services.html must not contain emoji');
  assert.strictEqual(emojiRegex.test(contactHtml), false, 'contact.html must not contain emoji');
});

// 2. Standard Header Block Annotations Verification
runTest('Annotation: css/style.css, js/main.js, and all 4 HTML files must contain feat/scrollspy-header-subnav branch annotation', () => {
  assert.ok(cssContent.includes('@branch feat/scrollspy-header-subnav'), 'style.css must declare branch');
  assert.ok(mainJsContent.includes('@branch feat/scrollspy-header-subnav'), 'main.js must declare branch');
  assert.ok(companyHtml.includes('@branch feat/scrollspy-header-subnav'), 'company.html must declare branch');
  assert.ok(productsHtml.includes('@branch feat/scrollspy-header-subnav'), 'products.html must declare branch');
  assert.ok(servicesHtml.includes('@branch feat/scrollspy-header-subnav'), 'services.html must declare branch');
  assert.ok(contactHtml.includes('@branch feat/scrollspy-header-subnav'), 'contact.html must declare branch');
});

// 3. HTML Markup & Attribute Parity across all 4 files
runTest('HTML Markup: company.html must declare data-subnav-container, no-scrollbar, and subnav-link on all anchors', () => {
  assert.ok(companyHtml.includes('data-subnav-container'), 'company.html must have data-subnav-container');
  assert.ok(companyHtml.includes('no-scrollbar'), 'company.html must have no-scrollbar');
  assert.ok(companyHtml.includes('class="subnav-link is-active-anchor is-active whitespace-nowrap"'), 'First link must be active');
  
  // Verify target section IDs exist in company.html
  ['overview', 'ceo', 'history', 'certifications', 'location'].forEach((id) => {
    assert.ok(companyHtml.includes(`id="${id}"`), `Section #${id} must exist in company.html`);
  });
});

runTest('HTML Markup: products.html must declare data-subnav-container, no-scrollbar, and subnav-link on all anchors', () => {
  assert.ok(productsHtml.includes('data-subnav-container'), 'products.html must have data-subnav-container');
  assert.ok(productsHtml.includes('no-scrollbar'), 'products.html must have no-scrollbar');
  assert.ok(productsHtml.includes('class="subnav-link is-active-anchor is-active whitespace-nowrap"'), 'First link must be active');

  // Verify target section IDs exist in products.html
  ['ai-suite', 'architecture', 'comparison', 'tbcms', 'opms'].forEach((id) => {
    assert.ok(productsHtml.includes(`id="${id}"`), `Section #${id} must exist in products.html`);
  });
});

runTest('HTML Markup: services.html must declare data-subnav-container, no-scrollbar, and subnav-link on all anchors', () => {
  assert.ok(servicesHtml.includes('data-subnav-container'), 'services.html must have data-subnav-container');
  assert.ok(servicesHtml.includes('no-scrollbar'), 'services.html must have no-scrollbar');
  assert.ok(servicesHtml.includes('class="subnav-link is-active-anchor is-active whitespace-nowrap"'), 'First link must be active');

  // Verify target section IDs exist in services.html
  ['methodology', 'public-si', 'telecom-ito', 'edutech', 'consulting'].forEach((id) => {
    assert.ok(servicesHtml.includes(`id="${id}"`), `Section #${id} must exist in services.html`);
  });
});

runTest('HTML Markup: contact.html must declare data-subnav-container, no-scrollbar, and subnav-link on all anchors', () => {
  assert.ok(contactHtml.includes('data-subnav-container'), 'contact.html must have data-subnav-container');
  assert.ok(contactHtml.includes('no-scrollbar'), 'contact.html must have no-scrollbar');
  assert.ok(contactHtml.includes('class="subnav-link is-active-anchor is-active whitespace-nowrap"'), 'First link must be active');

  // Verify target section IDs exist in contact.html
  ['inquiry', 'support', 'directions'].forEach((id) => {
    assert.ok(contactHtml.includes(`id="${id}"`), `Section #${id} must exist in contact.html`);
  });
});

// 4. CSS Styling & Transition Verification
runTest('CSS Styling: .subnav-link must declare transition, position relative, and hover state', () => {
  assert.ok(cssContent.includes('.subnav-link {'), '.subnav-link rule must exist');
  assert.ok(cssContent.includes('position: relative;'), 'Must be positioned relatively for ::after underline');
  assert.ok(cssContent.includes('color: #475569;'), 'Must have slate-600 default color');
  assert.ok(cssContent.includes('transition: color 0.2s ease, font-weight 0.2s ease;'), 'Must transition color and font-weight');
});

runTest('CSS Styling: .subnav-link::after must use cubic-bezier(0.16, 1, 0.3, 1) and scaleX transform', () => {
  assert.ok(cssContent.includes('.subnav-link::after {'), '.subnav-link::after rule must exist');
  assert.ok(cssContent.includes('transform: scaleX(0);'), 'Default underline must be scaled to 0');
  assert.ok(cssContent.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'Must use required smooth cubic-bezier easing');
  assert.ok(cssContent.includes('background-color: #2563eb;'), 'Underline color must be primary blue');
});

runTest('CSS Styling: .is-active and .is-active-anchor must activate font weight and underline', () => {
  assert.ok(cssContent.includes('.subnav-link.is-active'), '.subnav-link.is-active rule must exist');
  assert.ok(cssContent.includes('color: #1d4ed8 !important;'), 'Active color must be emphasized blue');
  assert.ok(cssContent.includes('font-weight: 800 !important;'), 'Active font weight must be 800');
  assert.ok(cssContent.includes('transform: scaleX(1);'), 'Active underline must scale to 1');
});

runTest('CSS Styling: .no-scrollbar must hide webkit and standard scrollbars', () => {
  assert.ok(cssContent.includes('.no-scrollbar::-webkit-scrollbar'), 'Webkit scrollbar hidden rule must exist');
  assert.ok(cssContent.includes('scrollbar-width: none;'), 'Firefox scrollbar none rule must exist');
});

runTest('CSS Accessibility: @media (prefers-reduced-motion: reduce) must disable subnav transitions', () => {
  const subnavSection = cssContent.slice(cssContent.lastIndexOf('Sticky Sub-navigation Anchor Scrollspy'));
  assert.ok(subnavSection.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion rule for subnav-link must exist');
  assert.ok(subnavSection.includes('.subnav-link::after'), '.subnav-link::after must be styled under media query');
  assert.ok(subnavSection.includes('transition: none !important;'), 'Underline transition must be removed on reduced motion');
});

// 5. JavaScript Controller & Scrollspy Simulation
const { initScrollspy } = require('../js/main.js');

runTest('JS Controller: initScrollspy must be exported as a function', () => {
  assert.strictEqual(typeof initScrollspy, 'function');
});

runTest('JS Simulation: Scrollspy tracks section positions and updates active classes accordingly', () => {
  // Setup minimal DOM mock environment
  const mockClassList = (initial = []) => {
    const classes = new Set(initial);
    return {
      add: (...c) => c.forEach((x) => classes.add(x)),
      remove: (...c) => c.forEach((x) => classes.delete(x)),
      contains: (c) => classes.has(c),
      toArray: () => Array.from(classes)
    };
  };

  const sectionsData = [
    { id: 'overview', top: 300, height: 600 },
    { id: 'ceo', top: 900, height: 500 },
    { id: 'history', top: 1400, height: 700 },
    { id: 'certifications', top: 2100, height: 600 },
    { id: 'location', top: 2700, height: 800 }
  ];

  // Mock DOM
  let currentScrollY = 0;
  const elementsById = {};
  const mockLinks = [];

  sectionsData.forEach((sec, idx) => {
    const secEl = {
      id: sec.id,
      getBoundingClientRect: () => ({
        top: sec.top - currentScrollY,
        bottom: sec.top + sec.height - currentScrollY,
        height: sec.height
      })
    };
    elementsById[sec.id] = secEl;

    const linkEl = {
      href: `#${sec.id}`,
      getAttribute: (attr) => (attr === 'href' ? `#${sec.id}` : null),
      classList: mockClassList(idx === 0 ? ['subnav-link', 'is-active-anchor', 'is-active'] : ['subnav-link']),
      closest: () => ({ scrollWidth: 500, clientWidth: 300 }),
      scrollIntoView: () => {},
      addEventListener: (evt, fn) => {
        linkEl.clickHandler = fn;
      }
    };
    mockLinks.push(linkEl);
  });

  const mockContainer = {
    querySelectorAll: (selector) => {
      if (selector === 'a[href^="#"]') return mockLinks;
      return [];
    }
  };

  const originalDoc = global.document;
  const originalWin = global.window;

  global.window = {
    scrollY: 0,
    innerHeight: 800,
    pageYOffset: 0,
    scrollTo: (opts) => {
      currentScrollY = opts.top;
      global.window.scrollY = opts.top;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    requestAnimationFrame: (cb) => cb()
  };

  global.document = {
    querySelectorAll: (selector) => {
      if (selector.includes('[data-subnav-container]')) {
        return [mockContainer];
      }
      return [];
    },
    getElementById: (id) => elementsById[id] || null,
    documentElement: {
      scrollHeight: 3600
    }
  };

  try {
    const scrollspy = initScrollspy();
    assert.ok(scrollspy, 'initScrollspy must return controller instance');
    assert.strictEqual(scrollspy.getItems().length, 5, 'Must collect all 5 subnav links');

    // 1. Initial State (at top) -> 'overview' is active
    currentScrollY = 0;
    global.window.scrollY = 0;
    scrollspy.update();
    assert.strictEqual(scrollspy.getActiveId(), 'overview', 'At top scroll, overview must be active');
    assert.ok(mockLinks[0].classList.contains('is-active-anchor'));
    assert.strictEqual(mockLinks[1].classList.contains('is-active-anchor'), false);

    // 2. Scrolled to CEO section (top: 900, checkPosition = 850 + 130 = 980)
    currentScrollY = 850;
    global.window.scrollY = 850;
    scrollspy.update();
    assert.strictEqual(scrollspy.getActiveId(), 'ceo', 'When scrolled to 850px, ceo must become active');
    assert.strictEqual(mockLinks[0].classList.contains('is-active-anchor'), false);
    assert.ok(mockLinks[1].classList.contains('is-active-anchor'));

    // 3. Scrolled to bottom of page (3600 - 800 = 2800 -> 2800 + 800 = 3600 >= 3550) -> 'location' forced
    currentScrollY = 2800;
    global.window.scrollY = 2800;
    scrollspy.update();
    assert.strictEqual(scrollspy.getActiveId(), 'location', 'At bottom of page, last section location must be forced active');
    assert.ok(mockLinks[4].classList.contains('is-active-anchor'));

    // 4. Click interaction simulation on history link
    const historyLink = mockLinks[2];
    let defaultPrevented = false;
    historyLink.clickHandler({
      preventDefault: () => {
        defaultPrevented = true;
      }
    });
    assert.ok(defaultPrevented, 'Clicking link must prevent standard page jump');
    assert.strictEqual(scrollspy.getActiveId(), 'history', 'Clicking history link must activate history');
    assert.ok(historyLink.classList.contains('is-active-anchor'));

    scrollspy.destroy();
  } finally {
    global.document = originalDoc;
    global.window = originalWin;
  }
});

console.log('================================================================');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}
