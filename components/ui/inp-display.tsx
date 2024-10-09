'use client'

import { useState, useEffect } from 'react'

const RATING_COLORS = {
  good: "#0CCE6A",
  "needs-improvement": "#FFA400",
  poor: "#FF4E42"
} as const;

type Rating = keyof typeof RATING_COLORS;

interface INPDisplayProps {
  lastInteractionTime: number | null;
}

export default function INPDisplay({ lastInteractionTime }: INPDisplayProps) {
  const [inpValue, setInpValue] = useState<number | null>(null);
  const [inpRating, setInpRating] = useState<Rating | null>(null);

  useEffect(() => {
    if (lastInteractionTime !== null) {
      setInpValue(lastInteractionTime);
      setInpRating(getRating(lastInteractionTime));
    }
  }, [lastInteractionTime]);

  const getRating = (value: number): Rating => {
    if (value <= 200) return "good";
    if (value <= 500) return "needs-improvement";
    return "poor";
  };

  const getRatingColor = (rating: Rating | null): string => {
    return rating ? RATING_COLORS[rating] : 'inherit';
  };

  return (
    <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Interaction to Next Paint (INP)</h2>
      {inpValue !== null ? (
        <div>
          <span className="text-2xl font-bold" style={{ color: getRatingColor(inpRating) }}>
            {inpValue.toFixed(0)} ms
          </span>
          <span className="ml-2 text-sm" style={{ color: getRatingColor(inpRating) }}>
            ({inpRating})
          </span>
        </div>
      ) : (
        <div>Waiting for interaction...</div>
      )}
    </div>
  );
}