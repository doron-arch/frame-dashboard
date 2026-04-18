import { useState } from "react";
import { CORAL_RED, CORAL_LIGHT, ELECTRIC_BLUE, DARK_NAVY } from "../frame-tokens.js";
import Badge from "./Badge.jsx";

export default function PostCard({ post, selected, onClick, isNew, compact=false, C, isDark }) {
  const sevColor = s => s==="critical"?CORAL_RED:s==="high"?CORAL_LIGHT:s==="medium"?ELECTRIC_BLUE:C.muted;
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={()=>onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
      background: selected ? C.panelLight : C.panel,
      border:`1px solid ${hovered || selected ? sevColor(post.sev) : C.border}`,
      borderLeft:`4px solid ${sevColor(post.sev)}`,
      borderRadius:8, padding: compact?"10px 14px":"14px 16px", marginBottom:compact?8:10,
      cursor:"pointer", transition:"all 0.2s",
      boxShadow: selected ? `0 2px 12px ${sevColor(post.sev)}2a` : hovered ? `0 2px 8px rgba(0,0,0,${isDark?"0.3":"0.08"})` : `0 2px 8px rgba(0,0,0,${isDark?"0.2":"0.04"})`,
      animation: isNew?"slideIn 0.35s ease":"none",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:compact?4:6 }}>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ background:C.border, borderRadius:0, padding:"2px 8px", fontSize:10, color: isDark ? "#FFFFFF" : DARK_NAVY, fontFamily:"'Bebas Neue', sans-serif" }}>{post.platform}</span>
          <span style={{ background:post.netColor+"1a", color:post.netColor, border:`1px solid ${post.netColor}33`, borderRadius:0, padding:"2px 8px", fontSize:9, fontWeight:700, fontFamily:"'Bebas Neue', sans-serif" }}>{post.network}</span>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <Badge s={post.sev} C={C}/>
          <span style={{ color:C.muted, fontSize:9, fontFamily:"'JetBrains Mono', monospace" }}>{post.fake}%</span>
        </div>
      </div>
      <div style={{ fontWeight:600, color: isDark ? "#FFFFFF" : DARK_NAVY, fontSize:12, marginBottom:3, fontFamily:"'Bebas Neue', sans-serif" }}>{post.handle}</div>
      {!compact && <div style={{ color:C.muted, fontSize:12, lineHeight:1.6, marginBottom:6, fontFamily:"'Inter', sans-serif" }}>{post.text}</div>}
      {!compact && <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {post.tags.map(t=><span key={t} style={{ background: isDark ? C.blue : "#E8E8F0", color: isDark ? "#E0E0E0" : DARK_NAVY, borderRadius:0, padding:"2px 8px", fontSize:9, fontFamily:"'Bebas Neue', sans-serif" }}>{t}</span>)}
      </div>}
    </div>
  );
}
