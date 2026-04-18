import { CORAL_RED, CORAL_LIGHT } from "../frame-tokens.js";
import { NETWORKS_DATA } from "../data/networks.js";
import Tooltip from "./Tooltip.jsx";
import Badge from "./Badge.jsx";

export default function NetworksTab({ C, isDark, isMobile, dataColor }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
      {NETWORKS_DATA.map(n=>(
        <div key={n.id} style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?14:18, marginBottom:14, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <Tooltip C={C} text={`Coordinated network from ${n.origin}`}><div style={{ color:n.col, fontWeight:800, fontSize:isMobile?14:16, fontFamily:"'JetBrains Mono', monospace" }}>{n.id}</div></Tooltip>
              <div style={{ color:C.muted, fontSize:isMobile?11:12, fontFamily:"'Inter', sans-serif" }}>Origin: {n.origin}</div>
            </div>
            <Badge s={n.fake>80?"critical":n.fake>60?"high":"medium"} C={C}/>
          </div>
          <div style={{ display:"flex", gap:isMobile?16:28, marginBottom:16, flexWrap:isMobile?"wrap":"nowrap" }}>
            {[["Posts/24h",n.posts.toLocaleString(),n.col],["Fake Ratio",`${n.fake}%`,n.fake>80?CORAL_RED:CORAL_LIGHT],["Coord Score",`${n.coord}%`,dataColor]].map(([l,v,col])=>(
              <div key={l}>
                <Tooltip C={C} text={l==="Posts/24h"?"Total posts in last 24 hours":l==="Fake Ratio"?"Percentage of fake/bot accounts":"Coordination score measuring synchronized behavior"}><div style={{ color:C.muted, fontSize:11, textTransform:"uppercase", letterSpacing:1.2, marginBottom:4, fontFamily:"'Bebas Neue', sans-serif" }}>{l}</div></Tooltip>
                <div style={{ color:col, fontSize:isMobile?22:28, fontFamily:"'Bebas Neue', sans-serif" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ height:6, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
            <div style={{ height:6, width:`${n.fake}%`, background:n.col, borderRadius:0 }}/>
          </div>
        </div>
      ))}
    </div>
  );
}
