import logo from "../../assets/saveeco-logo.png";
import "./SaveEcoLoader.css";

type SaveEcoLoaderProps = {
  label?: string;
};

export default function SaveEcoLoader({
  label = "Loading...",
}: SaveEcoLoaderProps) {
  return (
    <div className="saveeco-loader" role="status" aria-live="polite">
      <div className="saveeco-loader__mark">
        <span className="saveeco-loader__ring" aria-hidden="true" />
        <img src={logo} alt="Save Eco Organic" />
      </div>
      <span className="saveeco-loader__text">{label}</span>
    </div>
  );
}
