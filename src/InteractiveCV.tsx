import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, ExternalLink, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

// Standalone placeholder to ensure single-file compilation. 
// If you have your original WorldMap file, restore: import WorldMap from './WorldMap';
const WorldMap = () => null;

const HEADSHOT = '/headshot.jpg';
const OX      = '#7A2535';
const OX_SOFT = '#F4ECEC';
const BG      = '#F6F2ED';
const BORDER  = '#E2D9D0';
const TEXT    = '#0A0A0A';
const MUTED   = '#5C5050';
const SOFT    = '#9A8E8E';

/* ── Animated number counter ──────────────────────────────── */
function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 55;
    const timer = setInterval(() => {
      start++;
      const p = 1 - Math.pow(1 - start / steps, 3);
      setVal(parseFloat((to * p).toFixed(decimals)));
      if (start >= steps) { setVal(to); clearInterval(timer); }
    }, 1300 / steps);
    return () => clearInterval(timer);
  }, [inView, to, decimals]);

  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

/* ── Career trajectory showstopper ───────────────────────── */
const MILESTONES = [
  { x: 55,  y: 155, year: '2018', co: 'ComplyAdvantage', loc: 'London',      metric: 'Entered B2B SaaS' },
  { x: 195, y: 128, year: '2019', co: 'W.Media',         loc: 'Singapore',   metric: '$1M+ P&L' },
  { x: 365, y: 90,  year: '2021', co: 'Microgaming',     loc: 'Singapore',   metric: '$2M+ P&L · Team of 8' },
  { x: 505, y: 72,  year: '2022', co: 'CloserStill',     loc: 'London & SG', metric: 'Global Tech Portfolio' },
  { x: 660, y: 38,  year: '2024', co: 'NEXT.io',         loc: 'Head of Media', metric: '€5M+ division' },
  { x: 825, y: 12,  year: '2026', co: 'NEXT.io / Strait Up', loc: 'Comm. Director', metric: '€2M+ pipeline', current: true },
];

// Smooth cubic bezier through milestones
const LINE = `M 55,155 C 105,148 155,132 195,128 C 265,122 310,95 365,90 C 420,85 465,75 505,72 C 560,67 610,44 660,38 C 720,28 775,14 825,12`;
const FILL = `${LINE} L 825,195 L 55,195 Z`;

function CareerChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(null);

  return (
    <div ref={ref} style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 48px 40px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 24, height: 2, background: OX }} />
          <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>
            Career Trajectory
          </h3>
        </div>

        <div style={{ position: 'relative' }}>
          <svg viewBox="0 0 880 200" style={{ width: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={OX} stopOpacity="0.12" />
                <stop offset="100%" stopColor={OX} stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Axis line */}
            <line x1="40" y1="195" x2="860" y2="195" stroke={BORDER} strokeWidth="1" />

            {/* Area fill */}
            <motion.path
              d={FILL}
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            />

            {/* Main line — draws itself */}
            <motion.path
              d={LINE}
              fill="none"
              stroke={OX}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Milestone dots */}
            {MILESTONES.map((m, i) => (
              <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                {/* Drop line */}
                <motion.line
                  x1={m.x} y1={m.y} x2={m.x} y2={195}
                  stroke={BORDER} strokeWidth="1" strokeDasharray="3 3"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.22 }}
                />
                {/* Outer ring on hover */}
                <motion.circle cx={m.x} cy={m.y} r={12} fill={OX} fillOpacity={hovered === i ? 0.12 : 0} />
                {/* Dot */}
                <motion.circle
                  cx={m.x} cy={m.y} r={m.current ? 7 : 5}
                  fill={m.current ? OX : '#fff'}
                  stroke={OX}
                  strokeWidth={m.current ? 0 : 2}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.22, type: 'spring', stiffness: 300 }}
                  style={{ transformOrigin: `${m.x}px ${m.y}px` }}
                />
              </g>
            ))}
          </svg>

          {/* Labels below axis */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingLeft: 0 }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.22 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textAlign: 'center',
                  cursor: 'default',
                  flex: 1,
                  padding: '0 4px',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: hovered === i ? OX : TEXT }}>{m.year}</div>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: hovered === i ? OX : MUTED, marginTop: 1 }}>{m.co}</div>
                <div style={{ fontSize: 10, color: SOFT, marginTop: 1 }}>{m.loc}</div>
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        marginTop: 6,
                        background: OX,
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 4,
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                      }}
                    >
                      {m.metric}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stats strip ──────────────────────────────────────────── */
