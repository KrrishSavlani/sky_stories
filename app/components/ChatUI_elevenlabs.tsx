"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { useConversation } from "@elevenlabs/react";
import VoiceInteractionAnimation from "./VoiceInteractionAnimation";

interface Character {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  color: string;
}

interface ChatUIProps {
  character: Character;
  onBack: () => void;
}

interface TranscriptEntry {
  id: string;
  speaker: "user" | "agent";
  text: string;
  timestamp: Date;
}

// Memoized Transcript Section Component
const TranscriptSection = memo(
  ({
    transcript,
    character,
    transcriptEndRef,
  }: {
    transcript: TranscriptEntry[];
    character: Character;
    transcriptEndRef: React.RefObject<HTMLDivElement | null>;
  }) => (
    <div className="w-96">
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 h-full flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          📝 Conversation Transcript
        </h3>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar max-h-[calc(100vh-200px)]">
          {transcript.length === 0 ? (
            <div className="text-white/50 text-center py-8">
              <p>
                No conversation yet. Start talking to see the transcript here.
              </p>
            </div>
          ) : (
            transcript.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg ${
                  entry.speaker === "user"
                    ? "bg-blue-500/20 border-l-4 border-blue-400 ml-4"
                    : "bg-green-500/20 border-l-4 border-green-400 mr-4"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white/80">
                    {entry.speaker === "user"
                      ? "👤 You"
                      : `${character.emoji} ${character.name}`}
                  </span>
                  <span className="text-xs text-white/50">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {entry.text}
                </p>
              </motion.div>
            ))
          )}
          <div ref={transcriptEndRef} />
        </div>
      </div>
    </div>
  )
);

TranscriptSection.displayName = "TranscriptSection";

// Character context for ElevenLabs AI
const getCharacterContext = (character: Character) => {
  const contexts = {
    astronaut: {
      personality:
        "An experienced astronaut with extensive knowledge of space missions, zero-gravity environments, and space exploration. Speaks with authority about space travel, orbital mechanics, and life in space stations.",
      background:
        "I've spent over 400 days in space across multiple missions to the International Space Station. I've conducted spacewalks, managed life support systems, and led research experiments in microgravity.",
      expertise:
        "Space missions, EVA operations, spacecraft systems, space psychology, and international space cooperation",
      speakingStyle:
        "Professional yet personable, uses technical terms when appropriate but explains them clearly",
      instructions: `You are ${character.name}, an experienced astronaut. Always respond as this character would, drawing from your extensive space experience. Share specific details about life in space, the challenges of space missions, and the wonder of seeing Earth from orbit.`,
    },
    farmer: {
      personality:
        "A knowledgeable agricultural expert with deep understanding of sustainable farming, crop rotation, and climate-smart agriculture. Passionate about feeding the world sustainably.",
      background:
        "I've been farming for over 20 years, managing both small family farms and large agricultural operations. I specialize in precision agriculture and sustainable farming practices.",
      expertise:
        "Crop management, soil health, agricultural technology, sustainable farming, climate adaptation in agriculture",
      speakingStyle:
        "Down-to-earth, practical, uses farming analogies and speaks from hands-on experience",
      instructions: `You are ${character.name}, an experienced farmer and agricultural expert. Always respond as this character would, sharing practical farming wisdom, seasonal insights, and your passion for sustainable agriculture. Use farming analogies and speak from decades of hands-on experience.`,
    },
    operator: {
      personality:
        "A skilled mission control operator with expertise in spacecraft operations, real-time problem-solving, and communication systems. Always calm under pressure.",
      background:
        "I've worked in mission control for NASA for 15 years, supporting everything from ISS operations to planetary missions. I've guided astronauts through critical situations and system failures.",
      expertise:
        "Mission control operations, spacecraft telemetry, emergency procedures, communication protocols, flight dynamics",
      speakingStyle:
        "Precise, methodical, uses clear communication protocols, remains calm and focused",
      instructions: `You are ${character.name}, a mission control operator with 15 years of experience. Always respond as this character would, with precision and calm professionalism. Share insights about spacecraft operations, emergency procedures, and the critical work of mission control.`,
    },
    pilot: {
      personality:
        "An experienced test pilot and flight instructor with knowledge of both atmospheric and space flight. Combines technical expertise with practical flying experience.",
      background:
        "I'm a former military test pilot who transitioned to commercial aviation and aerospace testing. I've flown over 50 different aircraft types and trained many pilots.",
      expertise:
        "Flight operations, aircraft systems, aerodynamics, flight safety, pilot training, aerospace testing",
      speakingStyle:
        "Confident and precise, uses aviation terminology, emphasizes safety and proper procedures",
      instructions: `You are ${character.name}, an experienced test pilot and flight instructor. Always respond as this character would, with confidence and precision. Share stories from your flying experience, emphasize safety protocols, and explain complex aviation concepts clearly.`,
    },
    public: {
      personality:
        "A space enthusiast and science communicator who makes complex space topics accessible to everyone. Passionate about inspiring others about space exploration.",
      background:
        "I work in space education and public outreach, translating complex space science into engaging content for schools, museums, and the general public.",
      expertise:
        "Space science communication, educational programs, public engagement, space history, future missions",
      speakingStyle:
        "Enthusiastic and accessible, uses analogies and examples that everyone can understand",
      instructions: `You are ${character.name}, a space science communicator and educator. Always respond as this character would, with enthusiasm and in an accessible way. Make complex space topics easy to understand, use engaging analogies, and inspire curiosity about space exploration.`,
    },
  };

  return contexts[character.id as keyof typeof contexts] || contexts["public"];
};

