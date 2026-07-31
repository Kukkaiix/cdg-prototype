function InvestigationTab({ timeline, factors }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: "18px 20px", maxHeight: 340, overflow: "auto" }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>Timeline</div>
          {timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: t.radius, background: t.color, marginTop: 4, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: "#94A0B2" }}>{t.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 12, paddingLeft: 6 }}>
            Evidence — WIM ณ 07:42:11
          </div>
          <div style={{ width: "100%", height: 220, borderRadius: 6, background: "#12151C", position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(115deg, rgba(255,255,255,.03) 0 2px, transparent 2px 6px)",
              }}
            />
            <div style={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "center", gap: 5 }}>
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#E5484D" }} />
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 600, letterSpacing: ".05em" }}>REC 07:42:11</span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                right: 10,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: "#8892A0",
                fontFamily: "monospace",
              }}
            >
              <span>WIM sensor: 18.4t (เพลา 2)</span>
              <span>ด่านสระบุรี ขาเข้า</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8A5CD6" }} />
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600 }}>Evidence Explanation</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {factors.map((fa, i) => (
            <div key={i} style={{ border: "1px solid #EEF0F2", borderRadius: 8, padding: 12, cursor: "pointer" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>{fa.label}</div>
              <div style={{ fontSize: 11.5, color: "#5B6472", marginBottom: 6 }}>{fa.desc}</div>
              <div style={{ fontSize: 11, color: "#1E4FD6", fontWeight: 600 }}>ดูหลักฐาน →</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#94A0B2", fontStyle: "italic", marginTop: 10 }}>ค่านี้ไม่ใช่ความน่าจะเป็นของการกระทำผิด</div>
      </div>
      <div className="card" style={{ padding: "18px 20px", display: "flex", gap: 20, alignItems: "center" }}>
        <div
          style={{
            width: 120,
            height: 80,
            flexShrink: 0,
            borderRadius: 6,
            background: "#E7E9EC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A0B2" strokeWidth="1.6">
            <rect x="2" y="9" width="20" height="8" rx="1.5" />
            <circle cx="7" cy="18" r="1.8" />
            <circle cx="17" cy="18" r="1.8" />
            <path d="M4 9l2-4h10l3 4" />
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, flex: 1 }}>
          <div>
            <div style={{ fontSize: 11, color: "#94A0B2" }}>ทะเบียน</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>80-4471 สระบุรี</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#94A0B2" }}>เจ้าของ (masked)</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>บ.ขนส่ง ●●● จำกัด</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#94A0B2" }}>ประวัติการผ่านด่าน</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>37 ครั้ง / 90 วัน</div>
          </div>
        </div>
      </div>
    </>
  );
}

function NetworkTab({ networkFacts, networkInferences }) {
  return (
    <>
      <div
        style={{
          background: "#FEF6E4",
          border: "1px solid #F3D99B",
          borderRadius: 8,
          padding: "12px 16px",
          fontSize: 12.5,
          color: "#7A5A00",
          marginBottom: 16,
        }}
      >
        ⚠ หน้านี้แยกให้เห็นชัดว่าอะไรคือ "ข้อเท็จจริง" และอะไรคือ "ข้อสันนิษฐานของระบบ" — ห้ามใช้ข้อสันนิษฐานเป็นข้อสรุปการตัดสินใจ
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>
        ■ ข้อเท็จจริง (Fact) — ตรวจสอบตรงได้ ไม่มีคะแนน
      </div>
      <div style={{ fontSize: 12, color: "#94A0B2", marginBottom: 10 }}>สิ่งที่ระบบบันทึกไว้ตรงๆ ไม่ผ่านการตีความ</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {networkFacts.map((f, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#1E4FD6", flexShrink: 0 }} />
            <div style={{ fontSize: 13 }}>{f}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>
        ◇ ข้อสันนิษฐาน (Inference) — มีคะแนนกำกับ ต้องตรวจสอบเพิ่ม
      </div>
      <div style={{ fontSize: 12, color: "#94A0B2", marginBottom: 10 }}>ระบบเชื่อมโยงรูปแบบเหล่านี้เข้าด้วยกัน — ยังไม่ใช่ข้อสรุป</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {networkInferences.map((inf, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8A5CD6", flexShrink: 0 }} />
              <div style={{ fontSize: 13 }}>{inf.label}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#8A5CD6", whiteSpace: "nowrap" }}>{inf.score}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#94A0B2", fontStyle: "italic" }}>ค่าคะแนนนี้ไม่ใช่ความน่าจะเป็นของการกระทำผิด</div>
    </>
  );
}

function DecisionTab({
  selectedCaseId,
  dispositions,
  violationTypes,
  legalRef,
  onLegalRef,
  evidenceChecklistItems,
  officerNote,
  onOfficerNote,
  confirmDecision,
  decisionConfirmed,
  goTabInvestigation,
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>Evidence Package (สรุป)</div>
        <div style={{ fontSize: 12.5, color: "#5B6472", marginBottom: 10 }}>
          Review Priority: <span style={{ color: "#B5301E", fontWeight: 600 }}>Critical</span> — SLA Remaining:{" "}
          <span style={{ fontFamily: "monospace", fontWeight: 600 }}>05:12</span>
        </div>
        <a onClick={goTabInvestigation} style={{ fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          ← ดูรายละเอียดที่แท็บ Investigation
        </a>
      </div>
      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>Structured Disposition</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {dispositions.map((d, i) => (
            <div
              key={i}
              onClick={d.select}
              style={{
                border: `1px solid ${d.border}`,
                background: d.bg,
                color: d.fg,
                borderRadius: 20,
                padding: "7px 14px",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {d.label}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>ประเภทความผิด</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {violationTypes.map((vt, i) => (
            <div
              key={i}
              onClick={vt.select}
              style={{
                border: `1px solid ${vt.border}`,
                background: vt.bg,
                color: vt.fg,
                borderRadius: 20,
                padding: "7px 14px",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {vt.label}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>กฎหมายอ้างอิง</div>
        <input
          value={legalRef}
          onChange={onLegalRef}
          placeholder="เช่น พ.ร.บ.ทางหลวง มาตรา 61"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #E7E9EC",
            borderRadius: 6,
            padding: "9px 10px",
            fontSize: 12.5,
            fontFamily: "inherit",
            marginBottom: 14,
          }}
        />
        <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>Checklist หลักฐานที่แนบ</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {evidenceChecklistItems.map((ei, i) => (
            <div key={i} onClick={ei.toggle} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={ei.checked} onChange={ei.toggle} style={{ cursor: "pointer" }} />
              <span style={{ fontSize: 12.5 }}>{ei.label}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>หมายเหตุเจ้าหน้าที่</div>
        <textarea
          value={officerNote}
          onChange={onOfficerNote}
          placeholder="พิมพ์หมายเหตุ..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #E7E9EC",
            borderRadius: 6,
            padding: 10,
            fontSize: 12.5,
            minHeight: 56,
            marginBottom: 14,
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        <div
          className="btn"
          onClick={confirmDecision}
          style={{ background: "#1E4FD6", color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 600, padding: 11, borderRadius: 7, cursor: "pointer" }}
        >
          ยืนยัน + สร้าง PDF Export
        </div>
        {decisionConfirmed && (
          <div style={{ marginTop: 10, fontSize: 12, color: "#1E7A3C", fontWeight: 500 }}>
            ✓ บันทึกแล้ว — Case Disposition #{selectedCaseId}.pdf พร้อมดาวน์โหลด
          </div>
        )}
      </div>
    </div>
  );
}

function IntegrityTab({ auditLog }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Integrity (Security)</div>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 14 }}>การพิสูจน์ว่าข้อมูลไม่ถูกแก้ไขหลังบันทึก (blockchain hash chain)</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, color: "#1E7A3C" }}>99.98%</div>
          <div style={{ fontSize: 12, color: "#94A0B2" }}>รายการยืนยัน hash สำเร็จ</div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Data Quality (Infrastructure)</div>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 14 }}>คุณภาพสัญญาณจากอุปกรณ์ก่อนเข้าสู่การวิเคราะห์</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, color: "#9A6400" }}>96.4%</div>
          <div style={{ fontSize: 12, color: "#94A0B2" }}>อุปกรณ์ผ่านเกณฑ์คุณภาพ</div>
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEF0F2", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>
          Audit Log — ผู้เปิดดูข้อมูลส่วนบุคคลของเคสนี้
        </div>
        {auditLog.map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #F1F2F4", fontSize: 12.5 }}>
            <span>
              {a.who} เปิดดู {a.what}
            </span>
            <span style={{ color: "#94A0B2" }}>{a.when}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function QueueDetail(props) {
  const {
    selectedCaseId,
    toggleCaseSwitcher,
    showCaseSwitcher,
    cases,
    liveSlaRemaining,
    caseTabs,
    isTabInvestigation,
    isTabNetwork,
    isTabDecision,
    isTabIntegrity,
  } = props;

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap", position: "relative" }}>
        <div onClick={toggleCaseSwitcher} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", minWidth: 0, flexShrink: 1 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, whiteSpace: "nowrap" }}>
            Case Candidate #{selectedCaseId}
          </div>
          <span style={{ fontSize: 11, color: "#94A0B2", flexShrink: 0 }}>▾</span>
        </div>
        {showCaseSwitcher && (
          <div className="card dropdown-anim" style={{ position: "absolute", top: 28, left: 0, width: 280, zIndex: 10, padding: 6, overflow: "hidden" }}>
            {cases.map((c) => (
              <div
                key={c.id}
                className="row"
                onClick={c.select}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", fontSize: 12.5, cursor: "pointer", borderRadius: 6 }}
              >
                <span style={{ width: 7, height: 7, borderRadius: c.priorityRadius, background: c.priorityColor, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#5B6472" }}>{c.id}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.station}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 11.5, color: "#5B6472" }}>SLA Remaining</span>
          <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#B5301E", fontSize: 13 }}>{liveSlaRemaining}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#B5301E" }} />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#B5301E" }}>Review Priority: Critical</span>
      </div>

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #E7E9EC", marginBottom: 20 }}>
        {caseTabs.map((tb, i) => (
          <div
            key={i}
            className="tab"
            onClick={tb.onClick}
            style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: tb.color, borderBottom: `2px solid ${tb.border}`, whiteSpace: "nowrap" }}
          >
            {tb.label}
          </div>
        ))}
      </div>

      {isTabInvestigation && <InvestigationTab timeline={props.timeline} factors={props.factors} />}
      {isTabNetwork && <NetworkTab networkFacts={props.networkFacts} networkInferences={props.networkInferences} />}
      {isTabDecision && (
        <DecisionTab
          selectedCaseId={selectedCaseId}
          dispositions={props.dispositions}
          violationTypes={props.violationTypes}
          legalRef={props.legalRef}
          onLegalRef={props.onLegalRef}
          evidenceChecklistItems={props.evidenceChecklistItems}
          officerNote={props.officerNote}
          onOfficerNote={props.onOfficerNote}
          confirmDecision={props.confirmDecision}
          decisionConfirmed={props.decisionConfirmed}
          goTabInvestigation={props.goTabInvestigation}
        />
      )}
      {isTabIntegrity && <IntegrityTab auditLog={props.auditLog} />}
    </>
  );
}
