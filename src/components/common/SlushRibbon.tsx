import React from 'react';

interface SlushRibbonProps {
  className?: string;
  variant?: 'arc' | 'wave' | 'loop' | 'knot';
  color?: 'teal' | 'navy' | 'purple' | 'yellow' | 'orange' | 'red';
}

export const SlushRibbon: React.FC<SlushRibbonProps> = ({
  className = '',
  variant = 'wave',
  color = 'teal',
}) => {
  // Official UDC Palette Shades
  const colorThemes = {
    teal: { base: '#171a3d', dark: '#246b61', main: '#3da898', light: '#99dfd5' },
    navy: { base: '#0e1028', dark: '#171a3d', main: '#252a5c', light: '#6c77b5' },
    purple: { base: '#171a3d', dark: '#31174d', main: '#44216b', light: '#b08ad6' },
    yellow: { base: '#171a3d', dark: '#b88612', main: '#f2b725', light: '#fde69d' },
    orange: { base: '#171a3d', dark: '#b05813', main: '#ec8026', light: '#f8c297' },
    red: { base: '#171a3d', dark: '#a12b1f', main: '#df4838', light: '#f29f95' },
  };

  const c = colorThemes[color] || colorThemes.teal;

  if (variant === 'arc') {
    return (
      <svg
        viewBox="0 0 1000 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto pointer-events-none select-none ${className}`}
      >
        {/* 3D Inflatable Tube Outer Glow / Shadow Base */}
        <path
          d="M 60 250 C 220 50, 480 30, 940 180"
          stroke={c.base}
          strokeWidth="74"
          strokeLinecap="round"
        />
        {/* Deep underside shading */}
        <path
          d="M 60 250 C 220 50, 480 30, 940 180"
          stroke={c.dark}
          strokeWidth="70"
          strokeLinecap="round"
        />
        {/* Main Inflatable Body */}
        <path
          d="M 60 250 C 220 50, 480 30, 940 180"
          stroke={c.main}
          strokeWidth="62"
          strokeLinecap="round"
        />
        {/* Top glossy tube highlight */}
        <path
          d="M 80 242 C 230 52, 470 36, 920 174"
          stroke={c.light}
          strokeWidth="20"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        {/* Pure white core crest */}
        <path
          d="M 120 220 C 245 68, 450 48, 880 162"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
      </svg>
    );
  }

  if (variant === 'loop') {
    return (
      <svg
        viewBox="0 0 800 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto pointer-events-none select-none ${className}`}
      >
        <path
          d="M 80 380 C 180 120, 360 40, 520 180 C 640 280, 720 120, 760 90"
          stroke={c.base}
          strokeWidth="78"
          strokeLinecap="round"
        />
        <path
          d="M 80 380 C 180 120, 360 40, 520 180 C 640 280, 720 120, 760 90"
          stroke={c.dark}
          strokeWidth="72"
          strokeLinecap="round"
        />
        <path
          d="M 80 380 C 180 120, 360 40, 520 180 C 640 280, 720 120, 760 90"
          stroke={c.main}
          strokeWidth="64"
          strokeLinecap="round"
        />
        <path
          d="M 100 360 C 190 130, 355 55, 510 175 C 625 265, 705 130, 745 100"
          stroke={c.light}
          strokeWidth="20"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />
        <path
          d="M 120 330 C 205 145, 345 70, 490 170"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      </svg>
    );
  }

  // Default 'wave' - crests upwards in the center to stay clear of subheadings
  return (
    <svg
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto pointer-events-none select-none ${className}`}
    >
      <path
        d="M 40 220 C 300 280, 580 80, 840 160 C 980 220, 1100 120, 1160 160"
        stroke={c.base}
        strokeWidth="80"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 40 220 C 300 280, 580 80, 840 160 C 980 220, 1100 120, 1160 160"
        stroke={c.dark}
        strokeWidth="74"
        strokeLinecap="round"
      />
      <path
        d="M 40 220 C 300 280, 580 80, 840 160 C 980 220, 1100 120, 1160 160"
        stroke={c.main}
        strokeWidth="66"
        strokeLinecap="round"
      />
      <path
        d="M 60 208 C 300 268, 580 68, 840 148 C 980 208, 1100 108, 1140 148"
        stroke={c.light}
        strokeWidth="20"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      <path
        d="M 90 190 C 310 250, 580 52, 840 132 C 980 192, 1100 92, 1110 132"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
    </svg>
  );
};
