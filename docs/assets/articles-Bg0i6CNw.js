import{f as a,d as s}from"./utils-CX4Ey5zq.js";/* empty css              */async function i(){try{const e=document.getElementById("articles-grid");if(!e){console.error("Articles grid element not found");return}e.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading articles...</div>';const{articles:o}=await a(),r=o;if(r.length===0){e.innerHTML=`
        <div class="col-span-full text-center p-12">
          <div class="brutal-card bg-neon-yellow inline-block">
            <h2 class="text-3xl font-black uppercase mb-4">No Live Demos Yet</h2>
            <p class="font-mono">Add the 'article' topic and a homepage URL to repositories to showcase live demos here!</p>
          </div>
        </div>
      `;return}e.innerHTML=r.map((t,l)=>s(t,l)).filter(t=>t!=="").join("");const n=document.getElementById("demos-dropdown");n&&(r.length>0?n.innerHTML=r.map(t=>`
          <a href="${t.homepage}" 
             class="block px-4 py-3 border-b-2 border-brutal-black hover:bg-neon-yellow font-bold uppercase text-sm last:border-b-0 transition-colors">
            ${t.name}
          </a>
        `).join(""):n.innerHTML='<div class="p-4 text-center font-mono text-sm">No demos available</div>')}catch(e){console.error("Error initializing articles:",e);const o=document.getElementById("articles-grid");o&&(o.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading articles</div>')}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i();
