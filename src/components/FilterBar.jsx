import { INDIGO, ELECTRIC_BLUE } from "../frame-tokens.js";
import Tooltip from "./Tooltip.jsx";

export default function FilterBar({ filters, setFilters, C, isDark, platformsList, sevList, networksList }) {
  return (
    <div style={{ display:"flex", gap:12, flexWrap:"wrap", padding:"12px 18px", background:C.panelLight, borderBottom:`1px solid ${C.border}`, alignItems:"center" }}>
      {[[platformsList,"platform"],[sevList,"sev"],[networksList,"network"]].map(([list,key])=>(
        <div key={key} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <Tooltip C={C} text={key === "platform" ? "Filter by platform" : key === "sev" ? "Filter by severity" : "Filter by network"}>
            <span style={{ color:C.muted, fontSize:9, textTransform:"uppercase", letterSpacing:1.2, fontFamily:"'Bebas Neue', sans-serif" }}>{key}</span>
          </Tooltip>
          <div style={{ display:"flex", gap:4 }}>
            {list.map(v=>(
              <button key={v} onClick={()=>setFilters(f=>({...f,[key]:v}))} style={{
                background: filters[key]===v ? (isDark ? ELECTRIC_BLUE+"33" : INDIGO+"15") : "transparent",
                color: filters[key]===v ? (isDark ? "#FFFFFF" : INDIGO) : C.muted,
                border:`1px solid ${filters[key]===v ? (isDark ? ELECTRIC_BLUE : INDIGO) : C.border}`,
                borderRadius:0, padding:"2px 8px", fontSize:9, cursor:"pointer", fontWeight:filters[key]===v?700:400,
                fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.15s"
              }}>{v}</button>
            ))}
          </div>
          <div style={{ width:1, background:C.border, height:16, margin:"0 6px" }}/>
        </div>
      ))}
    </div>
  );
}
