import { INDIGO, ELECTRIC_BLUE, CORAL_RED } from "../frame-tokens.js";
import { GEO } from "../data/geo.js";
import Tooltip from "./Tooltip.jsx";
import GeoMap from "./GeoMap.jsx";

export default function GeoIntelTab({ C, isDark, isMobile }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
      <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>
        [ORIGIN CLUSTERS · VPN ROUTING · 28 POINTS]
      </div>
      <GeoMap detailed={true} C={C} isDark={isDark}/>
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4,1fr)", gap:isMobile?8:12, marginTop:16 }}>
        {GEO.map(pt=>(
          <div key={pt.city} style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?"8px 10px":"10px 14px", boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <Tooltip C={C} text={`${pt.city}: ${pt.count} posts · Type: ${pt.type}`}><span style={{ color:pt.c, fontWeight:700, fontSize:isMobile?10:11, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.city}</span></Tooltip>
              <span style={{ background:pt.type==="origin"?CORAL_RED+"22":ELECTRIC_BLUE+"22", color:pt.type==="origin"?CORAL_RED:ELECTRIC_BLUE, fontSize:7, padding:"2px 6px", borderRadius:0, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.type.toUpperCase()}</span>
            </div>
            <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:isMobile?20:24, fontFamily:"'Bebas Neue', sans-serif", marginTop:4 }}>{pt.count}</div>
            <div style={{ color:C.muted, fontSize:8, fontFamily:"'Inter', sans-serif", textTransform:"uppercase" }}>POSTS ATTRIBUTED</div>
          </div>
        ))}
      </div>
    </div>
  );
}
