import { useState, useEffect } from 'react';
import ApiKeyInput from './components/ApiKeyInput';
import ChatInterface from './components/ChatInterface';
import { geminiService } from './services/geminiService';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      geminiService.initialize(storedApiKey);
      setIsInitialized(true);
    }
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    localStorage.setItem('gemini_api_key', apiKey);
    geminiService.initialize(apiKey);
    setIsInitialized(true);
  };

  return (
    <>
      {isInitialized ? (
        <ChatInterface />
      ) : (
        <ApiKeyInput onSubmit={handleApiKeySubmit} />
      )}
    </>
  );
}

export default App;

