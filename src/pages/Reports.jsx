export default function Reports() {
  return (
    <>
      <div style={{ background: "#F2F4F7", border: "1px solid #E7E9EC", borderRadius: 8, padding: "10px 16px", fontSize: 12, color: "#5B6472", marginBottom: 16 }}>
        หน้านี้เป็น mockup แบบคร่าว — นอกขอบเขต interactive prototype รอบนี้
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEF0F2", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>
          รายงานที่สร้างล่าสุด
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span>Case Disposition — LL-0431.pdf</span>
          <span style={{ color: "#94A0B2" }}>เมื่อวาน</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span>Weekly Case Summary — สัปดาห์ที่ 30</span>
          <span style={{ color: "#94A0B2" }}>3 วันที่แล้ว</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span>Monthly Governance Report — มิ.ย. 2569</span>
          <span style={{ color: "#94A0B2" }}>4 สัปดาห์ที่แล้ว</span>
        </div>
      </div>
    </>
  );
}
