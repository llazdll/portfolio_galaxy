import React from 'react';
import { Certificate } from '../types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
  index?: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, index = 0 }) => {
  const delay = index * 100;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* PDF Preview Area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
        {/* Document Icon Preview */}
        <div className="relative w-32 h-40 bg-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
          {/* Document top fold */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-blue-600 to-blue-700 rounded-t-lg" />
          {/* Document content lines */}
          <div className="relative z-10 space-y-2 w-full">
            <div className="h-2 bg-gray-300 dark:bg-gray-500 rounded w-3/4" />
            <div className="h-2 bg-gray-300 dark:bg-gray-500 rounded w-1/2" />
            <div className="h-2 bg-gray-300 dark:bg-gray-500 rounded w-5/6" />
            <div className="h-2 bg-gray-300 dark:bg-gray-500 rounded w-2/3" />
          </div>
          {/* Certificate seal/icon */}
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium px-4 py-2 bg-blue-600 rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Certificate
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Issuer Badge */}
        {certificate.issuer && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-3">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {certificate.issuer}
          </span>
        )}

        {/* Certificate Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {certificate.name}
        </h3>

        {/* Date */}
        {certificate.date && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {certificate.date}
          </p>
        )}

        {/* Description */}
        {certificate.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {certificate.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {/* View Certificate Button */}
          {certificate.pdfPath && (
            <a
              href={certificate.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View PDF
            </a>
          )}

          {/* Verify Certificate Button */}
          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify
            </a>
          )}
        </div>
      </div>

      {/* Decorative accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export default CertificateCard;