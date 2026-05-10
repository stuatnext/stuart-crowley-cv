```react
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, Linkedin, ExternalLink, MapPin, ChevronDown, ChevronUp, ArrowRight, Search, Command, Briefcase, Download, Globe, ShieldCheck } from 'lucide-react';

const LOCATIONS = [
  {
    name: 'United Kingdom',
    coords: [-1.5, 52.5],
    period: '2018 · 2022–24',
    roles: ['ComplyAdvantage – EMEA social strategy', 'CloserStill Media – Global Tech Portfolio'],
  },
  {
    name: 'Malta',
    coords: [14.5, 35.9],
    period: 'Sector coverage',
    roles: ['iGaming & B2B media hub', 'Key client & event market'],
  },
  {
    name: 'United States',
    coords: [-74.0, 40.7],
    period: '2025',
    roles: ['NEXT.io – Prediction Markets vertical', 'New York launch GTM & revenue model'],
  },
  {
    name: 'Singapore',
    coords: [103.8, 1.35],
    period: 'EP Holder (2020)',
    roles: ['W.Media – APAC P&L $1.5M', 'Microgaming – APAC P&L $2.5M', 'CloserStill – APAC bridge'],
  },
  {
    name: 'Taiwan',
    coords: [121.0, 23.5],
    period: 'APAC operations',
    roles: ['Regional market coverage', 'B2B tech & media sector'],
  },
  {
    name: 'Germany',
    coords: [10.4, 51.2],
    period: '2022–2024',
    roles: ['CloserStill Media – Tech Shows', 'B2B tech event market'],
  },
  {
    name: 'France',
    coords: [2.3, 46.2],
    period: '2022–2024',
    roles: ['CloserStill Media – Tech Shows', 'B2B tech event market'],
  },
  {
    name: 'Spain',
    coords: [-3.7, 40.4],
    period: '2022–2024',
    roles: ['CloserStill Media – Tech Shows', 'B2B tech event market'],
  },
];

const PLAYBOOK_DATA = [
  {
    id: 'revops',
    title: 'Revenue Operations',
    icon: <Command size={16} />,
    headline: 'HubSpot Architecture & Forecasting',
    description: 'I rebuild CRM intelligence from the ground up. I map complex B2B sales processes into clean, trackable HubSpot pipelines to ensure reporting rigour, accurate forecasting, and high coverage ratios.',
    tags: ['Pipeline Visibility', 'Forecasting', 'HubSpot Admin']
  },
  {
    id: 'pricing',
    title: 'Pricing Governance',
    icon: <Briefcase size={16} />,
    headline: 'ACV Scaling & Margin Protection',
    description: 'Transitioning teams from informal, gut-feel pricing to structured, tiered discount authorities. This operational discipline routinely drives double-digit margin uplifts and grew ACV by 65%+ at NEXT.io.',
    tags: ['Margin Uplift', 'Discount Authorities', 'ACV Growth']
  },
  {
    id: 'automation',
    title: 'Systems & AI',
    icon: <Globe size={16} />,
    headline: 'Operator-Led Efficiency',
    description: 'Bypassing developer bottlenecks by architecting custom no-code stacks (Make.com, Airtable, Softr) and deploying LLMs (Claude, Gemini) to automate lead routing, content scaling, and market intelligence.',
    tags: ['Make.com', 'Airtable', 'LLM Workflows']
  },
  {
    id: 'gtm',
    title: 'GTM Expansion',
    icon: <MapPin size={16} />,
    headline: 'New Verticals & Cross-Border Scale',
    description: 'Architecting end-to-end go-to-market strategies for new products and regions. Extensive experience bridging EMEA and APAC markets with culturally nuanced, high-converting commercial campaigns.',
    tags: ['APAC & EMEA', 'Vertical Launches', 'Demand Gen']
  }
];

const HEADSHOT = './headshot.jpg';
const OX      = '#7A2535';
const OX_SOFT = '#F4ECEC';
const BG      = '#F6F2ED';
const BORDER  = '#E2D9D0';
const TEXT    = '#0A0A0A';
const MUTED   = '#5C5050';
const SOFT    = '#9A8E8E';

/* ── Mobile Detection Hook ────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ── CmdK Global Hook ─────────────────────────────────────── */
function useCmdK() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  return { isOpen, setIsOpen };
}

/* ── Magnetic Hover Physics Component ─────────────────────── */
function MagneticButton({ children, isMobile }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Live Dual Timezone Component ─────────────────────────── */
function LiveTimeSync() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const londonTime = time.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
  const sgTime = time.toLocaleTimeString('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${BORDER}`, padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, color: MUTED, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: SOFT }} /> LDN {londonTime}
      </span>
      <span style={{ color: BORDER }}>|</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#000' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} /> SGT {sgTime}
      </span>
    </div>
  );
}

