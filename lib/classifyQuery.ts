import { COMPLEX_KEYWORDS, SIMPLE_KEYWORDS } from "./constants";

export interface ClassificationResult {
  type: "COMPLEX" | "SIMPLE";
  confidence: number;
  matchedKeywords: string[];
  model: string;
  cost: string;
  reason: string;
}

export function classifyQuery(query: string): ClassificationResult {
  const lower = query.toLowerCase();

  const complexMatches = COMPLEX_KEYWORDS.filter((kw) => lower.includes(kw));
  const simpleMatches = SIMPLE_KEYWORDS.filter((kw) => lower.includes(kw));

  if (complexMatches.length > 0) {
    return {
      type: "COMPLEX",
      confidence: Math.min(0.95, 0.6 + complexMatches.length * 0.15),
      matchedKeywords: complexMatches,
      model: "Claude Sonnet",
      cost: "~₹0.05",
      reason: `Matched complex keywords: ${complexMatches.join(", ")}`,
    };
  }

  if (simpleMatches.length > 0) {
    return {
      type: "SIMPLE",
      confidence: Math.min(0.95, 0.6 + simpleMatches.length * 0.15),
      matchedKeywords: simpleMatches,
      model: "Qwen 2.5 (Local)",
      cost: "₹0.00",
      reason: `Matched simple keywords: ${simpleMatches.join(", ")}`,
    };
  }

  // Default to COMPLEX
  return {
    type: "COMPLEX",
    confidence: 0.5,
    matchedKeywords: [],
    model: "Claude Sonnet",
    cost: "~₹0.05",
    reason: "No keyword match — defaulting to COMPLEX (safer)",
  };
}
