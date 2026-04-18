import { INDIGO, ELECTRIC_BLUE } from "../frame-tokens.js";

/* ── [FRAME] Logo — Thin brackets + Bold condensed text ── */
export default function FrameLogo({ size=1, C, isDark }) {
  const s = size;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14*s, userSelect:"none" }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:Math.round(4*s) }}>
        <span style={{ color: isDark ? "#FFFFFF" : INDIGO, fontWeight:100, fontSize:Math.round(28*s), letterSpacing:Math.round(2*s), lineHeight:1, fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif" }}>[</span>
        <span style={{ color: isDark ? "#FFFFFF" : INDIGO, fontWeight:400, fontSize:Math.round(28*s), letterSpacing:Math.round(5*s), lineHeight:1, fontFamily:"'Bebas Neue', sans-serif" }}>FRAME</span>
        <span style={{ color: isDark ? "#FFFFFF" : INDIGO, fontWeight:100, fontSize:Math.round(28*s), letterSpacing:Math.round(2*s), lineHeight:1, fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif" }}>]</span>
      </div>
      {s>=1 && <div style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:16, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif" }}>HUB IL</div>}
    </div>
  );
}
