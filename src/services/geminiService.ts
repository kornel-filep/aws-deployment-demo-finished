import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  initialize(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  isInitialized(): boolean {
    return this.model !== null;
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini service not initialized. Please provide an API key.');
    }

    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw new Error('Failed to get response from Gemini. Please check your API key and try again.');
    }
  }
}

export const geminiService = new GeminiService();

