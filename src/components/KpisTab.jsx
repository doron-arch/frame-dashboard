import { INDIGO, ELECTRIC_BLUE, CORAL_RED, DARK_NAVY } from "../frame-tokens.js";
import Tooltip from "./Tooltip.jsx";

export default function KpisTab({ C, isDark, isMobile, dataColor }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
      <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>
        [ECOSYSTEM-WIDE KPIS]
      </div>

      {/* Ecosystem KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)", gap:isMobile?10:14, marginBottom:22 }}>
        {[
          { label:"Total Reach", value:"847.2M", trend:"+18%", col:dataColor },
          { label:"Engagement Rate", value:"6.3%", trend:"+2.1%", col:ELECTRIC_BLUE },
          { label:"Narrative Shift Index", value:"72", trend:"+8 pts", col:dataColor },
          { label:"Response Time Avg", value:"4.2h", trend:"-0.8h", col:CORAL_RED }
        ].map((kpi, i)=>(
          <div key={i} style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?12:16, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
            <Tooltip C={C} text={kpi.label==="Total Reach"?"Combined audience reach":kpi.label==="Engagement Rate"?"Average engagement on counter-narrative content":kpi.label==="Narrative Shift Index"?"Effectiveness score (0-100)":"Avg time from detection to response"}>
              <div style={{ color:C.muted, fontSize:12, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8, fontFamily:"'Bebas Neue', sans-serif" }}>{kpi.label}</div>
            </Tooltip>
            <div style={{ color:kpi.col, fontSize:isMobile?22:28, fontFamily:"'Bebas Neue', sans-serif", marginBottom:5 }}>{kpi.value}</div>
            <div style={{ color:ELECTRIC_BLUE, fontSize:10, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>▲ {kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Budget Allocation */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:18, marginBottom:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:16, fontFamily:"'Bebas Neue', sans-serif" }}>BUDGET ALLOCATION</div>
        {[
          { category:"Team", percent:36, col:dataColor },
          { category:"Admin", percent:23, col:CORAL_RED },
          { category:"Media", percent:16, col:ELECTRIC_BLUE },
          { category:"Mission Ops", percent:12, col:dataColor },
          { category:"Research", percent:7, col:CORAL_RED },
          { category:"Tech", percent:6, col:ELECTRIC_BLUE }
        ].map((item, i)=>(
          <div key={i} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <Tooltip C={C} text={`${item.category}: ${item.percent}% of total budget`}><span style={{ color:C.text, fontFamily:"'Bebas Neue', sans-serif" }}>{item.category}</span></Tooltip>
              <span style={{ color:item.col, fontWeight:700, fontFamily:"'JetBrains Mono', monospace" }}>{item.percent}%</span>
            </div>
            <div style={{ height:8, background: isDark ? C.blue : "#E8E8F0", borderRadius:0, overflow:"hidden" }}>
              <div style={{ height:8, width:`${item.percent}%`, background:item.col, borderRadius:0 }}/>
            </div>
          </div>
        ))}
      </div>

      {/* What Works */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:18, marginBottom:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>WHAT WORKS — TOP PERFORMING STRATEGIES</div>
        {[
          { strategy:"Rapid coordinated messaging", effectiveness:94 },
          { strategy:"Real-time counter-narratives", effectiveness:87 },
          { strategy:"Community-led amplification", effectiveness:81 },
          { strategy:"Academic evidence deployment", effectiveness:78 },
          { strategy:"Influencer partnerships", effectiveness:71 }
        ].map((item, i)=>(
          <div key={i} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <Tooltip C={C} text={`Effectiveness: ${item.effectiveness}%`}><span style={{ color:C.text, fontSize:11, fontFamily:"'Bebas Neue', sans-serif" }}>{item.strategy}</span></Tooltip>
              <span style={{ color:ELECTRIC_BLUE, fontWeight:700, fontFamily:"'JetBrains Mono', monospace" }}>{item.effectiveness}%</span>
            </div>
            <div style={{ height:5, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
              <div style={{ height:5, width:`${item.effectiveness}%`, background:ELECTRIC_BLUE, borderRadius:0 }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Performance */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>PARTNER PERFORMANCE</div>
        {[
          { org:"AIPAC", reach:"14.2M", posts:"847", responses:"92%", col:dataColor },
          { org:"ADL", reach:"8.9M", posts:"634", responses:"88%", col:ELECTRIC_BLUE },
          { org:"AJC", reach:"6.4M", posts:"512", responses:"85%", col:dataColor },
          { org:"StandWithUs", reach:"4.1M", posts:"298", responses:"81%", col:ELECTRIC_BLUE },
          { org:"Hillel", reach:"3.7M", posts:"256", responses:"79%", col:dataColor }
        ].map((partner, i)=>(
          <div key={i} style={{ marginBottom:16, paddingBottom:14, borderBottom:i < 4 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <Tooltip C={C} text={`${partner.org}: Reach ${partner.reach} · ${partner.posts} posts · ${partner.responses} response rate`}><span style={{ color:partner.col, fontWeight:700, fontSize:isMobile?11:12, fontFamily:"'Bebas Neue', sans-serif" }}>{partner.org}</span></Tooltip>
              <div style={{ display:"flex", gap:isMobile?12:18 }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:C.muted, fontSize:9, fontFamily:"'Bebas Neue', sans-serif" }}>REACH</div>
                  <div style={{ color: isDark ? "#FFFFFF" : DARK_NAVY, fontWeight:700, fontFamily:"'JetBrains Mono', monospace", fontSize:12 }}>{partner.reach}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:C.muted, fontSize:9, fontFamily:"'Bebas Neue', sans-serif" }}>POSTS</div>
                  <div style={{ color: isDark ? "#FFFFFF" : DARK_NAVY, fontWeight:700, fontFamily:"'JetBrains Mono', monospace", fontSize:12 }}>{partner.posts}</div>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ color:C.muted, fontSize:9, fontFamily:"'Bebas Neue', sans-serif", minWidth:50 }}>RESPONSE</span>
              <div style={{ flex:1, height:6, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
                <div style={{ height:6, width:partner.responses, background:partner.col, borderRadius:0 }}/>
              </div>
              <span style={{ color:partner.col, fontWeight:700, fontSize:10, fontFamily:"'JetBrains Mono', monospace" }}>{partner.responses}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
