import React from 'react';

const TempleBells: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Red background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-sacred-red/40 via-red-500/30 to-sacred-red/60 pointer-events-none -z-10"></div>

      {/* Temple Bell 1 - Top Left */}
      <div className="absolute top-16 left-16 animate-bell-sway-1">
        <div className="text-sacred-gold/20 text-4xl transform-gpu">
          🔔
        </div>
      </div>

      {/* Temple Bell 2 - Top Right */}
      <div className="absolute top-20 right-20 animate-bell-sway-2">
        <div className="text-sacred-gold/25 text-5xl transform-gpu">
          🔔
        </div>
      </div>

      {/* Temple Bell 3 - Middle Left */}
      <div className="absolute top-1/3 left-12 animate-bell-sway-3">
        <div className="text-sacred-gold/15 text-3xl transform-gpu">
          🔔
        </div>
      </div>

      {/* Temple Bell 4 - Middle Right */}
      <div className="absolute top-2/5 right-16 animate-bell-sway-4">
        <div className="text-sacred-gold/20 text-4xl transform-gpu">
          🔔
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes bell-sway-1 {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-3px); }
        }
        
        @keyframes bell-sway-2 {
          0%, 100% { transform: rotate(1deg) translateY(-2px); }
          50% { transform: rotate(-1deg) translateY(0px); }
        }
        
        @keyframes bell-sway-3 {
          0%, 100% { transform: rotate(-1deg) translateY(-1px); }
          50% { transform: rotate(1deg) translateY(-4px); }
        }
        
        @keyframes bell-sway-4 {
          0%, 100% { transform: rotate(2deg) translateY(-2px); }
          50% { transform: rotate(-2deg) translateY(-1px); }
        }
        
        .animate-bell-sway-1 {
          animation: bell-sway-1 4s ease-in-out infinite;
        }
        
        .animate-bell-sway-2 {
          animation: bell-sway-2 3.5s ease-in-out infinite 0.5s;
        }
        
        .animate-bell-sway-3 {
          animation: bell-sway-3 4.5s ease-in-out infinite 1s;
        }
        
        .animate-bell-sway-4 {
          animation: bell-sway-4 3.8s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default TempleBells;
