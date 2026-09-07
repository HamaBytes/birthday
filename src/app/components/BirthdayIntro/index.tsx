import { Heart, Sparkles } from 'lucide-react';
import { INTRO_MESSAGES } from '../../data/messages';

// THIS FUNC SHOWS THE BIRTHDAY INTRO SCREEN WITH MESSAGES AND STYLING
const roseGarden = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${3 + ((index * 29) % 94)}%`,
  top: `${4 + ((index * 17) % 88)}%`,
  delay: `${-(index * 0.6)}s`,
  size: `${1 + (index % 3) * 0.28}rem`,
}));

export function BirthdayIntro({ onStart }) {
  return (
    <div className="intro-container">
      <div className="intro-rose-garden" aria-hidden="true">
        {roseGarden.map((rose) => (
          <span
            className="intro-floating-rose"
            key={rose.id}
            style={{ left: rose.left, top: rose.top, animationDelay: rose.delay, fontSize: rose.size }}
          >
            🌹
          </span>
        ))}
      </div>
      <div className="intro-content">
        <div className="intro-card-shine" aria-hidden="true" />
        <div className="intro-rose-corner intro-rose-corner--left" aria-hidden="true">🌹</div>
        <div className="intro-rose-corner intro-rose-corner--right" aria-hidden="true">🌹</div>
        <div className="intro-decoration intro-decoration-top">
          <Heart className="intro-icon intro-heart-1" />
          <Sparkles className="intro-icon intro-sparkle-1" />
          <Heart className="intro-icon intro-heart-2" />
        </div>

        <div className="intro-text-section">
          <p className="intro-kicker">A birthday surprise for someone special</p>
          <h1 className="intro-title">{INTRO_MESSAGES.title}</h1>

          <p className="intro-subtitle">
            {INTRO_MESSAGES.subtitle}
          </p>

          <div className="intro-message">
            <p className="intro-paragraph intro-paragraph-1">
              {INTRO_MESSAGES.description1}
            </p>
            <p className="intro-paragraph intro-paragraph-2">
              {INTRO_MESSAGES.description2}
            </p>
          </div>
        </div>

        <div className="intro-decoration intro-decoration-bottom">
          <Sparkles className="intro-icon intro-sparkle-2" />
          <Heart className="intro-icon intro-heart-3" />
          <Sparkles className="intro-icon intro-sparkle-3" />
        </div>

        <button className="intro-button" onClick={onStart}>
          <span>🌹</span> {INTRO_MESSAGES.button} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
