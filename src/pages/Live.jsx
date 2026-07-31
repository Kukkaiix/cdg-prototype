function CameraFeed({ truckX, ts }) {
  return (
    <div
      style={{
        width: "100%",
        height: 120,
        borderRadius: 6,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#7C8896 0%,#8FA0AC 45%,#5C6670 45%,#5C6670 100%)",
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "52%", background: "#4A5158" }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 24,
          height: 3,
          background: "repeating-linear-gradient(90deg,#E8C245 0 14px,transparent 14px 26px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 20,
          right: 20,
          height: 10,
          background: "repeating-linear-gradient(90deg,#D3402B 0 10px,#fff 10px 20px)",
          borderRadius: 2,
        }}
      />
      <div style={{ position: "absolute", left: truckX, bottom: 26, width: 46 }}>
        <svg width="46" height="26" viewBox="0 0 46 26">
          <rect x="0" y="4" width="30" height="14" rx="2" fill="#1E4FD6" />
          <rect x="30" y="9" width="12" height="9" rx="1" fill="#B7C3E0" />
          <circle cx="9" cy="20" r="4" fill="#12151C" />
          <circle cx="34" cy="20" r="4" fill="#12151C" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 5 }}>
        <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#E5484D" }} />
        <span
          style={{
            fontSize: 10,
            color: "#fff",
            fontWeight: 600,
            letterSpacing: ".05em",
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
          }}
        >
          LIVE
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: 10,
          color: "#fff",
          fontFamily: "monospace",
          textShadow: "0 1px 2px rgba(0,0,0,.5)",
        }}
      >
        {ts}
      </div>
    </div>
  );
}

