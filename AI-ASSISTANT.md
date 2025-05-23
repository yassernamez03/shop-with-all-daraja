# AI Assistant Integration with Groq API

This project includes an AI assistant powered by Groq API to help users with their shopping experience.

## Setting Up the Groq API

1. Create an account at [Groq Console](https://console.groq.com/)
2. Generate an API key from the [Keys section](https://console.groq.com/keys)
3. Copy the `.env.example` file to a new file named `.env`
4. Replace `your_groq_api_key_here` with your actual Groq API key

```bash
cp .env.example .env
```

Then edit the `.env` file and add your API key:

```
VITE_GROQ_API_KEY=your_actual_api_key_here
```

## How the AI Assistant Works

The AI assistant integrates with the Groq API to provide intelligent responses to user queries about products, navigation, and shopping assistance. It supports both Arabic and English languages to provide a multilingual shopping experience.

### Key Features

- Multilingual support (Arabic/English)
- Product recommendations
- Shopping assistance
- Contextual conversation
- Integration with the existing accessibility-focused UI

### Technical Implementation

The AI assistant is built using:

- React hooks for state management
- Groq API for LLM capabilities
- shadcn/ui components for the user interface
- Responsive design that works with the existing high-contrast mode

## Usage

Click on the AI assistant button (robot icon) in the bottom right corner of the screen to start a conversation with the AI assistant. You can ask questions about products, get recommendations, or request help with navigating the site.
