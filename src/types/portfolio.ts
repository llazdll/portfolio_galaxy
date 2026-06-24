export type PortfolioProject = {
  title: string;
  description: string;
  category: string;
  stack: string[];
  technologies: string[];
  features: string[];
  role?: string;
  year?: string | number;
  status?: string;
  featured?: boolean;
  slug?: string;
  image?: string;
  demo?: string;
  github: string;
  stars?: number;
};
