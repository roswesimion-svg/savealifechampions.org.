import { QRCodeSVG } from "qrcode.react";

export default function QrDonateCard({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white p-4">
      <QRCodeSVG value={url} size={96} bgColor="#ffffff" fgColor="#070B14" />
      <div>
        <p className="text-sm font-semibold text-ink">Scan to Become a Champion</p>
        <p className="text-xs text-ink/60">or visit {new URL(url).host}</p>
      </div>
    </div>
  );
}
