export default function Analytics({ provinceStats }) {
  return (
    <>
      <div style={{ background: "#F2F4F7", border: "1px solid #E7E9EC", borderRadius: 8, padding: "10px 16px", fontSize: 12, color: "#5B6472", marginBottom: 16 }}>
        หน้านี้เป็น mockup แบบคร่าว — นอกขอบเขต interactive prototype รอบนี้
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>รถผ่านด่านเดือนนี้</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700 }}>542,110</div>
        </div>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>Case Candidate เดือนนี้</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700 }}>3,884</div>
        </div>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>อัตราปิดเคสตรง SLA</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: "#1E7A3C" }}>91.2%</div>
        </div>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>จังหวัดที่มี Critical มากสุด</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>ชลบุรี</div>
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Case Candidate ตามจังหวัด (10 อันดับแรก)</div>
        {provinceStats.map((ps, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0" }}>
            <div style={{ width: 110, fontSize: 12.5, flexShrink: 0 }}>{ps.name}</div>
            <div style={{ flex: 1, height: 10, background: "#F1F2F4", borderRadius: 5, overflow: "hidden" }}>
              <div className="progress-fill" style={{ height: "100%", width: `${ps.count}px`, maxWidth: "100%", background: "#1E4FD6" }} />
            </div>
            <div style={{ width: 40, textAlign: "right", fontSize: 12, color: "#5B6472" }}>{ps.count}</div>
          </div>
        ))}
      </div>
    </>
  );
}
