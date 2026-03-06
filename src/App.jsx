import { useState, useEffect, useRef } from "react";

const BLUE = "#1800AD";
const RED = "#e53935";
const GREEN = "#43a047";

const DARK = {
  bg: "#070a1f", panel: "#0b0f32", panelLight: "#0d1038",
  border: "#1a2058", blue: "#1a237e", blueMid: "#283593", blueLight: "#3949ab",
  accent: BLUE, white: "#ffffff", offWhite: "#e8eaf6",
  muted: "#8890b8", mutedDark: "#2e3770",
  red: RED, orange: RED, yellow: BLUE,
  green: GREEN, teal: BLUE, text: "#e8eaf6",
  mapBg: "#03041a", mapLand: "#0d1050",
  headerBg: "linear-gradient(180deg, #0a0d2a 0%, #070a1f 100%)",
  alertBg: "linear-gradient(90deg, #060820 0%, #0a0d2a 100%)",
  tabBg: "#03041a", footerBg: "#03041a",
  scrollBg: "#070a1f", scrollThumb: "#1a2058",
  tooltipBg: "#1a1d4e", tooltipBorder: "#2e3770", tooltipText: "#e8eaf6",
  cardQuoteBg: "#03041a",
};

const LIGHT = {
  bg: "#f0f2fa", panel: "#ffffff", panelLight: "#eef0fb",
  border: "#c8cce8", blue: "#d8ddf5", blueMid: "#b8bfe8", blueLight: "#9aa4d8",
  accent: BLUE, white: "#1a1a2e", offWhite: "#2c2c44",
  muted: "#5a5e80", mutedDark: "#8890b8",
  red: RED, orange: RED, yellow: BLUE,
  green: GREEN, teal: BLUE, text: "#1a1a2e",
  mapBg: "#e0e4f6", mapLand: "#c8cee8",
  headerBg: "linear-gradient(180deg, #ffffff 0%, #eef0fb 100%)",
  alertBg: "linear-gradient(90deg, #eef0fb 0%, #f0f2fa 100%)",
  tabBg: "#ffffff", footerBg: "#ffffff",
  scrollBg: "#f0f2fa", scrollThumb: "#c8cce8",
  tooltipBg: "#1a1a3e", tooltipBorder: "#2e3058", tooltipText: "#ffffff",
  cardQuoteBg: "#eef0fb",
};

const ACCENT = {
  red: RED, orange: RED, yellow: BLUE,
  green: GREEN, teal: BLUE, accent: BLUE, muted: BLUE
};

const POOL = [
  { id:1, platform:"X", network:"PHANTOM-IR", netColor:ACCENT.red, handle:"@peace_voices_2023", text:"Breaking: New evidence of systematic targeting of civilians — thread 🧵", tags:["#GazaGenocide","#FreePalestine"], fake:97, sev:"critical", vpn:"Tehran→Dallas", followers:"12.4K" },
  { id:2, platform:"TikTok", network:"CEDAR-WAVE", netColor:ACCENT.orange, handle:"@truth.unfiltered99", text:"They don't want you to see this footage. Spread before it's deleted.", tags:["#CensoredTruth","#Resistance"], fake:81, sev:"high", vpn:"Beirut→London", followers:"34.2K" },
  { id:3, platform:"Instagram", network:"NILE-ECHO", netColor:ACCENT.yellow, handle:"@humanrights_now_", text:"Apartheid wall expansion continues — when will the world wake up?", tags:["#Apartheid","#BDS"], fake:64, sev:"high", vpn:"Cairo→Toronto", followers:"8.7K" },
  { id:4, platform:"Facebook", network:"PHANTOM-IR", netColor:ACCENT.red, handle:"Justice Coalition Network", text:"October 7 was a response to 75 years of occupation. Context matters.", tags:["#Context","#Oct7"], fake:92, sev:"critical", vpn:"Tehran→Frankfurt", followers:"91K" },
  { id:5, platform:"X", network:"EURO-MASK", netColor:ACCENT.accent, handle:"@european_solidarity_now", text:"Jewish lobby pressure silences EU parliament again.", tags:["#FreeSpeech","#Lobby"], fake:48, sev:"medium", vpn:"Amsterdam→US proxy", followers:"5.6K" },
  { id:6, platform:"Telegram", network:"PHANTOM-IR", netColor:ACCENT.red, handle:"@resistance_updates_il", text:"IDF soldiers admit in leaked audio: orders were to shoot on sight.", tags:["#Leaked","#WarCrimes"], fake:95, sev:"critical", vpn:"Tehran→VPN cluster", followers:"44K" },
  { id:7, platform:"TikTok", network:"SHADOW-PKT", netColor:ACCENT.teal, handle:"@global_justice_feed", text:"Share this before they take it down. 1M views in 3 hours.", tags:["#ShareNow","#FreePalestine"], fake:73, sev:"high", vpn:"Islamabad→Dubai", followers:"22.1K" },
  { id:8, platform:"YouTube", network:"NILE-ECHO", netColor:ACCENT.yellow, handle:"MiddleEast Insight Channel", text:"DOCUMENTARY: The truth about Oct 7 — full film, uncut", tags:["#Oct7Revisionism"], fake:61, sev:"high", vpn:"Doha→Paris", followers:"180K" },
  { id:9, platform:"X", network:"CEDAR-WAVE", netColor:ACCENT.orange, handle:"@intl.press.monitor", text:"Israeli forces commit another massacre — 30 dead, no MSM coverage", tags:["#Rafah","#MediaBlackout"], fake:88, sev:"critical", vpn:"Beirut→Berlin", followers:"7.2K" },
  { id:10, platform:"Instagram", network:"PHANTOM-IR", netColor:ACCENT.red, handle:"@voices4justice_24", text:"This child's story is being ignored. Tag 10 people. #NeverAgain", tags:["#NeverAgain","#Gaza"], fake:91, sev:"critical", vpn:"Tehran→Dallas VPN", followers:"3.1K" },
];

const ALERTS = [
  { msg:"PHANTOM-IR surge +31% — Oct 7 revisionism spike detected", c:ACCENT.red },
  { msg:"NEW NETWORK: 340 coordinated accounts detected — Pakistan origin", c:ACCENT.orange },
  { msg:"Takedown confirmed: 127 accounts removed from X/Meta", c:ACCENT.green },
  { msg:"VPN cluster: Tehran IPs routing through Dallas — PHANTOM-IR active", c:ACCENT.red },
  { msg:"Coordinated hashtag push: #Oct7Revisionism trending across 6 countries", c:ACCENT.orange },
];

const NETWORKS_DATA = [
  { id:"PHANTOM-IR", origin:"Iran", col:RED, posts:1847, fake:94, coord:91 },
  { id:"CEDAR-WAVE", origin:"Lebanon", col:RED, posts:923, fake:78, coord:74 },
  { id:"NILE-ECHO", origin:"Qatar/Egypt", col:BLUE, posts:612, fake:61, coord:58 },
  { id:"SHADOW-PKT", origin:"Pakistan", col:BLUE, posts:441, fake:55, coord:49 },
  { id:"EURO-MASK", origin:"EU proxies", col:BLUE, posts:287, fake:43, coord:38 },
];

const NARRATIVES_DATA = [
  { label:"Genocide framing", vol:4821, delta:+18, sev:"critical", net:"PHANTOM-IR" },
  { label:"Apartheid comparisons", vol:3204, delta:+7, sev:"high", net:"CEDAR-WAVE" },
  { label:"IDF war crimes claims", vol:2891, delta:+23, sev:"critical", net:"PHANTOM-IR" },
  { label:"Hostage denial", vol:1542, delta:-4, sev:"high", net:"NILE-ECHO" },
  { label:"BDS amplification", vol:987, delta:+11, sev:"medium", net:"EURO-MASK" },
  { label:"Oct 7 revisionism", vol:734, delta:+31, sev:"critical", net:"PHANTOM-IR" },
];

