# Gemini Chat Application

A modern, single-page React application that provides a chat interface for Google's Gemini AI model.
Made as part of a class demo for deploying to AWS.

## Features

- 💬 Real-time chat with Google Gemini AI
- 🎨 Clean, modern UI with Tailwind CSS
- 🔒 Secure API key storage (localStorage)
- 📱 Responsive design
- ⚡ Built with Vite for fast development

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Google Generative AI** - Gemini API integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Enter your Gemini API key when prompted

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ApiKeyInput.tsx
│   ├── ChatInput.tsx
│   ├── ChatInterface.tsx
│   └── MessageBubble.tsx
├── services/           # API services
│   └── geminiService.ts
├── types.ts           # TypeScript types
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Usage

1. On first launch, you'll be prompted to enter your Google Gemini API key
2. The API key is stored locally in your browser
3. Start chatting with Gemini by typing messages in the input field
4. Press Enter or click Send to submit your message

## AWS Deployment

This application includes AWS CDK infrastructure for deployment to AWS using S3 and CloudFront.

Quick deploy:
```bash
# Default AWS profile
./scripts/deploy.sh

# Specific profile
./scripts/deploy.sh --profile personal
```

## Notes

- Your API key is stored in localStorage and never sent anywhere except to Google's Gemini API
- The app uses the `gemini-2.5-flash` model by default

