import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, ExternalLink, MapPin, ChevronDown } from 'lucide-react';

const HEADSHOT = `${import.meta.env.BASE_URL}headshot.jpg`;
const OX = '#7A2535';
const BG = '#F6F2ED';
const BORDER = '#E2D9D0';
const TEXT = '#0A0A0A';
const MUTED = '#5C5050';

/* ── Animated counter ─────────────────────────────────────── */
function Counter({ to, decimals = 0, prefix = '', suffix = '' }: {
  to: number; decimals?: number; prefix?: string; suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3); // ease-out cubic
      setVal(parseFloat((to * progress).toFixed(decimals)));
      if (step >= steps) { setVal(to); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, to, decimals]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}
    </span>
  );
}

/* ── Revenue bar (animated on scroll) ────────────────────── */
function RevenueBar({ label, amount, pct, delay }: {
  label: string; amount: string; pct: number; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12, color: MUTED }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600, color: TEXT }}>{amount}</span>
      </div>
      <div style={{ height: 6, background: '#E8DDD5', borderRadius: 4, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
          style={{ height: '100%', background: OX, borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

/* ── Stat card ────────────────────────────────────────────── */
function StatCard({ value, label, prefix = '', suffix = '', decimals = 0, sub }: {
  value: number; label: string; prefix?: string; suffix?: string; decimals?: number; sub?: string;
}) {
  return (
    <div style={{
      flex: 1,
      padding: '20px 16px',
      borderRight: `1px solid ${BORDER}`,
      textAlign: 'center',
      minWidth: 0,
    }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: OX, letterSpacing: '-0.02em', lineHeight: 1 }}>
        <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div style={{ fontSize: 11, color: MUTED, marginTop: 5, fontWeight: 500, lineHeight: 1.3 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: '#9A8E8E', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

/* ── Expandable role ──────────────────────────────────────── */
function Role({ company, title, dates, location, context, bullets, isLast = false }: {
  company: string; title: string; dates: string; location: string;
  context: string; bullets: string[]; isLast?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingBottom: isLast ? 0 : 28,
        marginBottom: isLast ? 0 : 28,
        borderBottom: isLast ? 'none' : `1px solid ${BORDER}`,
      }}
    >
      {/* Header row — clickable */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', padding: 0,
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 3 }}>
          <h4 style={{ fontSize: 17, fontWeight: 700, color: TEXT, letterSpacing: '-0.01em' }}>{company}</h4>
          <span style={{ fontSize: 11.5, color: '#9A8E8E', whiteSpace: 'nowrap', fontWeight: 500, flexShrink: 0 }}>{dates}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: OX }}>{title}</span>
            {location && <>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8BFB5', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: MUTED }}>{location}</span>
            </>}
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: OX, opacity: 0.7, flexShrink: 0, marginLeft: 8 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      {/* Context always visible */}
      {context && (
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, fontStyle: 'italic', marginTop: 8 }}>
          {context}
        </p>
      )}

      {/* Expandable bullets */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="bullets"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#2A2020', lineHeight: 1.6 }}
                >
                  <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.45em', flexShrink: 0 }} />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      <div style={{ marginTop: 8, fontSize: 11, color: open ? OX : '#B0A8A4', fontWeight: 500, transition: 'color 0.2s' }}>
        {open ? 'Collapse' : `${bullets.length} achievements — click to expand`}
      </div>
    </motion.div>
  );
}

/* ── Section title ────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ width: 24, height: 2, background: OX, flexShrink: 0 }} />
      <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>
        {children}
      </h3>
    </div>
  );
}

/* ── Sidebar section ──────────────────────────────────────── */
function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionTitle>{title}</SectionTitle>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function InteractiveCV() {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: "'Inter', sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ borderBottom: `2.5px solid ${OX}`, background: BG }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
            <motion.img
              src={HEADSHOT}
              alt="Stuart Crowley"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ width: 108, height: 108, borderRadius: 10, objectFit: 'cover', objectPosition: 'top', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
            />
            <motion.div
              style={{ flex: 1 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: OX, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={10} /> Relocating to Singapore · COMPASS Eligible
              </div>
              <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: 12 }}>
                Stuart <span style={{ color: OX }}>Crowley</span>
              </h1>
              <p style={{ fontSize: 15, color: MUTED, marginBottom: 14, fontWeight: 300 }}>
                Commercial Director <span style={{ color: TEXT, fontWeight: 600 }}>· B2B SaaS · Tech · Media</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 24px' }}>
                {[
                  { icon: <Mail size={12} />, label: 'scrowley194@gmail.com', href: 'mailto:scrowley194@gmail.com' },
                  { icon: <Phone size={12} />, label: '+44 7818 070529' },
                  { icon: <Linkedin size={12} />, label: 'LinkedIn', href: 'https://linkedin.com/in/stuart-crowley-b2b561104', ext: true },
                ].map(({ icon, label, href, ext }) => (
                  href
                    ? <a key={label} href={href} target={ext ? '_blank' : undefined} rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: MUTED, textDecoration: 'none' }}>
                        {icon} {label} {ext && <ExternalLink size={10} style={{ opacity: 0.5 }} />}
                      </a>
                    : <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: MUTED }}>
                        {icon} {label}
                      </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── STATS STRIP ── */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: '#FDFAF7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'flex', flexWrap: 'wrap' }}>
          <StatCard value={500}  prefix="€" suffix="K+/mo" label="Affiliate Revenue"       sub="net-new channel" />
          <StatCard value={2.4}  prefix="€" suffix="M+"    label="Active Pipeline"         decimals={1} sub="HubSpot, overhauled" />
          <StatCard value={3}    suffix="×"                label="Media Revenue Growth"    sub="18 months" />
          <StatCard value={80}   suffix="%"                label="Net Retention Rate"      sub="company-wide NRR" />
          <StatCard value={100}  prefix="€" suffix="K+ ACV" label="Contract Value Achieved" sub="up from €60K" />
          <div style={{ flex: 1, padding: '20px 16px', textAlign: 'center', minWidth: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: OX, lineHeight: 1 }}>APAC</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 5, fontWeight: 500 }}>Regional base</div>
            <div style={{ fontSize: 10, color: '#9A8E8E', marginTop: 2 }}>SG · 2019–2022</div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 48px 80px', display: 'grid', gridTemplateColumns: '1fr 296px', gap: 56, alignItems: 'start' }}>

        {/* ── LEFT: Experience ── */}
        <div>
          <SectionTitle>Professional Experience</SectionTitle>
          <p style={{ fontSize: 12, color: '#9A8E8E', marginBottom: 24, marginTop: -10 }}>Click any role to expand achievements</p>

          <Role company="NEXT.io" title="Commercial Director" dates="Oct 2025 – Present" location="Remote (UK)"
            context="Promoted to establish and lead the company's first formal Commercial Department, reporting directly to the CEO. Direct reports include Sales Director, Marketing Director, and CRM Specialist."
            bullets={[
              'ACV & Margin Growth: Drove ACV from €60K to over €100K by overhauling pricing strategies. Introduced tiered discount authorities, replacing informal norms and driving an estimated 18% blended margin uplift.',
              'Pipeline Forecasting & CRM Rigour: Overhauled HubSpot commercial intelligence across a €2.4M+ active pipeline. Improved coverage ratios and forecasting accuracy by resolving unclassified deal ageing.',
              'Marketing Restructure: Rebuilt marketing into a four-pillar model (Brand, Event, Media, Commercial). Recruited Director of Marketing, improving speed-to-lead and reducing cost-per-MQL.',
              'New Vertical Launch: Architected the company\'s first prediction markets vertical in New York — full GTM strategy, two-layer revenue forecasting model, and competitor benchmarking.',
            ]}
          />
          <Role company="NEXT.io" title="Head of Media" dates="May 2024 – Oct 2025" location="Remote"
            context="Recruited to build the Media division entirely from scratch. Transformed it into the company's most profitable business unit within 18 months."
            bullets={[
              'High-Margin Affiliate Engine: Built an SEO-driven affiliate module leveraging domain authority and premium backlinks, scaling this net-new channel to €400K–€500K in monthly revenue.',
              'Recurring Revenue Products: Launched the Research & Insights division, securing enterprise deals at €80K–€100K+ and contributing to an 80% Net Retention Rate (NRR) company-wide.',
              'Revenue Scale: Grew media division baseline from ~€400K to €1.2M (3× growth) within 18 months across podcast, video, and display advertising.',
            ]}
          />
          <Role company="CloserStill Media" title="Global Marketing Manager · Editor of Techerati" dates="Aug 2022 – May 2024" location="London & Singapore"
            context="Managed a team of 6, leading content marketing and demand generation for the Tech Portfolio. Strategic bridge between European and APAC markets."
            bullets={[
              'Delivered culturally adapted GTM strategies bridging EMEA and APAC audiences across AI, SaaS, and Cybersecurity verticals.',
              'Launched multi-market B2B content partnerships generating high-quality MQLs. Achieved 120% website traffic growth and 135% LinkedIn follower uplift.',
            ]}
          />
          <Role company="Microgaming" title="Head of Brand & Content (APAC)" dates="Mar 2021 – Aug 2022" location="Singapore"
            context="Managed an APAC P&L of ~$2.5M and a cross-functional team of 8, driving end-to-end brand strategy and creative direction across the Asian market."
            bullets={[
              'Directed digital transformation projects across six companies, delivering measurable visibility gains and a 35% uplift in regional conversion rates across APAC.',
              'Established scalable content ecosystems and brand playbooks enabling sustained high-quality output across B2B2C channels.',
            ]}
          />
          <Role company="W.Media" title="Head of Production & Editorial (APAC)" dates="Feb 2019 – Mar 2021" location="Singapore"
            context="Reported directly to the CEO. Managed an APAC P&L of ~$1.5M, hiring 4 key regional staff to build a high-performing team of 8."
            bullets={[
              'Strengthened B2B partnerships with Digital Realty, Equinix, and Keppel, securing renewed sponsorships and expanding APAC market share.',
              'Spearheaded the pivot to digital-first models during the pandemic, delivering 300%+ growth in web traffic through regional virtual summits.',
            ]}
          />
          <Role company="ComplyAdvantage" title="Marketing Executive (EMEA)" dates="May 2018 – Feb 2019" location="London"
            context=""
            bullets={[
              'Designed a unified global social strategy for this RegTech SaaS scale-up, introducing company-wide social selling enablement across LinkedIn and Twitter.',
            ]}
            isLast
          />
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <SideSection title="Profile">
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.7 }}>
              <p style={{ marginBottom: 10 }}>Commercial leader with 8+ years building net-new revenue engines across B2B SaaS, Technology, and Media in APAC, EMEA, and LATAM.</p>
              <p style={{ marginBottom: 10 }}>Built NEXT.io's first formal commercial and media departments from scratch — driving ACV from €60K to €100K+ and scaling affiliate revenue to €500K+ MRR.</p>
              <p>Lived and worked in Singapore 2019–2022. Actively planning a permanent return.</p>
            </div>
          </SideSection>

          {/* Revenue Growth Chart */}
          <SideSection title="Media Division Growth">
            <div style={{ marginBottom: 4 }}>
              <RevenueBar label="Launch baseline" amount="€400K/mo" pct={33} delay={0.1} />
              <RevenueBar label="Month 9"         amount="€800K/mo" pct={66} delay={0.25} />
              <RevenueBar label="Month 18"        amount="€1.2M/mo" pct={100} delay={0.4} />
            </div>
            <p style={{ fontSize: 11, color: MUTED, marginTop: 8, fontStyle: 'italic' }}>3× baseline revenue in 18 months at NEXT.io</p>
          </SideSection>

          {/* ACV Growth */}
          <SideSection title="ACV Growth">
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, borderRadius: 8, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              {[
                { label: 'Before', value: '€60K', note: 'inherited' },
                { label: 'After',  value: '€100K+', note: '+67%', highlight: true },
              ].map(({ label, value, note, highlight }) => (
                <div key={label} style={{ flex: 1, padding: '14px 12px', background: highlight ? OX : '#FDF9F6', textAlign: 'center', borderRight: highlight ? 'none' : `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: highlight ? 'rgba(255,255,255,0.7)' : MUTED, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: highlight ? '#fff' : TEXT, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 10, color: highlight ? 'rgba(255,255,255,0.65)' : '#9A8E8E', marginTop: 3 }}>{note}</div>
                </div>
              ))}
            </div>
          </SideSection>

          <SideSection title="Core Competencies">
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                'Commercial Strategy & GTM Architecture',
                'SaaS & Media Pricing Governance',
                'Pipeline Forecasting & CRM Operations',
                'Marketing Department Building',
                'SEO/Affiliate Revenue Scaling',
                'APAC Regional Leadership',
                'AI & No-Code Systems Architecture',
              ].map((c) => (
                <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: '#3A3030', lineHeight: 1.55 }}>
                  <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.45em', flexShrink: 0 }} />
                  {c}
                </li>
              ))}
            </ul>
          </SideSection>

          <SideSection title="Technical Skills">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { label: 'CRM & Revenue', value: 'HubSpot (Advanced), Salesforce' },
                { label: 'No-Code & Automation', value: 'Make.com, Softr, Airtable, Monday.com' },
                { label: 'AI & Intelligence', value: 'Claude, Gemini, ChatGPT' },
              ].map((s) => (
                <div key={s.label} style={{ fontSize: 13, lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 600, color: OX }}>{s.label}: </span>
                  <span style={{ color: '#3A3030' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </SideSection>

          <SideSection title="Education">
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: TEXT, marginBottom: 2 }}>Master of Journalism</div>
              <div style={{ color: MUTED }}>University of Sheffield · 2018</div>
            </div>
          </SideSection>

        </aside>
      </main>
    </div>
  );
}
