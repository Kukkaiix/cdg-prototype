function buildMinimalPdf(lines) {
  const esc = (s) => String(s).replace(/([()\\])/g, "\\$1");
  let content = "BT /F1 16 Tf 50 760 Td 20 TL\n";
  lines.forEach((l) => {
    content += `(${esc(l)}) Tj T*\n`;
  });
  content += "ET";
  const objs = [];
  objs.push("1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj");
  objs.push("2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj");
  objs.push(
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj"
  );
  objs.push("4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj");
  objs.push(`5 0 obj<</Length ${content.length}>>stream\n${content}\nendstream endobj`);
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o) => {
    offsets.push(pdf.length);
    pdf += o + "\n";
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += String(off).padStart(10, "0") + " 00000 n \n";
  });
  pdf += `trailer<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`;
  return pdf;
}

export function exportDecisionPdf({
  caseId,
  disposition,
  violationType,
  legalRef,
  checklist,
  note,
  evidenceItems,
}) {
  const checkedItems = Object.keys(checklist || {}).filter((k) => checklist[k]);
  const lines = [
    "LoadLock AI — Case Disposition",
    `Case Candidate: ${caseId}`,
    `Disposition: ${disposition || "(not selected)"}`,
    `Violation Type: ${violationType || "(not specified)"}`,
    `Legal Reference: ${legalRef || "(not specified)"}`,
    "",
    "Evidence attached:",
    ...(checkedItems.length ? checkedItems.map((c) => "- " + c) : ["(none checked)"]),
    "",
    "Evidence Explanation (AI Assessment factors):",
    ...evidenceItems.map((f) => `- ${f.label}: ${f.desc}`),
    "",
    `Officer Note: ${note || "(none)"}`,
    "",
    `Reviewed by: อ.วิชัย (Investigator)`,
    `Date: 31 กรกฎาคม 2569`,
    "",
    "Terminology per Mapping v4.1. Review Priority is not a probability of wrongdoing.",
  ];
  const pdf = buildMinimalPdf(lines);
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Case Disposition - ${caseId}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
