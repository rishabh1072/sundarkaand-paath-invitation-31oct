import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioEnabled?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioEnabled = false }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Start as false, wait for consent
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [userStopped, setUserStopped] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Use correct base path for audio files
  const basePath = process.env.NODE_ENV === 'production' ? '/hanuman-aashirwad-site' : '';
  // Memoize audio files array to prevent dependency changes
  const audioFiles = useMemo(() => [
    `${basePath}/audios/Bajrang_Baan.mp3`,
    `${basePath}/audios/bajrang_baan_lofi.mp3`,
    `${basePath}/audios/hanuman_chalisa_lofi.mp3`,
    `${basePath}/audios/Sankat_Mochan_Naam_Tiharo.mp3`,
    `${basePath}/audios/Sankatmochan_Hanuman_Ashtak.mp3`
  ], [basePath]);

  // Randomly select an audio file on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomAudio = audioFiles[randomIndex];
    setSelectedAudio(randomAudio);
    console.log('Selected random audio:', randomAudio);
  }, [audioFiles]);

  // Auto-play selected audio when user consents
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedAudio || !audioEnabled) return;

    audio.loop = true;
    audio.volume = 0.3;

    const tryPlay = async () => {
      try {
        // Wait for audio to be loaded before playing
        if (audio.readyState < 3) {
          await new Promise(resolve => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
          });
        }
        audio.currentTime = 0;
        await audio.play();
        setIsPlaying(true);
        console.log('Audio started playing after user consent');
      } catch (error) {
        console.log('Audio play failed:', error);
        setIsPlaying(false);
      }
    };

    tryPlay();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [selectedAudio, audioEnabled]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !audioEnabled) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setUserStopped(true);
      } else {
        await audio.play();
        setIsPlaying(true);
        setUserStopped(false);
      }
    } catch (error) {
      console.error('Audio control error:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio || !audioEnabled) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  // Don't render if audio not enabled or no audio file selected
  if (!audioEnabled || !selectedAudio) {
    return null;
  }

  return (
    <>
      {/* Audio element with randomly selected source */}
      <audio
        ref={audioRef}
        preload="auto"
        src={selectedAudio}
      />

      {/* Audio controls - Bottom left */}
      <div className="fixed bottom-20 left-4 z-40 flex items-center gap-2">
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
