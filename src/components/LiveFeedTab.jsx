import { INDIGO, ELECTRIC_BLUE, CORAL_RED, CORAL_LIGHT, DARK_NAVY } from "../frame-tokens.js";
import Tooltip from "./Tooltip.jsx";
import Badge from "./Badge.jsx";
import PostCard from "./PostCard.jsx";

export default function LiveFeedTab({ C, isDark, isMobile, filteredFeed, selected, newIds, handleSelect, paused, setPaused, sevColor, dataColor, threatColor }) {
  return (
    <>
      <div style={{ flex:1, overflowY:"auto", padding:isMobile?"12px 14px":"16px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <span style={{ color:C.muted, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif" }}>
            INCOMING POSTS · {filteredFeed.length} SHOWN
            {paused&&<span style={{ color:ELECTRIC_BLUE, marginLeft:8 }}>⏸ PAUSED</span>}
          </span>
          <Tooltip C={C} text="Pause or resume the live data stream">
            <button onClick={()=>setPaused(p=>!p)} style={{ background:paused ? ELECTRIC_BLUE+"22" : CORAL_RED+"22", color:paused ? ELECTRIC_BLUE : CORAL_RED, border:`1px solid ${paused ? ELECTRIC_BLUE : CORAL_RED}55`, borderRadius:0, padding:"4px 16px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.15s" }}>
              {paused?"▶ RESUME":"⏸ PAUSE"}
            </button>
          </Tooltip>
        </div>
        {filteredFeed.length===0
          ?<div style={{ color:C.muted, textAlign:"center", marginTop:40, fontFamily:"'Inter', sans-serif" }}>No posts match current filters.</div>
          :filteredFeed.map(p=><PostCard key={p.id} post={p} selected={selected?.id===p.id} onClick={handleSelect} isNew={newIds.has(p.id)} C={C} isDark={isDark}/>)
        }
      </div>
      <div style={{ width:isMobile?"100%":290, borderLeft:isMobile?"none":`1px solid ${C.border}`, borderTop:isMobile?`1px solid ${C.border}`:"none", background:C.tabBg, overflowY:"auto", padding:isMobile?12:16, flexShrink:0, maxHeight:isMobile?"40vh":"auto" }}>
        {selected?(
          <>
            <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:13, letterSpacing:2, textTransform:"uppercase", marginBottom:12, fontFamily:"'Bebas Neue', sans-serif" }}>POST ANALYSIS</div>
            <div style={{ background:C.panel, border:`2px solid ${sevColor(selected.sev)}`, borderRadius:8, padding:16, marginBottom:16, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <span style={{ color: isDark ? "#FFFFFF" : DARK_NAVY, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{selected.handle}</span>
                <Badge s={selected.sev} C={C}/>
              </div>
              <div style={{ color:C.muted, fontSize:11, lineHeight:1.6, background:C.cardQuoteBg, borderRadius:4, padding:"10px 12px", marginBottom:14, fontFamily:"'Inter', sans-serif" }}>"{selected.text}"</div>
              {[
                ["Platform",selected.platform,dataColor,"Social platform where the post originated"],
                ["Network",selected.network,selected.netColor,"Coordinated network cluster this account belongs to"],
                ["VPN Route",selected.vpn,dataColor,"Exit-node region detected for this account"],
                ["Followers",selected.followers, isDark ? "#E0E0E0" : DARK_NAVY,"Follower count at time of post"]
              ].map(([l,v,col,tip])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, borderBottom:`1px solid ${C.border}`, paddingBottom:8 }}>
                  <Tooltip C={C} text={tip}>
                    <span style={{ color:C.muted, fontSize:11, fontFamily:"'Bebas Neue', sans-serif" }}>{l}</span>
                  </Tooltip>
                  <span style={{ color:col, fontSize:11, fontWeight:700, fontFamily:"'JetBrains Mono', monospace" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <Tooltip C={C} text="Probability that this account is fake or automated">
                    <span style={{ color:C.muted, fontSize:11, fontFamily:"'Bebas Neue', sans-serif" }}>FAKE SCORE</span>
                  </Tooltip>
                  <span style={{ color:selected.fake>80?CORAL_RED:selected.fake>60?CORAL_LIGHT:ELECTRIC_BLUE, fontWeight:800, fontSize:14, fontFamily:"'JetBrains Mono', monospace" }}>{selected.fake}%</span>
                </div>
                <div style={{ height:6, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
                  <div style={{ height:6, width:`${selected.fake}%`, background:selected.fake>80?CORAL_RED:selected.fake>60?CORAL_LIGHT:ELECTRIC_BLUE, borderRadius:0 }}/>
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <Tooltip C={C} text="Flag content for removal request">
                  <button style={{ flex:1, background:CORAL_RED+"22", color:CORAL_RED, border:`1px solid ${CORAL_RED}55`, borderRadius:0, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif" }}>TAKEDOWN</button>
                </Tooltip>
                <Tooltip C={C} text="Save post to evidence archive">
                  <button style={{ flex:1, background: isDark ? ELECTRIC_BLUE+"22" : INDIGO+"15", color: isDark ? ELECTRIC_BLUE : INDIGO, border:`1px solid ${isDark ? ELECTRIC_BLUE : INDIGO}55`, borderRadius:0, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif" }}>ARCHIVE</button>
                </Tooltip>
              </div>
            </div>
            <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:13, letterSpacing:2, textTransform:"uppercase", marginBottom:12, fontFamily:"'Bebas Neue', sans-serif" }}>PLATFORM EXPOSURE</div>
            {[["X / Twitter",38,dataColor],["TikTok",27,threatColor],["Instagram",18,dataColor],["Facebook",12,CORAL_LIGHT],["Telegram",5,dataColor]].map(([p,v,col])=>(
              <div key={p} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:11, fontFamily:"'Inter', sans-serif" }}>{p}</span>
                  <span style={{ color:col, fontSize:11, fontFamily:"'JetBrains Mono', monospace", fontWeight:700 }}>{v}%</span>
                </div>
                <div style={{ height:4, background: isDark ? C.blue : "#E8E8F0", borderRadius:0 }}>
                  <div style={{ height:4, width:`${v}%`, background:col, borderRadius:0 }}/>
                </div>
              </div>
            ))}
          </>
        ):<div style={{ color:C.muted, textAlign:"center", marginTop:60, fontFamily:"'Inter', sans-serif" }}>← Select a post</div>}
      </div>
    </>
  );
}
