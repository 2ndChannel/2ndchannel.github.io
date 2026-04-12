let gamesData=[];

fetch("games.json")
.then(r=>r.json())
.then(data=>{
  gamesData=data;
  render(data);
});

function render(data){
  const c=document.getElementById("games");
  c.innerHTML="";

  const groups={};

  data.forEach(g=>{
    const k=g.streamTitle||"Без стрима";
    if(!groups[k]) groups[k]=[];
    groups[k].push(g);
  });

  Object.keys(groups).forEach(k=>{
    const box=document.createElement("div");
    box.className="card";

    box.innerHTML=`<h3>${k}</h3><div></div>`;
    const list=box.querySelector("div");

    groups[k].forEach(g=>{
      const d=document.createElement("div");
      d.className="badge "+g.status;

      d.innerHTML=`
        <a href="${g.stream}">🎥</a>
        <a href="${g.download}">⬇</a>
        ${g.name}
      `;

      list.appendChild(d);
    });

    c.appendChild(box);
  });
}

document.addEventListener("change",e=>{
  if(e.target.id==="sortSelect"){
    let s=[...gamesData];

    if(e.target.value==="date")
      s.sort((a,b)=>new Date(b.date)-new Date(a.date));

    if(e.target.value==="name")
      s.sort((a,b)=>a.name.localeCompare(b.name));

    render(s);
  }
});