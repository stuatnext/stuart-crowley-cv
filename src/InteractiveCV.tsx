import React from 'react';
import { Mail, Phone, Linkedin, ExternalLink, MapPin } from 'lucide-react';

const HEADSHOT = `${import.meta.env.BASE_URL}headshot.jpg`;
const OX = '#7A2535';

export default function InteractiveCV() {
  return (
    <div className="min-h-screen" style={{ background: '#F6F2ED', color: '#0A0A0A', fontFamily: "'Inter', sans-serif" }}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header style={{ borderBottom: `2.5px solid ${OX}`, background: '#F6F2ED' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36 }}>

            {/* Photo */}
            <img
              src={HEADSHOT}
              alt="Stuart Crowley"
              style={{
                width: 108,
                height: 108,
                borderRadius: 12,
                objectFit: 'cover',
                objectPosition: 'top',
                flexShrink: 0,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              }}
            />

            {/* Name block */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: OX,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <MapPin size={11} style={{ color: OX }} />
                Relocating to Singapore · COMPASS Eligible
              </div>

              <h1 style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(3rem, 7vw, 5.25rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                marginBottom: 14,
              }}>
                Stuart{' '}
                <span style={{ color: OX }}>Crowley</span>
              </h1>

              <p style={{ fontSize: 15, color: '#5C5050', marginBottom: 16, fontWeight: 300 }}>
                Commercial Director{' '}
                <span style={{ color: '#0A0A0A', fontWeight: 600 }}>· B2B SaaS · Tech · Media</span>
              </p>

              {/* Contacts */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px' }}>
                <a href="mailto:scrowley194@gmail.com" style={contactStyle}>
                  <Mail size={13} /> scrowley194@gmail.com
                </a>
                <span style={contactStyle}>
                  <Phone size={13} /> +44 7818 070529
                </span>
                <a
                  href="https://linkedin.com/in/stuart-crowley-b2b561104"
                  target="_blank"
                  rel="noreferrer"
                  style={contactStyle}
                >
                  <Linkedin size={13} /> LinkedIn <ExternalLink size={11} style={{ opacity: 0.5 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────── */}
      <main style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '56px 48px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 296px',
        gap: 56,
        alignItems: 'start',
      }}>

        {/* ── LEFT: Experience ─────────────────────── */}
        <div>
          <SectionTitle>Professional Experience</SectionTitle>

          <Role
            company="NEXT.io"
            title="Commercial Director"
            dates="Oct 2025 – Present"
            location="Remote (UK)"
            context="Promoted to establish and lead the company's first formal Commercial Department, reporting directly to the CEO. Direct reports include Sales Director, Marketing Director, and CRM Specialist."
            bullets={[
              'ACV & Margin Growth: Drove ACV from €60K to over €100K by overhauling pricing strategies. Introduced tiered discount authorities, replacing informal norms and driving an estimated 18% blended margin uplift.',
              'Pipeline Forecasting & CRM Rigour: Overhauled HubSpot commercial intelligence across a €2.4M+ active pipeline. Improved coverage ratios and forecasting accuracy by resolving unclassified deal ageing.',
              'Marketing Restructure: Rebuilt marketing into a four-pillar model (Brand, Event, Media, Commercial). Recruited Director of Marketing, improving speed-to-lead and reducing cost-per-MQL.',
              'New Vertical Launch: Architected the company\'s first prediction markets vertical in New York — full GTM strategy, two-layer revenue forecasting model, and competitor benchmarking.',
            ]}
          />

          <Role
            company="NEXT.io"
            title="Head of Media"
            dates="May 2024 – Oct 2025"
            location="Remote"
            context="Recruited to build the Media division entirely from scratch. Transformed it into the company's most profitable business unit within 18 months."
            bullets={[
              'High-Margin Affiliate Engine: Built an SEO-driven affiliate module leveraging domain authority and premium backlinks, scaling this net-new channel to €400K–€500K in monthly revenue.',
              'Recurring Revenue Products: Launched the Research & Insights division, securing enterprise deals at €80K–€100K+ and contributing to an 80% Net Retention Rate (NRR) company-wide.',
              'Revenue Scale: Grew media division baseline from ~€400K to €1.2M (3× growth) within 18 months across podcast, video, and display advertising.',
            ]}
          />

          <Role
            company="CloserStill Media"
            title="Global Marketing Manager · Editor of Techerati"
            dates="Aug 2022 – May 2024"
            location="London & Singapore"
            context="Managed a team of 6, leading content marketing and demand generation for the Tech Portfolio. Strategic bridge between European and APAC markets."
            bullets={[
              'Delivered culturally adapted GTM strategies bridging EMEA and APAC audiences across AI, SaaS, and Cybersecurity verticals.',
              'Launched multi-market B2B content partnerships generating high-quality MQLs. Achieved 120% website traffic growth and 135% LinkedIn follower uplift.',
            ]}
          />

          <Role
            company="Microgaming"
            title="Head of Brand & Content (APAC)"
            dates="Mar 2021 – Aug 2022"
            location="Singapore"
            context="Managed an APAC P&L of ~$2.5M and a cross-functional team of 8, driving end-to-end brand strategy and creative direction across the Asian market."
            bullets={[
              'Directed digital transformation projects across six companies, delivering measurable visibility gains and a 35% uplift in regional conversion rates across APAC.',
              'Established scalable content ecosystems and brand playbooks enabling sustained high-quality output across B2B2C channels.',
            ]}
          />

          <Role
            company="W.Media"
            title="Head of Production & Editorial (APAC)"
            dates="Feb 2019 – Mar 2021"
            location="Singapore"
            context="Reported directly to the CEO. Managed an APAC P&L of ~$1.5M, hiring 4 key regional staff to build a high-performing team of 8."
            bullets={[
              'Strengthened B2B partnerships with Digital Realty, Equinix, and Keppel, securing renewed sponsorships and expanding APAC market share.',
              'Spearheaded the pivot to digital-first models during the pandemic, delivering 300%+ growth in web traffic through regional virtual summits.',
            ]}
          />

          <Role
            company="ComplyAdvantage"
            title="Marketing Executive (EMEA)"
            dates="May 2018 – Feb 2019"
            location="London"
            context=""
            bullets={[
              'Designed a unified global social strategy for this RegTech SaaS scale-up, introducing company-wide social selling enablement across LinkedIn and Twitter.',
            ]}
            isLast
          />
        </div>

        {/* ── RIGHT: Sidebar ───────────────────────── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* Profile */}
          <div>
            <SectionTitle>Profile</SectionTitle>
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.7 }}>
              <p style={{ marginBottom: 10 }}>
                Commercial leader with 8+ years building net-new revenue engines and GTM strategies across
                B2B SaaS, Technology, and Media in APAC, EMEA, and LATAM.
              </p>
              <p style={{ marginBottom: 10 }}>
                Currently Commercial Director at NEXT.io — built the company's first formal commercial
                and media departments from the ground up, driving ACV from €60K to €100K+ and scaling
                affiliate revenue to €500K+ MRR.
              </p>
              <p>
                Lived and worked in Singapore 2019–2022. Actively planning a permanent return.
              </p>
            </div>
          </div>

          {/* Core Competencies */}
          <div>
            <SectionTitle>Core Competencies</SectionTitle>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                'Commercial Strategy & GTM Architecture',
                'SaaS & Media Pricing Governance',
                'Pipeline Forecasting & CRM Operations',
                'Marketing Department Building',
                'SEO/Affiliate Revenue Scaling',
                'APAC Regional Leadership',
                'AI & No-Code Systems Architecture',
                'B2B SaaS · iGaming · Tech Media',
              ].map((c) => (
                <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: '#3A3030', lineHeight: 1.55 }}>
                  <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.45em', flexShrink: 0 }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div>
            <SectionTitle>Technical Skills</SectionTitle>
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
          </div>

          {/* Education */}
          <div>
            <SectionTitle>Education</SectionTitle>
            <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: '#0A0A0A', marginBottom: 2 }}>Master of Journalism</div>
              <div style={{ color: '#5C5050' }}>University of Sheffield · 2018</div>
            </div>
          </div>

          {/* Additional */}
          <div>
            <SectionTitle>Additional</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: '#3A3030' }}>
                <span style={{ fontWeight: 600, color: OX }}>Singapore: </span>
                Previously held an Employment Pass (2020), fully eligible under MOM COMPASS. Deep professional network across APAC tech, SaaS, and digital media.
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: '#3A3030' }}>
                <span style={{ fontWeight: 600, color: OX }}>Tech Stack: </span>
                Built complete commercial workflows using Softr, Airtable, and Make.com. Expert in HubSpot + Monday.com data modelling.
              </div>
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}

