import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  Check,
  ArrowRight,
  Zap,
  Phone,
  X,
  Target,
  Users,
  TrendingUp
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

export default function SmallBusiness() {
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
          src="/Small Busines.png"
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
                Small Business
              </span>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
                fontWeight: 700,
                color: '#F1F5F9',
                letterSpacing: '-0.03em',
                marginBottom: '24px',
                lineHeight: '1.15'
              }}>
                Enterprise-grade calling. Small business pricing.
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: '#CBD5E1',
                lineHeight: '1.7',
                marginBottom: '40px',
                maxWidth: '560px'
              }}>
                Voxiq gives lean teams the calling power of a call center — without the overhead, long contracts, or IT department.
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B9AB8' }}>Setup Progress</span>
                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Ready</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#020D1A', border: '1px solid #1e2537', borderRadius: '6px', fontSize: '13px' }}>
                  <span>Time to go live</span>
                  <span style={{ color: '#7FCDFF', fontWeight: 600 }}>8 min</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#020D1A', border: '1px solid #1e2537', borderRadius: '6px', fontSize: '13px' }}>
                  <span>Setup fees</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>$0</span>
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
              { val: '$0', desc: 'Setup fees' },
              { val: '< 10 min', desc: 'To get up and running' },
              { val: 'Cancel', desc: 'Anytime, no contracts' }
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
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: C.breezeLight, letterSpacing: '-0.02em' }}>What's holding your small team back?</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }} className="benefits-grid">
              {[
                {
                  title: 'Call center tools are built for 500 seats, not 5',
                  desc: 'Enterprise dialers come with enterprise price tags, long contracts, and setup that takes weeks you don\'t have.'
                },
                {
                  title: 'Every missed call is a customer you can\'t afford to lose',
                  desc: 'With a small team, there\'s no backup line. A missed call at the wrong moment can mean a lost sale for good.'
                },
                {
                  title: 'You don\'t have an IT team to run a phone system',
                  desc: 'Complicated PBX setups and hardware requirements aren\'t realistic when it\'s just you and a handful of people.'
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
                  title: 'Affordable Per-Seat Pricing',
                  desc: 'Pay only for the seats you use, with no setup fees and no long-term contracts. Scale up or down anytime.'
                },
                {
                  title: 'Simple Setup, No IT Needed',
                  desc: 'Get your number, your team, and your first call live in under 10 minutes — no hardware, no PBX specialist.'
                },
                {
                  title: 'Never Miss a Call',
                  desc: 'Smart routing, voicemail, and instant SMS follow-up make sure every lead gets a response, even when you\'re busy.'
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
                    Go live in under 10 minutes, no IT required
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', lineHeight: '1.7', marginBottom: '24px' }}>
                    Pick a number, invite your team, and you're ready to call. No hardware to install, no PBX configuration, no waiting on a technician. Voxiq runs entirely in the browser.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Instant number provisioning',
                      'Browser-based — no hardware needed',
                      'Add or remove seats anytime',
                      'No setup fees, no annual contract',
                      'Free onboarding support'
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
                    <span style={{ fontSize: '13px', fontWeight: 600, color: C.breezeLight }}>Quick Setup Wizard</span>
                    <span style={{ background: 'rgba(0,229,160,.1)', color: C.liveGreen, padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Step 3 of 3</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(127,205,255,.04)', border: '1px solid rgba(127,205,255,.08)', borderRadius: '6px', fontSize: '13px', color: C.breezeLight }}>
                      <span>Business number</span>
                      <span style={{ color: C.breeze, fontWeight: 600 }}>Ready</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(127,205,255,.04)', border: '1px solid rgba(127,205,255,.08)', borderRadius: '6px', fontSize: '13px', color: C.breezeLight }}>
                      <span>Team invited</span>
                      <span style={{ color: C.liveGreen, fontWeight: 600 }}>3/3</span>
                    </div>
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
                    <Phone size={16} /> Missed Call Follow-Up
                  </div>
                  <div style={{ background: 'rgba(127,205,255,.04)', border: '1px solid rgba(127,205,255,.08)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: C.breezeLight }}>Missed call: +1 (415) 555-0182</span>
                      <span style={{ fontSize: '11px', color: C.breeze, background: 'rgba(127,205,255,.1)', padding: '2px 6px', borderRadius: '4px' }}>Auto-texted</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(127,205,255,.65)', lineHeight: '1.4' }}>
                      "Sorry we missed you! We'll call you back shortly — reply here anytime."
                    </div>
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: C.breezeLight, marginBottom: '20px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                    Never let a missed call become a lost customer
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', lineHeight: '1.7', marginBottom: '24px' }}>
                    Every missed call automatically triggers a follow-up text, so customers know you'll be right with them — even if you're mid-job or with another client.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Automatic missed-call text-back',
                      'Simple call routing to any team member',
                      'Voicemail transcription sent to your inbox',
                      'Two-way SMS from your business number',
                      'Works on your phone, laptop, or tablet'
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
                "We're a team of four. We didn't need — or want — an enterprise phone system. Voxiq took 10 minutes to set up and we haven't missed a customer call since."
              </p>
              <div style={{ fontWeight: 600, color: C.textDark, fontSize: '15px' }}>Owner</div>
              <div style={{ color: C.textMid, fontSize: '13px', marginTop: '4px' }}>Local Service Business</div>

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
                ✓ Live in 10 minutes, zero missed calls since
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 7. INTEGRATIONS */}
      <section style={{ padding: '80px 0', background: C.foam }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '32px' }}>
            Natively connects with your tech stack
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '32px', opacity: 0.85 }}>
            {['Google Calendar', 'QuickBooks', 'Zapier'].map((stack, i) => (
              <span key={i} style={{ fontSize: '18px', fontWeight: 700, color: C.textMid }}>{stack}</span>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: C.textMid, maxWidth: '560px', margin: '0 auto' }}>
            Native API support to fit the tools you already run your business on.
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
                Get enterprise calling power today — free for 14 days
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(127,205,255,.65)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                No credit card. No setup fees. Cancel anytime.
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
