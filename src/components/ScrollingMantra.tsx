import React, { useState, useEffect } from 'react';

const ScrollingMantra: React.FC = () => {
  const mantras = [
    'ॐ हनुमते नमः',
    'जय जय हनुमान',
    'हरि ॐ तत्सत्',
    'श्री राम जय राम',
    'जय बजरंगबली'
  ];

  const [currentMantras, setCurrentMantras] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMantras(prev => prev.map(index => (index + 1) % mantras.length));
    }, 10400); // Increased by 30% (8000 * 1.3 = 10400)

    return () => clearInterval(interval);
  }, [mantras.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Multiple centered instances for continuous frequent scrolling */}
      <div className="absolute left-1/2 top-0 h-full flex items-center justify-center" style={{ transform: 'translateX(-50%)' }}>
        <div className="animate-scrollUp text-sacred-gold/15 text-8xl font-bold hindi-text whitespace-nowrap text-center">
          {mantras[currentMantras[0]]}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 h-full flex items-center justify-center" style={{ transform: 'translateX(-50%)', animationDelay: '-1.95s' }}>
        <div className="animate-scrollUp2 text-sacred-yellow/12 text-7xl font-bold hindi-text whitespace-nowrap text-center">
          {mantras[currentMantras[1]]}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 h-full flex items-center justify-center" style={{ transform: 'translateX(-50%)', animationDelay: '-3.9s' }}>
        <div className="animate-scrollUp3 text-sacred-orange/10 text-9xl font-bold hindi-text whitespace-nowrap text-center">
          {mantras[currentMantras[2]]}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 h-full flex items-center justify-center" style={{ transform: 'translateX(-50%)', animationDelay: '-5.85s' }}>
        <div className="animate-scrollUp4 text-sacred-red/8 text-6xl font-bold hindi-text whitespace-nowrap text-center">
          {mantras[currentMantras[3]]}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 h-full flex items-center justify-center" style={{ transform: 'translateX(-50%)', animationDelay: '-7.8s' }}>
        <div className="animate-scrollUp5 text-sacred-gold/10 text-8xl font-bold hindi-text whitespace-nowrap text-center">
          {mantras[currentMantras[4]]}
        </div>
      </div>

      {/* CSS Keyframes - Slowed down by 30% */}
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
        
        @keyframes scrollUp2 {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
        
        @keyframes scrollUp3 {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
        
        @keyframes scrollUp4 {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
        
        @keyframes scrollUp5 {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
        
        .animate-scrollUp {
          animation: scrollUp 7.8s linear infinite;
        }
        
        .animate-scrollUp2 {
          animation: scrollUp2 9.1s linear infinite;
        }
        
        .animate-scrollUp3 {
          animation: scrollUp3 6.5s linear infinite;
        }
        
        .animate-scrollUp4 {
          animation: scrollUp4 10.4s linear infinite;
        }
        
        .animate-scrollUp5 {
          animation: scrollUp5 8.45s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollingMantra;
