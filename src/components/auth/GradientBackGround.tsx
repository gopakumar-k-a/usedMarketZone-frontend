import React, { ReactNode } from 'react';
import './GradientBackground.css';

interface GradientBackgroundProps {
  children: ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <div className="gradient-background d-flex flex-column justify-content-center align-items-center">
      {children}
    </div>
  );
};

export default GradientBackground;
