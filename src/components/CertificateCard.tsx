"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ShieldCheck } from "lucide-react";
import { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache for preloaded PDF previews (to avoid reloading same PDF multiple times)
  const previewCache = new Map<string, string>();

  // Load PDF and render first page as a data URL using pdf.js from CDN
  const loadPdfPreview = async (pdfPath: string) => {
    // Check cache first
    if (previewCache.has(pdfPath)) {
      setPreviewUrl(previewCache.get(pdfPath) as string);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use a specific version of pdf.js from cdnjs
      const pdfjsVersion = "4.10.38";
      const { default: pdfjs } = await import(
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.esm.js`
      );

      // Set the worker source
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

      const loadingTask = pdfjs.getDocument(pdfPath);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 }); // Scale for better quality
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not get canvas context");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      await page.render(renderContext).promise;
      const dataUrl = canvas.toDataURL("image/png");
      previewCache.set(pdfPath, dataUrl);
      setPreviewUrl(dataUrl);
      setLoading(false);
    } catch (err) {
      console.error("Error loading PDF preview:", err);
      setError("Failed to load preview");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#6c63ff]/30 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      onMouseEnter={loadPdfPreview}
      onMouseLeave={() => {
        setPreviewUrl(null);
        setLoading(false);
        setError(null);
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6c63ff]/5 to-[#00d4aa]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Certificate Preview/Image */}
      <div className="relative h-40 bg-gradient-to-br from-[#0a0a0f] to-[#12121a] overflow-hidden">
        {/* Preview image or loading state or error state */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`${certificate.name} preview`}
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#6c63ff] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-[#8888a0] text-sm">
            {error}
          </div>
        ) : (
          {/* Default SVG icon (document) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-20 rounded-lg bg-[#6c63ff]/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-8 h-10 text-[#6c63ff]"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#00d4aa]" />
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#6c63ff]" />
      </div>

      <div className="p-5 flex flex-col flex-1 relative z-10">
        {/* Title */}
        <h3 className="text-lg font-semibold text-[#ededed] group-hover:text-[#6c63ff] transition-colors mb-2 line-clamp-2">
          {certificate.name}
        </h3>

        {/* Issuer and Date */}
        {(certificate.issuer || certificate.date) && (
          <div className="flex items-center gap-2 text-xs text-[#8888a0] mb-3">
            {certificate.issuer && <span>{certificate.issuer}</span>}
            {certificate.issuer && certificate.date && (
              <span className="text-[#2a2a3e]">·</span>
            )}
            {certificate.date && <span>{certificate.date}</span>}
          </div>
        )}

        {/* Description */}
        {certificate.description && (
          <p className="text-sm text-[#8888a0] mb-4 line-clamp-2 flex-1">
            {certificate.description}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <a
            href={certificate.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1e1e2e] text-[#ededed] hover:bg-[#6c63ff]/20 hover:text-[#6c63ff] transition-colors border border-[#2a2a3e] hover:border-[#6c63ff]/30"
          >
            <Eye size={12} />
            View Certificate
          </a>
          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#6c63ff]/10 text-[#6c63ff] hover:bg-[#6c63ff]/20 transition-colors border border-[#6c63ff]/30"
            >
              <ShieldCheck size={12} />
              Verify / Credential Link
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}