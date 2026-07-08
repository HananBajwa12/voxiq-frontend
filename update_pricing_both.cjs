const fs = require('fs');

function injectPricingCards(file, isHome) {
  let content = fs.readFileSync(file, 'utf8');

  let startIndex, lastSectionEnd, gridEndStr;

  if (isHome) {
    const startStr = "{/* Cards Grid */}";
    startIndex = content.indexOf(startStr);
    if (startIndex === -1) return console.error("Could not find start in Home");
    
    const section8Str = "SECTION 8 \u2014 TESTIMONIALS";
    let endIndex = content.indexOf(section8Str, startIndex);
    lastSectionEnd = content.lastIndexOf('</section>', endIndex);
  } else {
    // Pricing.jsx
    const startStr = "className=\"pricing-grid\">";
    startIndex = content.indexOf(startStr);
    if (startIndex === -1) return console.error("Could not find start in Pricing");
    
    startIndex += startStr.length; // Insert AFTER the pricing grid opening div
    
    const endStr = "SECTION 3 \u2014 COMPARISON TABLE";
    let endIndex = content.indexOf(endStr, startIndex);
    lastSectionEnd = content.lastIndexOf('</div>', endIndex - 50); // The `</div>` that closes pricing-grid
  }

  const newCardsCode = (isHome ? "          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr', gap: '24px', alignItems: 'stretch' }}>\n" : "") + `
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
                  background: isPopular ? '#12467B' : '#020D1A',
                  border: isPopular ? 'none' : '1px solid rgba(127,205,255,0.2)',
                  borderRadius: '16px',
                  padding: '32px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: isPopular ? '0 20px 40px rgba(13, 59, 110, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.6)' : '0 20px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.2)';
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
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '40px' }}>{plan.desc}</p>
                    
                    <div style={{ 
                      display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', minHeight: '44px'
                    }}>
                      {isCustom ? (
                        <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Talk to Sales
                        </span>
                      ) : (
                        <>
                          <span style={{ fontSize: '2.8rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {displayPriceTop}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{priceSuffix}</span>
                        </>
                      )}
                    </div>
                    {displaySubtext ? (
                      <div style={{ fontSize: '0.85rem', color: '#00E5A0', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {displaySubtext}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: 'transparent', marginBottom: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        7-day free trial · cancel anytime
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: 'transparent', fontWeight: 600, marginBottom: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-</div>
                    )}

                    {!isCustom ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Seats</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)' }}>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: '#FFFFFF', padding: '0 4px', userSelect: 'none' }} onClick={() => planSeats > 1 && setSeats(prev => ({ ...prev, [plan.id]: prev[plan.id] - 1 }))}>-</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', minWidth: '16px', textAlign: 'center' }}>{planSeats}</span>
                          <span style={{ fontSize: '1rem', cursor: 'pointer', color: '#FFFFFF', padding: '0 4px', userSelect: 'none' }} onClick={() => setSeats(prev => ({ ...prev, [plan.id]: prev[plan.id] + 1 }))}>+</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: '24px', height: '36px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}></div>
                    )}

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '32px' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', 
                            color: feat.inc ? '#FFFFFF' : 'rgba(255,255,255,0.4)', 
                            fontWeight: feat.inc ? 500 : 400, fontFamily: "'Plus Jakarta Sans', sans-serif" 
                          }}>
                            <span style={{ 
                              color: feat.inc ? '#00E5A0' : 'rgba(255,255,255,0.2)', 
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
                      background: isPopular ? '#FFFFFF' : 'transparent',
                      color: isPopular ? '#12467B' : '#FFFFFF',
                      border: isPopular ? 'none' : '1px solid rgba(255,255,255,0.3)',
                      padding: '14px 24px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isPopular ? '0 4px 15px rgba(0,0,0,0.1)' : 'none',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      } else {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.transform = 'translateY(0)';
                      } else {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                      }
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );

              return ${isHome ? '( <Reveal delay={0.1 * (i + 1)} key={plan.id}> {cardContent} </Reveal> )' : '( <div key={plan.id}>{cardContent}</div> )'};
            })}` + (isHome ? `\n          </div>\n        </div>\n      </section>\n` : `\n`);

  if (isHome) {
    content = content.substring(0, startIndex) + newCardsCode + content.substring(lastSectionEnd + 10);
  } else {
    content = content.substring(0, startIndex) + newCardsCode + content.substring(lastSectionEnd);
    // Fix grid template columns in Pricing
    content = content.replace("gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)'", "gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)'");
  }
  
  const oldSeatsStateStr = "const [seats, setSeats] = useState(1);";
  const newSeatsStateStr = "const [seats, setSeats] = useState({ basic: 1, pro: 1, business: 1, enterprise: 1 });";
  if (content.includes(oldSeatsStateStr)) {
    content = content.replace(oldSeatsStateStr, newSeatsStateStr);
  } else {
    // If we didn't find the old state, let's just make sure we add the new one
    // Look for `const [pricingAnnual, setPricingAnnual] = useState(false);`
    if (!content.includes('seats')) {
       if (content.includes('const [pricingAnnual, setPricingAnnual] = useState(false);')) {
         content = content.replace(
           'const [pricingAnnual, setPricingAnnual] = useState(false);',
           'const [pricingAnnual, setPricingAnnual] = useState(false);\n  const [seats, setSeats] = useState({ basic: 1, pro: 1, business: 1, enterprise: 1 });'
         );
       } else if (content.includes('const [billingCycle, setBillingCycle] = useState(\'monthly\');')) {
         content = content.replace(
           'const [billingCycle, setBillingCycle] = useState(\'monthly\');',
           'const [billingCycle, setBillingCycle] = useState(\'monthly\');\n  const [seats, setSeats] = useState({ basic: 1, pro: 1, business: 1, enterprise: 1 });'
         );
       }
    }
  }
  
  fs.writeFileSync(file, content);
  console.log(`Fixed ${file} correctly!`);
}

injectPricingCards('src/pages/Home.jsx', true);
injectPricingCards('src/pages/Pricing.jsx', false);
