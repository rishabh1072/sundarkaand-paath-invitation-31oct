import React from 'react';

const mantras = [
  'ॐ हनुमते नमः',
  'जय जय हनुमान',
  'हरि ॐ तत्सत्',
  'श्री राम जय राम',
  'जय बजरंगबली'
];

const CHANT_DURATION = 15; // seconds each chant is visible
const DELAY_BETWEEN = 3; // seconds between each chant's start

const ScrollingMantra: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {mantras.map((mantra, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-0 h-full flex items-center justify-center"
          style={{
            transform: 'translateX(-50%)',
            animation: `scrollUp ${CHANT_DURATION}s linear infinite`,
            animationDelay: `${i * DELAY_BETWEEN}s`,
          }}
        >
          <div className={`text-sacred-gold/30 text-5xl sm:text-7xl md:text-[8rem] font-extrabold hindi-text whitespace-nowrap text-center drop-shadow-[0_2px_8px_rgba(185,28,28,0.25)] max-w-[90vw] overflow-hidden text-ellipsis`}>
            {mantra}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateX(-50%) translateY(100vh); }
          100% { transform: translateX(-50%) translateY(-100vh); }
        }
      `}</style>
    </div>
  );
};

export default ScrollingMantra;
