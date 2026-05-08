import React from 'react';

export default function PrintableCV() {
  return (
    <div className="cv-wrapper" id="cv-wrapper" style={{background: 'white', color: 'black'}}>
      <div className="cv-container" id="cv-content">

        {/* ── Header ── */}
        <div className="header">
          <div className="header-text">
            <div className="name">Stuart Crowley</div>
            <div className="title-line">Commercial Director &nbsp;·&nbsp; B2B SaaS, Tech &amp; Media &nbsp;·&nbsp; APAC GTM &amp; Revenue Scaling</div>
            <div className="contact-grid">
              <span className="pill location">Relocating to SG &nbsp;·&nbsp; Previous EP Holder (2020) &nbsp;·&nbsp; COMPASS Eligible</span>
              <span className="pill">+44 7818 070529</span>
              <span className="pill">scrowley194@gmail.com</span>
              <span className="pill">linkedin.com/in/stuart-crowley-b2b561104</span>
            </div>
          </div>
          <img
            className="header-image"
            src="https://media.licdn.com/dms/image/v2/D4E03AQGyULKJqxlZAA/profile-displayphoto-scale_200_200/B4EZpC2qXRKoAY-/0/1762058217606?e=2147483647&v=beta&t=1p_W9zNrUntjK2nO_nU3bZFCaREEKd9msfJVXKY4a70"
            alt="Stuart Crowley"
          />
        </div>

        {/* ── Profile ── */}
        <div className="section profile">
          <div className="section-title">Profile</div>
          <p>
            Commercial leader with 8+ years building net-new revenue engines and GTM strategies across B2B SaaS,
            Technology, and Media in APAC, EMEA, and LATAM. Specialise in converting commercial chaos into
            governance-grade frameworks: architecting scalable pipelines, defining SaaS/Media pricing strategies,
            and aligning sales–marketing–CRM operations for aggressive growth.
          </p>
          <p>
            Currently Commercial Director at NEXT.io, reporting to the CEO. Built the company's first formal
            commercial and media departments from the ground up. Track record of driving Average Contract Value
            (ACV) from €60K to €100K+ and scaling high-margin digital/affiliate revenue streams to{' '}
            <strong>€500K+ monthly recurring revenue</strong> while operating as a hands-on technical architect
            for CRM and no-code workflows.
          </p>
          <p>
            Lived and worked in Singapore from 2019 to 2022 across two senior APAC roles, managing
            multi-million-dollar regional P&amp;Ls and local teams. Actively planning a permanent return to Singapore.
          </p>
        </div>

        {/* ── Core Competencies ── */}
        <div className="section">
          <div className="section-title">Core Competencies</div>
          <div className="competencies">
            <div className="competency">
              <span className="competency-label">Commercial Strategy: </span>
              GTM architecture, SaaS &amp; media pricing governance, ACV/NRR optimisation, P&amp;Q modelling
            </div>
            <div className="competency">
              <span className="competency-label">Sales &amp; Pipeline Ops: </span>
              Deep CRM data modelling, rigorous pipeline forecasting, coverage tracking, key account scaling
            </div>
            <div className="competency">
              <span className="competency-label">Marketing &amp; Demand Gen: </span>
              Department building, SEO/Affiliate growth, cost-per-MQL reduction, speed-to-lead
            </div>
            <div className="competency">
              <span className="competency-label">AI &amp; Systems Architecture: </span>
              No-code building (Softr/Airtable), CRM integration logic, AI-led operational efficiency
            </div>
            <div className="competency">
              <span className="competency-label">Regional Leadership: </span>
              Deep APAC operational experience; scaled cross-functional local teams and regional P&amp;Ls
            </div>
            <div className="competency">
              <span className="competency-label">Sector Expertise: </span>
              B2B SaaS, Enterprise Technology, iGaming, B2B Media, Professional Events
            </div>
          </div>
        </div>

        {/* ── Professional Experience ── */}
        <div className="section">
          <div className="section-title">Professional Experience</div>

          <div className="role">
            <div className="role-header">
              <span className="role-company">NEXT.io</span>
              <span className="role-meta">Oct 2025 – Present &nbsp;·&nbsp; Remote (UK)</span>
            </div>
            <div className="role-position">Commercial Director</div>
            <div className="role-context">
              Promoted to establish and lead the company's first formal Commercial Department, reporting directly
              to the CEO. Direct reports include Sales Director, Marketing Director, and CRM Specialist.
              Accountable for P&amp;L, pipeline architecture, pricing strategy, and multi-vertical product expansion.
            </div>
            <ul className="role-achievements">
              <li>
                <strong>ACV &amp; Margin Growth:</strong> Drove Average Contract Value (ACV) from €60K to over
                €100K by overhauling pricing strategies. Introduced tiered discount authorities, replacing
                informal norms and driving an estimated <strong>18% blended margin uplift</strong>.
              </li>
              <li>
                <strong>Pipeline Forecasting &amp; CRM Rigour:</strong> Overhauled HubSpot commercial intelligence
                across a <strong>€2.4M+ active pipeline</strong>. Improved coverage ratios and forecasting
                accuracy by resolving unclassified deal aging and funnel breakdowns.
              </li>
              <li>
                <strong>Marketing Restructure:</strong> Rebuilt marketing into a four-pillar model (Brand, Event,
                Media, Commercial). Recruited Director of Marketing, improving speed-to-lead and reducing
                cost-per-MQL.
              </li>
              <li>
                <strong>New Vertical Launch:</strong> Architected the company's first prediction markets vertical
                in New York — full GTM strategy, two-layer revenue forecasting model, and competitor benchmarking.
              </li>
            </ul>
          </div>

          <div className="role">
            <div className="role-header">
              <span className="role-company">NEXT.io</span>
              <span className="role-meta">May 2024 – Oct 2025 &nbsp;·&nbsp; Remote</span>
            </div>
            <div className="role-position">Head of Media</div>
            <div className="role-context">
              Recruited to build the Media division entirely from scratch. Transformed it into the company's
              most profitable business unit within 18 months.
            </div>
            <ul className="role-achievements">
              <li>
                <strong>High-Margin Affiliate Engine:</strong> Built an SEO-driven affiliate module leveraging
                domain authority and premium backlinks, scaling this net-new channel to{' '}
                <strong>€400K–€500K in monthly revenue</strong>.
              </li>
              <li>
                <strong>Recurring Revenue Products:</strong> Launched the Research &amp; Insights division,
                securing enterprise deals at €80K–€100K+ and contributing to a{' '}
                <strong>80% Net Retention Rate (NRR)</strong> company-wide.
              </li>
              <li>
                <strong>Revenue Scale:</strong> Grew media division baseline from{' '}
                <strong>~€400K to €1.2M (3× growth)</strong> within 18 months across podcast, video,
                and display advertising.
              </li>
            </ul>
          </div>

          <div className="role">
            <div className="role-header">
              <span className="role-company">CloserStill Media</span>
              <span className="role-meta">Aug 2022 – May 2024 &nbsp;·&nbsp; London &amp; Singapore</span>
            </div>
            <div className="role-position">Global Marketing Manager &nbsp;·&nbsp; Editor of Techerati</div>
            <div className="role-context">
              Managed a team of 6, leading content marketing and demand generation for the Tech Portfolio.
              Strategic bridge between European and APAC markets.
            </div>
            <ul className="role-achievements">
              <li>
                Delivered culturally adapted GTM strategies bridging EMEA and APAC audiences across AI, SaaS,
                and Cybersecurity verticals.
              </li>
              <li>
                Launched multi-market B2B content partnerships generating high-quality MQLs. Achieved{' '}
                <strong>120% website traffic growth and 135% LinkedIn follower uplift</strong>.
              </li>
            </ul>
          </div>

          <div className="role">
            <div className="role-header">
              <span className="role-company">Microgaming</span>
              <span className="role-meta">Mar 2021 – Aug 2022 &nbsp;·&nbsp; Singapore</span>
            </div>
            <div className="role-position">Head of Brand &amp; Content (APAC)</div>
            <div className="role-context">
              Managed an APAC P&amp;L of ~$2.5M and a cross-functional team of 8, driving end-to-end brand
              strategy and creative direction across the Asian market.
            </div>
            <ul className="role-achievements">
              <li>
                Directed digital transformation projects across six companies, delivering measurable visibility
                gains and a <strong>35% uplift in regional conversion rates</strong> across APAC.
              </li>
              <li>
                Established scalable content ecosystems and brand playbooks across B2B2C channels.
              </li>
            </ul>
          </div>

          <div className="role">
            <div className="role-header">
              <span className="role-company">W.Media</span>
              <span className="role-meta">Feb 2019 – Mar 2021 &nbsp;·&nbsp; Singapore</span>
            </div>
            <div className="role-position">Head of Production &amp; Editorial (APAC)</div>
            <div className="role-context">
              Reported directly to the CEO. Managed an APAC P&amp;L of ~$1.5M, hiring 4 key regional staff
              to build a high-performing team of 8.
            </div>
            <ul className="role-achievements">
              <li>
                Strengthened B2B partnerships with <strong>Digital Realty, Equinix, and Keppel</strong>,
                securing renewed sponsorships and expanding APAC market share.
              </li>
              <li>
                Spearheaded the pivot to digital-first models during the pandemic, delivering{' '}
                <strong>300%+ growth in web traffic</strong> through regional virtual summits.
              </li>
            </ul>
          </div>

          <div className="role">
            <div className="role-header">
              <span className="role-company">ComplyAdvantage</span>
              <span className="role-meta">May 2018 – Feb 2019 &nbsp;·&nbsp; London</span>
            </div>
            <div className="role-position">Marketing Executive (EMEA)</div>
            <ul className="role-achievements">
              <li>
                Designed a unified global social strategy for this RegTech SaaS scale-up, introducing
                company-wide social selling enablement across LinkedIn and Twitter.
              </li>
            </ul>
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div className="section">
          <div className="section-title">Technical Skills</div>
          <div className="skills-container">
            <div className="skill-category">
              <span className="skill-category-label">CRM &amp; Revenue Ops:</span>
              <div className="skill-tags">
                <span className="skill-tag">HubSpot (Advanced)</span>
                <span className="skill-tag">Salesforce</span>
                <span className="skill-tag">Pipeline Architecture</span>
                <span className="skill-tag">Forecasting Models</span>
              </div>
            </div>
            <div className="skill-category">
              <span className="skill-category-label">No-Code &amp; Automation:</span>
              <div className="skill-tags">
                <span className="skill-tag">Make.com</span>
                <span className="skill-tag">Softr</span>
                <span className="skill-tag">Airtable</span>
                <span className="skill-tag">Monday.com</span>
              </div>
            </div>
            <div className="skill-category">
              <span className="skill-category-label">AI &amp; Intelligence:</span>
              <div className="skill-tags">
                <span className="skill-tag">Claude</span>
                <span className="skill-tag">Gemini</span>
                <span className="skill-tag">ChatGPT</span>
                <span className="skill-tag">Prompt Engineering</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="section">
          <div className="section-title">Education</div>
          <div className="education-item">
            <strong>University of Sheffield</strong> &nbsp;·&nbsp; Master of Journalism &nbsp;·&nbsp; 2018
          </div>
        </div>

        {/* ── Additional Info ── */}
        <div className="section">
          <div className="section-title">Additional Information</div>
          <ul className="additional-list">
            <li>
              <span className="label">Singapore Integration: </span>
              Previously held an Employment Pass (2020) and fully eligible under the MOM COMPASS framework.
              Built a deep professional network across APAC's tech, SaaS, and digital media ecosystems.
            </li>
            <li>
              <span className="label">Efficiency Architect (Tech Stack): </span>
              Built complete commercial workflows replacing developer bottlenecks using Softr, Airtable, and
              Make.com. Expert in aligning HubSpot with Monday.com through clean, scalable data models.
              Advanced practitioner of Claude and Gemini for live market intelligence and P&amp;L strategy.
            </li>
          </ul>
        </div>

        {/* ── Footer link ── */}
        <div
          id="pdf-interactive-link"
          style={{
            marginTop: '20px',
            paddingTop: '14px',
            borderTop: '1px solid #e1e7ef',
            textAlign: 'center',
            fontSize: '9.5pt',
            color: '#666',
            pageBreakInside: 'avoid',
          }}
        >
          <span style={{ display: 'block', marginBottom: '3px', color: '#1e3a5f', fontWeight: 600 }}>
            Interactive Digital CV
          </span>
          <a
            href="https://stuart-crowley-cv-962156774205.us-west1.run.app/"
            style={{ color: '#0066cc', textDecoration: 'none' }}
          >
            https://stuart-crowley-cv-962156774205.us-west1.run.app/
          </a>
        </div>

      </div>
    </div>
  );
}
