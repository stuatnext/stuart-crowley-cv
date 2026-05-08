import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Linkedin, Download, ChevronRight, ExternalLink } from 'lucide-react';

const PROFILE_IMG =
  'https://media.licdn.com/dms/image/v2/D4E03AQGyULKJqxlZAA/profile-displayphoto-scale_200_200/B4EZpC2qXRKoAY-/0/1762058217606?e=2147483647&v=beta&t=1p_W9zNrUntjK2nO_nU3bZFCaREEKd9msfJVXKY4a70';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function InteractiveCV({
  onDownload,
  isGenerating,
}: {
  onDownload: () => void;
  isGenerating: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-orange-500/30 overflow-x-hidden relative">

      {/* Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-orange-500/8 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-600/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Download Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onDownload}
        disabled={isGenerating}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 bg-[#F27D26] hover:bg-[#ff9040] text-black px-6 py-3.5 rounded-full font-bold shadow-[0_0_50px_rgba(242,125,38,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-sm"
      >
        <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : 'group-hover:-translate-y-0.5 transition-transform'}`} />
        {isGenerating ? 'Generating PDF…' : 'Download PDF'}
      </motion.button>

      <div className="max-w-6xl mx-auto px-6 py-20 lg:px-16 lg:grid lg:grid-cols-[380px_1fr] gap-20 relative z-10">

        {/* ── Left column: sticky bio ── */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-160px)] flex flex-col gap-10 mb-20 lg:mb-0">
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">

            {/* Photo + name */}
            <motion.div variants={item} className="flex flex-col gap-6">
              <img
                src={PROFILE_IMG}
                alt="Stuart Crowley"
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-800 shadow-[0_0_30px_rgba(242,125,38,0.15)]"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-[10px] font-semibold tracking-widest text-slate-400 mb-4 uppercase">
                  <MapPin className="w-2.5 h-2.5 text-[#F27D26]" />
                  Relocating to Singapore · COMPASS Eligible
                </div>
                <h1
                  className="text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  Stuart<br />
                  <span className="text-[#F27D26]">Crowley</span>
                </h1>
              </div>
              <div className="space-y-0.5">
                <p className="text-lg font-light text-slate-400">Commercial Director</p>
                <p className="text-base font-semibold text-white/85">B2B SaaS · Tech · Media</p>
              </div>
            </motion.div>

            {/* Short bio */}
            <motion.p variants={item} className="text-sm text-slate-400 leading-relaxed">
              8+ years building net-new revenue engines and GTM strategies across APAC, EMEA, and LATAM.
              I convert commercial chaos into governance-grade frameworks.
            </motion.p>

            {/* Contacts */}
            <motion.div variants={item} className="flex flex-col gap-3">
              <a
                href="mailto:scrowley194@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group text-sm"
              >
                <div className="w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center group-hover:border-[#F27D26]/60 group-hover:bg-[#F27D26]/8 transition-all shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                scrowley194@gmail.com
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +44 7818 070529
              </div>
              <a
                href="https://linkedin.com/in/stuart-crowley-b2b561104"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group text-sm"
              >
                <div className="w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center group-hover:border-[#F27D26]/60 group-hover:bg-[#F27D26]/8 transition-all shrink-0">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="border-t border-slate-900" />

            {/* Quick stats */}
            <motion.div variants={item} className="grid grid-cols-2 gap-4">
              {[
                { val: '8+', label: 'Years experience' },
                { val: '3×', label: 'Media revenue growth' },
                { val: '€100K+', label: 'ACV achieved' },
                { val: 'APAC', label: 'Deep operational' },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
                  <div className="text-xl font-bold text-[#F27D26] mb-1">{s.val}</div>
                  <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* ── Right column: scrollable content ── */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-20">

          {/* Executive Summary */}
          <motion.section variants={item}>
            <SectionLabel>Executive Summary</SectionLabel>
            <p className="text-xl leading-relaxed text-slate-200 font-light mb-5">
              Currently Commercial Director at NEXT.io, reporting to the CEO. Built the company's first
              formal commercial and media departments from the ground up.
            </p>
            <p className="text-base leading-relaxed text-slate-400 font-light">
              Track record of driving ACV from €60K to €100K+ and scaling high-margin digital/affiliate
              revenue to €500K+ monthly recurring revenue — while acting as hands-on technical architect
              for CRM and no-code workflows. Actively planning a permanent return to Singapore.
            </p>
          </motion.section>

          {/* Core Competencies */}
          <motion.section variants={item}>
            <SectionLabel>Core Competencies</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: 'Commercial Strategy', desc: 'GTM architecture, pricing governance, ACV/NRR optimisation.' },
                { title: 'Sales & Pipeline Ops', desc: 'Rigorous pipeline forecasting, CRM data modelling.' },
                { title: 'Marketing & Demand Gen', desc: 'SEO/Affiliate growth, cost-per-MQL reduction.' },
                { title: 'AI & Systems', desc: 'No-code workflows (Make, Softr), advanced CRM logic.' },
                { title: 'Regional Leadership', desc: 'Deep APAC experience, scaling cross-functional teams.' },
                { title: 'Sector Expertise', desc: 'Enterprise SaaS, iGaming, B2B Media & Events.' },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/70 transition-all group"
                >
                  <h4 className="text-white font-semibold mb-1.5 text-sm group-hover:text-[#F27D26] transition-colors">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section variants={item}>
            <SectionLabel>Experience</SectionLabel>
            <div className="flex flex-col gap-0">
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
          </motion.section>

          {/* Tech + Education */}
          <motion.section variants={item} className="grid sm:grid-cols-2 gap-12 border-t border-slate-900 pt-16">
            <div>
              <SectionLabel>Tech Stack</SectionLabel>
              <div className="space-y-5">
                {[
                  { label: 'CRM & Revenue', tools: 'HubSpot (Advanced), Salesforce' },
                  { label: 'No-Code Logic', tools: 'Make.com, Softr, Airtable' },
                  { label: 'AI Engineering', tools: 'Claude, Gemini, ChatGPT' },
                ].map((t) => (
                  <div key={t.label}>
                    <div className="text-white text-xs font-semibold uppercase tracking-wider mb-1.5">{t.label}</div>
                    <div className="text-slate-400 text-sm">{t.tools}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>Education</SectionLabel>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/60">
                <h4 className="text-white font-semibold text-base leading-tight mb-1">Master of Journalism</h4>
                <p className="text-slate-400 text-sm mb-4">University of Sheffield · 2018</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-300">
                    Efficiency Architect
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-300">
                    Live Intelligence
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-6 h-px bg-[#F27D26]/60" />
      <h3 className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-500">{children}</h3>
    </div>
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
    <div className={`group relative pl-8 ml-3 ${isLast ? 'pb-0' : 'pb-14'}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-0 top-3 bottom-0 w-px bg-slate-800/80" />
      )}
      {/* Dot */}
      <div className="absolute w-2.5 h-2.5 rounded-full -left-[5px] top-2 bg-slate-800 border border-slate-700 group-hover:bg-[#F27D26] group-hover:border-[#F27D26] group-hover:shadow-[0_0_12px_rgba(242,125,38,0.6)] transition-all" />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 justify-between mb-1.5">
        <h4 className="text-xl font-bold text-white tracking-tight">{company}</h4>
        <div className="text-xs font-mono text-slate-600">{date}</div>
      </div>

      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-[#F27D26] text-sm font-semibold">{role}</span>
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <span className="text-xs text-slate-500">{location}</span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-5 font-light">{context}</p>

      <ul className="space-y-2.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300 items-start">
            <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
