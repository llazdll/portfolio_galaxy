"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView} from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucidefrom = "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import CertificateCard from "./CertificateCard";
import { Certificate } from "@/types/certificate";

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [certifi
```

Wait, we need to be careful. Let's rewrite the entire file with the change.

We'll replace the grid className only.

Let's do:



<tool_call>
<function=Write>
<parameter=content>
"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import CertificateCard from "./CertificateCard";
import { Certificate } from "@/types/certificate";

const CERTS_PER_PAGE = 6;

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("/api/certificates");
        if (response.ok) {
          const data = await response.json();
          setCertificates(data.certificates);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const totalPages = Math.ceil(certificates.length / CERTS_PER_PAGE);
  const currentCerts = useMemo(() => {
    const start = (currentPage - 1) * CERTS_PER_PAGE;
    return certificates.slice(start, start + CERTS_PER_PAGE);
  }, [certificates, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <section id="certificates" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-8 h-8 border-2 border-[#6c63ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8888a0]">Loading certificates...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#6c63ff]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#00d4aa]/[0.03] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            <span className="text-gradient">Certificates</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mx-auto rounded-full mb-8" />
          <p className="text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
            A collection of certificates and credentials I&apos;ve earned through various
            online courses, programs, and certifications.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
        >
          {currentCerts.map((cert, i) => (
            <CertificateCard key={cert.name} certificate={cert} index={i} />
          ))}
        </motion.div>

        {/* Empty state */}
        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12"
          >
            <Award size={48} className="text-[#6c63ff]/50 mx-auto mb-4" />
            <p className="text-[#8888a0]">No certificates available at this time.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? "text-[#444] cursor-not-allowed"
                  : "text-[#888] hover:text-[#6c63ff] hover:bg-[#1e1e2e]"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-[#6c63ff] text-white"
                    : "text-[#888] hover:text-[#ededed] hover:bg-[#1e1e2e]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? "text-[#444] cursor-not-allowed"
                  : "text-[#888] hover:text-[#6c63ff] hover:bg-[#1e1e2e]"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}