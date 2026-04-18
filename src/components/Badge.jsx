import { CORAL_RED, CORAL_LIGHT, ELECTRIC_BLUE } from "../frame-tokens.js";

export default function Badge({ s, C }) {
  const sevColor = s => s==="critical"?CORAL_RED:s==="high"?CORAL_LIGHT:s==="medium"?ELECTRIC_BLUE:C.muted;
  const col=sevColor(s);
  return <span style={{ background:col+"1a",color:col,border:`1px solid ${col}44`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,fontFamily:"'Bebas Neue', sans-serif" }}>{s}</span>;
}
