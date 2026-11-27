import {
  useCallback,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./LoadingButton.css";

type LoadingButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  children: ReactNode;
  loadingText?: string;
  /** Return/await the real async work here, or control loading with `loading`. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
  /** Use this for forms whose async work is handled by the form's onSubmit. */
  loading?: boolean;
  /** Keep a brief loading state for fast synchronous actions. */
  minimumLoadingMs?: number;
};

const DEFAULT_MIN_LOADING_MS = 360;

export default function LoadingButton({
  children,
  loadingText = "Please wait...",
  onClick,
  loading = false,
  disabled = false,
  minimumLoadingMs = DEFAULT_MIN_LOADING_MS,
  className = "",
  type = "button",
  ...buttonProps
}: LoadingButtonProps) {
  const [isRunning, setIsRunning] = useState(false);
  const locked = useRef(false);
  const isLoading = loading || isRunning;

  const handleClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading || locked.current) {
        event.preventDefault();
        return;
      }

      // The ref locks synchronously, before React has time to render disabled.
      locked.current = true;
      setIsRunning(true);
      const startedAt = performance.now();

      try {
        await onClick?.(event);
      } finally {
        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(0, minimumLoadingMs - elapsed);
        if (remaining) {
          await new Promise((resolve) => window.setTimeout(resolve, remaining));
        }
        locked.current = false;
        setIsRunning(false);
      }
    },
    [disabled, loading, minimumLoadingMs, onClick],
  );

  return (
    <button
      {...buttonProps}
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`saveeco-loading-button ${className}`.trim()}
    >
      {isLoading ? (
        <>
          <span className="saveeco-loading-button__spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
