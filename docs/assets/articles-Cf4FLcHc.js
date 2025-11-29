import{f as l,d as o}from"./utils-BA0G6loU.js";async function n(){try{const e=document.getElementById("articles-grid");if(!e){console.error("Articles grid element not found");return}e.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading articles...</div>';const{articles:r}=await l(),i=r.filter(t=>t.homepage);if(i.length===0){e.innerHTML=`
        <div class="col-span-full text-center p-12">
          <div class="brutal-card bg-neon-yellow inline-block">
            <h2 class="text-3xl font-black uppercase mb-4">No Live Demos Yet</h2>
            <p class="font-mono">Add the 'article' topic and a homepage URL to repositories to showcase live demos here!</p>
          </div>
        </div>
      `;return}e.innerHTML=i.map(t=>o(t)).filter(t=>t!=="").join("")}catch(e){console.error("Error initializing articles:",e);const r=document.getElementById("articles-grid");r&&(r.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading articles</div>')}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n();
