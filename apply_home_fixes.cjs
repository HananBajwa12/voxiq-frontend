const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 1. Fix ScrollStack overlap
c = c.replace(
  "<section style={{ background: '#FFFFFF', padding: isDesktop ? '60px 0' : '40px 0' }}>\n        <div style={{ maxWidth: '90vw', margin: '0 auto', padding: '0' }}>",
  "<section style={{ background: '#FFFFFF', padding: isDesktop ? '60px 0 200px' : '40px 0 120px', position: 'relative', zIndex: 10 }}>\n        <div style={{ maxWidth: '90vw', margin: '0 auto', padding: '0' }}>"
);

// 2. Fix HOW IT WORKS 01,02,03 color
c = c.replace(
  "<div style={{ fontFamily: \"'Space Grotesk', sans-serif\", fontSize: 52, fontWeight: 800, color: '#DFF7FF', lineHeight: 1, marginBottom: 12 }}>{step.step}</div>",
  "<div style={{ fontFamily: \"'Space Grotesk', sans-serif\", fontSize: 52, fontWeight: 800, color: 'rgb(13, 59, 110)', lineHeight: 1, marginBottom: 12 }}>{step.step}</div>"
);

// 3. Fix Hero Text Color
c = c.replace(
  "color: '#4A7A9B', maxWidth: 460, marginBottom: 36 }}\n              >\n                Power dialer + AI Agent + SMS + WhatsApp + Analytics.",
  "color: '#FFFFFF', maxWidth: 460, marginBottom: 36 }}\n              >\n                Power dialer + AI Agent + SMS + WhatsApp + Analytics."
);

// 4. Fix LIVE CALL FLOOR Text Color
c = c.replace(
  "<div style={{ color: '#2D5986', fontSize: 10 }}>{rep.company}</div>",
  "<div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 10 }}>{rep.company}</div>"
);

// 5. Fix UNIFIED INBOX Text Color
c = c.replace(
  "<span style={{ color: '#2D5986', fontSize: 10 }}>{msg.time}</span>",
  "<span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 10 }}>{msg.time}</span>"
);
c = c.replace(
  "<div style={{ color: '#2D5986', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.msg}</div>",
  "<div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.msg}</div>"
);

fs.writeFileSync('src/pages/Home.jsx', c);
console.log("All Home.jsx fixes applied safely!");
