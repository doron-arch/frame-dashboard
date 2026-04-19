import { INDIGO, ELECTRIC_BLUE, CORAL_RED, CORAL_LIGHT, DARK_NAVY } from "../frame-tokens.js";
import Tooltip from "./Tooltip.jsx";

export default function ResponseTab({ C, isDark, isMobile, dataColor }) {
  return (
    <div style={{ flex:1, overflowY:"auto", padding:isMobile?14:20 }}>
      <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>
        [COORDINATED RESPONSE HUB]
      </div>
      {/* Crisis Event Header */}
      <div style={{ background:C.panel, border:`2px solid ${CORAL_RED}`, borderRadius:8, padding:18, marginBottom:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color:CORAL_RED, fontSize:12, textTransform:"uppercase", letterSpacing:2, marginBottom:5, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>ACTIVE CRISIS EVENT</div>
        <div style={{ fontSize:isMobile?16:18, fontWeight:800, color: isDark ? "#FFFFFF" : DARK_NAVY, marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>UN RESOLUTION DRAFT — ANTI-ISRAEL BIAS</div>
        <div style={{ display:"flex", gap:isMobile?12:18, flexWrap:isMobile?"wrap":"nowrap" }}>
          {[
            ["Detection Time","18:34 UTC",CORAL_RED,"When the monitoring system first flagged this event"],
            ["Threat Level","CRITICAL",CORAL_RED,"Automatically assigned severity based on reach and coordination"],
            ["Coordinated Networks","4 ACTIVE",CORAL_LIGHT,"Number of distinct coordinated networks amplifying this event"]
          ].map(([l,v,col,tip])=>(
            <div key={l}>
              <Tooltip C={C} text={tip}>
                <div style={{ color:C.muted, fontSize:10, fontFamily:"'Bebas Neue', sans-serif", marginBottom:4 }}>{l}</div>
              </Tooltip>
              <div style={{ color:col, fontSize:14, fontWeight:700, fontFamily: l==="Detection Time" ? "'JetBrains Mono', monospace" : "'Bebas Neue', sans-serif" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Response Timeline */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:isMobile?16:22, marginBottom:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:16, letterSpacing:2, textTransform:"uppercase", marginBottom:20, fontFamily:"'Bebas Neue', sans-serif" }}>[RESPONSE TIMELINE]</div>
        <div style={{ position:"relative", paddingLeft:isMobile?30:40 }}>
          <div style={{ position:"absolute", left:isMobile?12:16, top:4, bottom:4, width:2, background:C.border }}/>
          {[
            { stage:"DETECTION", time:"0H", desc:"Threat identified by monitoring system", col:CORAL_RED, campaigns:["UN Resolution Draft","Oct 7 Revisionism Surge"], tip:"Threat identified by monitoring system" },
            { stage:"ANALYSIS", time:"1H", desc:"AI analysis and severity classification", col:CORAL_RED, campaigns:["PHANTOM-IR Botnet Wave"], tip:"AI-driven classification of severity and narrative" },
            { stage:"MESSAGING DISTRIBUTED", time:"3H", desc:"Shared talking points sent to all partners", col:dataColor, campaigns:["Campus BDS Push — NYU/Columbia","EU Parliament Bias Vote"], tip:"Shared talking points sent to partner orgs" },
            { stage:"COORDINATED RESPONSE", time:"6H", desc:"Partners actively responding across platforms", col:ELECTRIC_BLUE, campaigns:["TikTok Genocide Narrative","Hostage Denial Campaign"], tip:"Partners actively publishing responses" },
            { stage:"IMPACT ASSESSMENT", time:"24H", desc:"Measure reach, engagement, narrative shift", col:dataColor, campaigns:["IDF War Crimes Claims — Reuters Cycle"], tip:"Measuring reach, engagement, narrative shift" }
          ].map((item, i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:isMobile?12:16, marginBottom:i<4?24:0, position:"relative" }}>
              <div style={{ position:"absolute", left:isMobile?-22:-28, top:4, width:14, height:14, borderRadius:"50%", background:item.col, border:`3px solid ${C.panel}`, boxShadow:`0 0 0 2px ${item.col}44`, zIndex:1 }}/>
              <div style={{ minWidth:isMobile?36:48, background:item.col+"18", border:`1px solid ${item.col}44`, borderRadius:0, padding:"5px 10px", textAlign:"center" }}>
                <div style={{ color:item.col, fontSize:15, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{item.time}</div>
              </div>
              <div style={{ flex:1 }}>
                <Tooltip C={C} text={item.tip}>
                  <div style={{ color: isDark ? "#FFFFFF" : DARK_NAVY, fontSize:16, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif", letterSpacing:1, marginBottom:3 }}>{item.stage}</div>
                </Tooltip>
                <div style={{ color:C.muted, fontSize:13, fontFamily:"'Inter', sans-serif", lineHeight:1.4, marginBottom:6 }}>{item.desc}</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {item.campaigns.map((c,j)=>(
                    <span key={j} style={{ background:item.col+"14", border:`1px solid ${item.col}33`, borderRadius:0, padding:"3px 10px", fontSize:11, color:item.col, fontFamily:"'Bebas Neue', sans-serif", letterSpacing:0.5 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Messaging */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:18, marginBottom:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>SHARED MESSAGING TALKING POINTS</div>
        {[
          "This UN resolution contradicts international law and human rights principles that protect all nations' right to self-defense.",
          "Israel is committed to humanitarian standards and investigations of all credible allegations while defending its citizens.",
          "This proposal politicizes the Council and undermines legitimate efforts to broker peace and protect civilians.",
          "Democratic nations must stand against bias and support fact-based accountability mechanisms."
        ].map((point, i)=>(
          <div key={i} style={{ background:C.panelLight, border:`1px solid ${C.border}`, borderRadius:8, padding:14, marginBottom:12, fontFamily:"'Inter', sans-serif" }}>
            <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:12, fontWeight:700, marginBottom:5, fontFamily:"'Bebas Neue', sans-serif" }}>POINT {i+1}</div>
            <div style={{ color:C.text, fontSize:isMobile?12:13, lineHeight:1.6 }}>{point}</div>
          </div>
        ))}
      </div>

      {/* Partner Response Status */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:18, boxShadow:`0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})` }}>
        <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", marginBottom:14, fontFamily:"'Bebas Neue', sans-serif" }}>PARTNER RESPONSE STATUS</div>
        {[
          { org:"ADL", status:"Responding", col:ELECTRIC_BLUE },
          { org:"AIPAC", status:"Message Received", col:ELECTRIC_BLUE },
          { org:"AJC", status:"Drafting", col:CORAL_LIGHT },
          { org:"StandWithUs", status:"Responding", col:ELECTRIC_BLUE },
          { org:"Hillel", status:"Message Received", col:ELECTRIC_BLUE }
        ].map((partner, i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:11, paddingBottom:11, borderBottom:`1px solid ${C.border}` }}>
            <Tooltip C={C} text={`${partner.org}: ${partner.status}`}><span style={{ color: isDark ? "#FFFFFF" : DARK_NAVY, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{partner.org}</span></Tooltip>
            <Tooltip C={C} text={`Status: ${partner.status}`}>
              <span style={{ background:partner.col+"1a", color:partner.col, border:`1px solid ${partner.col}44`, borderRadius:20, padding:"4px 11px", fontSize:12, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif", textTransform:"uppercase" }}>{partner.status}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}