const GEO = [
  { city:"Tehran", lat:35.7, lng:51.4, count:1420, c:RED, type:"origin" },
  { city:"Mashhad", lat:36.3, lng:59.6, count:340, c:RED, type:"origin" },
  { city:"Isfahan", lat:32.7, lng:51.7, count:210, c:RED, type:"origin" },
  { city:"Beirut", lat:33.9, lng:35.5, count:640, c:RED, type:"origin" },
  { city:"Damascus", lat:33.5, lng:36.3, count:290, c:RED, type:"origin" },
  { city:"Cairo", lat:30.0, lng:31.2, count:380, c:BLUE, type:"origin" },
  { city:"Gaza City", lat:31.5, lng:34.5, count:180, c:BLUE, type:"origin" },
  { city:"Doha", lat:25.3, lng:51.5, count:310, c:BLUE, type:"origin" },
  { city:"Riyadh", lat:24.7, lng:46.7, count:150, c:BLUE, type:"origin" },
  { city:"Islamabad", lat:33.7, lng:73.1, count:290, c:BLUE, type:"origin" },
  { city:"Karachi", lat:24.9, lng:67.0, count:190, c:BLUE, type:"origin" },
  { city:"Istanbul", lat:41.0, lng:28.9, count:230, c:RED, type:"origin" },
  { city:"Ankara", lat:39.9, lng:32.9, count:120, c:RED, type:"origin" },
  { city:"London", lat:51.5, lng:-0.1, count:210, c:BLUE, type:"vpn" },
  { city:"Amsterdam", lat:52.4, lng:4.9, count:175, c:BLUE, type:"vpn" },
  { city:"Frankfurt", lat:50.1, lng:8.7, count:160, c:BLUE, type:"vpn" },
  { city:"Paris", lat:48.9, lng:2.3, count:130, c:BLUE, type:"vpn" },
  { city:"Berlin", lat:52.5, lng:13.4, count:115, c:BLUE, type:"vpn" },
  { city:"Stockholm", lat:59.3, lng:18.1, count:90, c:BLUE, type:"vpn" },
  { city:"Dallas", lat:32.8, lng:-96.8, count:190, c:RED, type:"vpn" },
  { city:"New York", lat:40.7, lng:-74.0, count:160, c:RED, type:"vpn" },
  { city:"Chicago", lat:41.9, lng:-87.6, count:95, c:RED, type:"vpn" },
  { city:"Toronto", lat:43.7, lng:-79.4, count:140, c:BLUE, type:"vpn" },
  { city:"Dearborn MI", lat:42.3, lng:-83.2, count:110, c:RED, type:"vpn" },
  { city:"Dubai", lat:25.2, lng:55.3, count:145, c:BLUE, type:"relay" },
  { city:"Moscow", lat:55.8, lng:37.6, count:88, c:BLUE, type:"relay" },
  { city:"Kuala Lumpur", lat:3.1, lng:101.7, count:75, c:BLUE, type:"relay" },
  { city:"Jakarta", lat:-6.2, lng:106.8, count:62, c:BLUE, type:"relay" },
];

const VPN_ROUTES = [
  [[35.7,51.4],[32.8,-96.8]], [[35.7,51.4],[40.7,-74.0]], [[35.7,51.4],[50.1,8.7]],
  [[33.9,35.5],[51.5,-0.1]], [[33.9,35.5],[52.5,13.4]],
  [[30.0,31.2],[43.7,-79.4]], [[30.0,31.2],[48.9,2.3]],
  [[33.7,73.1],[25.2,55.3]], [[25.3,51.5],[52.4,4.9]],
  [[41.0,28.9],[41.9,-87.6]],
];

const PLATFORMS_LIST = ["All","X","TikTok","Instagram","Facebook","Telegram","YouTube"];
const NETWORKS_LIST = ["All","PHANTOM-IR","CEDAR-WAVE","NILE-ECHO","SHADOW-PKT","EURO-MASK"];
const SEV_LIST = ["All","critical","high","medium","low"];

function toXY(lat, lng, W=820, H=400) {
  return { x: ((lng+180)/360)*W, y: ((90-lat)/180)*H };
}

