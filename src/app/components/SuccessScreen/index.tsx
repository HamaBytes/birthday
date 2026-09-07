import heartImg from "../../../images/heart.png";
import { HEART_CLICK_PROMPT, SUCCESS_MESSAGES } from "../../data/messages";

export function SuccessScreen({ onHeartClick }) {
  const roses = [
    ['top-6 left-6', 'text-3xl', '0s'], ['top-6 right-6', 'text-2xl', '0.6s'],
    ['bottom-10 left-10', 'text-3xl', '1.1s'], ['bottom-8 right-12', 'text-3xl', '1.6s'],
    ['top-1/3 left-14', 'text-2xl', '0.3s'], ['top-1/4 right-16', 'text-2xl', '1.3s'],
  ];

  return (
    <div className="success-container success-container--celebration">
      <div className="absolute inset-0 pointer-events-none">
        {roses.map(([position, size, delay], index) => (
          <span className={`success-rose absolute ${position} ${size}`} style={{ animationDelay: delay }} key={index}>🌹</span>
        ))}
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
