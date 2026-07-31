export default function Header({
  pageTitle,
  goBack,
  backCursor,
  backOpacity,
  searchValue,
  onSearch,
  showNotifs,
  toggleNotifs,
  notifications,
  legendItems,
}) {
  return (
    <header
      style={{
        minHeight: 64,
        background: "#fff",
        borderBottom: "1px solid #E7E9EC",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "10px 20px",
        flexShrink: 0,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span onClick={goBack} style={{ cursor: backCursor, opacity: backOpacity, fontSize: 16 }}>
          ←
        </span>
        <h1
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 17,
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-.01em",
            whiteSpace: "nowrap",
          }}
        >
          {pageTitle}
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "flex-end",
          flex: "1 1 auto",
          minWidth: 0,
        }}
      >
        <div style={{ position: "relative", flexShrink: 1 }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A0B2"
            strokeWidth="2"
            style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            value={searchValue}
            onChange={onSearch}
            placeholder="ค้นหา"
            style={{
              background: "#F2F4F7",
              border: "none",
              borderRadius: 8,
              padding: "7px 8px 7px 26px",
              fontSize: 12,
              width: 100,
              fontFamily: "inherit",
            }}
          />
        </div>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            onClick={toggleNotifs}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#F2F4F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3B4452" strokeWidth="1.8">
              <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 01-3.4 0" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: 5,
                right: 6,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#D3402B",
              }}
            />
          </div>
          {showNotifs && (
            <div
              className="card"
              style={{ position: "absolute", top: 40, right: 0, width: 260, zIndex: 20, padding: 6, overflow: "hidden" }}
            >
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className="row"
                  onClick={n.onClick}
                  style={{ padding: "10px 12px", borderRadius: 6, cursor: "pointer" }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: "#94A0B2", marginTop: 2 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#F2F4F7",
            borderRadius: 20,
            padding: "6px 12px",
            flexShrink: 0,
          }}
        >
          {legendItems.map((l, i) => (
            <div key={i} title={l.label} style={{ display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
              <span style={{ width: 8, height: 8, borderRadius: l.radius, background: l.color, flexShrink: 0 }} />
              <span className="legend-label" style={{ fontSize: 11, color: "#3B4452", fontWeight: 500 }}>
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
