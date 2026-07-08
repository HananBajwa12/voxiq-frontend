import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const C = {
  midnight: '#020D1A',
  oceanDeep: '#0A2540',
  oceanMid: '#0D3B6E',
  breeze: '#7FCDFF',
  breezeLight: '#DFF7FF',
  foam: '#F0FBFF',
  cream: '#FFFDF5',
  creamMid: '#FFF8E7',
  white: '#FFFFFF',
  textDark: '#0A2540',
  textMid: '#2D5986',
  textMuted: '#6B9AB8',
  liveGreen: '#00E5A0',
  purple: '#7C6DFA',
  warn: '#F59E0B',
  danger: '#EF4444',
};

// Custom fade animation wrapper for sections
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

// Stateful FAQ Accordion Item with premium dark styling
function FaqAccordionItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div style={{
      background: isOpen ? '#F8FAFC' : '#FFFFFF',
      border: isOpen ? '1px solid rgba(108, 71, 255, 0.3)' : '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '16px',
      transition: 'all 0.3s ease',
      boxShadow: isOpen ? '0 10px 25px rgba(108, 71, 255, 0.05)' : 'none'
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#F1F5F9',
          fontWeight: 600,
          fontSize: '1.15rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: 0
        }}
      >
        <span style={{ paddingRight: '24px' }}>{question}</span>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#6C47FF',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          ref={contentRef}
          style={{
            paddingTop: '12px',
            color: '#6B9AB8',
            fontSize: '0.975rem',
            lineHeight: '1.6',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // Q1 open by default
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth price transition trigger
  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly');
      setIsTransitioning(false);
    }, 150);
  };

  const isMobile = windowWidth < 768;
  const isDesktop = windowWidth >= 1024;
  const [seats, setSeats] = useState({ basic: 1, pro: 1, business: 1, enterprise: 1 });

  // Exact pricing math
  const priceStarter = billingCycle === 'annual' ? 39 : 49;
  const priceGrowth = billingCycle === 'annual' ? 79 : 99;

  // Comparison Matrix Data
  const comparisonFeatures = [
    { name: 'Power dialer', starter: '✓', growth: '✓', enterprise: '✓' },
    { name: 'Unlimited calls/day', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'SMS messaging', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'Voicemail drop', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'Live call coaching', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'AI call insights', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'CRM integration', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'Advanced analytics', starter: '—', growth: '✓', enterprise: '✓' },
    { name: 'API access', starter: '—', growth: '—', enterprise: '✓' },
    { name: 'SSO / SAML', starter: '—', growth: '—', enterprise: '✓' },
    { name: 'Dedicated account manager', starter: '—', growth: '—', enterprise: '✓' },
    { name: 'Custom integrations', starter: '—', growth: '—', enterprise: '✓' },
    { name: 'SLA guarantee', starter: '—', growth: '—', enterprise: '✓' },
    { name: '24/7 phone support', starter: '—', growth: '—', enterprise: '✓' }
  ];

  return (
    <div style={{ background: C.midnight, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* SECTION 1 — PAGE HEADER */}
      <section style={{ padding: '100px 0 60px', background: `radial-gradient(circle at 50% -20%, rgba(127, 205, 255, 0.1) 0%, ${C.midnight} 70%), ${C.midnight}`, textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <span style={{
            color: C.breeze,
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            display: 'inline-block',
            marginBottom: '16px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>
            PRICING
          </span>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#F1F5F9',
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>
            Simple pricing. No surprises.
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#6B9AB8',
            maxWidth: '650px',
            margin: '0 auto 40px',
            lineHeight: '1.6',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>
            14-day free trial on all plans. No credit card required. Cancel anytime.
          </p>

          {/* Toggle Switch */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: billingCycle === 'monthly' ? 600 : 500, color: billingCycle === 'monthly' ? '#F1F5F9' : '#64748B', transition: 'color 0.2s', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Monthly</span>

            <button
              onClick={handleToggle}
              style={{
                width: '64px',
                height: '34px',
                borderRadius: '999px',
                background: C.breeze,
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                padding: '4px',
                transition: 'background 0.3s'
              }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '4px',
                left: billingCycle === 'annual' ? '34px' : '4px',
                transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
              }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: billingCycle === 'annual' ? 600 : 500, color: billingCycle === 'annual' ? '#F1F5F9' : '#64748B', transition: 'color 0.2s', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Annual</span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '999px',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>
                Save 10%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THREE PRICING CARDS */}
      <section style={{ padding: '40px 0 80px', background: C.breezeLight }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr', gap: '24px', alignItems: 'stretch' }}>

            {[
              {
                id: 'basic',
                name: 'Basic',
                desc: 'Unlimited calling per seat',
                monthlyPrice: 24.99,
                annualSeatMonthly: 22.49,
                annualTotalPerSeat: 269.89,
                dot: '#0D3B6E',
                popular: false,
                buttonText: 'Start Free Trial',
                features: [
                  { inc: true, text: '7-Day Free Trial Included' },
                  { inc: true, text: 'Unlimited Outbound & Inbound Calls' },
                  { inc: true, text: 'Per-seat pricing' },
                  { inc: true, text: 'Call History & Analytics' },
                  { inc: false, text: 'SMS' },
                  { inc: false, text: 'Call Recordings' },
                  { inc: false, text: 'WhatsApp' },
                  { inc: false, text: 'AI Insights' }
                ]
              },
              {
                id: 'pro',
                name: 'Pro',
                desc: 'Calls + SMS + Recordings',
                monthlyPrice: 39.99,
                annualSeatMonthly: 35.99,
                annualTotalPerSeat: 431.89,
                dot: '#7FCDFF',
                popular: true,
                buttonText: 'Start Free Trial',
                features: [
                  { inc: true, text: '7-Day Free Trial Included' },
                  { inc: true, text: 'Everything in Basic' },
                  { inc: true, text: 'SMS Messaging' },
                  { inc: true, text: 'Call Recordings' },
                  { inc: true, text: 'Advanced Analytics' },
                  { inc: false, text: 'WhatsApp' },
                  { inc: false, text: 'AI Insights' }
                ]
              },
              {
                id: 'business',
                name: 'Business',
                desc: 'Full-featured platform',
                monthlyPrice: 69.99,
                annualSeatMonthly: 62.99,
                annualTotalPerSeat: 755.89,
                dot: '#f59e0b',
                popular: false,
                buttonText: 'Start Free Trial',
                features: [
                  { inc: true, text: '7-Day Free Trial Included' },
                  { inc: true, text: 'Everything in Pro' },
                  { inc: true, text: 'WhatsApp Messaging' },
                  { inc: true, text: 'AI Call Insights' },
                  { inc: true, text: 'Priority Support' }
                ]
              },
              {
                id: 'enterprise',
                name: 'Enterprise',
                desc: 'Custom for large teams',
                dot: '#64748B',
                popular: false,
                buttonText: 'Contact Sales',
                features: [
                  { inc: true, text: 'Everything in Business' },
                  { inc: true, text: 'Custom Seat Limit' },
                  { inc: true, text: 'Dedicated Account Manager' },
                  { inc: true, text: 'SLA & Custom Integrations' }
                ]
              }
            ].map((plan, i) => {
              const isPopular = plan.popular;
              const isCustom = plan.monthlyPrice === undefined;
              const isAnnual = typeof pricingAnnual !== 'undefined' ? pricingAnnual : (typeof billingCycle !== 'undefined' ? billingCycle === 'annual' : false);
              let displayPriceTop = 'Talk to Sales';
              let priceSuffix = '';
              let displaySubtext = '';
              const planSeats = typeof seats !== 'undefined' ? (seats[plan.id] || 1) : 1;

              if (!isCustom) {
                if (isAnnual) {
                  const total = (plan.annualTotalPerSeat * planSeats).toFixed(2);
                  displayPriceTop = `$${total}`;
                  priceSuffix = '/mo';
                  displaySubtext = `$${plan.annualSeatMonthly}/seat/mo × ${planSeats} seat${planSeats > 1 ? 's' : ''}`;
                } else {
                  const total = (plan.monthlyPrice * planSeats).toFixed(2);
                  displayPriceTop = `$${total}`;
                  priceSuffix = '/mo';
                  displaySubtext = `$${plan.monthlyPrice}/seat/mo × ${planSeats} seat${planSeats > 1 ? 's' : ''}`;
                }
              }

              const cardContent = (
                <div style={{
                  background: isPopular ? `linear-gradient(135deg, ${C.oceanDeep} 0%, ${C.oceanMid} 50%, ${C.oceanDeep} 100%)` : C.white,
                  border: isPopular ? `2px solid rgba(127, 205, 255, 0.2)` : '1px solid rgba(10, 37, 64, 0.08)',
                  borderRadius: '20px',
                  padding: '40px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: isPopular ? '0 15px 35px rgba(13, 59, 110, 0.35)' : '0 10px 30px rgba(10, 37, 64, 0.04)'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = isPopular ? '0 25px 50px rgba(13, 59, 110, 0.5)' : '0 20px 40px rgba(10, 37, 64, 0.08)';
                    if (!isPopular) e.currentTarget.style.borderColor = '#0D3B6E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isPopular ? '0 15px 35px rgba(13, 59, 110, 0.35)' : '0 10px 30px rgba(10, 37, 64, 0.04)';
                    if (!isPopular) e.currentTarget.style.borderColor = 'rgba(10, 37, 64, 0.08)';
                  }}
                >
                  {isPopular && (
                    <div style={{
                      position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)',
                      background: `linear-gradient(135deg, ${C.breeze} 0%, #5BB8F5 100%)`,
                      color: C.midnight, border: '1px solid rgba(127,205,255,0.3)',
                      padding: '6px 18px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap'
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: plan.dot, display: 'inline-block' }} />
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{plan.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(223,247,255,0.7)' : '#475569', marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '40px' }}>{plan.desc}</p>

                    <div style={{
                      display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', minHeight: '44px'
                    }}>
                      {isCustom ? (
                        <span style={{ fontSize: '2.2rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                          Talk to Sales
                        </span>
                      ) : (
                        <>
                          <span style={{ fontSize: '2.8rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                            {displayPriceTop}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: isPopular ? 'rgba(223,247,255,0.7)' : '#475569', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{priceSuffix}</span>
                        </>
                      )}
                    </div>
                    {displaySubtext ? (
                      <div style={{ fontSize: '0.85rem', color: isPopular ? '#00E5A0' : '#10B981', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {displaySubtext}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: 'transparent', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ fontSize: '0.78rem', color: isPopular ? '#7FCDFF' : '#0D3B6E', fontWeight: 600, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        7-day free trial · cancel anytime
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: 'transparent', fontWeight: 600, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', padding: '6px 0px', borderRadius: '8px', marginBottom: '24px', border: 'none' }}>
                        <span style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(223,247,255,0.9)' : '#475569', fontWeight: 600 }}>Seats</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isPopular ? 'rgba(255,255,255,0.1)' : '#F1F5F9', padding: '6px 12px', borderRadius: '6px', border: isPopular ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E2E8F0' }}>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: isPopular ? '#FFFFFF' : '#0A2540', padding: '0 4px', userSelect: 'none' }} onClick={() => planSeats > 1 && setSeats(prev => ({ ...prev, [plan.id]: prev[plan.id] - 1 }))}>-</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', minWidth: '16px', textAlign: 'center' }}>{planSeats}</span>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: isPopular ? '#FFFFFF' : '#0A2540', padding: '0 4px', userSelect: 'none' }} onClick={() => setSeats(prev => ({ ...prev, [plan.id]: prev[plan.id] + 1 }))}>+</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: '24px', height: '36px', borderBottom: isPopular ? '1px solid rgba(127,205,255,0.15)' : '1px solid rgba(10,37,64,0.08)' }}></div>
                    )}

                    <div style={{ paddingTop: '20px', marginBottom: '32px', borderTop: isPopular ? '1px solid rgba(127,205,255,0.15)' : '1px solid rgba(10,37,64,0.08)' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} style={{
                            display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem',
                            color: feat.inc ? (isPopular ? 'rgba(223,247,255,0.9)' : '#334155') : (isPopular ? 'rgba(223,247,255,0.5)' : '#94A3B8'),
                            fontWeight: feat.inc ? 500 : 400, fontFamily: "'Plus Jakarta Sans', sans-serif"
                          }}>
                            <span style={{
                              color: feat.inc ? C.liveGreen : C.danger,
                              fontWeight: 700, fontSize: '1rem', flexShrink: 0
                            }}>
                              {feat.inc ? '✓' : '✗'}
                            </span>
                            {feat.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => { typeof navigate !== 'undefined' ? navigate('/signup?plan=' + plan.id) : window.location.href = '/signup?plan=' + plan.id }}
                    style={{
                      width: '100%',
                      background: isPopular ? `linear-gradient(135deg, ${C.breeze}, #5BB8F5)` : 'transparent',
                      color: isPopular ? C.midnight : C.textDark,
                      border: isPopular ? 'none' : `1.5px solid rgba(10, 37, 64, 0.15)`,
                      padding: '14px 24px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isPopular ? `0 4px 15px rgba(127,205,255,0.2)` : 'none',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.boxShadow = `0 6px 24px rgba(127,205,255,0.4)`;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      } else {
                        e.currentTarget.style.background = C.textDark;
                        e.currentTarget.style.color = C.white;
                        e.currentTarget.style.borderColor = C.textDark;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.boxShadow = `0 4px 15px rgba(127,205,255,0.2)`;
                        e.currentTarget.style.transform = 'translateY(0)';
                      } else {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = C.textDark;
                        e.currentTarget.style.borderColor = 'rgba(10, 37, 64, 0.15)';
                      }
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );

              return (<FadeInSection key={plan.id}> {cardContent} </FadeInSection>);
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — BOTTOM CTA */}
      <FadeInSection>
        <section style={{ paddingTop: '100px', paddingBottom: '200px', background: `linear-gradient(135deg, ${C.oceanDeep} 0%, ${C.oceanMid} 50%, ${C.oceanDeep} 100%)`, borderTop: `1px solid rgba(127,205,255,0.1)` }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{
              background: C.breezeLight,
              border: `1px solid rgba(127,205,255,0.4)`,
              borderRadius: '24px',
              padding: '80px 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)'
            }}>
              {/* Background abstract radial details */}
              <div style={{
                position: 'absolute',
                top: '-40%',
                left: '-20%',
                width: '400px',
                height: '400px',
                background: 'rgba(127, 205, 255, 0.05)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-40%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'rgba(127, 205, 255, 0.05)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                pointerEvents: 'none'
              }} />

              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: C.textDark,
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                position: 'relative',
                zIndex: 1,
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>
                Still not sure? Try free for 14 days.
              </h2>

              <p style={{
                fontSize: '1.2rem',
                color: C.textMid,
                maxWidth: '650px',
                margin: '0 auto 40px',
                lineHeight: '1.6',
                position: 'relative',
                zIndex: 1,
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>
                Full access to Growth plan features. No credit card. No commitment.
              </p>

              <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }} className="cta-buttons">
                <Link
                  to="/signup?plan=growth"
                  style={{
                    textDecoration: 'none',
                    background: C.oceanDeep,
                    color: C.white,
                    padding: '18px 38px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    boxShadow: `0 8px 24px rgba(10,37,64,0.15)`,
                    transition: 'all 0.2s',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textAlign: 'center',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 12px 28px rgba(10,37,64,0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(10,37,64,0.15)`;
                  }}
                >
                  Start Free Trial
                </Link>
                <button
                  onClick={() => navigate('/signup?plan=enterprise')}
                  style={{
                    background: 'transparent',
                    color: C.oceanDeep,
                    border: `1.5px solid ${C.oceanDeep}`,
                    padding: '18px 38px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.oceanDeep;
                    e.currentTarget.style.color = C.white;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = C.oceanDeep;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* FOOTER */}
      <Footer />

      {/* Global CSS elements and responsive support overrides */}
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 968px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 0 10px;
          }
          .pricing-grid > div:nth-child(2) {
            transform: scale(1) !important;
            order: -1; /* Keep most popular Growth first on mobile lists */
            margin-bottom: 12px;
          }
          .pricing-grid > div:hover {
            transform: translateY(-4px) !important;
          }
          .cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .cta-buttons > * {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
