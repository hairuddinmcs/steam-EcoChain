"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmissionTrendPoint } from "@/lib/mock-data";

/**
 * Unduh CSV berjalan sepenuhnya di browser (Blob API) — fungsional nyata
 * di prototipe ini, bukan tombol statis. Format CSV dipilih (bukan PDF)
 * karena ini yang paling mudah dibuka admin di Excel, sesuai kebiasaan
 * kerja mereka saat ini (observasi: "dipindah ke Excel pada sore hari").
 */
export function DownloadReportButton({ data, month }: { data: EmissionTrendPoint[]; month: string }) {
  function handleDownload() {
    const header = "Tanggal,Total CO2e (kg),Jarak (km)\n";
    const rows = data.map((d) => `${d.date},${d.totalCO2eKg},${d.distanceKm}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-emisi-${month.toLowerCase().replace(/\s+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outline" size="md" onClick={handleDownload}>
      <Download className="h-4 w-4" strokeWidth={2} />
      Unduh laporan (CSV)
    </Button>
  );
}
