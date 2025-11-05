import React, { useState } from 'react';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Gemini Chat</h2>
        <p className="text-gray-600 mb-6">
          Please enter your Google Gemini API key to start chatting.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Start Chatting
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">
          Your API key is stored locally and never sent to any server except Google's Gemini API.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;

