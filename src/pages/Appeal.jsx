export default function Appeal({
  isAppealList,
  isAppealDetail,
  appealCases,
  backToAppealList,
  appealSteps,
  showStep1,
  showStep2,
  showStep3plus,
  currentAppealCase,
  reviewerName,
  showRulingPanel,
  rulingOptions,
  appealDone,
  appealRuling,
  showPreRulingAdvance,
  advanceAppeal,
  canConfirmRuling,
  confirmRuling,
}) {
  return (
    <>
      {isAppealList && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 130px 1fr 90px",
              gap: 10,
              padding: "10px 20px",
              fontSize: 11,
              fontWeight: 600,
              color: "#94A0B2",
              letterSpacing: ".05em",
            }}
          >
            <div>ID</div>
            <div>สถานี</div>
            <div>ผู้ตัดสินเดิม</div>
            <div>เหตุผลอุทธรณ์</div>
            <div>ยื่นเมื่อ</div>
          </div>
          {appealCases.map((ac) => (
            <div
              key={ac.id}
              className="row"
              onClick={ac.open}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 130px 1fr 90px",
                gap: 10,
                padding: "14px 20px",
                fontSize: 12.5,
                borderTop: "1px solid #F1F2F4",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#5B6472" }}>{ac.id}</div>
              <div style={{ fontWeight: 500 }}>{ac.station}</div>
              <div>
                {ac.originalOfficer} — {ac.disposition}
              </div>
              <div style={{ color: "#5B6472", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ac.reason}</div>
              <div style={{ color: "#94A0B2" }}>{ac.filedAt}</div>
            </div>
          ))}
        </div>
      )}
      {isAppealDetail && (
        <>
          <a onClick={backToAppealList} style={{ fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-block", marginBottom: 14 }}>
            ← กลับไปรายการอุทธรณ์
          </a>
          <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
            {appealSteps.map((ap, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: ap.bg,
                    color: ap.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12.5,
                    fontWeight: 600,
                    margin: "0 auto 8px",
                    transition: "background .3s ease, color .3s ease",
                  }}
                >
                  {ap.n}
                </div>
                <div style={{ fontSize: 11.5, color: "#5B6472" }}>{ap.label}</div>
              </div>
            ))}
          </div>
          {showStep1 && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>คำร้องอุทธรณ์</div>
              <div style={{ fontSize: 12.5, color: "#5B6472", marginBottom: 6 }}>
                คำตัดสินเดิม: <strong style={{ color: "#12151C" }}>{currentAppealCase.disposition}</strong> โดย {currentAppealCase.originalOfficer}
              </div>
              <div style={{ fontSize: 12.5, color: "#5B6472" }}>เหตุผลที่ขออุทธรณ์: {currentAppealCase.reason}</div>
            </div>
          )}
          {showStep2 && (
            <div className="card" style={{ padding: 20, borderLeft: "3px solid #9A6400", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
                มอบหมายผู้ทบทวน — Segregation of Duties
              </div>
              <div style={{ fontSize: 12.5, color: "#3B4452" }}>
                ผู้ตัดสินเดิม: <strong>{currentAppealCase.originalOfficer}</strong> · ผู้ทบทวนที่ได้รับมอบหมาย: <strong>{reviewerName}</strong> ✓
                คนละคนกัน ระบบอนุญาตให้ทบทวนได้
              </div>
            </div>
          )}
          {showStep3plus && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>
                ทบทวนหลักฐาน — Evidence Package เดิม
              </div>
              <div style={{ fontSize: 12.5, color: "#5B6472", marginBottom: 6 }}>
                คำตัดสินเดิม: <strong style={{ color: "#12151C" }}>{currentAppealCase.disposition}</strong>
              </div>
              <div style={{ fontSize: 12.5, color: "#5B6472" }}>เหตุผลอุทธรณ์: {currentAppealCase.reason}</div>
            </div>
          )}
          {showRulingPanel && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>คำวินิจฉัยของผู้ทบทวน</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {rulingOptions.map((ro) => (
                  <div
                    key={ro.key}
                    onClick={ro.select}
                    style={{
                      border: `1px solid ${ro.active ? "#1E4FD6" : "#E7E9EC"}`,
                      background: ro.active ? "#1E4FD6" : "#fff",
                      color: ro.active ? "#fff" : "#12151C",
                      borderRadius: 20,
                      padding: "8px 16px",
                      fontSize: 12.5,
                      fontWeight: 500,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ro.label}
                  </div>
                ))}
              </div>
            </div>
          )}
          {appealDone && (
            <div className="card" style={{ padding: "16px 20px", background: "#E4F3E7", borderColor: "#BFE3C8", fontSize: 13, color: "#1E7A3C", fontWeight: 600 }}>
              ✓ ปิดเรื่องอุทธรณ์แล้ว — {appealRuling === "uphold" ? "ยืนตามคำตัดสินเดิม" : "กลับคำตัดสิน — False Alarm"}
            </div>
          )}
          {showPreRulingAdvance && (
            <div
              className="btn"
              onClick={advanceAppeal}
              style={{ display: "inline-block", background: "#1E4FD6", color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: 7, cursor: "pointer" }}
            >
              ดำเนินการขั้นต่อไป →
            </div>
          )}
          {canConfirmRuling && (
            <div
              className="btn"
              onClick={confirmRuling}
              style={{ display: "inline-block", background: "#1E4FD6", color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: 7, cursor: "pointer" }}
            >
              ยืนยันคำวินิจฉัย + ปิดเรื่อง →
            </div>
          )}
        </>
      )}
    </>
  );
}
