import { useEffect, useState } from 'react';
import { BirthdayIntro } from './components/BirthdayIntro';
import { PuzzleGame } from './components/PuzzleGame/PuzzleGame';
import { WishMessage } from './components/WishMessage';
import '../styles/styles.css';
import '../styles/intro.css';

// Tunisia observes UTC+1. This is 9 September 2026, 00:00 in Tunisia.
const UNLOCK_TIME = new Date('2026-09-08T23:00:00.000Z').getTime();
const OPEN_NOW = false;

function formatRemaining(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function BirthdayLock({ onUnlock }: { onUnlock: () => void }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (now >= UNLOCK_TIME) onUnlock();
  }, [now, onUnlock]);

  const remaining = formatRemaining(UNLOCK_TIME - now);

  return (
    <main className="birthday-lock" aria-live="polite">
      <section className="birthday-lock__card">
        <div className="birthday-lock__sparkles" aria-hidden="true">✦ &nbsp; ♡ &nbsp; ✦</div>
        <span className="birthday-lock__icon" aria-hidden="true">🔒</span>
        <p className="birthday-lock__eyebrow">A little birthday surprise</p>
        <h1>Not quite yet</h1>
        <p className="birthday-lock__message">
          This site will open on 9 September 2026 at 00:00, Tunisia time.
        </p>
        <div className="birthday-lock__countdown" aria-label="Time remaining until the surprise opens">
          {Object.entries(remaining).map(([label, value]) => (
            <div className="birthday-lock__unit" key={label}>
              <span>{String(value).padStart(2, '0')}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <p className="birthday-lock__note">Come back when the countdown reaches zero. 🌹</p>
      </section>
    </main>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('intro');
  const [isUnlocked, setIsUnlocked] = useState(() => OPEN_NOW || Date.now() >= UNLOCK_TIME);

  if (!isUnlocked) {
    return <BirthdayLock onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="size-full flex items-center justify-center">
      {currentView === 'intro' && (
        <BirthdayIntro onStart={() => setCurrentView('puzzle')} />
      )}
      {currentView === 'puzzle' && (
        <PuzzleGame onHeartClick={() => setCurrentView('typewriter')} />
      )}
      {currentView === 'typewriter' && <WishMessage />}
    </div>
  );
}
