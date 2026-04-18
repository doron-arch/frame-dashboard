import { INDIGO, ELECTRIC_BLUE, CORAL_RED, CORAL_LIGHT, DARK_NAVY } from "../frame-tokens.js";
import { GEO } from "../data/geo.js";
import { NETWORKS_DATA } from "../data/networks.js";
import { NARRATIVES_DATA } from "../data/narratives.js";
import Tooltip from "./Tooltip.jsx";
import GeoMap from "./GeoMap.jsx";
import Badge from "./Badge.jsx";
import PostCard from "./PostCard.jsx";

export default function OverviewTab({ C, isDark, isMobile, feed, selected, newIds, handleSelect, setTab, SectionHeader, sevColor, dataColor, threatColor }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20, display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gridTemplateRows:"auto auto auto", gap:isMobile?12:16 }}>
      {/* Stat row */}
      <div style={{ gridColumn:"1/-1", display:"flex", gap:isMobile?8:12, flexWrap:isMobile?"wrap":"nowrap" }}>
        {[
          ["Active Threats","2,847",threatColor,"↑18% (24h)","Threat posts detected in last 24 hours"],
          ["Fake Accounts","14,203",threatColor,"5 networks","Total fake/bot accounts identified"],
          ["Critical Narratives","3",threatColor,"Oct7 · Genocide · IDF","High-severity narrative campaigns"],
          ["Takedowns (7d)","341",dataColor,"↑ 12%","Content removals in the past 7 days"],
          ["Platforms Monitored","7",dataColor,"X·TikTok·IG·FB+","Platforms under active surveillance"],
        ].map(([l,v,col,sub,tooltip])=>(
          <Tooltip key={l} C={C} text={tooltip} below>
            <div style={{ flex:1, background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?"12px":"14px 16px", boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})`, minWidth:isMobile?"calc(50% - 6px)":"auto" }}>
              <div style={{ color:C.muted, fontSize:isMobile?9:11, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6, fontFamily:"'Bebas Neue', sans-serif" }}>{l}</div>
              <div style={{ color:col, fontSize:isMobile?22:28, fontFamily:"'Bebas Neue', sans-serif" }}>{v}</div>
              <div style={{ color:C.muted, fontSize:isMobile?9:10, marginTop:3, fontFamily:"'Inter', sans-serif" }}>{sub}</div>
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Live feed preview */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?14:18, overflow:"hidden", boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <SectionHeader right={<span onClick={()=>setTab("live-feed")}>VIEW ALL →</span>}>LIVE FEED</SectionHeader>
        {feed.slice(0,4).map(p=>(
          <PostCard key={p.id} post={p} selected={selected?.id===p.id} onClick={handleSelect} isNew={newIds.has(p.id)} compact C={C} isDark={isDark}/>
        ))}
      </div>

      {/* Geo mini map */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?14:18, display:isMobile?"none":"block", boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <SectionHeader right={<span onClick={()=>setTab("geo-intel")}>FULL MAP →</span>}>GEO-INTEL</SectionHeader>
        <GeoMap detailed={false} C={C} isDark={isDark}/>
        <div style={{ display:"flex", gap:10, marginTop:12, flexWrap:"wrap" }}>
          {GEO.filter(g=>g.count>300).map(pt=>(
            <div key={pt.city} style={{ background:C.panelLight, border:`1px solid ${pt.c}33`, borderRadius:0, padding:"5px 10px" }}>
              <span style={{ color:pt.c, fontSize:10, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{pt.city}</span>
              <span style={{ color:C.muted, fontSize:10, marginLeft:6, fontFamily:"'JetBrains Mono', monospace" }}>{pt.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Networks summary */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?14:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <SectionHeader right={<span onClick={()=>setTab("networks")}>DETAILS →</span>}>THREAT NETWORKS</SectionHeader>
        {NETWORKS_DATA.map(n=>(
          <div key={n.id} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <div style={{ width:3, height:40, background:n.col, borderRadius:0, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <Tooltip C={C} text={`Origin: ${n.origin} · Coordination: ${n.coord}%`}><span style={{ color:n.col, fontWeight:700, fontSize:12, fontFamily:"'JetBrains Mono', monospace" }}>{n.id}</span></Tooltip>
                <span style={{ color:C.muted, fontSize:10, fontFamily:"'Inter', sans-serif" }}>{n.origin}</span>
              </div>
              <div style={{ height:4, background: isDark ? C.blue : "#E8E8F0", borderRadius:0, marginTop:6 }}>
                <div style={{ height:4, width:`${n.fake}%`, background:n.col, borderRadius:0 }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
                <span style={{ color:C.muted, fontSize:9, fontFamily:"'Inter', sans-serif" }}>{n.posts.toLocaleString()} posts/24h</span>
                <span style={{ color:n.fake>80?CORAL_RED:CORAL_LIGHT, fontSize:9, fontWeight:700, fontFamily:"'JetBrains Mono', monospace" }}>{n.fake}% FAKE</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Narratives summary */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?14:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <SectionHeader right={<span onClick={()=>setTab("narratives")}>DETAILS →</span>}>ACTIVE NARRATIVES</SectionHeader>
        {NARRATIVES_DATA.map((n,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${C.border}` }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <Badge s={n.sev} C={C}/>
                <Tooltip C={C} text={`Volume: ${n.vol.toLocaleString()} · ${n.delta>0?"+":""}${n.delta}% · Network: ${n.net}`}><span style={{ color:C.text, fontSize:11, fontWeight:600, fontFamily:"'Bebas Neue', sans-serif" }}>{n.label}</span></Tooltip>
              </div>
              <div style={{ height:4, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
                <div style={{ height:4, width:`${Math.min(100,n.vol/55)}%`, background:sevColor(n.sev), borderRadius:0 }}/>
              </div>
            </div>
            <div style={{ textAlign:"right", marginLeft:14 }}>
              <div style={{ color: isDark ? "#FFFFFF" : DARK_NAVY, fontWeight:700, fontFamily:"'JetBrains Mono', monospace", fontSize:13 }}>{n.vol.toLocaleString()}</div>
              <div style={{ color:n.delta>0?CORAL_RED:ELECTRIC_BLUE, fontSize:10, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{n.delta>0?"▲":"▼"}{Math.abs(n.delta)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
