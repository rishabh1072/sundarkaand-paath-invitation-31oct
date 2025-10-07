import React from 'react';

const bellSize = '2.5rem';

const TempleBells: React.FC = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center mt-4 mb-2 select-none">
      <span
        className="text-sacred-gold font-bold tracking-wide whitespace-nowrap flex items-center justify-center mx-1"
        style={{ fontSize: bellSize, lineHeight: bellSize, height: bellSize }}
      >
        || ॐ श्री हनुमते नमः ||
      </span>
      <style>{`
        @keyframes bell-sway-left {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes bell-sway-right {
          0%, 100% { transform: rotate(8deg); }
          50% { transform: rotate(-8deg); }
        }
        .animate-bell-sway-left {
          animation: bell-sway-left 2.5s ease-in-out infinite;
        }
        .animate-bell-sway-right {
          animation: bell-sway-right 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TempleBells;
