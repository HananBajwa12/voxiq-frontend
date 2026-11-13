import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Database, Headphones, Shield, X, Zap } from 'lucide-react';
import Footer from '../components/Footer';
import useHashScroll from '../hooks/useHashScroll';
import usePageMetadata from '../hooks/usePageMetadata';
import './BPO.css';

const metadata = {
  title: 'Voxiq for BPOs & Call Centers | Multi-Client Dialer',
  description: 'Run inbound and outbound client campaigns from a browser-based dialer. Organize call lists, review recordings on eligible plans, and manage team access with Voxiq.',
  ogTitle: 'Voxiq for BPOs & Call Centers',
  ogDescription: 'One platform for client campaigns: inbound and outbound calling, campaign organization, recorded-call review, and role-based access.',
  url: 'https://voxxiq.com/solutions/bpo',
  image: 'https://voxxiq.com/Sales.png',
};

const problems = [
  {
    title: 'Every new client means another tool and another login',
    body: "Clients bring their own scripts, numbers, and CRMs. Agents juggle tabs, supervisors stitch reports together by hand, and one client's data sits a click away from another's.",
  },
  {
    title: 'Agent turnover resets your floor every quarter',
    body: 'New hires take months to hit target. Without live coaching and recorded calls to learn from, quality drops every time the roster turns over — and your clients notice.',
  },
  {
    title: 'Clients want proof, not promises',
    body: 'SLA reports, QA scores, and call recordings get requested every week. Pulling them by hand eats supervisor hours and makes contract renewals harder to win.',
  },
];

const solutions = [
  {
    title: 'Client Campaigns in One Admin Console',
    body: 'Organize accounts, campaigns, and contact lists in the admin console. Assign agents and prepare outbound call lists without switching dialing tools.',
  },
  {
    title: 'Inbound and Outbound on One Floor',
    body: 'Handle inbound calls when enabled on your plan, then work outbound lists from the same browser-based agent desktop. Choose manual or campaign dialing for the task.',
  },
  {
    title: 'Call Review and Team Visibility',
    body: 'On recording-enabled plans, turn on campaign recording and review playback with your team. Use recording tags, call notes, and activity history to prepare feedback.',
  },
];

// Same reveal behavior and section wrappers as Collections and Insurance.
function FadeInSection({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`fade-in-section ${visible ? 'is-visible' : ''}`}>{children}</div>;
}

