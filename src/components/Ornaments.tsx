import React from 'react';

interface OrnamentProps {
  variant?: 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br' | 'frame-top' | 'frame-bottom' | 'flourish' | 'divider';
  color?: string;
  size?: number;
  className?: string;
}

export const Ornament: React.FC<OrnamentProps> = ({
  variant = 'divider',
  color = '#2E7D32',
  size = 60,
  className = '',
}) => {
  switch (variant) {
    case 'corner-tl':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 58V30C2 14.536 14.536 2 30 2h28"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.45"
          />
          <path
            d="M8 58V34C8 19.088 19.088 8 34 8h24"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.3"
          />
          <circle cx="2" cy="58" r="2.2" fill={color} opacity="0.5" />
          <circle cx="58" cy="2" r="2.2" fill={color} opacity="0.5" />
        </svg>
      );

    case 'corner-tr':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58 58V30C58 14.536 45.464 2 30 2H2"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.45"
          />
          <path
            d="M52 58V34C52 19.088 40.912 8 26 8H2"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.3"
          />
          <circle cx="58" cy="58" r="2.2" fill={color} opacity="0.5" />
          <circle cx="2" cy="2" r="2.2" fill={color} opacity="0.5" />
        </svg>
      );

    case 'corner-bl':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2V30C2 45.464 14.536 58 30 58h28"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.45"
          />
          <path
            d="M8 2V26C8 40.912 19.088 52 34 52h24"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.3"
          />
          <circle cx="2" cy="2" r="2.2" fill={color} opacity="0.5" />
          <circle cx="58" cy="58" r="2.2" fill={color} opacity="0.5" />
        </svg>
      );

    case 'corner-br':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58 2V30C58 45.464 45.464 58 30 58H2"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.45"
          />
          <path
            d="M52 2V26C52 40.912 40.912 52 26 52H2"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.3"
          />
          <circle cx="58" cy="2" r="2.2" fill={color} opacity="0.5" />
          <circle cx="2" cy="58" r="2.2" fill={color} opacity="0.5" />
        </svg>
      );

    case 'flourish':
      return (
        <svg
          width={size * 2}
          height={size / 2}
          viewBox="0 0 120 30"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 28C60 28 35 20 35 10C35 4 40 2 45 5C50 8 55 18 60 28ZM60 28C60 28 85 20 85 10C85 4 80 2 75 5C70 8 65 18 60 28Z"
            stroke={color}
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          <circle cx="60" cy="18" r="2.5" fill={color} opacity="0.7" />
          <circle cx="60" cy="8" r="1.5" fill={color} opacity="0.5" />
        </svg>
      );

    case 'divider':
    default:
      return (
        <div className={`flex items-center justify-center py-4 ${className}`}>
          <svg width={size * 2.5} height="20" viewBox="0 0 180 20" fill="none">
            <line x1="0" y1="10" x2="70" y2="10" stroke={color} strokeWidth="0.6" opacity="0.35" />
            <circle cx="90" cy="10" r="3.5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="90" cy="10" r="1.5" fill={color} opacity="0.6" />
            <circle cx="82" cy="10" r="1" fill={color} opacity="0.4" />
            <circle cx="98" cy="10" r="1" fill={color} opacity="0.4" />
            <line x1="110" y1="10" x2="180" y2="10" stroke={color} strokeWidth="0.6" opacity="0.35" />
          </svg>
        </div>
      );
  }
};

export const LeavesOrnament: React.FC<{ color?: string; size?: number; opacity?: number; className?: string }> = ({
  color = '#2E7D32',
  size = 60,
  opacity = 0.4,
  className = '',
}) => {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" fill="none" className={className} opacity={opacity}>
      <path d="M40 44C40 30 40 16 40 4" stroke={color} strokeWidth="0.8" />
      <path
        d="M40 12C34 8 26 6 22 10C18 14 24 18 30 16C24 20 20 28 24 32C28 36 34 30 36 24"
        stroke={color}
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M40 12C46 8 54 6 58 10C62 14 56 18 50 16C56 20 60 28 56 32C52 36 46 30 44 24"
        stroke={color}
        strokeWidth="0.7"
        fill="none"
      />
      <circle cx="22" cy="10" r="1.8" fill={color} opacity="0.6" />
      <circle cx="58" cy="10" r="1.8" fill={color} opacity="0.6" />
      <circle cx="24" cy="32" r="1.8" fill={color} opacity="0.6" />
      <circle cx="56" cy="32" r="1.8" fill={color} opacity="0.6" />
    </svg>
  );
};

export const LineSeparator: React.FC<{ color?: string; size?: number; opacity?: number; className?: string }> = ({
  color = '#2E7D32',
  size = 180,
  opacity = 0.4,
  className = '',
}) => {
  return (
    <svg width={size} height="20" viewBox="0 0 180 20" fill="none" className={className} opacity={opacity}>
      <line x1="0" y1="10" x2="78" y2="10" stroke={color} strokeWidth="0.6" />
      <rect x="86" y="6" width="8" height="8" stroke={color} strokeWidth="0.6" fill="none" transform="rotate(45 90 10)" />
      <line x1="102" y1="10" x2="180" y2="10" stroke={color} strokeWidth="0.6" />
    </svg>
  );
};

export const LineDoubleSeparator: React.FC<{ color?: string; size?: number; opacity?: number; className?: string }> = ({
  color = '#2E7D32',
  size = 180,
  opacity = 0.4,
  className = '',
}) => {
  return (
    <svg width={size} height="24" viewBox="0 0 180 24" fill="none" className={className} opacity={opacity}>
      <line x1="0" y1="9" x2="78" y2="9" stroke={color} strokeWidth="0.6" />
      <line x1="0" y1="15" x2="78" y2="15" stroke={color} strokeWidth="0.4" />
      <polygon
        points="90,4 92,10 98,10 93,14 95,20 90,16 85,20 87,14 82,10 88,10"
        stroke={color}
        strokeWidth="0.6"
        fill="none"
      />
      <line x1="102" y1="9" x2="180" y2="9" stroke={color} strokeWidth="0.6" />
      <line x1="102" y1="15" x2="180" y2="15" stroke={color} strokeWidth="0.4" />
    </svg>
  );
};

export const ButterflyOrnament: React.FC<{ color?: string; size?: number; opacity?: number; className?: string }> = ({
  color = '#2E7D32',
  size = 48,
  opacity = 0.45,
  className = '',
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} opacity={opacity}>
      <path
        d="M24 24C21 18 15 11 10 13C5 15 7 21 11 24C7 27 5 33 10 35C15 37 21 30 24 24Z"
        stroke={color}
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M24 24C27 18 33 11 38 13C43 15 41 21 37 24C41 27 43 33 38 35C33 37 27 30 24 24Z"
        stroke={color}
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M24 24C22 20 18 15 15 17C12 19 14 22 16 24"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M24 24C26 20 30 15 33 17C36 19 34 22 32 24"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
      <line x1="24" y1="14" x2="24" y2="34" stroke={color} strokeWidth="0.9" />
      <path d="M24 14C22 10 20 8 18 6" stroke={color} strokeWidth="0.6" fill="none" />
      <path d="M24 14C26 10 28 8 30 6" stroke={color} strokeWidth="0.6" fill="none" />
      <circle cx="18" cy="6" r="1.2" fill={color} opacity="0.7" />
      <circle cx="30" cy="6" r="1.2" fill={color} opacity="0.7" />
    </svg>
  );
};
