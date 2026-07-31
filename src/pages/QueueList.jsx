export default function QueueList({
  queueFilters,
  hasActiveFilters,
  clearFilters,
  hasSelection,
  selectionCount,
  bulkOfficers,
  filteredQueueCases,
  noFilteredCases,
}) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>Average Response Time</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700 }}>4m 12s</div>
        </div>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>Cases Waiting &gt;30 min</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: "#B5301E" }}>6</div>
        </div>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#5B6472", marginBottom: 6 }}>Over SLA</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: "#B5301E" }}>2</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, position: "relative" }}>
        {queueFilters.map((f, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div
              onClick={f.toggle}
              style={{
                background: f.bg,
                color: f.fg,
                border: "1px solid #E7E9EC",
                borderRadius: 20,
                padding: "7px 16px",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {f.label}
              <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
            </div>
            {f.open && (
              <div
                className="card dropdown-anim"
                style={{ position: "absolute", top: 36, left: 0, width: 200, zIndex: 10, padding: 6, overflow: "hidden", maxHeight: 280, overflowY: "auto" }}
              >
                {f.options.map((op, j) => (
                  <div
                    key={j}
                    className="row"
                    onClick={op.select}
                    style={{
                      padding: "8px 10px",
                      fontSize: 12.5,
                      cursor: "pointer",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{op.label}</span>
                    {op.active && <span style={{ color: "#1E4FD6" }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {hasActiveFilters && (
          <div onClick={clearFilters} style={{ color: "#B5301E", fontSize: 12.5, fontWeight: 500, cursor: "pointer", alignSelf: "center" }}>
            ล้างตัวกรอง ✕
          </div>
        )}
      </div>

      {hasSelection && (
        <div
          className="card"
          style={{
            padding: "10px 16px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#EFF3FF",
            borderColor: "#C7D6F9",
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>เลือกแล้ว {selectionCount} เคส</span>
          <span style={{ fontSize: 12, color: "#5B6472" }}>มอบหมายให้:</span>
          {bulkOfficers.map((bo, i) => (
            <div
              key={i}
              onClick={bo.select}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: "5px 10px",
                background: "#fff",
                border: "1px solid #E7E9EC",
                borderRadius: 6,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {bo.label}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#EFF3FF",
          color: "#1E4FD6",
          borderRadius: 16,
          padding: "6px 12px",
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        <span>👆</span>
        <span>คลิกแถวเพื่อเปิดดูรายละเอียดเคส</span>
      </div>

      <div className="card" style={{ overflow: "visible" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "30px 90px 1fr 110px 90px 130px 100px 20px",
            gap: 8,
            padding: "10px 20px",
            fontSize: 11,
            fontWeight: 600,
            color: "#94A0B2",
            letterSpacing: ".05em",
            whiteSpace: "nowrap",
          }}
        >
          <div></div>
          <div>ID</div>
          <div>สถานี</div>
          <div>PRIORITY</div>
          <div>SLA</div>
          <div>STATUS</div>
          <div>ผู้รับผิดชอบ</div>
          <div></div>
        </div>
        {filteredQueueCases.map((c) => (
          <div
            key={c.id}
            className="row"
            onClick={c.open}
            style={{
              display: "grid",
              gridTemplateColumns: "30px 90px 1fr 110px 90px 130px 100px 20px",
              gap: 8,
              padding: "14px 20px",
              fontSize: 12.5,
              borderTop: "1px solid #F1F2F4",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <input type="checkbox" checked={c.checked} onClick={c.toggleCheck} onChange={() => {}} style={{ cursor: "pointer" }} />
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#5B6472", fontSize: 12 }}>{c.id}</div>
            <div style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.station}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: c.priorityRadius, background: c.priorityColor }} />
              <span style={{ fontWeight: 600, color: c.priorityColor }}>{c.priority}</span>
            </div>
            <div style={{ fontFamily: "monospace", color: c.slaColor, fontWeight: 600 }}>{c.sla}</div>
            <div style={{ color: "#5B6472" }}>{c.status}</div>
            <div onClick={c.openAssign} style={{ color: "#1E4FD6", fontWeight: 500, cursor: "pointer" }}>
              {c.owner} ▾
            </div>
            <div style={{ color: "#C4CAD4", fontSize: 15, textAlign: "right" }}>›</div>
            {c.assignOpen && (
              <div
                className="card dropdown-anim"
                style={{ position: "absolute", top: 44, right: 20, width: 180, zIndex: 15, padding: 6, overflow: "hidden" }}
              >
                {c.officerOptions.map((of, j) => (
                  <div key={j} className="row" onClick={of.select} style={{ padding: "8px 10px", fontSize: 12.5, cursor: "pointer", borderRadius: 6 }}>
                    {of.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {noFilteredCases && (
          <div style={{ padding: "32px 20px", textAlign: "center", fontSize: 12.5, color: "#94A0B2" }}>ไม่มีเคสตรงกับตัวกรองที่เลือก</div>
        )}
      </div>
    </>
  );
}
