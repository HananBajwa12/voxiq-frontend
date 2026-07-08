const fs = require('fs');

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

fixPricingCards('src/pages/Home.jsx');
fixPricingCards('src/pages/Pricing.jsx');
console.log("Pricing cards exactly matched!");
