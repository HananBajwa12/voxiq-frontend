const fs = require('fs');

// 1. Fix the Hero UI Mockup in Home.jsx (Lines 660-698 approx)
function fixHeroMockup() {
  let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  
  // Replace the LIGHT background of the outer mockup card
  content = content.replace(
    "background: '#F6F4F0', border: '1px solid rgba(10,37,64,0.1)'",
    "background: '#0B1120', border: '1px solid rgba(255,255,255,0.05)'"
  );
  
  // Replace LIVE CALL FLOOR text color
  content = content.replace(
    "color: '#0D3B6E', fontSize: 10, fontWeight: 700",
    "color: '#7FCDFF', fontSize: 10, fontWeight: 700"
  );
  
  // Replace 8 Active pill
  content = content.replace(
    "background: 'rgba(13,59,110,0.08)', border: '1px solid rgba(13,59,110,0.15)', color: '#0D3B6E'",
    "background: 'rgba(127,205,255,0.1)', border: '1px solid rgba(127,205,255,0.2)', color: '#7FCDFF'"
  );
  
  // Replace inner contact card
  content = content.replace(
    "background: '#FFFFFF', border: '1px solid rgba(10,37,64,0.08)'",
    "background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)'"
  );
  
  // Replace Sarah Jenkins text
  content = content.replace(
    "color: '#0A2540', fontWeight: 600, fontSize: 13",
    "color: '#FFFFFF', fontWeight: 600, fontSize: 13"
  );
  
  // Replace VP Sales text
  content = content.replace(
    "color: '#64748B', fontSize: 11, marginTop: 2",
    "color: 'rgba(255, 255, 255, 0.7)', fontSize: 11, marginTop: 2"
  );
  
  // Replace Action Buttons
  content = content.replace(
    "background: danger ? 'rgba(239,68,68,0.06)' : 'rgba(13,59,110,0.06)', border: `1px solid ${danger ? 'rgba(239,68,68,0.2)' : 'rgba(13,59,110,0.12)'}`, color: danger ? '#EF4444' : '#0D3B6E'",
    "background: danger ? 'rgba(239,68,68,0.1)' : 'rgba(127,205,255,0.1)', border: `1px solid ${danger ? 'rgba(239,68,68,0.2)' : 'rgba(127,205,255,0.2)'}`, color: danger ? '#EF4444' : '#7FCDFF'"
  );
  
  // Replace Stats Strip border
  content = content.replace(
    "borderTop: '1px solid rgba(10,37,64,0.08)'",
    "borderTop: '1px solid rgba(255,255,255,0.05)'"
  );

  fs.writeFileSync('src/pages/Home.jsx', content);
}

// 2. Fix the Pricing Cards to exactly match the screenshot
function fixPricingCards(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Change outer card background/border
  content = content.replace(
    "background: isPopular ? '#12467B' : '#020D1A',\n                  border: isPopular ? 'none' : '1px solid rgba(127,205,255,0.2)',",
    "background: isPopular ? '#184882' : '#0A0F1D',\n                  border: 'none',"
  );

  // Change drop shadow to be subtle
  content = content.replace(
    "boxShadow: isPopular ? '0 20px 40px rgba(13, 59, 110, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.2)'",
    "boxShadow: isPopular ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.2)'"
  );
  content = content.replace(
    "e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.6)' : '0 20px 40px rgba(0, 0, 0, 0.4)';",
    "e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(0, 0, 0, 0.3)';"
  );
  content = content.replace(
    "e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(13, 59, 110, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.2)';",
    "e.currentTarget.style.boxShadow = isPopular ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.2)';"
  );

  // MOST POPULAR pill
  content = content.replace(
    "background: '#12467B', color: '#FFFFFF',",
    "background: '#184882', color: '#FFFFFF',"
  );

  // Remove the border top divider for features
  content = content.replace(
    "borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '32px'",
    "paddingTop: '0px', marginBottom: '32px'"
  );

  // Fix unchecked feature text color (from rgba(255,255,255,0.4) to #64748B) and check/X marks
  content = content.replace(
    "color: feat.inc ? '#FFFFFF' : 'rgba(255,255,255,0.4)',",
    "color: feat.inc ? '#FFFFFF' : '#475569',"
  );
  content = content.replace(
    "color: feat.inc ? '#00E5A0' : 'rgba(255,255,255,0.2)',",
    "color: feat.inc ? '#00E5A0' : '#475569',"
  );
  content = content.replace(
    "{feat.inc ? '✓' : '✗'}",
    "{feat.inc ? '✓' : 'X'}"
  );

  // Fix Seats control
  content = content.replace(
    "background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)'",
    "background: 'transparent', padding: '6px 0px', borderRadius: '8px', marginBottom: '24px', border: 'none'"
  );
  content = content.replace(
    "background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)'",
    "background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)'"
  );

  fs.writeFileSync(file, content);
}

fixHeroMockup();
fixPricingCards('src/pages/Home.jsx');
fixPricingCards('src/pages/Pricing.jsx');
console.log("All UI and Pricing Card fixes applied to match exactly the requested theme!");
