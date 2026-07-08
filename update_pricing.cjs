const fs = require('fs');

let content = fs.readFileSync('src/pages/Pricing.jsx', 'utf8');

// Add seats state to Pricing.jsx
if (!content.includes('const [seats, setSeats]')) {
  content = content.replace(
    /const \[isTransitioning, setIsTransitioning\] = useState\(false\);/,
    "const [isTransitioning, setIsTransitioning] = useState(false);\n  const [seats, setSeats] = useState(1);"
  );
}

const cardsGridStart = "          <div style={{\n            display: 'grid',\n            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',\n            gap: '24px',\n            alignItems: 'stretch'\n          }} className=\"pricing-grid\">";
const cardsGridEnd = "          </div>"; 

const startIndex = content.indexOf("          <div style={{\n            display: 'grid',\n            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',");

let endIndex = content.indexOf("          </div>\n        </div>\n      </section>", startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find cards grid boundaries in Pricing.jsx");
  process.exit(1);
}

const newCardsCode = `          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '24px',
            alignItems: 'stretch'
          }} className="pricing-grid">
            {[
              {
                id: 'basic',
                name: 'Basic',
                desc: 'Unlimited calling per seat',
                monthlyPrice: 24.99,
                annualSeatMonthly: 22.49,
                annualTotalPerSeat: 269.89,
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
                monthlyPrice: 39.99,
                annualSeatMonthly: 35.99,
                annualTotalPerSeat: 431.89,
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
              const isCustom = plan.monthlyPrice === undefined;
              let displayPriceTop = 'Talk to Sales';
              let priceSuffix = '';
              let displaySubtext = '';
              const isAnnual = billingCycle === 'annual';
              
              if (!isCustom) {
                if (isAnnual) {
                  const total = (plan.annualTotalPerSeat * seats).toFixed(2);
                  displayPriceTop = \`$\${total}\`;
                  priceSuffix = '/yr';
                  displaySubtext = \`$\${plan.annualSeatMonthly}/seat/mo (billed annually) × \${seats} seat\${seats > 1 ? 's' : ''}\`;
                } else {
                  const total = (plan.monthlyPrice * seats).toFixed(2);
                  displayPriceTop = \`$\${total}\`;
                  priceSuffix = '/mo';
                  displaySubtext = \`$\${plan.monthlyPrice}/seat/mo × \${seats} seat\${seats > 1 ? 's' : ''}\`;
                }
              }

              return (
                <div key={plan.id} style={{
                  background: isPopular ? '#0D3B6E' : '#020D1A',
                  border: isPopular ? '2px solid rgba(127, 205, 255, 0.25)' : '1px solid rgba(127,205,255,0.08)',
                  borderRadius: '16px',
                  padding: isPopular ? '32px 20px' : '32px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.5), 0 0 40px rgba(127,205,255,0.08)' : '0 20px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {isPopular && (
                    <div style={{
                      position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)',
                      background: '#0D3B6E', border: '1px solid rgba(127, 205, 255, 0.35)', color: '#7FCDFF',
                      padding: '6px 18px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap'
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: plan.dot, display: 'inline-block' }} />
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: isPopular ? '#FFFFFF' : '#F1F5F9', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(127,205,255,0.7)' : '#6B9AB8', marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '40px' }}>{plan.desc}</p>
                    
                    <div style={{ 
                      display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', minHeight: '44px',
                      opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease'
                    }}>
                      {isCustom ? (
                        <span style={{ fontSize: '2.2rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#F1F5F9', letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Talk to Sales
                        </span>
                      ) : (
                        <>
                          <span style={{ fontSize: '2.8rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#F1F5F9', letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {displayPriceTop}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: isPopular ? 'rgba(127,205,255,0.7)' : '#6B9AB8', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{priceSuffix}</span>
                        </>
                      )}
                    </div>
                    {displaySubtext ? (
                      <div style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(127,205,255,0.5)' : '#64748B', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {displaySubtext}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: 'transparent', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ fontSize: '0.78rem', color: isPopular ? '#7FCDFF' : '#7C6DFA', fontWeight: 600, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        14-day free trial · cancel anytime
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: 'transparent', fontWeight: 600, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {/* Seats Selector visual mock */}
                    {!isCustom ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isPopular ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '8px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.85rem', color: isPopular ? '#DFF7FF' : '#64748B' }}>Seats</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isPopular ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px', border: isPopular ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)' }}>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: '#F1F5F9', padding: '0 4px', userSelect: 'none' }} onClick={() => seats > 1 && setSeats(seats - 1)}>-</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F1F5F9', minWidth: '16px', textAlign: 'center' }}>{seats}</span>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: '#F1F5F9', padding: '0 4px', userSelect: 'none' }} onClick={() => setSeats(seats + 1)}>+</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: '24px', height: '36px' }}></div>
                    )}

                    <div style={{ borderTop: isPopular ? '1px solid rgba(127,205,255,0.15)' : '1px solid #1E293B', paddingTop: '20px', marginBottom: '32px' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', 
                            color: isPopular ? 'rgba(223,247,255,0.85)' : (feat.inc ? '#CBD5E1' : '#64748B'), 
                            fontWeight: feat.inc ? 500 : 400, fontFamily: "'Plus Jakarta Sans', sans-serif" 
                          }}>
                            <span style={{ 
                              color: feat.inc ? '#10B981' : '#64748B', fontWeight: 700, fontSize: '1rem', flexShrink: 0, opacity: feat.inc ? 1 : (isPopular ? 0.3 : 0.6) 
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
                    onClick={() => navigate('/signup?plan=' + plan.id)}
                    style={{
                      width: '100%',
                      background: isPopular ? 'rgb(223, 247, 255)' : 'transparent',
                      color: isPopular ? '#0A2540' : '#6C47FF',
                      border: isPopular ? 'none' : '1.5px solid #6C47FF',
                      padding: '14px 24px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isPopular ? '0 4px 20px rgba(223,247,255,0.2)' : 'none',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.boxShadow = '0 8px 28px rgba(223,247,255,0.35)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      } else {
                        e.currentTarget.style.background = 'rgba(124, 109, 250, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = 'rgb(223, 247, 255)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(223,247,255,0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      } else {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );
            })}
          </div>`;

content = content.substring(0, startIndex) + newCardsCode + content.substring(endIndex + 16);
fs.writeFileSync('src/pages/Pricing.jsx', content);
console.log("Updated Pricing.jsx");
