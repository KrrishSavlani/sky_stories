'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  color: string;
}

interface StoryContent {
  id: string;
  type: 'text' | 'image';
  content: string;
  imageUrl?: string;
}

interface ChatUIProps {
  character: Character;
  onBack: () => void;
}

export default function ChatUI({ character, onBack }: ChatUIProps) {
  const [storyContent, setStoryContent] = useState<StoryContent[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [isListening, setIsListening] = useState(true);

  // Sample story content that would come from API
  const fullStory = [
    {
      id: 'intro',
      type: 'text' as const,
      content: `Hi there! I'm ${character.name.split(' ')[1]} and I'm excited to share my story about space weather with you! 🌟`
    },
    {
      id: 'main-story',
      type: 'text' as const,
      content: getCharacterStory(character.id)
    },
    {
      id: 'image-story',
      type: 'image' as const,
      content: 'Here\'s what space weather looks like from my perspective:',
      imageUrl: generateImage(character.id)
    },
    {
      id: 'impact',
      type: 'text' as const,
      content: getCharacterImpact(character.id)
    },
    {
      id: 'conclusion',
      type: 'text' as const,
      content: 'That\'s my story! Space weather connects us all in different ways. What questions do you have about my experience?'
    }
  ];

  useEffect(() => {
    // Start the story progression
    const startStory = () => {
      if (currentContentIndex < fullStory.length) {
        setIsTyping(true);
        setIsListening(false);
        
        setTimeout(() => {
          setStoryContent(prev => [...prev, fullStory[currentContentIndex]]);
          setIsTyping(false);
          setIsListening(true);
          setCurrentContentIndex(prev => prev + 1);
        }, 2000);
      }
    };

    const timer = setTimeout(startStory, 1000);
    return () => clearTimeout(timer);
  }, [currentContentIndex]);

  useEffect(() => {
    if (currentContentIndex < fullStory.length && !isTyping && isListening) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setIsListening(false);
        
        setTimeout(() => {
          setStoryContent(prev => [...prev, fullStory[currentContentIndex]]);
          setIsTyping(false);
          setIsListening(true);
          setCurrentContentIndex(prev => prev + 1);
        }, 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentContentIndex, isTyping, isListening]);

  return (
    <div className="min-h-screen flex flex-col p-6 pt-24 relative">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-32 left-6 p-3 hover:bg-white/10 rounded-full transition-colors z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Character Name - Centered at Top */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white/30">
            <Image
              src={character.avatar.replace('.svg', '-face.svg')}
              alt={character.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-4xl">{character.emoji}</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {character.name}
        </h1>
        <p className="text-xl text-white/70">
          Space Weather Expert
        </p>
      </motion.div>

      {/* Story Section */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 min-h-[400px] relative overflow-hidden">
          {/* AI Listening Animation Background */}
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                  <motion.div
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-pink-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <motion.p
                  className="text-white/60 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  AI is listening...
                </motion.p>
              </div>
            </div>
          )}

          {/* Story Content */}
          <div className="relative z-10">
            <AnimatePresence>
              {storyContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-6 last:mb-0"
                >
                  {content.type === 'text' && (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-white text-lg leading-relaxed">
                        {content.content}
                      </p>
                    </div>
                  )}
                  {content.type === 'image' && (
                    <div>
                      <p className="text-white text-lg leading-relaxed mb-4">
                        {content.content}
                      </p>
                      <div className="bg-white/10 rounded-2xl p-6">
                        <Image
                          src={content.imageUrl || '/images/placeholder.svg'}
                          alt="Space weather illustration"
                          width={500}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-white/60 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white/60 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white/60 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="text-white/60 text-sm">AI is thinking...</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex justify-center space-x-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          ← Choose Another Character
        </button>
        <button
          onClick={() => window.location.href = '/end'}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
        >
          Finish Story →
        </button>
      </motion.div>
    </div>
  );
}

// Helper functions (these would be replaced with real API calls)
function getCharacterStory(characterId: string): string {
  const stories: Record<string, string> = {
    farmer: "When space weather hits, my crops can be affected! Solar storms can disrupt GPS systems that help me plant seeds in perfect rows. Sometimes the aurora is so beautiful I can see it from my fields, but I know it means the sun is very active and I should check my weather apps for any alerts.",
    pilot: "Space weather is crucial for aviation! Solar storms can disrupt radio communications and GPS navigation. When there's high solar activity, we might need to fly at lower altitudes or take different routes. The aurora is beautiful from up here, but it's also a sign that we need to be extra careful with our navigation systems.",
    astronaut: "From space, I can see the sun's activity directly! Solar flares and coronal mass ejections can be dangerous for astronauts. We have special shielding and monitoring systems to protect us. The aurora looks amazing from the International Space Station - it's like watching Earth's magnetic field dance with the solar wind!",
    operator: "Space weather can cause power outages! When solar storms hit Earth's magnetic field, they can create electrical currents in power lines. We monitor space weather forecasts 24/7 and can take protective measures like reducing power flow or switching to backup systems. It's like preparing for a cosmic storm!",
    public: "Space weather affects everyone! It can impact our phones, internet, and even cause beautiful auroras. I love watching the northern lights, but I also know they mean the sun is very active. I check space weather apps to know when to expect auroras and when to be prepared for potential disruptions to technology."
  };
  return stories[characterId] || "Space weather affects us all in different ways!";
}

function getCharacterImpact(characterId: string): string {
  const impacts: Record<string, string> = {
    farmer: "The most important thing I've learned is to always have backup plans. When GPS fails, I can still use traditional farming methods. Space weather has taught me to be more resilient and adaptable in my work.",
    pilot: "Safety is always our top priority. Space weather monitoring helps us make informed decisions about flight paths and altitudes. It's amazing how connected we are to the sun's activity, even at 35,000 feet!",
    astronaut: "Being in space has given me a unique perspective on Earth's vulnerability to space weather. We're all connected by this beautiful blue planet, and protecting it means understanding and preparing for space weather.",
    operator: "Our power grid is like a giant nervous system, and space weather can send electrical shocks through it. But with proper monitoring and preparation, we can keep the lights on for everyone, even during the strongest solar storms.",
    public: "I never realized how much space weather affects my daily life until I started learning about it. Now I appreciate both the beauty of auroras and the importance of being prepared for potential disruptions."
  };
  return impacts[characterId] || "Space weather has taught me so much about our interconnected world!";
}

function generateImage(characterId: string): string {
  // This would be replaced with real AI image generation
  return `/images/${characterId}.svg`;
}
