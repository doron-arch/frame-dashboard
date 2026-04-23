import { INDIGO, ELECTRIC_BLUE } from "../frame-tokens.js";

/* ── [FRAME] Logo — Thin brackets + Bold condensed text ── */
export default function FrameLogo({ size=1, C, isDark }) {
  const s = size;
  return (
    <a href="https://doron-arch.github.io/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", color:"inherit" }}>
      <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0 }}>
        <rect width="32" height="32" rx="4" fill="#06061A"/>
        <rect x="4" y="4" width="2.5" height="24" fill="#4FC3F7"/>
        <rect x="4" y="4" width="6" height="2.5" fill="#4FC3F7"/>
        <rect x="4" y="23.5" width="6" height="2.5" fill="#4FC3F7"/>
        <rect x="25.5" y="4" width="2.5" height="24" fill="#4FC3F7"/>
        <rect x="22" y="4" width="6" height="2.5" fill="#4FC3F7"/>
        <rect x="22" y="23.5" width="6" height="2.5" fill="#4FC3F7"/>
        <rect x="12" y="7" width="2.5" height="18" fill="#4FC3F7"/>
        <rect x="12" y="7" width="8" height="2.5" fill="#4FC3F7"/>
        <rect x="12" y="14.5" width="6" height="2" fill="#4FC3F7"/>
      </svg>
      <div style={{ display:"flex", alignItems:"center", gap:14*s, userSelect:"none" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:Math.round(4*s) }}>
          <span style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontWeight:100, fontSize:Math.round(28*s), letterSpacing:Math.round(2*s), lineHeight:1, fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif" }}>[</span>
          <span style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontWeight:400, fontSize:Math.round(28*s), letterSpacing:Math.round(5*s), lineHeight:1, fontFamily:"'Bebas Neue', sans-serif" }}>FRAME</span>
          <span style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontWeight:100, fontSize:Math.round(28*s), letterSpacing:Math.round(2*s), lineHeight:1, fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif" }}>]</span>
        </div>
        {s>=1 && <div style={{ color:"#6670A0", fontSize:10, letterSpacing:4, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif" }}>SHARED INTELLIGENCE HUB</div>}
      </div>
    </a>
  );
}
