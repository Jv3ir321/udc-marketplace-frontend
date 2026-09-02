import React from 'react';
import {
  Rocket,
  Coins,
  Wallet,
  Check,
  Star,
  Sparkles,
  BookOpen,
  GraduationCap,
  Heart,
  Tag,
  Flame,
  Zap,
} from 'lucide-react';

export type StickerType =
  | 'rocket'
  | 'coin'
  | 'wallet'
  | 'check'
  | 'star'
  | 'sparkles'
  | 'book'
  | 'grad'
  | 'heart'
  | 'tag'
  | 'flame'
  | 'zap';

export type StickerColor =
  | 'ember'
  | 'sunburst'
  | 'voltage'
  | 'mint'
  | 'lavender'
  | 'blue'
  | 'white'
  | 'navy'
  | 'orange'
  | 'purple'
  | 'teal'
  | 'yellow'
  | 'red';

interface SlushStickerProps {
  type: StickerType;
  color?: StickerColor;
  label?: string;
  className?: string;
  rotate?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const colorMap: Record<StickerColor, { bg: string; text: string; stroke: string }> = {
  // Official UDC Palette (CMYK values from brand book)
  navy: { bg: 'bg-[#171a3d]', text: 'text-[#ffffff]', stroke: '#ffffff' },
  purple: { bg: 'bg-[#44216b]', text: 'text-[#ffffff]', stroke: '#ffffff' },
  voltage: { bg: 'bg-[#44216b]', text: 'text-[#ffffff]', stroke: '#ffffff' }, // UDC Morado
  teal: { bg: 'bg-[#3da898]', text: 'text-[#ffffff]', stroke: '#ffffff' },
  mint: { bg: 'bg-[#3da898]', text: 'text-[#ffffff]', stroke: '#ffffff' },    // UDC Verde/Turquesa
  yellow: { bg: 'bg-[#f2b725]', text: 'text-[#171a3d]', stroke: '#171a3d' },
  sunburst: { bg: 'bg-[#f2b725]', text: 'text-[#171a3d]', stroke: '#171a3d' }, // UDC Amarillo
  orange: { bg: 'bg-[#ec8026]', text: 'text-[#ffffff]', stroke: '#ffffff' },  // UDC Naranja
  red: { bg: 'bg-[#df4838]', text: 'text-[#ffffff]', stroke: '#ffffff' },
  ember: { bg: 'bg-[#df4838]', text: 'text-[#ffffff]', stroke: '#ffffff' },   // UDC Rojo Coral
  lavender: { bg: 'bg-[#f4edf9]', text: 'text-[#44216b]', stroke: '#44216b' },
  blue: { bg: 'bg-[#edf0f7]', text: 'text-[#171a3d]', stroke: '#171a3d' },
  white: { bg: 'bg-[#ffffff]', text: 'text-[#171a3d]', stroke: '#171a3d' },
};

const sizeMap = {
  sm: 'h-8 px-2.5 text-xs rounded-[16px]',
  md: 'h-11 px-3.5 text-sm rounded-[18px]',
  lg: 'h-14 px-5 text-base rounded-[20px]',
  xl: 'h-20 w-20 p-4 rounded-[20px]',
};

export const SlushSticker: React.FC<SlushStickerProps> = ({
  type,
  color = 'sunburst',
  label,
  className = '',
  rotate = 0,
  size = 'md',
}) => {
  const chosenColor = colorMap[color];

  const renderIcon = () => {
    const iconSize = size === 'sm' ? 14 : size === 'md' ? 18 : size === 'lg' ? 24 : 32;

    switch (type) {
      case 'rocket':
        return <Rocket className="shrink-0" size={iconSize} />;
      case 'coin':
        return <Coins className="shrink-0" size={iconSize} />;
      case 'wallet':
        return <Wallet className="shrink-0" size={iconSize} />;
      case 'check':
        return <Check className="shrink-0 stroke-[3]" size={iconSize} />;
      case 'star':
        return <Star className="shrink-0 fill-current" size={iconSize} />;
      case 'sparkles':
        return <Sparkles className="shrink-0" size={iconSize} />;
      case 'book':
        return <BookOpen className="shrink-0" size={iconSize} />;
      case 'grad':
        return <GraduationCap className="shrink-0" size={iconSize} />;
      case 'heart':
        return <Heart className="shrink-0 fill-current" size={iconSize} />;
      case 'tag':
        return <Tag className="shrink-0" size={iconSize} />;
      case 'flame':
        return <Flame className="shrink-0 fill-current" size={iconSize} />;
      case 'zap':
        return <Zap className="shrink-0 fill-current" size={iconSize} />;
      default:
        return <Sparkles className="shrink-0" size={iconSize} />;
    }
  };

  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`slush-sticker inline-flex items-center gap-2 font-aeonik font-bold border border-[#171a3d] select-none ${chosenColor.bg} ${chosenColor.text} ${sizeMap[size]} ${className}`}
    >
      {renderIcon()}
      {label && <span className="tracking-[0.032em] uppercase whitespace-nowrap">{label}</span>}
    </div>
  );
};
