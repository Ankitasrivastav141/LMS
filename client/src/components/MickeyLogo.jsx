import React from 'react';

export default function MickeyLogo({ size = 'default', showText = true }) {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconDim = isSmall ? 'w-8 h-8' : isLarge ? 'w-12 h-12' : 'w-9 h-9';

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative ${iconDim} flex items-center justify-center`}>
        {/* Playful Mickey-inspired 3-circle emblem (original art: red & yellow button theme) */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 bg-[#191A23] rounded-full shadow-sm"></div>
        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#191A23] rounded-full shadow-sm"></div>
        <div className="absolute bottom-0 w-6 h-6 bg-[#E52521] rounded-full flex items-center justify-center shadow-playful-red">
          {/* Two playful yellow oval buttons like Mickey's shorts */}
          <div className="flex gap-1">
            <div className="w-1.5 h-2 bg-[#FDB813] rounded-full"></div>
            <div className="w-1.5 h-2 bg-[#FDB813] rounded-full"></div>
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold text-lg tracking-tight text-[#191A23] flex items-center gap-1.5 leading-none">
            My Learning Space
            <span className="w-2 h-2 rounded-full bg-[#FDB813]"></span>
          </span>
          <span className="text-[11px] font-semibold text-[#64748B] tracking-wider uppercase mt-1">
            Personal AI LMS
          </span>
        </div>
      )}
    </div>
  );
}
