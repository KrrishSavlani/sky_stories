"use client";

import { useState } from "react";
import CharacterSelection from "../components/CharacterSelection";
import ChatUI from "../components/ChatUI_elevenlabs";

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  color: string;
}

export default function StoryPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<"selection" | "chat">(
    "selection"
  );

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentStep("chat");
  };

  const handleBackToSelection = () => {
    setCurrentStep("selection");
    setSelectedCharacter(null);
  };

  return (
    <div>
      {/*<Navbar currentPage="story" />*/}
      {currentStep === "selection" ? (
        <CharacterSelection onSelectCharacter={handleSelectCharacter} />
      ) : (
        selectedCharacter && (
          <ChatUI
            character={selectedCharacter}
            onBack={handleBackToSelection}
          />
        )
      )}
  </div>
  );
}
