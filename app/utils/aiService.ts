// Real AI Service Integration
// Replace static content with dynamic AI-generated responses

interface AIResponse {
  text: string;
  imageUrl?: string;
  timestamp: Date;
}

interface CharacterContext {
  characterId: string;
  characterName: string;
  previousMessages?: string[];
}

// OpenAI API Integration
export async function generateAIResponse(
  character: CharacterContext,
  prompt: string,
  apiKey: string
): Promise<AIResponse> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are ${character.characterName}, a space weather expert. Respond in first person as this character, sharing personal experiences about how space weather affects your profession. Keep responses conversational and educational, suitable for children.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    return {
      text: data.choices[0].message.content,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('AI API Error:', error);
    // Fallback to static content
    return {
      text: getFallbackResponse(character.characterId),
      timestamp: new Date()
    };
  }
}

// DALL-E Image Generation
export async function generateAIImage(
  character: CharacterContext,
  prompt: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `A colorful, kid-friendly illustration showing ${character.characterName} experiencing space weather. ${prompt}. Cartoon style, bright colors, educational.`,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      }),
    });

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Image Generation Error:', error);
    // Fallback to static image
    return `/images/${character.characterId}.svg`;
  }
}

// Character-specific story generation
export async function generateCharacterStory(
  character: CharacterContext,
  apiKey: string
): Promise<AIResponse[]> {
  const prompts = [
    `Introduce yourself and explain how space weather affects your work as a ${character.characterName}`,
    `Share a specific example of when space weather impacted your daily activities`,
    `Describe what space weather looks like from your perspective`,
    `Explain what you've learned about space weather and how it connects us all`
  ];

  const responses: AIResponse[] = [];
  
  for (const prompt of prompts) {
    const response = await generateAIResponse(character, prompt, apiKey);
    responses.push(response);
    
    // Add delay between API calls to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return responses;
}

// Real-time conversation
export async function generateFollowUpResponse(
  character: CharacterContext,
  userMessage: string,
  apiKey: string
): Promise<AIResponse> {
  const prompt = `The user just said: "${userMessage}". Respond as ${character.characterName} and continue the conversation about space weather.`;
  
  return await generateAIResponse(character, prompt, apiKey);
}

// Fallback responses (used when API fails)
function getFallbackResponse(characterId: string): string {
  const fallbacks: Record<string, string> = {
    farmer: "I'm a farmer, and space weather affects my GPS systems for planting crops!",
    pilot: "As a pilot, space weather can disrupt our navigation systems during flights.",
    astronaut: "From space, I can see the sun's activity and how it affects Earth!",
    operator: "I monitor power grids and protect them from space weather disruptions.",
    public: "Space weather affects everyone's daily life in different ways!"
  };
  
  return fallbacks[characterId] || "Space weather is fascinating and affects us all!";
}

// Environment configuration
export const AI_CONFIG = {
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  ENABLE_AI: process.env.NEXT_PUBLIC_ENABLE_AI === 'true',
  FALLBACK_MODE: process.env.NEXT_PUBLIC_FALLBACK_MODE === 'true'
};
