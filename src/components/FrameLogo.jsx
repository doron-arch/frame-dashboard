import { INDIGO, ELECTRIC_BLUE } from "../frame-tokens.js";

/* ── [FRAME] Logo — Thin brackets + Bold condensed text ── */
export default function FrameLogo({ size=1, C, isDark }) {
  const s = size;
  return (
    <a href="https://doron-arch.github.io/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", color:"inherit" }}>
      <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0 }}>
        <circle cx="26" cy="26" r="21" stroke="#4FC3F7" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <circle cx="26" cy="26" r="15" stroke="#4FC3F7" strokeWidth="1.5" fill="none" opacity="0.55"/>
        <circle cx="26" cy="26" r="9" stroke="#4FC3F7" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="27" r="1.5" fill="#4FC3F7"/>
        <circle cx="28" cy="25" r="1.5" fill="#4FC3F7"/>
        <circle cx="26" cy="29" r="1.5" fill="#4FC3F7"/>
        <line x1="33" y1="33" x2="44" y2="44" stroke="#4FC3F7" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="26" cy="5" r="2" fill="#4FC3F7" opacity="0.6"/>
        <circle cx="47" cy="26" r="2" fill="#4FC3F7" opacity="0.6"/>
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
