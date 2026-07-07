# Certificates Section

This document explains how the Certificates section works and how to add new certificates.

## How It Works

The Certificates section automatically displays all PDF files from `public/certificate/` directory and matches them with verification URLs from `public/links.json`.

## Adding a New Certificate

To add a new certificate:

1. **Add the PDF file** to `public/certificate/` directory
   - Name it appropriately (e.g., `Certificate Name.pdf`)

2. **Add the verification URL** to `public/links.json`
   - Use the certificate name (without .pdf extension) as the key
   - Example: `"Certificate Name": "https://verification-url.com"`

3. **Rebuild the project** (or restart the dev server)
   - The certificates will be automatically loaded

## Files Structure

```
public/
├── certificate/
│   ├── Certificate 1.pdf
│   ├── Certificate 2.pdf
│   └── ...
├── links.json          # Verification URLs
└── ...

src/
├── components/
│   ├── Certificates.tsx    # Main section component
│   └── CertificateCard.tsx # Individual card component
├── app/
│   └── api/
│       └── certificates/
│           └── route.ts    # API endpoint
└── types/
    └── certificate.ts      # TypeScript types
```

## Features

- **Modern Card Design**: Each certificate has a clean, professional card layout
- **PDF Preview**: Shows a document icon preview for each certificate
- **View Certificate**: Opens the PDF in a new tab
- **Verify Link**: Links to the verification URL (if available)
- **Pagination**: Automatically paginates certificates (6 per page)
- **Responsive**: Works on mobile, tablet, and desktop
- **Animations**: Fade-in and hover animations

## API Endpoint

`GET /api/certificates` returns:

```json
{
  "certificates": [
    {
      "name": "Certificate Name",
      "pdfPath": "/certificate/Certificate Name.pdf",
      "verifyUrl": "https://...",
      "issuer": "DataCamp",
      "date": "2024"
    }
  ]
}
```