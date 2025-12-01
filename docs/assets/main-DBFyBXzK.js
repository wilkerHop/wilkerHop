import{f as l}from"./github-api-BtgFlwTg.js";import{c as r,f as d,a as m}from"./utils-ljjxNF0z.js";async function c(){var a;try{const o=document.getElementById("stats-grid"),t=document.getElementById("repos-grid");if(!o||!t){console.error("Required elements not found");return}o.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading stats...</div>',t.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading repositories...</div>';const{stats:e,repositories:p}=await l();o.innerHTML=`
      ${r(e.totalRepos.toString(),"REPOSITORIES","bg-neon-yellow")}
      ${r(d(e.totalStars),"TOTAL STARS","bg-hot-pink")}
      ${r(d(e.totalForks),"TOTAL FORKS","bg-electric-cyan")}
      ${r(((a=e.languages[0])==null?void 0:a.name)||"N/A","TOP LANGUAGE","bg-neon-green")}
    `,t.innerHTML=p.slice(0,12).map(n=>m(n)).join("");const s=document.getElementById("demos-dropdown");if(s){const{articles:n}=await l();n.length>0?s.innerHTML=n.map(i=>`
          <a href="${i.homepage}" 
             class="block px-4 py-3 border-b-2 border-brutal-black hover:bg-neon-yellow font-bold uppercase text-sm last:border-b-0 transition-colors">
            ${i.name}
          </a>
        `).join(""):s.innerHTML='<div class="p-4 text-center font-mono text-sm">No demos available</div>'}}catch(o){console.error("Error initializing portfolio:",o);const t=document.getElementById("stats-grid"),e=document.getElementById("repos-grid");t&&(t.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading stats</div>'),e&&(e.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading repositories</div>')}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
