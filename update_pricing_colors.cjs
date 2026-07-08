const fs = require('fs');

function updatePricingCardsColors(file) {
  let content = fs.readFileSync(file, 'utf8');

  // We need to replace the entire map block that renders the cards.
  // The block starts at `return (` and ends at `});` inside the grid.
  // Actually, replacing the whole newCardsCode is safer. Let's find the start of the `pricing-grid` div.

  const gridStartMatch = content.match(/<div style=\{\{\s*display: 'grid',\s*gridTemplateColumns: [^,]+,\s*gap: '24px',\s*alignItems: 'stretch'\s*\}\} className="pricing-grid">/);
  
  // Wait, in Home.jsx the grid is:
  // <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr', gap: 24, alignItems: 'stretch' }}>
  // Let's use a regex that catches both.
  const gridRegex = /<div style=\{\{\s*display: 'grid',\s*gridTemplateColumns:[^,]+,\s*gap:\s*(24|'24px'),\s*alignItems: 'stretch'\s*\}\}( className="pricing-grid")?>/;
  
  const match = content.match(gridRegex);
  if (!match) {
    console.error(`Could not find grid in ${file}`);
    return;
  }
  
  const startIndex = match.index;
  // Find the end of the map function: `            })}\n          </div>`
  const endIndex = content.indexOf('          </div>', startIndex);
  if (endIndex === -1) {
    console.error(`Could not find grid end in ${file}`);
    return;
  }

  const newCardsCode = `<div style={{ display: 'grid', gridTemplateColumns: typeof isMobile !== 'undefined' ? (isMobile ? '1fr' : 'repeat(4, 1fr)') : (typeof isDesktop !== 'undefined' ? (isDesktop ? 'repeat(4, 1fr)' : '1fr') : 'repeat(4, 1fr)'), gap: '24px', alignItems: 'stretch' }} ${file.includes('Pricing') ? 'className="pricing-grid"' : ''}>
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
              const isAnnual = typeof billingCycle !== 'undefined' ? billingCycle === 'annual' : (typeof pricingAnnual !== 'undefined' ? pricingAnnual : false);
              let displayPriceTop = 'Talk to Sales';
              let priceSuffix = '';
              let displaySubtext = '';
              const planSeats = seats[plan.id] || 1;
              
              if (!isCustom) {
                if (isAnnual) {
                  const total = (plan.annualTotalPerSeat * planSeats).toFixed(2);
                  displayPriceTop = \`$\${total}\`;
                  priceSuffix = '/yr';
                  displaySubtext = \`$\${plan.annualSeatMonthly}/seat/mo (billed annually) × \${planSeats} seat\${planSeats > 1 ? 's' : ''}\`;
                } else {
                  const total = (plan.monthlyPrice * planSeats).toFixed(2);
                  displayPriceTop = \`$\${total}\`;
                  priceSuffix = '/mo';
                  displaySubtext = \`$\${plan.monthlyPrice}/seat/mo × \${planSeats} seat\${planSeats > 1 ? 's' : ''}\`;
                }
              }

              const cardContent = (
                <div style={{
                  background: isPopular ? '#12467B' : '#FFFFFF',
                  border: isPopular ? 'none' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '32px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: isPopular ? '0 20px 40px rgba(13, 59, 110, 0.25)' : '0 10px 30px rgba(10, 37, 64, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.4)' : '0 20px 40px rgba(10, 37, 64, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.25)' : '0 10px 30px rgba(10, 37, 64, 0.04)';
                }}
                >
                  {isPopular && (
                    <div style={{
                      position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                      background: '#12467B', color: '#FFFFFF',
                      padding: '6px 16px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap'
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: plan.dot, display: 'inline-block' }} />
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(255,255,255,0.7)' : '#475569', marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '40px' }}>{plan.desc}</p>
                    
                    <div style={{ 
                      display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', minHeight: '44px'
                    }}>
                      {isCustom ? (
                        <span style={{ fontSize: '2.2rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Talk to Sales
                        </span>
                      ) : (
                        <>
                          <span style={{ fontSize: '2.8rem', fontWeight: 700, color: isPopular ? '#FFFFFF' : '#0A2540', letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {displayPriceTop}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: isPopular ? 'rgba(255,255,255,0.7)' : '#475569', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{priceSuffix}</span>
                        </>
                      )}
                    </div>
                    {displaySubtext ? (
                      <div style={{ fontSize: '0.85rem', color: isPopular ? 'rgba(255,255,255,0.6)' : '#64748B', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {displaySubtext}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: 'transparent', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ fontSize: '0.78rem', color: isPopular ? '#00E5A0' : '#10B981', fontWeight: 700, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        7-day free trial · cancel anytime
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: 'transparent', fontWeight: 600, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isPopular ? 'rgba(255,255,255,0.1)' : '#F8FAFC', padding: '6px 12px', borderRadius: '8px', marginBottom: '24px', border: isPopular ? 'none' : '1px solid #F1F5F9' }}>
                        <span style={{ fontSize: '0.85rem', color: isPopular ? '#FFFFFF' : '#475569' }}>Seats</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isPopular ? 'rgba(255,255,255,0.15)' : '#FFFFFF', padding: '4px 8px', borderRadius: '6px', border: isPopular ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E2E8F0' }}>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: isPopular ? '#FFFFFF' : '#0A2540', padding: '0 4px', userSelect: 'none' }} onClick={() => planSeats > 1 && setSeats(prev => ({ ...prev, [plan.id]: prev[plan.id] - 1 }))}>-</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isPopular ? '#FFFFFF' : '#0A2540', minWidth: '16px', textAlign: 'center' }}>{planSeats}</span>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: isPopular ? '#FFFFFF' : '#0A2540', padding: '0 4px', userSelect: 'none' }} onClick={() => setSeats(prev => ({ ...prev, [plan.id]: prev[plan.id] + 1 }))}>+</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: '24px', height: '36px', borderBottom: isPopular ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0' }}></div>
                    )}

                    <div style={{ borderTop: isPopular ? '1px solid rgba(255,255,255,0.1)' : '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '32px' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', 
                            color: isPopular ? '#FFFFFF' : (feat.inc ? '#0A2540' : '#94A3B8'), 
                            fontWeight: feat.inc ? 500 : 400, fontFamily: "'Plus Jakarta Sans', sans-serif" 
                          }}>
                            <span style={{ 
                              color: feat.inc ? (isPopular ? '#00E5A0' : '#10B981') : (isPopular ? 'rgba(255,255,255,0.3)' : '#CBD5E1'), 
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
                    onClick={() => { typeof navigate !== 'undefined' ? navigate('/signup?plan=' + plan.id) : window.location.href='/signup?plan='+plan.id }}
                    style={{
                      width: '100%',
                      background: isPopular ? '#FFFFFF' : '#FFFFFF',
                      color: isPopular ? '#12467B' : '#0A2540',
                      border: isPopular ? 'none' : '1px solid #E2E8F0',
                      padding: '14px 24px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isPopular ? '0 4px 15px rgba(0,0,0,0.1)' : '0 2px 5px rgba(0,0,0,0.02)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      } else {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.transform = 'translateY(0)';
                      } else {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );

              return file.includes('Home') ? (
                <Reveal delay={0.1 * (i + 1)} key={plan.id}>
                  {cardContent}
                </Reveal>
              ) : (
                <div key={plan.id}>
                  {cardContent}
                </div>
              );
            })}`;

  content = content.substring(0, startIndex) + newCardsCode + content.substring(endIndex);
  fs.writeFileSync(file, content);
  console.log(`Updated ${file} successfully`);
}

updatePricingCardsColors('src/pages/Home.jsx');
updatePricingCardsColors('src/pages/Pricing.jsx');
