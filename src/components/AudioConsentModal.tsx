import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const AudioConsentModal: React.FC<AudioConsentModalProps> = ({ isOpen, onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="devotional-card max-w-sm sm:max-w-md mx-auto p-6 text-center">
        <div className="mb-4">
          <Volume2 className="w-12 h-12 text-sacred-gold mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-sacred-gold mb-2">
            Would you like to enable background sound?
          </h2>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={onAccept}
            className="bg-sacred-gold hover:bg-sacred-yellow text-sacred-red font-bold px-6 py-2"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Yes, Enable Audio
          </Button>
          <Button
            onClick={onDecline}
            variant="outline"
            className="border-sacred-gold text-sacred-gold hover:bg-sacred-red/20 px-6 py-2"
          >
            <VolumeX className="w-4 h-4 mr-2" />
            No Thanks
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AudioConsentModal;
