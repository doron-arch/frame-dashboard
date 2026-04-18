import { useState, useRef } from "react";

export default function Tooltip({ children, text, C, below=false }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const posStyle = below
    ? { top: "calc(100% + 8px)", bottom: "auto" }
    : { bottom: "calc(100% + 8px)", top: "auto" };
  const arrowStyle = below
    ? { bottom: "100%", top: "auto", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: `6px solid ${C.tooltipBg}`, borderTop: "none" }
    : { top: "100%", bottom: "auto", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${C.tooltipBg}`, borderBottom: "none" };
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: "absolute", ...posStyle, left: "50%", transform: "translateX(-50%)",
          background: C.tooltipBg, color: C.tooltipText, fontSize: 11, padding: "6px 12px",
          borderRadius: 4, zIndex: 9999,
          border: `1px solid ${C.tooltipBorder}`, boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          pointerEvents: "none", fontFamily: "'Inter', sans-serif", letterSpacing: 0.5,
          maxWidth: 300, whiteSpace: "normal"
        }}>
          {text}
          <div style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0, ...arrowStyle
          }}/>
        </div>
      )}
    </div>
  );
}
