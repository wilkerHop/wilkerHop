# AI Agent Tutorial: Publishing HTML to GitHub Pages with Commitlint

A comprehensive guide for AI agents to publish any HTML file to GitHub Pages with proper commit conventions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure Setup](#project-structure-setup)
3. [Neo-Brutalist Design Transformation](#neo-brutalist-design-transformation)
4. [Commitlint Configuration](#commitlint-configuration)
5. [GitHub Actions Workflow](#github-actions-workflow)
6. [Commit Message Conventions](#commit-message-conventions)
7. [Step-by-Step Publishing Process](#step-by-step-publishing-process)
8. [Automation Scripts](#automation-scripts)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:
- Git installed and configured
- Access to create GitHub repositories
- The HTML file to publish
- Basic understanding of terminal commands

## Project Structure Setup

### 1. Create Project Directory

```bash
# Create project directory
mkdir my-html-project
cd my-html-project

# Initialize git repository
git init
git branch -M main
```

### 2. Required Files Structure

```
my-html-project/
├── index.html              # Your main HTML file
├── README.md              # Project documentation
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── .commitlintrc.json     # Commitlint configuration
└── package.json           # Node.js dependencies (optional)
```
## Neo-Brutalist Design Transformation

### Overview

Neo-brutalist design is characterized by bold, aggressive aesthetics that prioritize raw visual impact over subtlety. This section teaches AI agents how to transform any HTML file into a neo-brutalist masterpiece.

### Core Design Principles

#### 1. Visual Elements

| Principle | Specification | Example |
|-----------|---------------|---------|
| **Borders** | 3px-5px solid black on ALL elements | `border: 4px solid #000` |
| **Shadows** | Hard, unblurred drop shadows | `box-shadow: 5px 5px 0px 0px #000` |
| **Colors** | High-contrast, clashing neon palette | `#FFFF00`, `#FF00FF`, `#00FFFF` |
| **Typography** | Bold, utilitarian, uppercase | Space Mono, Archivo Black |
| **Backgrounds** | Stark white or black | `#FFFFFF`, `#000000` |

#### 2. Color Palette

```css
:root {
  --neon-yellow: #FFFF00;
  --hot-pink: #FF00FF;
  --cyan: #00FFFF;
  --black: #000000;
  --white: #FFFFFF;
}
```

#### 3. Typography Stack

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo+Black&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
}

h1, h2, h3 {
  font-family: 'Archivo Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: -1px;
}
```

### Step-by-Step Transformation Guide

#### Step 1: Analyze Existing HTML

First, identify the current design elements:

```bash
# View HTML structure
cat index.html | grep -E "<(div|section|header|nav|main|footer)" | head -20

# Identify existing CSS
grep -E "(class=|id=|style=)" index.html | head -10
```

#### Step 2: Replace Fonts

**Before:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}
</style>
```

**After:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo+Black&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
}

h1, h2, h3, .brutal-font {
  font-family: 'Archivo Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: -1px;
}
</style>
```

#### Step 3: Replace Color Palette

**Transformation Script:**

```javascript
// Color mapping
const colorMap = {
  // Map soft colors to neon
  '#F2F0E9': '#FFFFFF',  // Beige → White
  '#2D2D2A': '#000000',  // Dark gray → Black
  '#8C2F2F': '#FF00FF',  // Muted red → Hot pink
  '#4B5563': '#00FFFF',  // Slate → Cyan
  'rgb(242, 240, 233)': '#FFFFFF',
  'rgba(0,0,0,0.05)': '#000000'
};

// Replace colors in HTML/CSS
for (const [oldColor, newColor] of Object.entries(colorMap)) {
  // Replace in styles
  content = content.replace(new RegExp(oldColor, 'gi'), newColor);
}
```

#### Step 4: Add Brutal Borders

**Before:**
```css
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
.card {
  border: 4px solid #000;
  border-radius: 0;  /* Remove rounded corners */
  box-shadow: 5px 5px 0px 0px #000;
}

.brutal-border {
  border: 4px solid var(--black);
}

.brutal-shadow {
  box-shadow: 5px 5px 0px 0px var(--black);
}

.brutal-shadow-lg {
  box-shadow: 8px 8px 0px 0px var(--black);
}
```

#### Step 5: Transform Buttons

**Before:**
```css
button {
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
button {
  background: var(--neon-yellow);
  color: var(--black);
  border: 4px solid var(--black);
  border-radius: 0;
  box-shadow: 4px 4px 0px 0px var(--black);
  transition: transform 0.1s, box-shadow 0.1s;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px var(--black);
}

button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--black);
}
```

#### Step 6: Add Marquee Banner

```html
<!-- Add at top of body -->
<div class="marquee-container">
  <div class="marquee-text">
    ⚡ NEO-BRUTALIST DESIGN ⚡ RAW VISUAL IMPACT ⚡ NO COMPROMISES ⚡ NEO-BRUTALIST DESIGN ⚡ RAW VISUAL IMPACT ⚡
  </div>
</div>
```

```css
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
```

### Complete Transformation Script

Create `neobrutalize.js`:

```javascript
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
```

**Usage:**
```bash
# Transform existing HTML
node neobrutalize.js index.html index.html

# Or create new file
node neobrutalize.js old.html new-brutal.html
```

### Manual Transformation Checklist

Use this checklist when manually transforming HTML:

```markdown
## Neo-Brutalist Transformation Checklist

### Typography
- [ ] Replace serif/san-serif fonts with Space Mono (body)
- [ ] Replace heading fonts with Archivo Black
- [ ] Set all text to uppercase or bold (700 weight)
- [ ] Remove font smoothing/anti-aliasing

### Colors
- [ ] Replace background with stark white (#FFFFFF) or black (#000000)
- [ ] Replace primary accent with neon yellow (#FFFF00)
- [ ] Replace secondary accent with hot pink (#FF00FF)
- [ ] Replace tertiary with cyan (#00FFFF)
- [ ] Remove all gradients
- [ ] Remove transparency/opacity (except for overlays)

### Borders & Shadows
- [ ] Add 4px solid black borders to ALL containers
- [ ] Replace border-radius with 0 (no rounded corners)
- [ ] Replace soft shadows with hard shadows (5px 5px 0px 0px #000)
- [ ] Remove blur from ALL elements

### Interactive Elements
- [ ] Add click-translation effects to buttons (translate on active)
- [ ] Remove smooth transitions (max 0.1s for snappy feel)
- [ ] Add brutal-btn class to all buttons
- [ ] Add hover state with increased shadow

### Layout
- [ ] Add marquee banner at top
- [ ] Ensure grid-based layout with clear separation
- [ ] Remove subtle spacing, use bold gaps
- [ ] Remove card elevation, use flat design

### Components
- [ ] Transform navigation to brutal style
- [ ] Update form inputs with black borders
- [ ] Replace icons with bold symbols (⚡ ✓ ✗ ▲ ▼)
- [ ] Remove loading spinners, use text

### Final Polish
- [ ] Test all interactive elements
- [ ] Verify contrast ratios for accessibility
- [ ] Ensure semantic HTML maintained
- [ ] Add ARIA labels where needed
```

### Before/After Examples

#### Example 1: Header Transformation

**Before:**
```html
<header style="background: linear-gradient(to right, #667eea, #764ba2); 
               padding: 2rem; 
               border-radius: 8px;
               box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
  <h1 style="font-family: 'Georgia', serif; 
             color: white; 
             font-weight: 400;">Welcome</h1>
</header>
```

**After:**
```html
<header style="background: #000000; 
               padding: 2rem; 
               border: 4px solid #000;
               border-radius: 0;
               box-shadow: 8px 8px 0px 0px #000;">
  <h1 style="font-family: 'Archivo Black', sans-serif; 
             color: #FFFF00; 
             text-transform: uppercase;
             font-weight: 900;">WELCOME</h1>
</header>
```

#### Example 2: Card Transformation

**Before:**
```css
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
.card {
  background: white;
  padding: 1.5rem;
  border: 4px solid #000;
  border-radius: 0;
  box-shadow: 5px 5px 0px 0px #000;
  transition: transform 0.1s, box-shadow 0.1s;
}

.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px 0px #000;
  background: #FFFF00;
}
```

### Commit Message for Design Transformation

When committing neo-brutalist design changes, use this format:

```bash
git commit -m "style: transform design to neo-brutalist aesthetic

- Replace color palette with neon colors (yellow/pink/cyan)
- Update typography to Space Mono and Archivo Black
- Add 4px black borders to all containers
- Implement hard drop shadows (no blur)
- Add click-translation effects to buttons
- Add animated marquee banner
- Remove all rounded corners and gradients
- Ensure high contrast for accessibility"
```

### Testing Neo-Brutalist Design

```bash
# 1. Visual test checklist
echo "Testing neo-brutalist design:"
echo "✓ All borders visible and 4px thick"
echo "✓ Shadows are hard (no blur)"
echo "✓ Colors are neon and high-contrast"
echo "✓ Typography is bold and uppercase"
echo "✓ No rounded corners"
echo "✓ Buttons have translation effect on click"

# 2. Accessibility test
# Check contrast ratios
curl -X POST https://webaim.org/resources/contrastchecker/ \
  -d "foreground=000000&background=FFFF00"

# 3. Open in browser for manual review
open index.html
```

### Automated Brutalization Script

Create `brutalize.sh` for automated transformation:

```bash
#!/bin/bash
set -e

HTML_FILE="${1:-index.html}"
OUTPUT_FILE="${2:-$HTML_FILE}"

echo "🎨 Brutalizing $HTML_FILE..."

# Backup original
cp "$HTML_FILE" "$HTML_FILE.backup"

# Run transformation
node neobrutalize.js "$HTML_FILE" "$OUTPUT_FILE"

# Add to git with proper commit
git add "$OUTPUT_FILE"
git commit -m "style: apply neo-brutalist design transformation

- Replace typography with Space Mono and Archivo Black
- Implement neon color palette (yellow/pink/cyan)
- Add 4px black borders and hard shadows
- Add click-translation button effects
- Add animated marquee banner"

echo "✅ Brutalization complete!"
echo "📝 Backup saved as: $HTML_FILE.backup"
echo "🎨 Brutalized file: $OUTPUT_FILE"
```

### Key Takeaways

1. **Bold Over Subtle**: Every element should make a statement
2. **High Contrast**: Accessibility through extreme contrast
3. **No Softness**: Hard edges, hard shadows, no blur
4. **Utilitarian Typography**: Function over form, but bold
5. **Aggressive Colors**: Neon palette that demands attention
6. **Raw Interactions**: Snappy, translation-based effects

Neo-brutalist design isn't about being difficult to use—it's about being impossible to ignore.

## Neo-Brutalist Design Transformation

### Overview

Neo-brutalist design is characterized by bold, aggressive aesthetics that prioritize raw visual impact over subtlety. This section teaches AI agents how to transform any HTML file into a neo-brutalist masterpiece.

### Core Design Principles

#### 1. Visual Elements

| Principle | Specification | Example |
|-----------|---------------|---------|
| **Borders** | 3px-5px solid black on ALL elements | `border: 4px solid #000` |
| **Shadows** | Hard, unblurred drop shadows | `box-shadow: 5px 5px 0px 0px #000` |
| **Colors** | High-contrast, clashing neon palette | `#FFFF00`, `#FF00FF`, `#00FFFF` |
| **Typography** | Bold, utilitarian, uppercase | Space Mono, Archivo Black |
| **Backgrounds** | Stark white or black | `#FFFFFF`, `#000000` |

#### 2. Color Palette

```css
:root {
  --neon-yellow: #FFFF00;
  --hot-pink: #FF00FF;
  --cyan: #00FFFF;
  --black: #000000;
  --white: #FFFFFF;
}
```

#### 3. Typography Stack

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo+Black&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
}

h1, h2, h3 {
  font-family: 'Archivo Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: -1px;
}
```

### Step-by-Step Transformation Guide

#### Step 1: Analyze Existing HTML

First, identify the current design elements:

```bash
# View HTML structure
cat index.html | grep -E "<(div|section|header|nav|main|footer)" | head -20

# Identify existing CSS
grep -E "(class=|id=|style=)" index.html | head -10
```

#### Step 2: Replace Fonts

**Before:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}
</style>
```

**After:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo+Black&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
}

h1, h2, h3, .brutal-font {
  font-family: 'Archivo Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: -1px;
}
</style>
```

#### Step 3: Replace Color Palette

**Transformation Script:**

```javascript
// Color mapping
const colorMap = {
  // Map soft colors to neon
  '#F2F0E9': '#FFFFFF',  // Beige → White
  '#2D2D2A': '#000000',  // Dark gray → Black
  '#8C2F2F': '#FF00FF',  // Muted red → Hot pink
  '#4B5563': '#00FFFF',  // Slate → Cyan
  'rgb(242, 240, 233)': '#FFFFFF',
  'rgba(0,0,0,0.05)': '#000000'
};

// Replace colors in HTML/CSS
for (const [oldColor, newColor] of Object.entries(colorMap)) {
  // Replace in styles
  content = content.replace(new RegExp(oldColor, 'gi'), newColor);
}
```

#### Step 4: Add Brutal Borders

**Before:**
```css
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
.card {
  border: 4px solid #000;
  border-radius: 0;  /* Remove rounded corners */
  box-shadow: 5px 5px 0px 0px #000;
}

.brutal-border {
  border: 4px solid var(--black);
}

.brutal-shadow {
  box-shadow: 5px 5px 0px 0px var(--black);
}

.brutal-shadow-lg {
  box-shadow: 8px 8px 0px 0px var(--black);
}
```

#### Step 5: Transform Buttons

**Before:**
```css
button {
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
button {
  background: var(--neon-yellow);
  color: var(--black);
  border: 4px solid var(--black);
  border-radius: 0;
  box-shadow: 4px 4px 0px 0px var(--black);
  transition: transform 0.1s, box-shadow 0.1s;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px var(--black);
}

button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--black);
}
```

#### Step 6: Add Marquee Banner

```html
<!-- Add at top of body -->
<div class="marquee-container">
  <div class="marquee-text">
    ⚡ NEO-BRUTALIST DESIGN ⚡ RAW VISUAL IMPACT ⚡ NO COMPROMISES ⚡ NEO-BRUTALIST DESIGN ⚡ RAW VISUAL IMPACT ⚡
  </div>
</div>
```

```css
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
```

### Complete Transformation Script

Create `neobrutalize.js`:

```javascript
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
```

**Usage:**
```bash
# Transform existing HTML
node neobrutalize.js index.html index.html

# Or create new file
node neobrutalize.js old.html new-brutal.html
```

### Manual Transformation Checklist

Use this checklist when manually transforming HTML:

```markdown
## Neo-Brutalist Transformation Checklist

### Typography
- [ ] Replace serif/san-serif fonts with Space Mono (body)
- [ ] Replace heading fonts with Archivo Black
- [ ] Set all text to uppercase or bold (700 weight)
- [ ] Remove font smoothing/anti-aliasing

### Colors
- [ ] Replace background with stark white (#FFFFFF) or black (#000000)
- [ ] Replace primary accent with neon yellow (#FFFF00)
- [ ] Replace secondary accent with hot pink (#FF00FF)
- [ ] Replace tertiary with cyan (#00FFFF)
- [ ] Remove all gradients
- [ ] Remove transparency/opacity (except for overlays)

### Borders & Shadows
- [ ] Add 4px solid black borders to ALL containers
- [ ] Replace border-radius with 0 (no rounded corners)
- [ ] Replace soft shadows with hard shadows (5px 5px 0px 0px #000)
- [ ] Remove blur from ALL elements

### Interactive Elements
- [ ] Add click-translation effects to buttons (translate on active)
- [ ] Remove smooth transitions (max 0.1s for snappy feel)
- [ ] Add brutal-btn class to all buttons
- [ ] Add hover state with increased shadow

### Layout
- [ ] Add marquee banner at top
- [ ] Ensure grid-based layout with clear separation
- [ ] Remove subtle spacing, use bold gaps
- [ ] Remove card elevation, use flat design

### Components
- [ ] Transform navigation to brutal style
- [ ] Update form inputs with black borders
- [ ] Replace icons with bold symbols (⚡ ✓ ✗ ▲ ▼)
- [ ] Remove loading spinners, use text

### Final Polish
- [ ] Test all interactive elements
- [ ] Verify contrast ratios for accessibility
- [ ] Ensure semantic HTML maintained
- [ ] Add ARIA labels where needed
```

### Before/After Examples

#### Example 1: Header Transformation

**Before:**
```html
<header style="background: linear-gradient(to right, #667eea, #764ba2); 
               padding: 2rem; 
               border-radius: 8px;
               box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
  <h1 style="font-family: 'Georgia', serif; 
             color: white; 
             font-weight: 400;">Welcome</h1>
</header>
```

**After:**
```html
<header style="background: #000000; 
               padding: 2rem; 
               border: 4px solid #000;
               border-radius: 0;
               box-shadow: 8px 8px 0px 0px #000;">
  <h1 style="font-family: 'Archivo Black', sans-serif; 
             color: #FFFF00; 
             text-transform: uppercase;
             font-weight: 900;">WELCOME</h1>
</header>
```

#### Example 2: Card Transformation

**Before:**
```css
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
.card {
  background: white;
  padding: 1.5rem;
  border: 4px solid #000;
  border-radius: 0;
  box-shadow: 5px 5px 0px 0px #000;
  transition: transform 0.1s, box-shadow 0.1s;
}

.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px 0px #000;
  background: #FFFF00;
}
```

### Commit Message for Design Transformation

When committing neo-brutalist design changes, use this format:

```bash
git commit -m "style: transform design to neo-brutalist aesthetic

- Replace color palette with neon colors (yellow/pink/cyan)
- Update typography to Space Mono and Archivo Black
- Add 4px black borders to all containers
- Implement hard drop shadows (no blur)
- Add click-translation effects to buttons
- Add animated marquee banner
- Remove all rounded corners and gradients
- Ensure high contrast for accessibility"
```

### Testing Neo-Brutalist Design

```bash
# 1. Visual test checklist
echo "Testing neo-brutalist design:"
echo "✓ All borders visible and 4px thick"
echo "✓ Shadows are hard (no blur)"
echo "✓ Colors are neon and high-contrast"
echo "✓ Typography is bold and uppercase"
echo "✓ No rounded corners"
echo "✓ Buttons have translation effect on click"

# 2. Accessibility test
# Check contrast ratios
curl -X POST https://webaim.org/resources/contrastchecker/ \
  -d "foreground=000000&background=FFFF00"

# 3. Open in browser for manual review
open index.html
```

### Automated Brutalization Script

Create `brutalize.sh` for automated transformation:

```bash
#!/bin/bash
set -e

HTML_FILE="${1:-index.html}"
OUTPUT_FILE="${2:-$HTML_FILE}"

echo "🎨 Brutalizing $HTML_FILE..."

# Backup original
cp "$HTML_FILE" "$HTML_FILE.backup"

# Run transformation
node neobrutalize.js "$HTML_FILE" "$OUTPUT_FILE"

# Add to git with proper commit
git add "$OUTPUT_FILE"
git commit -m "style: apply neo-brutalist design transformation

- Replace typography with Space Mono and Archivo Black
- Implement neon color palette (yellow/pink/cyan)
- Add 4px black borders and hard shadows
- Add click-translation button effects
- Add animated marquee banner"

echo "✅ Brutalization complete!"
echo "📝 Backup saved as: $HTML_FILE.backup"
echo "🎨 Brutalized file: $OUTPUT_FILE"
```

### Key Takeaways

1. **Bold Over Subtle**: Every element should make a statement
2. **High Contrast**: Accessibility through extreme contrast
3. **No Softness**: Hard edges, hard shadows, no blur
4. **Utilitarian Typography**: Function over form, but bold
5. **Aggressive Colors**: Neon palette that demands attention
6. **Raw Interactions**: Snappy, translation-based effects

Neo-brutalist design isn't about being difficult to use—it's about being impossible to ignore.
## Commitlint Configuration

### 1. Create `.commitlintrc.json`

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert"
      ]
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100]
  }
}
```

### 2. Commit Types Reference

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add contact form to homepage` |
| `fix` | Bug fix | `fix: correct navigation menu alignment` |
| `docs` | Documentation | `docs: update README with deployment steps` |
| `style` | Code style changes | `style: apply neo-brutalist design` |
| `refactor` | Code refactoring | `refactor: reorganize CSS structure` |
| `perf` | Performance improvements | `perf: optimize image loading` |
| `test` | Adding tests | `test: add validation for form inputs` |
| `build` | Build system changes | `build: update webpack configuration` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `revert` | Revert previous commit | `revert: undo navigation changes` |

## GitHub Actions Workflow

### Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Commit Message Conventions

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Rules

1. **Type**: Required, lowercase, from allowed list
2. **Scope**: Optional, describes section affected
3. **Subject**: Required, concise description (no period)
4. **Body**: Optional, detailed explanation
5. **Footer**: Optional, breaking changes or issue references

### Examples

#### ✅ Good Commits

```bash
# Simple feature
git commit -m "feat: add navigation menu"

# With scope
git commit -m "feat(header): add responsive navigation menu"

# With body
git commit -m "feat: add contact form

- Add email validation
- Add phone number field
- Add submit button with styling"

# Breaking change
git commit -m "feat!: redesign homepage layout

BREAKING CHANGE: Old CSS classes removed, update custom styles"

# Bug fix
git commit -m "fix: correct mobile menu toggle"

# Documentation
git commit -m "docs: add deployment instructions to README"

# Style changes
git commit -m "style: apply neo-brutalist design system"
```

#### ❌ Bad Commits

```bash
# No type
git commit -m "added new feature"

# Wrong type case
git commit -m "Feat: add menu"

# Period at end
git commit -m "feat: add menu."

# Too vague
git commit -m "fix: stuff"

# Too long subject
git commit -m "feat: add a really long description that exceeds the maximum allowed length for commit messages"
```

## Step-by-Step Publishing Process

### Step 1: Prepare Your HTML File

```bash
# Place your HTML file in the project directory
cp /path/to/your/file.html index.html
```

### Step 2: Create README.md

```markdown
# Project Name

[![Deploy to GitHub Pages](https://github.com/USERNAME/REPO/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/REPO/actions/workflows/deploy.yml)

## Description

Brief description of your HTML project.

## Live Demo

Visit: https://USERNAME.github.io/REPO/

## Local Development

```bash
# Open in browser
open index.html
```

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions.
```

### Step 3: Initialize Git and Make Initial Commit

```bash
# Add all files
git add .

# Commit with proper format
git commit -m "chore: initial project setup

- Add index.html
- Add README.md
- Configure GitHub Actions workflow
- Add commitlint configuration"
```

### Step 4: Create GitHub Repository

```bash
# Using GitHub CLI (recommended)
gh repo create my-html-project --public --source=. --remote=origin --push

# Or manually:
# 1. Go to https://github.com/new
# 2. Create repository (don't initialize with README)
# 3. Run:
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Step 5: Enable GitHub Pages

```bash
# Using GitHub CLI
gh api repos/USERNAME/REPO/pages -X POST -f source[branch]=main -f source[path]=/

# Or manually:
# 1. Go to repository Settings → Pages
# 2. Set Source to "GitHub Actions"
```

### Step 6: Verify Deployment

```bash
# Check workflow status
gh run list --limit 5

# View workflow logs
gh run view

# Open deployed site
open https://USERNAME.github.io/REPO/
```

## Automation Scripts

### Script 1: `publish.sh` - Complete Publishing Script

```bash
#!/bin/bash
set -e

# Configuration
REPO_NAME="${1:-my-html-project}"
HTML_FILE="${2:-index.html}"
COMMIT_TYPE="${3:-feat}"
COMMIT_MSG="${4:-add HTML website}"

echo "🚀 Publishing HTML to GitHub Pages..."
echo "Repository: $REPO_NAME"
echo "HTML File: $HTML_FILE"

# Create project structure
mkdir -p "$REPO_NAME/.github/workflows"
cd "$REPO_NAME"

# Copy HTML file
cp "../$HTML_FILE" index.html

# Create GitHub Actions workflow
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# Create commitlint config
cat > .commitlintrc.json << 'EOF'
{
  "extends": ["@commitlint/config-conventional"]
}
EOF

# Create README
cat > README.md << EOF
# $REPO_NAME

[![Deploy to GitHub Pages](https://github.com/\$GITHUB_USERNAME/$REPO_NAME/actions/workflows/deploy.yml/badge.svg)](https://github.com/\$GITHUB_USERNAME/$REPO_NAME/actions/workflows/deploy.yml)

## Live Demo

Visit: https://\$GITHUB_USERNAME.github.io/$REPO_NAME/

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions.
EOF

# Initialize git
git init
git branch -M main

# Add files
git add .

# Commit with proper format
git commit -m "$COMMIT_TYPE: $COMMIT_MSG

- Add index.html
- Configure GitHub Actions deployment
- Add README with status badge"

# Create GitHub repository and push
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

# Enable GitHub Pages
sleep 2
gh api "repos/\$(gh repo view --json owner -q .owner.login)/$REPO_NAME/pages" \
  -X POST -f source[branch]=main -f source[path]=/ || echo "Pages may already be enabled"

echo "✅ Published successfully!"
echo "🌐 Your site will be available at: https://\$(gh repo view --json owner -q .owner.login).github.io/$REPO_NAME/"
```

### Script 2: `commit-helper.sh` - Commitlint Helper

```bash
#!/bin/bash

# Commit helper with validation
commit_with_lint() {
    local type=$1
    local scope=$2
    local subject=$3
    local body=$4
    
    # Validate type
    valid_types=("feat" "fix" "docs" "style" "refactor" "perf" "test" "build" "ci" "chore" "revert")
    if [[ ! " ${valid_types[@]} " =~ " ${type} " ]]; then
        echo "❌ Invalid type: $type"
        echo "Valid types: ${valid_types[*]}"
        return 1
    fi
    
    # Build commit message
    if [ -n "$scope" ]; then
        msg="$type($scope): $subject"
    else
        msg="$type: $subject"
    fi
    
    if [ -n "$body" ]; then
        msg="$msg

$body"
    fi
    
    # Commit
    git commit -m "$msg"
    echo "✅ Committed: $msg"
}

# Usage examples:
# commit_with_lint "feat" "" "add navigation menu"
# commit_with_lint "fix" "header" "correct mobile alignment"
# commit_with_lint "docs" "" "update README" "Add deployment instructions"
```

### Script 3: `update-and-deploy.sh` - Update Existing Project

```bash
#!/bin/bash
set -e

# Update HTML and deploy
HTML_FILE="${1:-index.html}"
COMMIT_MSG="${2:-update website}"

echo "📝 Updating HTML file..."

# Copy new HTML
cp "$HTML_FILE" index.html

# Stage changes
git add index.html

# Check if there are changes
if git diff --staged --quiet; then
    echo "ℹ️  No changes detected"
    exit 0
fi

# Commit with proper format
git commit -m "feat: $COMMIT_MSG"

# Push to trigger deployment
git push origin main

echo "✅ Updated and deployed!"
echo "⏳ Check deployment status: gh run watch"
```

## Troubleshooting

### Issue: Commit Rejected by Commitlint

**Solution**: Ensure commit message follows convention:
```bash
# Check commit message format
git log -1 --pretty=%B

# Amend last commit if needed
git commit --amend -m "feat: correct commit message"
```

### Issue: GitHub Pages Not Deploying

**Solution**:
```bash
# Check workflow status
gh run list

# View workflow logs
gh run view --log

# Verify Pages is enabled
gh api repos/OWNER/REPO/pages
```

### Issue: Badge Not Showing

**Solution**: Update badge URL in README.md:
```markdown
[![Deploy](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml)
```

### Issue: Permission Denied on Push

**Solution**:
```bash
# Configure git credentials
gh auth login

# Or use SSH
git remote set-url origin git@github.com:USERNAME/REPO.git
```

## Best Practices for AI Agents

### 1. Always Validate Before Committing

```bash
# Check what will be committed
git status
git diff --staged

# Validate commit message format before committing
echo "feat: add new feature" | npx commitlint
```

### 2. Use Atomic Commits

Each commit should represent one logical change:
```bash
# Good: Separate commits for different changes
git commit -m "feat: add navigation menu"
git commit -m "style: apply responsive design to navigation"

# Bad: Multiple unrelated changes in one commit
git commit -m "feat: add menu and fix bugs and update docs"
```

### 3. Write Descriptive Commit Messages

```bash
# Good: Clear and specific
git commit -m "fix: correct mobile menu toggle on iOS Safari"

# Bad: Vague
git commit -m "fix: menu issue"
```

### 4. Test Locally Before Pushing

```bash
# Open HTML in browser
open index.html

# Or use local server
python3 -m http.server 8000
```

### 5. Monitor Deployment

```bash
# Watch deployment in real-time
gh run watch

# Check deployment status
gh run list --limit 1
```

## Complete Example Workflow

Here's a complete example of publishing an HTML file:

```bash
# 1. Create project directory
mkdir awesome-website
cd awesome-website

# 2. Copy your HTML file
cp ~/my-website.html index.html

# 3. Create workflow directory
mkdir -p .github/workflows

# 4. Create deployment workflow
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4
EOF

# 5. Create README
cat > README.md << 'EOF'
# Awesome Website

[![Deploy](https://github.com/USERNAME/awesome-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/awesome-website/actions/workflows/deploy.yml)

Live at: https://USERNAME.github.io/awesome-website/
EOF

# 6. Create commitlint config
cat > .commitlintrc.json << 'EOF'
{
  "extends": ["@commitlint/config-conventional"]
}
EOF

# 7. Initialize git
git init
git branch -M main

# 8. Make initial commit
git add .
git commit -m "chore: initial project setup

- Add index.html
- Configure GitHub Actions deployment
- Add README with deployment badge
- Add commitlint configuration"

# 9. Create GitHub repository and push
gh repo create awesome-website --public --source=. --remote=origin --push

# 10. Enable GitHub Pages
gh api repos/$(gh repo view --json owner -q .owner.login)/awesome-website/pages \
  -X POST -f source[branch]=main -f source[path]=/

# 11. Monitor deployment
gh run watch

# 12. Open deployed site
open https://$(gh repo view --json owner -q .owner.login).github.io/awesome-website/

echo "✅ Website published successfully!"
```

## Summary

This tutorial provides AI agents with a complete workflow for publishing HTML files to GitHub Pages with proper commit conventions. Key takeaways:

1. **Always use commitlint-compliant commit messages**
2. **Set up GitHub Actions for automatic deployment**
3. **Include status badges in documentation**
4. **Test locally before pushing**
5. **Monitor deployment status**
6. **Use automation scripts for efficiency**

For questions or issues, refer to:
- [Commitlint Documentation](https://commitlint.js.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
