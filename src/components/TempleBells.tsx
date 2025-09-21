import React from 'react';

const TempleBells: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Red background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-sacred-red/40 via-red-500/30 to-sacred-red/60 pointer-events-none -z-10"></div>

      {/* Temple Bell 1 - Top Left Corner */}
      <div className="absolute top-0 left-0 m-4 animate-bell-sway-1">
        <div className="text-sacred-gold text-[2.8rem] drop-shadow-lg" style={{ filter: 'brightness(1.2)' }}>
          🔔
        </div>
      </div>

      {/* Temple Bell 2 - Top Right Corner */}
      <div className="absolute top-0 right-0 m-4 animate-bell-sway-2">
        <div className="text-sacred-gold text-[3.5rem] drop-shadow-lg" style={{ filter: 'brightness(1.2)' }}>
          🔔
        </div>
      </div>

      {/* Temple Bell 3 - Bottom Left Corner */}
      <div className="absolute bottom-20 left-8 animate-bell-sway-3">
        <div className="text-sacred-gold text-[2.1rem] drop-shadow-lg" style={{ filter: 'brightness(1.2)' }}>
          🔔
        </div>
      </div>

      {/* Temple Bell 4 - Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 m-4 animate-bell-sway-4">
        <div className="text-sacred-gold text-[2.8rem] drop-shadow-lg" style={{ filter: 'brightness(1.2)' }}>
          🔔
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes bell-sway-1 {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-10px); }
        }
        
        @keyframes bell-sway-2 {
          0%, 100% { transform: rotate(1deg) translateY(-8px); }
          50% { transform: rotate(-1deg) translateY(0px); }
        }
        
        @keyframes bell-sway-3 {
          0%, 100% { transform: rotate(-1deg) translateY(-6px); }
          50% { transform: rotate(1deg) translateY(-12px); }
        }
        
        @keyframes bell-sway-4 {
          0%, 100% { transform: rotate(2deg) translateY(-8px); }
          50% { transform: rotate(-2deg) translateY(-6px); }
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
