export default function Governance({ govKpis }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        {govKpis.map((k, i) => (
          <div key={i} className="card" onClick={k.toggle} style={{ padding: "18px 20px", cursor: "pointer" }}>
            <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700 }}>{k.value}</div>
            {k.open && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F1F2F4", fontSize: 11.5, color: "#5B6472", lineHeight: 1.5 }}>
                {k.def}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: "18px 20px", opacity: 0.5, position: "relative" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>Calibration Status</div>
        <div style={{ fontSize: 12, color: "#5B6472" }}>Reliability curve ตาม probability bucket</div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12.5,
            fontWeight: 600,
            color: "#5B6472",
          }}
        >
          Unavailable — ข้อมูลยังไม่พอ — Expected availability: Phase 2
        </div>
      </div>
    </>
  );
}
