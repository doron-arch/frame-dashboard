import { INDIGO, ELECTRIC_BLUE, CORAL_RED } from "../frame-tokens.js";
import { NARRATIVES_DATA } from "../data/narratives.js";
import Tooltip from "./Tooltip.jsx";
import Badge from "./Badge.jsx";

export default function NarrativesTab({ C, isDark, isMobile, sevColor }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
      {NARRATIVES_DATA.map((n,i)=>(
        <div key={i} style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?14:18, marginBottom:12, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <Tooltip C={C} text={`${n.vol.toLocaleString()} mentions · Driven by ${n.net}`}><span style={{ fontWeight:700, fontSize:isMobile?13:14, fontFamily:"'Bebas Neue', sans-serif" }}>{n.label}</span></Tooltip>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ color:C.muted, fontSize:11, fontFamily:"'JetBrains Mono', monospace" }}>{n.net}</span>
              <Badge s={n.sev} C={C}/>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:12 }}>
            <span style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:isMobile?26:32, fontFamily:"'Bebas Neue', sans-serif" }}>{n.vol.toLocaleString()}</span>
            <span style={{ color:n.delta>0?CORAL_RED:ELECTRIC_BLUE, fontWeight:700, fontFamily:"'Inter', sans-serif" }}>{n.delta>0?"▲":"▼"} {Math.abs(n.delta)}% (24h)</span>
          </div>
          <div style={{ height:6, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
            <div style={{ height:6, width:`${Math.min(100,n.vol/55)}%`, background:sevColor(n.sev), borderRadius:0 }}/>
          </div>
        </div>
      ))}
    </div>
  );
}