function StatCard({ value, label, prefix = '', suffix = '', decimals = 0, sub }) {
  return (
    <div style={{ flex: 1, padding: '32px 24px', borderRight: `1px solid ${BORDER}`, textAlign: 'center', minWidth: 0 }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: OX, letterSpacing: '-0.02em', lineHeight: 1 }}>
        <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div style={{ fontSize: 11, color: MUTED, marginTop: 8, fontWeight: 600, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: SOFT, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ── Revenue growth bar ───────────────────────────────────── */
function RevenueBar({ label, amount, pct, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: MUTED }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700, color: TEXT }}>{amount}</span>
      </div>
      <div style={{ height: 5, background: '#EDE5DE', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
          style={{ height: '100%', background: OX, borderRadius: 3 }}
        />
      </div>
    </div>
  );
}

/* ── Experience role card ─────────────────────────────────── */
function Role({ company, title, dates, location, context, bullets, isLast = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen(o => !o)}
      style={{
        cursor: 'pointer',
        padding: '24px 20px',
        marginBottom: isLast ? 0 : 4,
        borderRadius: 8,
        border: `1px solid ${open ? OX_SOFT : 'transparent'}`,
        background: open ? OX_SOFT : 'transparent',
        borderLeft: `3px solid ${open ? OX : 'transparent'}`,
        transition: 'all 0.2s ease',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        if (!open) e.currentTarget.style.background = '#FAF6F4';
      }}
      onMouseLeave={e => {
        if (!open) e.currentTarget.style.background = 'transparent';
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 4 }}>
        <h4 style={{ fontSize: 17, fontWeight: 700, color: TEXT, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{company}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11.5, color: SOFT, fontWeight: 500 }}>{dates}</span>
          <div style={{ color: OX, opacity: 0.8, transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* Title + location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: context ? 10 : 0 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: OX }}>{title}</span>
        {location && <>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8BFB5', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: MUTED }}>{location}</span>
        </>}
      </div>

      {/* Context */}
      {context && (
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>{context}</p>
      )}

      {/* Expand hint */}
      <div style={{
        marginTop: 10,
        fontSize: 11.5,
        fontWeight: 600,
        color: open ? OX : SOFT,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        transition: 'color 0.2s',
      }}>
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        {open ? 'Hide achievements' : 'See achievements'}
      </div>

      {/* Expandable bullets */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#2A2020', lineHeight: 1.65 }}
                >
                  <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.5em', flexShrink: 0 }} />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Sidebar section wrapper ──────────────────────────────── */
function SideSection({ title, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{ width: 20, height: 2, background: OX }} />
        <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: "'Inter', sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ borderBottom: `2.5px solid ${OX}`, background: BG }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 56px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36 }}>
            <motion.img
              src={HEADSHOT}
              alt="Stuart Crowley"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
              style={{ width: 112, height: 112, borderRadius: 10, objectFit: 'cover', objectPosition: 'top', flexShrink: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.13)' }}
            />
            <motion.div
              style={{ flex: 1 }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: OX, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={10} /> Relocating to Singapore · Prev EP Holder · COMPASS Eligible
              </div>
              <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: 14 }}>
                Stuart <span style={{ color: OX }}>Crowley</span>
              </h1>
              <p style={{ fontSize: 15, color: MUTED, marginBottom: 16, fontWeight: 300 }}>
                Commercial Leadership / Revenue Infrastructure <span style={{ color: TEXT, fontWeight: 600 }}>· GTM B2B SaaS & Tech</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 28px' }}>
                <a href="mailto:scrowley194@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: MUTED, textDecoration: 'none' }}>
                  <Mail size={12} /> scrowley194@gmail.com
                </a>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: MUTED }}>
                  <Phone size={12} /> +44 7818 070529
                </span>
                <a href="https://linkedin.com/in/stuart-crowley-b2b561104" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: MUTED, textDecoration: 'none' }}>
                  <Linkedin size={12} /> LinkedIn <ExternalLink size={10} style={{ opacity: 0.5 }} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── STATS STRIP ── */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: '#FDFAF7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 56px', display: 'flex' }}>
          <StatCard value={5}  prefix="€" suffix="M+" label="Annualised Revenue" sub="Media division impact" />
          <StatCard value={2}  prefix="€" suffix="M+" label="Active Pipeline Built" sub="HubSpot, overhauled" />
          <StatCard value={3}  suffix="×"           label="Media Division Growth" sub="Within 18 months" />
          <StatCard value={65} suffix="%+"          label="ACV Growth"            sub="Pricing strategy overhaul" />
          <StatCard value={8}  suffix="+ yrs"       label="Commercial Leadership" sub="B2B SaaS & Media" />
          <div style={{ flex: 1, padding: '32px 24px', textAlign: 'center', minWidth: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: OX, lineHeight: 1 }}>APAC</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regional Base</div>
            <div style={{ fontSize: 10, color: SOFT, marginTop: 4 }}>SG · 2019–2022</div>
          </div>
        </div>
      </div>

      {/* ── CAREER TRAJECTORY CHART ── */}
      <CareerChart />

      {/* ── GEOGRAPHIC FOOTPRINT ── */}
      <WorldMap />

      {/* ── MAIN BODY ── */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 56px 96px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 64, alignItems: 'start' }}>

        {/* LEFT: Experience */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 20, height: 2, background: OX }} />
            <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>Professional Experience</h3>
          </div>
          <p style={{ fontSize: 12, color: SOFT, marginBottom: 24, paddingLeft: 30 }}>Click any role to reveal achievements</p>

          <div style={{ marginLeft: -20 }}>
            <Role company="Strait Up Growth" title="Founder" dates="2026 – Present" location="Singapore"
              context="Boutique consultancy I founded and run alongside my NEXT.io role. Embedded operator model serving lean teams across APAC and EMEA."
              bullets={[
                'Fractional Commercial Leadership: Embeds as a hands-on commercial operator, building pipeline architecture, forecasting frameworks, and reporting infrastructure.',
                'AI Fluency & Workflow Efficiency: Builds practical AI adoption inside teams across use cases, prompting habits, shared libraries, and automation workflows.',
                'Growth, GTM & Market Expansion: Designs and executes GTM architecture for new ICPs, stalled channels, and cross-border moves.',
                'Client Impact: Delivered 30% operational efficiency uplift within 4 months for COL Web Pte Ltd. Engagement portfolio spans iGaming, SaaS, Tech, and Media.',
              ]}
            />
            <Role company="NEXT.io" title="Commercial Director" dates="Oct 2025 – Present" location="Remote (UK)"
              context="Promoted from Head of Media to establish and lead the company's first formal Commercial Department, reporting directly to the CEO. Direct reports include Sales Director, Marketing Director, and CRM Specialist."
              bullets={[
                'ACV & Margin Growth: Increased average contract value by 65%+ by overhauling pricing strategy and introducing tiered discount authorities. Delivered double-digit margin uplift.',
                'Pipeline Forecasting & CRM Rigour: Overhauled HubSpot commercial intelligence across a €2M+ active pipeline. Improved coverage ratios and forecasting accuracy.',
                'Marketing Restructure: Rebuilt marketing into a four-pillar model covering Brand, Events, Media, and Commercial. Recruited Director of Marketing and improved speed-to-lead.',
                'New Vertical Launch: Architected GTM strategy for a new regulated-market vertical, including revenue modelling, competitor benchmarking, positioning, and launch planning.',
              ]}
            />
            <Role company="NEXT.io" title="Head of Media" dates="May 2024 – Oct 2025" location="Remote"
              context="Recruited to build the Media division from scratch as a P&L-owned business unit. Took it from zero to the company's most profitable division in 18 months."
              bullets={[
                'P&L from Zero: Built and ran a new P&L from launch, taking the division 3x in 18 months to €5M+ annualised revenue and the company\'s most profitable business unit.',
                'High-Margin Affiliate Engine: Drove the majority of revenue through an SEO-driven affiliate channel leveraging domain authority and premium backlinks.',
                'Enterprise Product Launch: Spun up the Research & Insights division as a new high-margin revenue line, generating six-figure year-one revenue and adding a recurring layer to the business.',
              ]}
            />
            <Role company="CloserStill Media" title="Global Marketing Manager / Editor of Techerati" dates="Aug 2022 – May 2024" location="London & Singapore"
              context="Managed a team of 6, leading content marketing and demand generation for the Tech Portfolio. Strategic bridge between European and APAC markets."
              bullets={[
                'Delivered culturally adapted GTM strategies bridging EMEA and APAC audiences across AI, SaaS, and Cybersecurity verticals.',
                'Launched multi-market B2B content partnerships generating high-quality MQLs. Achieved 120% website traffic growth and 135% Linkedin follower uplift.',
              ]}
            />
            <Role company="Microgaming" title="Head of Brand & Content (APAC)" dates="Mar 2021 – Aug 2022" location="Singapore"
              context="Managed a $2M+ APAC P&L and a cross-functional team of 8, driving end-to-end brand strategy and creative direction across the Asian market."
              bullets={[
                'Directed digital transformation projects across six companies, delivering measurable visibility gains and a 35% uplift in regional conversion rates across APAC.',
                'Established scalable content ecosystems and brand playbooks across B2B2C channels.',
              ]}
            />
            <Role company="W.Media" title="Head of Production & Editorial (APAC)" dates="Feb 2019 – Mar 2021" location="Singapore"
              context="Reported directly to the CEO. Managed a $1M+ APAC P&L, hiring 4 key regional staff to build a high-performing team of 8."
              bullets={[
                'Spearheaded the pivot to digital-first models during the pandemic, delivering 300%+ growth in web traffic through regional virtual summits.',
                'Strengthened B2B partnerships with Digital Realty, Equinix, and Keppel, securing renewed sponsorships and expanding APAC market share.',
              ]}
            />
            <Role company="ComplyAdvantage" title="Marketing Executive (EMEA)" dates="May 2018 – Feb 2019" location="London"
              context=""
              bullets={[
                'Designed a unified global social strategy for this RegTech SaaS scale-up, introducing company-wide social selling enablement across Linkedin and Twitter.',
              ]}
              isLast
            />
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>

          <SideSection title="Profile">
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.75 }}>
              <p style={{ marginBottom: 12 }}>Commercial leader with 8+ years building revenue infrastructure and GTM systems across B2B SaaS, Tech, and Media in APAC, EMEA, and LATAM.</p>
              <p style={{ marginBottom: 12 }}>Known for building first formal commercial departments from scratch, launching new revenue verticals, scaling ACV through pricing discipline, and replacing developer bottlenecks with operator-built systems on HubSpot, Airtable, and Make.com.</p>
              <p style={{ marginBottom: 12 }}>Currently Commercial Director at NEXT.io, reporting to the CEO. Promoted from Head of Media after 18 months building the Media division to €5M+ annualised revenue.</p>
              <p>Lived in Singapore from 2019 to 2022 across two senior APAC roles, managing regional P&Ls of $1M to $2M+. Actively planning a permanent return for a senior commercial leadership role.</p>
            </div>
          </SideSection>

          <SideSection title="Media Division Growth">
            <RevenueBar label="Launch baseline" amount="€0" pct={5} delay={0.1} />
            <RevenueBar label="Month 9"         amount="€2.5M ARR" pct={50} delay={0.25} />
            <RevenueBar label="Month 18"        amount="€5M+ ARR" pct={100} delay={0.4} />
            <p style={{ fontSize: 11, color: SOFT, marginTop: 6, fontStyle: 'italic' }}>Scaled from scratch to €5M+ annualised in 18 months</p>
          </SideSection>

          <SideSection title="ACV Growth">
            <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              {[
                { label: 'Before', value: 'Baseline', note: 'informal pricing' },
                { label: 'After',  value: '+65%', note: 'governance added', hl: true },
              ].map(({ label, value, note, hl }) => (
                <div key={label} style={{ flex: 1, padding: '16px 14px', background: hl ? OX : '#FDF9F6', textAlign: 'center', borderRight: hl ? 'none' : `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: hl ? 'rgba(255,255,255,0.65)' : SOFT, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: hl ? '#fff' : TEXT, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 10, color: hl ? 'rgba(255,255,255,0.6)' : SOFT, marginTop: 3 }}>{note}</div>
                </div>
              ))}
            </div>
          </SideSection>

          <SideSection title="Core Competencies">
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Commercial Strategy & GTM Architecture',
                'SaaS & Media Pricing Governance',
                'Sales & Pipeline Ops (CRM modelling)',
                'Marketing & Demand Gen',
                'AI & Systems Architecture (No-code)',
                'Regional Leadership (APAC)',
                'Sector Expertise: SaaS, Tech, iGaming',
              ].map(c => (
                <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: '#3A3030', lineHeight: 1.55 }}>
                  <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.45em', flexShrink: 0 }} />
                  {c}
                </li>
              ))}
            </ul>
          </SideSection>

          <SideSection title="Technical Stack">
            {[
              { label: 'CRM & Revenue Ops', value: 'HubSpot (Advanced), Salesforce, Pipeline Architecture, Forecasting Models' },
              { label: 'No-Code & Automation', value: 'Make.com, Softr, Airtable, Monday.com' },
              { label: 'AI & Intelligence', value: 'Claude, Gemini, ChatGPT, Prompt Engineering' },
            ].map(s => (
              <div key={s.label} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: OX }}>{s.label}: </span>
                <span style={{ color: '#3A3030' }}>{s.value}</span>
              </div>
            ))}
          </SideSection>

          <SideSection title="Singapore Integration">
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.65 }}>
              <p>Previously held an Employment Pass (2020) and fully eligible under the MOM COMPASS framework. Built a deep professional network across APAC's tech, SaaS, and digital media ecosystems.</p>
            </div>
          </SideSection>

          <SideSection title="Education">
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.65 }}>
              <div style={{ fontWeight: 700, color: TEXT, marginBottom: 2 }}>Master of Journalism</div>
              <div style={{ color: MUTED }}>University of Sheffield · 2018</div>
            </div>
          </SideSection>

        </aside>
      </main>
    </div>
  );
}
