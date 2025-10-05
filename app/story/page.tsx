'use client';

import { useState } from 'react';
import AuroraBackground from '../components/AuroraBackground';
import Navbar from '../components/Navbar';
import CharacterSelection from '../components/CharacterSelection';
import ChatUI from '../components/ChatUI';

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  color: string;
}

export default function StoryPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentStep, setCurrentStep] = useState<'selection' | 'chat'>('selection');

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentStep('chat');
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setSelectedCharacter(null);
  };

  return (
    <AuroraBackground>
      {/*<Navbar currentPage="story" />*/}
      {currentStep === 'selection' ? (
        <CharacterSelection onSelectCharacter={handleSelectCharacter} />
      ) : (
        selectedCharacter && (
          <ChatUI
            character={selectedCharacter}
            onBack={handleBackToSelection}
          />
        )
      )}
    </AuroraBackground>
  );
}
