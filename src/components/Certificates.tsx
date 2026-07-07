import React from 'react';
import CertificateCard from './CertificateCard';
import { Certificate } from '../types/certificate';

// Mock certificate data - in a real app, this would come from an API or generated data
const mockCertificates: Certificate[] = [
  {
    name: 'Analyzing Business Data in SQL',
    pdfPath: '/certificate/Analyzing Business Data in SQL.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/0092fdb8f9c14a64079f1f8c1fe51525768965ab',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Completed SQL course focusing on data analysis techniques'
  },
  {
    name: 'Analyzing Social Media Data in R',
    pdfPath: '/certificate/Analyzing Social Media Data in R.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/6835ba430af37769877999774b3430c90255754c',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Learned to analyze social media data using R programming language'
  },
  {
    name: 'Building Web Applications with Shiny in R',
    pdfPath: '/certificate/Building Web Applications with Shiny in R IntermediateSkill Level Updated- July 2022.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/7c986c7e918d4e3fdb996e837e0ac5300a85cddf',
    issuer: 'DataCamp',
    date: '2022',
    description: 'Built interactive web applications using Shiny framework in R'
  },
  {
    name: 'Deep Learning for Images with PyTorch',
    pdfPath: '/certificate/Deep Learning for Images with PyTorch.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/87e72ed53f414bab4185428552c8969b6964a72e',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Implemented deep learning models for image processing using PyTorch'
  },
  {
    name: 'Deep Learning IKIU',
    pdfPath: '/certificate/Deep Learning IKIU.pdf',
    verifyUrl: 'https://example.com/verify/ikiu-deep-learning', // Placeholder URL
    issuer: 'IKIU',
    date: '2022',
    description: 'Deep learning certification from IKIU'
  },
  {
    name: 'Deep Learning for Text with PyTorch',
    pdfPath: '/certificate/Deep Learning for Text with PyTorch.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/79f333ec981b8161542cf5ce4babfdc2a2a94df4',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Applied deep learning techniques to natural language processing using PyTorch'
  },
  {
    name: 'Deep Reinforcement Learning in Python',
    pdfPath: '/certificate/Deep Reinforcement Learning in Python.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/b5013f0393734684de0af8d278e06526c63d8863',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Implemented deep reinforcement learning algorithms in Python'
  },
  {
    name: 'Exploratory Data Analysis in SQL',
    pdfPath: '/certificate/Exploratory Data Analysis in SQL.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/b4a588c2bd120bb0d232cb7b18ae41eea792c238',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Learned exploratory data analysis techniques using SQL'
  },
  {
    name: 'Introduction to Financial Statements in Power BI',
    pdfPath: '/certificate/Introduction to Financial Statements in Power BI.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/f77947b977ae68e82c8dd84c64993aab34c045ec',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Learned to analyze financial statements using Power BI'
  },
  {
    name: 'Introduction to Python in Power BI',
    pdfPath: '/certificate/Introduction to Python in Power BI.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/0401df840972678e99e10cc9b87551754d6977e3',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Integrated Python with Power BI for enhanced data analysis'
  },
  {
    name: 'Recurrent Neural Networks (RNNs) for Language Modeling with Keras',
    pdfPath: '/certificate/Recurrent Neural Networks (RNNs) for Language Modeling with Keras.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/682c85e1698cb9df69a8b0f0292d2b2c706eb0fe',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Built RNN models for language modeling using Keras'
  },
  {
    name: 'SPSS',
    pdfPath: '/certificate/SPSS.pdf',
    verifyUrl: 'https://example.com/verify/spss', // Placeholder URL
    issuer: 'IBM',
    date: '2022',
    description: 'SPSS certification for statistical analysis'
  },
  {
    name: 'Time Series Analysis in Power BI',
    pdfPath: '/certificate/Time Series Analysis in Power BI.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/12d248d419998acc515df12aa6b5194ed6c4c5f1',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Analyzed time series data using Power BI'
  },
  {
    name: 'Time Series Analysis in Tableau',
    pdfPath: '/certificate/Time Series Analysis in Tableau.pdf',
    verifyUrl: 'https://example.com/verify/tableau-timeseries', // Placeholder URL
    issuer: 'Tableau',
    date: '2023',
    description: 'Performed time series analysis using Tableau'
  },
  {
    name: 'User-Oriented Design in Power BI',
    pdfPath: '/certificate/User-Oriented Design in Power BI.pdf',
    verifyUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/1017f0e6a774e1b3673507c5fe86caa3fa793cfa',
    issuer: 'DataCamp',
    date: '2023',
    description: 'Applied user-centered design principles in Power BI reports'
  }
];

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="max-w-7xl mx-auto px-6 space-y-6 ">
      <h2 className="text-2xl font-bold">Certifications & Licenses</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCertificates.map((cert) => (
          <CertificateCard key={cert.name} certificate={cert} />
        ))}
      </div>
    </section>
  );
};

export default Certificates;