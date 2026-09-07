import { useState } from "react";
import { PuzzleColumn } from "./PuzzleColumn";
import { SuccessScreen } from "../SuccessScreen";
import { PUZZLE_MESSAGES } from "../../data/messages";
import { canDrop, getPairedItems, playGlassSlideSound } from "../../utils/puzzleLogic";

const puzzleRoses = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${2 + ((index * 23) % 96)}%`,
  delay: `${-(index * 0.85)}s`,
  size: `${0.9 + (index % 3) * 0.22}rem`,
}));

const initialData = {
  leftCol: [{ sliceId: 1, side: "left" }],
  InProgress: [],
  rightCol: [{ sliceId: 1, side: "right" }],
};

export function PuzzleGame({ onHeartClick }) {
  const [data, setData] = useState(initialData);
  const [dragItem, setDragItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragStart = (section, idx) => {
    setDragItem({
      sourceSection: section,
      idx,
      item: data[section][idx],
    });
  };

  const handleDrop = (targetSection) => {
    if (!canDrop(dragItem, targetSection)) {
      setDragItem(null);
      return;
    }

    const newData = { ...data };
    const [item] = newData[dragItem.sourceSection].splice(dragItem.idx, 1);
    newData[targetSection].push(item);

    setData(newData);
    setDragItem(null);
    playGlassSlideSound();

    const { pairs } = getPairedItems(newData.InProgress);
    if (pairs.length > 0) {
      setTimeout(() => setShowSuccess(true), 800);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  if (showSuccess) {
    return <SuccessScreen onHeartClick={onHeartClick} />;
  }

  return (
    <div className="puzzle-page flex flex-col gap-3 sm:gap-6 lg:gap-10 px-3 sm:px-6 lg:px-10 py-3 sm:py-6 lg:py-10 min-h-full items-center justify-center overflow-x-hidden">
      <div className="puzzle-page__rose-rain" aria-hidden="true">
        {puzzleRoses.map((rose) => <span key={rose.id} style={{ left: rose.left, animationDelay: rose.delay, fontSize: rose.size }}>🌹</span>)}
      </div>
      <p className="puzzle-page__kicker">One small game, one big surprise</p>
      <h1 className="puzzle-page__title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#c9184a] text-center mb-4 sm:mb-6" style={{ textShadow: '0 2px 4px rgba(201, 24, 74, 0.15)', letterSpacing: '-0.5px' }}>
        {PUZZLE_MESSAGES.title}
      </h1>

      <div className="flex flex-col items-center gap-2 sm:gap-3 max-w-[600px] mx-auto mb-6 sm:mb-8">
        <p className="text-base sm:text-lg lg:text-xl text-[#c9184a] font-semibold text-center leading-relaxed tracking-wide">
          {PUZZLE_MESSAGES.instruction1}
        </p>
        <p className="text-sm sm:text-base lg:text-lg text-[#d63a5a] font-medium text-center leading-normal opacity-90">
          {PUZZLE_MESSAGES.instruction2}
        </p>
      </div>

      <div className="puzzle-tutorial" aria-label="How to play">
        <span className="puzzle-tutorial__title">How to open the surprise</span>
        <div className="puzzle-tutorial__steps">
          <span><b>1</b> Pick up a heart half</span>
          <span className="puzzle-tutorial__arrow">→</span>
          <span><b>2</b> Drop it in the middle</span>
          <span className="puzzle-tutorial__arrow">→</span>
          <span><b>3</b> Mend the heart 💗</span>
        </div>
      </div>

      <div className="puzzle-page__board grid grid-cols-[1fr_1.1fr_1fr] gap-2 sm:gap-6 lg:gap-10 items-center justify-items-center w-full max-w-[1400px]">
        {Object.keys(data).map((section) => (
          <PuzzleColumn
            key={section}
            section={section}
            items={data[section]}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      <div className="text-sm sm:text-base text-[#c9184a] text-center font-medium px-4 sm:px-6 py-2 sm:py-4 bg-pink-200/20 border-l-[3px] border-[#ff69b4] rounded-lg mt-4 sm:mt-6 max-w-[500px] mx-auto opacity-85">
        💡 {PUZZLE_MESSAGES.hint}
      </div>
    </div>
  );
}
