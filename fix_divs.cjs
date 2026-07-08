const fs = require('fs');

function fixMissingDiv(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find where my script put </div>\n</section> without the intermediate </div>
  const badPattern = /<\/div>\s*<\/section>/g;
  let match;
  let matches = [];
  while ((match = badPattern.exec(content)) !== null) {
    matches.push(match);
  }
  
  if (matches.length > 0) {
    // We only want to replace the one that corresponds to the pricing grid.
    // In Home.jsx and Pricing.jsx, my script literally inserted newCardsCode which ends with "</div>", 
    // and appended "</section>". 
    // Let's replace "</div>\n      </section>" with "</div>\n        </div>\n      </section>"
    // Since there might be other valid occurrences of </div></section>, let's just find the one that lacks the container </div>.
    
    // The easiest way is to just add it. But to be safe, let's just do a string replace on the exact boundary.
    // My newCardsCode ends with:
    // "          </div>"
    // and content.substring(endIndex) starts with:
    // "</section>"
    // So the literal string in the file right now is "          </div></section>"
    if (content.includes('          </div></section>')) {
      content = content.replace('          </div></section>', '          </div>\n        </div>\n      </section>');
      fs.writeFileSync(file, content);
      console.log(`Fixed ${file}`);
    } else {
      console.log(`Pattern not found exactly in ${file}, trying fallback.`);
      // Fallback: replace the last </div> before the features table or next section.
      content = content.replace(/<\/div>\s*<\/section>\s*\{\/\* SECTION 3 — FEATURES TABLE \*\/\}/, '</div>\n        </div>\n      </section>\n\n      {/* SECTION 3 — FEATURES TABLE */}');
      content = content.replace(/<\/div>\s*<\/section>\s*\{\/\* ================================================================\s*SECTION 8 — TESTIMONIALS/, '</div>\n        </div>\n      </section>\n\n      {/* ================================================================\n          SECTION 8 — TESTIMONIALS');
      fs.writeFileSync(file, content);
      console.log(`Fixed ${file} with fallback`);
    }
  }
}

fixMissingDiv('src/pages/Home.jsx');
fixMissingDiv('src/pages/Pricing.jsx');
