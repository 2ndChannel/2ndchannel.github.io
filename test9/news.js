const block=document.getElementById("stream-news");
const text=document.getElementById("news-text");
const close=document.getElementById("close-news");

fetch("news.json")
.then(r=>r.json())
.then(arr=>{
  const now=new Date();

  for(const n of arr){
    const s=n.startDate?new Date(n.startDate):null;
    const e=n.endDate?new Date(n.endDate):null;

    const active=(!s||now>=s)&&(!e||now<=e);

    if(active && !localStorage.getItem("news_"+n.id)){
      text.innerHTML=n.text;
      block.style.display="block";

      close.onclick=()=>{
        block.style.display="none";
        localStorage.setItem("news_"+n.id,"1");
      };

      break;
    }
  }
});