import { useEffect, useRef, useState } from 'react';

const MOCKUPS = [
  {
    id: 'dashboard',
    name: 'Shared Analytics',
    desc: 'Privacy-preserving ecosystem analytics',
    url: 'https://doron-arch.github.io/dashboard/',
    host: 'doron-arch.github.io/dashboard',
  },
  {
    id: 'frame-technology-demo',
    name: 'Technology Demo',
    desc: 'Adaptation + Rapid Response + Workflow',
    url: 'https://doron-arch.github.io/frame-technology-demo/',
    host: 'doron-arch.github.io/frame-technology-demo',
  },
  {
    id: 'frame-dashboard',
    name: 'Intelligence Hub',
    desc: 'Live threat and narrative monitoring',
    url: 'https://doron-arch.github.io/frame-dashboard/',
    host: 'doron-arch.github.io/frame-dashboard',
  },
];

function detectCurrentId() {
  if (typeof window === 'undefined') return null;
  const href = window.location.href;
  const found = MOCKUPS.find((m) => href.includes(m.host));
  return found ? found.id : 'frame-dashboard';
}

function isMac() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
}

const C = {
  accent: '#22d3ee',
  accentSoft: 'rgba(34,211,238,0.18)',
  bg: 'rgba(10,18,28,0.92)',
  border: 'rgba(148,163,184,0.22)',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  currentBg: 'rgba(34,197,94,0.12)',
  currentBorder: 'rgba(34,197,94,0.45)',
  currentText: '#4ade80',
};

export default function MockupNav() {
  const [open, setOpen] = useState(false);
  const [currentId] = useState(detectCurrentId);
  const rootRef = useRef(null);
  const mac = isMac();
  const kbdLabel = mac ? '⌘K' : 'Ctrl+K';

  useEffect(() => {
    function onKey(e) {
      const mod = mac ? e.metaKey : e.ctrlKey;
      if (mod && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function onClickOutside(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [mac]);

  return (
    <div
      ref={rootRef}
      className="frame-mockup-nav"
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 9999,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            bottom: 'calc(100% + 10px)',
            width: 320,
            padding: 10,
            borderRadius: 14,
            background: C.bg,
            border: `1px solid ${C.border}`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            color: C.text,
          }}
        >
          <div
            style={{
              padding: '6px 10px 10px',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.textMuted,
            }}
          >
            FRAME Mockups
          </div>
          {MOCKUPS.map((m) => {
            const isCurrent = m.id === currentId;
            return (
              <a
                key={m.id}
                href={m.url}
                role="menuitem"
                aria-current={isCurrent ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  marginTop: 4,
                  borderRadius: 10,
                  textDecoration: 'none',
                  border: `1px solid ${isCurrent ? C.currentBorder : 'transparent'}`,
                  background: isCurrent ? C.currentBg : 'transparent',
                  color: C.text,
                  transition: 'background 120ms ease, border-color 120ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isCurrent) e.currentTarget.style.background = 'rgba(148,163,184,0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: isCurrent ? C.currentText : C.accent,
                    flexShrink: 0,
                  }}
                />
                <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{m.desc}</span>
                </span>
                {isCurrent && (
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: C.currentText,
                      fontWeight: 700,
                    }}
                  >
                    current
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle FRAME mockup navigation"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 14px',
          borderRadius: 999,
          border: `1px solid ${C.border}`,
          background: C.bg,
          color: C.text,
          fontSize: 12,
          letterSpacing: '0.08em',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <span style={{ color: C.accent, fontSize: 14 }}>⊞</span>
        <span>FRAME</span>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: 6,
            background: C.accentSoft,
            color: C.accent,
            fontSize: 11,
          }}
        >
          {kbdLabel}
        </span>
      </button>
    </div>
  );
}
