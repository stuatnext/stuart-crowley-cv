import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Linkedin, Download, ChevronRight, ExternalLink } from 'lucide-react';

const PROFILE_IMG = '/stuart-crowley-cv/headshot.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

export default function InteractiveCV({
  onDownload,
  isGenerating,
}: {
  onDownload: () => void;
  isGenerating: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans selection:bg-orange-500/30 overflow-x-hidden">

      {/* Atmosphere blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-[-200px] w-[600px] h-[600px] bg-blue-600/4 rounded-full blur-[150px]" />
      </div>

      {/* ── Floating download ── */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onDownload}
        disabled={isGenerating}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-[#F27D26] hover:bg-[#ff9040] text-black px-6 py-3.5 rounded-full font-bold shadow-[0_0_50px_rgba(242,125,38,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-sm"
      >
        <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : 'group-hover:-translate-y-0.5 transition-transform'}`} />
        {isGenerating ? 'Generating PDF…' : 'Download PDF'}
      </motion.button>

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-20 lg:px-12">

        {/* ── HERO ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-24"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
              <MapPin className="w-3 h-3 text-[#F27D26]" />
              Relocating to Singapore · COMPASS Eligible
            </span>
          </motion.div>

          {/* Photo + Name row */}
          <motion.div variants={fadeUp} custom={1} className="flex items-end gap-8 mb-8">
            <img
              src={PROFILE_IMG}
              alt="Stuart Crowley"
              className="w-32 h-32 rounded-2xl object-cover object-top border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <h1
                className="text-[clamp(3.5rem,10vw,6.5rem)] font-black text-white leading-[0.88] tracking-tighter uppercase mb-4"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                Stuart<br />
                <span className="text-[#F27D26]">Crowley</span>
              </h1>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeUp} custom={2} className="mb-8">
            <p className="text-xl font-light text-slate-400">
              Commercial Director &nbsp;·&nbsp;{' '}
              <span className="text-white font-semibold">B2B SaaS · Tech · Media</span>
            </p>
          </motion.div>

          {/* Contacts row */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 mb-12">
            <a href="mailto:scrowley194@gmail.com" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg border border-slate-800 flex items-center justify-center group-hover:border-[#F27D26]/50 group-hover:bg-[#F27D26]/8 transition-all">
                <Mail className="w-3.5 h-3.5" />
              </div>
              scrowley194@gmail.com
            </a>
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <div className="w-8 h-8 rounded-lg border border-slate-800 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              +44 7818 070529
            </div>
            <a href="https://linkedin.com/in/stuart-crowley-b2b561104" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg border border-slate-800 flex items-center justify-center group-hover:border-[#F27D26]/50 group-hover:bg-[#F27D26]/8 transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </div>
              LinkedIn
              <ExternalLink className="w-3 h-3 opacity-40" />
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} custom={4} className="border-t border-slate-900 mb-12" />

          {/* Stats row */}
          <motion.div variants={fadeUp} custom={5} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: '8+', label: 'Years experience' },
              { val: '3×', label: 'Media revenue growth' },
              { val: '€100K+', label: 'ACV achieved' },
              { val: 'APAC', label: 'Deep operational base' },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-colors">
                <div className="text-2xl font-bold text-[#F27D26] mb-1">{s.val}</div>
                <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── SECTIONS ── */}
        <div className="flex flex-col gap-24">

          {/* Executive Summary */}
          <Section label="Executive Summary" index={0}>
            <p className="text-xl leading-relaxed text-slate-200 font-light mb-5">
              Currently Commercial Director at NEXT.io, reporting to the CEO. Built the company's first
              formal commercial and media departments from the ground up.
            </p>
            <p className="text-base leading-relaxed text-slate-400">
              Track record of driving ACV from €60K to €100K+ and scaling high-margin digital/affiliate
              revenue to €500K+ monthly recurring revenue — while acting as hands-on technical architect
              for CRM and no-code workflows. Actively planning a permanent return to Singapore.
            </p>
          </Section>

          {/* Core Competencies */}
          <Section label="Core Competencies" index={1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Commercial Strategy', desc: 'GTM architecture, pricing governance, ACV/NRR optimisation.' },
                { title: 'Sales & Pipeline Ops', desc: 'Rigorous pipeline forecasting, CRM data modelling.' },
                { title: 'Marketing & Demand Gen', desc: 'SEO/Affiliate growth, cost-per-MQL reduction.' },
                { title: 'AI & Systems', desc: 'No-code workflows (Make, Softr), advanced CRM logic.' },
                { title: 'Regional Leadership', desc: 'Deep APAC experience, scaling cross-functional teams.' },
                { title: 'Sector Expertise', desc: 'Enterprise SaaS, iGaming, B2B Media & Events.' },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
                >
                  <h4 className="text-white font-semibold mb-2 text-sm group-hover:text-[#F27D26] transition-colors">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section label="Experience" index={2}>
            <div className="flex flex-col">
              <ExperienceItem
                company="NEXT.io"
                role="Commercial Director"
                date="Oct 2025 – Present"
                location="Remote (UK)"
                context="Promoted to establish and lead the company's first formal Commercial Department. Direct reports include Sales Director, Marketing Director, and CRM Specialist."
                bullets={[
                  'ACV & Margin Growth: Drove ACV from €60K to over €100K by overhauling pricing. Introduced strict Power Inventory protection rules.',
                  'Pipeline Forecasting: Overhauled HubSpot commercial intelligence over a €2.4M+ active pipeline.',
                  'Marketing Restructure: Recruited Director of Marketing, drastically improving speed-to-lead.',
                  'New Vertical Launch: Architected the first prediction markets vertical in New York.',
                ]}
              />
              <ExperienceItem
                company="NEXT.io"
                role="Head of Media"
                date="May 2024 – Oct 2025"
                location="Remote"
                context="Built the Media division from scratch. Transformed it into the most profitable business unit within 18 months."
                bullets={[
                  'High-Margin Affiliate Engine: Scaled net-new channel to €400K–€500K in monthly revenue.',
                  'Recurring Revenue: Launched Research & Insights, securing €80K+ enterprise deals and 80% NRR.',
                  'Revenue Scale: Grew baseline media revenue 3× to €1.2M within 18 months.',
                ]}
              />
              <ExperienceItem
                company="CloserStill Media"
                role="Global Marketing Manager · Editor"
                date="Aug 2022 – May 2024"
                location="London & Singapore"
                context="Managed a team of 6 leading content marketing for the Tech Portfolio, bridging EMEA and APAC."
                bullets={[
                  'Delivered culturally adapted messaging and GTM strategies for Singapore and SE Asia.',
                  'Achieved 120% website traffic growth and 135% LinkedIn uplift through B2B content partnerships.',
                ]}
              />
              <ExperienceItem
                company="Microgaming"
                role="Head of Brand & Content (APAC)"
                date="Mar 2021 – Aug 2022"
                location="Singapore"
                context="Managed ~$2.5M regional P&L and cross-functional team of 8."
                bullets={[
                  'Directed digital transformation projects delivering 35% regional conversion rate uplift.',
                  'Established scalable content ecosystems across B2B2C channels in APAC.',
                ]}
              />
              <ExperienceItem
                company="W.Media"
                role="Head of Production & Editorial"
                date="Feb 2019 – Mar 2021"
                location="Singapore"
                context="Managed ~$1.5M P&L reporting to CEO. Pivoted to digital-first models during pandemic."
                bullets={[
                  'Strengthened B2B partnerships with Equinix, Digital Realty, delivering 300%+ web traffic growth.',
                ]}
                isLast
              />
            </div>
          </Section>

          {/* Tech + Education */}
          <Section label="Stack & Education" index={3}>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-6">Tech Stack</h4>
                <div className="space-y-5">
                  {[
                    { label: 'CRM & Revenue', tools: 'HubSpot (Advanced), Salesforce' },
                    { label: 'No-Code Logic', tools: 'Make.com, Softr, Airtable' },
                    { label: 'AI Engineering', tools: 'Claude, Gemini, ChatGPT' },
                  ].map((t) => (
                    <div key={t.label}>
                      <div className="text-white text-xs font-semibold uppercase tracking-wider mb-1">{t.label}</div>
                      <div className="text-slate-400 text-sm">{t.tools}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-6">Education</h4>
                <div className="mb-4">
                  <div className="text-white font-semibold text-lg leading-tight mb-1">Master of Journalism</div>
                  <div className="text-slate-400 text-sm mb-4">University of Sheffield · 2018</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-300">Efficiency Architect</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-300">Live Intelligence</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-slate-900 text-center text-xs text-slate-600">
          PDF version available via the Download button above
        </div>

      </div>
    </div>
  );
}

function Section({ label, children, index }: { label: string; children: React.ReactNode; index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="w-6 h-px bg-[#F27D26]/50" />
        <h3 className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">{label}</h3>
      </div>
      {children}
    </motion.section>
  );
}

function ExperienceItem({
  company, role, date, location, context, bullets, isLast = false,
}: {
  company: string;
  role: string;
  date: string;
  location: string;
  context: string;
  bullets: string[];
  isLast?: boolean;
}) {
  return (
    <div className={`relative pl-10 ml-2 ${isLast ? 'pb-0' : 'pb-16'}`}>
      {!isLast && <div className="absolute left-0 top-3 bottom-0 w-px bg-slate-800" />}
      <div className="absolute w-3 h-3 rounded-full -left-[6px] top-2 bg-slate-800 border border-slate-700 hover:bg-[#F27D26] hover:border-[#F27D26] hover:shadow-[0_0_14px_rgba(242,125,38,0.5)] transition-all" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
        <h4 className="text-2xl font-bold text-white tracking-tight">{company}</h4>
        <span className="text-xs font-mono text-slate-600">{date}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[#F27D26] font-semibold text-sm">{role}</span>
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <span className="text-xs text-slate-500">{location}</span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-5 italic">{context}</p>

      <ul className="space-y-2.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300 items-start leading-relaxed">
            <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
