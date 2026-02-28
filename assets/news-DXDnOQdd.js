import{f as i,g as h}from"./utils-ptpmIc10.js";const f="https://newsapi.org/v2",d="wilkerHop_news_cache",m=360*60*1e3;function b(e){const t=new Set;return e.forEach(n=>{n.topics.forEach(r=>{const o=r.toLowerCase();o.length>2&&!["demo","article","project"].includes(o)&&t.add(o)}),n.language&&t.add(n.language.toLowerCase())}),Array.from(t).slice(0,10)}function w(){try{const e=localStorage.getItem(d);if(!e)return null;const t=JSON.parse(e);return Date.now()-t.timestamp<m?(console.log("📦 Using cached news data"),t.data):(console.log("⏰ Cache expired, fetching fresh news"),null)}catch(e){return console.error("Error reading cache:",e),null}}function x(e,t){try{const n={data:e,timestamp:Date.now(),topics:t};localStorage.setItem(d,JSON.stringify(n)),console.log("💾 News cached successfully")}catch(n){console.error("Error caching news:",n)}}async function v(e){const t=w();if(t)return t;try{const n=e.slice(0,5).join(" OR "),r="";if(!r)return console.warn("⚠️ No NEWS_API_KEY found, using fallback data"),c(e);const o=new URL(`${f}/everything`);o.searchParams.append("q",n),o.searchParams.append("language","en"),o.searchParams.append("sortBy","publishedAt"),o.searchParams.append("pageSize","20"),o.searchParams.append("apiKey",r);const a=await fetch(o.toString());if(!a.ok)throw new Error(`NewsAPI error: ${a.status}`);const s=await a.json();return x(s.articles,e),s.articles}catch(n){return console.error("Error fetching news:",n),c(e)}}function c(e){return console.log("📰 Attempting to fetch from alternative sources..."),[{source:{id:null,name:"GitHub Blog"},author:null,title:`Hot Topics in ${e[0]||"Tech"}: Latest Updates`,description:"Stay updated with the latest developments in your tech stack.",url:"https://github.blog",urlToImage:null,publishedAt:new Date().toISOString(),content:"No API key configured. Please add VITE_NEWS_API_KEY to your .env file for live news."}]}function y(e,t=0){const n=document.createElement("article"),r=h(t,"news"),o=t>=2,a=o?"text-xl":"text-2xl",s=o?"hidden":"font-mono text-sm mb-4 line-clamp-3 flex-grow",u=o?"h-32":"aspect-video";n.className=`${r} bg-brutal-white border-5 border-brutal-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col`;const p=e.urlToImage||"https://placehold.co/400x200/000000/FFFF00?text=News",g=new Date(e.publishedAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return n.innerHTML=`
    <div class="${u} bg-brutal-black border-b-5 border-brutal-black overflow-hidden flex-shrink-0">
      <img 
        src="${p}" 
        alt="${e.title}"
        class="w-full h-full object-cover"
        onerror="this.src='https://placehold.co/400x200/000000/FFFF00?text=News'"
      />
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center gap-2 mb-3">
        <span class="brutal-badge bg-hot-pink text-xs">${e.source.name}</span>
        <span class="text-xs font-mono text-gray-600">${g}</span>
      </div>
      <h3 class="${a} font-black uppercase mb-3 leading-tight">
        ${e.title}
      </h3>
      <p class="${s}">
        ${e.description||"No description available"}
      </p>
      <div class="mt-auto pt-4">
        <a 
          href="${e.url}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="brutal-btn bg-neon-yellow text-sm inline-block"
        >
          READ MORE →
        </a>
      </div>
    </div>
  `,n}function E(){const e=document.getElementById("news-grid");e&&(e.innerHTML=`
    <div class="col-span-full text-center py-20">
      <div class="inline-block animate-spin text-6xl mb-4">📰</div>
      <p class="text-2xl font-black uppercase">Loading Hot Topics...</p>
      <p class="font-mono text-sm mt-2">Fetching latest tech news</p>
    </div>
  `)}function l(e){const t=document.getElementById("news-grid");t&&(t.innerHTML=`
    <div class="col-span-full">
      <div class="bg-hot-pink border-5 border-brutal-black shadow-brutal p-8 text-center text-brutal-white">
        <div class="text-6xl mb-4">⚠️</div>
        <h3 class="text-3xl font-black uppercase mb-4">Oops!</h3>
        <p class="font-mono text-lg">${e}</p>
      </div>
    </div>
  `)}function N(e){const t=document.getElementById("news-grid");if(t){if(e.length===0){l("No news articles found. Try again later!");return}t.innerHTML="",e.forEach((n,r)=>{t.appendChild(y(n,r))})}}async function k(){try{const{articles:e}=await i(),t=document.getElementById("demos-dropdown");if(!t||e.length===0){t&&(t.innerHTML='<div class="p-4 text-center font-mono text-sm">No demos available</div>');return}t.innerHTML=e.map(n=>`
      <a href="${n.homepage}" 
         class="block p-3 hover:bg-neon-yellow transition-colors border-b-2 border-brutal-black last:border-b-0 font-mono text-sm font-bold uppercase">
        ${n.name}
      </a>
    `).join("")}catch(e){console.error("Error loading demos:",e)}}async function C(){console.log("🚀 Initializing News page..."),E();try{const{repositories:e}=await i();if(e.length===0){l("Could not load repository data");return}const t=b(e);if(console.log("📊 Topics:",t),t.length===0){l("No topics found in repositories");return}const n=await v(t);N(n),await k(),console.log("✅ News page initialized")}catch(e){console.error("Error initializing news page:",e),l("Failed to load news. Please try again later.")}}C();
