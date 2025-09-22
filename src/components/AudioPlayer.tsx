import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Start as true for default playback
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<string>('');
  const [userStopped, setUserStopped] = useState(false); // Track if user manually stopped
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

  // Randomly select an audio file on component mount (exclusive selection)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomAudio = audioFiles[randomIndex];
    setSelectedAudio(randomAudio);
    console.log('Selected random audio for exclusive playback:', randomAudio);
  }, [audioFiles]);

  // Auto-play selected audio by default (no user prompt)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedAudio) return;

    audio.loop = true;
    audio.volume = 0.3;

    let interactionListener: (() => void) | null = null;

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
        console.log('Audio started playing by default on load');
      } catch (error) {
        console.log('Autoplay blocked, waiting for user interaction...', error);
        setIsPlaying(false);
        // Listen for first user interaction to trigger playback
        interactionListener = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            window.removeEventListener('click', interactionListener!);
            window.removeEventListener('keydown', interactionListener!);
            window.removeEventListener('touchstart', interactionListener!);
            console.log('Audio started after user interaction');
          } catch (err) {
            console.log('Still blocked after user interaction:', err);
          }
        };
        window.addEventListener('click', interactionListener);
        window.addEventListener('keydown', interactionListener);
        window.addEventListener('touchstart', interactionListener);
      }
    };

    tryPlay();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (interactionListener) {
        window.removeEventListener('click', interactionListener);
        window.removeEventListener('keydown', interactionListener);
        window.removeEventListener('touchstart', interactionListener);
      }
    };
  }, [selectedAudio]);

  // Play/pause logic fix
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setUserStopped(true);
    } else {
      audio.play();
      setIsPlaying(true);
      setUserStopped(false);
    }
  };

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setUserStopped(true); // Mark as user-stopped to prevent auto-resume
      } else {
        await audio.play();
        setIsPlaying(true);
        setUserStopped(false); // Reset user-stopped flag when user starts
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

  // Don't render until audio file is selected
  if (!selectedAudio) {
    return null;
  }

  return (
    <>
      {/* Audio element with randomly selected source for exclusive playback */}
      <audio
        ref={audioRef}
        preload="auto"
        src={selectedAudio}
        autoPlay
      />


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
