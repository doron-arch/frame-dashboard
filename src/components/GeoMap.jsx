import { useState, useRef } from "react";
import { INDIGO, ELECTRIC_BLUE, CORAL_RED, DARK_NAVY } from "../frame-tokens.js";
import { GEO } from "../data/geo.js";
import { VPN_ROUTES } from "../data/vpnRoutes.js";
import Tooltip from "./Tooltip.jsx";

function toXY(lat, lng, W=820, H=400) {
  return { x: ((lng+180)/360)*W, y: ((90-lat)/180)*H };
}

export default function GeoMap({ detailed=false, C, isDark }) {
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
  const landPath = (points) => {
    return points.map((p, i) => {
      const {x, y} = toXY(p[0], p[1], W, H);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ') + ' Z';
  };
  const continents = [
    [[83,-70],[78,-73],[72,-80],[68,-65],[62,-62],[58,-55],[52,-56],[47,-53],[46,-60],[44,-64],[43,-66],[42,-70],[41,-72],[40,-74],[38,-75],[35,-76],[30,-81],[29,-83],[27,-80],[25,-80],[25,-83],[26,-89],[29,-90],[30,-94],[28,-97],[26,-97],[22,-97],[19,-96],[17,-91],[15,-88],[14,-84],[10,-84],[9,-79],[8,-77],[9,-80],[15,-87],[18,-95],[20,-105],[24,-110],[28,-113],[31,-117],[33,-118],[35,-121],[38,-123],[42,-124],[46,-124],[49,-127],[53,-130],[55,-133],[58,-137],[60,-140],[61,-146],[64,-152],[60,-162],[62,-166],[65,-168],[68,-165],[71,-157],[72,-143],[70,-140],[72,-128],[76,-120],[73,-95],[76,-89],[80,-85],[83,-78]],
    [[12,-72],[11,-68],[10,-65],[8,-63],[7,-60],[6,-57],[4,-52],[2,-50],[0,-50],[-2,-44],[-5,-35],[-8,-35],[-10,-37],[-13,-39],[-15,-40],[-18,-40],[-20,-40],[-23,-42],[-25,-45],[-28,-49],[-30,-50],[-33,-52],[-35,-57],[-38,-58],[-40,-62],[-42,-64],[-46,-67],[-50,-68],[-53,-70],[-55,-68],[-56,-66],[-52,-70],[-48,-73],[-44,-72],[-40,-73],[-38,-72],[-35,-72],[-30,-71],[-25,-70],[-20,-70],[-17,-72],[-15,-75],[-10,-77],[-5,-80],[-2,-80],[0,-78],[2,-77],[5,-76],[8,-73],[10,-72]],
    [[71,28],[70,32],[68,30],[66,26],[64,22],[62,18],[60,20],[58,18],[57,12],[56,10],[55,8],[54,9],[53,7],[52,5],[51,4],[51,2],[50,0],[49,-1],[48,-4],[47,-2],[44,-1],[43,-8],[37,-8],[36,-6],[36,-2],[37,0],[38,0],[39,3],[40,4],[38,10],[40,15],[41,17],[40,18],[42,20],[42,15],[44,12],[46,8],[46,14],[48,17],[49,14],[50,20],[52,21],[54,14],[55,10],[57,12],[56,16],[57,18],[56,20],[58,24],[59,22],[60,24],[61,23],[63,20],[65,15],[66,14],[68,16],[69,18],[70,20],[70,25],[71,26]],
    [[37,10],[35,0],[36,-1],[36,-5],[34,-7],[33,-8],[31,-10],[28,-13],[25,-15],[22,-17],[20,-17],[18,-16],[15,-17],[13,-17],[10,-15],[7,-8],[5,-4],[5,0],[4,1],[5,2],[6,1],[7,3],[4,7],[4,10],[2,10],[0,10],[-2,10],[-5,12],[-8,13],[-10,14],[-12,17],[-15,12],[-17,12],[-20,14],[-22,14],[-25,15],[-28,16],[-30,17],[-32,18],[-34,18],[-35,20],[-34,24],[-33,26],[-32,28],[-30,30],[-27,33],[-25,35],[-22,36],[-18,37],[-15,40],[-12,42],[-10,40],[-6,40],[-3,41],[0,42],[2,42],[4,43],[6,42],[8,44],[10,46],[12,49],[12,51],[11,52],[10,50],[8,48],[5,44],[3,42],[4,38],[3,35],[2,33],[5,31],[7,30],[10,32],[12,35],[14,37],[16,38],[18,39],[20,38],[22,37],[25,37],[28,34],[30,33],[32,32],[33,12],[35,1],[37,5]],
    [[42,33],[40,40],[38,44],[37,44],[35,44],[38,48],[38,56],[35,52],[33,52],[30,48],[28,48],[25,50],[24,56],[22,56],[20,56],[20,58],[21,62],[24,66],[25,69],[28,73],[30,77],[28,73],[24,68],[22,72],[20,73],[18,75],[15,74],[12,75],[10,76],[8,77],[8,80],[4,80],[2,81],[1,103],[2,103],[6,100],[7,103],[-1,105],[-5,106],[-8,110],[-8,115],[-6,110],[0,104],[2,104],[6,103],[6,106],[8,108],[12,108],[14,109],[16,108],[18,107],[20,106],[21,107],[22,108],[22,114],[25,115],[28,116],[30,121],[32,121],[35,127],[37,127],[38,130],[35,129],[33,130],[32,132],[34,136],[36,140],[38,142],[40,140],[42,140],[43,145],[45,143],[46,142],[48,143],[50,140],[52,141],[54,138],[56,138],[58,135],[60,135],[62,140],[63,150],[65,170],[67,170],[70,170],[72,175],[73,180],[72,175],[72,160],[73,145],[73,135],[73,100],[73,85],[73,75],[72,60],[70,55],[68,50],[64,42],[62,40],[60,38],[58,40],[55,38],[54,40],[52,42],[50,46],[48,42],[46,36],[44,34]],
    [[-11,132],[-13,132],[-14,128],[-16,124],[-20,118],[-23,114],[-26,113],[-29,114],[-31,115],[-33,116],[-34,118],[-35,117],[-35,122],[-34,130],[-34,136],[-35,138],[-37,142],[-38,145],[-38,148],[-37,150],[-35,151],[-33,152],[-31,153],[-28,153],[-26,153],[-23,151],[-20,149],[-18,146],[-15,145],[-14,142],[-12,136]],
    [[58,-5],[57,-2],[56,-1],[54,0],[52,1],[51,1],[50,-3],[50,-5],[51,-5],[51,-3],[52,-1],[53,0],[54,-1],[55,-2],[56,-3],[56,-5],[55,-6],[54,-6],[53,-5],[52,-4],[51,-5],[51,-8],[52,-10],[53,-10],[54,-8],[55,-7],[56,-6],[57,-5]],
    [[84,-28],[83,-24],[82,-22],[80,-18],[78,-18],[76,-19],[74,-20],[72,-22],[70,-25],[68,-26],[68,-30],[70,-35],[72,-40],[73,-45],[74,-50],[76,-55],[78,-60],[80,-58],[82,-50],[83,-40],[84,-34]],
    [[30,78],[29,73],[27,70],[25,68],[23,69],[22,72],[20,73],[18,74],[16,74],[14,75],[12,76],[10,76],[8,77],[4,80],[10,80],[13,80],[16,80],[18,80],[20,83],[22,88],[24,89],[26,89],[28,84],[30,82]],
    [[-2,98],[-1,104],[1,104],[2,103],[6,103],[5,108],[2,110],[0,109],[-2,107],[-4,106],[-6,106],[-7,108],[-8,112],[-8,115],[-7,114],[-5,112],[-3,110],[-2,106],[-3,104]],
    [[45,142],[43,145],[42,144],[40,140],[38,140],[36,140],[35,137],[34,133],[33,131],[34,131],[35,133],[36,136],[37,137],[38,138],[40,140],[42,142],[44,145]],
  ];

  return (
    <div style={{ position:"relative" }}>
      <div style={{ position:"absolute", top:10, right:10, zIndex:10, display:"flex", flexDirection:"column", gap:4 }}>
        <Tooltip C={C} text="Zoom in">
          <button onClick={zoomIn} style={{ background:C.panelLight, color: isDark ? "#FFFFFF" : DARK_NAVY, border:`1px solid ${C.border}`, borderRadius:0, width:28, height:28, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}>+</button>
        </Tooltip>
        <Tooltip C={C} text="Zoom out">
          <button onClick={zoomOut} style={{ background:C.panelLight, color: isDark ? "#FFFFFF" : DARK_NAVY, border:`1px solid ${C.border}`, borderRadius:0, width:28, height:28, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}>−</button>
        </Tooltip>
        <Tooltip C={C} text="Reset zoom">
          <button onClick={resetZoom} style={{ background:C.panelLight, color:C.muted, border:`1px solid ${C.border}`, borderRadius:0, width:28, height:28, fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"all 0.2s" }}>⊡</button>
        </Tooltip>
      </div>
      <div style={{ position:"absolute", bottom:14, left:12, zIndex:10, background:C.panelLight+"cc", border:`1px solid ${C.border}`, borderRadius:0, padding:"2px 8px", fontSize:10, color:C.muted, fontFamily:"'JetBrains Mono', monospace" }}>
        {zoomLevel}%
      </div>
    <svg ref={svgRef} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove}
      onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      style={{ width:"100%", display:"block", background:C.mapBg, borderRadius:8, border:`1px solid ${C.border}`, cursor:"grab", userSelect:"none" }}>
      <defs>
        <radialGradient id="glow_r" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={CORAL_RED} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={CORAL_RED} stopOpacity="0"/>
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
      <circle cx={toXY(31.8,35.0,W,H).x} cy={toXY(31.8,35.0,W,H).y} r="8" fill={isDark ? C.blue : "#D0D0E0"} stroke={isDark ? ELECTRIC_BLUE : INDIGO} strokeWidth="1.2" opacity="0.7"/>
      <text x={toXY(31.8,35.0,W,H).x} y={toXY(31.8,35.0,W,H).y-11} textAnchor="middle" fill={isDark ? ELECTRIC_BLUE : INDIGO} fontSize="7" fontWeight="700" fontFamily="'Bebas Neue', sans-serif">[IL]</text>
      {VPN_ROUTES.map(([a,b],i)=>{
        const p1=toXY(a[0],a[1],W,H), p2=toXY(b[0],b[1],W,H);
        const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2 - 30;
        return (
          <path key={i} d={`M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`}
            fill="none" stroke={CORAL_RED} strokeWidth="0.7" strokeDasharray="5,5" opacity="0.25"/>
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
            {detailed && <text x={x} y={y+3} textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">{pt.count}</text>}
          </g>
        );
      })}
      {detailed && (
        <g>
          {[["Origin",CORAL_RED],["VPN Exit",isDark ? ELECTRIC_BLUE : INDIGO],["Relay",ELECTRIC_BLUE]].map(([l,col],i)=>(
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
