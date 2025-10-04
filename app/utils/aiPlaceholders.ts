// AI Placeholder Functions
// These will be replaced with real AI integrations later

export interface CharacterData {
  id: string;
  name: string;
  emoji: string;
  story: string;
  color: string;
}

export function generateText(character: string): string {
  const stories: Record<string, string> = {
    farmer: "When space weather hits, my crops can be affected! Solar storms can disrupt GPS systems that help me plant seeds in perfect rows. Sometimes the aurora is so beautiful I can see it from my fields, but I know it means the sun is very active and I should check my weather apps for any alerts.",
    pilot: "Space weather is crucial for aviation! Solar storms can disrupt radio communications and GPS navigation. When there's high solar activity, we might need to fly at lower altitudes or take different routes. The aurora is beautiful from up here, but it's also a sign that we need to be extra careful with our navigation systems.",
    astronaut: "From space, I can see the sun's activity directly! Solar flares and coronal mass ejections can be dangerous for astronauts. We have special shielding and monitoring systems to protect us. The aurora looks amazing from the International Space Station - it's like watching Earth's magnetic field dance with the solar wind!",
    operator: "Space weather can cause power outages! When solar storms hit Earth's magnetic field, they can create electrical currents in power lines. We monitor space weather forecasts 24/7 and can take protective measures like reducing power flow or switching to backup systems. It's like preparing for a cosmic storm!",
    public: "Space weather affects everyone! It can impact our phones, internet, and even cause beautiful auroras. I love watching the northern lights, but I also know they mean the sun is very active. I check space weather apps to know when to expect auroras and when to be prepared for potential disruptions to technology."
  };

  return stories[character] || "Space weather affects us all in different ways!";
}

export function generateImage(character: string): string {
  const imageMap: Record<string, string> = {
    farmer: '/images/farmer.svg',
    pilot: '/images/pilot.svg',
    astronaut: '/images/astronaut.svg',
    operator: '/images/operator.svg',
    public: '/images/public.svg'
  };

  return imageMap[character] || '/images/public.svg';
}

export function generateCharacterData(character: string): CharacterData {
  const characterMap: Record<string, CharacterData> = {
    farmer: {
      id: 'farmer',
      name: '👩‍🌾 Farmer Sarah',
      emoji: '🌾',
      story: generateText('farmer'),
      color: 'bg-yellow-500'
    },
    pilot: {
      id: 'pilot',
      name: '👨‍✈️ Captain Mike',
      emoji: '✈️',
      story: generateText('pilot'),
      color: 'bg-blue-500'
    },
    astronaut: {
      id: 'astronaut',
      name: '👩‍🚀 Commander Alex',
      emoji: '🚀',
      story: generateText('astronaut'),
      color: 'bg-purple-500'
    },
    operator: {
      id: 'operator',
      name: '⚡ Grid Operator Lisa',
      emoji: '⚡',
      story: generateText('operator'),
      color: 'bg-orange-500'
    },
    public: {
      id: 'public',
      name: '🙂 Community Member',
      emoji: '🌟',
      story: generateText('public'),
      color: 'bg-green-500'
    }
  };

  return characterMap[character] || characterMap.public;
}

// Future AI integration points
export async function generateAIText(character: string, context?: string): Promise<string> {
  // TODO: Integrate with OpenAI, Claude, or other AI service
  // This would generate dynamic, personalized stories based on character and context
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For now, return enhanced placeholder text
  const baseStory = generateText(character);
  const enhancedStory = context 
    ? `${baseStory}\n\n${context}`
    : baseStory;
    
  return enhancedStory;
}

export async function generateAIImage(character: string, style?: string): Promise<string> {
  // TODO: Integrate with DALL-E, Midjourney, or other image generation service
  // This would generate custom character illustrations
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For now, return placeholder image path
  return generateImage(character);
}

// New API-ready functions for chat interface
export async function generateCharacterStory(characterId: string): Promise<{
  text: string;
  imageUrl: string;
  timestamp: Date;
}> {
  const [text, imageUrl] = await Promise.all([
    generateAIText(characterId),
    generateAIImage(characterId)
  ]);
  
  return {
    text,
    imageUrl,
    timestamp: new Date()
  };
}

export async function generateFollowUpResponse(characterId: string, userMessage: string): Promise<string> {
  // TODO: Implement real AI conversation
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const responses: Record<string, string[]> = {
    farmer: [
      "That's a great question about farming! Let me tell you more about how GPS precision farming works...",
      "I'm glad you're interested in agriculture! Space weather affects our irrigation systems too...",
      "You're right to ask about that! Many farmers don't realize how dependent we are on satellite technology..."
    ],
    pilot: [
      "Excellent question about aviation! Let me explain how we monitor space weather in real-time...",
      "That's exactly what we pilots think about! Our communication systems are especially vulnerable...",
      "Great point! I should mention that we also have backup navigation systems for these situations..."
    ],
    astronaut: [
      "Fascinating question! From up here, I can actually see the aurora dancing across Earth...",
      "That's something we astronauts think about daily! Our life support systems are designed to handle...",
      "You're absolutely right to ask! The International Space Station has special shielding because..."
    ],
    operator: [
      "That's a crucial question for power grid operations! We have multiple layers of protection...",
      "Excellent point! Many people don't realize that power grids are like giant antennas...",
      "You're thinking like a grid operator! We actually have real-time monitoring systems that..."
    ],
    public: [
      "That's exactly what I wondered when I first learned about space weather! It affects...",
      "Great question! I used to think space weather was just about pretty auroras, but it's so much more...",
      "You're right to be curious! I check space weather apps daily now because..."
    ]
  };
  
  const characterResponses = responses[characterId] || responses.public;
  return characterResponses[Math.floor(Math.random() * characterResponses.length)];
}