export default function ChatUI({ character, onBack }: ChatUIProps) {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Get character context for the AI
  const characterContext = getCharacterContext(character);

  // ElevenLabs React SDK - useConversation hook
  const conversation = useConversation({
    apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      setConnectionError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
    },
    onMessage: (message) => {
      console.log("Message received:", message);
      // Handle different message types from ElevenLabs - use the actual API structure
      if (message.source === "user" && message.message) {
        addToTranscript("user", message.message);
      } else if (message.source === "ai" && message.message) {
        addToTranscript("agent", message.message);
      }
    },
    onStatusChange: (status) => {
      console.log("Status changed:", status);
      if (status.status === "disconnected" && transcript.length > 0) {
        console.log("Unexpected disconnection detected");
      }
    },
    onModeChange: (mode) => {
      console.log("Mode changed:", mode);
      // Update UI based on mode (listening, speaking, etc.)
      // Mode changes are now handled by the memoized animationUserType
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      setConnectionError(
        typeof error === "string" ? error : "Connection error occurred"
      );
      // Don't automatically retry on error to prevent loops
    },
  });

  const addToTranscript = useCallback(
    (speaker: "user" | "agent", text: string) => {
      if (text.trim()) {
        const entry: TranscriptEntry = {
          id: Date.now().toString(),
          speaker,
          text: text.trim(),
          timestamp: new Date(),
        };
        setTranscript((prev) => [...prev, entry]);
      }
    },
    []
  );

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  // Start conversation with character context
  const startConversation = async () => {
    setConnectionError(null); // Clear any previous errors

    try {
      // Check if API key is available
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

      if (!apiKey) {
        console.error(
          "ElevenLabs API key not found. Please set NEXT_PUBLIC_ELEVENLABS_API_KEY in your .env.local file"
        );
        alert(
          "ElevenLabs API key not configured. Please check your environment variables."
        );
        return;
      }

      if (!agentId) {
        console.error(
          "ElevenLabs Agent ID not found. Please set NEXT_PUBLIC_ELEVENLABS_AGENT_ID in your .env.local file"
        );
        alert(
          "ElevenLabs Agent ID not configured. Please check your environment variables."
        );
        return;
      }

      console.log("Starting conversation with agent:", agentId);

      // Start the conversation with the ElevenLabs agent and character-specific configuration
      await conversation.startSession({
        agentId: agentId,
        connectionType: "websocket" as const,
      });

      // Wait a moment for connection to stabilize before sending context

      if (conversation.status === "connected") {
        // Send contextual update to ensure character awareness
        conversation.sendContextualUpdate(
          `You are ${character.name}. ${characterContext.instructions}`
        );
      }
    } catch (error) {
      console.error("Failed to start conversation:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setConnectionError(errorMessage);
      alert(`Failed to start conversation: ${errorMessage}`);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  // Get conversation status
  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";
  const isSpeaking = conversation.isSpeaking;
  // Note: isListening property doesn't exist in the SDK, we'll use micMuted status instead
  const isListening = isConnected && !conversation.micMuted;

  // Memoize the animation userType to prevent unnecessary re-renders
  const animationUserType = useMemo(() => {
    if (isSpeaking) return "agent";
    if (isListening) return "user";
    return "idle";
  }, [isSpeaking, isListening]);

  // Monitor connection status and handle unexpected disconnections
  useEffect(() => {
    if (conversation.status === "disconnected" && transcript.length > 0) {
      console.log("Conversation disconnected unexpectedly");
    }
  }, [conversation.status, transcript.length]);

  return (
    <div className="min-h-screen flex flex-col p-6 relative">
      <motion.div
        className="mb-6 flex flex-wrap items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {character.name}
          </h1>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isConnected
                ? "bg-green-500/20 text-green-300"
                : isConnecting
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {isConnected
              ? "🔊 Connected"
              : isConnecting
              ? "⏳ Connecting..."
              : "❌ Disconnected"}
          </div>
          {connectionError && (
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-300 max-w-xs truncate">
              ⚠️ {connectionError}
            </div>
          )}
        </div>{" "}
        <div className="flex gap-3">
          {!isConnected ? (
            <motion.button
              onClick={startConversation}
              disabled={isConnecting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 
                         text-white rounded-full font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isConnecting ? "Connecting..." : "🎙️ Start Conversation"}
            </motion.button>
          ) : (
            <motion.button
              onClick={endConversation}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🛑 End Conversation
            </motion.button>
          )}

          <motion.button
            onClick={onBack}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full flex gap-6">
        {/* Voice Animation Section */}
        <div className="flex-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0 w-full h-full">
              <VoiceInteractionAnimation userType={animationUserType} />
            </div>

            {/* Current Speaking Indicator */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              {/* {isListening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4"
                >
                  <div className="text-blue-400 text-lg font-medium mb-2">
                    🎤 Listening...
                  </div>
                  {currentUserText && (
                    <div className="text-white/80 bg-black/30 rounded-lg p-3 max-w-md">
                      {currentUserText}
                    </div>
                  )}
                </motion.div>
              )} */}

              {/* {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4"
                >
                  <div className="text-green-400 text-lg font-medium mb-2">
                    🔊 {character.name} Speaking...
                  </div>
                  {currentAgentText && (
                    <div className="text-white/80 bg-black/30 rounded-lg p-3 max-w-md">
                      {currentAgentText}
                    </div>
                  )}
                </motion.div>
              )}

              {currentAgentText && !isSpeaking && currentAgentText !== "" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4"
                >
                  <div className="text-yellow-400 text-lg font-medium mb-2">
                    💭 {character.name} Thinking...
                  </div>
                  <div className="text-white/80 bg-black/30 rounded-lg p-3 max-w-md">
                    {currentAgentText}
                  </div>
                </motion.div>
              )} */}

              {/* {!isConnected && !isConnecting && (
                <div className="text-white/60">
                  <div className="text-2xl mb-2">{character.emoji}</div>
                  <p className="text-lg">
                    Click &quot;Start Conversation&quot; to begin talking with{" "}
                    {character.name}
                  </p>
                  <p className="text-sm mt-2 text-white/40">
                    Powered by ElevenLabs Conversational AI
                  </p>
                  <div className="mt-4 p-4 bg-black/20 rounded-lg max-w-md">
                    <p className="text-xs text-white/60 leading-relaxed">
                      <strong>Character Context:</strong>
                      <br />
                      {characterContext.background}
                    </p>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        <TranscriptSection
          transcript={transcript}
          character={character}
          transcriptEndRef={transcriptEndRef}
        />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
