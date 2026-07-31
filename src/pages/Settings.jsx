export default function Settings({ auditTrail }) {
  return (
    <>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>การตั้งค่าระบบ</div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span>การแจ้งเตือน Critical ทาง SMS</span>
          <span style={{ color: "#1E7A3C", fontWeight: 600 }}>เปิดใช้งาน</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span>ภาษาแสดงผล</span>
          <span>ไทย</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span>Session timeout</span>
          <span>30 นาที</span>
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden", marginTop: 16 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEF0F2", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>
          Audit Trail — การกระทำสำคัญทั้งหมด (ตรวจสอบย้อนหลังได้)
        </div>
        {auditTrail.map((at, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 20px", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
            <span>
              <strong>{at.who}</strong> — {at.action}
            </span>
            <span style={{ color: "#94A0B2", whiteSpace: "nowrap" }}>{at.when}</span>
          </div>
        ))}
      </div>
    </>
  );
}
