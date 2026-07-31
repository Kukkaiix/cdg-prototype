export default function Overview({ stats, cases, goQueueList, goLive, liveVehicleCount }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(200px,1fr))", gap: 16, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} className="card stat-card" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: s.markerRadius, background: s.markerColor, flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "#5B6472", fontWeight: 500, whiteSpace: "nowrap" }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: "-.02em" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: s.deltaColor, marginTop: 8, fontWeight: 500 }}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, alignItems: "start" }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 22px",
              borderBottom: "1px solid #EEF0F2",
            }}
          >
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600 }}>Case Candidate ล่าสุด</div>
            <a onClick={goQueueList} style={{ fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              ดูทั้งหมดที่ Case Queue →
            </a>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 100px 76px",
              gap: 6,
              padding: "10px 20px",
              fontSize: 11,
              fontWeight: 600,
              color: "#94A0B2",
              letterSpacing: ".05em",
              whiteSpace: "nowrap",
            }}
          >
            <div>ID</div>
            <div>สถานี / ด่าน</div>
            <div>PRIORITY</div>
            <div style={{ textAlign: "right" }}>เวลา</div>
          </div>
          {cases.map((c) => (
            <div
              key={c.id}
              className="row"
              onClick={c.open}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 100px 76px",
                gap: 6,
                padding: "14px 20px",
                fontSize: 13,
                borderTop: "1px solid #F1F2F4",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#5B6472", fontSize: 12, fontWeight: 500 }}>{c.id}</div>
              <div style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.station}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: c.priorityRadius, background: c.priorityColor, flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: c.priorityColor, fontSize: 12.5 }}>{c.priority}</span>
              </div>
              <div style={{ color: "#94A0B2", fontSize: 12, textAlign: "right" }}>{c.time}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            onClick={goLive}
            style={{
              background: "#12151C",
              borderRadius: 10,
              padding: 22,
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle,rgba(46,92,240,.25),transparent 70%)",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="live-dot-green" style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80" }} />
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14.5, fontWeight: 600 }}>Live Monitoring</div>
            </div>
            <div style={{ fontSize: 12.5, color: "#9AA3B5", marginBottom: 18 }}>รถผ่านด่านแบบ real-time และกล้องสด</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 18 }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: "-.02em" }}>
                {liveVehicleCount}
              </span>
              <span style={{ fontSize: 12, color: "#9AA3B5" }}>คันผ่านด่าน ณ ขณะนี้</span>
            </div>
            <div
              className="btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#1E4FD6",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                padding: "9px 16px",
                borderRadius: 7,
              }}
            >
              เปิด Live Monitoring →
            </div>
          </div>
          <div className="card" style={{ borderLeft: "3px solid #1E4FD6", padding: "18px 20px" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
              Review Priority
            </div>
            <div style={{ fontSize: 12.5, color: "#3B4452", marginBottom: 10, lineHeight: 1.5 }}>
              <strong>Definition:</strong> ระดับความสำคัญที่ระบบจัดลำดับให้ตรวจสอบก่อน-หลัง จากรูปแบบความผิดปกติที่ตรวจพบ
            </div>
            <div style={{ fontSize: 11.5, color: "#94A0B2", fontStyle: "italic" }}>ค่านี้ไม่ใช่ความน่าจะเป็นของการกระทำผิด</div>
          </div>
        </div>
      </div>
    </>
  );
}
