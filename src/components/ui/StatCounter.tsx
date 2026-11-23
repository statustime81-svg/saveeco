import { useEffect, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
};

export default function StatCounter({
  value,
  suffix = "",
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const duration = 900;
    let startTime = 0;

    const update = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setDisplayValue(Math.round(progress * value));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    frameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}