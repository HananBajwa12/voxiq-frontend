import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  Check,
  ArrowRight,
  Zap,
  Phone,
  X,
  ShieldAlert,
  Database,
  Lock
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
  warn: '#F59E0B',
  danger: '#EF4444',
};

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

export default function Collections() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#020D1A', minHeight: '100vh', overflowX: 'hidden', color: '#F1F5F9', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <InjectCardHoverStyles />

      {/* 1. HERO SECTION */}
      <section style={{
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
        background: '#020D1A'
      }}>
        {/* Background Image */}
        <img
          src="/Collection.png"
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
          background: 'linear-gradient(rgba(2, 13, 26, 0.55), rgba(2, 13, 26, 0.55)), radial-gradient(ellipse 70% 60% at 60% 50%, rgba(127,205,255,0.1), transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }} className="hero-grid-solutions">
            <div>
              <span style={{
                color: '#7FCDFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                background: 'rgba(127, 205, 255, 0.1)',
                border: '1px solid rgba(127, 205, 255, 0.2)',
                padding: '6px 16px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#7FCDFF',
                  display: 'inline-block',
                  animation: 'pulse-dot 1.5s infinite'
                }}></span>
                Collections
              </span>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
                fontWeight: 700,
                color: '#F1F5F9',
                letterSpacing: '-0.03em',
                marginBottom: '24px',
                lineHeight: '1.15'
              }}>
                Contact more accounts.<br />
                Recover more revenue.<br />
                Stay compliant.
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: '#CBD5E1',
                lineHeight: '1.7',
                marginBottom: '40px',
                maxWidth: '560px'
              }}>
                Voxiq helps collections teams dramatically increase contact rates with automated dialing, voicemail drops, SMS follow-up, and TCPA compliance tools built for regulated outreach.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: 'none',
                    background: '#7FCDFF',
                    color: '#0A2540',
                    padding: '16px 36px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    boxShadow: '0 8px 24px rgba(127, 205, 255, 0.25)',
                    transition: 'all 0.2s',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#5BB8F5';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(127, 205, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#7FCDFF';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(127, 205, 255, 0.25)';
                  }}
                >
                  Start Free Trial
                </Link>
                <a
                  href="#how-it-works"
                  style={{
                    textDecoration: 'none',
                    background: 'transparent',
                    color: '#94A3B8',
                    border: '1px solid #1e2537',
                    padding: '16px 36px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2e3a4f';
                    e.currentTarget.style.color = '#F1F5F9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1e2537';
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Hero Mockup */}
            <div style={{
              background: '#111929',
              border: '1px solid #1e2537',
              borderRadius: '16px',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(127, 205, 255, 0.08)',
              padding: '24px'
            }} className="hero-mockup-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1e2537', paddingBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B9AB8' }}>Account Outreach HUD</span>
                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Secure</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#020D1A', border: '1px solid #1e2537', borderRadius: '6px', fontSize: '13px' }}>
                  <span>FDCPA Call Window check</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Pass</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#020D1A', border: '1px solid #1e2537', borderRadius: '6px', fontSize: '13px' }}>
                  <span>State Time Restriction check</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section style={{ background: C.breezeLight, padding: '32px 0' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }} className="stats-row">
            {[
              { val: '5x', desc: 'More accounts contacted per agent' },
              { val: 'FDCPA & TCPA', desc: 'Compliance tools built-in' },
              { val: 'SMS + Call', desc: 'Omnichannel outreach' }
            ].map((st, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: C.textDark, margin: '0 0 6px 0', letterSpacing: '-0.03em' }}>{st.val}</h3>
                <p style={{ fontSize: '14px', color: C.textMid, margin: 0 }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PAIN POINTS SECTION */}
      <FadeInSection>
        <section style={{ padding: '80px 0', background: C.oceanMid }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: C.breezeLight, letterSpacing: '-0.02em' }}>The old way of collection is broken</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }} className="benefits-grid">
              {[
                {
                  title: 'Agents spend 70% of their time on unanswered calls',
                  desc: 'Dialing debtors manually and reaching voicemail over and over is the biggest time drain in collections. Agents burn out and productivity collapses.'
                },
                {
                  title: 'Compliance risk is everywhere without the right tools',
                  desc: 'FDCPA and TCPA violations are expensive. Without automated DNC management and call time restrictions, every call is a risk.'
                },
                {
                  title: 'No multichannel follow-up',
                  desc: 'A debtor who won\'t answer a call might respond to a text. Without SMS capability, you\'re leaving recoverable accounts on the table.'
                }
              ].map((p, idx) => (
                <div key={idx} style={{
                  background: 'rgba(2,13,26,.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(127,205,255,.12)',
                  borderLeft: `2px solid ${C.danger}`,
                  borderRadius: '16px',
                  padding: '32px'
                }}>
                  <div style={{ color: C.danger, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <X size={20} />
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Problem</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: C.breezeLight, marginBottom: '12px' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(127,205,255,.65)', lineHeight: '1.7', margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 4. HOW VOXIQ SOLVES IT */}
      <FadeInSection>
        <section style={{ padding: '80px 0', background: C.cream }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: C.textDark, letterSpacing: '-0.02em' }}>How Voxiq solves it</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }} className="benefits-grid">
              {[
                {
                  title: 'High-Volume Auto Dialer',
                  desc: 'Work through accounts 5x faster. Voxiq auto-advances after every call, drops voicemails instantly, and logs every attempt automatically.'
                },
                {
                  title: 'SMS After Every No-Answer',
                  desc: 'When a call goes unanswered, Voxiq automatically sends a compliant SMS follow-up — increasing your contact rate significantly.'
                },
                {
                  title: 'Compliance Automation',
                  desc: 'DNC scrubbing, call time restrictions, consent tracking, and full call recording are built into every Voxiq account.'
                }
              ].map((s, idx) => (
                <div key={idx} className="ib-card-hover" style={{
                  background: C.white,
                  border: '1px solid rgba(10,37,64,.08)',
                  borderLeft: `2px solid ${C.breeze}`,
                  borderRadius: '16px',
                  padding: '32px'
                }}>
                  <div style={{ color: C.oceanMid, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} />
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solution</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: C.textDark, marginBottom: '12px' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: C.textMid, lineHeight: '1.7', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 5. FEATURE DEEP DIVE */}
      <FadeInSection>
        <section id="how-it-works" style={{ padding: '100px 0', background: C.oceanMid }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>

              {/* Section A */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="feature-row">
                <div>
                  <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: C.breezeLight, marginBottom: '20px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                    5x more accounts. Same size team.
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', lineHeight: '1.7', marginBottom: '24px' }}>
                    A collections agent using Voxiq works through 300-400 accounts per day compared to 60-80 with manual dialing. Auto-advance, instant voicemail drop, and automatic call logging means your team spends time on conversations — not admin.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Work through 300-400 accounts daily',
                      'Skip dial tones and no-answers automatically',
                      'One-click voicemail drop',
                      'Immediate call logs and notes',
                      'Auto-advance to next debtor'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Check size={16} color={C.liveGreen} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '15px', color: C.breeze }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{
                  background: 'rgba(2,13,26,.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(127,205,255,.12)',
                  borderRadius: '18px',
                  padding: '24px',
                  boxShadow: '0 24px 48px rgba(0,0,0,.3)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: C.breezeLight }}>Outbound Dialer Queue</span>
                    <span style={{ color: C.breeze, fontSize: '12px', fontWeight: 600 }}>Dialing 34/300</span>
                  </div>
                  <div style={{ background: 'rgba(127,205,255,.04)', border: '1px solid rgba(127,205,255,.08)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'rgba(127,205,255,.65)', marginBottom: '4px' }}>Current Call</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: C.breezeLight }}>Debtor Account #1203</div>
                    <div style={{ fontSize: '12px', color: 'rgba(127,205,255,.65)', marginTop: '4px' }}>Result: No Answer → VM Drop triggered</div>
                  </div>
                </div>
              </div>

              {/* Section B */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="feature-row">
                <div style={{
                  background: 'rgba(2,13,26,.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(127,205,255,.12)',
                  borderRadius: '18px',
                  padding: '24px',
                  boxShadow: '0 24px 48px rgba(0,0,0,.3)',
                  order: 0
                }} className="deep-dive-order-override">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: C.breeze, fontSize: '13px', fontWeight: 600 }}>
                    <Phone size={16} /> Omnichannel Flow
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(127,205,255,.04)', border: '1px solid rgba(127,205,255,.08)', borderRadius: '10px', padding: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(127,205,255,.65)' }}>Consolidated Debtor Inbox</span>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: C.breezeLight, marginTop: '6px' }}>Outgoing SMS:</div>
                    <div style={{ fontSize: '12px', fontStyle: 'italic', color: C.breeze }}>"We tried contacting you regarding account #1203. Click to view settlement options..."</div>
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: C.breezeLight, marginBottom: '20px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                    Omnichannel = more right-party contacts
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', lineHeight: '1.7', marginBottom: '24px' }}>
                    Some debtors won't answer calls but will respond to texts. Voxiq combines outbound calling with automatic SMS follow-up and WhatsApp messaging to maximize your right-party contact rate across every channel.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Instant SMS follow-up on no-answers',
                      'WhatsApp native integration',
                      'Compliant template dispatch',
                      'Consolidated inbox history',
                      'Dynamic custom variable fields'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Check size={16} color={C.liveGreen} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '15px', color: C.breeze }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 6. TESTIMONIAL */}
      <FadeInSection>
        <section style={{ padding: '80px 0', background: C.white }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{
              background: C.breezeLight,
              border: '1px solid rgba(127,205,255,.3)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '20px',
                fontSize: '120px',
                color: C.breeze,
                opacity: 0.25,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none'
              }}>“</span>
              <p style={{
                fontSize: '1.25rem',
                color: C.textDark,
                lineHeight: '1.7',
                fontStyle: 'italic',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1
              }}>
                "We increased our daily contact rate by 340% in the first month. Same agents, same accounts — just Voxiq instead of manual dialing. Recovery revenue is up significantly."
              </p>
              <div style={{ fontWeight: 600, color: C.textDark, fontSize: '15px' }}>Operations Manager</div>
              <div style={{ color: C.textMid, fontSize: '13px', marginTop: '4px' }}>Collections Agency</div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,229,160,.1)',
                border: '1px solid rgba(0,229,160,.25)',
                color: '#0A9A6E',
                fontSize: '13px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '20px',
                marginTop: '24px'
              }}>
                ✓ +340% daily contact rate increase
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 7. INTEGRATIONS */}
      <section style={{ padding: '80px 0', background: C.foam }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '32px' }}>
            Sync accounts from your databases
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '32px', opacity: 0.85 }}>
            {['SQL Database', 'Zapier', 'Twilio'].map((stack, i) => (
              <span key={i} style={{ fontSize: '18px', fontWeight: 700, color: C.textMid }}>{stack}</span>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: C.textMid, maxWidth: '560px', margin: '0 auto' }}>
            Secure API connectors for custom ledger management platforms.
          </p>
        </div>
      </section>

      {/* 8. BOTTOM CTA */}
      <FadeInSection>
        <section style={{
          padding: '100px 0 160px',
          background: `linear-gradient(135deg, ${C.oceanDeep} 0%, ${C.oceanMid} 50%, ${C.oceanDeep} 100%)`,
        }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <div style={{
              background: 'rgba(2,13,26,.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(127,205,255,.12)',
              borderRadius: '24px',
              padding: '60px 40px',
              boxShadow: '0 24px 48px rgba(0,0,0,.3)',
              maxWidth: '900px',
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: C.white, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Maximize account recovery today — free for 14 days
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                No credit card. Full access. Cancel anytime.
              </p>
              <Link
                to="/signup"
                style={{
                  background: `linear-gradient(135deg, ${C.breeze}, #5BB8F5)`,
                  color: C.midnight,
                  padding: '16px 40px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: `0 0 24px rgba(127,205,255,.28), 0 8px 24px rgba(127,205,255,.18)`,
                  display: 'inline-block',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
