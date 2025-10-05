# ElevenLabs Connection Troubleshooting

## Common Issues and Solutions

### 1. Immediate Disconnection Issue

**Problem**: The conversation connects but immediately disconnects as shown in logs:

```
Status changed: {status: 'connecting'}
Connected to ElevenLabs
Status changed: {status: 'connected'}
Mode changed: {mode: 'speaking'}
Message received: {source: 'ai', message: 'Hello! How can I help you today?'}
Status changed: {status: 'disconnecting'}
Status changed: {status: 'disconnected'}
Disconnected from ElevenLabs
```

**Causes**:

1. **Missing API Key**: The most common cause is missing or invalid `NEXT_PUBLIC_ELEVENLABS_API_KEY`
2. **Invalid Agent ID**: Wrong or non-existent `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`
3. **Account Limits**: ElevenLabs free tier has limited conversation time
4. **Network Issues**: Websocket connection instability

**Solutions**:

1. **Check Environment Variables**:

   ```bash
   # Create .env.local file with:
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_actual_agent_id_here
   ```

2. **Verify API Key**:

   - Log into https://elevenlabs.io
   - Go to Profile & API Key
   - Copy the correct API key
   - Ensure it has Conversational AI permissions

3. **Create/Verify Agent**:

   - Go to https://elevenlabs.io/app/speech-synthesis/conversational-ai
   - Create a new conversational agent if you don't have one
   - Copy the agent ID (not the voice ID)

4. **Check Account Status**:
   - Verify your ElevenLabs account is active
   - Check if you have available conversation minutes
   - Free accounts have limited usage

### 2. Implementation Improvements Made

The ChatUI_elevenlabs.tsx has been updated with:

1. **Better Error Handling**:

   - API key validation before connection
   - Agent ID validation
   - User-friendly error messages
   - Connection error display in UI

2. **Improved Connection Stability**:

   - Added API key to useConversation hook
   - Better cleanup on component unmount
   - Delayed context sending after connection
   - Connection status monitoring

3. **Enhanced User Experience**:
   - Clear error messages when configuration is missing
   - Visual feedback for connection errors
   - Better status indicators

### 3. Setup Instructions

1. **Install Dependencies** (already done):

   ```bash
   npm install @elevenlabs/react @elevenlabs/elevenlabs-js
   ```

2. **Configure Environment**:

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your actual credentials
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

### 4. Testing the Connection

1. Click "Start Conversation"
2. If you see errors, check the browser console for specific issues
3. Common error messages and their solutions:
   - "ElevenLabs API key not configured" → Add valid API key to .env.local
   - "ElevenLabs Agent ID not configured" → Add valid agent ID to .env.local
   - "Failed to start conversation" → Check network connection and account status

### 5. Debug Steps

1. **Check Browser Console**: Look for specific error messages
2. **Verify Environment Variables**: Check if they're loaded correctly
3. **Test API Key**: Try a simple API call outside the app
4. **Check Network**: Ensure websocket connections aren't blocked
5. **Account Verification**: Log into ElevenLabs to check account status

### 6. Alternative Solutions

If issues persist:

1. Try creating a new conversational agent
2. Regenerate your API key
3. Check ElevenLabs service status
4. Contact ElevenLabs support for account-specific issues

The updated component now provides better feedback and should help identify the specific cause of connection issues.
