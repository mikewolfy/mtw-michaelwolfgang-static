// Shared site shell: navigation config, header, footer, and the HTML document wrapper.

export const SITE = {
  name: 'Michael Wolfgang',
  tagline: 'Husband & Dad • Runner • Black Belt • Reader • Investor • Software Architect',
  description:
    'The personal site of Michael Wolfgang — family, running, Tae Kwon Do, books, quotes, fun tools, and a corner for software.',
};

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Navigation. `path` is the page's folder relative to the site root ('' = home).
export const NAV = [
  { label: 'Home', path: '' },
  { label: 'About', path: 'about' },
  {
    group: 'Reading',
    items: [
      { label: 'Book List', path: 'booklist', desc: 'Books with notes & ratings' },
      { label: 'Quotes', path: 'quotes', desc: 'Searchable quote collection' },
      { label: 'Podcasts', path: 'developer/podcasts', desc: 'What I listen to' },
    ],
  },
  {
    group: 'Fun & Tools',
    items: [
      { label: 'Pace Calculator', path: 'pace-calculator', desc: 'Target race paces' },
      { label: 'Life Timers', path: 'life-timers', desc: 'Time until year-end, retirement…' },
      { label: 'Myers-Briggs Test', path: 'myers-briggs', desc: '32-question personality test' },
      { label: 'Love Languages', path: 'love-languages', desc: 'How you give & receive love' },
      { label: 'Spell Press', path: 'games/spellpress', desc: 'A quick spelling game' },
    ],
  },
  {
    group: 'Work & Tech',
    items: [
      { label: 'Overview', path: 'developer', desc: 'My software corner' },
      { label: 'Interview Questions', path: 'developer/interview-questions', desc: 'C#, Azure & problem solving' },
      { label: 'Resources', path: 'developer/resources', desc: 'Azure, .NET & engineering' },
      { label: 'JWT Decoder', path: 'developer/jwt-decoder', desc: 'Inspect JSON Web Tokens' },
      { label: 'RSA Validator', path: 'developer/rsa-validator', desc: 'Verify RSA signatures' },
      { label: 'Scopes & Claims', path: 'tech-docs/scopes-and-claims', desc: 'Securing APIs guide' },
      { label: 'CIAM Resources', path: 'tech-docs/ciam-resources', desc: 'Customer identity reading' },
    ],
  },
  { label: 'Contact', path: 'contact' },
];

// ---- URL helpers -----------------------------------------------------------
export const rootFor = (path) => (path ? '../'.repeat(path.split('/').length) : './');
export const hrefFor = (root, path) => (path ? `${root}${path}/` : root);

// ---- Header ----------------------------------------------------------------
function header(root, current) {
  const link = (item) =>
    `<a href="${hrefFor(root, item.path)}"${item.path === current ? ' aria-current="page"' : ''}>${esc(item.label)}${
      item.desc ? `<small>${esc(item.desc)}</small>` : ''
    }</a>`;

  const nav = NAV.map((entry) => {
    if (!entry.group) return link(entry);
    const isCurrent = entry.items.some((i) => i.path === current);
    return `<div class="nav-group">
        <button class="nav-btn${isCurrent ? ' is-current' : ''}" type="button" aria-haspopup="true" aria-expanded="false">${esc(entry.group)}</button>
        <div class="menu"><div class="menu-title">${esc(entry.group)}</div>${entry.items.map(link).join('')}</div>
      </div>`;
  }).join('\n      ');

  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${root === './' ? './' : root}"><span class="brand-mark" aria-hidden="true">MW</span>Michael Wolfgang</a>
    <nav class="nav" id="site-nav" aria-label="Main">
      ${nav}
      <button class="theme-toggle" type="button" aria-label="Toggle light / dark theme" title="Toggle theme">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
    </nav>
    <button class="nav-toggle" type="button" aria-label="Menu" aria-controls="site-nav" aria-expanded="false">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
</header>`;
}

// ---- Footer ----------------------------------------------------------------
function footer(root) {
  const a = (path, label) => `<li><a href="${hrefFor(root, path)}">${esc(label)}</a></li>`;
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="${root}"><span class="brand-mark" aria-hidden="true">MW</span>Michael Wolfgang</a>
        <p class="tag">${esc(SITE.tagline)}</p>
      </div>
      <div>
        <h4>Site</h4>
        <ul>${a('', 'Home')}${a('about', 'About')}${a('contact', 'Contact')}${a('links', 'Useful Links')}</ul>
      </div>
      <div>
        <h4>Reading &amp; fun</h4>
        <ul>${a('booklist', 'Book List')}${a('quotes', 'Quotes')}${a('pace-calculator', 'Pace Calculator')}${a('games/spellpress', 'Spell Press')}</ul>
      </div>
      <div>
        <h4>Work &amp; tech</h4>
        <ul>${a('developer', 'Overview')}${a('developer/interview-questions', 'Interview Questions')}${a('tech-docs/scopes-and-claims', 'Scopes & Claims')}${a('developer/jwt-decoder', 'JWT Decoder')}</ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Michael Wolfgang. All rights reserved.</span>
    </div>
  </div>
</footer>`;
}

// ---- Page chrome -----------------------------------------------------------
/** Header band used at the top of inner pages. */
export function pageHead({ title, lede, eyebrow, crumbs = [] }) {
  const trail = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb">${crumbs
        .map((c) => (c.href ? `<a href="${c.href}">${esc(c.label)}</a><span aria-hidden="true">/</span>` : `<span>${esc(c.label)}</span>`))
        .join('')}</nav>`
    : '';
  return `<section class="page-head"><div class="wrap">
    ${trail}
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1>${esc(title)}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
  </div></section>`;
}

/** Full HTML document. */
export function renderDocument({ path, title, description, body, scripts = [], inlineHead = '' }) {
  const root = rootFor(path);
  const fullTitle = path === '' ? `${SITE.name} — Family, Running, Reading & More` : `${title} — ${SITE.name}`;
  const desc = esc(description || SITE.description);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#5b4bdb">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<link rel="stylesheet" href="${root}assets/css/site.css">
${inlineHead}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header(root, path)}
<main id="main">
${body}
</main>
${footer(root)}
<script src="${root}assets/js/site.js"></script>
${scripts.map((s) => `<script src="${root}assets/js/${s}"></script>`).join('\n')}
</body>
</html>
`;
}
