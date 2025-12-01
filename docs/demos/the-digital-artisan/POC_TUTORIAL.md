# Building "The Digital Artisan" - A Complete PoC Tutorial

A comprehensive guide to building a multi-section interactive dashboard website about Rust video programming, viral storytelling, and ethical discourse.

## Table of Contents

1. [Overview](#overview)
2. [Phase 1: Planning and Architecture](#phase-1-planning-and-architecture)
3. [Phase 2: HTML Structure](#phase-2-html-structure)
4. [Phase 3: Styling and Design System](#phase-3-styling-and-design-system)
5. [Phase 4: JavaScript Interactivity](#phase-4-javascript-interactivity)
6. [Phase 5: Data Visualizations](#phase-5-data-visualizations)
7. [Phase 6: Testing and Refinement](#phase-6-testing-and-refinement)

---

## Overview

### What We're Building

"The Digital Artisan" is an interactive educational website that combines three distinct pillars:
1. **The Engine (Rust)**: Technical content about building video engines in Rust
2. **The Narrative (Script)**: Data-driven storytelling about creating viral content
3. **The Ethos (Discourse)**: Philosophical content about ethical communication

### Tech Stack

- **HTML5**: Semantic structure
- **Tailwind CSS**: Utility-first styling (CDN)
- **Chart.js**: Bar charts and radar charts
- **Plotly.js**: Interactive line charts
- **Vanilla JavaScript**: All interactivity

### Key Features

- Tab-based navigation between three sections
- Interactive diagrams with click events
- Real-time data visualizations
- Slider-controlled radar chart
- Responsive design
- Custom scrollbars

---

## Phase 1: Planning and Architecture

### Step 1.1: Define Content Pillars

Before writing code, outline your three main sections:

```markdown
## Content Structure

### Section 1: Rust Video Engine
- **Goal**: Educate about Rust's performance for video processing
- **Visualizations**: 
  - Bar chart (performance comparison)
  - Interactive pipeline diagram
- **Content**: Technical implementation details

### Section 2: Viral Scripting
- **Goal**: Teach retention curve concepts
- **Visualizations**: 
  - Line chart (retention curves)
  - Educational cards
- **Content**: Storytelling strategy

### Section 3: Ethical Discourse
- **Goal**: Explain rhetorical balance
- **Visualizations**: 
  - Radar chart (credibility balance)
  - Slider controls
- **Content**: Philosophy of communication
```

### Step 1.2: Design Color Palette

Choose a cohesive color scheme that reflects your brand:

```css
/* Warm Stone & Amber Palette */
:root {
  --stone-50: #fafaf9;
  --stone-200: #e7e5e4;
  --stone-500: #78716c;
  --stone-600: #57534e;
  --stone-700: #44403c;
  --stone-800: #292524;
  --stone-900: #1c1917;
  
  --amber-600: #d97706;
  --amber-700: #b45309;
}
```

**Justification**: The stone palette evokes craftsmanship and reliability (matching "Rust"), while amber accents add warmth and creativity.

### Step 1.3: Sketch Information Architecture

```
┌─────────────────────────────────────┐
│         Header (Sticky)             │
│  Logo  │  Tab 1 │ Tab 2 │ Tab 3    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│         Main Content Area           │
│    (Switches based on tab)          │
│                                     │
│  ┌────────────┐  ┌────────────┐   │
│  │  Chart 1   │  │  Chart 2   │   │
│  └────────────┘  └────────────┘   │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Footer                    │
└─────────────────────────────────────┘
```

---

## Phase 2: HTML Structure

### Step 2.1: Create Base HTML Template

Start with a clean HTML5 document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Digital Artisan</title>
    
    <!-- We'll add dependencies here -->
</head>
<body>
    <!-- Content will go here -->
</body>
</html>
```

### Step 2.2: Add CDN Dependencies

Add external libraries in the `<head>`:

```html
<!-- Tailwind CSS for styling -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Chart.js for bar/radar charts -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Plotly.js for line charts -->
<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Merriweather:ital,wght@0,300;0,700;1,400&display=swap" rel="stylesheet">
```

**Why these libraries?**
- **Tailwind CSS**: Rapid prototyping without writing custom CSS
- **Chart.js**: Simple, declarative charts for bar/radar
- **Plotly.js**: More advanced, interactive charts with annotations
- **Google Fonts**: Professional typography

### Step 2.3: Build Header Structure

Create a sticky header with navigation tabs:

```html
<header class="bg-white border-b border-stone-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <span class="text-2xl font-bold text-stone-900 tracking-tight">
                    The Digital Artisan
                </span>
            </div>
            <nav class="flex space-x-8">
                <button onclick="switchTab('rust')" id="nav-rust" 
                        class="nav-active px-3 py-2 text-sm font-medium transition-colors">
                    The Engine (Rust)
                </button>
                <button onclick="switchTab('script')" id="nav-script" 
                        class="px-3 py-2 text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
                    The Narrative (Script)
                </button>
                <button onclick="switchTab('ethics')" id="nav-ethics" 
                        class="px-3 py-2 text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
                    The Ethos (Discourse)
                </button>
            </nav>
        </div>
    </div>
</header>
```

**Key points:**
- `sticky top-0 z-50`: Keeps header visible during scroll
- `onclick` handlers: Will be implemented in JavaScript
- `nav-active` class: Visual indicator for active tab

### Step 2.4: Create Main Content Container

Build the main wrapper with proper spacing:

```html
<main class="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
    <!-- Sections will go here -->
</main>
```

### Step 2.5: Build Section 1 (Rust Engine)

Create the first content section:

```html
<section id="rust-section" class="space-y-8 animate-fade-in">
    <!-- Intro text -->
    <div class="max-w-3xl">
        <h1 class="text-3xl font-bold text-stone-900 mb-4">
            Architecting a Video Engine in Rust
        </h1>
        <p class="text-lg text-stone-600 leading-relaxed">
            Creating video programmatically requires a robust pipeline...
        </p>
    </div>
    
    <!-- Two-column grid for visualizations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Interactive Diagram -->
        <div class="bg-white p-6 rounded-lg border border-stone-200 shadow-sm card">
            <h2 class="text-xl font-semibold mb-4 text-amber-700">
                The Rendering Pipeline
            </h2>
            <p class="text-sm text-stone-500 mb-6">
                Click on a stage to reveal implementation details.
            </p>
            
            <!-- Clickable pipeline stages -->
            <div class="space-y-4">
                <div onclick="updatePipelineInfo('input')" 
                     class="cursor-pointer bg-stone-100 hover:bg-stone-200 p-4 rounded border-l-4 border-stone-400 transition-colors">
                    <div class="flex justify-between items-center">
                        <span class="font-bold">1. Asset Loading & State</span>
                        <span class="text-xl">&#128193;</span>
                    </div>
                </div>
                <div class="flex justify-center text-stone-300 text-xl">&#8595;</div>
                <!-- Repeat for other stages -->
            </div>
            
            <!-- Dynamic detail panel -->
            <div id="pipeline-details" class="mt-6 p-4 bg-amber-50 rounded text-sm text-stone-800 border border-amber-100 min-h-[120px]">
                <p class="font-semibold">Select a stage above to see Rust implementation details.</p>
            </div>
        </div>
        
        <!-- Performance Chart -->
        <div class="bg-white p-6 rounded-lg border border-stone-200 shadow-sm card flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-amber-700">
                Performance: Rust vs. Python
            </h2>
            <p class="text-sm text-stone-500 mb-4">
                Render time for a 1080p 60fps composite (Lower is better).
            </p>
            <div class="chart-container flex-grow">
                <canvas id="rustPerfChart"></canvas>
            </div>
        </div>
    </div>
    
    <!-- Key Libraries Grid -->
    <div class="bg-stone-100 rounded-xl p-8">
        <h3 class="text-xl font-bold mb-6">Essential Crates (Libraries)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded shadow-sm">
                <div class="font-mono text-amber-600 font-bold mb-1">ffmpeg-next</div>
                <p class="text-xs text-stone-600">Safe bindings for FFmpeg. Handles decoding/encoding video streams.</p>
            </div>
            <!-- Repeat for other libraries -->
        </div>
    </div>
</section>
```

**Design patterns:**
- **Grid layout**: Responsive two-column layout for visualizations
- **Interactive elements**: `onclick` handlers for user interaction
- **ID selectors**: `#pipeline-details` for dynamic content updates
- **Card components**: Consistent styling with `.card` class

### Step 2.6: Build Section 2 (Viral Scripting)

Add the retention curve section (initially hidden):

```html
<section id="script-section" class="hidden space-y-8 animate-fade-in">
    <div class="max-w-3xl">
        <h1 class="text-3xl font-bold text-stone-900 mb-4">
            Engineering the Viral Narrative
        </h1>
        <p class="text-lg text-stone-600 leading-relaxed">
            Writing a script that trends is not luck; it's a manipulation of attention...
        </p>
    </div>
    
    <!-- Retention Chart Card -->
    <div class="bg-white p-6 rounded-lg border border-stone-200 shadow-sm card">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h2 class="text-xl font-semibold text-amber-700">The Anatomy of Retention</h2>
                <p class="text-sm text-stone-500">Visualize how script structure impacts viewer drop-off.</p>
            </div>
            <div class="mt-4 md:mt-0 flex space-x-2">
                <button onclick="updateRetention('educational')" 
                        class="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-xs font-semibold border border-stone-300">
                    Educational
                </button>
                <button onclick="updateRetention('story')" 
                        class="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-xs font-semibold border border-stone-300">
                    Story/Vlog
                </button>
                <button onclick="updateRetention('failed')" 
                        class="px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded text-xs font-semibold border border-red-200">
                    Bad Pacing
                </button>
            </div>
        </div>
        
        <!-- Plotly Chart Container -->
        <div class="chart-container" style="height: 450px; max-height: 500px;">
            <div id="retentionPlot" style="width:100%; height:100%;"></div>
        </div>
        <p id="graph-insight" class="mt-4 text-sm bg-stone-50 p-3 rounded border border-stone-200 italic">
            Select a script type above to see the structural breakdown.
        </p>
    </div>
    
    <!-- Three-column educational cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h3 class="font-bold text-amber-800 mb-2">1. The Hook (0:00 - 0:30)</h3>
            <p class="text-sm text-stone-700">You must validate the click immediately...</p>
        </div>
        <!-- Repeat for Middle and Payoff -->
    </div>
</section>
```

### Step 2.7: Build Section 3 (Ethical Discourse)

Create the radar chart section:

```html
<section id="ethics-section" class="hidden space-y-8 animate-fade-in">
    <div class="max-w-3xl">
        <h1 class="text-3xl font-bold text-stone-900 mb-4">Loyal & Faithful Discourse</h1>
        <p class="text-lg text-stone-600 leading-relaxed">
            To speak "faithfully" about a subject means to represent it accurately...
        </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Radar Chart with Sliders -->
        <div class="bg-white p-6 rounded-lg border border-stone-200 shadow-sm card flex flex-col justify-center">
            <h2 class="text-xl font-semibold mb-4 text-center text-amber-700">
                The Credibility Balance
            </h2>
            <p class="text-sm text-center text-stone-500 mb-6">
                Adjust the sliders to see how Rhetoric shifts.
            </p>
            
            <div class="chart-container mx-auto">
                <canvas id="ethicsRadar"></canvas>
            </div>
            
            <!-- Slider Controls -->
            <div class="mt-6 space-y-4 px-4">
                <div>
                    <label class="flex justify-between text-xs font-bold uppercase text-stone-500 mb-1">
                        <span>Engagement / Hype</span>
                        <span id="val-hype">50%</span>
                    </label>
                    <input type="range" id="slider-hype" min="0" max="100" value="50" 
                           class="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600">
                </div>
                <!-- Repeat for other sliders -->
            </div>
        </div>
        
        <!-- Educational Cards -->
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div class="flex items-center mb-3">
                    <span class="text-2xl mr-3">&#9878;</span>
                    <h3 class="text-lg font-bold">The Principle of Charity</h3>
                </div>
                <p class="text-stone-600 text-sm leading-relaxed">
                    Always interpret an opponent's argument in its strongest, most persuasive form...
                </p>
            </div>
            <!-- Repeat for other principles -->
            
            <div class="bg-amber-50 p-6 rounded-lg border border-amber-100">
                <h3 class="text-lg font-bold text-amber-800 mb-2">Dynamic Analysis Output</h3>
                <p id="ethics-output" class="text-stone-700 font-mono text-xs">
                    Adjust the sliders on the left to analyze the rhetorical profile of your content.
                </p>
            </div>
        </div>
    </div>
</section>
```

### Step 2.8: Add Footer

Complete the structure with a simple footer:

```html
<footer class="bg-stone-900 text-stone-400 py-8 mt-12">
    <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-sm">Built for the aspiring Polymath using Tailwind, Chart.js, and Plotly.</p>
    </div>
</footer>
```

---

## Phase 3: Styling and Design System

### Step 3.1: Add Custom CSS Variables

Define your design tokens in a `<style>` block in the `<head>`:

```html
<style>
    body {
        font-family: 'Inter', sans-serif;
        background-color: #fafaf9; /* Stone-50 */
        color: #44403c; /* Stone-700 */
    }
    
    h1, h2, h3 {
        font-family: 'Merriweather', serif;
    }
</style>
```

### Step 3.2: Create Chart Container Styles

Ensure responsive charts with proper sizing:

```css
.chart-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    height: 40vh;
    max-height: 400px;
}

@media (min-width: 768px) {
    .chart-container {
        height: 400px;
    }
}
```

**Why this approach?**
- **Relative positioning**: Allows charts to be responsive
- **Max-width constraint**: Prevents charts from becoming too wide
- **Viewport height**: Uses `vh` units for flexibility
- **Media query**: Ensures consistent height on larger screens

### Step 3.3: Style Navigation States

Create visual feedback for active tabs:

```css
.nav-active {
    border-bottom: 2px solid #d97706; /* Amber-600 */
    color: #b45309; /* Amber-700 */
    font-weight: 600;
}
```

### Step 3.4: Add Card Hover Effects

Create subtle interactions for cards:

```css
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

### Step 3.5: Custom Scrollbar (Optional)

Add branded scrollbar styling:

```css
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f5f5f4; 
}

::-webkit-scrollbar-thumb {
    background: #d6d3d1; 
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a29e; 
}
```

---

## Phase 4: JavaScript Interactivity

### Step 4.1: Implement Tab Switching

Create the core navigation logic:

```javascript
function switchTab(tabId) {
    // Hide all sections
    ['rust', 'script', 'ethics'].forEach(id => {
        document.getElementById(`${id}-section`).classList.add('hidden');
        document.getElementById(`nav-${id}`).classList.remove('nav-active', 'text-amber-700');
        document.getElementById(`nav-${id}`).classList.add('text-stone-500');
    });

    // Show selected section
    document.getElementById(`${tabId}-section`).classList.remove('hidden');
    
    // Update Nav State
    const activeBtn = document.getElementById(`nav-${tabId}`);
    activeBtn.classList.add('nav-active', 'text-amber-700');
    activeBtn.classList.remove('text-stone-500');

    // Trigger chart resize for Plotly (fixes rendering issues)
    if(tabId === 'script') {
        Plotly.relayout('retentionPlot', {autosize: true});
    }
}
```

**Key concepts:**
- **Loop through all sections**: Ensures clean state
- **Class manipulation**: Tailwind's utility classes for show/hide
- **Chart resize**: Plotly charts need manual resize on visibility change

### Step 4.2: Create Pipeline Interaction

Build the interactive diagram logic:

```javascript
function updatePipelineInfo(stage) {
    const display = document.getElementById('pipeline-details');
    let content = '';
    
    if (stage === 'input') {
        content = `
            <strong class="text-amber-700 block mb-1">1. Initialization</strong>
            Use <code class="bg-stone-200 px-1 rounded">serde_json</code> to deserialize your script file. 
            Pre-load assets into memory or create an LRU Cache. 
            <br><br>
            <em class="text-stone-500">Rust Tip:</em> Use <code class="bg-stone-200 px-1 rounded">Arc&lt;Mutex&lt;Asset&gt;&gt;</code> if sharing assets across threads.
        `;
    } else if (stage === 'draw') {
        content = `
            <strong class="text-amber-700 block mb-1">2. The Draw Loop</strong>
            Iterate through frames (e.g., 0 to 1000). For each frame, use <code class="bg-stone-200 px-1 rounded">wgpu</code> 
            to composite images/text onto a buffer.
            <br><br>
            <em class="text-stone-500">Rust Tip:</em> Parallelize this! Use <code class="bg-stone-200 px-1 rounded">rayon::par_iter()</code> to render frames concurrently.
        `;
    } else if (stage === 'encode') {
        content = `
            <strong class="text-amber-700 block mb-1">3. Encoding</strong>
            Push raw RGB buffers into <code class="bg-stone-200 px-1 rounded">ffmpeg-next</code> encoder. Mux audio and video streams together.
            <br><br>
            <em class="text-stone-500">Rust Tip:</em> Ensure you are sending raw pointers efficiently to FFMPEG C-bindings.
        `;
    }
    
    display.innerHTML = content;
}
```

**Best practices:**
- **Content as data**: Separate content from logic
- **Template literals**: Clean multi-line HTML strings
- **Inline styles**: Tailwind classes in the template

---

## Phase 5: Data Visualizations

### Step 5.1: Create Bar Chart (Chart.js)

Initialize the Rust performance comparison chart:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const ctxRust = document.getElementById('rustPerfChart').getContext('2d');
    
    new Chart(ctxRust, {
        type: 'bar',
        data: {
            labels: ['Rust (FFmpeg Bindings)', 'Python (MoviePy)', 'Node.js (Fluent-FFmpeg)'],
            datasets: [{
                label: 'Time to Render (Seconds)',
                data: [4.2, 12.5, 9.8],
                backgroundColor: [
                    'rgba(180, 83, 9, 0.8)', // Amber for Rust
                    'rgba(120, 113, 108, 0.6)', // Stone for others
                    'rgba(120, 113, 108, 0.6)'
                ],
                borderColor: [
                    'rgba(180, 83, 9, 1)',
                    'rgba(120, 113, 108, 1)',
                    'rgba(120, 113, 108, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' seconds';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { 
                        display: true, 
                        text: 'Seconds (Lower is Better)' 
                    }
                }
            }
        }
    });
});
```

**Chart.js configuration breakdown:**
- **`responsive: true`**: Chart resizes with container
- **`maintainAspectRatio: false`**: Allows custom height
- **Color coding**: Amber for Rust highlights the winner
- **Custom tooltips**: Shows " seconds" suffix

### Step 5.2: Create Line Chart (Plotly.js)

Build the retention curve visualization:

```javascript
function updateRetention(type) {
    const plotDiv = document.getElementById('retentionPlot');
    const insightDiv = document.getElementById('graph-insight');

    let xData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Percent of video
    let yData = [];
    let annotations = [];
    let color = '#d97706';

    if (type === 'educational') {
        yData = [100, 85, 80, 78, 77, 76, 75, 74, 70, 50, 20];
        color = '#059669'; // Emerald
        insightDiv.innerHTML = "<strong>The Educational Arc:</strong> A sharp drop initially filters the audience. A flat line means you are delivering constant value.";
        annotations = [
            {x: 5, y: 90, text: 'Hook: The Problem', showarrow: true, arrowhead: 2},
            {x: 50, y: 80, text: 'Value Delivery', showarrow: false},
            {x: 90, y: 60, text: 'Summary/CTA', showarrow: true, arrowhead: 2}
        ];
    } else if (type === 'story') {
        yData = [100, 90, 85, 88, 82, 85, 80, 88, 92, 60, 10];
        color = '#d97706'; // Amber
        insightDiv.innerHTML = "<strong>The Narrative Arc:</strong> Notice the jagged line? These are 'Curiosity Gaps' and 'Mini-Resolutions'.";
        annotations = [
            {x: 10, y: 92, text: 'Inciting Incident', showarrow: true, arrowhead: 2},
            {x: 50, y: 88, text: 'Rising Action', showarrow: true, arrowhead: 2},
            {x: 80, y: 95, text: 'Climax', showarrow: true, arrowhead: 2}
        ];
    } else {
        yData = [100, 60, 40, 30, 25, 20, 15, 10, 5, 2, 0];
        color = '#dc2626'; // Red
        insightDiv.innerHTML = "<strong>The Flatline:</strong> The hook was weak (40% drop instantly). The middle dragged on with no new information.";
        annotations = [
            {x: 5, y: 70, text: 'Boring Intro', showarrow: true, arrowhead: 2},
            {x: 40, y: 30, text: 'Rambling', showarrow: true, arrowhead: 2}
        ];
    }

    const trace = {
        x: xData,
        y: yData,
        mode: 'lines',
        line: {
            color: color,
            width: 3,
            shape: 'spline'
        },
        fill: 'tozeroy',
        fillcolor: color + '20' // Low opacity fill
    };

    const layout = {
        margin: {t: 20, r: 20, b: 40, l: 40},
        xaxis: {title: '% of Video Duration', fixedrange: true},
        yaxis: {title: '% Audience Retention', range: [0, 105], fixedrange: true},
        annotations: annotations,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };

    const config = {displayModeBar: false, responsive: true};

    Plotly.newPlot(plotDiv, [trace], layout, config);
}

// Initialize with default view
document.addEventListener('DOMContentLoaded', () => {
    updateRetention('educational');
});
```

**Plotly.js techniques:**
- **Spline interpolation**: `shape: 'spline'` creates smooth curves
- **Annotations**: Contextual labels on the chart
- **Dynamic data**: Same function handles three different datasets
- **Fill to zero**: `fill: 'tozeroy'` creates area chart effect

### Step 5.3: Create Radar Chart (Chart.js)

Build the interactive credibility balance chart:

```javascript
let ethicsChart;

function initRadar() {
    const ctx = document.getElementById('ethicsRadar').getContext('2d');
    
    const data = {
        labels: [
            'Accuracy',
            'Engagement',
            'Nuance',
            'Accessibility',
            'Charity'
        ],
        datasets: [{
            label: 'Rhetorical Profile',
            data: [50, 50, 50, 50, 50],
            fill: true,
            backgroundColor: 'rgba(217, 119, 6, 0.2)', // Amber
            borderColor: 'rgb(217, 119, 6)',
            pointBackgroundColor: 'rgb(217, 119, 6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(217, 119, 6)'
        }]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: { borderWidth: 3 }
            },
            scales: {
                r: {
                    angleLines: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false } // Clean look
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    };

    ethicsChart = new Chart(ctx, config);

    // Attach listeners to sliders
    ['hype', 'nuance', 'charity'].forEach(id => {
        document.getElementById(`slider-${id}`).addEventListener('input', updateRadar);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    initRadar();
});
```

### Step 5.4: Implement Slider Logic

Create dynamic radar chart updates:

```javascript
function updateRadar() {
    const hype = parseInt(document.getElementById('slider-hype').value);
    const nuance = parseInt(document.getElementById('slider-nuance').value);
    const charity = parseInt(document.getElementById('slider-charity').value);

    // Update text labels
    document.getElementById('val-hype').innerText = hype + '%';
    document.getElementById('val-nuance').innerText = nuance + '%';
    document.getElementById('val-charity').innerText = charity + '%';

    // Calculate derived values
    let engagement = hype; 
    let complex_nuance = nuance;
    let access = 100 - (nuance * 0.5); // Nuance hurts accessibility slightly
    if (hype > 80) access += 10; // Hype boosts accessibility

    let acc = 50 + (charity * 0.3) + (nuance * 0.2); 
    if (hype > 90) acc -= 20; // Too much hype kills accuracy (clickbait)

    // Update chart data
    ethicsChart.data.datasets[0].data = [acc, engagement, complex_nuance, access, charity];
    ethicsChart.update();

    // Dynamic text analysis
    const output = document.getElementById('ethics-output');
    if (hype > 80 && acc < 40) {
        output.innerText = "WARNING: SENSATIONALIST. You are prioritizing trendiness over truth.";
        output.className = "text-red-600 font-mono text-xs font-bold";
    } else if (nuance > 80 && engagement < 30) {
        output.innerText = "WARNING: ACADEMIC. Your discourse is loyal and exact, but boring.";
        output.className = "text-stone-500 font-mono text-xs font-bold";
    } else if (charity > 80 && acc > 80) {
        output.innerText = "STATUS: STEELMAN. You are engaging with the best version of the topic.";
        output.className = "text-green-700 font-mono text-xs font-bold";
    } else {
        output.innerText = "STATUS: BALANCED. Adjust sliders to see extremes.";
        output.className = "text-stone-700 font-mono text-xs";
    }
}
```

**Advanced techniques:**
- **Derived calculations**: Create relationships between input values
- **Conditional logic**: Different messages based on slider combinations
- **Dynamic class assignment**: Change text color based on analysis

---

## Phase 6: Testing and Refinement

### Step 6.1: Browser Testing Checklist

Test your website across different browsers and devices:

```markdown
## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

## Feature Testing
- [ ] Tab switching works smoothly
- [ ] Charts render correctly
- [ ] Charts resize on tab switch
- [ ] Sliders update radar chart
- [ ] Pipeline diagram updates on click
- [ ] Retention buttons change chart
```

### Step 6.2: Performance Optimization

Check your website's performance:

```bash
# Open Chrome DevTools
# Go to Lighthouse tab
# Run audit for:
# - Performance
# - Accessibility
# - Best Practices
# - SEO
```

**Target scores:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Step 6.3: Accessibility Review

Ensure your website is accessible:

```markdown
## Accessibility Checklist
- [ ] All images have alt text
- [ ] Color contrast ratio > 4.5:1
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] ARIA labels on interactive elements
- [ ] Semantic HTML used
```

### Step 6.4: Code Cleanup

Final polish before deployment:

1. **Remove console.logs**: Clean up debugging statements
2. **Add comments**: Document complex logic
3. **Format code**: Consistent indentation
4. **Validate HTML**: Use [W3C Validator](https://validator.w3.org/)

### Step 6.5: Deploy to GitHub Pages

Follow the deployment tutorial to publish your website:

```bash
# Initialize git
git init
git branch -M main

# Add files
git add .

# Commit with proper message
git commit -m "feat: initial Digital Artisan website"

# Create GitHub repo and push
gh repo create digital-artisan --public --source=. --remote=origin --push

# Enable GitHub Pages
gh api repos/$(gh repo view --json owner -q .owner.login)/digital-artisan/pages \
  -X POST -f "source[branch]=main" -f "source[path]=/"
```

---

## Summary

You've now built a complete multi-section interactive dashboard website! Here's what you've learned:

### Technical Skills
- ✅ Structuring complex HTML layouts
- ✅ Using Tailwind CSS for rapid styling
- ✅ Implementing tab-based navigation
- ✅ Creating interactive diagrams
- ✅ Building data visualizations with Chart.js and Plotly.js
- ✅ Handling real-time slider inputs
- ✅ Managing responsive design

### Design Principles
- ✅ Creating cohesive color palettes
- ✅ Implementing consistent spacing
- ✅ Building card-based layouts
- ✅ Designing for accessibility

### JavaScript Patterns
- ✅ Event-driven programming
- ✅ DOM manipulation
- ✅ Dynamic content updates
- ✅ Chart library integration

## Next Steps

To extend this PoC, consider:

1. **Add more sections**: Expand to 4-5 pillars
2. **Implement dark mode**: Toggle between light/dark themes
3. **Add animations**: Smooth transitions between sections
4. **Create mobile menu**: Hamburger menu for small screens
5. **Add form functionality**: Contact form or newsletter signup
6. **Integrate backend**: Connect to API for dynamic data
7. **Add search**: Search across all sections
8. **Implement comments**: Discussion section for each pillar

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Plotly.js Documentation](https://plotly.com/javascript/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Congratulations!** You've completed the "Digital Artisan" PoC tutorial. You now have a solid foundation for building interactive, multi-section dashboard websites.
