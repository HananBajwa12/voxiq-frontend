import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useHashScroll from '../hooks/useHashScroll';
import './Integrations.css';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Database,
  ArrowUpRight,
  Code,
  ShieldCheck,
  Cpu,
  Link as LinkIcon
} from 'lucide-react';

/* ─────────────────────────────────────────
   COLOR TOKENS — Ocean Breeze Multicolor
   (matches InboundCalls.jsx)
───────────────────────────────────────── */
const C = {
  midnight: '#020D1A',
  oceanDeep: '#0A2540',
  oceanMid: '#0D3B6E',
  breeze: '#7FCDFF',
  breezeLight: '#DFF7FF',
  foam: '#F0FBFF',
  cream: '#FFFDF5',
  white: '#FFFFFF',
  textDark: '#0A2540',
  textMid: '#2D5986',
  textMuted: '#6B9AB8',
  liveGreen: '#00E5A0',
  purple: '#7C6DFA',
  warn: '#F59E0B',
};

const availabilityIntegrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'An AI-powered CRM for managing customer records, sales pipelines, and customer service.',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'A CRM platform that brings marketing automation, sales tools, and customer service together.',
  },
  {
    id: 'outreach',
    name: 'Outreach',
    description: 'An AI-powered sales platform that helps teams find prospects, follow up, and manage deals.',
  },
];

const CARD_HOVER_CSS = `
  .ib-card-hover {
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .ib-card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(127,205,255,.15);
    border-color: ${C.breeze} !important;
  }
`;

function InjectCardHoverStyles() {
  useEffect(() => {
    const id = 'voxiq-inbound-styles';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = CARD_HOVER_CSS;
      document.head.appendChild(s);
    }
  }, []);
  return null;
}

