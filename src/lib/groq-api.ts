/**
 * Groq API service for AI completions
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const DEFAULT_MODEL = 'llama3-8b-8192';
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 1024;

/**
 * Creates a chat completion using the Groq API
 */
export async function createChatCompletion({
  messages,
  model = DEFAULT_MODEL,
  temperature = DEFAULT_TEMPERATURE,
  maxTokens = DEFAULT_MAX_TOKENS,
}: ChatCompletionOptions): Promise<string> {  try {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not defined in environment variables');
      return 'I apologize, but I cannot process your request at the moment. The AI service is not properly configured.';
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Groq API error:', error);
      return 'I apologize, but there was an error processing your request. Please try again later.';
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error creating chat completion:', error);
    return 'I apologize, but there was an error processing your request. Please try again later.';
  }
}
