import React from 'react';
import { useSiteContext } from '../context/SiteContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  const { data } = useSiteContext();

  if (data.images.logo) {
    return <img src={data.images.logo} alt="Logo Azienda" className={`object-contain ${className}`} />;
  }

  // Default SVG Logo based on user description: Oval, Crate, Greens, Badge style
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Oval */}
      <ellipse cx="100" cy="100" rx="90" ry="70" stroke="var(--farm-green)" strokeWidth="4" fill="white"/>
      <ellipse cx="100" cy="100" rx="84" ry="64" stroke="var(--farm-green)" strokeWidth="1" />

      {/* Ribbon */}
      <path d="M10 100 L190 100 L180 130 L20 130 Z" fill="var(--farm-light-green)" />
      
      {/* Crate Icon */}
      <rect x="70" y="55" width="60" height="35" rx="2" stroke="var(--farm-brown)" strokeWidth="3" fill="var(--farm-beige)" />
      <line x1="70" y1="65" x2="130" y2="65" stroke="var(--farm-brown)" strokeWidth="2" />
      <line x1="70" y1="75" x2="130" y2="75" stroke="var(--farm-brown)" strokeWidth="2" />
      
      {/* Vegetables */}
      <circle cx="90" cy="45" r="8" fill="var(--farm-green)" />
      <circle cx="110" cy="48" r="7" fill="#e11d48" />
      <path d="M100 40 L100 55" stroke="var(--farm-green)" strokeWidth="2" />

      {/* Text Upper */}
      <text x="100" y="118" textAnchor="middle" fontFamily="serif" fontSize="16" fontWeight="bold" fill="var(--farm-green)" letterSpacing="1">
        AZIENDA AGRICOLA
      </text>
      
      {/* Text Lower */}
      <path id="curve" d="M 50 140 Q 100 160 150 140" fill="transparent" />
      <text width="200">
        <textPath href="#curve" startOffset="50%" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="var(--farm-green)">
          MATTEO CORONA
        </textPath>
      </text>
    </svg>
  );
};

export default Logo;