function FadeInSection({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
}

export default function Integrations() {
  const navigate = useNavigate();
  const [showGhlSetup, setShowGhlSetup] = useState(false);
  useHashScroll();

  return (
    <div className="integrations-page" style={{ background: '#020D1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <InjectCardHoverStyles />

      {/* 1. Hero */}
                  <section style={{ 
        padding: '120px 0 80px', 
        position: 'relative',
        overflow: 'hidden',
        background: '#020D1A', 
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left' 
      }}>
        {/* Background Image */}
        <img 
          src="/Intergration for Zapier..png" 
          alt="Background" 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            zIndex: 1,
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Gradient Overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(rgba(2, 13, 26, 0.4), rgba(2, 13, 26, 0.4)), radial-gradient(ellipse 70% 60% at 60% 50%, rgba(127,205,255,0.06), transparent 70%)', 
          zIndex: 2, 
          pointerEvents: 'none' 
        }} />

        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10, width: '100%' }}>
          <div className="integrations-hero-copy" style={{ maxWidth: '58%', textAlign: 'left' }}>
            
            <span style={{
              color: '#7FCDFF',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              background: 'rgba(127, 205, 255, 0.08)',
              padding: '6px 16px',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '20px',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Integrations
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              color: '#F1F5F9',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              lineHeight: '1.1',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Connect Voxiq with the tools you already use.
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6B9AB8',
              margin: '0 0 40px 0',
              lineHeight: '1.6',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Connect GoHighLevel directly or use Zapier to automate workflows with other tools.
            </p>

            <div className="integrations-hero-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', marginBottom: '60px' }}>
              <Link
                to="/signup"
                style={{
                  textDecoration: 'none',
                  background: 'rgb(223, 247, 255)', color: '#0A2540',
                  padding: '16px 36px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(127, 205, 255, 0.25)',
                  transition: 'all 0.2s',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Start Free Trial
              </Link>
              <button
                onClick={() => navigate('/pricing')}
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '16px 36px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}
              >
                See Pricing
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Featured Integration (full-width card, purple border) */}
      <FadeInSection>
        <section style={{ padding: '40px 0 80px', background: C.breezeLight }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
            <div className="integration-featured-card" style={{
              background: C.white,
              border: `2px solid ${C.breeze}`,
              borderRadius: '24px',
              padding: '48px',
              color: C.textDark,
              boxShadow: '0 30px 60px rgba(127,205,255,.15)',
              position: 'relative'
            }}>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span style={{
                  background: C.breeze,
                  color: C.midnight,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  MOST POPULAR
                </span>
                <span style={{
                  background: C.breezeLight,
                  color: C.oceanMid,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Native Integration
                </span>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: C.textDark, margin: '0 0 8px 0', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                GoHighLevel
              </h2>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: C.textMid, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Connect your GoHighLevel calling workflow
              </h3>

              <p style={{ fontSize: '1.05rem', color: C.textMid, lineHeight: '1.6', marginBottom: '32px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Connect Voxiq to GoHighLevel for contact sync, call outcome triggers, and pipeline updates.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }} className="features-checklist-grid">
                {[
                  'Contact sync',
                  'Call outcome triggers',
                  'Pipeline updates when connected'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color={C.liveGreen} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', color: C.textMid, fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="integration-featured-actions" style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => navigate('/admin')}
                  style={{
                    background: `linear-gradient(135deg, ${C.breeze}, #5BB8F5)`,
                    color: C.midnight,
                    padding: '16px 36px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Connect GHL
                </button>
                <button
                  onClick={() => setShowGhlSetup(value => !value)}
                  aria-expanded={showGhlSetup}
                  aria-controls="ghl-setup-guide"
                  style={{
                    background: C.white, color: C.textDark,
                    border: '1px solid rgba(10,37,64,.15)',
                    padding: '16px 36px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View setup guide
                </button>
              </div>
              {showGhlSetup && (
                <p id="ghl-setup-guide" style={{ fontSize: '0.95rem', color: C.textMid, lineHeight: '1.6', margin: '24px 0 0' }}>
                  Sign in as an admin, open Integrations in the admin dashboard, and save your GoHighLevel API key to connect your account.
                </p>
              )}

            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 3. Workflow automation and integration availability */}
      <FadeInSection>
        <section style={{ padding: '80px 0', background: C.cream }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: '30px'
            }} className="related-grid integration-cards-grid">

              {/* Zapier */}
              <div id="zapier" className="ib-card-hover integration-simple-card">
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: C.textDark, marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Zapier</h4>
                  <p style={{ fontSize: '0.95rem', color: C.textMid, lineHeight: '1.6', margin: '0 0 20px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Workflow automation via Zapier.
                  </p>
                  <div className="integration-setup-panel">
                    <div style={{ fontWeight: 600 }}>Connect via webhooks</div>
                    <div>Add your Zapier webhook URL under Integrations in the Voxiq admin dashboard to configure workflows based on call outcomes.</div>
                  </div>
                </div>
              </div>

              {availabilityIntegrations.map(integration => (
                <article
                  key={integration.id}
                  id={integration.id}
                  aria-labelledby={`${integration.id}-heading`}
                  className="ib-card-hover integration-simple-card integration-availability-card"
                >
                  <div>
                    <h4 id={`${integration.id}-heading`} style={{ fontSize: '1.25rem', fontWeight: 800, color: C.textDark, marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{integration.name}</h4>
                    <p style={{ fontSize: '0.95rem', color: C.textMid, lineHeight: '1.6', margin: '0 0 20px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{integration.description}</p>
                    <div className="integration-setup-panel integration-availability-panel">
                      <div style={{ fontWeight: 600 }}>Ask about availability</div>
                      <a className="integration-sales-link" href="mailto:sales@voxiq.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', color: C.oceanMid, fontWeight: 600, textDecoration: 'underline' }}>
                        Talk to Sales <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}

            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 4. Bottom Section */}
      <FadeInSection>
        <section className="integrations-bottom-section" style={{
          padding: '100px 0 160px',
          textAlign: 'center',
          background: `linear-gradient(135deg, ${C.oceanDeep} 0%, ${C.oceanMid} 50%, ${C.oceanDeep} 100%)`,
        }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: C.white, marginBottom: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Need a custom integration?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', marginBottom: '32px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Voxiq provides APIs and a REST API for enterprise and custom integration needs.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                style={{
                  background: `linear-gradient(135deg, ${C.breeze}, #5BB8F5)`,
                  color: C.midnight,
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                View API docs
              </button>
              <button
                style={{
                  background: 'transparent', color: C.breeze,
                  border: '1px solid rgba(127,205,255,.3)',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Contact us
              </button>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
