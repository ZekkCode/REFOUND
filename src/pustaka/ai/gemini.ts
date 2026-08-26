/**
 * Google AI Studio (Gemini API) Client & REST Adapter
 * 
 * Menggunakan endpoint REST resmi Google AI Studio (Free Tier):
 * - Model Teks & Reasoning: gemini-2.5-flash / gemini-1.5-flash
 * - Model Embedding: text-embedding-004 (768 dimensi)
 * 
 * Zero external package bloat - menggunakan native fetch dengan timeout & error handling.
 */

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

export interface GeminiConfig {
  apiKey: string;
  modelChat?: string;
  modelEmbedding?: string;
}

export function dapatkanGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || '';
}

export function isGeminiTersedia(): boolean {
  const key = dapatkanGeminiApiKey();
  return Boolean(key && !key.includes('your-') && !key.includes('mock-') && key.trim().length > 10);
}

/**
 * Generate Text Embedding menggunakan Gemini text-embedding-004 (768 Dimensi)
 */
export async function geminiEmbedText(
  teks: string,
  apiKey: string = dapatkanGeminiApiKey()
): Promise<number[] | null> {
  if (!apiKey) return null;

  const url = `${GEMINI_API_BASE}/models/text-embedding-004:embedContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/text-embedding-004',
      content: {
        parts: [{ text: teks }],
      },
    }),
    signal: AbortSignal.timeout(8000), // 8 detik timeout
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Gemini API Error] Embed failed (${response.status}):`, errorText);
    return null;
  }

  const json = await response.json();
  return json.embedding?.values || null;
}

/**
 * Generate Structured Content / Reasoning menggunakan Gemini 2.5 Flash / 1.5 Flash
 */
export async function geminiGenerateContent(
  prompt: string,
  formatJson: boolean = false,
  apiKey: string = dapatkanGeminiApiKey(),
  model: string = 'gemini-2.5-flash'
): Promise<string | null> {
  if (!apiKey) return null;

  const url = `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`;

  const bodyPayload: any = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
    },
  };

  if (formatJson) {
    bodyPayload.generationConfig.responseMimeType = 'application/json';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload),
    signal: AbortSignal.timeout(10000), // 10 detik timeout
  });

  if (!response.ok) {
    // Fallback ke gemini-1.5-flash jika model 2.5 belum tersedia di region user
    if (model === 'gemini-2.5-flash') {
      return geminiGenerateContent(prompt, formatJson, apiKey, 'gemini-1.5-flash');
    }
    const errorText = await response.text();
    console.error(`[Gemini API Error] Generate content failed (${response.status}):`, errorText);
    return null;
  }

  const json = await response.json();
  const textOutput = json.candidates?.[0]?.content?.parts?.[0]?.text;
  return textOutput || null;
}
