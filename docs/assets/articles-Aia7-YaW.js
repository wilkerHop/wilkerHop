import{f as n,d as c}from"./utils-DOp5qTGZ.js";async function r(){try{const e=document.getElementById("articles-grid");if(!e){console.error("Articles grid element not found");return}e.innerHTML='<div class="col-span-full text-center text-2xl font-black uppercase">Loading articles...</div>';const{articles:t}=await n();if(t.length===0){e.innerHTML=`
        <div class="col-span-full text-center p-12">
          <div class="brutal-card bg-neon-yellow inline-block">
            <h2 class="text-3xl font-black uppercase mb-4">No Articles Yet</h2>
            <p class="font-mono">Add the 'article' topic to your repositories to showcase them here!</p>
          </div>
        </div>
      `;return}e.innerHTML=t.map(i=>c(i)).join("")}catch(e){console.error("Error initializing articles:",e);const t=document.getElementById("articles-grid");t&&(t.innerHTML='<div class="col-span-full text-center text-red-600 font-black">Error loading articles</div>')}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();
