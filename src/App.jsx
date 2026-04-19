import { useState, useEffect, useRef } from "react";
import { INDIGO, ELECTRIC_BLUE, CORAL_RED, CORAL_LIGHT, DARK_NAVY, DARK, LIGHT } from "./frame-tokens.js";
import { PLATFORMS, SEVERITY, NETWORKS } from './schemas/frame-schemas';
import { POOL } from "./data/pool.js";
import { ALERTS } from "./data/alerts.js";
import Tooltip from "./components/Tooltip.jsx";
import FrameLogo from "./components/FrameLogo.jsx";
import FilterBar from "./components/FilterBar.jsx";
import OverviewTab from "./components/OverviewTab.jsx";
import LiveFeedTab from "./components/LiveFeedTab.jsx";
import GeoIntelTab from "./components/GeoIntelTab.jsx";
import NetworksTab from "./components/NetworksTab.jsx";
import ResponseTab from "./components/ResponseTab.jsx";
import NarrativesTab from "./components/NarrativesTab.jsx";
import KpisTab from "./components/KpisTab.jsx";
import MockupNav from './components/MockupNav';

const PLATFORMS_LIST = ["All","X","TikTok","Instagram","Facebook","Telegram","YouTube"];
const NETWORKS_LIST = ["All","PHANTOM-IR","CEDAR-WAVE","NILE-ECHO","SHADOW-PKT","EURO-MASK"];
const SEV_LIST = ["All","critical","high","medium","low"];

const VALID_TABS = ['overview','live-feed','narratives','networks','geo-intel','kpis','response'];
const PLATFORM_VALUES = Object.values(PLATFORMS);
const SEV_VALUES = Object.values(SEVERITY);
const NETWORK_VALUES = Object.values(NETWORKS);

function readUrlState() {
  if (typeof window === 'undefined') return { tab: 'overview', filters: { platform: 'All', sev: 'All', network: 'All' } };
  const p = new URLSearchParams(window.location.search);
  const rawTab = p.get('tab');
  const tab = VALID_TABS.includes(rawTab) ? rawTab : 'overview';
  const rawPlatform = p.get('platform');
  const platform = PLATFORM_VALUES.includes(rawPlatform) ? rawPlatform : 'All';
  const rawSev = p.get('severity');
  const sev = SEV_VALUES.includes(rawSev) ? rawSev : 'All';
  const rawNetwork = p.get('network');
  const network = NETWORK_VALUES.includes(rawNetwork) ? rawNetwork : 'All';
  return { tab, filters: { platform, sev, network } };
}

function writeUrlState(tab, filters) {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams();
  if (tab && tab !== 'overview') p.set('tab', tab);
  if (filters.platform && filters.platform !== 'All') p.set('platform', filters.platform);
  if (filters.sev && filters.sev !== 'All') p.set('severity', filters.sev);
  if (filters.network && filters.network !== 'All') p.set('network', filters.network);
  const qs = p.toString();
  const newUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
  window.history.replaceState(null, '', newUrl);
}

