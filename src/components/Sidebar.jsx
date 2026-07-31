export default function Sidebar({ navItems, currentRole, goProfile }) {
  return (
    <nav
      style={{
        width: 264,
        background: "#12151C",
        color: "#fff",
        flexShrink: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "22px 24px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            background: "linear-gradient(135deg,#2E5CF0,#1E4FD6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-4z" fill="#fff" />
          </svg>
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "-.01em",
            whiteSpace: "nowrap",
          }}
        >
          LoadLock AI
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "6px 12px 20px" }}>
        {navItems.map((it, i) => (
          <div key={i} style={{ marginBottom: 2 }}>
            <div
              className="nav-item"
              onClick={it.onClick}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "9px 12px",
                fontSize: 13.5,
                fontWeight: 500,
                cursor: "pointer",
                background: it.bg,
                color: it.fg,
                borderRadius: 7,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: it.iconOpacity,
                }}
              >
                {it.icon}
              </span>
              {it.label}
            </div>
            {it.children.map((ch, j) => (
              <div
                key={j}
                className="nav-item"
                onClick={ch.onClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "7px 12px 7px 39px",
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  color: ch.fg,
                  background: ch.bg,
                  borderRadius: 7,
                  whiteSpace: "nowrap",
                }}
              >
                {ch.label}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="nav-item"
        onClick={goProfile}
        style={{
          padding: "14px 16px",
          borderTop: "1px solid #232935",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#1E4FD6",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          อว
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            เจ้าหน้าที่ อ.วิชัย
          </div>
          <div style={{ fontSize: 11, color: "#8892A0" }}>{currentRole}</div>
        </div>
      </div>
    </nav>
  );
}
