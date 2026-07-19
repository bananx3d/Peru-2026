
(() => {
  const D = window.TRIP_DATA;
  const state = {
    route: location.hash.replace("#/","") || "dashboard",
    lang: localStorage.getItem("peru2026:lang") || "pl",
    amazonTab: "plan"
  };

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const t = value => typeof value === "string" ? value : (value?.[state.lang] ?? value?.pl ?? "");
  const fmtDate = iso => new Intl.DateTimeFormat(state.lang==="pl"?"pl-PL":"en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(iso+"T12:00:00"));
  const safe = s => String(s ?? "").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  const key = name => `peru2026:${name}`;
  const store = (name,val) => localStorage.setItem(key(name),JSON.stringify(val));
  const load = (name,fallback) => { try{return JSON.parse(localStorage.getItem(key(name))) ?? fallback}catch{return fallback} };

  function showToast(msg){
    const el=$("#toast"); el.textContent=msg; el.classList.add("show");
    clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>el.classList.remove("show"),2200);
  }

  function setRoute(route){
    state.route=route;
    location.hash=`#/${route}`;
    render();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function renderNav(){
    const nav=$("#sideNav");
    nav.innerHTML=D.navigation.map(([id,icon,label])=>`
      <button class="nav-item ${state.route===id?"active":""}" data-route="${id}">
        <span class="nav-icon">${icon}</span><span>${t(label)}</span>
      </button>`).join("");
    $$(".nav-item",nav).forEach(b=>b.onclick=()=>{setRoute(b.dataset.route);$(".sidebar").classList.remove("open")});

    const bottomItems=[
      ["dashboard","⌂",{pl:"Start",en:"Home"}],
      ["plan","▦",{pl:"Plan",en:"Plan"}],
      ["reservations","▣",{pl:"Rezerwacje",en:"Bookings"}],
      ["amazon","❧",{pl:"Amazonia",en:"Amazon"}],
      ["more","☰",{pl:"Więcej",en:"More"}]
    ];
    $("#bottomNav").innerHTML=bottomItems.map(([id,icon,label])=>`
      <button class="${state.route===id || (id==="more" && !["dashboard","plan","reservations","amazon"].includes(state.route))?"active":""}" data-route="${id}">
        <strong>${icon}</strong>${t(label)}
      </button>`).join("");
    $$("#bottomNav button").forEach(b=>b.onclick=()=>{
      if(b.dataset.route==="more") $(".sidebar").classList.add("open"); else setRoute(b.dataset.route);
    });
  }

  function hero({title,subtitle,image,breadcrumb,meta=[]}){
    return `<section class="page-hero" style="background-image:url('${image}')">
      <div class="page-hero-content">
        <div class="breadcrumb">${breadcrumb || "PERU 2026"}</div>
        <h1>${title}</h1>
        <p>${subtitle || ""}</p>
        <div class="hero-meta">${meta.map(x=>`<span class="meta-pill">${x}</span>`).join("")}</div>
      </div>
    </section>`;
  }

  function statusLabel(status){
    return status==="confirmed"
      ? `<span class="status confirmed">${state.lang==="pl"?"Potwierdzone":"Confirmed"}</span>`
      : `<span class="status todo">${state.lang==="pl"?"Do zrobienia":"To do"}</span>`;
  }

  function currentTripDay(now=new Date()){
    return D.tripDays.find(d=>{
      const start=new Date(d.date+"T00:00:00-05:00");
      const end=new Date(d.end+"T23:59:59-05:00");
      return now>=start && now<=end;
    });
  }

  function nextEvent(now=new Date()){
    return D.events.map(([date,label])=>({date:new Date(date),label})).filter(e=>e.date>now).sort((a,b)=>a.date-b.date)[0];
  }

  function durationText(ms){
    if(ms<=0) return state.lang==="pl"?"teraz":"now";
    const days=Math.floor(ms/86400000), hours=Math.floor(ms%86400000/3600000), mins=Math.floor(ms%3600000/60000);
    if(days>0) return state.lang==="pl"?`${days} dni ${hours} godz.`:`${days}d ${hours}h`;
    if(hours>0) return state.lang==="pl"?`${hours} godz. ${mins} min`:`${hours}h ${mins}m`;
    return `${mins} min`;
  }

  function renderDashboard(){
    const now=new Date(), stage=currentTripDay(now), event=nextEvent(now);
    const start=new Date(D.settings.tripStart);
    const days=Math.max(0,Math.ceil((start-now)/86400000));
    return hero({
      title: state.lang==="pl"?"Peru Expedition 2026":"Peru Expedition 2026",
      subtitle: state.lang==="pl"?"Jedno centrum dowodzenia: plan, Amazonia, Machu Picchu, logistyka, packing i budżet.":"One command center: itinerary, Amazon, Machu Picchu, logistics, packing and budget.",
      image:"assets/sacred-valley.jpg",
      meta:["04–26.09.2026",D.settings.travelers,state.lang==="pl"?"21 dni na miejscu":"21 days on the ground"]
    }) + `
      <div class="grid grid-3">
        <div class="card stat-card"><div class="stat-icon">⌛</div><div><strong>${days}</strong><span>${state.lang==="pl"?"dni do wyjazdu":"days to departure"}</span></div></div>
        <div class="card stat-card"><div class="stat-icon">⌖</div><div><strong>${stage?t(stage.title):"Lima"}</strong><span>${stage?(state.lang==="pl"?"dzisiejszy etap":"today's stage"):(state.lang==="pl"?"pierwszy etap":"first stage")}</span></div></div>
        <div class="card stat-card"><div class="stat-icon">❧</div><div><strong>1920 USD</strong><span>${state.lang==="pl"?"saldo Curassow":"Curassow balance"}</span></div></div>
      </div>
      <div class="grid grid-2" style="margin-top:14px">
        <article class="card notice green">
          <div class="kicker">${state.lang==="pl"?"Najbliższe wydarzenie":"Next event"}</div>
          <h3>${event?safe(t(event.label)):(state.lang==="pl"?"Brak kolejnych wydarzeń":"No upcoming events")}</h3>
          <p>${event?`${event.date.toLocaleString(state.lang==="pl"?"pl-PL":"en-GB",{dateStyle:"medium",timeStyle:"short"})} · ${durationText(event.date-now)}`:""}</p>
        </article>
        <article class="card notice">
          <div class="kicker">${state.lang==="pl"?"Najważniejsza decyzja":"Key decision"}</div>
          <h3>${state.lang==="pl"?"Pociąg po Machu o 20:50":"20:50 train after Machu"}</h3>
          <p>${state.lang==="pl"?"Największy margines po Ruta 2; noc w Ollantaytambo.":"Largest margin after Route 2; overnight in Ollantaytambo."}</p>
        </article>
      </div>
      <div class="section-title"><div><h2>${state.lang==="pl"?"Szybki dostęp":"Quick access"}</h2><p>${state.lang==="pl"?"Najczęściej używane moduły.":"Most-used modules."}</p></div></div>
      <div class="grid grid-3">
        <button class="card action-card" data-action-route="amazon"><div class="kicker">AMAZONIA</div><h3>Curassow 6D/5N</h3><p>${state.lang==="pl"?"Pełny plan i packing.":"Full plan and packing."}</p></button>
        <button class="card action-card" data-action-route="machu"><div class="kicker">MISSION</div><h3>Machu Picchu</h3><p>${state.lang==="pl"?"Plan godzina po godzinie.":"Hour-by-hour plan."}</p></button>
        <button class="card action-card" data-action-route="reservations"><div class="kicker">PRIVATE</div><h3>Notion</h3><p>${state.lang==="pl"?"Kody, adresy i dokumenty.":"Codes, addresses and documents."}</p></button>
      </div>
      <div class="section-title"><div><h2>${state.lang==="pl"?"Galeria wyprawy":"Expedition gallery"}</h2></div></div>
      ${renderGallery()}
    `;
  }

  function renderGallery(){
    const figs=[
      ["assets/amazon-canoe.jpg","Amazonia"],
      ["assets/machu.jpg","Machu Picchu"],
      ["assets/cusco.jpg","Cusco"],
      ["assets/lima.jpg","Lima"],
      ["assets/amazon-lilies.jpg","Victoria amazonica"]
    ];
    return `<div class="gallery">${figs.map(([src,cap])=>`<figure><img src="${src}" alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption></figure>`).join("")}</div>`;
  }

  function renderPlan(){
    return hero({
      title:t({pl:"Plan podróży",en:"Trip itinerary"}),
      subtitle:t({pl:"Chronologiczna oś całej wyprawy — bez prywatnych kodów rezerwacji.",en:"Chronological journey timeline — without private booking codes."}),
      image:"assets/lima.jpg",
      meta:["04–26.09.2026","Lima → Iquitos → Cusco → Machu"]
    }) + `<div class="trip-list">${D.tripDays.map(d=>`
      <article class="trip-card">
        <div class="trip-date"><div><span>${d.place}</span><strong>${fmtDate(d.date).slice(0,5)}</strong></div><small>${d.date===d.end?"":`${fmtDate(d.end).slice(0,5)}`}</small></div>
        <div class="trip-copy"><h3>${t(d.title)}</h3><p>${t(d.summary)}</p><ul>${d.items.map(([time,txt])=>`<li><strong>${time}</strong> — ${t(txt)}</li>`).join("")}</ul></div>
        <div class="trip-image" style="background-image:url('${d.image}')"></div>
      </article>`).join("")}</div>`;
  }

  function renderReservations(){
    return hero({
      title:t({pl:"Rezerwacje",en:"Reservations"}),
      subtitle:t({pl:"Publiczna aplikacja pokazuje status. Pełne adresy, kody i bilety pozostają w prywatnym Notion.",en:"The public app shows status. Full addresses, codes and tickets remain in private Notion."}),
      image:"assets/cusco.jpg",
      meta:[t({pl:"Dane wrażliwe ukryte",en:"Sensitive data hidden"})]
    }) + `
      <article class="card notice">
        <div class="kicker">${state.lang==="pl"?"Prywatne centrum":"Private center"}</div>
        <h3>${state.lang==="pl"?"Otwórz Notion po kody i dokumenty":"Open Notion for codes and documents"}</h3>
        <p>${state.lang==="pl"?"Nie wrzucamy do publicznego GitHuba kodów Airbnb, numerów rezerwacji, pełnych adresów ani PDF-ów.":"Do not place Airbnb codes, booking references, full addresses or PDFs in public GitHub Pages."}</p>
        <a class="primary-button" href="${D.settings.publicNotionUrl}" target="_blank" rel="noopener">Notion ↗</a>
      </article>
      <div class="section-title"><div><h2>${state.lang==="pl"?"Noclegi":"Accommodation"}</h2></div></div>
      <div class="table-wrap"><table><thead><tr><th>${state.lang==="pl"?"Miejsce":"Place"}</th><th>${state.lang==="pl"?"Daty":"Dates"}</th><th>${state.lang==="pl"?"Typ":"Type"}</th><th>Status</th></tr></thead><tbody>
      ${D.publicReservations.map(r=>`<tr><td><strong>${r.place}</strong></td><td>${r.dates}</td><td>${t(r.type)}</td><td>${statusLabel(r.status)}</td></tr>`).join("")}
      </tbody></table></div>`;
  }

  function renderTransport(){
    return hero({
      title:t({pl:"Loty i transport",en:"Flights & transport"}),
      subtitle:t({pl:"Wszystkie odcinki w jednym miejscu, wraz z najważniejszymi marginesami.",en:"All transport legs in one place, including critical buffers."}),
      image:"assets/sacred-valley.jpg",
      meta:[t({pl:"Taxi / Uber dla 3 osób",en:"Taxi / Uber for 3 people"})]
    }) + `
      <div class="table-wrap"><table><thead><tr><th>${state.lang==="pl"?"Data i godzina":"Date & time"}</th><th>${state.lang==="pl"?"Trasa":"Route"}</th><th>${state.lang==="pl"?"Przewoźnik / uwaga":"Carrier / note"}</th><th>Status</th></tr></thead><tbody>
      ${D.transport.map(([date,route,note,status])=>`<tr><td><strong>${date}</strong></td><td>${route}</td><td>${t(note)}</td><td>${statusLabel(status)}</td></tr>`).join("")}
      </tbody></table></div>
      <div class="grid grid-2" style="margin-top:14px">
        <article class="card notice"><h3>07.09 — Lima</h3><p>${state.lang==="pl"?"Zamówić taxi XL około 03:40–03:45; wyjazd najpóźniej 04:00.":"Order XL taxi around 03:40–03:45; leave no later than 04:00."}</p></article>
        <article class="card notice"><h3>14.09 — Iquitos</h3><p>${state.lang==="pl"?"Taxi około 04:40. Sprawdzić, czy bagaż jest nadany aż do Cusco.":"Taxi around 04:40. Confirm baggage is checked through to Cusco."}</p></article>
      </div>`;
  }

  function renderAmazon(){
    const tabs=[
      ["plan",{pl:"Plan pobytu",en:"Itinerary"}],
      ["info",{pl:"Warunki i transport",en:"Conditions & transport"}],
      ["packing",{pl:"Co zabrać",en:"What to bring"}],
      ["wildlife",{pl:"Zwierzęta",en:"Wildlife"}]
    ];
    let body="";
    if(state.amazonTab==="plan"){
      body=D.curassow.days.map(day=>`
        <article class="curassow-day">
          <div class="day-badge"><small>${state.lang==="pl"?"DZIEŃ":"DAY"}</small><strong>${day.day}</strong></div>
          <div><h3>${t(day.title)}</h3><div class="timeline">${day.schedule.map(([time,desc])=>`<div class="timeline-row"><div class="timeline-time">${time}</div><div>${t(desc)}</div></div>`).join("")}</div></div>
          <div class="curassow-photo" style="background-image:url('${day.image}')"></div>
        </article>`).join("");
    } else if(state.amazonTab==="info"){
      body=D.curassow.info.map(s=>`<article class="card" style="margin-bottom:12px"><h3>${t(s.title)}</h3><ul>${s.bullets.map(b=>`<li>${t(b)}</li>`).join("")}</ul></article>`).join("");
    } else if(state.amazonTab==="packing"){
      body=renderPackingGroups("amazon");
    } else {
      body=renderWildlifeCards();
    }
    return hero({
      title:"Curassow Lodge",
      subtitle:t({pl:"6 dni / 5 nocy w sercu Amazonii — pełny program po polsku.",en:"6 days / 5 nights in the Amazon — full translated program."}),
      image:"assets/amazon-hero.jpg",
      breadcrumb:"AMAZONIA › CURASSOW LODGE",
      meta:["07–12.09.2026","Iquitos, Peru",t({pl:"Lodge + obóz w namiotach",en:"Lodge + tent camp"})]
    }) + `
      <div class="tabs-row">${tabs.map(([id,label])=>`<button class="subtab ${state.amazonTab===id?"active":""}" data-amazon-tab="${id}">${t(label)}</button>`).join("")}</div>
      ${body}`;
  }

  function renderMachu(){
    const lines=[
      ["05:00–05:25",{pl:"Pobudka",en:"Wake up"}],
      ["05:30–05:50",{pl:"Wyjście do kolejki autobusowej",en:"Leave for the bus queue"}],
      ["około 06:00",{pl:"Autobus w górę",en:"Bus uphill"}],
      ["07:00",{pl:"Wejście Ruta 3-A i Montaña Waynapicchu",en:"Route 3-A and Waynapicchu Mountain entry"}],
      ["11:15–12:00",{pl:"Wyjście i szybkie jedzenie",en:"Exit and quick food"}],
      ["13:00",{pl:"Najlepsza godzina Ruta 2",en:"Preferred Route 2 time"}],
      ["14:00",{pl:"Plan B dla Ruta 2",en:"Route 2 Plan B"}],
      ["20:50",{pl:"Pociąg do Ollantaytambo",en:"Train to Ollantaytambo"}]
    ];
    return hero({
      title:"Machu Picchu",
      subtitle:t({pl:"Mission Control na 20 września: Waynapicchu, możliwa Ruta 2 i bezpieczny powrót.",en:"Mission Control for 20 September: Waynapicchu, possible Route 2 and a safe return."}),
      image:"assets/machu.jpg",
      meta:["20.09.2026","Ruta 3-A • 07:00","Pociąg • 20:50"]
    }) + `
      <div class="mission-board"><div class="kicker" style="color:#a7d57d">MISSION BRIEF</div><h2>20.09.2026</h2>
      ${lines.map(([time,txt])=>`<div class="mission-line"><time>${time}</time><div>${t(txt)}</div></div>`).join("")}</div>
      <div class="grid grid-2" style="margin-top:14px">
        <article class="card"><div class="kicker">${state.lang==="pl"?"19 września":"19 September"}</div><h3>${state.lang==="pl"?"Zakup Ruta 2 na miejscu":"Buy Route 2 locally"}</h3><ol><li>${state.lang==="pl"?"Oryginalne paszporty całej trójki.":"Original passports for all three."}</li><li>${state.lang==="pl"?"Stanąć w kolejce około 14:45–15:00.":"Join the queue around 14:45–15:00."}</li><li>${state.lang==="pl"?"Priorytet: 13:00, potem 14:00, 15:00 awaryjnie.":"Priority: 13:00, then 14:00, 15:00 as backup."}</li><li>${state.lang==="pl"?"Przy tej samej godzinie: 2A przed 2B.":"At the same time: 2A before 2B."}</li></ol></article>
        <article class="card notice"><div class="kicker">${state.lang==="pl"?"Co zabrać":"Bring"}</div><h3>${state.lang==="pl"?"Mały plecak, zero zbędnego balastu":"Small backpack, no excess weight"}</h3><p>${state.lang==="pl"?"Paszport, woda, lekka kurtka przeciwdeszczowa, powerbank, chusteczki i szybkie przekąski.":"Passport, water, light rain jacket, power bank, tissues and fast snacks."}</p></article>
      </div>`;
  }

  function renderDestination(id){
    const configs={
      cusco:["Cusco i Sacred Valley",{pl:"Aklimatyzacja, kolonialne miasto, inkaskie mury i przejazd przez Świętą Dolinę.",en:"Acclimatization, colonial city, Inca masonry and the Sacred Valley route."},"assets/cusco.jpg"],
      lima:["Lima",{pl:"Miraflores, Barranco, klify Pacyfiku, jedzenie i spokojna końcówka.",en:"Miraflores, Barranco, Pacific cliffs, food and a relaxed finale."},"assets/lima.jpg"]
    };
    const [title,sub,img]=configs[id];
    const content=id==="cusco"
      ? [
          ["15.09",{pl:"Plaza de Armas, San Blas, San Pedro i bardzo wolne tempo.",en:"Plaza de Armas, San Blas, San Pedro and a very slow pace."}],
          ["16.09",{pl:"Drugi dzień aklimatyzacji; bez ciężkich trekkingów.",en:"Second acclimatization day; no hard trekking."}],
          ["17.09",{pl:"Pisac → Moray → Maras / Salineras → Ollantaytambo.",en:"Pisac → Moray → Maras / Salineras → Ollantaytambo."}],
          ["18.09",{pl:"Ruiny i stare miasto Ollantaytambo.",en:"Ollantaytambo ruins and old town."}]
        ]
      : [
          ["Miraflores",{pl:"Klify, parki, ocean i wygodna baza.",en:"Cliffs, parks, ocean and a convenient base."}],
          ["Barranco",{pl:"Kolorowe ulice, kawiarnie, galerie i wieczorny spacer.",en:"Colorful streets, cafés, galleries and an evening walk."}],
          ["Jedzenie",{pl:"Ceviche, causa, lomo saltado i pisco sour.",en:"Ceviche, causa, lomo saltado and pisco sour."}],
          ["Rytm",{pl:"Końcówka ma być spokojna — bez dokładania ciężkich jednodniówek.",en:"The finale should stay relaxed — no extra hard day trips."}]
        ];
    return hero({title,subtitle:t(sub),image:img,meta:[id==="cusco"?"14–19.09":"04–07.09 • 21–26.09"]})+
      `<div class="grid grid-2">${content.map(([h,p])=>`<article class="card"><div class="kicker">${h}</div><h3>${t(p)}</h3></article>`).join("")}</div>
      <div class="section-title"><div><h2>${state.lang==="pl"?"Kadry i klimat":"Frames & atmosphere"}</h2></div></div>${renderGallery()}`;
  }

  function renderFood(){
    return hero({title:t({pl:"Jedzenie i napoje",en:"Food & drinks"}),subtitle:t({pl:"Lista smaków, które warto ogarnąć bez robienia z wyjazdu maratonu restauracji.",en:"A focused taste list without turning the trip into a restaurant marathon."}),image:"assets/lima.jpg"})+
      `<div class="grid grid-2">${D.foods.map(([name,desc])=>`<article class="card food-card"><strong>${name}</strong><p>${t(desc)}</p></article>`).join("")}</div>`;
  }

  function renderWildlifeCards(){
    return `<div class="grid grid-2">${D.wildlife.map(([emoji,name,desc])=>`<article class="card animal-card"><div class="animal-emoji">${emoji}</div><div><h3>${t(name)}</h3><p>${t(desc)}</p></div></article>`).join("")}</div>`;
  }

  function renderWildlife(){
    return hero({title:t({pl:"Zwierzęta Amazonii",en:"Amazon wildlife"}),subtitle:t({pl:"Czego wypatrywać, kiedy i jak robić to bezpiecznie.",en:"What to look for, when, and how to observe safely."}),image:"assets/amazon-monkey.jpg"})+renderWildlifeCards();
  }

  function renderPhoto(){
    const places=[
      ["Lima","assets/lima.jpg",{pl:"Klify Miraflores, szeroki ocean, kolorowe fasady Barranco. Najlepsze miękkie światło pod wieczór.",en:"Miraflores cliffs, wide ocean, colorful Barranco facades. Best soft light in late afternoon."}],
      ["Amazonia","assets/amazon-canoe.jpg",{pl:"Nisko nad wodą, detale liści i owadów, sylwetki przy zachodzie. Zawsze zabezpieczaj sprzęt.",en:"Low over the water, leaf and insect details, sunset silhouettes. Always protect the gear."}],
      ["Cusco","assets/cusco.jpg",{pl:"Plaza de Armas rano, uliczki San Blas i detale inkaskich murów.",en:"Plaza de Armas in the morning, San Blas streets and Inca masonry details."}],
      ["Machu Picchu","assets/machu.jpg",{pl:"Szeroki kadr z Ruta 2, pionowe ujęcia Waynapicchu i sylwetki w chmurach.",en:"Wide Route 2 view, vertical Waynapicchu frames and silhouettes in clouds."}]
    ];
    return hero({title:"Photo Guide",subtitle:t({pl:"Konkretne kadry dla każdego etapu wyprawy.",en:"Specific frames for every stage of the trip."}),image:"assets/machu.jpg"})+
      `<div class="grid grid-2">${places.map(([name,img,desc])=>`<article class="card" style="padding:0;overflow:hidden"><img src="${img}" alt="${name}" style="height:210px;width:100%;object-fit:cover"><div style="padding:16px"><h3>${name}</h3><p>${t(desc)}</p></div></article>`).join("")}</div>`;
  }

  function renderVideo(){
    const shots=[
      {pl:"1 szerokie ujęcie otwierające miejsce",en:"1 wide establishing shot"},
      {pl:"1 POV w ruchu",en:"1 moving POV"},
      {pl:"1 detal",en:"1 detail shot"},
      {pl:"1 krótka wypowiedź do kamery",en:"1 short piece to camera"},
      {pl:"1 ujęcie ludzi i atmosfery",en:"1 people / atmosphere shot"},
      {pl:"1 ujęcie zamykające dzień",en:"1 closing shot"}
    ];
    return hero({title:"Video Shot List",subtitle:t({pl:"Prosty system, żeby nie wrócić z kolejnymi 500 GB chaosu.",en:"A simple system to avoid coming home with another 500 GB of chaos."}),image:"assets/amazon-canoe.jpg"})+
      `<article class="card"><h3>${state.lang==="pl"?"Minimum każdego dnia":"Daily minimum"}</h3>${shots.map((s,i)=>`<label class="check-item"><input type="checkbox" data-check="video-${i}"><span>${t(s)}</span></label>`).join("")}</article>
      <div class="grid grid-2" style="margin-top:14px">
        <article class="card"><h3>Amazonia</h3><ul><li>${state.lang==="pl"?"Długie ujęcia dźwięków natury bez komentarza.":"Long natural-sound clips without commentary."}</li><li>${state.lang==="pl"?"Łódź z przodu i z tyłu.":"Boat from front and rear."}</li><li>${state.lang==="pl"?"Nocna dżungla i realia mokrego sprzętu.":"Night jungle and wet-gear reality."}</li></ul></article>
        <article class="card"><h3>Machu Picchu</h3><ul><li>${state.lang==="pl"?"Pobudka i kolejka do busa.":"Wake-up and bus queue."}</li><li>${state.lang==="pl"?"Pierwsze spojrzenie i reakcje ekipy.":"First reveal and group reactions."}</li><li>${state.lang==="pl"?"Marsz na Waynapicchu i panoramiczne ujęcie.":"Waynapicchu climb and panoramic shot."}</li></ul></article>
      </div>`;
  }

  function renderPackingGroups(prefix="packing"){
    return D.packing.map((group,gi)=>`<section class="check-group card"><h3>${t(group.category)}</h3>${group.items.map(item=>`<label class="check-item"><input type="checkbox" data-check="${prefix}-${item.id}"><span>${state.lang==="pl"?item.pl:item.en}</span></label>`).join("")}</section>`).join("");
  }

  function renderPacking(){
    return hero({title:t({pl:"Packing i checklisty",en:"Packing & checklists"}),subtitle:t({pl:"Lista oparta na materiałach Curassow, uporządkowana pod realny wyjazd.",en:"A practical list based on Curassow materials."}),image:"assets/amazon-frog.jpg"})+
      `<article class="card notice"><h3>${state.lang==="pl"?"Ważne":"Important"}</h3><p>${state.lang==="pl"?"Lodge zapewnia gumowe kalosze. Elektronikę można ładować codziennie, ale powerbank i worki wodoodporne nadal są obowiązkowe.":"The lodge provides rubber boots. Electronics can be charged daily, but a power bank and waterproof bags are still essential."}</p></article>`+
      renderPackingGroups();
  }

  function renderBudget(){
    const entries=load("budgetEntries",[
      {name:"Curassow — saldo",amount:1920,currency:"USD"},
      {name:"Hotele — do wpisania",amount:0,currency:"EUR"}
    ]);
    const totals=entries.reduce((a,e)=>{a[e.currency]=(a[e.currency]||0)+Number(e.amount||0);return a},{});
    return hero({title:t({pl:"Budżet",en:"Budget"}),subtitle:t({pl:"Prosty lokalny tracker. Dane zapisują się tylko w tej przeglądarce.",en:"A simple local tracker. Data is stored only in this browser."}),image:"assets/sacred-valley.jpg"})+
      `<div class="grid grid-3">
        ${Object.entries(totals).map(([cur,val])=>`<article class="card"><div class="kicker">${cur}</div><div class="budget-total">${val.toFixed(2)}</div></article>`).join("")}
      </div>
      <article class="card" style="margin-top:14px">
        <div class="form-row"><input id="budgetName" class="input" placeholder="${state.lang==="pl"?"Nazwa wydatku":"Expense name"}"><div class="form-row"><input id="budgetAmount" class="input" type="number" step="0.01" placeholder="0.00"><select id="budgetCurrency" class="input"><option>EUR</option><option>USD</option><option>PEN</option><option>PLN</option></select></div></div>
        <button id="addBudget" class="primary-button" style="margin-top:10px">${state.lang==="pl"?"Dodaj":"Add"}</button>
        <div class="budget-list" style="margin-top:15px">${entries.map((e,i)=>`<div class="budget-entry"><span>${safe(e.name)}</span><strong>${Number(e.amount).toFixed(2)} ${e.currency}</strong><button class="mini-button" data-delete-budget="${i}">×</button></div>`).join("")}</div>
      </article>`;
  }

  function renderHistory(){
    const items=[
      ["ok. 1200–1532",{pl:"Rozwój państwa Inków i ekspansja Tahuantinsuyu.",en:"Rise of the Inca state and expansion of Tahuantinsuyu."}],
      ["1532",{pl:"Pizarro pojmuje Atahualpę; zaczyna się hiszpański podbój.",en:"Pizarro captures Atahualpa; Spanish conquest begins."}],
      ["1535",{pl:"Założenie Limy jako kolonialnej stolicy.",en:"Lima founded as the colonial capital."}],
      ["1821–1824",{pl:"Niepodległość Peru i ostateczne wyparcie sił hiszpańskich.",en:"Peruvian independence and final defeat of Spanish forces."}],
      ["1911",{pl:"Hiram Bingham popularyzuje Machu Picchu na świecie.",en:"Hiram Bingham popularizes Machu Picchu internationally."}]
    ];
    return hero({title:t({pl:"Minihistoria Peru",en:"A short history of Peru"}),subtitle:t({pl:"Kontekst wystarczający, żeby miejsca nie były tylko ładnymi widokami.",en:"Enough context so the places are more than beautiful views."}),image:"assets/machu.jpg"})+
      `<article class="card"><div class="timeline">${items.map(([time,desc])=>`<div class="timeline-row"><div class="timeline-time">${time}</div><div>${t(desc)}</div></div>`).join("")}</div></article>`;
  }

  function renderJournal(){
    const notes=load("journal",{});
    return hero({title:t({pl:"Dziennik wyprawy",en:"Trip journal"}),subtitle:t({pl:"Notatki zapisują się lokalnie na urządzeniu.",en:"Notes are saved locally on the device."}),image:"assets/lima.jpg"})+
      `<div class="grid grid-2">${D.tripDays.map((d,i)=>`<article class="card journal-entry"><div class="kicker">${d.date} • ${d.place}</div><h3>${t(d.title)}</h3><textarea data-journal="${i}" placeholder="${state.lang==="pl"?"Najlepszy moment, co zjedliśmy, co nas zaskoczyło…":"Best moment, what we ate, what surprised us…"}">${safe(notes[i]||"")}</textarea></article>`).join("")}</div>`;
  }

  function renderSettings(){
    return hero({title:t({pl:"Ustawienia",en:"Settings"}),subtitle:t({pl:"Język, instalacja PWA i zarządzanie lokalnymi danymi.",en:"Language, PWA installation and local data management."}),image:"assets/sacred-valley.jpg"})+
      `<div class="grid grid-2">
        <article class="card"><h3>${state.lang==="pl"?"Język":"Language"}</h3><div class="lang-switch"><button data-lang="pl" class="${state.lang==="pl"?"active":""}">Polski</button><button data-lang="en" class="${state.lang==="en"?"active":""}">English</button></div></article>
        <article class="card"><h3>${state.lang==="pl"?"Instalacja na telefonie":"Install on phone"}</h3><p>${state.lang==="pl"?"iPhone: Safari → Udostępnij → Dodaj do ekranu początkowego. Android: Chrome → Zainstaluj aplikację.":"iPhone: Safari → Share → Add to Home Screen. Android: Chrome → Install app."}</p></article>
        <article class="card"><h3>${state.lang==="pl"?"Prywatne dane":"Private data"}</h3><p>${state.lang==="pl"?"Kody rezerwacji i dokumenty trzymaj w Notion, nie w publicznym repozytorium.":"Keep booking codes and documents in Notion, not in a public repository."}</p><a class="primary-button" href="${D.settings.publicNotionUrl}" target="_blank">Notion ↗</a></article>
        <article class="card"><h3>${state.lang==="pl"?"Wyczyść lokalne dane":"Clear local data"}</h3><p>${state.lang==="pl"?"Usuwa checklisty, budżet i dziennik z tego urządzenia.":"Removes checklists, budget and journal from this device."}</p><button id="clearData" class="outline-button">${state.lang==="pl"?"Wyczyść":"Clear"}</button></article>
      </div>`;
  }

  function renderRoute(){
    switch(state.route){
      case "dashboard": return renderDashboard();
      case "plan": return renderPlan();
      case "reservations": return renderReservations();
      case "transport": return renderTransport();
      case "amazon": return renderAmazon();
      case "machu": return renderMachu();
      case "cusco": return renderDestination("cusco");
      case "lima": return renderDestination("lima");
      case "food": return renderFood();
      case "wildlife": return renderWildlife();
      case "photo": return renderPhoto();
      case "video": return renderVideo();
      case "budget": return renderBudget();
      case "packing": return renderPacking();
      case "history": return renderHistory();
      case "journal": return renderJournal();
      case "settings": return renderSettings();
      default: return renderDashboard();
    }
  }

  function weatherIcon(code){
    if(code===0) return "☀️"; if([1,2].includes(code)) return "🌤️"; if(code===3) return "☁️";
    if([45,48].includes(code)) return "🌫️"; if([51,53,55,61,63,65,80,81,82].includes(code)) return "🌧️";
    if([95,96,99].includes(code)) return "⛈️"; return "🌦️";
  }

  async function loadWeather(){
    const cities=[
      ["Iquitos",-3.7437,-73.2516],
      ["Cusco",-13.5319,-71.9675],
      ["Lima",-12.0464,-77.0428]
    ];
    const cached=load("weather",null);
    if(cached) paintWeather(cached);
    try{
      const data=await Promise.all(cities.map(async([name,lat,lon])=>{
        const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code&timezone=auto`;
        const r=await fetch(url); if(!r.ok) throw new Error("weather");
        const j=await r.json(); return {name,temp:Math.round(j.current.temperature_2m),feels:Math.round(j.current.apparent_temperature),code:j.current.weather_code};
      }));
      store("weather",data); paintWeather(data);
    }catch{}
  }
  function paintWeather(data){
    const box=$("#weatherRows"); if(!box) return;
    box.innerHTML=data.map(x=>`<div class="weather-row"><div class="weather-place"><strong>${x.name}</strong><small>${state.lang==="pl"?"odczuwalna":"feels"} ${x.feels}°</small></div><div class="weather-temp">${x.temp}° ${weatherIcon(x.code)}</div></div>`).join("");
  }

  async function loadFx(){
    const cached=load("fx",null); if(cached) paintFx(cached);
    try{
      const bases=["PEN","USD","EUR"];
      const rows=await Promise.all(bases.map(async base=>{
        const r=await fetch(`https://api.exchangerate.fun/latest?base=${base}`); if(!r.ok) throw new Error("fx");
        const j=await r.json(); return {base,pln:j.rates.PLN};
      }));
      store("fx",rows); paintFx(rows);
    }catch{}
  }
  function paintFx(rows){
    const box=$("#fxRows"); if(!box) return;
    box.innerHTML=rows.map(x=>`<div class="fx-row"><strong>1 ${x.base}</strong><span>${Number(x.pln).toFixed(2)} PLN</span></div>`).join("");
  }

  function renderRail(){
    const now=new Date(), start=new Date(D.settings.tripStart);
    const days=Math.max(0,Math.ceil((start-now)/86400000));
    const total=Math.max(1,Math.ceil((new Date(D.settings.tripEnd)-start)/86400000));
    const tripProgress=now<start?0:Math.min(100,Math.max(0,((now-start)/(new Date(D.settings.tripEnd)-start))*100));
    $("#rightRail").innerHTML=`
      <section class="widget">
        <h3>▣ ${state.lang==="pl"?"Do wyjazdu":"Until departure"}</h3>
        <div class="countdown-big"><span id="railDays">${days}</span> <small>${state.lang==="pl"?"dni":"days"}</small></div>
        <div class="progress"><span style="width:${now<start?Math.max(2,100-days/120*100):tripProgress}%"></span></div>
        <small>${state.lang==="pl"?"04 września 2026":"4 September 2026"}</small>
      </section>
      <section class="widget"><h3>☁ ${state.lang==="pl"?"Aktualna pogoda":"Current weather"}</h3><div id="weatherRows"><div class="empty">${state.lang==="pl"?"Ładowanie…":"Loading…"}</div></div></section>
      <section class="widget"><h3>◉ ${state.lang==="pl"?"Waluty":"Currencies"}</h3><div id="fxRows"><div class="empty">${state.lang==="pl"?"Ładowanie…":"Loading…"}</div></div></section>
      <section class="widget quick-check"><h3>☑ ${state.lang==="pl"?"Amazonia — szybka lista":"Amazon quick list"}</h3>
        ${["passport","repellent","socks","headlamp","powerbank"].map(id=>{
          const item=D.packing.flatMap(g=>g.items).find(x=>x.id===id);
          return `<label class="check-item"><input type="checkbox" data-check="amazon-${id}"><span>${state.lang==="pl"?item.pl:item.en}</span></label>`;
        }).join("")}
      </section>
      <section class="widget"><div class="lang-switch"><button data-lang="pl" class="${state.lang==="pl"?"active":""}">PL</button><button data-lang="en" class="${state.lang==="en"?"active":""}">EN</button></div></section>`;
    loadWeather(); loadFx();
  }

  function bind(){
    $$("[data-action-route]").forEach(b=>b.onclick=()=>setRoute(b.dataset.actionRoute));
    $$("[data-amazon-tab]").forEach(b=>b.onclick=()=>{state.amazonTab=b.dataset.amazonTab;render()});
    $$("[data-lang]").forEach(b=>b.onclick=()=>{state.lang=b.dataset.lang;localStorage.setItem("peru2026:lang",state.lang);render()});
    const top=$("#langTop"); if(top){top.textContent=state.lang==="pl"?"EN":"PL";top.onclick=()=>{state.lang=state.lang==="pl"?"en":"pl";localStorage.setItem("peru2026:lang",state.lang);render()}}
    $$("[data-check]").forEach(box=>{
      const k=`check:${box.dataset.check}`; box.checked=load(k,false);
      box.onchange=()=>store(k,box.checked);
    });
    $$(".accordion-head").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
    $$("#mainContent textarea[data-journal]").forEach(a=>a.oninput=()=>{
      const notes=load("journal",{}); notes[a.dataset.journal]=a.value; store("journal",notes);
    });
    const add=$("#addBudget");
    if(add) add.onclick=()=>{
      const name=$("#budgetName").value.trim(), amount=Number($("#budgetAmount").value), currency=$("#budgetCurrency").value;
      if(!name || !Number.isFinite(amount)){showToast(state.lang==="pl"?"Uzupełnij nazwę i kwotę":"Enter a name and amount");return}
      const entries=load("budgetEntries",[]); entries.push({name,amount,currency}); store("budgetEntries",entries); render();
    };
    $$("[data-delete-budget]").forEach(b=>b.onclick=()=>{const e=load("budgetEntries",[]);e.splice(Number(b.dataset.deleteBudget),1);store("budgetEntries",e);render()});
    const clear=$("#clearData"); if(clear) clear.onclick=()=>{if(confirm(state.lang==="pl"?"Usunąć lokalne checklisty, budżet i dziennik?":"Delete local checklists, budget and journal?")){Object.keys(localStorage).filter(k=>k.startsWith("peru2026:")).forEach(k=>localStorage.removeItem(k));location.reload()}};
  }

  function render(){
    renderNav();
    $("#mainContent").innerHTML=renderRoute();
    renderRail();
    bind();
    document.documentElement.lang=state.lang;
  }

  $("#mobileMenu").onclick=()=>$(".sidebar").classList.toggle("open");
  $("#offlineButton").onclick=()=>showToast(state.lang==="pl"?"Po pierwszym otwarciu aplikacja zapisuje podstawowe pliki offline.":"After the first visit, core files are cached for offline use.");
  window.addEventListener("hashchange",()=>{state.route=location.hash.replace("#/","")||"dashboard";render()});
  if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
  render();
})();
