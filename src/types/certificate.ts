export type Certificate = {
  name: string;
  pdfPath: string;
  verifyUrl: string;
  issuer?: string;
  date?: string;
  description?: string;
};