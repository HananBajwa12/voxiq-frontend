          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr', gap: 24, alignItems: 'stretch' }}>
            {[
              {
                id: 'basic',
                name: 'Basic',
                desc: 'Unlimited calling per seat',
                price: pricingAnnual ? '$19.99' : '$24.99',
                calc: pricingAnnual ? '$19.99/seat/mo × 1 seat' : '$24.99/seat/mo × 1 seat',
                dot: '#3b82f6',
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
                price: pricingAnnual ? '$31.99' : '$39.99',
                calc: pricingAnnual ? '$31.99/seat/mo × 1 seat' : '$39.99/seat/mo × 1 seat',
                dot: '#8b5cf6',
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
                price: pricingAnnual ? '$55.99' : '$69.99',
                calc: pricingAnnual ? '$55.99/seat/mo × 1 seat' : '$69.99/seat/mo × 1 seat',
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
                price: 'Talk to Sales',
                calc: '',
                dot: '#10b981',
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
              return (
                <Reveal delay={0.1 * (i + 1)} key={plan.id}>
                  <div style={{
                    background: isPopular ? 'linear-gradient(135deg, rgb(13, 59, 110) 0%, rgb(26, 79, 160) 50%, rgb(15, 76, 138) 100%)' : '#FFFFFF',
                    border: isPopular ? '2px solid rgba(127, 205, 255, 0.2)' : '1px solid rgba(10, 37, 64, 0.08)',
                    borderRadius: '20px',
                    padding: isPopular ? '44px 20px 40px' : '40px 20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    boxShadow: isPopular ? '0 15px 35px rgba(13, 59, 110, 0.35)' : '0 10px 30px rgba(10, 37, 64, 0.04)',
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
                        color: '#DFF7FF', border: '1px solid rgba(127,205,255,0.3)', padding: '6px 18px', borderRadius: '999px',
                        fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap'
                      }}>Most Popular</div>
                    )}

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: plan.dot, display: 'inline-block' }} />
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{plan.name}</h3>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(223,247,255,0.7)' : '#475569', marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '40px' }}>{plan.desc}</p>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', minHeight: '44px' }}>
                        {plan.price === 'Talk to Sales' ? (
                          <span style={{ fontSize: '2.2rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>Talk to Sales</span>
                        ) : (
                          <>
                            <span style={{ fontSize: '2.8rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>{plan.price}</span>
                            <span style={{ fontSize: '0.9rem', color: isPopular ? 'rgba(223,247,255,0.7)' : '#475569', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>/mo</span>
                          </>
                        )}
                      </div>
                      {plan.calc ? (
                        <div style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(223,247,255,0.5)' : '#94A3B8', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {plan.calc}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.85rem', color: 'transparent', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                      )}
                      
                      {plan.price !== 'Talk to Sales' ? (
                        <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          7-day free trial · cancel anytime
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.78rem', color: 'transparent', fontWeight: 700, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                      )}

                      {/* Seats Selector */}
                      {plan.price !== 'Talk to Sales' ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isPopular ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', padding: '6px 12px', borderRadius: '8px', marginBottom: '24px' }}>
                          <span style={{ fontSize: '0.85rem', color: isPopular ? '#DFF7FF' : '#475569' }}>Seats</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isPopular ? 'rgba(255,255,255,0.1)' : '#FFFFFF', padding: '4px 8px', borderRadius: '6px', border: isPopular ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E2E8F0' }}>
                            <span style={{ fontSize: '1rem', cursor: 'pointer', color: isPopular ? '#FFFFFF' : '#0A2540' }}>-</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isPopular ? '#FFFFFF' : '#0A2540' }}>1</span>
                            <span style={{ fontSize: '1rem', cursor: 'pointer', color: isPopular ? '#FFFFFF' : '#0A2540' }}>+</span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginBottom: '24px', height: '36px' }}></div>
                      )}

                      <div style={{ borderTop: isPopular ? '1px solid rgba(127,205,255,0.15)' : '1px solid rgba(10,37,64,0.08)', paddingTop: '20px', marginBottom: '32px' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {plan.features.map((feat, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: isPopular ? 'rgba(223,247,255,0.9)' : (feat.inc ? '#334155' : '#94A3B8'), fontWeight: feat.inc ? 500 : 400, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              <span style={{ color: feat.inc ? '#10B981' : '#CBD5E1', fontWeight: 700, fontSize: '1rem', flexShrink: 0, opacity: feat.inc ? 1 : (isPopular ? 0.3 : 0.6) }}>
                                {feat.inc ? '✓' : '✗'}
                              </span>
                              {feat.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/signup?plan=' + plan.id)}
                      style={{
                        width: '100%',
                        background: isPopular ? 'rgb(223, 247, 255)' : 'transparent',
                        color: isPopular ? '#0A2540' : '#0D3B6E',
                        border: isPopular ? 'none' : '1.5px solid rgba(10, 37, 64, 0.15)',
                        padding: '14px 24px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        boxShadow: isPopular ? '0 4px 15px rgba(223,247,255,0.15)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (isPopular) {
                          e.currentTarget.style.background = '#FFFFFF';
                          e.currentTarget.style.boxShadow = '0 6px 24px rgba(223,247,255,0.3)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        } else {
                          e.currentTarget.style.borderColor = '#0D3B6E';
                          e.currentTarget.style.background = 'rgba(10, 37, 64, 0.04)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isPopular) {
                          e.currentTarget.style.background = 'rgb(223, 247, 255)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(223,247,255,0.15)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        } else {
                          e.currentTarget.style.borderColor = 'rgba(10, 37, 64, 0.15)';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
