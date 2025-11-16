/* empty css                      */import{S as f,i}from"./assets/vendor-5ObWk2rO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();const g="53279240-6e40a1d36b66aedd6bbd928de",y="https://pixabay.com/api/",h=async r=>{const s=new URLSearchParams({key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"});try{const t=await fetch(`${y}?${s}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error fetching images:",t),t}};let l=null;const v=r=>{const{webformatURL:s,largeImageURL:t,tags:o,likes:e,views:a,comments:n,downloads:p}=r;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${s}"
          alt="${o}"
          loading="lazy"
        />
      </a>
      <div class="image-info">
        <div class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${e}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${a}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${n}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${p}</span>
        </div>
      </div>
    </li>
  `},b=(r,s)=>{const t=r.map(o=>v(o)).join("");s.innerHTML=t,l?l.refresh():l=new f(".gallery-link",{captions:!0,captionsData:"alt",docClose:!0,scrollZoom:!0})},w=r=>{r.innerHTML=""},L=r=>{r.style.display="block"},u=r=>{r.style.display="none"},m=document.querySelector(".search-form"),d=document.querySelector(".gallery"),c=document.querySelector(".loader"),S=async r=>{r.preventDefault();const s=m.querySelector('input[name="searchQuery"]'),t=s.value.trim();if(!t){i.warning({title:"Warning",message:"Please enter a search query",position:"topRight",timeout:3e3});return}w(d),L(c);try{const o=await h(t);if(u(c),o.hits.length===0){i.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3}),s.value="";return}b(o.hits,d),s.value=""}catch(o){u(c),console.error("Error:",o),i.error({title:"Error",message:"Failed to fetch images. Please try again!",position:"topRight",timeout:4e3})}};m.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