function Tooltip({ children, text, C, below=false }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const posStyle = below
    ? { top: "calc(100% + 8px)", bottom: "auto" }
    : { bottom: "calc(100% + 8px)", top: "auto" };

  const arrowStyle = below
    ? { bottom: "100%", top: "auto", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: `6px solid ${C.tooltipBg}`, borderTop: "none" }
    : { top: "100%", bottom: "auto", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${C.tooltipBg}`, borderBottom: "none" };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => { setShow(true); }}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: "absolute", ...posStyle, left: "50%", transform: "translateX(-50%)",
          background: C.tooltipBg, color: C.tooltipText || "#ffffff", fontSize: 11, padding: "6px 12px",
          borderRadius: 6, zIndex: 9999,
          border: `1px solid ${C.tooltipBorder}`, boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          pointerEvents: "none", fontFamily: "'Inter', sans-serif", letterSpacing: 0.8,
          maxWidth: 300, whiteSpace: "normal"
        }}>
          {text}
          <div style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0, ...arrowStyle
          }}/>
        </div>
      )}
    </div>
  );
}

function FrameLogo({ size=1, C }) {
  const s = size;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14*s, userSelect:"none" }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:4*s }}>
        <span style={{ color:C.white, fontWeight:300, fontSize:28*s, letterSpacing:2*s, lineHeight:1, fontFamily:"'Bebas Neue', sans-serif" }}>[</span>
        <span style={{ color:C.white, fontWeight:900, fontSize:28*s, letterSpacing:5*s, lineHeight:1, fontFamily:"'Bebas Neue', sans-serif" }}>FRAME</span>
        <span style={{ color:C.white, fontWeight:300, fontSize:28*s, letterSpacing:2*s, lineHeight:1, fontFamily:"'Bebas Neue', sans-serif" }}>]</span>
      </div>
      {s>=1 && <div style={{ color:C.accent, fontSize:16, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif", fontWeight:700 }}>HUB IL</div>}
    </div>
  );
}

function GeoMap({ detailed=false, C }) {
  const H = detailed ? 420 : 300;
  const W = 820;
  const [vb, setVb] = useState({ x:0, y:0, w:W, h:H });
  const dragging = useRef(false);
  const last = useRef({ x:0, y:0 });
  const svgRef = useRef(null);
  const onWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.12 : 0.89;
    if(!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    setVb(v => {
      const nw = Math.min(W, Math.max(W*0.15, v.w * factor));
      const nh = Math.min(H, Math.max(H*0.15, v.h * factor));
      const nx = Math.max(0, Math.min(W-nw, v.x + (v.w-nw)*mx));
      const ny = Math.max(0, Math.min(H-nh, v.y + (v.h-nh)*my));
      return { x:nx, y:ny, w:nw, h:nh };
    });
  };
  const onMouseDown = (e) => { dragging.current=true; last.current={x:e.clientX,y:e.clientY}; };
  const onMouseMove = (e) => {
    if(!dragging.current || !svgRef.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = {x:e.clientX, y:e.clientY};
    const rect = svgRef.current.getBoundingClientRect();
    setVb(v => {
      const scaleX = v.w / rect.width, scaleY = v.h / rect.height;
      return {
        x: Math.max(0, Math.min(W-v.w, v.x - dx*scaleX)),
        y: Math.max(0, Math.min(H-v.h, v.y - dy*scaleY)),
        w: v.w, h: v.h
      };
    });
  };
  const onMouseUp = () => { dragging.current=false; };
  const resetZoom = () => setVb({ x:0, y:0, w:W, h:H });
  const zoomIn = () => setVb(v => { const nw=Math.max(W*0.15,v.w*0.75); const nh=Math.max(H*0.15,v.h*0.75); return { x:v.x+(v.w-nw)/2, y:v.y+(v.h-nh)/2, w:nw, h:nh }; });
  const zoomOut = () => setVb(v => { const nw=Math.min(W,v.w*1.33); const nh=Math.min(H,v.h*1.33); return { x:Math.max(0,v.x-(nw-v.w)/2), y:Math.max(0,v.y-(nh-v.h)/2), w:nw, h:nh }; });
  const zoomLevel = Math.round((W/vb.w)*100);

  // Helper function to convert lat/lng point arrays to SVG path strings
  const landPath = (points) => {
    return points.map((p, i) => {
      const {x, y} = toXY(p[0], p[1], W, H);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ') + ' Z';
  };

  // Continent outlines as [lat, lng] coordinates - refined for accuracy
  const continents = [
    // North America
    [[83,-70],[78,-73],[72,-80],[68,-65],[62,-62],[58,-55],[52,-56],[47,-53],[46,-60],[44,-64],[43,-66],[42,-70],[41,-72],[40,-74],[38,-75],[35,-76],[30,-81],[29,-83],[27,-80],[25,-80],[25,-83],[26,-89],[29,-90],[30,-94],[28,-97],[26,-97],[22,-97],[19,-96],[17,-91],[15,-88],[14,-84],[10,-84],[9,-79],[8,-77],[9,-80],[15,-87],[18,-95],[20,-105],[24,-110],[28,-113],[31,-117],[33,-118],[35,-121],[38,-123],[42,-124],[46,-124],[49,-127],[53,-130],[55,-133],[58,-137],[60,-140],[61,-146],[64,-152],[60,-162],[62,-166],[65,-168],[68,-165],[71,-157],[72,-143],[70,-140],[72,-128],[76,-120],[73,-95],[76,-89],[80,-85],[83,-78]],
    // South America
    [[12,-72],[11,-68],[10,-65],[8,-63],[7,-60],[6,-57],[4,-52],[2,-50],[0,-50],[-2,-44],[-5,-35],[-8,-35],[-10,-37],[-13,-39],[-15,-40],[-18,-40],[-20,-40],[-23,-42],[-25,-45],[-28,-49],[-30,-50],[-33,-52],[-35,-57],[-38,-58],[-40,-62],[-42,-64],[-46,-67],[-50,-68],[-53,-70],[-55,-68],[-56,-66],[-52,-70],[-48,-73],[-44,-72],[-40,-73],[-38,-72],[-35,-72],[-30,-71],[-25,-70],[-20,-70],[-17,-72],[-15,-75],[-10,-77],[-5,-80],[-2,-80],[0,-78],[2,-77],[5,-76],[8,-73],[10,-72]],
    // Europe
    [[71,28],[70,32],[68,30],[66,26],[64,22],[62,18],[60,20],[58,18],[57,12],[56,10],[55,8],[54,9],[53,7],[52,5],[51,4],[51,2],[50,0],[49,-1],[48,-4],[47,-2],[44,-1],[43,-8],[37,-8],[36,-6],[36,-2],[37,0],[38,0],[39,3],[40,4],[38,10],[40,15],[41,17],[40,18],[42,20],[42,15],[44,12],[46,8],[46,14],[48,17],[49,14],[50,20],[52,21],[54,14],[55,10],[57,12],[56,16],[57,18],[56,20],[58,24],[59,22],[60,24],[61,23],[63,20],[65,15],[66,14],[68,16],[69,18],[70,20],[70,25],[71,26]],
    // Africa
    [[37,10],[35,0],[36,-1],[36,-5],[34,-7],[33,-8],[31,-10],[28,-13],[25,-15],[22,-17],[20,-17],[18,-16],[15,-17],[13,-17],[10,-15],[7,-8],[5,-4],[5,0],[4,1],[5,2],[6,1],[7,3],[4,7],[4,10],[2,10],[0,10],[-2,10],[-5,12],[-8,13],[-10,14],[-12,17],[-15,12],[-17,12],[-20,14],[-22,14],[-25,15],[-28,16],[-30,17],[-32,18],[-34,18],[-35,20],[-34,24],[-33,26],[-32,28],[-30,30],[-27,33],[-25,35],[-22,36],[-18,37],[-15,40],[-12,42],[-10,40],[-6,40],[-3,41],[0,42],[2,42],[4,43],[6,42],[8,44],[10,46],[12,49],[12,51],[11,52],[10,50],[8,48],[5,44],[3,42],[4,38],[3,35],[2,33],[5,31],[7,30],[10,32],[12,35],[14,37],[16,38],[18,39],[20,38],[22,37],[25,37],[28,34],[30,33],[32,32],[33,12],[35,1],[37,5]],
    // Asia (Russia + Middle East + Central/East Asia)
    [[42,33],[40,40],[38,44],[37,44],[35,44],[38,48],[38,56],[35,52],[33,52],[30,48],[28,48],[25,50],[24,56],[22,56],[20,56],[20,58],[21,62],[24,66],[25,69],[28,73],[30,77],[28,73],[24,68],[22,72],[20,73],[18,75],[15,74],[12,75],[10,76],[8,77],[8,80],[4,80],[2,81],[1,103],[2,103],[6,100],[7,103],[-1,105],[-5,106],[-8,110],[-8,115],[-6,110],[0,104],[2,104],[6,103],[6,106],[8,108],[12,108],[14,109],[16,108],[18,107],[20,106],[21,107],[22,108],[22,114],[25,115],[28,116],[30,121],[32,121],[35,127],[37,127],[38,130],[35,129],[33,130],[32,132],[34,136],[36,140],[38,142],[40,140],[42,140],[43,145],[45,143],[46,142],[48,143],[50,140],[52,141],[54,138],[56,138],[58,135],[60,135],[62,140],[63,150],[65,170],[67,170],[70,170],[72,175],[73,180],[72,175],[72,160],[73,145],[73,135],[73,100],[73,85],[73,75],[72,60],[70,55],[68,50],[64,42],[62,40],[60,38],[58,40],[55,38],[54,40],[52,42],[50,46],[48,42],[46,36],[44,34]],
    // Australia
    [[-11,132],[-13,132],[-14,128],[-16,124],[-20,118],[-23,114],[-26,113],[-29,114],[-31,115],[-33,116],[-34,118],[-35,117],[-35,122],[-34,130],[-34,136],[-35,138],[-37,142],[-38,145],[-38,148],[-37,150],[-35,151],[-33,152],[-31,153],[-28,153],[-26,153],[-23,151],[-20,149],[-18,146],[-15,145],[-14,142],[-12,136]],
    // UK/Ireland
    [[58,-5],[57,-2],[56,-1],[54,0],[52,1],[51,1],[50,-3],[50,-5],[51,-5],[51,-3],[52,-1],[53,0],[54,-1],[55,-2],[56,-3],[56,-5],[55,-6],[54,-6],[53,-5],[52,-4],[51,-5],[51,-8],[52,-10],[53,-10],[54,-8],[55,-7],[56,-6],[57,-5]],
    // Greenland
    [[84,-28],[83,-24],[82,-22],[80,-18],[78,-18],[76,-19],[74,-20],[72,-22],[70,-25],[68,-26],[68,-30],[70,-35],[72,-40],[73,-45],[74,-50],[76,-55],[78,-60],[80,-58],[82,-50],[83,-40],[84,-34]],
    // India
    [[30,78],[29,73],[27,70],[25,68],[23,69],[22,72],[20,73],[18,74],[16,74],[14,75],[12,76],[10,76],[8,77],[4,80],[10,80],[13,80],[16,80],[18,80],[20,83],[22,88],[24,89],[26,89],[28,84],[30,82]],
    // Indonesia/Malaysia
    [[-2,98],[-1,104],[1,104],[2,103],[6,103],[5,108],[2,110],[0,109],[-2,107],[-4,106],[-6,106],[-7,108],[-8,112],[-8,115],[-7,114],[-5,112],[-3,110],[-2,106],[-3,104]],
    // Japan
    [[45,142],[43,145],[42,144],[40,140],[38,140],[36,140],[35,137],[34,133],[33,131],[34,131],[35,133],[36,136],[37,137],[38,138],[40,140],[42,142],[44,145]],
  ];

  return (
    <div style={{ position:"relative" }}>
      <div style={{ position:"absolute", top:10, right:10, zIndex:10, display:"flex", flexDirection:"column", gap:4 }}>
        <Tooltip C={C} text="Zoom in">
          <button onClick={zoomIn} style={{ background:C.panelLight, color:C.white, border:`1px solid ${C.border}`, borderRadius:8, width:28, height:28, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}>+</button>
        </Tooltip>
        <Tooltip C={C} text="Zoom out">
          <button onClick={zoomOut} style={{ background:C.panelLight, color:C.white, border:`1px solid ${C.border}`, borderRadius:8, width:28, height:28, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}>−</button>
        </Tooltip>
        <Tooltip C={C} text="Reset zoom to default view">
          <button onClick={resetZoom} style={{ background:C.panelLight, color:C.muted, border:`1px solid ${C.border}`, borderRadius:8, width:28, height:28, fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}>⊡</button>
        </Tooltip>
      </div>
      <div style={{ position:"absolute", bottom:14, left:12, zIndex:10, background:C.panelLight+"cc", border:`1px solid ${C.border}`, borderRadius:4, padding:"2px 8px", fontSize:10, color:C.muted, fontFamily:"monospace" }}>
        {zoomLevel}%
      </div>
    <svg ref={svgRef} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove}
      onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      style={{ width:"100%", display:"block", background:C.mapBg, borderRadius:12, border:`1px solid ${C.border}`, cursor:"grab", userSelect:"none" }}>
      <defs>
        <radialGradient id="glow_r" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.red} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={C.red} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={C.mapBg}/>
      {[0,1,2,3,4,5].map(i=>(
        <line key={`v${i}`} x1={i*W/5} y1="0" x2={i*W/5} y2={H} stroke={C.border} strokeWidth="0.4" strokeDasharray="3,7"/>
      ))}
      {[0,1,2,3].map(i=>(
        <line key={`h${i}`} x1="0" y1={i*H/3} x2={W} y2={i*H/3} stroke={C.border} strokeWidth="0.4" strokeDasharray="3,7"/>
      ))}
      {continents.map((pts, i) => (
        <path key={`land${i}`} d={landPath(pts)} fill={C.mapLand} stroke={C.border} strokeWidth="0.5" opacity="0.7"/>
      ))}
      <circle cx={toXY(31.8,35.0,W,H).x} cy={toXY(31.8,35.0,W,H).y} r="8" fill={C.blue} stroke={C.accent} strokeWidth="1.2" opacity="0.7"/>
      <text x={toXY(31.8,35.0,W,H).x} y={toXY(31.8,35.0,W,H).y-11} textAnchor="middle" fill={C.accent} fontSize="7" fontWeight="700" fontFamily="'Bebas Neue', sans-serif">[IL]</text>
      {VPN_ROUTES.map(([a,b],i)=>{
        const p1=toXY(a[0],a[1],W,H), p2=toXY(b[0],b[1],W,H);
        const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2 - 30;
        return (
          <path key={i} d={`M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`}
            fill="none" stroke={C.red} strokeWidth="0.7" strokeDasharray="5,5" opacity="0.25"/>
        );
      })}
      {GEO.map((pt,i)=>{
        const {x,y}=toXY(pt.lat,pt.lng,W,H);
        const r=Math.max(4, Math.min(detailed?14:10, pt.count/75));
        const show = detailed || pt.count > 200;
        if(!show) return null;
        return (
          <g key={pt.city}>
            <circle cx={x} cy={y} r={r+8} fill="none" stroke={pt.c} strokeWidth="0.6" opacity="0.15">
              <animate attributeName="r" values={`${r};${r+14};${r}`} dur={`${1.8+i*0.18}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.15;0;0.15" dur={`${1.8+i*0.18}s`} repeatCount="indefinite"/>
            </circle>
            <circle cx={x} cy={y} r={r} fill={pt.c} opacity={pt.type==="vpn"?0.6:0.85} stroke={pt.type==="origin"?pt.c:"none"} strokeWidth="0.5"/>
            {(detailed || pt.count>300) && <text x={x} y={y-r-3} textAnchor="middle" fill={pt.c} fontSize={detailed?"6":"5.5"} fontFamily="'Bebas Neue', sans-serif" fontWeight="600">{pt.city}</text>}
            {detailed && <text x={x} y={y+3} textAnchor="middle" fill={C.white} fontSize="4.5" fontWeight="bold">{pt.count}</text>}
          </g>
        );
      })}
      {detailed && (
        <g>
          {[["Origin",C.red],["VPN Exit",C.accent],["Relay",C.green]].map(([l,col],i)=>(
            <g key={l} transform={`translate(${12+i*80},${H-16})`}>
              <circle cx="5" cy="0" r="4" fill={col} opacity="0.8"/>
              <text x="12" y="4" fill={C.muted} fontSize="8" fontFamily="'Bebas Neue', sans-serif">{l}</text>
            </g>
          ))}
        </g>
      )}
      <text x={W-6} y={H-6} textAnchor="end" fill={C.mutedDark} fontSize="8" fontFamily="'Bebas Neue', sans-serif">[FRAME] · GEO-INTEL</text>
    </svg>
    </div>
  );
}

