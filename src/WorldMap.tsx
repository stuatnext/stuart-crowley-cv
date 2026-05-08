import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const OX     = '#7A2535';
const BORDER = '#E2D9D0';
const MUTED  = '#5C5050';

// ISO numeric codes for the five countries
const COVERED = new Set([826, 470, 840, 702, 158]);

const LOCATIONS = [
  {
    name: 'United Kingdom',
    coords: [-1.5, 52.5] as [number, number],
    period: '2018 · 2022–24',
    roles: ['ComplyAdvantage – EMEA social strategy', 'CloserStill Media – Global Tech Portfolio'],
  },
  {
    name: 'Malta',
    coords: [14.5, 35.9] as [number, number],
    period: 'Sector coverage',
    roles: ['iGaming & B2B media hub', 'Key client & event market'],
  },
  {
    name: 'United States',
    coords: [-74.0, 40.7] as [number, number],
    period: '2025',
    roles: ['NEXT.io – Prediction Markets vertical', 'New York launch GTM & revenue model'],
  },
  {
    name: 'Singapore',
    coords: [103.8, 1.35] as [number, number],
    period: '2019–2022',
    roles: ['W.Media – APAC P&L $1.5M', 'Microgaming – APAC P&L $2.5M', 'CloserStill – APAC bridge'],
  },
  {
    name: 'Taiwan',
    coords: [121.0, 23.5] as [number, number],
    period: 'APAC operations',
    roles: ['Regional market coverage', 'B2B tech & media sector'],
  },
];

export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<number | null>(null);

  return (
    <div ref={ref} style={{ background: '#FDFAF7', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 56px 48px' }}>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 20, height: 2, background: OX }} />
              <h3 style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: OX }}>
                Geographic Footprint
              </h3>
            </div>
            <p style={{ fontSize: 13, color: MUTED, paddingLeft: 30 }}>
              Hover a pin to explore — UK · Malta · USA · Singapore · Taiwan
            </p>
          </div>

          {/* Country chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {LOCATIONS.map((loc, i) => (
              <button
                key={loc.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: `1.5px solid ${active === i ? OX : BORDER}`,
                  background: active === i ? OX : 'transparent',
                  color: active === i ? '#fff' : MUTED,
                  fontSize: 11.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  fontFamily: 'inherit',
                }}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map + detail panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 32, alignItems: 'start' }}>

          {/* Map */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8E2' }}>
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{ scale: 155, center: [20, 15] }}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const id = Number(geo.id);
                    const isCovered = COVERED.has(id);
                    const idx = isCovered
                      ? [826, 470, 840, 702, 158].indexOf(id)
                      : -1;
                    const isActive = active === idx;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => idx >= 0 && setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                        style={{
                          default: {
                            fill: isActive ? OX : isCovered ? '#B8948A' : '#D4CEC6',
                            stroke: '#C8C0B8',
                            strokeWidth: 0.4,
                            outline: 'none',
                            transition: 'fill 0.2s',
                          },
                          hover: {
                            fill: isCovered ? OX : '#C8C2BA',
                            stroke: '#B8B0A8',
                            strokeWidth: 0.4,
                            outline: 'none',
                            cursor: isCovered ? 'pointer' : 'default',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Pins */}
              {LOCATIONS.map((loc, i) => (
                <Marker key={loc.name} coordinates={loc.coords}>
                  {/* Pulse ring */}
                  <motion.circle
                    r={0}
                    fill="none"
                    stroke={OX}
                    strokeWidth={1.5}
                    strokeOpacity={0.6}
                    initial={{ r: 0, opacity: 0 }}
                    animate={inView ? {
                      r: [5, 14],
                      opacity: [0.7, 0],
                    } : {}}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: i * 0.35,
                      repeatDelay: 0.5,
                    }}
                  />
                  {/* Dot */}
                  <motion.circle
                    r={5}
                    fill={active === i ? OX : '#fff'}
                    stroke={OX}
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 260 }}
                  />
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* Detail panel */}
          <div style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait">
              {active !== null ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: '#fff',
                    border: `1px solid ${BORDER}`,
                    borderLeft: `3px solid ${OX}`,
                    borderRadius: 10,
                    padding: '20px 18px',
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: OX, marginBottom: 6 }}>
                    {LOCATIONS[active].period}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A', marginBottom: 12, lineHeight: 1.2 }}>
                    {LOCATIONS[active].name}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {LOCATIONS[active].roles.map((r) => (
                      <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#3A3030', lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, minWidth: 5, borderRadius: '50%', background: OX, marginTop: '0.45em', flexShrink: 0 }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px dashed ${BORDER}`,
                    borderRadius: 10,
                    padding: 24,
                    minHeight: 160,
                  }}
                >
                  <p style={{ fontSize: 13, color: '#B0A8A4', textAlign: 'center', lineHeight: 1.6 }}>
                    Hover a pin or country<br />to see details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
