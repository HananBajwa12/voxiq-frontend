const fs = require('fs');

const origContent = fs.readFileSync('original_Home.jsx', 'utf8');

// The original file has:
// SECTION 6 — HOW IT WORKS
// SECTION 7 — PRICING
// SECTION 8 — TESTIMONIALS

// Let's get the content up to SECTION 7
const section7Start = origContent.indexOf('SECTION 7 — PRICING');
let beforePricing = origContent.substring(0, section7Start);

// Let's get the content from SECTION 8
const section8Start = origContent.indexOf('SECTION 8 — TESTIMONIALS');
let afterPricing = origContent.substring(section8Start);

// Let's construct the new SECTION 7 — PRICING
const newPricingSection = `SECTION 7 — PRICING
          ================================================================ */}
      <section style={{ padding: '80px 0', background: '#020D1A' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#F1F5F9', marginBottom: '20px', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                Simple pricing. No surprises.
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#6B9AB8', maxWidth: '600px', margin: '0 auto', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Start calling for free. Upgrade when you need more power.
              </p>
              
              {/* Billing Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
                <span style={{ fontSize: '0.95rem', color: !pricingAnnual ? '#FFFFFF' : '#64748B', fontWeight: !pricingAnnual ? 600 : 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Monthly</span>
                <button
                  onClick={() => setPricingAnnual(!pricingAnnual)}
                  style={{
                    width: '56px',
                    height: '32px',
                    background: pricingAnnual ? '#10B981' : '#1E293B',
                    borderRadius: '100px',
                    position: 'relative',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: 0,
                    transition: 'background 0.3s'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: pricingAnnual ? '28px' : '3px',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
                <span style={{ fontSize: '0.95rem', color: pricingAnnual ? '#FFFFFF' : '#64748B', fontWeight: pricingAnnual ? 600 : 500, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Annually
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
                    Save 20%
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr', gap: '24px', alignItems: 'stretch' }}>

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
                  displayPriceTop = \`$\${total}\`;
                  priceSuffix = '/mo';
                  displaySubtext = \`$\${plan.annualSeatMonthly}/seat/mo × \${planSeats} seat\${planSeats > 1 ? 's' : ''}\`;
                } else {
                  const total = (plan.monthlyPrice * planSeats).toFixed(2);
                  displayPriceTop = \`$\${total}\`;
                  priceSuffix = '/mo';
                  displaySubtext = \`$\${plan.monthlyPrice}/seat/mo × \${planSeats} seat\${planSeats > 1 ? 's' : ''}\`;
                }
              }

              const cardContent = (
                <div style={{
                  background: isPopular ? 'linear-gradient(135deg, rgb(13, 59, 110) 0%, rgb(26, 79, 160) 50%, rgb(15, 76, 138) 100%)' : '#FFFFFF',
                  border: isPopular ? '2px solid rgba(127, 205, 255, 0.2)' : '1px solid rgba(10, 37, 64, 0.08)',
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
                      background: 'linear-gradient(135deg, rgb(13, 59, 110) 0%, rgb(26, 79, 160) 50%, rgb(15, 76, 138) 100%)',
                      color: '#DFF7FF', border: '1px solid rgba(127,205,255,0.3)',
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
                              color: feat.inc ? (isPopular ? '#00E5A0' : '#10B981') : '#EF4444',
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
                      background: isPopular ? 'rgb(223, 247, 255)' : 'rgb(223, 247, 255)',
                      color: '#0A2540',
                      border: isPopular ? 'none' : '1.5px solid rgba(10, 37, 64, 0.15)',
                      padding: '14px 24px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isPopular ? '0 4px 15px rgba(223,247,255,0.15)' : 'none',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(223,247,255,0.3)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      } else {
                        e.currentTarget.style.background = '#0A2540';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#0A2540';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = 'rgb(223, 247, 255)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(223,247,255,0.15)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      } else {
                        e.currentTarget.style.background = 'rgb(223, 247, 255)';
                        e.currentTarget.style.color = '#0A2540';
                        e.currentTarget.style.borderColor = 'rgba(10, 37, 64, 0.15)';
                      }
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );

              return (<Reveal delay={0.1 * (i + 1)} key={plan.id}> {cardContent} </Reveal>);
            })}
          </div>
        </div>
      </section>

      {/* `;

const finalContent = beforePricing + newPricingSection + afterPricing;

fs.writeFileSync('src/pages/Home.jsx', finalContent);
console.log("Successfully rebuilt Home.jsx with original How It Works + new 4-card Light Theme Pricing!");