function Dashboard({ title, icon: Icon, children, badge, hero = false }) {
  return (
    <div className={`bpo-dashboard${hero ? ' bpo-dashboard-hero' : ''}`}>
      <div className="bpo-dashboard-heading">
        <h3>{Icon && <Icon size={16} aria-hidden="true" />}{title}</h3>
        <div className="bpo-dashboard-badges">
          <span className="bpo-example-label">Example dashboard</span>
          {badge && <span className="bpo-example-label">{badge}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}

function DashboardTable({ caption, columns, rows }) {
  return (
    <table className="bpo-dashboard-table">
      <caption className="bpo-sr-only">{caption}</caption>
      <thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => (
        <tr key={index}>{row.map((cell, column) => (
          <td key={columns[column]} data-label={columns[column]}>{cell}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  );
}

function Checklist({ items }) {
  return <ul className="bpo-checklist">{items.map(item => (
    <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>
  ))}</ul>;
}

function Feature({ id, label, title, body, items, children, flipped = false }) {
  return (
    <div id={id} className={`bpo-feature${flipped ? ' bpo-feature-flipped' : ''}`}>
      <div className="bpo-feature-copy">
        <p className="bpo-feature-label">{label}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <Checklist items={items} />
      </div>
      <div className="bpo-feature-mockup">{children}</div>
    </div>
  );
}

export default function BPO() {
  usePageMetadata(metadata);
  useHashScroll();

  return (
    <div className="bpo-page">
      <section className="bpo-hero" aria-labelledby="bpo-heading">
        <img className="bpo-hero-photo" src="/Sales.png" alt="Headset-wearing contact center agent at a laptop, with colleagues working behind her." fetchPriority="high" />
        <div className="bpo-hero-overlay" />
        <div className="bpo-container bpo-hero-grid">
          <div>
            <span className="bpo-eyebrow"><span aria-hidden="true" />BPO &amp; CALL CENTERS</span>
            <h1 id="bpo-heading" className="bpo-spec-heading">Run every client campaign from one platform.</h1>
            <p className="bpo-intro">Bring inbound support and outbound follow-ups into one browser-based dialer. Organize campaigns and call lists, review activity, and manage your team from the admin console.</p>
            <div className="bpo-actions">
              <Link className="bpo-button bpo-button-primary" to="/signup">Start Free Trial</Link>
              <Link className="bpo-button bpo-button-secondary" to="/solutions/bpo#how-it-works">See How It Works</Link>
            </div>
          </div>
          <Dashboard title="Contact Center Floor" icon={Headphones} badge="Live" hero>
            <dl className="bpo-metrics">
              <div><dt>Active client campaigns</dt><dd>6</dd></div>
              <div><dt>Agents on calls</dt><dd>142 / 160</dd></div>
              <div><dt>Call activity</dt><dd className="bpo-status">Inbound + outbound</dd></div>
            </dl>
          </Dashboard>
        </div>
      </section>

      <section className="bpo-stats" aria-label="BPO calling highlights">
        <div className="bpo-container bpo-three-columns">
          {[
            ['Inbound calling', 'When enabled on your plan'],
            ['Outbound dialing', 'Manual and campaign dialing'],
            ['Call review', 'Recording-enabled plans'],
          ].map(([title, caption]) => <div key={title}><h2>{title}</h2><p>{caption}</p></div>)}
        </div>
      </section>

      <FadeInSection>
        <section className="bpo-section bpo-section-dark" aria-labelledby="bpo-problems">
          <div className="bpo-container">
            <h2 id="bpo-problems" className="bpo-section-title">Running a BPO on legacy dialers is costing you margin</h2>
            <div className="bpo-three-columns bpo-problem-cards">
              {problems.map(item => <article key={item.title} className="bpo-card bpo-problem-card">
                <div className="bpo-card-label"><X size={20} aria-hidden="true" />Problem</div>
                <h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="bpo-section bpo-section-cream" aria-labelledby="bpo-solutions">
          <div className="bpo-container">
            <h2 id="bpo-solutions" className="bpo-section-title">How Voxiq solves it</h2>
            <div className="bpo-three-columns bpo-solution-cards">
              {solutions.map(item => <article key={item.title} className="bpo-card bpo-solution-card">
                <div className="bpo-card-label"><Zap size={16} aria-hidden="true" />Solution</div>
                <h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="how-it-works" className="bpo-section bpo-deep-dives" aria-label="BPO features in detail">
          <div className="bpo-container bpo-feature-list">
            <Feature id="client-workspaces" label="Client campaign organization" title="Keep client campaigns organized."
              body="Create accounts and contact lists, configure campaigns, and assign agents from the admin console. Keep each campaign’s calling setup and activity together as your team works through client programs."
              items={['Accounts, campaigns, and contact lists', 'CSV contact imports into account lists', 'Admin, manager, and agent roles', 'Campaign caller-ID pools with local presence enabled', 'On-demand analytics CSV export']}>
              <Dashboard title="Client Campaigns" icon={Database} badge="6 Active">
                <DashboardTable caption="Illustrative client campaign organization" columns={['Client', 'Campaign', 'Agents', 'Activity']}
                  rows={[
                    ['Acme Telecom', 'Inbound support', '48', 'In progress'],
                    ['BrightHealth', 'Appointment setting', '36', 'Prepared list'],
                    ['NorthPeak Energy', 'Renewals outreach', '22', 'Follow-up'],
                  ]} />
              </Dashboard>
            </Feature>

            <Feature id="qa-and-coaching" label="QA and team feedback" title="Review calls. Build better habits."
              body="Supervisors can play back recordings and tag calls for review when recording is enabled on the account and campaign. Review call history to prepare feedback for your team. Recording availability depends on your plan."
              items={['Recording playback on eligible plans', 'Recording tags for follow-up reviews', 'Call outcomes and interaction notes', 'Agent performance scorecards']} flipped>
              <Dashboard title="Supervisor Console" icon={Headphones} badge="QA">
                <DashboardTable caption="Illustrative recorded-call review workflow" columns={['Agent', 'Client', 'Call time', 'Review action']}
                  rows={[
                    ['A. Khan', 'Acme Telecom', '6:12', 'Playback'],
                    ['R. Santos', 'BrightHealth', '2:40', 'Review notes'],
                    ['M. Ortiz', 'NorthPeak Energy', '4:05', 'Tagged for review'],
                  ]} />
              </Dashboard>
            </Feature>

            <Feature id="compliance-controls" label="Compliance controls" title="Keep call outcomes and access controls in view."
              body="Mark do-not-call outcomes, keep interaction notes, and control access through admin, manager, and agent roles. Use available campaign recording settings to support internal reviews."
              items={['Do-not-call outcome logging', 'Interaction notes and call history', 'Role-based access', 'Campaign recording controls on eligible plans']}>
              <Dashboard title="Compliance Monitor" icon={Shield}>
                <dl className="bpo-metrics">
                  {[['DNC outcome', 'Logged'], ['Interaction notes', 'Saved'], ['Access', 'Role-based'], ['Campaign recording', 'Optional']].map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd className="bpo-status">{value}</dd></div>
                  ))}
                </dl>
              </Dashboard>
            </Feature>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="bpo-section bpo-workflow-section" aria-labelledby="bpo-workflow">
          <div className="bpo-container bpo-workflow-container">
            <div className="bpo-workflow-card">
              <h2 id="bpo-workflow">Example workflow</h2>
              <p>An outsourced contact center can handle inbound support and outbound follow-ups from the same browser-based dialer.</p>
              <span className="bpo-workflow-badge">Inbound + outbound workflow</span>
            </div>
          </div>
        </section>
      </FadeInSection>

      <section className="bpo-section bpo-integrations" aria-labelledby="bpo-integrations">
        <div className="bpo-container">
          <h2 id="bpo-integrations">CONNECTS TO YOUR CLIENTS’ STACKS</h2>
          <div className="bpo-integration-links">
            <Link to="/integrations">GoHighLevel</Link>
            <Link to="/integrations#zapier">Zapier</Link>
          </div>
          <p>Connect GoHighLevel directly or use Zapier to automate follow-up workflows.</p>
        </div>
      </section>

      <FadeInSection>
        <section className="bpo-cta-section" aria-labelledby="bpo-cta">
          <div className="bpo-container">
            <div className="bpo-cta-card">
              <h2 id="bpo-cta">Put every client campaign on one platform. Try it free for 7 days.</h2>
              <p>Trial features depend on your plan. Review pricing and payment details during signup.</p>
              <div className="bpo-actions">
                <Link className="bpo-button bpo-button-primary" to="/signup">Start Free Trial</Link>
                <a className="bpo-button bpo-button-secondary" href="mailto:sales@voxiq.com">Talk to Sales</a>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
      <Footer />
    </div>
  );
}
