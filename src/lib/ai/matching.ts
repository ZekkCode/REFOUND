/**
 * REFOUND AI Matching & Scoring Engine
 * Formula: MatchScore = 0.45 * Text + 0.30 * Visual + 0.15 * Location + 0.10 * Time
 */

export interface MatchScores {
  textScore: number;
  visualScore: number;
  locationScore: number;
  timeScore: number;
  finalScore: number;
}

export function calculateMatchScore(
  textSimilarity: number,
  visualSimilarity: number,
  sameZone: boolean,
  hoursDifference: number
): MatchScores {
  // 1. Text Similarity (0-1)
  const textScore = Math.max(0, Math.min(1, textSimilarity));

  // 2. Visual Similarity (0-1) - fallback if no photo
  const visualScore = Math.max(0, Math.min(1, visualSimilarity));

  // 3. Location Score (1.0 if exact zone, 0.5 if nearby/same building)
  const locationScore = sameZone ? 1.0 : 0.5;

  // 4. Time Score (decay based on hours gap, max 72h)
  const timeScore = Math.max(0, 1 - hoursDifference / 72);

  // Score Fusion Weighting
  const finalScore = Number(
    (
      0.45 * textScore +
      0.30 * visualScore +
      0.15 * locationScore +
      0.10 * timeScore
    ).toFixed(4)
  );

  return {
    textScore,
    visualScore,
    locationScore,
    timeScore,
    finalScore,
  };
}

// ponytail: Basic Mock LLM Verification response generator. Upgrade path: Connect to OpenAI API via Server Action / Route Handler when API keys set.
export async function verifyClaimAnswer(
  secretNotes: string,
  userAnswer: string
): Promise<{ semanticScore: number; reasoning: string }> {
  if (!userAnswer || userAnswer.trim() === '') {
    return { semanticScore: 0, reasoning: 'Jawaban kosong' };
  }

  // Simplified string match fallback logic
  const isMatch = userAnswer.toLowerCase().includes(secretNotes.toLowerCase());
  const score = isMatch ? 0.95 : 0.4;

  return {
    semanticScore: score,
    reasoning: isMatch
      ? 'Jawaban pengguna sangat mendekati ciri rahasia admin.'
      : 'Jawaban pengguna perlu ditinjau manual oleh Admin Lab.',
  };
}
