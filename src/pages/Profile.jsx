export default function Profile({ currentRole }) {
  return (
    <>
      <div className="card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#1E4FD6",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          อว
        </div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 700 }}>เจ้าหน้าที่ อ.วิชัย</div>
          <div style={{ fontSize: 13, color: "#5B6472", marginTop: 2 }}>รหัสเจ้าหน้าที่ 10231 — ด่านสระบุรี</div>
          <div style={{ fontSize: 12.5, color: "#1E4FD6", fontWeight: 600, marginTop: 6 }}>บทบาทปัจจุบัน: {currentRole}</div>
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>การตั้งค่าบัญชี</div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span style={{ color: "#5B6472" }}>อีเมล</span>
          <span>wichai.p@loadlock.go.th</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span style={{ color: "#5B6472" }}>กะทำงาน</span>
          <span>เช้า (06:00–14:00)</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
          <span style={{ color: "#5B6472" }}>เข้าสู่ระบบล่าสุด</span>
          <span>วันนี้ 07:12</span>
        </div>
      </div>
    </>
  );
}
