// Page definitions. Each page: { path, title, description, body, scripts?, bare? }
// Content is carried over from the original React site (mtw-michaelwolfgang-react).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { esc, pageHead, rootFor, hrefFor } from './layout.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const readJson = (rel) => JSON.parse(readFileSync(join(here, '..', 'data', rel), 'utf8'));
const readContent = (rel) => readFileSync(join(here, 'content', rel), 'utf8');
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

const LINKEDIN = 'https://www.linkedin.com/in/michael-wolfgang/';
const GITHUB = 'https://github.com/mikewolfy';
const ATHLINKS = 'https://www.athlinks.com/athletes/109779785';
const PRUDENT = 'https://investing.prudentheed.com/';
const CARMAX = 'https://www.carmax.com';

const ext = (href, label, cls = '') => `<a href="${href}" target="_blank" rel="noopener noreferrer"${cls ? ` class="${cls}"` : ''}>${label}</a>`;
const section = (inner, cls = '') => `<div class="wrap section ${cls}">${inner}</div>`;

export function buildPages() {
  const pages = [];
  const add = (p) => pages.push(p);

  // ==========================================================================
  // Home
  // ==========================================================================
  {
    const root = './';
    const u = (p) => hrefFor(root, p);
    const feature = ({ img, alt, title, body }) => `
      <article class="feature">
        <div class="feature-art"><img src="images/${img}" alt="${esc(alt)}" width="400" height="400" loading="lazy"></div>
        <div>${`<h2>${title}</h2>`}${body}</div>
      </article>`;

    const explore = [
      ['🧰', 'Developer hub', 'Interview questions, podcasts, resources and handy tools.', 'developer'],
      ['🔐', 'Scopes & Claims', 'A practical guide to securing APIs with OAuth scopes and JWT claims.', 'tech-docs/scopes-and-claims'],
      ['📚', 'Book list', 'Books I’ve read or listened to, with notes and ratings.', 'booklist'],
      ['💬', 'Quotes', 'A searchable collection of quotes on leadership and decisions.', 'quotes'],
      ['🏃', 'Pace calculator', 'Work out the pace you need for your next 5K to marathon.', 'pace-calculator'],
      ['🧠', 'Personality tests', 'Myers-Briggs and the 5 Love Languages — both free and private.', 'myers-briggs'],
    ];

    add({
      path: '',
      title: 'Home',
      description:
        'Michael Wolfgang — software engineer and architect at CarMax, marathon runner, investor and lifelong learner. Developer resources, tools, books and quotes.',
      body: `
<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">Software Engineer &amp; Architect</p>
      <h1>Building useful software, one habit at a time.</h1>
      <p class="lede">I’m Michael — I build enterprise applications and APIs on modern cloud technologies at ${ext(CARMAX, 'CarMax')}. Outside of work I’m a husband and dad, a Tae Kwon Do black belt, a marathon runner, an investor and a lifelong learner.</p>
      <div class="hero-actions">
        <a class="btn btn-light" href="${u('developer')}">Explore developer resources</a>
        <a class="btn btn-outline-light" href="${u('about')}">About me</a>
        <a class="btn btn-outline-light" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
      <div class="hero-stats" aria-label="Highlights">
        <div><strong>20</strong><span>Marathons run</span></div>
        <div><strong>17+</strong><span>Half marathons</span></div>
        <div><strong>3:12</strong><span>Boston-qualifying time</span></div>
        <div><strong>Black belt</strong><span>Tae Kwon Do, as a family</span></div>
      </div>
    </div>
    <div class="hero-art"><img src="images/dev-architecture.svg" alt="Software architecture illustration" width="400" height="400"></div>
  </div>
</section>

<div class="wrap section stack">
  ${feature({
    img: 'dev-architecture.svg',
    alt: 'Software architecture illustration',
    title: 'Software Engineer and Architect',
    body: `<p>I spend my days having fun building enterprise applications and APIs using cloud technologies at ${ext(CARMAX, 'CarMax')}. Today’s cloud technologies make it really fun &amp; easy to apply my experience and deliver quick value to customers and clients. Part of the fun is that there’s always room to continue improving and learning (like life).</p>
      <ul class="links">
        <li><a href="${u('developer/resources')}">Azure, .NET &amp; software resources →</a></li>
        <li><a href="${u('tech-docs/ciam-resources')}">CIAM resources →</a></li>
        <li><a href="${u('developer/podcasts')}">Podcasts I follow →</a></li>
        <li>${ext(LINKEDIN, 'Contact me on LinkedIn ↗')}</li>
      </ul>`,
  })}
  ${feature({
    img: 'finance-growth.svg',
    alt: 'Personal finance growth illustration',
    title: 'Personal Finance and Investing',
    body: `<p>Personal finance is an important aspect of any adult’s life, especially for those of us that have kids and families depending on us. The basics are really pretty simple, but are not very well understood by the vast population. We spend more time researching our next TV than we do our investment options. I’ve started to put some of my knowledge out on the web on my own website.</p>
      <h3>3 major keys to individual investing success</h3>
      <ol><li>Minimize costs (taxes and fees)</li><li>Minimize risk through diversification</li><li>Eliminate emotion by automating investing and rebalancing</li></ol>
      <p>Check out my little investing site running in the cloud: ${ext(PRUDENT, 'prudentheed.com ↗')}</p>`,
  })}
  ${feature({
    img: 'runner-icon.svg',
    alt: 'Runner illustration',
    title: 'Runner',
    body: `<p>I’m an avid runner, and I’m proud of my running accomplishments. I have:</p>
      <ul class="checklist">
        <li>Run 20 marathons and over 17 half marathons.</li>
        <li>Met my beautiful wife through running.</li>
        <li>Run 50 miles along the Potomac with my wife.</li>
        <li>Run a marathon with Mickey Mouse in Disney.</li>
        <li>Run a 3:12 marathon to qualify for the Boston marathon (then run the Boston Marathon).</li>
        <li>Run plenty of 5Ks while pushing my kids in their stroller.</li>
        <li>Run a marathon to the top of Pikes Peak during a thunder storm.</li>
        <li>Run in the top 100 finishers of the local 27,000+ Ukrops Monument 10K.</li>
      </ul>
      <p>Check out all of my races on ${ext(ATHLINKS, 'Athlinks ↗')}.</p>`,
  })}
  ${feature({
    img: 'learning-icon.svg',
    alt: 'Continuous learning illustration',
    title: 'Student / Learner',
    body: `<p>I’m a big believer in constant improvement. I like listening to podcasts and keep current with investing and software. Learning is a habit that pays exponential dividends over time. The older I get, the less free time I seem to have, so I’m constantly curating my sources of podcasts and articles to get the most out of my time.</p>
      <ul class="links">
        <li><a href="${u('booklist')}">Books I’ve been reading or listening to →</a></li>
        <li><a href="${u('developer/podcasts')}">My favorite podcasts →</a></li>
      </ul>`,
  })}
  ${feature({
    img: 'tae-kwon-do-belt.svg',
    alt: 'Tae Kwon Do belt illustration',
    title: 'Tae Kwon Do, as a Family',
    body: `<p>Tae Kwon Do has been one of our family’s longest-running commitments. My kids and I have trained together for years, and every one of us has earned a black belt along the way.</p>
      <p>Getting there wasn’t quick or easy — it took years of consistent practice, showing up on the hard days, and pushing through plateaus together. That shared effort is what made it worthwhile: we didn’t just get a belt, we built a habit of discipline and perseverance as a family, and we keep training together to this day.</p>`,
  })}
</div>

<div class="wrap section tight" style="padding-top:0">
  <h2>Explore the site</h2>
  <div class="grid cols-3" style="margin-top:1.25rem">
    ${explore
      .map(
        ([icon, t, d, p]) => `<a class="card card-link" href="${u(p)}"><div class="card-icon" aria-hidden="true">${icon}</div><h3>${t}</h3><p>${d}</p><span class="more">Open →</span></a>`
      )
      .join('\n    ')}
  </div>
</div>`,
    });
  }

  // ==========================================================================
  // About / Contact / Links
  // ==========================================================================
  add({
    path: 'about',
    title: 'About',
    description: 'About Michael Wolfgang — software engineer and architect, husband and father, Tae Kwon Do black belt, runner and lifelong learner.',
    body:
      pageHead({ eyebrow: 'About', title: 'About me', lede: 'Software engineer, runner, investor, and lifelong learner.' }) +
      section(`
      <div class="stack prose" style="max-width:820px">
        <div class="card">
          <h2 class="card-title">Michael Wolfgang</h2>
          <p>I’m a Software Engineer and Architect with a passion for building enterprise applications and APIs using modern cloud technologies. I work at ${ext(CARMAX, 'CarMax')}, where I apply my experience to deliver value to customers and clients.</p>
          <p>Beyond my professional work, I’m a husband and father, a Tae Kwon Do black belt and an avid runner. My best days are spent with my beautiful wife and wonderful kids, running outdoors, and enjoying a good movie or book.</p>
          <p>I regularly listen to podcasts, read books, and stay current with the latest in software engineering, cloud computing, self improvement and personal finance.</p>
        </div>
        <div class="card">
          <h2 class="card-title">Tae Kwon Do, as a Family</h2>
          <p>Tae Kwon Do has been one of our family’s longest-running commitments. My kids and I have trained together for years, and every one of us has earned a black belt along the way.</p>
          <p>Getting there wasn’t quick or easy — it took years of consistent practice, showing up on the hard days, and pushing through plateaus together. That shared effort is what made it worthwhile: we didn’t just get a belt, we built a habit of discipline and perseverance as a family, and we keep training together to this day.</p>
        </div>
      </div>`),
  });

  add({
    path: 'contact',
    title: 'Contact',
    description: 'Get in touch with Michael Wolfgang on LinkedIn or GitHub.',
    body:
      pageHead({ eyebrow: 'Contact', title: 'Let’s connect', lede: 'Feel free to reach out through any of the following channels.' }) +
      section(`
      <div class="grid cols-3">
        <div class="card contact-card"><div class="card-icon" aria-hidden="true">💼</div><div><h3>LinkedIn</h3>${ext(LINKEDIN, 'linkedin.com/in/michael-wolfgang')}</div></div>
        <div class="card contact-card"><div class="card-icon" aria-hidden="true">💻</div><div><h3>GitHub</h3>${ext(GITHUB, 'github.com/mikewolfy')}</div></div>
        <div class="card contact-card"><div class="card-icon" aria-hidden="true">🏃</div><div><h3>Running profile</h3>${ext(ATHLINKS, 'Athlinks profile')}</div></div>
      </div>`),
  });

  add({
    path: 'links',
    title: 'Useful Links',
    description: 'Quick access to Michael Wolfgang’s professional profiles and personal projects.',
    body:
      pageHead({ eyebrow: 'Links', title: 'Useful links', lede: 'Quick access to my professional profiles and projects.' }) +
      section(`
      <div class="grid cols-2">
        <div class="card"><h2 class="card-title">Professional</h2><ul class="link-list">
          <li>${ext(LINKEDIN, 'LinkedIn Profile', 'ext')}</li>
          <li>${ext(GITHUB, 'GitHub Profile', 'ext')}</li>
          <li>${ext(CARMAX, 'CarMax', 'ext')}</li>
        </ul></div>
        <div class="card"><h2 class="card-title">Personal projects</h2><ul class="link-list">
          <li>${ext(PRUDENT, 'Prudent Heed — Investing Site', 'ext')}</li>
          <li>${ext(ATHLINKS, 'Running Profile (Athlinks)', 'ext')}</li>
        </ul></div>
      </div>`),
  });

  // ==========================================================================
  // Developer hub
  // ==========================================================================
  {
    const root = rootFor('developer');
    const u = (p) => hrefFor(root, p);
    const card = (icon, title, desc, path) =>
      `<a class="card card-link" href="${u(path)}"><div class="card-icon" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${desc}</p><span class="more">Open →</span></a>`;
    add({
      path: 'developer',
      title: 'Developer Hub',
      description: 'Developer resources from Michael Wolfgang: interview questions, podcasts, learning resources, JWT and RSA tools, and technical docs.',
      body:
        pageHead({ eyebrow: 'Developer', title: 'Developer hub', lede: 'Learning resources, practice questions, and handy tools from my day-to-day work in cloud and identity.' }) +
        section(`
        <h2>Learn &amp; practice</h2>
        <div class="grid cols-3" style="margin:1rem 0 2.5rem">
          ${card('❓', 'Interview Questions', 'Common C#, Azure and problem-solving interview questions with answers.', 'developer/interview-questions')}
          ${card('🎧', 'Podcasts', 'The podcasts I listen to during my commute and on runs.', 'developer/podcasts')}
          ${card('🔗', 'Resources', 'Helpful learning resources for Azure, .NET and software engineering.', 'developer/resources')}
        </div>
        <h2>Tools</h2>
        <div class="grid cols-3" style="margin:1rem 0 2.5rem">
          ${card('🪪', 'JWT Decoder', 'Decode and inspect JSON Web Tokens entirely in your browser.', 'developer/jwt-decoder')}
          ${card('✍️', 'RSA Signature Validator', 'Verify RSA-signed strings using a public key and the Web Crypto API.', 'developer/rsa-validator')}
        </div>
        <h2>Technical docs</h2>
        <div class="grid cols-3" style="margin:1rem 0 0">
          ${card('🔐', 'Scopes &amp; Claims', 'How OAuth 2.0 scopes and JWT claims work together to protect backend APIs.', 'tech-docs/scopes-and-claims')}
          ${card('🪙', 'CIAM Resources', 'Blogs, communities and learning paths for customer identity.', 'tech-docs/ciam-resources')}
        </div>`),
    });
  }

  // ==========================================================================
  // Interview questions
  // ==========================================================================
  {
    const root = rootFor('developer/interview-questions');
    const cs = [
      ['Can multiple catch blocks be executed?', "No, Multiple catch blocks of similar type can't be executed. Once the proper catch code executed, the control is transferred to the finally block, and then the code that follows the finally block gets executed."],
      ['Define Constructors', 'A constructor is a member function in a class that has the same name as its class. The constructor is automatically invoked whenever an object class is created. It constructs the values of data members while initializing the class.'],
      ['What are Jagged Arrays?', 'Arrays of arrays, which can have different sizes and dimensions.'],
      ['What is the difference between ref & out parameters?', 'An argument passed as ref must be initialized before passing to the method whereas out parameter needs not to be initialized before passing to a method.'],
      ["What is the use of 'using' statement in C#?", "The 'using' block is used to obtain a resource and process it and then automatically dispose of when the execution of the block completed."],
      ['What is serialization?', 'When we want to transport an object through a network, then we have to convert the object into a stream of bytes. The process of converting an object into a stream of bytes is called Serialization. For an object to be serializable, it should implement ISerialize Interface. De-serialization is the reverse process of creating an object from a stream of bytes.'],
      ["Can we use 'this' command within a static method?", "We can't use 'This' in a static method because we can only use static variables/methods in a static method."],
      ['What is the difference between constants and read-only?', "Constant variables are declared and initialized at compile time. The value can't be changed afterward. Read-only is used only when we want to assign the value at run time."],
      ['What are sealed classes in C#?', 'We create sealed classes when we want to restrict the class to be inherited. Sealed modifier used to prevent derivation from a class. If we forcefully specify a sealed class as base class, then a compile-time error occurs.'],
      ['What is method overloading?', 'Method overloading is creating multiple methods with the same name with unique signatures in the same class. When we compile, the compiler uses overload resolution to determine the specific method to be invoke.'],
    ];
    const az = [
      ['What are the different cloud deployment models?', 'Public, private, and hybrid.'],
      ['What are virtual machine scale sets in Azure?', ''],
    ];
    const ps = [
      ['How would you define and drive a CIAM target architecture across a large enterprise with multiple product teams and legacy identity stacks?', 'Start with business outcomes and risk posture, then define a reference architecture and capability roadmap. Use architecture decision records, platform standards, and phased migration patterns that let teams deliver incrementally while converging on shared CIAM services.'],
      ['Describe a time you had to build consensus across security, product, and engineering teams that had conflicting CIAM priorities.', 'I align stakeholders on measurable outcomes first, such as fraud reduction, conversion, and compliance timelines. Then I facilitate trade-off decisions with transparent options, documented risks, and clear ownership so disagreement turns into an executable plan.'],
      ['How do you balance customer experience and security in CIAM, especially around MFA, step-up authentication, and account recovery?', 'I use risk-based authentication and journey-level telemetry to apply stronger controls only when needed. The goal is to reduce friction for low-risk users while protecting high-risk events with adaptive controls and resilient recovery mechanisms.'],
      ['What is your approach to delivering value through other teams rather than building everything directly yourself?', 'I treat CIAM as a platform product: publish standards, reference implementations, and reusable integration patterns. I focus on enablement, governance, and KPIs so product teams can move faster with consistency instead of waiting on a central team bottleneck.'],
      ['How would you modernize identity in an organization where multiple business units own different customer directories and login experiences?', 'I begin with identity domain mapping and data governance, then establish federation and profile-linking strategies before full consolidation. I prioritize high-impact journeys first and use coexistence patterns to reduce migration risk while improving customer continuity.'],
      ['How do you measure whether a CIAM transformation is succeeding at enterprise scale?', 'I track a balanced scorecard: authentication success rate, latency, account takeover incidents, onboarding time for teams, and release frequency. Success means better security and reliability while business teams ship faster and customer conversion improves.'],
      ['When performance or reliability issues appear in identity flows, how do you lead the response across multiple teams?', 'I establish shared incident command, define clear service ownership boundaries, and drive root-cause analysis across identity, app, and infrastructure layers. Then I convert lessons learned into architectural guardrails, SLOs, and automated regression checks.'],
    ];
    const list = (qs) =>
      qs
        .map(
          ([q, a], i) => `<details class="qa"><summary><span class="num">${i + 1}</span><span>${esc(q)}</span></summary>
        <div class="answer${a ? '' : ' empty'}"><p>${a ? esc(a) : 'No answer written yet.'}</p></div></details>`
        )
        .join('\n');
    const panel = (id, qs) => `<div data-panel="${id}" role="tabpanel" aria-labelledby="tab-${id}"${id === 'csharp' ? '' : ' hidden'}>${list(qs)}</div>`;
    add({
      path: 'developer/interview-questions',
      title: 'Interview Questions',
      description: 'Practice common C#, Azure and CIAM problem-solving interview questions with concise answers.',
      scripts: ['interview.js'],
      body:
        pageHead({
          eyebrow: 'Developer',
          title: 'Interview questions',
          lede: 'Practice common interview questions across different categories. Tap a question to reveal the answer.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'Interview Questions' }],
        }) +
        section(`
        <div class="tabs" role="tablist" aria-label="Question category">
          <button class="tab" role="tab" id="tab-csharp" data-tab="csharp" aria-selected="true">C# <span class="muted">(${cs.length})</span></button>
          <button class="tab" role="tab" id="tab-azure" data-tab="azure" aria-selected="false">Azure <span class="muted">(${az.length})</span></button>
          <button class="tab" role="tab" id="tab-problem-solving" data-tab="problem-solving" aria-selected="false">Problem solving <span class="muted">(${ps.length})</span></button>
        </div>
        ${panel('csharp', cs)}
        ${panel('azure', az)}
        ${panel('problem-solving', ps)}
        <noscript><style>[data-panel][hidden]{display:block!important}</style></noscript>`),
    });
  }

  // ==========================================================================
  // Podcasts
  // ==========================================================================
  {
    const root = rootFor('developer/podcasts');
    const podcasts = [
      ['.NET Rocks', 'The internet audio talk show for .NET developers', 'dotnetrocks.jpg'],
      ['Hanselminutes', 'Fresh Air for Developers', 'hanselminutes.jpg'],
      ['Azure Friday', 'Learn about Microsoft Azure', 'azure-friday.jpg'],
      ['Azure Podcast', 'Discussions about Microsoft Azure', 'azurepodcast.jpg'],
      ['Darknet Diaries', 'True stories from the dark side of the Internet', 'darknet-diaries.jpg'],
      ['Lex Fridman Podcast', 'Conversations about AI, science, and technology', 'lexfridman.jpg'],
      ['Freakonomics Radio', 'Discover the hidden side of everything', 'freakenomics-radio-podcast.jpeg'],
      ['The Knowledge Project', 'Master the best of what other people have figured out', 'knowledge-project-podcast.png'],
      ['Marketplace', 'Make sense of today’s business and economy', 'marketplace-podcast.jpg'],
      ['Up First', 'NPR’s morning news podcast', 'upfirst.jpg'],
    ];
    add({
      path: 'developer/podcasts',
      title: 'Favorite Podcasts',
      description: 'The tech, security, business and news podcasts Michael Wolfgang listens to during his commute and runs.',
      body:
        pageHead({
          eyebrow: 'Developer',
          title: 'Favorite podcasts',
          lede: 'Podcasts I listen to during my commute and on runs.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'Podcasts' }],
        }) +
        section(`<div class="grid cols-3">${podcasts
          .map(
            ([n, d, img]) => `<article class="card podcast"><div class="img-wrap"><img src="${root}images/${img}" alt="${esc(n)}" width="400" height="190" loading="lazy"></div><div class="body"><h3>${esc(n)}</h3><p>${esc(d)}</p></div></article>`
          )
          .join('\n')}</div>`),
    });
  }

  // ==========================================================================
  // Resources
  // ==========================================================================
  {
    const root = rootFor('developer/resources');
    const groups = [
      ['Azure resources', [['Microsoft Azure Documentation', 'https://docs.microsoft.com/en-us/azure/'], ['Azure Blog', 'https://azure.microsoft.com/en-us/blog/'], ['Microsoft Learn', 'https://learn.microsoft.com/en-us/training/']]],
      ['.NET resources', [['.NET Documentation', 'https://docs.microsoft.com/en-us/dotnet/'], ['Learn .NET', 'https://dotnet.microsoft.com/en-us/learn'], ['.NET on GitHub', 'https://github.com/dotnet']]],
      ['Software engineering', [['Martin Fowler’s Blog', 'https://martinfowler.com/'], ['Stack Overflow', 'https://stackoverflow.com/'], ['GitHub', 'https://github.com/']]],
    ];
    add({
      path: 'developer/resources',
      title: 'Developer Resources',
      description: 'Essential learning resources for Azure, .NET and software engineering.',
      body:
        pageHead({
          eyebrow: 'Developer',
          title: 'Developer resources',
          lede: 'Essential learning resources for Azure, .NET, and software engineering.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'Resources' }],
        }) +
        section(`<div class="grid cols-3">${groups
          .map(([t, items]) => `<div class="card"><h2 class="card-title">${t}</h2><ul class="link-list">${items.map(([l, h]) => `<li>${ext(h, l, 'ext')}</li>`).join('')}</ul></div>`)
          .join('')}</div>`),
    });
  }

  // ==========================================================================
  // CIAM resources
  // ==========================================================================
  {
    const root = rootFor('tech-docs/ciam-resources');
    const groups = [
      ['Blogs and industry updates', [
        ['Microsoft Entra Blog', 'https://techcommunity.microsoft.com/t5/microsoft-entra-blog/bg-p/Identity', 'Official updates on identity security, governance, and new Entra capabilities.'],
        ['Okta Developer and Product Blog', 'https://www.okta.com/blog/', 'CIAM patterns, passkeys, lifecycle practices, and product announcements.'],
        ['Ping Identity Blog', 'https://www.pingidentity.com/en/resources/blog.html', 'Architectural guidance, Zero Trust topics, and CIAM strategy perspectives.'],
        ['Auth0 Blog', 'https://auth0.com/blog/', 'Developer-focused articles on OAuth, OIDC, and secure customer identity design.'],
      ]],
      ['Practitioner communities and standards', [
        ['IDPro', 'https://idpro.org/', 'Professional association for IAM practitioners with community discussions and practical guidance.'],
        ['OpenID Foundation', 'https://openid.net/', 'Specifications and working groups for OIDC, shared signals, and identity interoperability.'],
        ['IETF OAuth Working Group', 'https://www.ietf.org/', 'Current and emerging RFCs relevant to OAuth 2.1, token security, and modern auth flows.'],
        ['FIDO Alliance', 'https://fidoalliance.org/', 'Passkey and phishing-resistant authentication standards and adoption resources.'],
      ]],
      ['Training and skill development', [
        ['Microsoft Learn: Entra Training', 'https://learn.microsoft.com/en-us/training/browse/?products=entra', 'Role-based learning paths and hands-on modules across identity and access scenarios.'],
        ['IDPro CIDPRO Certification', 'https://idpro.org/cidpro/', 'Vendor-neutral credential focused on modern IAM and CIAM practitioner competencies.'],
        ['SANS Security Courses', 'https://www.sans.org/cyber-security-courses/', 'Deep security engineering content helpful for strengthening identity threat defenses.'],
        ['Pluralsight: Identity and Security Courses', 'https://www.pluralsight.com/browse/software-development/software-security', 'Practical courses for engineering teams building secure authentication and authorization flows.'],
      ]],
    ];
    add({
      path: 'tech-docs/ciam-resources',
      title: 'CIAM Technical Resources',
      description: 'Blogs, practitioner communities and learning paths to stay current on customer identity and access management (CIAM).',
      body:
        pageHead({
          eyebrow: 'Technical docs',
          title: 'CIAM technical resources',
          lede: 'Blogs, practitioner communities, and learning paths to stay current on customer identity trends.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'CIAM Resources' }],
        }) +
        section(`<div class="stack" style="max-width:860px">${groups
          .map(([t, items]) => `<div class="card"><h2 class="card-title">${t}</h2><ul class="link-list">${items.map(([l, h, d]) => `<li>${ext(h, l, 'ext')}<p>${d}</p></li>`).join('')}</ul></div>`)
          .join('')}</div>`),
    });
  }

  // ==========================================================================
  // Scopes & Claims (long-form doc)
  // ==========================================================================
  {
    const root = rootFor('tech-docs/scopes-and-claims');
    add({
      path: 'tech-docs/scopes-and-claims',
      title: 'Securing APIs with Scopes & Claims',
      description: 'A practical guide to how OAuth 2.0 scopes and JWT claims work together to protect backend APIs: authorization flows, token validation and enforcement patterns.',
      body:
        pageHead({
          eyebrow: 'Technical docs',
          title: 'Securing APIs with scopes & claims',
          lede: 'A practical guide to how OAuth 2.0 scopes and JWT claims work together to protect backend APIs — covering authorization flows, token validation, and enforcement patterns.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'Scopes & Claims' }],
        }) + section(`<div style="max-width:880px">${readContent('scopes-and-claims.html')}
        <p class="muted small">Tip: paste a token into the <a href="${hrefFor(root, 'developer/jwt-decoder')}">JWT Decoder</a> to inspect the claims described above.</p></div>`),
    });
  }

  // ==========================================================================
  // JWT decoder
  // ==========================================================================
  {
    const root = rootFor('developer/jwt-decoder');
    add({
      path: 'developer/jwt-decoder',
      title: 'JWT Decoder',
      description: 'Decode and inspect JSON Web Tokens (JWT) locally in your browser. Nothing is sent to a server.',
      scripts: ['jwt.js'],
      body:
        pageHead({
          eyebrow: 'Developer tool',
          title: 'JWT decoder',
          lede: 'Decode and inspect JSON Web Tokens. Everything happens locally in your browser — the token is never sent anywhere.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'JWT Decoder' }],
        }) +
        section(`
      <div class="stack">
        <div class="card">
          <label for="jwt-input">Paste your JWT here</label>
          <textarea id="jwt-input" rows="6" spellcheck="false" autocomplete="off" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"></textarea>
          <div class="btn-row" style="margin-top:.8rem">
            <button class="btn btn-ghost btn-sm" type="button" id="jwt-sample">Load sample token</button>
            <button class="btn btn-ghost btn-sm" type="button" id="jwt-clear" hidden>Clear</button>
          </div>
        </div>
        <div id="jwt-output" aria-live="polite"></div>
        <div class="card prose">
          <h2 class="card-title">About JWT tokens</h2>
          <p>A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.</p>
          <p><strong>Structure:</strong> A JWT consists of three parts separated by dots (.):</p>
          <ul>
            <li><strong>Header:</strong> Contains the token type (JWT) and signing algorithm</li>
            <li><strong>Payload:</strong> Contains the claims (statements about an entity and additional data)</li>
            <li><strong>Signature:</strong> Used to verify the sender and ensure the message wasn’t changed</li>
          </ul>
          <p><strong>Security note:</strong> This decoder only decodes the JWT locally in your browser. The token is never sent to any server. However, be cautious about pasting sensitive tokens into any online tool. For a deeper look at how claims are used, read <a href="${hrefFor(root, 'tech-docs/scopes-and-claims')}">Scopes &amp; Claims</a>.</p>
        </div>
      </div>`),
    });
  }

  // ==========================================================================
  // RSA validator
  // ==========================================================================
  {
    const root = rootFor('developer/rsa-validator');
    add({
      path: 'developer/rsa-validator',
      title: 'RSA Signature Validator',
      description: 'Verify RSA-signed strings with a PEM public key, entirely in your browser using the Web Crypto API.',
      scripts: ['rsa.js'],
      body:
        pageHead({
          eyebrow: 'Developer tool',
          title: 'RSA signature validator',
          lede: 'Verify RSA-signed strings using a public key. Verification runs locally with the Web Crypto API — your data and keys never leave your device.',
          crumbs: [{ label: 'Developer', href: hrefFor(root, 'developer') }, { label: 'RSA Validator' }],
        }) +
        section(`
      <div class="stack">
        <div class="card">
          <div class="field" style="max-width:260px"><label for="algorithm">Hash algorithm</label>
            <select id="algorithm"><option value="SHA-256">SHA-256</option><option value="SHA-384">SHA-384</option><option value="SHA-512">SHA-512</option><option value="SHA-1">SHA-1 (deprecated)</option></select></div>
          <div class="field"><label for="original-data">Original data</label><textarea id="original-data" rows="4" placeholder="Enter the original message that was signed…"></textarea></div>
          <div class="field"><label for="signature">Signature (Base64)</label><textarea id="signature" rows="4" placeholder="Enter the base64 encoded signature…"></textarea></div>
          <div class="field"><label for="public-key">Public key (PEM format)</label><textarea id="public-key" rows="8" placeholder="-----BEGIN PUBLIC KEY-----&#10;Your public key here…&#10;-----END PUBLIC KEY-----"></textarea></div>
          <div class="btn-row">
            <button class="btn" type="button" id="verify">Verify signature</button>
            <button class="btn btn-ghost" type="button" id="example">Generate working example</button>
            <button class="btn btn-ghost" type="button" id="clear">Clear all</button>
          </div>
          <div id="rsa-result" aria-live="polite"></div>
        </div>

        <div class="card prose">
          <h2 class="card-title">About RSA signature verification</h2>
          <p>RSA signature verification is a cryptographic process that confirms the authenticity and integrity of a message using asymmetric cryptography.</p>
          <div class="info-grid">
            <div><h3>How it works</h3><ul>
              <li><strong>Signing:</strong> The sender uses their private key to create a digital signature of the data</li>
              <li><strong>Verification:</strong> Anyone can use the sender’s public key to verify the signature</li>
              <li><strong>Algorithm:</strong> Uses RSASSA-PKCS1-v1_5 with various hash functions (SHA-256, SHA-384, SHA-512)</li></ul></div>
            <div><h3>Input requirements</h3><ul>
              <li><strong>Original data:</strong> The exact message that was signed (must match exactly)</li>
              <li><strong>Signature:</strong> Base64 encoded signature string</li>
              <li><strong>Public key:</strong> PEM format public key</li></ul></div>
            <div><h3>Common use cases</h3><ul>
              <li>Verifying API responses and webhooks</li>
              <li>Authenticating software updates and downloads</li>
              <li>Validating document signatures</li>
              <li>Ensuring message integrity in secure communications</li></ul></div>
          </div>
          <p><strong>Tip:</strong> The original data must match exactly (including whitespace, line breaks, etc.) for the signature verification to succeed.</p>
        </div>

        <div class="card">
          <h2 class="card-title">Example public key format</h2>
          <pre class="out">-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
mwIDAQAB
-----END PUBLIC KEY-----</pre>
        </div>
      </div>`),
    });
  }

  // ==========================================================================
  // Quizzes
  // ==========================================================================
  {
    const mb = readJson('myers-briggs.json');
    add({
      path: 'myers-briggs',
      title: 'Myers-Briggs Personality Test',
      description: 'Discover your Myers-Briggs personality type in 32 questions, with strengths, career paths and a guide to all 16 types.',
      scripts: ['quiz.js', 'myers-briggs.js'],
      body:
        pageHead({ eyebrow: 'Quiz', title: 'Myers-Briggs personality test', lede: 'Discover your personality type in 32 questions. Your answers stay in this browser — nothing is uploaded.' }) +
        section(`<div id="quiz"><noscript><div class="notice error">This quiz needs JavaScript enabled.</div></noscript></div>
        <script type="application/json" id="quiz-data">${jsonForScript(mb)}</script>`),
    });

    const ll = readJson('love-languages.json');
    add({
      path: 'love-languages',
      title: 'The 5 Love Languages Test',
      description: 'Discover how you prefer to give and receive love with a 30-question love languages quiz.',
      scripts: ['quiz.js', 'love-languages.js'],
      body:
        pageHead({ eyebrow: 'Quiz', title: 'The 5 love languages test', lede: 'Discover how you prefer to give and receive love. Your answers stay in this browser — nothing is uploaded.' }) +
        section(`<div id="quiz"><noscript><div class="notice error">This quiz needs JavaScript enabled.</div></noscript></div>
        <script type="application/json" id="quiz-data">${jsonForScript(ll)}</script>`),
    });
  }

  // ==========================================================================
  // Life timers & pace calculator
  // ==========================================================================
  add({
    path: 'life-timers',
    title: 'Life Timers',
    description: 'Live countdowns to the end of the year, your retirement date and an assumed life expectancy.',
    scripts: ['timers.js'],
    body:
      pageHead({ eyebrow: 'Tool', title: 'Life timers', lede: 'Live countdowns to the end of the year, your retirement, and the end of an assumed lifespan. A little perspective on the time we have.' }) +
      section(`
      <div class="stack">
        <div class="card">
          <div class="form-row" style="max-width:560px">
            <div><label for="dob">Date of birth</label><input id="dob" type="date"></div>
            <div><label for="retirement-age">Retirement age</label><input id="retirement-age" type="number" min="1" max="120" value="67"></div>
          </div>
          <p class="muted small" style="margin:1rem 0 0">Your values are saved only in this browser so they persist between visits. The end-of-life timer assumes a life expectancy of 85 years.</p>
        </div>
        <div id="timers" class="stack"></div>
      </div>`),
  });

  add({
    path: 'pace-calculator',
    title: 'Running Pace Calculator',
    description: 'Enter a target finish time for a 5K, 10K, half marathon or marathon to see the pace per mile or kilometre you need to hold.',
    scripts: ['pace.js'],
    body:
      pageHead({ eyebrow: 'Tool', title: 'Running pace calculator', lede: 'Enter a target finish time for a race distance to see the pace per mile you need to hold.' }) +
      section(`<div id="pace-grid" class="grid cols-2"></div>
      <div class="center" style="margin-top:1.5rem"><button id="pace-clear" class="btn btn-ghost" type="button" hidden>Clear all</button></div>
      <noscript><div class="notice error">This calculator needs JavaScript enabled.</div></noscript>`),
  });

  // ==========================================================================
  // Spell Press (game embed)
  // ==========================================================================
  {
    const root = rootFor('games/spellpress');
    add({
      path: 'games/spellpress',
      title: 'Spell Press',
      description: 'Spell Press: six letters, four words, beat the clock. A quick spelling game.',
      body:
        pageHead({
          eyebrow: 'Game',
          title: 'Spell Press',
          lede: 'Six letters, four words, beat the clock. A quick spelling game I built — your best score is saved in this browser.',
        }) +
        section(`<div style="max-width:700px;margin:0 auto"><div class="embed"><iframe src="${root}games/spellpress.html" title="Spell Press game"></iframe></div>
        <p class="muted small center" style="margin-top:1rem"><a href="${root}games/spellpress.html">Open the game full screen</a></p></div>`),
    });
  }

  // ==========================================================================
  // Book list
  // ==========================================================================
  {
    const root = rootFor('booklist');
    const { books, recommendationLists } = readJson('books.json');
    const cats = [...new Set(books.map((b) => b.category))];
    const catClass = (c) => `cat-${c.replace(/[^A-Za-z-]/g, '')}`;
    add({
      path: 'booklist',
      title: 'Book List',
      description: 'Books Michael Wolfgang has read or listened to, with categories, ratings, notes and summaries.',
      scripts: ['books.js'],
      body:
        pageHead({ eyebrow: 'Reading', title: 'Book list', lede: 'Books I’ve read or listened to, along with notes and summaries.' }) +
        section(`
      <div class="card" style="margin-bottom:2rem"><h2 class="card-title">Book discovery lists</h2>
        <ul class="link-list">${recommendationLists.map((r) => `<li>${ext(r.url, esc(r.label), 'ext')}</li>`).join('')}</ul></div>

      <div class="chip-row" role="group" aria-label="Filter by category" style="margin-bottom:.8rem">
        <button class="chip" type="button" data-cat="" aria-pressed="true">All (${books.length})</button>
        ${cats.map((c) => `<button class="chip ${catClass(c)}" type="button" data-cat="${esc(c)}" aria-pressed="false">${esc(c)} (${books.filter((b) => b.category === c).length})</button>`).join('\n        ')}
      </div>
      <p class="result-count" id="book-count" aria-live="polite"></p>

      <div class="grid cols-2">
        ${books
          .map((b) => {
            const meta = [b.author + (b.format ? ` (${b.format})` : ''), b.date].filter(Boolean).map(esc).join(' • ');
            return `<article class="card book" data-cat="${esc(b.category)}">
          <div class="book-cover"><img src="${/^https?:/.test(b.imageUrl) ? b.imageUrl : root + b.imageUrl}" alt="${esc(b.title)}" width="240" height="336" loading="lazy" referrerpolicy="no-referrer"></div>
          <div>
            <h3>${esc(b.title)}</h3>
            <div class="tags"><span class="chip ${catClass(b.category)}">${esc(b.category)}</span>${b.status ? `<span class="chip status">${esc(b.status)}</span>` : ''}${b.rating != null ? `<span class="chip rating">★ ${b.rating}/10</span>` : ''}</div>
            <p class="meta">${meta}</p>
            <p class="notes">${esc(b.notes || '')}</p>
            ${b.summaryUrl ? ext(b.summaryUrl, 'Book summary ↗', 'small') : ''}
          </div>
        </article>`;
          })
          .join('\n        ')}
      </div>`),
    });
  }

  // ==========================================================================
  // Quotes
  // ==========================================================================
  {
    const quotes = readJson('quotes.json');
    const authors = [...new Set(quotes.map((q) => q.author))].sort((a, b) => a.localeCompare(b));
    const tags = [...new Set(quotes.flatMap((q) => q.tags))].sort((a, b) => a.localeCompare(b));
    add({
      path: 'quotes',
      title: 'Quotes',
      description: 'A searchable collection of quotes on leadership, decision making, execution and more.',
      scripts: ['quotes.js'],
      body:
        pageHead({
          eyebrow: 'Reading',
          title: 'Quotes',
          lede: `A collection of quotes sourced from ${ext('https://quotes.emptywolf.com', 'quotes.emptywolf.com')}. Search, sort, or filter by author and tag.`,
        }) +
        section(`
      <div class="toolbar" role="search">
        <div><label for="q">Search</label><input id="q" type="search" placeholder="Search quotes, authors, tags…" autocomplete="off"></div>
        <div><label for="author">Author</label><select id="author"><option value="">All authors</option>${authors.map((a) => `<option>${esc(a)}</option>`).join('')}</select></div>
        <div><label for="tag">Tag</label><select id="tag"><option value="">All tags</option>${tags.map((t) => `<option>${esc(t)}</option>`).join('')}</select></div>
        <div><label for="sort">Sort by</label><select id="sort"><option value="author-asc">Author (A–Z)</option><option value="author-desc">Author (Z–A)</option><option value="quote-asc">Quote (A–Z)</option><option value="quote-desc">Quote (Z–A)</option></select></div>
      </div>
      <p class="result-count"><span id="count" aria-live="polite"></span><button class="btn btn-ghost btn-sm" type="button" id="reset" hidden>Clear filters</button></p>
      <div id="quote-list">
      ${quotes
        .map(
          (q) => `<article class="quote" data-author="${esc(q.author)}" data-quote="${esc(q.quote)}" data-tags="${esc(q.tags.join('|'))}" data-search="${esc((q.author + ' ' + q.quote + ' ' + q.tags.join(' ')).toLowerCase())}">
        <blockquote>“${esc(q.quote)}”</blockquote>
        <div class="quote-meta"><button class="quote-author" type="button" data-pick-author="${esc(q.author)}" title="Show only quotes by ${esc(q.author)}">— ${esc(q.author)}</button>
        ${q.tags.map((t) => `<button class="chip" type="button" data-pick-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      </article>`
        )
        .join('\n')}
      </div>
      <div id="empty" class="empty-state" hidden>No quotes match the selected filters.</div>`),
    });
  }

  // ==========================================================================
  // Family pages
  // ==========================================================================
  add({
    path: 'reed',
    title: 'Reed Wolfgang',
    description: 'Reed Wolfgang’s page.',
    body:
      pageHead({ eyebrow: 'Family', title: 'Reed Wolfgang' }) +
      section(`<div class="card center" style="max-width:640px;margin:0 auto"><img class="portrait" src="../images/reed.jpg" alt="Reed Wolfgang" width="220" height="220"><p>Welcome to Reed’s page!</p></div>`),
  });
  add({
    path: 'emma',
    title: 'Emma Wolfgang',
    description: 'Emma Wolfgang’s page.',
    body: pageHead({ eyebrow: 'Family', title: 'Emma Wolfgang' }) + section(`<div class="card center" style="max-width:640px;margin:0 auto"><p>Welcome to Emma’s page!</p></div>`),
  });
  add({
    path: 'mom-dad',
    title: 'Tim and Mary Ann — Still in Love',
    description: 'Celebrating Tim and Mary Ann Wolfgang.',
    body:
      pageHead({ eyebrow: 'Family', title: 'Tim and Mary Ann — still in love' }) +
      section(`<div class="card center" style="max-width:640px;margin:0 auto"><img class="photo" src="../images/mom-dad-wedding-resized.JPG" alt="Tim and Mary Ann" width="460" height="345"><p>Celebrating Tim and Mary Ann Wolfgang!</p></div>`),
  });

  return pages;
}