// ── Shared components ─────────────────────────────────────────

const contactStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  fontSize: 13,
  color: '#5C5050',
  textDecoration: 'none',
  transition: 'color 0.15s',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ width: 24, height: 2, background: '#7A2535', flexShrink: 0 }} />
      <h3 style={{
        fontSize: 9.5,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: '#7A2535',
      }}>
        {children}
      </h3>
    </div>
  );
}

function Role({
  company, title, dates, location, context, bullets, isLast = false,
}: {
  company: string;
  title: string;
  dates: string;
  location: string;
  context: string;
  bullets: string[];
  isLast?: boolean;
}) {
  return (
    <div style={{
      paddingBottom: isLast ? 0 : 32,
      marginBottom: isLast ? 0 : 32,
      borderBottom: isLast ? 'none' : '1px solid #E2D9D0',
    }}>
      {/* Company + dates row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 3 }}>
        <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.01em' }}>{company}</h4>
        <span style={{ fontSize: 11.5, color: '#8A7E7E', whiteSpace: 'nowrap', fontWeight: 500 }}>{dates}</span>
      </div>

      {/* Title + location row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: context ? 10 : 12 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#7A2535' }}>{title}</span>
        {location && (
          <>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8BFB5', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#8A7E7E' }}>{location}</span>
          </>
        )}
      </div>

      {/* Context */}
      {context && (
        <p style={{
          fontSize: 13,
          color: '#5C5050',
          lineHeight: 1.6,
          fontStyle: 'italic',
          marginBottom: 12,
        }}>
          {context}
        </p>
      )}

      {/* Bullets */}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#2A2020', lineHeight: 1.6 }}>
            <span style={{
              width: 5, height: 5, minWidth: 5,
              borderRadius: '50%',
              background: '#7A2535',
              marginTop: '0.45em',
              flexShrink: 0,
            }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
