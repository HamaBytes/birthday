import { useState, useEffect } from 'react';
import celebrateGif from '../../../images/celebrate.gif';
import { AnimatedText } from './AnimatedText';
import { Heart, Sparkles, MoonStar } from 'lucide-react';
import {
  GOODBYE_LETTER,
  WISH_MESSAGES,
} from '../../data/messages';
import { playHBD, stopHBD } from '../../utils/audioUtils';

//---- BACKGROUND DECORATION ICONS WITH POSITIONS AND STYLING ----//

const decorations = [
  { Icon: Heart, top: 'top-8', left: 'left-8', color: 'text-pink-300/40', size: 'size-8', delay: '0s' },
  { Icon: Heart, top: 'top-20', left: 'right-20', color: 'text-rose-300/30', size: 'size-6', delay: '1s' },
  { Icon: Sparkles, top: 'bottom-20', left: 'left-20', color: 'text-pink-400/50', size: 'size-6', delay: '0.5s' },
  { Icon: Heart, top: 'bottom-32', left: 'right-32', color: 'text-pink-300/40', size: 'size-10', delay: '1.5s' },
  { Icon: Sparkles, top: 'top-40', left: 'right-40', color: 'text-rose-300/40', size: 'size-8', delay: '2s' },
  { Icon: MoonStar, top: 'bottom-10', left: 'left-1/2', color: 'text-rose-400/40', size: 'size-7', delay: '0.3s' },
  { Icon: Heart, top: 'top-1/2', left: 'left-16', color: 'text-pink-200/50', size: 'size-7', delay: '0.8s' },
  { Icon: Sparkles, top: 'bottom-16', left: 'right-16', color: 'text-rose-400/40', size: 'size-5', delay: '1.2s' },
  { Icon: MoonStar, top: 'top-1/4', left: 'left-1/4', color: 'text-rose-400/40', size: 'size-6', delay: '1.8s' },
  // Additional decorations for denser background
  { Icon: Heart, top: 'top-6', left: 'right-6', color: 'text-pink-300/30', size: 'size-5', delay: '0.2s' },
  { Icon: Sparkles, top: 'bottom-6', left: 'left-6', color: 'text-rose-300/25', size: 'size-5', delay: '0.6s' },
  { Icon: MoonStar, top: 'top-12', left: 'right-50', color: 'text-rose-300/30', size: 'size-6', delay: '1.1s' },
  { Icon: Heart, top: 'bottom-8', left: 'right-50', color: 'text-pink-200/30', size: 'size-6', delay: '1.4s' },
  // Extra hearts for more romantic feel
  { Icon: Heart, top: 'top-14', left: 'left-1/3', color: 'text-rose-300/40', size: 'size-6', delay: '0.9s' },
  { Icon: Heart, top: 'top-6', left: 'left-3/4', color: 'text-pink-400/30', size: 'size-5', delay: '1.1s' },
  { Icon: Heart, top: 'bottom-24', left: 'left-40', color: 'text-rose-200/30', size: 'size-7', delay: '0.4s' },
  { Icon: Heart, top: 'top-28', left: 'right-10', color: 'text-pink-300/30', size: 'size-6', delay: '1.6s' },
  { Icon: Heart, top: 'bottom-4', left: 'left-12', color: 'text-rose-300/25', size: 'size-5', delay: '0.7s' },
];

// Additional emoji decorations (roses) to emphasize love theme
const emojiDecorations = [
  { emoji: '🌹', top: 'top-10', left: 'left-20', delay: '0.2s', size: 'text-3xl' },
  { emoji: '🌹', top: 'top-24', left: 'right-24', delay: '0.8s', size: 'text-2xl' },
  { emoji: '🌹', top: 'bottom-28', left: 'left-28', delay: '1.2s', size: 'text-3xl' },
  { emoji: '🌹', top: 'top-1/3', left: 'left-40', delay: '1.6s', size: 'text-2xl' },
  { emoji: '🌹', top: 'bottom-10', left: 'right-10', delay: '0.4s', size: 'text-3xl' },
];

