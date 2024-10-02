'use client'

import { useState, useEffect } from 'react'

const RATING_COLORS = {
  good: "#0CCE6A",
  "needs-improvement": "#FFA400",
  poor: "#FF4E42"
} as const;

type Rating = keyof typeof RATING_COLORS;

interface InteractionData {
  value: number;
  rating: Rating;
}

function onInteraction(callback: (data: InteractionData) => void): () => void {
  const valueToRating = (score: number): Rating =>
    score <= 200 ? "good" : score <= 500 ? "needs-improvement" : "poor";

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'event') {
        const value = entry.duration;
        const rating = valueToRating(value);
        callback({ value, rating });
      }
    }
  });

  observer.observe({ 
    type: 'event', 
    buffered: true
  });

  return () => observer.disconnect();
}

export default function INPDisplay() {
  const [inpValue, setInpValue] = useState<number | null>(null);
  const [inpRating, setInpRating] = useState<Rating | null>(null);

  useEffect(() => {
    const cleanup = onInteraction(({ value, rating }) => {
      setInpValue(value);
      setInpRating(rating);
    });

    return cleanup;
  }, []);

  const getRatingColor = (rating: Rating | null): string => {
    return rating ? RATING_COLORS[rating] : 'inherit';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
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