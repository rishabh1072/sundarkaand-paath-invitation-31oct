import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Start as false since auto-play is often blocked
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume by default

    // Try auto-play after a short delay to improve success rate
    const attemptAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setShowPlayPrompt(false);
      } catch (error) {
        // Auto-play blocked by browser - show prompt for user interaction
        console.log('Auto-play blocked by browser:', error);
        setIsPlaying(false);
        setShowPlayPrompt(true);
      }
    };

    // Attempt auto-play after a short delay
    const timer = setTimeout(attemptAutoPlay, 1000);

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        setShowPlayPrompt(false);
      }
    } catch (error) {
      console.error('Audio control error:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const startAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setShowPlayPrompt(false);
    } catch (error) {
      console.error('Failed to start audio:', error);
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        preload="auto"
        src="/hanuman-chant.mp3"
      />

      {/* Play prompt overlay when auto-play is blocked */}
      {showPlayPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-sacred-red/90 border-2 border-sacred-gold rounded-2xl p-8 text-center max-w-md mx-4">
            <div className="mb-6">
              <div className="w-16 h-16 bg-sacred-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8 text-sacred-gold" />
              </div>
              <h3 className="text-2xl font-bold text-sacred-gold mb-2 hindi-text">
                श्री हनुमान चालीसा
              </h3>
              <p className="text-sacred-yellow">
                Click to start the devotional background chant
              </p>
            </div>
            <button
              onClick={startAudio}
              className="bg-sacred-gold hover:bg-sacred-yellow text-sacred-red font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center mx-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Chanting
            </button>
          </div>
        </div>
      )}

      {/* Audio controls - Bottom left */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <div className="bg-sacred-red/80 backdrop-blur-sm rounded-full p-3 border-2 border-sacred-gold/50 shadow-lg">
          <button
            onClick={togglePlayPause}
            className="text-sacred-gold hover:text-sacred-yellow transition-colors duration-300"
            title={isPlaying ? 'Pause background chant' : 'Play background chant'}
          >
            {isPlaying ? (
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-4 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-current rounded-sm"></div>
                </div>
              </div>
            ) : (
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              </div>
            )}
          </button>

          <button
            onClick={toggleMute}
            className="ml-2 text-sacred-gold hover:text-sacred-yellow transition-colors duration-300"
            title={isMuted ? 'Unmute background chant' : 'Mute background chant'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