export default function Live({
  mapPan,
  mapZoom,
  mapDragStart,
  mapDragMove,
  mapDragEnd,
  bgRoads,
  mapRoads,
  mapStations,
  zoomIn,
  zoomOut,
  camSearch,
  onCamSearch,
  noCamerasFound,
  cameras,
  expandedCamera,
  closeExpand,
}) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div
          className="card"
          style={{ padding: 0, height: 520, position: "relative", overflow: "hidden", background: "#EEF1F5", cursor: "grab" }}
        >
          <div onMouseDown={mapDragStart} onMouseMove={mapDragMove} onMouseUp={mapDragEnd} onMouseLeave={mapDragEnd} style={{ width: "100%", height: "100%" }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 700 520"
              style={{
                display: "block",
                transform: `translate(${mapPan.x}px,${mapPan.y}px) scale(${mapZoom})`,
                transformOrigin: "center",
                transition: "transform .05s linear",
              }}
            >
              <rect x="-6000" y="-6000" width="18000" height="18000" fill="#EEF1F5" />
              {bgRoads.map((br, i) => (
                <line key={"bg1" + i} x1={br.x1} y1={br.y1} x2={br.x2} y2={br.y2} stroke="#E1E5EA" strokeWidth="9" strokeLinecap="round" />
              ))}
              {bgRoads.map((br, i) => (
                <line
                  key={"bg2" + i}
                  x1={br.x1}
                  y1={br.y1}
                  x2={br.x2}
                  y2={br.y2}
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />
              ))}
              {mapRoads.map((rd, i) => (
                <line key={"rd1" + i} x1={rd.x1} y1={rd.y1} x2={rd.x2} y2={rd.y2} stroke="#D3D9E0" strokeWidth="18" strokeLinecap="round" />
              ))}
              {mapRoads.map((rd, i) => (
                <line
                  key={"rd2" + i}
                  x1={rd.x1}
                  y1={rd.y1}
                  x2={rd.x2}
                  y2={rd.y2}
                  stroke="#fff"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  strokeLinecap="round"
                />
              ))}
              <text x="350" y="-60" fontSize="22" fontWeight="700" fill="#C4CBD4" fontFamily="'Space Grotesk',sans-serif">
                เครือข่ายด่านชั่งน้ำหนักทั่วประเทศ
              </text>
              {mapStations.map((ms, i) => (
                <g key={i}>
                  <circle className="map-ping" cx={ms.x} cy={ms.y} r="9" fill={ms.color} style={{ transformOrigin: `${ms.x}px ${ms.y}px` }} />
                  <circle cx={ms.x} cy={ms.y} r="9" fill={ms.color} />
                  <text x={ms.x} y={ms.y} dy="-16" fontSize="11" textAnchor="middle" fill="#3B4452" fontFamily="IBM Plex Sans Thai">
                    {ms.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "#fff",
              borderRadius: 8,
              padding: "10px 14px",
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
              fontSize: 12,
              pointerEvents: "none",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>ด่านที่ Active: {mapStations.length}</div>
            <div style={{ color: "#5B6472" }}>อัปเดตทุกวินาที · ลากเพื่อเลื่อนแผนที่</div>
          </div>
          <div style={{ position: "absolute", bottom: 16, right: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              onClick={zoomIn}
              style={{
                width: 32,
                height: 32,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              +
            </div>
            <div
              onClick={zoomOut}
              style={{
                width: 32,
                height: 32,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              −
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 520, overflowY: "auto" }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>กล้องสดหน้าด่าน (ทุกด่าน)</div>
          <input
            value={camSearch}
            onInput={onCamSearch}
            placeholder="ค้นหาด่าน/จังหวัด..."
            style={{
              border: "1px solid #E7E9EC",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12.5,
              fontFamily: "inherit",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          {noCamerasFound && (
            <div style={{ textAlign: "center", padding: 20, fontSize: 12.5, color: "#94A0B2" }}>ไม่พบด่านที่ค้นหา</div>
          )}
          {cameras.map((cam) => (
            <div key={cam.id} className="card" style={{ padding: 10 }}>
              <div style={{ position: "relative" }}>
                <CameraFeed truckX={cam.truckX} ts={cam.ts} />
                <div
                  onClick={cam.expand}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    background: "rgba(0,0,0,.5)",
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M15 3h6v6" />
                    <path d="M9 21H3v-6" />
                    <path d="M21 3l-7 7" />
                    <path d="M3 21l7-7" />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8 }}>{cam.name}</div>
            </div>
          ))}
        </div>
      </div>
      {expandedCamera && (
        <div
          onClick={closeExpand}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "min(900px,90vw)", background: "#fff", borderRadius: 10, overflow: "hidden" }}>
            <div
              style={{
                width: "100%",
                height: 440,
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(180deg,#7C8896 0%,#8FA0AC 45%,#5C6670 45%,#5C6670 100%)",
              }}
            >
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "52%", background: "#4A5158" }} />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 70,
                  height: 6,
                  background: "repeating-linear-gradient(90deg,#E8C245 0 24px,transparent 24px 44px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 60,
                  right: 60,
                  height: 20,
                  background: "repeating-linear-gradient(90deg,#D3402B 0 20px,#fff 20px 40px)",
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: expandedCamera.truckX,
                  bottom: 80,
                  width: 110,
                  transform: "scale(2.2)",
                  transformOrigin: "left bottom",
                }}
              >
                <svg width="46" height="26" viewBox="0 0 46 26">
                  <rect x="0" y="4" width="30" height="14" rx="2" fill="#1E4FD6" />
                  <rect x="30" y="9" width="12" height="9" rx="1" fill="#B7C3E0" />
                  <circle cx="9" cy="20" r="4" fill="#12151C" />
                  <circle cx="34" cy="20" r="4" fill="#12151C" />
                </svg>
              </div>
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <span className="live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#E5484D" }} />
                <span
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: 600,
                    letterSpacing: ".05em",
                    textShadow: "0 1px 2px rgba(0,0,0,.5)",
                  }}
                >
                  LIVE — {expandedCamera.name}
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 16,
                  fontSize: 13,
                  color: "#fff",
                  fontFamily: "monospace",
                  textShadow: "0 1px 2px rgba(0,0,0,.5)",
                }}
              >
                {expandedCamera.ts}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
