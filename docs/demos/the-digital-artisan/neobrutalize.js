#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Neo-brutalist configuration
const config = {
  colors: {
    neonYellow: '#FFFF00',
    hotPink: '#FF00FF',
    cyan: '#00FFFF',
    black: '#000000',
    white: '#FFFFFF'
  },
  fonts: {
    body: 'Space Mono',
    heading: 'Archivo Black'
  },
  borders: '4px solid #000',
  shadow: '5px 5px 0px 0px #000'
};

function transformHTML(htmlContent) {
  // 1. Update font links
  const fontLink = '<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo+Black&display=swap" rel="stylesheet">';
  
  if (!htmlContent.includes('Space+Mono')) {
    htmlContent = htmlContent.replace('</head>', `  ${fontLink}\n</head>`);
  }

  // 2. Add CSS variables and brutal styles
  const brutalCSS = `
    <style>
      :root {
        --neon-yellow: ${config.colors.neonYellow};
        --hot-pink: ${config.colors.hotPink};
        --cyan: ${config.colors.cyan};
        --black: ${config.colors.black};
        --white: ${config.colors.white};
      }
      
      body {
        font-family: '${config.fonts.body}', monospace;
        background-color: var(--white);
        color: var(--black);
        font-weight: 700;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: '${config.fonts.heading}', sans-serif;
        text-transform: uppercase;
        letter-spacing: -1px;
      }
      
      .brutal-border {
        border: ${config.borders};
      }
      
      .brutal-shadow {
        box-shadow: ${config.shadow};
      }
      
      .brutal-btn {
        border: ${config.borders};
        box-shadow: 4px 4px 0px 0px var(--black);
        transition: transform 0.1s, box-shadow 0.1s;
        cursor: pointer;
        font-weight: 700;
        text-transform: uppercase;
        background: var(--neon-yellow);
        color: var(--black);
      }
      
      .brutal-btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px 0px var(--black);
      }
      
      .brutal-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0px 0px var(--black);
      }
      
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      
      .marquee-container {
        overflow: hidden;
        white-space: nowrap;
        background: var(--black);
        color: var(--neon-yellow);
        padding: 8px 0;
        border-top: 4px solid var(--black);
        border-bottom: 4px solid var(--black);
      }
      
      .marquee-text {
        display: inline-block;
        animation: marquee 20s linear infinite;
      }
    </style>
  `;
  
  if (!htmlContent.includes('brutal-border')) {
    htmlContent = htmlContent.replace('</head>', `${brutalCSS}\n</head>`);
  }

  // 3. Add marquee banner after opening body tag
  const marquee = `
    <div class="marquee-container">
      <div class="marquee-text">
        ⚡ NEO-BRUTALIST DESIGN ⚡ RAW VISUAL IMPACT ⚡ NO COMPROMISES ⚡ NEO-BRUTALIST DESIGN ⚡ RAW VISUAL IMPACT ⚡
      </div>
    </div>
  `;
  
  if (!htmlContent.includes('marquee-container')) {
    htmlContent = htmlContent.replace(/<body[^>]*>/, '$&\n' + marquee);
  }

  // 4. Replace rounded corners
  htmlContent = htmlContent.replace(/border-radius:\s*\d+px/g, 'border-radius: 0');
  htmlContent = htmlContent.replace(/rounded(-\w+)?/g, '');

  // 5. Replace soft shadows with hard shadows
  htmlContent = htmlContent.replace(/box-shadow:\s*[^;]+rgba\([^)]+\)[^;]*/g, 
    'box-shadow: 5px 5px 0px 0px #000');

  // 6. Replace transitional buttons with brutal buttons
  htmlContent = htmlContent.replace(/<button([^>]*)class="([^"]*)"/g, 
    '<button$1class="$2 brutal-btn"');

  return htmlContent;
}

// Main execution
const inputFile = process.argv[2] || 'index.html';
const outputFile = process.argv[3] || inputFile;

try {
  const html = fs.readFileSync(inputFile, 'utf8');
  const transformed = transformHTML(html);
  fs.writeFileSync(outputFile, transformed, 'utf8');
  
  console.log('✅ Neo-brutalist transformation complete!');
  console.log(`📝 Output: ${outputFile}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
