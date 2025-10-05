# ElevenLabs Conversational AI Setup

## Environment Variables

To use the ElevenLabs Conversational AI, you need to set up the following environment variables in your `.env.local` file:

1. **NEXT_PUBLIC_ELEVENLABS_API_KEY**: Your ElevenLabs API key

   - Get this from your ElevenLabs dashboard at https://elevenlabs.io
   - Navigate to Profile & API Key to find your API key

2. **NEXT_PUBLIC_ELEVENLABS_AGENT_ID**: Your conversational agent ID
   - Create a conversational agent in your ElevenLabs dashboard
   - Copy the agent ID from the agent settings

## Setup Steps

1. Sign up for ElevenLabs account at https://elevenlabs.io
2. Create a new conversational agent in the dashboard
3. Copy your API key and agent ID
4. Update the `.env.local` file with your credentials:

```env
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_actual_agent_id_here
```

5. Restart your development server after adding the environment variables

## Features Implemented

- Real-time voice conversation with ElevenLabs AI
- Live transcript display showing both user and agent messages
- Connection status indicators
- Start/End conversation controls
- Real-time speech-to-text and text-to-speech
- Visual feedback during speaking/listening states
- Auto-scrolling transcript
- Responsive design with proper mobile support

## Usage

1. Click "Start Conversation" to begin
2. Speak naturally - the AI will listen and respond
3. View the live transcript on the right side
4. Use "End Conversation" to stop the session
5. Transcripts are not stored - they reset when the session ends
