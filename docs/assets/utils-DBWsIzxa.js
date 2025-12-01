function l(a){return a.toLocaleString()}function r(a,t,e="bg-neon-yellow"){return`
    <a href="${t}" 
       class="brutal-btn ${e} inline-block px-6 py-3 text-brutal-black
              border-4 border-brutal-black font-bold uppercase tracking-wider
              shadow-brutal hover:shadow-brutal-hover
              transition-all duration-75
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
       target="_blank" rel="noopener noreferrer">
      ${a}
    </a>
  `}function n(a){const t=a.topics.slice(0,5).map(e=>`<span class="brutal-tag px-2 py-1 bg-brutal-black text-neon-cyan border-2 border-neon-cyan text-xs font-mono uppercase">${e}</span>`).join("");return`
    <div class="brutal-card bg-brutal-white border-5 border-brutal-black p-6
                shadow-brutal-lg hover:shadow-brutal
                hover:translate-x-[4px] hover:translate-y-[4px]
                transition-all duration-100">
      <div class="brutal-accent-left brutal-accent-pink pl-4 mb-4">
        <h3 class="text-xl sm:text-2xl font-black uppercase">${a.name}</h3>
      </div>
      <p class="text-sm mb-4 line-clamp-3">${a.description||"No description"}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${t}
      </div>
      <div class="flex justify-between items-center text-sm">
        <div class="flex gap-4">
          ${a.language?`<span class="font-mono">💻 ${a.language}</span>`:""}
          <span class="font-mono">⭐ ${a.stargazers_count}</span>
        </div>
        <a href="${a.html_url}" 
           class="brutal-link font-bold uppercase underline decoration-4"
           target="_blank" rel="noopener noreferrer">
          VIEW →
        </a>
      </div>
    </div>
  `}function s(a){return`
    <article class="brutal-card bg-brutal-white border-5 border-brutal-black p-6
                    shadow-brutal-lg hover:shadow-brutal
                    hover:translate-x-[4px] hover:translate-y-[4px]
                    transition-all duration-100">
      ${a.imageUrl?`
        <div class="border-4 border-brutal-black mb-6 overflow-hidden">
          <img src="${a.imageUrl}" 
               alt="${a.name}" 
               class="w-full h-48 object-cover"
               loading="lazy">
        </div>
      `:""}
      <div class="brutal-accent-left brutal-accent-cyan pl-4 mb-4">
        <h2 class="text-2xl sm:text-3xl font-black uppercase">${a.name}</h2>
      </div>
      <p class="text-base mb-6 leading-relaxed">${a.summary}</p>
      <div class="flex gap-4">
        ${r("VIEW LIVE DEMO",a.homepage||"#","bg-hot-pink")}
      </div>
    </article>
  `}function o(a,t,e){return`
    <div class="brutal-stat ${e} border-5 border-brutal-black p-6 sm:p-8 text-center
                shadow-brutal">
      <div class="text-4xl sm:text-5xl font-black mb-2">${t}</div>
      <div class="text-xs sm:text-sm font-mono uppercase tracking-widest">${a}</div>
    </div>
  `}export{n as a,s as b,o as c,l as f};
