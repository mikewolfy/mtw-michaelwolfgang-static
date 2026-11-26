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
    const feature = ({ img, alt, title, body, photo = false }) => `
      <article class="feature">
        <div class="feature-art${photo ? ' photo-art' : ''}"><img src="images/${img}" alt="${esc(alt)}" width="400" height="400" loading="lazy"></div>
        <div><h2>${title}</h2>${body}</div>
      </article>`;

    const explore = [
      ['📚', 'Book list', 'What I’ve been reading and listening to, with notes and ratings.', 'booklist'],
      ['💬', 'Quotes', 'A searchable collection of quotes I keep coming back to.', 'quotes'],
      ['🏃', 'Pace calculator', 'Work out the pace you need for your next 5K to marathon.', 'pace-calculator'],
      ['⏳', 'Life timers', 'A little perspective: countdowns to year-end, retirement and beyond.', 'life-timers'],
      ['🧠', 'Personality tests', 'Myers-Briggs and the 5 Love Languages — free and private.', 'myers-briggs'],
      ['🔤', 'Spell Press', 'Six letters, four words, beat the clock. A quick game I built.', 'games/spellpress'],
    ];

    add({
      path: '',
      title: 'Home',
      description:
        'The personal site of Michael Wolfgang — husband and dad, marathon runner, Tae Kwon Do black belt, reader, investor and software architect.',
      body: `
<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">Husband · Dad · Runner · Reader</p>
      <h1>Hi, I’m Michael.</h1>
      <p class="lede">Welcome to my little corner of the web. I’m a husband and dad, a marathon runner, a Tae Kwon Do black belt (right alongside my kids), an avid reader and a big believer in getting a little better every day. By day I’m a software architect at ${ext(CARMAX, 'CarMax')}, helping teams build secure, scalable solutions.</p>
      <div class="hero-actions">
        <a class="btn btn-light" href="${u('about')}">More about me</a>
        <a class="btn btn-outline-light" href="${u('booklist')}">What I’m reading</a>
        <a class="btn btn-outline-light" href="${u('contact')}">Say hello</a>
      </div>
      <div class="hero-stats" aria-label="Highlights">
        <div><strong>20</strong><span>Marathons run</span></div>
        <div><strong>17+</strong><span>Half marathons</span></div>
        <div><strong>3:12</strong><span>Boston-qualifying time</span></div>
        <div><strong>Black belt</strong><span>Tae Kwon Do, as a family</span></div>
      </div>
    </div>
    <div class="hero-art"><img src="images/runner-icon.svg" alt="Runner illustration" width="400" height="400"></div>
  </div>
</section>

<div class="wrap section stack">
  ${feature({
    img: 'family-heart.svg',
    alt: 'Heart illustration',
    title: 'Family first',
    body: `<p>My best days are spent with my beautiful wife and wonderful kids — running outdoors, training together, and enjoying a good movie or book.</p>`,
  })}
  ${feature({
    img: 'runner-icon.svg',
    alt: 'Runner illustration',
    title: 'Runner',
    body: `<p>I’m an avid runner, and running has given me some of my favorite memories — including meeting my wife. I have:</p>
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
      <ul class="links">
        <li>${ext(ATHLINKS, 'All my races on Athlinks ↗')}</li>
        <li><a href="${u('pace-calculator')}">Pace calculator →</a></li>
      </ul>`,
  })}
  ${feature({
    img: 'tae-kwon-do-belt.svg',
    alt: 'Tae Kwon Do belt illustration',
    title: 'Tae Kwon Do, as a family',
    body: `<p>Tae Kwon Do has been one of our family’s longest-running commitments. My kids and I have trained together for years, and every one of us has earned a black belt along the way.</p>
      <p>Getting there wasn’t quick or easy — it took years of consistent practice, showing up on the hard days, and pushing through plateaus together. That shared effort is what made it worthwhile: we didn’t just get a belt, we built a habit of discipline and perseverance as a family, and we keep training together to this day.</p>`,
  })}
  ${feature({
    img: 'reading-library.jpg',
    photo: true,
    alt: 'Library bookshelves under arched windows',
    title: 'Reader and lifelong learner',
    body: `<p>I’m a big believer in constant improvement. Learning is a habit that pays exponential dividends over time. The older I get, the less free time I seem to have, so I’m always curating the books, podcasts and articles that make the most of it — from leadership and psychology to a good Jack Reacher or Thursday Murder Club story.</p>
      <ul class="links">
        <li><a href="${u('booklist')}">My book list →</a></li>
        <li><a href="${u('quotes')}">Favorite quotes →</a></li>
        <li><a href="${u('developer/podcasts')}">Podcasts I listen to →</a></li>
      </ul>`,
  })}
  ${feature({
    img: 'investing-charts.jpg',
    photo: true,
    alt: 'Financial charts on a trading screen',
    title: 'Personal finance and investing',
    body: `<p>Personal finance is an important part of any adult’s life, especially for those of us with kids and families depending on us. The basics are pretty simple, but not very well understood — we spend more time researching our next TV than our investment options.</p>
      <h3>3 major keys to individual investing success</h3>
      <ol><li>Minimize costs (taxes and fees)</li><li>Minimize risk through diversification</li><li>Eliminate emotion by automating investing and rebalancing</li></ol>
      <p>I share more on my little investing site: ${ext(PRUDENT, 'prudentheed.com ↗')}</p>`,
  })}
  ${feature({
    img: 'cloud-datacenter.jpg',
    photo: true,
    alt: 'Aerial view of a cloud data center',
    title: 'What I do for work',
    body: `<p>Professionally, I’m an experienced software architect at ${ext(CARMAX, 'CarMax')}. I partner with teams across a Fortune 200 technology organization to design scalable solutions that keep our customers secure while delivering exceptional experiences. Part of the fun is that there’s always room to keep improving and learning (like life).</p>
      <ul class="links">
        <li><a href="${u('developer')}">Work &amp; tech corner →</a></li>
        <li>${ext(LINKEDIN, 'LinkedIn ↗')}</li>
      </ul>`,
  })}
</div>

<div class="wrap section tight" style="padding-top:0">
  <h2>Just for fun</h2>
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
    description: 'About Michael Wolfgang — husband and father, marathon runner, Tae Kwon Do black belt, reader and software architect.',
    body:
      pageHead({ eyebrow: 'About', title: 'About me', lede: 'Husband, dad, runner, reader, and lifelong learner.' }) +
      section(`
      <div class="stack" style="max-width:860px">
        <div class="card">
          <div>
            <h2 class="card-title">Hi, I’m Michael</h2>
            <p>I’m a husband and father, a Tae Kwon Do black belt and an avid runner. My best days are spent with my beautiful wife and wonderful kids, running outdoors, and enjoying a good movie or book.</p>
            <p>I regularly listen to podcasts, read books, and try to stay curious about self improvement, personal finance and whatever I’m learning next.</p>
          </div>
        </div>
        <div class="card">
          <h2 class="card-title">Tae Kwon Do, as a family</h2>
          <p>Tae Kwon Do has been one of our family’s longest-running commitments. My kids and I have trained together for years, and every one of us has earned a black belt along the way.</p>
          <p>Getting there wasn’t quick or easy — it took years of consistent practice, showing up on the hard days, and pushing through plateaus together. That shared effort is what made it worthwhile: we didn’t just get a belt, we built a habit of discipline and perseverance as a family, and we keep training together to this day.</p>
        </div>
        <div class="card">
          <h2 class="card-title">Running</h2>
          <p>Twenty marathons, more than seventeen half marathons, a Boston qualifier, a thunderstorm run to the top of Pikes Peak — and I met my wife through running. You can find all of my races on ${ext(ATHLINKS, 'Athlinks')}.</p>
        </div>
        <div class="card">
          <h2 class="card-title">Work</h2>
          <p>By day I’m an experienced software architect at ${ext(CARMAX, 'CarMax')}, working with teams across a Fortune 200 technology organization to build scalable solutions that keep our customers secure while delivering exceptional experiences. If that’s your thing too, take a look at my <a href="../developer/">work &amp; tech corner</a>.</p>
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
      title: 'Work & Tech',
      description: 'Developer resources from Michael Wolfgang: interview questions, podcasts, learning resources, JWT and RSA tools, and technical docs.',
      body:
        pageHead({ eyebrow: 'Work & Tech', title: 'Work & tech corner', lede: 'Software is how I spend my workdays. Here are the learning resources, practice questions, and handy tools from my work in cloud and identity.' }) +
        section(`
        <h2>Learn &amp; practice</h2>
        <div class="grid cols-3" style="margin:1rem 0 2.5rem">
          ${card('❓', 'Interview Questions', 'Solution architect interview questions on CIAM, Azure, AI, teamwork and delivery.', 'developer/interview-questions')}
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
    const ps = [
      ['How would you define and drive a CIAM target architecture across a large enterprise with multiple product teams and legacy identity stacks?', 'Start with business outcomes and risk posture, then define a reference architecture and capability roadmap. Use architecture decision records, platform standards, and phased migration patterns that let teams deliver incrementally while converging on shared CIAM services.'],
      ['Describe a time you had to build consensus across security, product, and engineering teams that had conflicting CIAM priorities.', 'I align stakeholders on measurable outcomes first, such as fraud reduction, conversion, and compliance timelines. Then I facilitate trade-off decisions with transparent options, documented risks, and clear ownership so disagreement turns into an executable plan.'],
      ['How do you balance customer experience and security in CIAM, especially around MFA, step-up authentication, and account recovery?', 'I use risk-based authentication and journey-level telemetry to apply stronger controls only when needed. The goal is to reduce friction for low-risk users while protecting high-risk events with adaptive controls and resilient recovery mechanisms.'],
      ['What is your approach to delivering value through other teams rather than building everything directly yourself?', 'I treat CIAM as a platform product: publish standards, reference implementations, and reusable integration patterns. I focus on enablement, governance, and KPIs so product teams can move faster with consistency instead of waiting on a central team bottleneck.'],
      ['How would you modernize identity in an organization where multiple business units own different customer directories and login experiences?', 'I begin with identity domain mapping and data governance, then establish federation and profile-linking strategies before full consolidation. I prioritize high-impact journeys first and use coexistence patterns to reduce migration risk while improving customer continuity.'],
      ['How do you measure whether a CIAM transformation is succeeding at enterprise scale?', 'I track a balanced scorecard: authentication success rate, latency, account takeover incidents, onboarding time for teams, and release frequency. Success means better security and reliability while business teams ship faster and customer conversion improves.'],
      ['When performance or reliability issues appear in identity flows, how do you lead the response across multiple teams?', 'I establish shared incident command, define clear service ownership boundaries, and drive root-cause analysis across identity, app, and infrastructure layers. Then I convert lessons learned into architectural guardrails, SLOs, and automated regression checks.'],
    ];
    const N = {
      ciam: [
        ['How do you decide whether to buy, build, or extend a CIAM platform such as Microsoft Entra External ID, Okta, Auth0, or Ping?', 'I start with capabilities and constraints rather than vendors: journeys to support, scale, regulatory needs, integration with legacy systems, and the cost of ownership over several years. I score the options against weighted criteria with the business and security teams, run a time-boxed proof of concept on the hardest journeys, and document the decision, the trade-offs, and the exit strategy in an architecture decision record.'],
        ['How do you design authentication for customer-facing web, mobile, and API workloads using OpenID Connect and OAuth 2.0?', 'Use the authorization code flow with PKCE for apps, short-lived access tokens scoped to specific APIs, and refresh tokens only where the client can protect them. Keep authentication (who the user is, via the ID token) separate from authorization (what a client may do, via scopes and claims), and validate issuer, audience, and signature at every API. My <a href="../../tech-docs/scopes-and-claims/">scopes & claims guide</a> walks through the model.', true],
        ps[0],
        ps[2],
        ['How do you approach account recovery and passkey or passwordless adoption without increasing account takeover risk?', 'Recovery is usually the weakest link, so I design it with the same rigor as sign-in: verify through multiple signals, add friction and notifications for high-risk changes, and avoid knowledge-based fallbacks where possible. I introduce passkeys as an opt-in, low-friction upgrade first, measure completion and support-call rates, and retire weaker factors as adoption grows.'],
        ps[4],
        ['How do you handle consent, privacy, and customer data in an identity platform?', 'I treat the identity platform as a system of record for a small, well-governed set of attributes: collect only what the journey needs, store consent with a timestamp and purpose, and make export and deletion requests automatable. I partner with legal and privacy early so regulations such as GDPR and CCPA shape the data model and retention rules instead of being retrofitted.'],
      ],
      azure: [
        ['Walk me through designing a highly available, multi-region API on Azure.', 'I start from the recovery objectives (RTO and RPO) and the availability the business actually needs. Then I use Azure Front Door or Traffic Manager for global routing, zone-redundant compute (App Service, Container Apps, or AKS) in two regions, and API Management as the front door. Data uses geo-replication (for example Cosmos DB multi-region writes or SQL failover groups). Health probes, automated failover, and regular failure drills prove it works.'],
        ['How do you secure workloads on Azure by default?', 'Layered controls: managed identities instead of stored credentials, secrets and keys in Key Vault, private endpoints and network segmentation, least-privilege RBAC, and Azure Policy to enforce the baseline everywhere. Defender for Cloud and logging to a central workspace give continuous assessment, and the controls are packaged in templates so teams get them without extra effort.'],
        ['How do you choose between App Service, Azure Functions, Container Apps, and AKS?', 'I match the platform to the team and the workload. App Service or Functions for straightforward APIs and event-driven work, Container Apps when teams need containers without cluster operations, and AKS only when we need its control and have the skills to run it. I weigh operational burden, scaling pattern, cost, and portability, and prefer the simplest option that meets the requirements.'],
        ['How do you build resilient integrations between services and with legacy systems?', 'Prefer asynchronous messaging (Service Bus, Event Grid) where it fits, and design consumers to be idempotent. Apply timeouts, retries with backoff, circuit breakers, and dead-letter queues, and put an anti-corruption layer between new services and legacy models. I confirm the behavior with failure testing rather than assuming it.'],
        ['How do you provide observability for distributed identity and API flows?', 'Standardize on correlation IDs and structured logs flowing to Application Insights and Log Analytics, define SLIs and SLOs for key journeys such as sign-in success and latency, and build Workbooks and alerts around them. In past work, bringing identity logs into shared dashboards let teams see authentication health end to end.'],
        ['How do you keep cloud cost and governance under control across many teams?', 'Provide landing zones with guardrails (policy, tagging, budgets, and alerts) so teams move fast inside safe boundaries. I review architectures against the Azure Well-Architected Framework, make cost a visible design quality alongside reliability and security, and revisit sizing with real usage data.'],
      ],
      ai: [
        ['Where does AI add real value in an enterprise or CIAM setting, and where would you be cautious?', 'It adds value in fraud and risk signals, support and knowledge assistance, document and data processing, and developer productivity. I am cautious about letting a probabilistic model be the sole decision-maker for security-critical actions such as granting access. In those cases AI informs a decision that deterministic controls and humans still own.'],
        ['How would you architect a secure retrieval-augmented generation (RAG) solution on Azure?', 'Azure OpenAI or Foundry models behind private networking, Azure AI Search for retrieval, and managed identities for service-to-service access. The key design point is security trimming: retrieval must respect the signed-in user\'s permissions so the model never sees data the user could not access directly. Add content filtering, logging, and an evaluation set to track quality.'],
        ['How do you manage risks such as prompt injection, data leakage, and hallucination?', 'Treat model input and output as untrusted: validate and constrain outputs, separate instructions from data, limit what tools and data the model can reach, and use content safety filters. For high-impact actions require human approval, and test with adversarial red-team prompts before release.'],
        ['How should identity and access work for AI agents that call tools and APIs?', 'Give agents their own identities with least-privilege, narrowly scoped, short-lived credentials, and use delegated (on-behalf-of) flows so actions run with the user\'s rights rather than a broad service account. Audit every tool call, and require step-up approval for sensitive operations.'],
        ['How do you evaluate and monitor an AI feature in production?', 'Build an evaluation set from real scenarios before launch and track quality, safety, latency, and cost afterward. Collect user feedback, watch for drift when models or data change, and gate model or prompt changes behind the same testing and rollout discipline as code.'],
        ['How do you align leaders and teams on AI adoption without chasing hype?', 'Start with a specific business problem and a measurable outcome, run a small pilot with clear success criteria, and establish lightweight governance for responsible use, data handling, and review. Sharing results openly, including what did not work, builds trust and focuses investment.'],
      ],
      alignment: [
        ps[1],
        ['How do you influence and lead when you do not manage the people or teams involved?', 'I earn influence through clarity and credibility: a shared goal, a well-reasoned proposal, and a record of helping teams succeed. I listen first to understand each team\'s constraints and incentives, find the benefit for them, and make the right path the easy one with templates, examples, and support.'],
        ps[3],
        ['What do you do when a team disagrees with your proposed architecture?', 'I treat the disagreement as information. I ask what concern is behind it, test my assumptions against theirs, and use data, a prototype, or a small experiment when opinions conflict. If a better idea emerges I adopt it; if not, we agree on the decision and the reasons, then commit together.'],
        ['How do you communicate the same architecture to executives and to engineers?', 'Executives need outcomes, risk, cost, and timeline, so I lead with the problem and the business impact and keep the detail one level down. Engineers need constraints, interfaces, and the reasoning behind the design. I keep a single source of truth, such as diagrams and decision records, and tailor the story to each audience.'],
        ['How do you build the capability of the teams around you?', 'I pair on designs, run short reviews and brown-bag sessions, and share reference implementations and playbooks. The goal is for teams to own their solutions and make good decisions without me, which scales far better than being the bottleneck.'],
      ],
      decisions: [
        ['How do you analyze a vague or ambiguous problem before proposing a solution?', 'I clarify the outcome and who is affected, list constraints and quality attributes such as security, scale, and cost, and gather data on how the current system behaves. I then frame two or three viable options with their trade-offs rather than jumping to the first idea.'],
        ['Walk me through how you make and document a significant architecture decision.', 'I define the decision and its drivers, compare realistic options against agreed criteria, and consult the people affected. I record the outcome in an architecture decision record covering context, options, decision, and consequences, and I note whether it is easy or hard to reverse so the right level of rigor is applied.'],
        ['How do you decide when you have incomplete information or limited time?', 'I separate decisions that are easy to reverse from those that are not. For reversible ones I move quickly with the best available information and a way to learn from the result. For hard-to-reverse ones I invest in a spike or proof of concept to remove the biggest unknowns first.'],
        ['How do you balance technical debt against delivering new features?', 'I make the debt visible and tie it to business impact, such as slower delivery, incidents, or security exposure. Then I negotiate a sustainable allocation, address the debt that blocks priorities first, and avoid big-bang rewrites in favor of incremental improvements.'],
        ['How do you identify and manage architectural and security risk?', 'I use threat modeling early, keep a visible risk register with owners and mitigations, and validate the riskiest assumptions with prototypes and load or failure tests. Risks are reviewed regularly with stakeholders so surprises are rare.'],
        ['How do you know afterward whether a decision was the right one?', 'I define success measures up front, such as reliability, performance, cost, or delivery speed, and review them after release. When results differ from expectations, I share what we learned and adjust, so the decision history improves the next ones.'],
      ],
      execution: [
        ['How do you turn an architecture into a delivery plan that several teams can execute?', 'I break the solution into thin vertical slices, starting with a walking skeleton that proves the riskiest integrations end to end. I map dependencies between teams, agree on contracts and interfaces early, and define milestones with measurable outcomes so progress is visible.'],
        ps[5],
        ['How do you ensure consistent quality across many teams and services?', 'Shared standards and automation: contract and integration tests that run on every build, a common definition of done, and a maturity model that rates services on reliability, security, and supportability so gaps are visible. Quality is built into the pipeline instead of inspected at the end.'],
        ps[6],
        ['What do you do when a critical project is slipping?', 'First get an honest picture of scope, progress, and blockers. Then work with the team and sponsors on options: reduce scope, re-sequence work, add help, or adjust the date. I communicate early and plainly, remove obstacles, and focus the team on the most valuable outcome.'],
        ['How do you roll out a major change or migration safely?', 'Incrementally: feature flags, canary or percentage-based releases, parallel runs where possible, and a tested rollback plan. I watch agreed health metrics during each stage and keep stakeholders informed so any problem is caught while its impact is still small.'],
      ],
    };
    const groups = [
      ['ciam', 'CIAM & Identity', N.ciam],
      ['azure', 'Azure & Cloud', N.azure],
      ['ai', 'AI', N.ai],
      ['alignment', 'Teamwork & Alignment', N.alignment],
      ['decisions', 'Analysis & Decisions', N.decisions],
      ['execution', 'Execution & Delivery', N.execution],
    ];
    const list = (qs) =>
      qs
        .map(
          ([q, a, html], i) => `<details class="qa"><summary><span class="num">${i + 1}</span><span>${esc(q)}</span></summary>
        <div class="answer${a ? '' : ' empty'}"><p>${a ? (html ? a : esc(a)) : 'No answer written yet.'}</p></div></details>`
        )
        .join('\n');
    const panel = (id, qs, i) => `<div data-panel="${id}" role="tabpanel" aria-labelledby="tab-${id}"${i === 0 ? '' : ' hidden'}>${list(qs)}</div>`;
    add({
      path: 'developer/interview-questions',
      title: 'Interview Questions',
      description: 'Practice solution architect interview questions on CIAM, Azure, AI, teamwork, decision making and delivery, with concise answers.',
      scripts: ['interview.js'],
      body:
        pageHead({
          eyebrow: 'Work & Tech',
          title: 'Interview questions',
          lede: 'Practice solution architect interview questions on CIAM, Azure and AI, plus the teamwork, analysis, decision-making and execution skills it takes to gain alignment and deliver quality solutions. Tap a question to reveal the answer.',
          crumbs: [{ label: 'Work & Tech', href: hrefFor(root, 'developer') }, { label: 'Interview Questions' }],
        }) +
        section(`
        <div class="tabs" role="tablist" aria-label="Question category">
          ${groups.map(([id, label, qs], i) => `<button class="tab" role="tab" id="tab-${id}" data-tab="${id}" aria-selected="${i === 0}">${label} <span class="muted">(${qs.length})</span></button>`).join('\n          ')}
        </div>
        ${groups.map(([id, , qs], i) => panel(id, qs, i)).join('\n        ')}
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
      ['Azure Podcast', 'Discussions about Microsoft Azure', 'azurepodcast.jpg'],
      ['Darknet Diaries', 'True stories from the dark side of the Internet', 'darknet-diaries.jpg'],
      ['Lex Fridman Podcast', 'Conversations about AI, science, and technology', 'lexfridman.jpg'],
      ['Freakonomics Radio', 'Discover the hidden side of everything', 'freakenomics-radio-podcast.jpeg'],
      ['The Knowledge Project', 'Master the best of what other people have figured out', 'knowledge-project-podcast.png'],
      ['Marketplace', 'Make sense of today’s business and economy', 'marketplace-podcast.jpg'],
      ['The Indicator', 'Quick daily stories about the economy from Planet Money', 'the-indicator.jpg'],
      ['Lenny’s Podcast', 'Interviews on product, career and growth', 'lennys-podcast.jpg'],
      ['Up First', 'NPR’s morning news podcast', 'upfirst.jpg'],
    ];
    add({
      path: 'developer/podcasts',
      title: 'Favorite Podcasts',
      description: 'The podcasts Michael Wolfgang listens to during his commute and runs — tech, business, ideas and news.',
      body:
        pageHead({
          eyebrow: 'Listening',
          title: 'Favorite podcasts',
          lede: 'Podcasts I listen to during my commute and on runs.',
          
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
          eyebrow: 'Work & Tech',
          title: 'Developer resources',
          lede: 'Essential learning resources for Azure, .NET, and software engineering.',
          crumbs: [{ label: 'Work & Tech', href: hrefFor(root, 'developer') }, { label: 'Resources' }],
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
          crumbs: [{ label: 'Work & Tech', href: hrefFor(root, 'developer') }, { label: 'CIAM Resources' }],
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
          crumbs: [{ label: 'Work & Tech', href: hrefFor(root, 'developer') }, { label: 'Scopes & Claims' }],
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
          crumbs: [{ label: 'Work & Tech', href: hrefFor(root, 'developer') }, { label: 'JWT Decoder' }],
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
          crumbs: [{ label: 'Work & Tech', href: hrefFor(root, 'developer') }, { label: 'RSA Validator' }],
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

  return pages;
}
