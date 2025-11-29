# POC WRITER PRO - Neo-Brutalist Edition

[![Deploy to GitHub Pages](https://github.com/wilkerHop/poc-writer-pro-brutalist/workflows/Deploy/badge.svg)](https://github.com/wilkerHop/poc-writer-pro-brutalist/actions)

> **A bold, in-your-face guide to writing technical Proof of Concept articles that developers actually read.**

🔗 **[LIVE DEMO](https://wilkerhop.github.io/poc-writer-pro-brutalist/)**

## What Is This?

PoC Writer Pro is an interactive web application that teaches you how to write compelling technical articles in 2025. This Neo-Brutalist redesign strips away all softness—no rounded corners, no subtle shadows, no gentle gradients. Just pure, stark, functional design that demands attention.

## Features

### 🎯 Interactive Learning Modules

- **Phase 1: Research & Context** - Understand why tech writing is changing
- **Phase 2: Blueprint** - Master the anatomy of a killer PoC article
- **Phase 3: Retention** - Learn how to keep readers engaged
- **Phase 4: Launch** - Use the pre-publish checklist

### 📊 Data Visualizations

- **Content Mix Chart**: See the ideal balance of text, code, and visuals
- **Retention Chart**: Compare engagement of different article styles
- **Interactive comparisons** powered by Chart.js

### 🛠️ Practical Tools

- **Headline Simulator**: Test your article titles for engagement
- **Launch Checklist**: Track your article's readiness
- **Structure Explorer**: Click through optimal article sections

## Design Philosophy

### Neo-Brutalism Principles

This design embraces **Neo-Brutalism**, a web design movement characterized by:

- ✅ **Stark Color Contrast**: Pure black (#000) on pure white (#FFF) with bold red (#FF0000) accents
- ✅ **Thick Borders**: 3-5px solid black borders everywhere
- ✅ **Hard Shadows**: 8px offset box-shadows with zero blur
- ✅ **Monospace Typography**: Courier New for maximum brutalist impact
- ✅ **Zero Transitions**: Immediate, dramatic state changes
- ✅ **Sharp Corners**: Absolutely no border-radius
- ✅ **Bold Everything**: Heavy font weights, uppercase text

### Color Palette

```css
Background: #FFFFFF (Pure White)
Primary Text: #000000 (Pure Black)
Accent: #FF0000 (Bold Red)
Success: #00FF00 (Electric Green)
Borders: 3-5px solid #000
Shadows: 8px 8px 0 #000
```

## Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS (CDN)**: Utility-first CSS framework
- **Chart.js**: Data visualizations
- **Vanilla JavaScript**: No frameworks, pure interaction
- **GitHub Pages**: Free hosting and deployment

## Local Development

### Prerequisites

- Any modern web browser
- (Optional) Live Server for local development

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/wilkerHop/poc-writer-pro-brutalist.git
cd poc-writer-pro-brutalist
```

2. Open `index.html` in your browser or use a live server:
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Or just double-click index.html
```

3. Navigate to `http://localhost:8000`

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup Instructions

1. **Create a GitHub repository**
2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "feat: neo-brutalist PoC writer pro"
   git branch -M main
   git remote add origin https://github.com/wilkerHop/poc-writer-pro-brutalist.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will deploy automatically on push to `main`

## Project Structure

```
poc-writer-pro-brutalist/
├── index.html           # Main application file
├── README.md            # This file
├── .gitignore          # Git ignore rules
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment workflow
```

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (responsive design)

## Contributing

This is a demonstration project following a tutorial. Feel free to fork and adapt for your own purposes!

## License

MIT License - feel free to use this for your own projects.

## Acknowledgments

- **Tutorial**: Based on AI Agent Tutorial workflow
- **Design Movement**: Inspired by Neo-Brutalism web design
- **Chart.js**: For beautiful data visualizations
- **Tailwind CSS**: For utility-first styling

---

**Made with brutalist principles. No apologies for the aesthetic.**