const fallingRoses = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 17) % 92)}%`,
  delay: `${-(index * 0.7)}s`,
  duration: `${10 + (index % 5) * 1.4}s`,
  size: `${1.1 + (index % 3) * 0.25}rem`,
}));

// THIS FUNC SHOWS THE WISH MESSAGES WITH STYLING AND ANIMATIONS
export function WishMessage() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    playHBD();
    return () => stopHBD();
  }, []);

  const handleComplete = () => {
    setTimeout(() => {
      setMessageIndex((prev) => {
        if (prev === WISH_MESSAGES.length - 1) {
          setShowQuestion(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="wish-page size-full flex items-center justify-center relative overflow-hidden min-h-screen">
      <div className="wish-page__glow wish-page__glow--one" />
      <div className="wish-page__glow wish-page__glow--two" />
      <div className="wish-page__roses" aria-hidden="true">
        {fallingRoses.map((rose) => (
          <span
            key={rose.id}
            className="wish-page__falling-rose"
            style={{
              left: rose.left,
              animationDelay: rose.delay,
              animationDuration: rose.duration,
              fontSize: rose.size,
            }}
          >
            🌹
          </span>
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorations.map((dec, idx) => {
          const { Icon, color, size, delay, ...positions } = dec;
          return (
            <Icon
              key={idx}
              className={`absolute ${positions.top} ${positions.left} ${color} ${size} animate-pulse glow-anim`}
              style={{ animationDelay: delay }}
            />
          );
        })}
        {emojiDecorations.map((ed, idx) => (
          <span
            key={`emoji-${idx}`}
            className={`absolute ${ed.top} ${ed.left} ${ed.size} animate-pulse`}
            style={{ animationDelay: ed.delay }}
          >
            {ed.emoji}
          </span>
        ))}
      </div>

      <div className="wish-page__content relative z-10 max-w-3xl mx-auto px-5 sm:px-8">
        {!showQuestion ? (
          <>
            <p className="wish-page__eyebrow">A birthday wish, made with love</p>
            <div className="wish-page__card bg-white/40 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 border border-pink-200/50">
              <div className="wish-page__rose-garland" aria-hidden="true">🌹 · ✦ · 🌹 · ✦ · 🌹</div>
              <div className="flex items-center justify-center gap-3 mb-8">
                <Heart className="text-pink-500 size-8 fill-pink-400" />
                <Sparkles className="text-rose-400 size-6" />
                <Heart className="text-pink-500 size-8 fill-pink-400" />
              </div>

              <div className="min-h-[120px] flex items-center justify-center">
                <p className="text-2xl sm:text-3xl text-center text-pink-900/90 italic leading-relaxed">
                  <AnimatedText
                    key={messageIndex}
                    text={WISH_MESSAGES[messageIndex]}
                    speed={60}
                    onComplete={handleComplete}
                  />
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {WISH_MESSAGES.map((_, index) => (
                  <div
                    key={index}
                    className={`size-2 rounded-full transition-all duration-300 ${
                      index === messageIndex ? 'bg-pink-500 w-8' : 'bg-pink-300/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-pink-700/60 italic text-sm">A message from my heart, one line at a time</p>
            </div>
          </>
        ) : (
          <div className="wish-page__question-screen">
            <div className="wish-page__question-roses" aria-hidden="true">🌹 &nbsp; ✦ &nbsp; 🌹</div>
            <Heart className="wish-page__question-heart text-pink-500 fill-pink-400" />
            <p className="wish-page__eyebrow">For you, Tasnim</p>
            <h1 className="wish-page__question-title">A final letter from my heart</h1>
            <div className="wish-page__question-line" />
            <div className="wish-page__goodbye-letter">
              {GOODBYE_LETTER.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-4 right-4 z-30 pointer-events-none">
        <img
          src={celebrateGif}
          alt="Celebrate"
          className="w-28 sm:w-40 md:w-48 max-w-none block"
        />
      </div>
    </div>
  );
}