/* ── Geographic Footprint Map ───────────────────────────── */
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const COVERED = new Set([826, 470, 840, 702, 158, 276, 250, 724]);

function WorldMap() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(null);
  const [mapState, setMapState] = useState({ status: 'loading', data: null });

  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('https://esm.sh/d3-geo@3'),
      import('https://esm.sh/topojson-client@3'),
      fetch(GEO_URL).then(r => r.json())
    ]).then(([d3, topo, topoData]) => {
      if (!mounted) return;
      const featureFn = topo.feature || topo.default?.feature;
      const features = featureFn(topoData, topoData.objects.countries).features;
      setMapState({ status: 'ready', data: { d3, features } });
    }).catch((err) => {
      if (mounted) setMapState({ status: 'error', data: null });
    });
    return () => { mounted = false; };
  }, []);

  const renderMap = () => {
    if (mapState.status === 'loading') return <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED }}>Loading interactive map...</div>;
    if (mapState.status === 'error') {
      return (
        <svg viewBox="0 0 880 400" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs><pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#D4CEC6" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
          {LOCATIONS.map((loc, i) => {
            const x = (loc.coords[0] + 180) * (880 / 360);
            const y = (90 - loc.coords[1]) * (400 / 180);
            return <g key={loc.name} transform={`translate(${x}, ${y})`}><circle r={5} fill={active === i ? OX : '#fff'} stroke={OX} strokeWidth={2} /></g>;
          })}
        </svg>
      );
    }

    const { d3, features } = mapState.data;
    const projection = d3.geoNaturalEarth1().scale(155).center([20, 15]).translate([440, 200]);
    const pathGenerator = d3.geoPath().projection(projection);

    return (
      <svg viewBox="0 0 880 400" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <g>
          {features.map((geo, idx) => {
            const id = Number(geo.id);
            const isCovered = COVERED.has(id);
            const locIndex = isCovered ? [826, 470, 840, 702, 158, 276, 250, 724].indexOf(id) : -1;
            const fill = active === locIndex ? OX : isCovered ? '#C8B2A9' : '#E6E1DC';
            return <path key={geo.id || idx} d={pathGenerator(geo)} fill={fill} stroke="#FDF9F6" strokeWidth="0.8" style={{ cursor: isCovered ? 'pointer' : 'default', transition: 'fill 0.2s', outline: 'none' }} onMouseEnter={() => locIndex >= 0 && setActive(locIndex)} onMouseLeave={() => setActive(null)} />;
          })}
        </g>
        {LOCATIONS.map((loc, i) => {
          const projected = projection(loc.coords);
          if (!projected) return null;
          const [x, y] = projected;
          return (
            <g key={loc.name} transform={`translate(${x}, ${y})`}>
              <motion.circle r={0} fill="none" stroke={OX} strokeWidth={1.5} strokeOpacity={0.6} initial={{ r: 0, opacity: 0 }} animate={inView ? { r: [5, 14], opacity: [0.7, 0] } : {}} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: i * 0.35, repeatDelay: 0.5 }} />
              <motion.circle r={5} fill={active === i ? OX : '#fff'} stroke={OX} strokeWidth={2} style={{ cursor: 'pointer' }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 260 }} />
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div id="map" ref={ref} style={{ background: '#FDFAF7', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, width: '100%', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '40px 20px' : '52px 56px 48px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', marginBottom: 32, gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 20, height: 2, background: OX }} />
              <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>Geographic Footprint</h3>
            </div>
            <p style={{ fontSize: 13, color: MUTED, paddingLeft: 30, margin: 0 }}>Hover a pin to explore — UK · Malta · USA · Singapore · Taiwan · Germany · France · Spain</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
            {LOCATIONS.map((loc, i) => (
              <button key={loc.name} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${active === i ? OX : BORDER}`, background: active === i ? OX : 'transparent', color: active === i ? '#fff' : MUTED, fontSize: 11.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'inherit' }}>{loc.name}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 260px', gap: isMobile ? 24 : 32, alignItems: 'start' }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8E2', position: 'relative' }}>{renderMap()}</div>
          <div style={{ minHeight: isMobile ? 'auto' : 220 }}>
            <AnimatePresence mode="wait">
              {active !== null ? (
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderLeft: `3px solid ${OX}`, borderRadius: 10, padding: '20px 18px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: OX, marginBottom: 6 }}>{LOCATIONS[active].period}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A', marginBottom: 12, lineHeight: 1.2 }}>{LOCATIONS[active].name}</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {LOCATIONS[active].roles.map((r) => (
                      <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#3A3030', lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.45em', flexShrink: 0 }} />{r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${BORDER}`, borderRadius: 10, padding: 24, minHeight: isMobile ? 100 : 160 }}>
                  <p style={{ fontSize: 13, color: '#B0A8A4', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>Hover a pin or country<br />to see details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CmdK Modal ───────────────────────────────────────────── */
function CmdKModal({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const actions = [
    { icon: <Mail size={16} />, label: 'Discuss SG EP Sponsorship', action: () => window.location.href = "mailto:scrowley194@gmail.com?subject=Singapore Opportunity" },
    { icon: <Globe size={16} />, label: 'Inquire about Fractional Consulting', action: () => window.open('https://straitupgrowth.com', '_blank') },
    { icon: <Linkedin size={16} />, label: 'Connect on LinkedIn', action: () => window.open('https://linkedin.com/in/stuart-crowley-b2b561104', '_blank') },
    { icon: <Download size={16} />, label: 'Download / Print PDF', action: () => { setIsOpen(false); setTimeout(() => window.print(), 100); } },
    { icon: <Briefcase size={16} />, label: 'View Experience', action: () => { setIsOpen(false); document.getElementById('experience')?.scrollIntoView({behavior: 'smooth'}); } },
  ];

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh' }}>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          onClick={() => setIsOpen(false)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} 
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }}
          style={{ width: '100%', maxWidth: 500, background: '#fff', borderRadius: 12, boxShadow: '0 24px 50px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Search size={18} color={MUTED} />
            <input 
              autoFocus placeholder="Type a command or search..." 
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit', color: TEXT }} 
            />
            <span style={{ fontSize: 10, background: '#F0EBE6', padding: '4px 6px', borderRadius: 4, color: MUTED, fontWeight: 600 }}>ESC</span>
          </div>
          <div style={{ padding: '8px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: SOFT, padding: '8px 12px' }}>Quick Actions</div>
            {actions.map((action, i) => (
              <button 
                key={i} onClick={action.action}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 8, color: TEXT, transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F6F2ED'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ color: action.icon.type.name === 'Mail' || action.icon.type.name === 'Globe' ? OX : MUTED }}>{action.icon}</div>
                <div style={{ fontSize: 14, fontWeight: action.icon.type.name === 'Mail' || action.icon.type.name === 'Globe' ? 600 : 500 }}>{action.label}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ── Sticky Conversion Header ─────────────────────────────── */
function StickyHeader({ isMobile, onOpenCmdK }) {
  const { scrollY, scrollYProgress } = useScroll();
  const y = useTransform(scrollY, [200, 300], [-100, 0]);
  const opacity = useTransform(scrollY, [200, 300], [0, 1]);

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, y, opacity,
        background: 'rgba(246, 242, 237, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${BORDER}`, zIndex: 1000, boxShadow: '0 4px 30px rgba(0,0,0,0.03)'
      }}
    >
      <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: OX, originX: 0, scaleX: scrollYProgress }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={HEADSHOT}
            alt="Stuart Crowley"
            onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Stuart+Crowley&background=7A2535&color=fff&size=100&bold=true"; }}
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `1px solid ${BORDER}` }}
          />
          {!isMobile && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: TEXT, lineHeight: 1 }}>Stuart Crowley</div>
              <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, marginTop: 2 }}>Commercial Director</div>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {!isMobile && (
            <>
              <MagneticButton isMobile={isMobile}>
                <a href="https://straitupgrowth.com" target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: MUTED, textDecoration: 'none', padding: '6px 12px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = TEXT} onMouseLeave={e => e.currentTarget.style.color = MUTED}>
                  Hire Fractionally
                </a>
              </MagneticButton>
              <button 
                onClick={onOpenCmdK}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.04)', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', color: MUTED, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
              >
                <Search size={14} /> <span style={{ fontSize: 12, fontWeight: 500 }}>Search</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, background: '#fff', padding: '2px 4px', borderRadius: 4, fontWeight: 700 }}><Command size={10} /> K</span>
              </button>
            </>
          )}
          <MagneticButton isMobile={isMobile}>
            <a href="mailto:scrowley194@gmail.com" style={{ background: OX, color: '#fff', textDecoration: 'none', padding: '8px 20px', borderRadius: 30, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(122, 37, 53, 0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(122, 37, 53, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(122, 37, 53, 0.3)'; }}>
              Get in touch <ArrowRight size={14} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Interactive Playbook Methodology ─────────────────────── */
function CommercialPlaybook({ isMobile }) {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} style={{ marginTop: 48, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12, padding: isMobile ? 20 : 32, overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div style={{ width: 20, height: 2, background: OX }} />
        <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: OX }}>The Operator's Playbook</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Tabs Row */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {PLAYBOOK_DATA.map((item, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: 'none',
                  background: isActive ? '#F6F2ED' : 'transparent',
                  color: isActive ? OX : MUTED,
                  borderRadius: 8, cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500, fontSize: 13,
                  transition: 'all 0.2s', whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: isActive ? OX : SOFT, display: 'flex' }}>{item.icon}</span>
                {item.title}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div style={{ background: '#FDFAF7', borderRadius: 8, padding: isMobile ? 20 : 28, position: 'relative', border: `1px solid ${BORDER}` }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 12, lineHeight: 1.2 }}>
                {PLAYBOOK_DATA[activeTab].headline}
              </div>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, marginBottom: 0, margin: 0 }}>
                {PLAYBOOK_DATA[activeTab].description}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                {PLAYBOOK_DATA[activeTab].tags.map(tag => (
                  <span key={tag} style={{ background: '#fff', border: `1px solid ${BORDER}`, color: OX, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

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

const LINE = `M 55,155 C 105,148 155,132 195,128 C 265,122 310,95 365,90 C 420,85 465,75 505,72 C 560,67 610,44 660,38 C 720,28 775,14 825,12`;
const FILL = `${LINE} L 825,195 L 55,195 Z`;

function CareerChart() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(null);

  return (
    <div ref={ref} style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, width: '100%', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '40px 20px' : '52px 48px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 24 : 32 }}>
          <div style={{ width: 24, height: 2, background: OX }} />
          <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>
            Career Trajectory
          </h3>
        </div>

        <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch', paddingBottom: 16 }}>
          <div style={{ position: 'relative', minWidth: isMobile ? 750 : '100%' }}>
            <svg viewBox="0 0 880 200" style={{ width: '100%', overflow: 'visible' }}>
              <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={OX} stopOpacity="0.12" /><stop offset="100%" stopColor={OX} stopOpacity="0.01" /></linearGradient></defs>
              <line x1="40" y1="195" x2="860" y2="195" stroke={BORDER} strokeWidth="1" />
              <motion.path d={FILL} fill="url(#areaGrad)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1.2 }} />
              <motion.path d={LINE} fill="none" stroke={OX} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }} />
              {MILESTONES.map((m, i) => (
                <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <motion.line x1={m.x} y1={m.y} x2={m.x} y2={195} stroke={BORDER} strokeWidth="1" strokeDasharray="3 3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 + i * 0.22 }} />
                  <motion.circle cx={m.x} cy={m.y} r={12} fill={OX} fillOpacity={hovered === i ? 0.12 : 0} />
                  <motion.circle cx={m.x} cy={m.y} r={m.current ? 7 : 5} fill={m.current ? OX : '#fff'} stroke={OX} strokeWidth={m.current ? 0 : 2} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.22, type: 'spring', stiffness: 300 }} style={{ transformOrigin: `${m.x}px ${m.y}px` }} />
                </g>
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              {MILESTONES.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 + i * 0.22 }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ textAlign: 'center', cursor: 'default', flex: 1, padding: '0 4px', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: hovered === i ? OX : TEXT }}>{m.year}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: hovered === i ? OX : MUTED, marginTop: 1 }}>{m.co}</div>
                  <div style={{ fontSize: 10, color: SOFT, marginTop: 1 }}>{m.loc}</div>
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div initial={{ opacity: 0, y: -4, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.95 }} transition={{ duration: 0.15 }} style={{ marginTop: 6, background: OX, color: '#fff', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', display: 'inline-block' }}>{m.metric}</motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stats strip ──────────────────────────────────────────── */
function StatCard({ value, label, prefix = '', suffix = '', decimals = 0, sub, index, isMobile }) {
  const isRightBorder = isMobile ? (index % 2 === 0) : (index < 5);
  const isBottomBorder = isMobile ? (index < 4) : false;

  return (
    <motion.div 
      whileHover={{ y: -4, backgroundColor: '#fff', boxShadow: '0 12px 30px rgba(0,0,0,0.04)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ 
        flex: 1, padding: isMobile ? '24px 16px' : '32px 24px', 
        borderRight: isRightBorder ? `1px solid ${BORDER}` : 'none', borderBottom: isBottomBorder ? `1px solid ${BORDER}` : 'none',
        textAlign: 'center', minWidth: 0, borderRadius: 8, position: 'relative', zIndex: 1
      }}
    >
      <div style={{ fontSize: isMobile ? 24 : 26, fontWeight: 800, color: OX, letterSpacing: '-0.02em', lineHeight: 1 }}>
        <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div style={{ fontSize: 11, color: MUTED, marginTop: 8, fontWeight: 600, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: SOFT, marginTop: 4 }}>{sub}</div>}
    </motion.div>
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
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }} style={{ height: '100%', background: OX, borderRadius: 3 }} />
      </div>
    </div>
  );
}

/* ── Experience role card ─────────────────────────────────── */
function Role({ company, title, dates, location, context, bullets, isLast = false, isMobile, defaultOpen = false, logo, hideCompanyName = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen(o => !o)}
      style={{ cursor: 'pointer', padding: isMobile ? '20px 16px' : '24px 20px', marginBottom: isLast ? 0 : 4, borderRadius: 8, border: `1px solid ${open ? OX_SOFT : 'transparent'}`, background: open ? OX_SOFT : 'transparent', borderLeft: `3px solid ${open ? OX : 'transparent'}`, transition: 'all 0.2s ease', userSelect: 'none', width: '100%', minWidth: 0 }}
      onMouseEnter={e => { if (!open) e.currentTarget.style.background = '#FAF6F4'; }}
      onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', minWidth: 0 }}>
          {logo && <img src={logo} alt={`${company} logo`} style={{ height: 38, width: 'auto', maxWidth: 160, objectFit: 'contain' }} />}
          {!hideCompanyName && <h4 style={{ fontSize: 17, fontWeight: 700, color: TEXT, letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0, wordBreak: 'break-word' }}>{company}</h4>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11.5, color: SOFT, fontWeight: 500 }}>{dates}</span>
          <div style={{ color: OX, opacity: 0.8, transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown size={18} /></div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 4 : 8, marginBottom: context ? 10 : 0 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: OX }}>{title}</span>
        {location && <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{!isMobile && <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C8BFB5', display: 'inline-block', flexShrink: 0 }} />}<span style={{ fontSize: 12, color: MUTED }}>{location}</span></div>}
      </div>
      {context && <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, fontStyle: 'italic', margin: 0, marginTop: isMobile ? 8 : 0 }}>{context}</p>}
      <div style={{ marginTop: 10, fontSize: 11.5, fontWeight: 600, color: open ? OX : SOFT, display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}>
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />} {open ? 'Hide achievements' : 'See achievements'}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bullets.map((b, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#2A2020', lineHeight: 1.65 }}>
                  <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.5em', flexShrink: 0 }} /><span>{b}</span>
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
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }} style={{ width: '100%', minWidth: 0 }}>
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
  const isMobile = useIsMobile();
  const { isOpen: isCmdKOpen, setIsOpen: setCmdKOpen } = useCmdK();

  return (
    <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: "'Inter', sans-serif", width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}>
      <CmdKModal isOpen={isCmdKOpen} setIsOpen={setCmdKOpen} />
      <StickyHeader isMobile={isMobile} onOpenCmdK={() => setCmdKOpen(true)} />

      {/* ── HEADER ── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ borderBottom: `2.5px solid ${OX}`, background: BG, paddingTop: 40 }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '40px 20px' : '48px 56px' }}>
          
          {/* Live Sync Element */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -20 }}>
              <LiveTimeSync />
            </motion.div>
          )}

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-end', gap: isMobile ? 24 : 36, textAlign: isMobile ? 'center' : 'left' }}>
            <motion.img
              src={HEADSHOT} alt="Stuart Crowley"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Stuart+Crowley&background=7A2535&color=fff&size=256&font-size=0.33&bold=true"; }}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}
              style={{ width: 112, height: 112, borderRadius: 10, objectFit: 'cover', objectPosition: 'top', flexShrink: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.13)' }}
            />
            <motion.div style={{ flex: 1 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(122, 37, 53, 0.08)', color: OX, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  <MapPin size={12} /> Relocating to Singapore
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E8F5E9', color: '#2E7D32', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  <ShieldCheck size={12} /> MOM COMPASS Eligible
                </div>
              </div>

              <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: `clamp(2.5rem, 10vw, 5rem)`, fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: 14, wordBreak: 'break-word' }}>
                Stuart <span style={{ color: OX }}>Crowley</span>
              </h1>
              <p style={{ fontSize: 15, color: MUTED, marginBottom: 16, fontWeight: 300 }}>
                Commercial Leadership / Revenue Infrastructure <span style={{ color: TEXT, fontWeight: 600 }}>· GTM APAC + EMEA</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
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
      </motion.header>

      {/* ── STATS STRIP ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} style={{ borderBottom: `1px solid ${BORDER}`, background: '#FDFAF7', width: '100%', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0' : '0 56px', display: isMobile ? 'grid' : 'flex', gridTemplateColumns: isMobile ? '1fr 1fr' : 'none', width: '100%' }}>
          <StatCard index={0} isMobile={isMobile} value={5}  prefix="€" suffix="M+" label="Annualised Revenue" sub="Media division impact" />
          <StatCard index={1} isMobile={isMobile} value={2}  prefix="€" suffix="M+" label="Active Pipeline Built" sub="HubSpot, overhauled" />
          <StatCard index={2} isMobile={isMobile} value={3}  suffix="×"           label="Media Division Growth" sub="Within 18 months" />
          <StatCard index={3} isMobile={isMobile} value={65} suffix="%+"          label="ACV Growth"            sub="Pricing strategy overhaul" />
          <StatCard index={4} isMobile={isMobile} value={8}  suffix="+ yrs"       label="Commercial Leadership" sub="B2B SaaS & Media" />
          <div style={{ flex: 1, padding: isMobile ? '24px 16px' : '32px 24px', textAlign: 'center', minWidth: 0, zIndex: 1 }}>
            <div style={{ fontSize: isMobile ? 24 : 26, fontWeight: 800, color: OX, lineHeight: 1 }}>APAC</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regional Base</div>
            <div style={{ fontSize: 10, color: SOFT, marginTop: 4 }}>EP Holder (2020)</div>
          </div>
        </div>
      </motion.div>

      {/* ── CAREER TRAJECTORY CHART ── */}
      <CareerChart />

      {/* ── GEOGRAPHIC FOOTPRINT ── */}
      <WorldMap />

      {/* ── MAIN BODY ── */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '40px 20px 64px' : '64px 56px 96px', width: '100%' }}>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 300px', gap: isMobile ? 48 : 64, alignItems: 'start', marginBottom: 64, width: '100%' }}>
          {/* LEFT: Experience */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <div id="experience" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 20, height: 2, background: OX }} />
              <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>Professional Experience</h3>
            </div>
            <p style={{ fontSize: 12, color: SOFT, marginBottom: 24, paddingLeft: 30 }}>Click any role to reveal achievements</p>

            <div style={{ marginLeft: isMobile ? 0 : -20, width: isMobile ? '100%' : 'calc(100% + 20px)' }}>
              <Role defaultOpen={true} isMobile={isMobile} company="NEXT.io" title="Commercial Director" dates="Oct 2025 – Present" location="Remote (UK)"
                context="Promoted from Head of Media to establish and lead the company's first formal Commercial Department, reporting directly to the CEO. Direct reports include Sales Director, Marketing Director, Growth Marketing Manager, Community Manager, and CRM Specialist."
                bullets={[
                  'ACV & Margin Growth: Increased average contract value by 65%+ by overhauling pricing strategy and introducing tiered discount authorities. Delivered double-digit margin uplift.',
                  'Pipeline & Revenue Scale: Rebuilt CRM architecture to cleanly track and forecast a multi-vertical, €7M+ pipeline spanning Events, Media, and Community.',
                  'Marketing Restructure: Rebuilt marketing into a four-pillar model covering Brand, Events, Media, and Commercial. Recruited Director of Marketing and improved speed-to-lead.',
                  'New Vertical Launch: Architected GTM strategy for the new NEXTPredict event, including revenue modelling, competitor benchmarking, positioning, and launch planning.',
                ]}
              />
              <Role defaultOpen={true} isMobile={isMobile} company="NEXT.io" title="Head of Media" dates="May 2024 – Oct 2025" location="Remote"
                context="Recruited to build the Media division from scratch as a P&L-owned business unit. Took it from zero to the company's most profitable division in 18 months."
                bullets={[
                  'P&L from Zero: Built and ran a new P&L from launch, taking the division 3x in 18 months to €5M+ annualised revenue and the company\'s most profitable business unit.',
                  'High-Margin Affiliate Engine: Drove the majority of revenue through an SEO-driven affiliate channel leveraging domain authority and premium backlinks.',
                  'Enterprise Product Launch: Spun up the Research & Insights division as a new high-margin revenue line, generating six-figure year-one revenue and adding a recurring layer to the business.',
                ]}
              />
              <Role isMobile={isMobile} company="CloserStill Media" title="Global Marketing Manager / Editor of Techerati" dates="Aug 2022 – May 2024" location="London & Singapore"
                context="Managed a team of 6, leading content marketing and demand generation for the Tech Portfolio. Strategic bridge between European and APAC markets."
                bullets={[
                  'Delivered culturally adapted GTM strategies bridging EMEA and APAC audiences across AI, SaaS, and Cybersecurity verticals.',
                  'Launched multi-market B2B content partnerships generating high-quality MQLs. Achieved 120% website traffic growth and 135% Linkedin follower uplift.',
                ]}
              />
              <Role isMobile={isMobile} company="Microgaming" title="Head of Brand & Content (APAC)" dates="Mar 2021 – Aug 2022" location="Singapore"
                context="Managed a $2M+ APAC P&L and a cross-functional team of 8, driving end-to-end brand strategy and creative direction across the Asian market."
                bullets={[
                  'Directed digital transformation projects across six companies, delivering measurable visibility gains and a 35% uplift in regional conversion rates across APAC.',
                  'Established scalable content ecosystems and brand playbooks across B2B2C channels.',
                ]}
              />
              <Role isMobile={isMobile} company="W.Media" title="Head of Production & Editorial (APAC)" dates="Feb 2019 – Mar 2021" location="Singapore"
                context="Reported directly to the CEO. Managed a $1M+ APAC P&L, hiring 4 key regional staff to build a high-performing team of 8."
                bullets={[
                  'Spearheaded the pivot to digital-first models during the pandemic, delivering 300%+ growth in web traffic through regional virtual summits.',
                  'Strengthened B2B partnerships with Digital Realty, Equinix, and Keppel, securing renewed sponsorships and expanding APAC market share.',
                ]}
              />
              <Role isMobile={isMobile} company="ComplyAdvantage" title="Marketing Executive (EMEA)" dates="May 2018 – Feb 2019" location="London"
                context=""
                bullets={[
                  'Designed a unified global social strategy for this RegTech SaaS scale-up, introducing company-wide social selling enablement across Linkedin and Twitter.',
                ]}
                isLast
              />
            </div>

            {/* Consultancy Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40, marginBottom: 16 }}>
              <div style={{ width: 20, height: 2, background: OX }} />
              <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>Consultancy</h3>
            </div>
            
            <div style={{ marginLeft: isMobile ? 0 : -20, width: isMobile ? '100%' : 'calc(100% + 20px)' }}>
              <Role 
                defaultOpen={true} 
                isMobile={isMobile} 
                company="Strait Up Growth" 
                hideCompanyName={true}
                logo="https://straitupgrowth.com/logo.png" 
                title="Founder" 
                dates="2026 – Present" 
                location="Singapore"
                context="Strait Up Growth is a boutique consultancy I founded and run alongside my NEXT.io role. Embedded operator model serving lean teams across APAC and EMEA."
                bullets={[
                  'Fractional Commercial Leadership: Embeds as a hands-on commercial operator, building pipeline architecture, forecasting frameworks, and reporting infrastructure.',
                  'AI Fluency & Workflow Efficiency: Builds practical AI adoption inside teams across use cases, prompting habits, shared libraries, and automation workflows.',
                  'Growth, GTM & Market Expansion: Designs and executes GTM architecture for new ICPs, stalled channels, and cross-border moves.',
                  'Client Impact: Delivered 30% operational efficiency uplift within 4 months for COL Web Pte Ltd. Engagement portfolio spans iGaming, SaaS, Tech, and Media.',
                ]}
                isLast
              />
            </div>

            {/* Playbook moved to the left column to fill the gap and balance height */}
            <CommercialPlaybook isMobile={isMobile} />
          </div>

          {/* RIGHT: Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 32, minWidth: 0, width: '100%' }}>

            {/* Strait Up Growth (Consulting) Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ background: '#1A1515', color: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%', boxShadow: '0 0 12px #10B981' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#10B981' }}>Available for Fractional</span>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Strait Up Growth</h4>
              <p style={{ fontSize: 13, color: '#A39898', lineHeight: 1.6, marginBottom: 16 }}>Not ready for a full-time Commercial Director? I embed with lean teams to build pipeline architecture, AI workflows, and GTM strategies on a fractional basis.</p>
              <MagneticButton isMobile={isMobile}>
                <a href="https://straitupgrowth.com" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}>
                  Discuss a project <ArrowRight size={12} />
                </a>
              </MagneticButton>
            </motion.div>

            {/* Singapore EP Readiness Card */}
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20, background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <ShieldCheck size={18} color="#2E7D32" />
                <h4 style={{ fontSize: 14, fontWeight: 700, color: TEXT, margin: 0 }}>MOM COMPASS Ready</h4>
              </div>
              <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>
                Fully pre-qualified for Singapore Employment Pass sponsorship, dramatically reducing HR friction.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li style={{ fontSize: 12, color: '#3A3030', display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓</span> <span><strong>COMPASS C2 Eligible</strong><br/><span style={{ color: SOFT, fontSize: 11 }}>Top 100 University Degree</span></span></li>
                <li style={{ fontSize: 12, color: '#3A3030', display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓</span> <span><strong>Former EP Holder</strong><br/><span style={{ color: SOFT, fontSize: 11 }}>Zero local orientation delay</span></span></li>
                <li style={{ fontSize: 12, color: '#3A3030', display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓</span> <span><strong>APAC Market Fluency</strong><br/><span style={{ color: SOFT, fontSize: 11 }}>Managed $2.5M+ SG P&Ls</span></span></li>
              </ul>
            </div>

            <SideSection title="Profile">
              <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.75 }}>
                <p style={{ marginBottom: 12 }}>Commercial leader with 8+ years building revenue infrastructure and GTM systems across APAC, EMEA, and LATAM.</p>
                <p style={{ marginBottom: 12 }}>Known for building first formal commercial departments from scratch, launching new revenue verticals, scaling ACV through pricing discipline, and replacing developer bottlenecks with operator-built systems on HubSpot, Airtable, and Make.com.</p>
                <p style={{ marginBottom: 12 }}>Currently Commercial Director at NEXT.io, reporting to the CEO. Promoted from Head of Media after 18 months building the Media division to €5M+ annualised revenue. Now responsible for the full commercial P&L: pricing, pipeline, sales, and marketing across multiple verticals.</p>
                <p>Senior APAC operating experience across two Singapore-based roles, managing regional P&Ls of $1M to $2M+. Now planning a permanent return to Singapore for a senior commercial leadership role.</p>
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

            <SideSection title="Technical Stack">
              {[
                { label: 'CRM & Rev Ops', tags: ['HubSpot (Adv)', 'Salesforce', 'Pipeline Architecture', 'Forecasting'] },
                { label: 'No-Code & Auto', tags: ['Make.com', 'Softr', 'Airtable', 'Monday.com'] },
                { label: 'AI & Intelligence', tags: ['Claude', 'Gemini', 'ChatGPT', 'Prompt Engineering'] },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: OX, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{s.label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{ background: '#EDE5DE', color: '#4A3D3D', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, border: `1px solid ${BORDER}` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </SideSection>

            <SideSection title="Education">
              <div style={{ fontSize: 13.5, color: '#3A3030', lineHeight: 1.65 }}>
                <div style={{ fontWeight: 700, color: TEXT, marginBottom: 2 }}>Master of Journalism</div>
                <div style={{ color: MUTED }}>University of Sheffield · 2018</div>
              </div>
            </SideSection>

          </aside>
        </div>

      </main>
      
      {/* Global CSS Reset for flawless mobile width constraint */}
      <style>{`
        * { box-sizing: border-box; }
        body, html { margin: 0; padding: 0; overflow-x: hidden; width: 100vw; max-width: 100%; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff !important; }
          button { display: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}


```
