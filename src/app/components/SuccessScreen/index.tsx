import heartImg from "../../../images/heart.png";
import { HEART_CLICK_PROMPT, SUCCESS_MESSAGES } from "../../data/messages";

export function SuccessScreen({ onHeartClick }) {
  return (
    <div className="success-container">
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-6 left-6 text-3xl animate-pulse">🌹</span>
        <span className="absolute top-6 right-6 text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🌹</span>
        <span className="absolute bottom-10 left-10 text-3xl animate-pulse" style={{ animationDelay: '1.1s' }}>🌹</span>
      </div>
      <div className="message-container">
       <div className="message-text">{SUCCESS_MESSAGES.completed}</div>
        <button className="complete-heart success-heart-button" onClick={onHeartClick} aria-label={HEART_CLICK_PROMPT}>
          <img src={heartImg} alt="complete-heart" className="complete-heart-image" draggable={false} />
        </button>
        <button className="success-click-prompt" onClick={onHeartClick}>
          <span className="success-click-prompt__sparkle">✦</span>
          {HEART_CLICK_PROMPT}
          <span className="success-click-prompt__sparkle">✦</span>
        </button>
        <div className="message-text">{SUCCESS_MESSAGES.instruction}</div>
        <div className="message-para puzzle-hint">💡{SUCCESS_MESSAGES.cta}</div>
      </div>
    </div>
  );
}
