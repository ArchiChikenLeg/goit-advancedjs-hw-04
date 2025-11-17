/* empty css                      */import{a as q,S,i as p}from"./assets/vendor-DvfmeZXB.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const E="53279240-6e40a1d36b66aedd6bbd928de",P="https://pixabay.com/api/",h=async({query:e,page:r=1,per_page:o=15})=>{try{return(await q.get(P,{params:{key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:o}})).data}catch(s){throw console.error("Error fetching images with axios:",s),s}};let f=null;const R=e=>{const{webformatURL:r,largeImageURL:o,tags:s,likes:t,views:a,comments:d,downloads:w}=e;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${o}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${s}"
          loading="lazy"
        />
      </a>
      <div class="image-info">
        <div class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${t}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${a}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${d}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${w}</span>
        </div>
      </div>
    </li>
  `},v=(e,r,{append:o=!1}={})=>{const s=e.map(t=>R(t)).join("");o?r.insertAdjacentHTML("beforeend",s):r.innerHTML=s,f?f.refresh():f=new S(".gallery-link",{captions:!0,captionsData:"alt",docClose:!0,scrollZoom:!0})},$=e=>{e.innerHTML=""},b=e=>{e.style.display="block"},u=e=>{e.style.display="none"},L=document.querySelector(".search-form"),m=document.querySelector(".gallery"),n=document.querySelector(".loader"),i=document.querySelector(".load-more");let g="",l=1;const y=15;let c=0;const H=async e=>{e.preventDefault();const r=L.querySelector('input[name="searchQuery"]'),o=r.value.trim();if(!o){p.warning({title:"Warning",message:"Please enter a search query",position:"topRight",timeout:3e3});return}$(m),g=o,l=1,c=0,i.style.display="none",b(n);try{const s=await h({query:o,page:l,per_page:y});if(u(n),s.hits.length===0){p.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3}),r.value="";return}v(s.hits,m,{append:!1}),c=s.totalHits||0,c>l*y?i.style.display="inline-block":i.style.display="none",r.value=""}catch(s){u(n),console.error("Error:",s),p.error({title:"Error",message:"Failed to fetch images. Please try again!",position:"topRight",timeout:4e3})}};L.addEventListener("submit",H);i.addEventListener("click",async()=>{if(g){l+=1,i.style.display="none",b(n);try{const e=await h({query:g,page:l,per_page:y});if(u(n),e.hits.length>0){v(e.hits,m,{append:!0});const r=m.querySelector(".gallery-item");if(r){const{height:o}=r.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}c=e.totalHits||c,l*y>=c?(i.style.display="none",p.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3})):i.style.display="inline-block"}catch(e){u(n),console.error("Load more error:",e),p.error({title:"Error",message:"Failed to load more images. Please try again!",position:"topRight",timeout:4e3})}}});
//# sourceMappingURL=index.js.map
