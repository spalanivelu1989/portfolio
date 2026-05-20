// Portfolio automated tests — runs in Node.js with no dependencies.
// Usage: node tests/portfolio.test.js
// Parses index.html with regex; no DOM environment required.

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log('  PASS  ' + description);
    passed++;
  } else {
    console.error('  FAIL  ' + description);
    failed++;
  }
}

console.log('\nPortfolio test suite\n');

// --- Hero section (R1, AC1, AC2) ---
console.log('Hero');
assert('section#hero exists', html.includes('id="hero"'));
assert('h1 contains name', html.includes('Senthil Palanivelu'));
assert('tagline is present', html.includes('class="hero__tagline"'));
assert('CTA links to #projects', html.includes('href="#projects"'));
assert('CTA text is present', /See my work/i.test(html));

// --- Projects section (R2, AC3) ---
console.log('\nProjects');
assert('section#projects exists', html.includes('id="projects"'));
const cardCount = (html.match(/class="card"/g) || []).length;
assert('at least 3 project cards', cardCount >= 3);
assert('cards have GitHub links', html.includes('card__link'));
assert('cards have tech tags', html.includes('class="tag"'));

// --- About section (R3, AC4) ---
console.log('\nAbout');
assert('section#about exists', html.includes('id="about"'));
assert('about bio is present', html.includes('class="about__bio"'));

// --- Contact section (R4, AC5) ---
console.log('\nContact');
assert('section#contact exists', html.includes('id="contact"'));
assert('email link present (mailto:)', html.includes('href="mailto:'));
const socialLinks = (html.match(/class="contact__social"/g) || []).length;
assert('at least 2 social links', socialLinks >= 2);
assert('GitHub social link present', html.includes('github.com/spalanivelu1989'));

// --- Navigation (R5, AC6) ---
console.log('\nNavigation');
assert('nav element present', html.includes('<nav'));
assert('nav links to #projects', html.includes('href="#projects"'));
assert('nav links to #about', html.includes('href="#about"'));
assert('nav links to #contact', html.includes('href="#contact"'));

// --- Accessibility (R7, AC10) ---
console.log('\nAccessibility');
assert('lang attribute on html', html.includes('lang="en"'));
assert('skip link present', html.includes('class="skip-link"'));
assert('main has id for skip link', html.includes('id="main-content"'));
assert('nav has aria-label', html.includes('aria-label="Main navigation"'));
assert('sections use aria-labelledby', (html.match(/aria-labelledby/g) || []).length >= 4);
assert('logo link has aria-label containing "SP"', html.includes('aria-label="SP –'));

// --- No-JS baseline (R8, AC9) ---
console.log('\nNo-JS baseline');
assert('script.js is at end of body (enhancement only)', html.indexOf('<script') > html.indexOf('</main>'));
assert('all sections in static HTML (not JS-rendered)', [
  'id="hero"', 'id="projects"', 'id="about"', 'id="contact"'
].every(function (id) { return html.includes(id); }));

// --- Summary ---
console.log('\n' + '─'.repeat(40));
console.log('Results: ' + passed + ' passed, ' + failed + ' failed');
if (failed > 0) {
  console.error('Some tests failed.');
  process.exit(1);
} else {
  console.log('All tests passed.');
}