function Badge({ s, C }) {
  const sevColor = s => s==="critical"?C.red:s==="high"?C.orange:s==="medium"?C.yellow:C.green;
  const col=sevColor(s);
  return <span style={{ background:col+"1a",color:col,border:`1px solid ${col}44`,borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,fontFamily:"'Bebas Neue', sans-serif" }}>{s}</span>;
}

function FilterBar({ filters, setFilters, C }) {
  return (
    <div style={{ display:"flex", gap:12, flexWrap:"wrap", padding:"12px 18px", background:C.panelLight, borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
      {[[PLATFORMS_LIST,"platform"],[SEV_LIST,"sev"],[NETWORKS_LIST,"network"]].map(([list,key])=>(
        <div key={key} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <Tooltip C={C} text={key === "platform" ? "Filter by platform" : key === "sev" ? "Filter by severity" : "Filter by network"}>
            <span style={{ color:C.mutedDark, fontSize:9, textTransform:"uppercase", letterSpacing:1.2, fontFamily:"'Bebas Neue', sans-serif" }}>{key}</span>
          </Tooltip>
          <div style={{ display:"flex", gap:4 }}>
            {list.map(v=>(
              <button key={v} onClick={()=>setFilters(f=>({...f,[key]:v}))} style={{
                background: filters[key]===v ? C.accent+"33":"transparent",
                color: filters[key]===v ? C.white : C.muted,
                border:`1px solid ${filters[key]===v?C.accent:C.border}`,
                borderRadius:6, padding:"2px 8px", fontSize:9, cursor:"pointer", fontWeight:filters[key]===v?700:400,
                fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.15s"
              }}>{v}</button>
            ))}
          </div>
          <div style={{ width:1, background:C.border, height:16, margin:"0 6px" }}/>
        </div>
      ))}
    </div>
  );
}

function PostCard({ post, selected, onClick, isNew, compact=false, C }) {
  const sevColor = s => s==="critical"?C.red:s==="high"?C.orange:s==="medium"?C.yellow:C.green;
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={()=>onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
      background: selected ? C.panelLight : C.panel,
      border:`1px solid ${hovered || selected ? sevColor(post.sev) : C.border}`,
      borderLeft:`4px solid ${sevColor(post.sev)}`,
      borderRadius:12, padding: compact?"10px 14px":"14px 16px", marginBottom:compact?8:10,
      cursor:"pointer", transition:"all 0.2s",
      boxShadow: selected?`0 2px 12px ${sevColor(post.sev)}2a` : hovered ? `0 2px 12px rgba(0,0,0,0.3)` : "0 2px 8px rgba(0,0,0,0.2)",
      animation: isNew?"slideIn 0.35s ease":"none",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:compact?4:6 }}>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ background:C.border, borderRadius:4, padding:"2px 8px", fontSize:10, color:C.offWhite, fontFamily:"'Bebas Neue', sans-serif" }}>{post.platform}</span>
          <span style={{ background:post.netColor+"1a", color:post.netColor, border:`1px solid ${post.netColor}33`, borderRadius:4, padding:"2px 8px", fontSize:9, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{post.network}</span>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <Badge s={post.sev} C={C}/>
          <span style={{ color:C.muted, fontSize:9, fontFamily:"monospace" }}>{post.fake}%</span>
        </div>
      </div>
      <div style={{ fontWeight:600, color:C.white, fontSize:12, marginBottom:3, fontFamily:"'Bebas Neue', sans-serif" }}>{post.handle}</div>
      {!compact && <div style={{ color:C.muted, fontSize:12, lineHeight:1.6, marginBottom:6, fontFamily:"'Inter', sans-serif" }}>{post.text}</div>}
      {!compact && <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {post.tags.map(t=><span key={t} style={{ background:C.blue, color:C.offWhite, borderRadius:4, padding:"2px 8px", fontSize:9, fontFamily:"'Bebas Neue', sans-serif" }}>{t}</span>)}
      </div>}
    </div>
  );
}

