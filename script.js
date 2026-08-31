const slides=[...document.querySelectorAll(".slide")],dots=[...document.querySelectorAll(".dot")];
let current=0,timer;
function showSlide(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle("active",n===current));dots.forEach((d,n)=>d.classList.toggle("active",n===current));}
function auto(){clearInterval(timer);timer=setInterval(()=>showSlide(current+1),5500)}
dots.forEach((d,i)=>d.addEventListener("click",()=>{showSlide(i);auto()})); auto();

const menu=document.querySelector(".menu-btn"),nav=document.querySelector(".nav");
if(menu && nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});}
if(nav){nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");if(menu)menu.setAttribute("aria-expanded","false");}));}

async function postForm(form, endpoint){
  const msg=form.querySelector(".form-msg");
  const btn=form.querySelector("button");
  btn.disabled=true; btn.textContent="Submitting...";
  try{
    const body=Object.fromEntries(new FormData(form).entries());
    if(form.dataset.article) body.article=form.dataset.article;
    const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const data=await r.json();
    if(!r.ok) throw new Error(data.message||"Unable to submit");
    msg.textContent=data.message;
    form.reset();
  }catch(e){msg.textContent=e.message}
  finally{btn.disabled=false;btn.textContent=form.classList.contains("comment-form")?"Submit Comment":"Submit";}
}
const contactForm=document.querySelector("#contactForm");
if(contactForm){
  contactForm.addEventListener("submit",e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(contactForm).entries());
    const subject=encodeURIComponent("CleverClimbers Website Enquiry - "+(data.name||"Visitor"));
    const body=encodeURIComponent(
      "Name: "+(data.name||"")+"\n"+
      "Email: "+(data.email||"")+"\n"+
      "Phone: "+(data.phone||"")+"\n"+
      "Message: "+(data.message||"")
    );
    window.location.href="mailto:Cleverclimberindia@gmail.com?subject="+subject+"&body="+body;
  });
}
document.querySelectorAll(".comment-form").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();postForm(e.currentTarget,"/api/comments")}));
