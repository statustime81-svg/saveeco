import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/saveeco-logo.png";
import "./InitialLoadingScreen.css";

type LoaderPhase = "visible" | "leaving" | "hidden";

const MIN_DISPLAY_MS = 850;
const LOAD_FALLBACK_MS = 1800;
const FADE_OUT_MS = 420;

export default function InitialLoadingScreen() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  const [phase, setPhase] = useState<LoaderPhase>(
    isAdminRoute ? "hidden" : "visible",
  );

  useEffect(() => {
    if (isAdminRoute) {
      setPhase("hidden");
      return;
    }

    setPhase("visible");
    const startedAt = performance.now();
    let hideTimer = 0;
    let removeTimer = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);

      const remaining = Math.max(
        0,
        MIN_DISPLAY_MS - (performance.now() - startedAt),
      );

      hideTimer = window.setTimeout(() => {
        setPhase("leaving");
        removeTimer = window.setTimeout(() => setPhase("hidden"), FADE_OUT_MS);
      }, remaining);
    };

    const fallbackTimer = window.setTimeout(finish, LOAD_FALLBACK_MS);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, [isAdminRoute]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`saveeco-intro-loader ${phase === "leaving" ? "is-leaving" : ""}`}
      role="status"
      aria-label="Loading Save Eco Organic website"
      aria-hidden={phase === "leaving"}
    >
      <div className="saveeco-intro-loader__content">
        <div className="saveeco-intro-loader__mark">
          <span className="saveeco-intro-loader__ring" aria-hidden="true" />
          <img src={logo} alt="" />
        </div>
        <p className="saveeco-intro-loader__caption">Preparing your experience</p>
        <span className="saveeco-intro-loader__track" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>
  );
}
