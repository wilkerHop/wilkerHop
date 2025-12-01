import{f as i,c as r,a as l,b as p}from"./utils-ClY_IYK1.js";async function d(){try{const o=document.getElementById("stats-grid"),t=document.getElementById("repos-grid");if(!o||!t){console.error("Required elements not found");return}o.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading stats...</div>',t.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading repositories...</div>';const{stats:e,repositories:c}=await i();o.innerHTML=`
      ${r(e.totalRepos.toString(),"REPOSITORIES","bg-neon-yellow")}
      ${r(l(e.totalStars),"TOTAL STARS","bg-hot-pink")}
      ${r(l(e.totalForks),"TOTAL FORKS","bg-electric-cyan")}
      ${r(e.languages[0]?.name||"N/A","TOP LANGUAGE","bg-neon-green")}
    `,t.innerHTML=c.slice(0,12).map(n=>p(n)).join("");const s=document.getElementById("demos-dropdown");if(s){const{articles:n}=await i();n.length>0?s.innerHTML=n.map(a=>`
          <a href="${a.homepage}" 
             class="block px-4 py-3 border-b-2 border-brutal-black hover:bg-neon-yellow font-bold uppercase text-sm last:border-b-0 transition-colors">
            ${a.name}
          </a>
        `).join(""):s.innerHTML='<div class="p-4 text-center font-mono text-sm">No demos available</div>'}}catch(o){console.error("Error initializing portfolio:",o);const t=document.getElementById("stats-grid"),e=document.getElementById("repos-grid");t&&(t.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading stats</div>'),e&&(e.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading repositories</div>')}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
