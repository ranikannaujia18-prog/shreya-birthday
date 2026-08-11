const intro=document.getElementById("intro");
const site=document.getElementById("site");
const loader=document.getElementById("loader");
const musicBtn=document.getElementById("musicBtn");
const yt=document.getElementById("yt");
let playing=false;

window.addEventListener("load",()=>{
  setTimeout(()=>{loader.style.opacity="0";setTimeout(()=>loader.remove(),600)},500);
  makeBackgroundHearts();
});

function ytCommand(command){
  if(yt && yt.contentWindow){
    yt.contentWindow.postMessage(JSON.stringify({
      event:"command",func:command,args:[]
    }),"*");
  }
}

function startMusic(){
  ytCommand("playVideo");
  playing=true;
  musicBtn.textContent="🔊 Music On";
}

document.getElementById("openBtn").addEventListener("click",()=>{
  intro.style.opacity="0";
  setTimeout(()=>{intro.style.display="none";site.classList.remove("hidden");startMusic();burst();},800);
});

musicBtn.addEventListener("click",()=>{
  if(playing){ytCommand("pauseVideo");playing=false;musicBtn.textContent="🔇 Music Off"}
  else startMusic();
});

document.getElementById("wishBtn").addEventListener("click",()=>{
  toast("✨ Make your wish, Shreya! ✨");
  burst();
});

document.getElementById("magicBtn").addEventListener("click",()=>{
  document.getElementById("wishResult").style.display="block";
  burst();
  toast("Your wish has been sent to the stars 💫");
});

document.getElementById("finalBtn").addEventListener("click",()=>{
  document.getElementById("finalMessage").style.display="block";
  burst(80);
  document.getElementById("finalMessage").scrollIntoView({behavior:"smooth",block:"center"});
});

function burst(count=55){
  const box=document.getElementById("confetti");
  const items=["❤️","💗","💕","✨","🎉","🎈","💖","⭐","🌸"];
  for(let i=0;i<count;i++){
    const el=document.createElement("span");
    el.className="conf";
    el.textContent=items[Math.floor(Math.random()*items.length)];
    el.style.left=Math.random()*100+"vw";
    el.style.fontSize=(14+Math.random()*18)+"px";
    el.style.animationDuration=(2+Math.random()*2.5)+"s";
    box.appendChild(el);
    setTimeout(()=>el.remove(),5000);
  }
}

function makeBackgroundHearts(){
  const bg=document.querySelector(".hearts-bg");
  for(let i=0;i<18;i++){
    const h=document.createElement("span");
    h.className="balloon";
    h.textContent=Math.random()>.45?"♡":"✦";
    h.style.left=Math.random()*100+"vw";
    h.style.animationDuration=(10+Math.random()*12)+"s";
    h.style.animationDelay=(-Math.random()*15)+"s";
    h.style.fontSize=(15+Math.random()*25)+"px";
    h.style.opacity=.18+Math.random()*.3;
    bg.appendChild(h);
  }
}

function toast(text){
  const t=document.getElementById("toast");
  t.textContent=text;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2600);
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightboxImg");
const caption=document.getElementById("lightboxCaption");

document.querySelectorAll(".photo-card").forEach(card=>{
  card.addEventListener("click",()=>{
    lightboxImg.src=card.dataset.img;
    caption.textContent=card.dataset.caption;
    lightbox.classList.add("open");
  });
});
document.getElementById("closeLightbox").addEventListener("click",()=>lightbox.classList.remove("open"));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")lightbox.classList.remove("open")});