export default function Dashboard() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
  const C = isDark ? DARK : LIGHT;
  const sevColor = s => s==="critical"?CORAL_RED:s==="high"?CORAL_LIGHT:s==="medium"?ELECTRIC_BLUE:C.muted;

  const [tab, setTab] = useState(() => readUrlState().tab);
  const [feed, setFeed] = useState(POOL.slice(0,5));
  const [newIds, setNewIds] = useState(new Set());
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(POOL[0]);
  const [alertIdx, setAlertIdx] = useState(0);
  const [stats, setStats] = useState({ threats:2847, fake:14203, takedowns:341, networks:5 });
  const [filters, setFilters] = useState(() => readUrlState().filters);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const poolIdx = useRef(5);
  const tabs = ["overview","live-feed","geo-intel","networks","response","narratives","kpis"];

  useEffect(() => { writeUrlState(tab, filters); }, [tab, filters]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    if(paused) return;
    const t=setInterval(()=>{
      const next=POOL[poolIdx.current%POOL.length]; poolIdx.current++;
      const np={...next, id:Date.now()};
      setFeed(f=>[np,...f].slice(0,14));
      setNewIds(s=>new Set([...s,np.id]));
      setStats(s=>({...s, threats:s.threats+Math.floor(Math.random()*3+1), fake:s.fake+Math.floor(Math.random()*5+2)}));
      setTimeout(()=>setNewIds(s=>{const n=new Set(s);n.delete(np.id);return n;}),500);
    },2200);
    return()=>clearInterval(t);
  },[paused]);

  useEffect(()=>{
    const t=setInterval(()=>setAlertIdx(i=>(i+1)%ALERTS.length),3500);
    return()=>clearInterval(t);
  },[]);

  const handleSelect=(post)=>{setSelected(post);setPaused(true);};
  const filteredFeed=feed.filter(p=>{
    if(filters.platform!=="All"&&p.platform!==filters.platform)return false;
    if(filters.sev!=="All"&&p.sev!==filters.sev)return false;
    if(filters.network!=="All"&&p.network!==filters.network)return false;
    return true;
  });

  /* Section header with bracket syntax per brand spec */
  const SectionHeader = ({children, right}) => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
      <span style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:14, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Bebas Neue', sans-serif" }}>[{children}]</span>
      {right && <Tooltip C={C} text="Open full view"><span style={{ color: isDark ? ELECTRIC_BLUE : INDIGO, fontSize:10, cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif" }}>{right}</span></Tooltip>}
    </div>
  );

  const dataColor = isDark ? ELECTRIC_BLUE : INDIGO;
  const threatColor = CORAL_RED;

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.text, fontFamily:"'Inter', sans-serif", fontSize:13, display:"flex", flexDirection:"column" }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes slideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:4px;background:${C.scrollBg}}::-webkit-scrollbar-thumb{background:${C.scrollThumb};border-radius:2px}
        button{transition:all 0.15s}
        @media (max-width: 768px) { body { font-size: 12px; } }
        .skip-link {
          position: absolute;
          top: -100px;
          left: 12px;
          z-index: 10000;
          padding: 10px 16px;
          background: ${C.bg};
          color: ${C.accent};
          border: 2px solid ${C.accent};
          border-radius: 6px;
          font: 600 13px/1 'Inter', system-ui, sans-serif;
          text-decoration: none;
          transition: top 150ms ease;
        }
        .skip-link:focus { top: 12px; outline: none; }
        *:focus-visible {
          outline: 2px solid ${C.accent};
          outline-offset: 2px;
          border-radius: 3px;
        }
        button:focus-visible, a:focus-visible, [role="tab"]:focus-visible {
          outline: 2px solid ${C.accent};
          outline-offset: 3px;
        }
        .visually-hidden {
          position: absolute;
          width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
      `}</style>
      <h1 className="visually-hidden">FRAME Dashboard — Intelligence Hub</h1>

      {/* ── HEADER ── */}
      <header style={{ background:C.headerBg, borderBottom:`1px solid ${C.border}`, padding:isMobile ? "12px 16px" : "0 22px", display:"flex", alignItems:"center", justifyContent:"space-between", height:isMobile ? "auto" : 60, flexShrink:0, flexDirection:isMobile ? "column" : "row", gap:isMobile ? 12 : 0 }}>
        <FrameLogo size={1} C={C} isDark={isDark}/>
        <div style={{ display:"flex", gap:isMobile?16:30, alignItems:"center", flexWrap:isMobile?"wrap":"nowrap", justifyContent:isMobile?"center":"flex-end", width:isMobile?"100%":"auto" }}>
          <Tooltip C={C} text={isDark ? "Switch to light theme" : "Switch to dark theme"}>
            <div onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", userSelect:"none" }}>
              <div style={{
                width:40, height:22, borderRadius:11, padding:2,
                background: isDark ? ELECTRIC_BLUE : C.border,
                transition:"background 0.3s", position:"relative", flexShrink:0
              }}>
                <div style={{
                  width:18, height:18, borderRadius:"50%", background:"#fff",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.3)",
                  transform: isDark ? "translateX(18px)" : "translateX(0)",
                  transition:"transform 0.3s"
                }}/>
              </div>
            </div>
          </Tooltip>
          {[
            ["Active Threats",stats.threats.toLocaleString(),threatColor,"Total active threat posts detected in last 24h"],
            ["Fake Accounts",stats.fake.toLocaleString(),threatColor,"Cumulative fake accounts identified across all networks"],
            ["Networks",stats.networks,dataColor,"Number of coordinated inauthentic networks being tracked"],
            ["Takedowns",stats.takedowns,dataColor,"Content removed from platforms this week"]
          ].map(([l,v,col,tooltip])=>(
            <Tooltip key={l} C={C} text={tooltip}>
              <div style={{ textAlign:"center" }}>
                <div style={{ color:C.muted, fontSize:isMobile?9:11, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6, fontFamily:"'Bebas Neue', sans-serif", display:isMobile?"none":"block" }}>{l}</div>
                <div style={{ color:col, fontSize:isMobile?13:15, fontWeight:700, fontFamily:"'JetBrains Mono', monospace" }}>{v}</div>
              </div>
            </Tooltip>
          ))}
          <Tooltip C={C} text="Real-time monitoring active">
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:7,height:7,background:CORAL_RED,borderRadius:"50%",boxShadow:`0 0 8px ${CORAL_RED}`,animation:"blink 1.1s infinite" }}/>
              <span style={{ color:CORAL_RED, fontSize:10, fontWeight:700, letterSpacing:2, fontFamily:"'Bebas Neue', sans-serif" }}>LIVE</span>
            </div>
          </Tooltip>
        </div>
      </header>

      {/* ── ALERT BAR ── */}
      <div style={{ background:C.alertBg, borderBottom:`1px solid ${C.border}`, padding:"6px 22px", display:"flex", alignItems:"center", gap:12, flexShrink:0, overflow:"hidden" }}>
        <Tooltip C={C} text="Real-time system alerts"><span style={{ background:ALERTS[alertIdx].c, color:"#fff", borderRadius:0, padding:"2px 10px", fontSize:12, fontWeight:800, whiteSpace:"nowrap", fontFamily:"'Bebas Neue', sans-serif" }}>▲ ALERT</span></Tooltip>
        <span style={{ color:ALERTS[alertIdx].c, fontSize:13, fontFamily:"'Inter', sans-serif", opacity:0.9, transition:"all 0.3s" }}>{ALERTS[alertIdx].msg}</span>
      </div>

      {/* ── TABS ── */}
      <nav aria-label="Primary" style={{ padding:isMobile?"0 12px":"0 22px", borderBottom:`1px solid ${C.border}`, display:"flex", flexShrink:0, background:C.tabBg, overflowX:isMobile?"auto":"visible" }}>
        {tabs.map(t=>{
          const tooltips = {
            "overview":"Dashboard overview","live-feed":"Real-time incoming posts","geo-intel":"Geographic origin mapping",
            "networks":"Coordinated inauthentic networks","response":"Crisis response coordination",
            "narratives":"Tracked narrative campaigns","kpis":"Ecosystem-wide KPIs"
          };
          const displayNames = {
            "overview":"OVERVIEW","live-feed":"LIVE FEED","geo-intel":"GEO-INTEL","networks":"NETWORKS",
            "response":"RESPONSE","narratives":"NARRATIVES","kpis":"KPIS"
          };
          const activeColor = isDark ? "#FFFFFF" : INDIGO;
          return (
            <Tooltip key={t} C={C} text={tooltips[t]}>
              <button
                onClick={()=>setTab(t)}
                role="tab"
                aria-selected={tab===t}
                style={{
                background:"none", border:"none", padding:isMobile?"8px 12px":"10px 18px", cursor:"pointer",
                color: tab===t ? activeColor : C.muted,
                borderBottom: tab===t ? `2px solid ${activeColor}` : "2px solid transparent",
                fontWeight:tab===t?700:400, fontSize:isMobile?11:13, textTransform:"uppercase", letterSpacing:1.5,
                fontFamily:"'Bebas Neue', sans-serif", whiteSpace:"nowrap", transition:"all 0.15s"
              }}>
                {displayNames[t]}
              </button>
            </Tooltip>
          );
        })}
      </nav>

      {/* ── FILTER BAR ── */}
      {tab==="live-feed" && <FilterBar filters={filters} setFilters={setFilters} C={C} isDark={isDark} platformsList={PLATFORMS_LIST} sevList={SEV_LIST} networksList={NETWORKS_LIST}/>}

      {/* ── BODY ── */}
      <main id="main-content" style={{ display:"flex", flex:1, overflow:"hidden", flexDirection:isMobile && tab === "live-feed" ? "column" : "row" }}>
        {tab==="overview" && <OverviewTab C={C} isDark={isDark} isMobile={isMobile} feed={feed} selected={selected} newIds={newIds} handleSelect={handleSelect} setTab={setTab} SectionHeader={SectionHeader} sevColor={sevColor} dataColor={dataColor} threatColor={threatColor}/>}
        {tab==="live-feed" && <LiveFeedTab C={C} isDark={isDark} isMobile={isMobile} filteredFeed={filteredFeed} selected={selected} newIds={newIds} handleSelect={handleSelect} paused={paused} setPaused={setPaused} sevColor={sevColor} dataColor={dataColor} threatColor={threatColor}/>}
        {tab==="geo-intel" && <GeoIntelTab C={C} isDark={isDark} isMobile={isMobile}/>}
        {tab==="networks" && <NetworksTab C={C} isDark={isDark} isMobile={isMobile} dataColor={dataColor}/>}
        {tab==="response" && <ResponseTab C={C} isDark={isDark} isMobile={isMobile} dataColor={dataColor}/>}
        {tab==="narratives" && <NarrativesTab C={C} isDark={isDark} isMobile={isMobile} sevColor={sevColor}/>}
        {tab==="kpis" && <KpisTab C={C} isDark={isDark} isMobile={isMobile} dataColor={dataColor}/>}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background:C.footerBg, borderTop:`1px solid ${C.border}`, padding:isMobile?"6px 12px":"6px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, flexDirection:isMobile?"column":"row", gap:isMobile?6:0 }}>
        <span style={{ color:C.muted, fontSize:isMobile?8:9, letterSpacing:1, fontFamily:"'Bebas Neue', sans-serif", opacity:0.6 }}>[FRAME] · HUB IL · SHARED INTELLIGENCE HUB</span>
        <span style={{ color:C.muted, fontSize:isMobile?8:9, fontFamily:"'JetBrains Mono', monospace", opacity:0.6 }}>{new Date().toUTCString().slice(0,25)} UTC</span>
      </footer>
      <MockupNav />
    </div>
  );
}
