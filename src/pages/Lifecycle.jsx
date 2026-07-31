export default function Lifecycle({ lifecycleStages, releaseNotes }) {
  return (
    <>
      <div className="card" style={{ padding: "18px 20px", marginBottom: 16, background: "#EFF3FF", borderColor: "#C7D6F9" }}>
        <div style={{ fontSize: 12.5, color: "#3B4452", lineHeight: 1.6 }}>
          ระบบ AI ที่ใช้งานตอนนี้คือ <strong>เวอร์ชัน v2.2.0</strong> (ใช้งานเต็มรูปแบบ) ส่วนเวอร์ชันถัดไป <strong>v2.3.1</strong>{" "}
          กำลังอยู่ระหว่างทดสอบกับรถเพียง 5% ก่อนนำมาใช้งานจริงทั้งหมด เพื่อความปลอดภัย
        </div>
      </div>
      <div style={{ fontSize: 12, color: "#94A0B2", marginBottom: 8 }}>ขั้นตอนการตรวจสอบโมเดลก่อนใช้งานจริง (คลิกแต่ละขั้นเพื่อดูรายละเอียด)</div>
      <div style={{ display: "flex", gap: 0, marginBottom: 12 }}>
        {lifecycleStages.map((ls, i) => (
          <div
            key={i}
            onClick={ls.select}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "16px 8px",
              background: ls.bg,
              color: ls.fg,
              borderRadius: 8,
              marginRight: 8,
              cursor: "pointer",
              outline: ls.outline,
            }}
          >
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ls.label}</div>
            <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>{ls.sub}</div>
          </div>
        ))}
      </div>
      {lifecycleStages.map(
        (ls, i) =>
          ls.active && (
            <div key={i} className="card" style={{ padding: "14px 18px", marginBottom: 16, borderLeft: "3px solid #1E4FD6" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>{ls.label}</div>
              <div style={{ fontSize: 12, color: "#5B6472" }}>{ls.detail}</div>
            </div>
          )
      )}
      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>มีอะไรเปลี่ยนใน v2.3.1</div>
        {releaseNotes.map((rn, i) => (
          <div key={i} style={{ fontSize: 12.5, color: "#3B4452", padding: "6px 0", borderTop: "1px solid #F1F2F4" }}>
            • {rn}
          </div>
        ))}
      </div>
    </>
  );
}
