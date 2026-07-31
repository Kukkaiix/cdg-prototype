export default function Fairness({ fairnessSummary, fairnessSearch, onFairnessSearch, fairnessSortOptions, fairnessRows }) {
  return (
    <>
      <div className="card" style={{ padding: "18px 20px", marginBottom: 16, background: "#EFF3FF", borderColor: "#C7D6F9" }}>
        <div style={{ fontSize: 12.5, color: "#3B4452", lineHeight: 1.6 }}>
          หน้านี้ตรวจสอบว่า AI ให้ Review Priority ต่างกันมากผิดปกติระหว่างจังหวัดหรือไม่ (ครบทั้ง 77 จังหวัด) — ถ้าจังหวัดไหนมี "จำนวนเคสที่ตรวจสอบได้ (n)"
          น้อยมาก ผลอาจไม่แม่นยำ ให้ดูตัวเลข n ก่อนเชื่อผลสรุป
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {fairnessSummary.map((fs, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "#94A0B2", marginBottom: 6 }}>{fs.label}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700 }}>{fs.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#FEF6E4", border: "1px solid #F3D99B", borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: "#7A5A00", marginBottom: 16 }}>
        ⚠ จังหวัดที่มีจำนวนเคสน้อยกว่า 30 เคส (สีแดง) อาจสรุปผลไม่แม่นยำ
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          value={fairnessSearch}
          onChange={onFairnessSearch}
          placeholder="ค้นหาจังหวัด..."
          style={{ background: "#fff", border: "1px solid #E7E9EC", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, width: 180, fontFamily: "inherit" }}
        />
        <span style={{ fontSize: 11.5, color: "#94A0B2" }}>เรียงตาม:</span>
        {fairnessSortOptions.map((so, i) => (
          <div
            key={i}
            onClick={so.onClick}
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: 16,
              cursor: "pointer",
              background: so.active ? "#1E4FD6" : "#F2F4F7",
              color: so.active ? "#fff" : "#12151C",
              whiteSpace: "nowrap",
            }}
          >
            {so.label}
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden", maxHeight: 520, overflowY: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 140px 140px",
            gap: 8,
            padding: "12px 20px",
            fontSize: 11,
            fontWeight: 600,
            color: "#94A0B2",
            position: "sticky",
            top: 0,
            background: "#fff",
          }}
        >
          <div>จังหวัด</div>
          <div>จำนวนเคส (n)</div>
          <div>Review Priority เฉลี่ย</div>
        </div>
        {fairnessRows.map((fr, i) => (
          <div key={i}>
            <div
              className="row"
              onClick={fr.select}
              style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", gap: 8, padding: "11px 20px", borderTop: "1px solid #F1F2F4", fontSize: 12.5, alignItems: "center", cursor: "pointer" }}
            >
              <div>{fr.group}</div>
              <div style={{ color: fr.nColor, fontWeight: 600 }}>{fr.n} เคส</div>
              <div>{fr.avg}</div>
            </div>
            {fr.open && (
              <div style={{ padding: "12px 20px 16px", borderTop: "1px solid #F1F2F4", background: "#FAFBFC", fontSize: 12, color: "#5B6472" }}>
                ในจังหวัดนี้ เจ้าหน้าที่ตัดสินใจต่างจากที่ AI แนะนำ <strong>{fr.overrideRate}</strong> ของเคสทั้งหมด
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
