import { useState, useEffect } from 'react';

const RATING_COLORS = {
  good: "#0CCE6A",
  "needs-improvement": "#FFA400",
  poor: "#FF4E42"
};

interface ExtendedPerformanceEntry extends PerformanceEntry {
  target?: EventTarget;
}

interface InteractionData {
  value: number;
  rating: string;
  attribution: {
    eventEntry: ExtendedPerformanceEntry;
    eventTarget: EventTarget | null;
    eventTime: number;
    eventType: string;
  };
  entries: ExtendedPerformanceEntry[];
}

function onInteraction(callback: (data: InteractionData) => void): () => void {
  const valueToRating = (score: number) =>
    score <= 200 ? "good" : score <= 500 ? "needs-improvement" : "poor";

  const observer = new PerformanceObserver((list) => {
    const interactions: { [key: number]: ExtendedPerformanceEntry[] } = {};

    for (const entry of list.getEntries().filter((entry) => (entry as any).interactionId)) {
      const interactionId = (entry as any).interactionId;
      interactions[interactionId] = interactions[interactionId] || [];
      interactions[interactionId].push(entry as ExtendedPerformanceEntry);
    }

    for (const interaction of Object.values(interactions)) {
      const entry = interaction.reduce((prev, curr) =>
        prev.duration >= curr.duration ? prev : curr
      );
      const entryTarget = interaction.map(entry => entry.target).find(target => !!target);
      const value = entry.duration;

      callback({
        attribution: {
          eventEntry: entry,
          eventTarget: entryTarget || null,
          eventTime: entry.startTime,
          eventType: entry.name
        },
        entries: interaction,
        rating: valueToRating(value),
        value
      });
    }
  });

  observer.observe({
    type: "event",
    durationThreshold: 0,
    buffered: true
  });

  return () => observer.disconnect();
}

export default function INPDisplay() {
  const [inpValue, setInpValue] = useState<number | null>(null);
  const [inpRating, setInpRating] = useState<string | null>(null);

  useEffect(() => {
    const cleanup = onInteraction(({ value, rating }) => {
      setInpValue(value);
      setInpRating(rating);
    });

    return cleanup;
  }, []);

  const getRatingColor = (rating: string | null) => {
    return rating ? RATING_COLORS[rating as keyof typeof RATING_COLORS] : 'inherit';
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