export default function Dashboard() {
  const [theme, setTheme] = useState("light");
  const C = theme === "dark" ? DARK : LIGHT;
  const sevColor = s => s==="critical"?C.red:s==="high"?C.orange:s==="medium"?C.yellow:C.green;

  const [tab, setTab] = useState("overview");
  const [feed, setFeed] = useState(POOL.slice(0,5));
  const [newIds, setNewIds] = useState(new Set());
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(POOL[0]);
  const [alertIdx, setAlertIdx] = useState(0);
  const [stats, setStats] = useState({ threats:2847, fake:14203, takedowns:341, networks:5 });
  const [filters, setFilters] = useState({ platform:"All", sev:"All", network:"All" });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const poolIdx = useRef(5);
  const tabs = ["overview","live-feed","geo-intel","networks","response","narratives","kpis"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    if(paused) return;
    const t=setInterval(()=>{
      const next=POOL[poolIdx.current%POOL.length]; poolIdx.current++;
      const np={...next, id:Date.now()};
      setFeed(f=>[np,...f].slice(0,14));
      setNewIds(s=>new Set([...s,np.id]));
      setStats(s=>({...s, threats:s.threats+Math.floor(Math.random()*3+1), fake:s.fake+Math.floor(Math.random()*5+2)}));
      setTimeout(()=>setNewIds(s=>{const n=new Set(s);n.delete(np.id);return n;}),500);
    },2200);
    return()=>clearInterval(t);
  },[paused]);

  useEffect(()=>{
    const t=setInterval(()=>setAlertIdx(i=>(i+1)%ALERTS.length),3500);
    return()=>clearInterval(t);
  },[]);

  const handleSelect=(post)=>{setSelected(post);setPaused(true);};
  const filteredFeed=feed.filter(p=>{
    if(filters.platform!=="All"&&p.platform!==filters.platform)return false;
    if(filters.sev!=="All"&&p.sev!==filters.sev)return false;
    if(filters.network!=="All"&&p.network!==filters.network)return false;
    return true;
  });

  const SectionHeader = ({children, right}) => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
      <span style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif" }}>[{children}]</span>
      {right && <Tooltip C={C} text="Open full view"><span style={{ color:C.accent, fontSize:10, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif" }}>{right}</span></Tooltip>}
    </div>
  );

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.text, fontFamily:"'Bebas Neue', sans-serif", fontSize:13, display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes slideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:4px;background:${C.scrollBg}}::-webkit-scrollbar-thumb{background:${C.scrollThumb};border-radius:2px}
        button{transition:all 0.15s}
        @media (max-width: 768px) {
          body { font-size: 12px; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ background:C.headerBg, borderBottom:`1px solid ${C.border}`, padding:isMobile ? "12px 16px" : "0 22px", display:"flex", alignItems:"center", justifyContent:"space-between", height:isMobile ? "auto" : 60, flexShrink:0, flexDirection:isMobile ? "column" : "row", gap:isMobile ? 12 : 0 }}>
        <FrameLogo size={1} C={C}/>
        <div style={{ display:"flex", gap:isMobile?16:30, alignItems:"center", flexWrap:isMobile?"wrap":"nowrap", justifyContent:isMobile?"center":"flex-end", width:isMobile?"100%":"auto" }}>
          <Tooltip C={C} text={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            <div onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", userSelect:"none" }}>
              <div style={{
                width:40, height:22, borderRadius:11, padding:2,
                background: theme === "dark" ? "#1800AD" : C.border,
                transition:"background 0.3s", position:"relative", flexShrink:0
              }}>
                <div style={{
                  width:18, height:18, borderRadius:"50%", background:"#fff",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.3)",
                  transform: theme === "dark" ? "translateX(18px)" : "translateX(0)",
                  transition:"transform 0.3s"
                }}/>
              </div>
            </div>
          </Tooltip>
          {[["Active Threats",stats.threats.toLocaleString(),C.red,"Total active threat posts detected in last 24h"],["Fake Accounts",stats.fake.toLocaleString(),C.orange,"Cumulative fake accounts identified across all networks"],["Networks",stats.networks,C.accent,"Number of coordinated inauthentic networks being tracked"],["Takedowns",stats.takedowns,C.green,"Content removed from platforms this week"]].map(([l,v,col,tooltip])=>(
            <Tooltip key={l} C={C} text={tooltip}>
              <div style={{ textAlign:"center" }}>
                <div style={{ color:C.mutedDark, fontSize:isMobile?9:11, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6, fontFamily:"'Bebas Neue', sans-serif", display:isMobile?"none":"block" }}>{l}</div>
                <div style={{ color:col, fontSize:isMobile?13:15, fontWeight:800, fontFamily:"monospace" }}>{v}</div>
              </div>
            </Tooltip>
          ))}
          <Tooltip C={C} text="Real-time monitoring active — data refreshes every 2.2 seconds">
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:7,height:7,background:C.red,borderRadius:"50%",boxShadow:`0 0 8px ${C.red}`,animation:"blink 1.1s infinite" }}/>
              <span style={{ color:C.red, fontSize:10, fontWeight:700, letterSpacing:2, fontFamily:"'Bebas Neue', sans-serif" }}>LIVE</span>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* ALERT BAR */}
      <div style={{ background:C.alertBg, borderBottom:`1px solid ${C.border}`, padding:"6px 22px", display:"flex", alignItems:"center", gap:12, flexShrink:0, overflow:"hidden" }}>
        <Tooltip C={C} text="Real-time system alerts from threat detection engine"><span style={{ background:ALERTS[alertIdx].c, color:"#fff", borderRadius:4, padding:"2px 10px", fontSize:12, fontWeight:800, whiteSpace:"nowrap", fontFamily:"'Bebas Neue', sans-serif" }}>▲ ALERT</span></Tooltip>
        <span style={{ color:ALERTS[alertIdx].c, fontSize:13, fontFamily:"'Inter', sans-serif", opacity:0.9, transition:"all 0.3s" }}>{ALERTS[alertIdx].msg}</span>
      </div>

      {/* TABS */}
      <div style={{ padding:isMobile?"0 12px":"0 22px", borderBottom:`1px solid ${C.border}`, display:"flex", flexShrink:0, background:C.tabBg, overflowX:isMobile?"auto":"visible" }}>
        {tabs.map(t=>{
          const tooltips = {
            "overview": "Dashboard overview with all key metrics",
            "live-feed": "Real-time incoming posts from monitored platforms",
            "geo-intel": "Geographic origin mapping of influence operations",
            "networks": "Detected coordinated inauthentic networks",
            "response": "Crisis response coordination and messaging",
            "narratives": "Tracked anti-Israel narrative campaigns",
            "kpis": "Ecosystem-wide KPIs and performance metrics"
          };
          const displayNames = {
            "overview": "⊞ Overview",
            "live-feed": "Live Feed",
            "geo-intel": "Geo-Intel",
            "networks": "Networks",
            "response": "⚡ Response",
            "narratives": "Narratives",
            "kpis": "📊 KPIs"
          };
          return (
            <Tooltip key={t} C={C} text={tooltips[t]}>
              <button onClick={()=>setTab(t)} style={{
                background:"none", border:"none", padding:isMobile?"8px 12px":"10px 18px", cursor:"pointer",
                color: tab===t?C.white:C.muted,
                borderBottom: tab===t?`2px solid ${C.white}`:"2px solid transparent",
                fontWeight:tab===t?700:400, fontSize:isMobile?11:13, textTransform:"uppercase", letterSpacing:1.5,
                fontFamily:"'Bebas Neue', sans-serif", whiteSpace:"nowrap", transition:"all 0.15s"
              }}>
                {displayNames[t]}
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* FILTER BAR */}
      {tab==="live-feed" && <FilterBar filters={filters} setFilters={setFilters} C={C}/>}

      {/* BODY */}
      <div style={{ display:"flex", flex:1, overflow:"hidden", flexDirection:isMobile && tab === "live-feed" ? "column" : "row" }}>
        {/* ═══ OVERVIEW TAB ═══ */}
        {tab==="overview" && (
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20, display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gridTemplateRows:"auto auto auto", gap:isMobile?12:16 }}>
            {/* Stat row — full width */}
            <div style={{ gridColumn:"1/-1", display:"flex", gap:isMobile?8:12, flexWrap:isMobile?"wrap":"nowrap" }}>
              {[
                ["Active Threats","2,847",C.red,"↑18% (24h)","Threat posts detected across all monitored platforms in last 24 hours"],
                ["Fake Accounts","14,203",C.orange,"5 networks","Total fake/bot accounts identified by AI detection"],
                ["Critical Narratives","3",C.red,"Oct7 · Genocide · IDF","High-severity narrative campaigns requiring immediate response"],
                ["Takedowns (7d)","341",C.green,"↑ 12%","Successful content removals in the past 7 days"],
                ["Platforms Monitored","7",C.accent,"X·TikTok·IG·FB+","Social media platforms under active surveillance"],
              ].map(([l,v,col,sub,tooltip])=>(
                <Tooltip key={l} C={C} text={tooltip} below>
                  <div style={{ flex:1, background:C.panel, border:`1px solid ${col}33`, borderRadius:12, padding:isMobile?"12px":"14px 16px", boxShadow:`0 2px 12px rgba(0,0,0,0.2)`, minWidth:isMobile?"calc(50% - 6px)":"auto" }}>
                    <div style={{ color:C.muted, fontSize:isMobile?9:11, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6, fontFamily:"'Bebas Neue', sans-serif" }}>{l}</div>
                    <div style={{ color:col, fontSize:isMobile?18:22, fontWeight:800, fontFamily:"monospace" }}>{v}</div>
                    <div style={{ color:C.mutedDark, fontSize:isMobile?9:10, marginTop:3, fontFamily:"'Inter', sans-serif" }}>{sub}</div>
                  </div>
                </Tooltip>
              ))}
            </div>

            {/* LEFT: Live feed preview */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:isMobile?14:18, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <SectionHeader right={<span onClick={()=>setTab("live-feed")}>View all →</span>}>Live Feed</SectionHeader>
              {feed.slice(0,4).map(p=>(
                <PostCard key={p.id} post={p} selected={selected?.id===p.id} onClick={handleSelect} isNew={newIds.has(p.id)} compact C={C}/>
              ))}
            </div>

            {/* RIGHT: Geo mini map */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:isMobile?14:18, display:isMobile?"none":"block", boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <SectionHeader right={<span onClick={()=>setTab("geo-intel")}>Full map →</span>}>Geo-Intel</SectionHeader>
              <GeoMap detailed={false} C={C}/>
              <div style={{ display:"flex", gap:10, marginTop:12, flexWrap:"wrap" }}>
                {GEO.filter(g=>g.count>300).map(pt=>(
                  <div key={pt.city} style={{ background:C.panelLight, border:`1px solid ${pt.c}33`, borderRadius:6, padding:"5px 10px" }}>
                    <span style={{ color:pt.c, fontSize:10, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.city}</span>
                    <span style={{ color:C.muted, fontSize:10, marginLeft:6, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LEFT: Networks summary */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:isMobile?14:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <SectionHeader right={<span onClick={()=>setTab("networks")}>Details →</span>}>Threat Networks</SectionHeader>
              {NETWORKS_DATA.map(n=>(
                <div key={n.id} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <div style={{ width:3, height:40, background:n.col, borderRadius:2, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <Tooltip C={C} text={`Network origin: ${n.origin} · Coordination score: ${n.coord}%`}><span style={{ color:n.col, fontWeight:700, fontSize:12, fontFamily:"monospace" }}>{n.id}</span></Tooltip>
                      <span style={{ color:C.muted, fontSize:10, fontFamily:"'Inter', sans-serif" }}>{n.origin}</span>
                    </div>
                    <div style={{ height:4, background:C.blue, borderRadius:2, marginTop:6 }}>
                      <div style={{ height:4, width:`${n.fake}%`, background:n.col, borderRadius:2 }}/>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
                      <span style={{ color:C.muted, fontSize:9, fontFamily:"'Inter', sans-serif" }}>{n.posts.toLocaleString()} posts/24h</span>
                      <span style={{ color:n.fake>80?C.red:C.orange, fontSize:9, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{n.fake}% fake</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Narratives summary */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:isMobile?14:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <SectionHeader right={<span onClick={()=>setTab("narratives")}>Details →</span>}>Active Narratives</SectionHeader>
              {NARRATIVES_DATA.map((n,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <Badge s={n.sev} C={C}/>
                      <Tooltip C={C} text={`Volume: ${n.vol.toLocaleString()} · ${n.delta>0?"+":""}${n.delta}% (24h) · Network: ${n.net}`}><span style={{ color:C.text, fontSize:11, fontWeight:600, fontFamily:"'Bebas Neue', sans-serif" }}>{n.label}</span></Tooltip>
                    </div>
                    <div style={{ height:4, background:C.blue, borderRadius:2 }}>
                      <div style={{ height:4, width:`${Math.min(100,n.vol/55)}%`, background:sevColor(n.sev), borderRadius:2 }}/>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", marginLeft:14 }}>
                    <div style={{ color:C.white, fontWeight:800, fontFamily:"monospace", fontSize:13 }}>{n.vol.toLocaleString()}</div>
                    <div style={{ color:n.delta>0?C.red:C.green, fontSize:10, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{n.delta>0?"▲":"▼"}{Math.abs(n.delta)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ LIVE FEED TAB ═══ */}
        {tab==="live-feed" && (
          <>
            <div style={{ flex:1, overflowY:"auto", padding:isMobile?"12px 14px":"16px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif" }}>
                  Incoming Posts · {filteredFeed.length} shown
                  {paused&&<span style={{ color:C.yellow, marginLeft:8 }}>⏸ PAUSED</span>}
                </span>
                <Tooltip C={C} text="Pause or resume the live data stream">
                  <button onClick={()=>setPaused(p=>!p)} style={{ background:paused?C.green+"22":C.red+"22", color:paused?C.green:C.red, border:`1px solid ${paused?C.green:C.red}55`, borderRadius:6, padding:"4px 16px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.15s" }}>
                    {paused?"▶ RESUME":"⏸ PAUSE"}
                  </button>
                </Tooltip>
              </div>
              {filteredFeed.length===0
                ?<div style={{ color:C.muted, textAlign:"center", marginTop:40, fontFamily:"'Inter', sans-serif" }}>No posts match current filters.</div>
                :filteredFeed.map(p=><PostCard key={p.id} post={p} selected={selected?.id===p.id} onClick={handleSelect} isNew={newIds.has(p.id)} C={C}/>)
              }
            </div>
            <div style={{ width:isMobile?"100%":290, borderLeft:isMobile?"none":`1px solid ${C.border}`, borderTop:isMobile?`1px solid ${C.border}`:"none", background:C.tabBg, overflowY:"auto", padding:isMobile?12:16, flexShrink:0, maxHeight:isMobile?"40vh":"auto" }}>
              {selected?(
                <>
                  <div style={{ color:C.accent, fontSize:13, letterSpacing:2, textTransform:"uppercase", marginBottom:12, fontFamily:"'Bebas Neue', sans-serif" }}>Post Analysis</div>
                  <div style={{ background:C.panel, border:`2px solid ${sevColor(selected.sev)}`, borderRadius:12, padding:16, marginBottom:16, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <span style={{ color:C.white, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{selected.handle}</span>
                      <Badge s={selected.sev} C={C}/>
                    </div>
                    <div style={{ color:C.muted, fontSize:11, lineHeight:1.6, background:C.cardQuoteBg, borderRadius:8, padding:"10px 12px", marginBottom:14, fontFamily:"'Inter', sans-serif" }}>"{selected.text}"</div>
                    {[["Platform",selected.platform,C.accent],["Network",selected.network,selected.netColor],["VPN Route",selected.vpn,C.teal],["Followers",selected.followers,C.offWhite]].map(([l,v,col])=>(
                      <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, borderBottom:`1px solid ${C.border}`, paddingBottom:8 }}>
                        <span style={{ color:C.muted, fontSize:11, fontFamily:"'Bebas Neue', sans-serif" }}>{l}</span>
                        <span style={{ color:col, fontSize:11, fontWeight:700, fontFamily:"monospace" }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ color:C.muted, fontSize:11, fontFamily:"'Bebas Neue', sans-serif" }}>Fake Score</span>
                        <span style={{ color:selected.fake>80?C.red:selected.fake>60?C.orange:C.yellow, fontWeight:800, fontSize:14, fontFamily:"monospace" }}>{selected.fake}%</span>
                      </div>
                      <div style={{ height:6, background:C.blue, borderRadius:3 }}>
                        <div style={{ height:6, width:`${selected.fake}%`, background:selected.fake>80?C.red:selected.fake>60?C.orange:C.yellow, borderRadius:3 }}/>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:10 }}>
                      <Tooltip C={C} text="Flag content for removal request to platform">
                        <button style={{ flex:1, background:C.red+"22", color:C.red, border:`1px solid ${C.red}55`, borderRadius:8, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.15s" }}>🚫 TAKEDOWN</button>
                      </Tooltip>
                      <Tooltip C={C} text="Save post to evidence archive for reporting">
                        <button style={{ flex:1, background:C.accent+"22", color:C.accent, border:`1px solid ${C.accent}55`, borderRadius:8, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.15s" }}>📁 ARCHIVE</button>
                      </Tooltip>
                    </div>
                  </div>
                  <div style={{ color:C.accent, fontSize:13, letterSpacing:2, textTransform:"uppercase", marginBottom:12, fontFamily:"'Bebas Neue', sans-serif" }}>Platform Exposure</div>
                  {[["X / Twitter",38,C.accent],["TikTok",27,C.red],["Instagram",18,C.teal],["Facebook",12,C.orange],["Telegram",5,C.yellow]].map(([p,v,col])=>(
                    <div key={p} style={{ marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:11, fontFamily:"'Inter', sans-serif" }}>{p}</span>
                        <span style={{ color:col, fontSize:11, fontFamily:"monospace", fontWeight:700 }}>{v}%</span>
                      </div>
                      <div style={{ height:4, background:C.blue, borderRadius:2 }}>
                        <div style={{ height:4, width:`${v}%`, background:col, borderRadius:2 }}/>
                      </div>
                    </div>
                  ))}
                </>
              ):<div style={{ color:C.muted, textAlign:"center", marginTop:60, fontFamily:"'Inter', sans-serif" }}>← Select a post</div>}
            </div>
          </>
        )}

        {/* ═══ GEO-INTEL TAB ═══ */}
        {tab==="geo-intel" && (
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
            <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>
              [Origin Clusters · VPN Routing · 28 Points]
            </div>
            <GeoMap detailed={true} C={C}/>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4,1fr)", gap:isMobile?8:12, marginTop:16 }}>
              {GEO.map(pt=>(
                <div key={pt.city} style={{ background:C.panel, border:`1px solid ${pt.c}33`, borderRadius:12, padding:isMobile?"8px 10px":"10px 14px", boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <Tooltip C={C} text={`${pt.city}: ${pt.count} posts · Type: ${pt.type}`}><span style={{ color:pt.c, fontWeight:700, fontSize:isMobile?10:11, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.city}</span></Tooltip>
                    <span style={{ background:pt.type==="origin"?C.red+"22":pt.type==="vpn"?C.accent+"22":C.teal+"22", color:pt.type==="origin"?C.red:pt.type==="vpn"?C.accent:C.teal, fontSize:7, padding:"2px 6px", borderRadius:4, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.type}</span>
                  </div>
                  <div style={{ color:C.white, fontSize:isMobile?16:18, fontWeight:800, fontFamily:"monospace", marginTop:4 }}>{pt.count}</div>
                  <div style={{ color:C.muted, fontSize:8, fontFamily:"'Inter', sans-serif" }}>posts attributed</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ NETWORKS TAB ═══ */}
        {tab==="networks" && (
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
            {NETWORKS_DATA.map(n=>(
              <div key={n.id} style={{ background:C.panel, border:`1px solid ${n.col}33`, borderRadius:12, padding:isMobile?14:18, marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
                  <div>
                    <Tooltip C={C} text={`Coordinated inauthentic network originating from ${n.origin}`}><div style={{ color:n.col, fontWeight:800, fontSize:isMobile?14:16, fontFamily:"monospace" }}>{n.id}</div></Tooltip>
                    <div style={{ color:C.muted, fontSize:isMobile?11:12, fontFamily:"'Inter', sans-serif" }}>Origin: {n.origin}</div>
                  </div>
                  <Badge s={n.fake>80?"critical":n.fake>60?"high":"medium"} C={C}/>
                </div>
                <div style={{ display:"flex", gap:isMobile?16:28, marginBottom:16, flexWrap:isMobile?"wrap":"nowrap" }}>
                  {[["Posts/24h",n.posts.toLocaleString(),n.col],["Fake Ratio",`${n.fake}%`,n.fake>80?C.red:C.orange],["Coord Score",`${n.coord}%`,C.accent]].map(([l,v,col])=>(
                    <div key={l}>
                      <Tooltip C={C} text={l==="Posts/24h"?"Total posts detected in last 24 hours":l==="Fake Ratio"?"Percentage of accounts identified as fake/bot":l==="Coord Score"?"Coordination score measuring synchronized behavior":""}><div style={{ color:C.muted, fontSize:11, textTransform:"uppercase", letterSpacing:1.2, marginBottom:4, fontFamily:"'Bebas Neue', sans-serif" }}>{l}</div></Tooltip>
                      <div style={{ color:col, fontSize:isMobile?18:22, fontWeight:800, fontFamily:"monospace" }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height:6, background:C.blue, borderRadius:3 }}>
                  <div style={{ height:6, width:`${n.fake}%`, background:n.col, borderRadius:3 }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ RESPONSE TAB ═══ */}
        {tab==="response" && (
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
            <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>
              [Coordinated Response Hub]
            </div>

            {/* Crisis Event Header */}
            <div style={{ background:C.panel, border:`2px solid ${C.red}`, borderRadius:12, padding:18, marginBottom:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.red, fontSize:12, textTransform:"uppercase", letterSpacing:2, marginBottom:5, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>Active Crisis Event</div>
              <div style={{ fontSize:isMobile?16:18, fontWeight:800, color:C.white, marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>UN Resolution Draft — Anti-Israel Bias</div>
              <div style={{ display:"flex", gap:isMobile?12:18, flexWrap:isMobile?"wrap":"nowrap" }}>
                <div>
                  <div style={{ color:C.muted, fontSize:10, fontFamily:"'Bebas Neue', sans-serif", marginBottom:4 }}>Detection Time</div>
                  <div style={{ color:C.red, fontSize:14, fontWeight:800, fontFamily:"monospace" }}>18:34 UTC</div>
                </div>
                <div>
                  <div style={{ color:C.muted, fontSize:10, fontFamily:"'Bebas Neue', sans-serif", marginBottom:4 }}>Threat Level</div>
                  <div style={{ color:C.red, fontSize:14, fontWeight:800, fontFamily:"'Bebas Neue', sans-serif" }}>CRITICAL</div>
                </div>
                <div>
                  <div style={{ color:C.muted, fontSize:10, fontFamily:"'Bebas Neue', sans-serif", marginBottom:4 }}>Coordinated Networks</div>
                  <div style={{ color:C.orange, fontSize:14, fontWeight:800, fontFamily:"monospace" }}>4 active</div>
                </div>
              </div>
            </div>

            {/* Response Timeline */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:isMobile?16:22, marginBottom:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.accent, fontSize:16, letterSpacing:2, textTransform:"uppercase", marginBottom:20, fontFamily:"'Bebas Neue', sans-serif" }}>[Response Timeline]</div>
              <div style={{ position:"relative", paddingLeft:isMobile?30:40 }}>
                {/* Vertical line */}
                <div style={{ position:"absolute", left:isMobile?12:16, top:4, bottom:4, width:2, background:C.border }}/>
                {[
                  { stage:"Detection", time:"0h", desc:"Threat identified by monitoring system", col:C.red, campaigns:["UN Resolution Draft","Oct 7 Revisionism Surge"] },
                  { stage:"Analysis", time:"1h", desc:"AI analysis and severity classification", col:C.red, campaigns:["PHANTOM-IR Botnet Wave"] },
                  { stage:"Messaging Distributed", time:"3h", desc:"Shared talking points sent to all partners", col:C.accent, campaigns:["Campus BDS Push — NYU/Columbia","EU Parliament Bias Vote"] },
                  { stage:"Coordinated Response", time:"6h", desc:"Partners actively responding across platforms", col:C.green, campaigns:["TikTok Genocide Narrative","Hostage Denial Campaign"] },
                  { stage:"Impact Assessment", time:"24h", desc:"Measure reach, engagement, narrative shift", col:C.accent, campaigns:["IDF War Crimes Claims — Reuters Cycle"] }
                ].map((item, i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:isMobile?12:16, marginBottom:i<4?24:0, position:"relative" }}>
                    {/* Dot on the line */}
                    <div style={{ position:"absolute", left:isMobile?-22:-28, top:4, width:14, height:14, borderRadius:"50%", background:item.col, border:`3px solid ${C.panel}`, boxShadow:`0 0 0 2px ${item.col}44`, zIndex:1 }}/>
                    {/* Time badge */}
                    <div style={{ minWidth:isMobile?36:48, background:item.col+"18", border:`1px solid ${item.col}44`, borderRadius:6, padding:"5px 10px", textAlign:"center" }}>
                      <div style={{ color:item.col, fontSize:15, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{item.time}</div>
                    </div>
                    {/* Content */}
                    <div style={{ flex:1 }}>
                      <div style={{ color:C.white, fontSize:16, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif", letterSpacing:1, marginBottom:3 }}>{item.stage}</div>
                      <div style={{ color:C.muted, fontSize:13, fontFamily:"'Inter', sans-serif", lineHeight:1.4, marginBottom:6 }}>{item.desc}</div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {item.campaigns.map((c,j)=>(
                          <span key={j} style={{ background:item.col+"14", border:`1px solid ${item.col}33`, borderRadius:6, padding:"3px 10px", fontSize:11, color:item.col, fontFamily:"'Bebas Neue', sans-serif", letterSpacing:0.5 }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shared Messaging */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>Shared Messaging Talking Points</div>
              {[
                "This UN resolution contradicts international law and human rights principles that protect all nations' right to self-defense.",
                "Israel is committed to humanitarian standards and investigations of all credible allegations while defending its citizens.",
                "This proposal politicizes the Council and undermines legitimate efforts to broker peace and protect civilians.",
                "Democratic nations must stand against bias and support fact-based accountability mechanisms."
              ].map((point, i)=>(
                <div key={i} style={{ background:C.panelLight, border:`1px solid ${C.border}`, borderRadius:10, padding:14, marginBottom:12, fontFamily:"'Bebas Neue', sans-serif", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
                  <div style={{ color:C.accent, fontSize:12, fontWeight:700, marginBottom:5 }}>Point {i+1}</div>
                  <div style={{ color:C.text, fontSize:isMobile?12:13, lineHeight:1.6, fontFamily:"'Inter', sans-serif" }}>{point}</div>
                </div>
              ))}
            </div>

            {/* Partner Response Status */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>Partner Response Status</div>
              {[
                { org:"ADL", status:"Responding", col:C.green },
                { org:"AIPAC", status:"Message Received", col:C.yellow },
                { org:"AJC", status:"Drafting", col:C.orange },
                { org:"StandWithUs", status:"Responding", col:C.green },
                { org:"Hillel", status:"Message Received", col:C.yellow }
              ].map((partner, i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:11, paddingBottom:11, borderBottom:`1px solid ${C.border}` }}>
                  <Tooltip C={C} text={`${partner.org} response status: ${partner.status}`}><span style={{ color:C.white, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{partner.org}</span></Tooltip>
                  <span style={{ background:partner.col+"1a", color:partner.col, border:`1px solid ${partner.col}44`, borderRadius:6, padding:"4px 11px", fontSize:12, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif", textTransform:"uppercase" }}>{partner.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ NARRATIVES TAB ═══ */}
        {tab==="narratives" && (
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
            {NARRATIVES_DATA.map((n,i)=>(
              <div key={i} style={{ background:C.panel, border:`1px solid ${sevColor(n.sev)}33`, borderRadius:12, padding:isMobile?14:18, marginBottom:12, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <Tooltip C={C} text={`Narrative campaign: ${n.vol.toLocaleString()} mentions · Driven by ${n.net}`}><span style={{ fontWeight:700, fontSize:isMobile?13:14, fontFamily:"'Bebas Neue', sans-serif" }}>{n.label}</span></Tooltip>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ color:C.muted, fontSize:11, fontFamily:"monospace" }}>{n.net}</span>
                    <Badge s={n.sev} C={C}/>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:12 }}>
                  <span style={{ color:C.white, fontSize:isMobile?22:26, fontWeight:800, fontFamily:"monospace" }}>{n.vol.toLocaleString()}</span>
                  <span style={{ color:n.delta>0?C.red:C.green, fontWeight:700, fontFamily:"'Inter', sans-serif" }}>{n.delta>0?"▲":"▼"} {Math.abs(n.delta)}% (24h)</span>
                </div>
                <div style={{ height:6, background:C.blue, borderRadius:3 }}>
                  <div style={{ height:6, width:`${Math.min(100,n.vol/55)}%`, background:sevColor(n.sev), borderRadius:3 }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ KPIs TAB ═══ */}
        {tab==="kpis" && (
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
            <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>
              [Ecosystem-Wide KPIs]
            </div>

            {/* Ecosystem KPIs */}
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)", gap:isMobile?10:14, marginBottom:22 }}>
              {[
                { label:"Total Reach", value:"847.2M", trend:"+18%", col:C.accent },
                { label:"Engagement Rate", value:"6.3%", trend:"+2.1%", col:C.green },
                { label:"Narrative Shift Index", value:"72", trend:"+8 pts", col:C.accent },
                { label:"Response Time Avg", value:"4.2h", trend:"-0.8h", col:C.red }
              ].map((kpi, i)=>(
                <div key={i} style={{ background:C.panel, border:`1px solid ${kpi.col}33`, borderRadius:12, padding:isMobile?12:16, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
                  <Tooltip C={C} text={kpi.label==="Total Reach"?"Combined audience reach across all monitored platforms":kpi.label==="Engagement Rate"?"Average engagement rate on counter-narrative content":kpi.label==="Narrative Shift Index"?"Score measuring effectiveness of counter-narrative efforts (0-100)":"Average time from threat detection to coordinated response"}><div style={{ color:C.muted, fontSize:12, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8, fontFamily:"'Bebas Neue', sans-serif" }}>{kpi.label}</div></Tooltip>
                  <div style={{ color:kpi.col, fontSize:isMobile?18:20, fontWeight:800, fontFamily:"monospace", marginBottom:5 }}>{kpi.value}</div>
                  <div style={{ color:C.green, fontSize:10, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>▲ {kpi.trend}</div>
                </div>
              ))}
            </div>

            {/* Budget Allocation */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:16, fontFamily:"'Bebas Neue', sans-serif" }}>Budget Allocation</div>
              {[
                { category:"Team", percent:36, col:C.accent },
                { category:"Admin", percent:23, col:C.red },
                { category:"Media", percent:16, col:C.green },
                { category:"Mission Ops", percent:12, col:C.accent },
                { category:"Research", percent:7, col:C.red },
                { category:"Tech", percent:6, col:C.green }
              ].map((item, i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <Tooltip C={C} text={`${item.category}: ${item.percent}% of total budget`}><span style={{ color:C.text, fontFamily:"'Bebas Neue', sans-serif" }}>{item.category}</span></Tooltip>
                    <span style={{ color:item.col, fontWeight:800, fontFamily:"monospace" }}>{item.percent}%</span>
                  </div>
                  <div style={{ height:8, background:C.blue, borderRadius:4, overflow:"hidden" }}>
                    <div style={{ height:8, width:`${item.percent}%`, background:item.col, borderRadius:4 }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* What Works */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>What Works - Top Performing Strategies</div>
              {[
                { strategy:"Rapid coordinated messaging", effectiveness:94 },
                { strategy:"Real-time counter-narratives", effectiveness:87 },
                { strategy:"Community-led amplification", effectiveness:81 },
                { strategy:"Academic evidence deployment", effectiveness:78 },
                { strategy:"Influencer partnerships", effectiveness:71 }
              ].map((item, i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <Tooltip C={C} text={`Effectiveness score: ${item.effectiveness}%`}><span style={{ color:C.text, fontSize:11, fontFamily:"'Bebas Neue', sans-serif" }}>{item.strategy}</span></Tooltip>
                    <span style={{ color:C.green, fontWeight:800, fontFamily:"monospace" }}>{item.effectiveness}%</span>
                  </div>
                  <div style={{ height:5, background:C.blue, borderRadius:3 }}>
                    <div style={{ height:5, width:`${item.effectiveness}%`, background:C.green, borderRadius:3 }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Performance */}
            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, padding:18, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ color:C.accent, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>Partner Performance</div>
              {[
                { org:"AIPAC", reach:"14.2M", posts:"847", responses:"92%", col:C.accent },
                { org:"ADL", reach:"8.9M", posts:"634", responses:"88%", col:C.green },
                { org:"AJC", reach:"6.4M", posts:"512", responses:"85%", col:C.accent },
                { org:"StandWithUs", reach:"4.1M", posts:"298", responses:"81%", col:C.green },
                { org:"Hillel", reach:"3.7M", posts:"256", responses:"79%", col:C.accent }
              ].map((partner, i)=>(
                <div key={i} style={{ marginBottom:16, paddingBottom:14, borderBottom:i < 4 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <Tooltip C={C} text={`${partner.org}: Reach ${partner.reach} · ${partner.posts} posts · ${partner.responses} response rate`}><span style={{ color:partner.col, fontWeight:700, fontSize:isMobile?11:12, fontFamily:"'Bebas Neue', sans-serif" }}>{partner.org}</span></Tooltip>
                    <div style={{ display:"flex", gap:isMobile?12:18 }}>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ color:C.muted, fontSize:9, fontFamily:"'Bebas Neue', sans-serif" }}>Reach</div>
                        <div style={{ color:C.white, fontWeight:800, fontFamily:"monospace", fontSize:12 }}>{partner.reach}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ color:C.muted, fontSize:9, fontFamily:"'Bebas Neue', sans-serif" }}>Posts</div>
                        <div style={{ color:C.white, fontWeight:800, fontFamily:"monospace", fontSize:12 }}>{partner.posts}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ color:C.muted, fontSize:9, fontFamily:"'Bebas Neue', sans-serif", minWidth:50 }}>Response</span>
                    <div style={{ flex:1, height:6, background:C.blue, borderRadius:3 }}>
                      <div style={{ height:6, width:partner.responses, background:partner.col, borderRadius:3 }}/>
                    </div>
                    <span style={{ color:partner.col, fontWeight:700, fontSize:10, fontFamily:"monospace" }}>{partner.responses}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ background:C.footerBg, borderTop:`1px solid ${C.border}`, padding:isMobile?"6px 12px":"6px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, flexDirection:isMobile?"column":"row", gap:isMobile?6:0 }}>
        <span style={{ color:C.mutedDark, fontSize:isMobile?8:9, letterSpacing:1, fontFamily:"'Bebas Neue', sans-serif" }}>[FRAME] · HUB IL</span>
        <span style={{ color:C.mutedDark, fontSize:isMobile?8:9, fontFamily:"monospace" }}>{new Date().toUTCString().slice(0,25)} UTC</span>
      </div>
    </div>
  );
}
