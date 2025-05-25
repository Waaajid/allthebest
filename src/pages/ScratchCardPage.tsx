import React, { useState, useEffect, useCallback } from 'react';
import ScratchCard from '../components/ScratchCard';
import { Button } from '../components/ui/button';

// Define messages and utility function outside the component for stability
const WINNING_MESSAGES = [
  "🎉 Half Day Friday! Log out at 1 PM! 🎉",
];

const FUNNY_LOSING_MESSAGES = [
  "😬 Oops! Full day for you. Log out at 5 PM!",
  "💻 System says: More coffee, then log out at 5 PM.",
  "📉 Not this time! Your 1 PM dream is... still a dream. See ya at 5!",
  "⏰ Clock's ticking... towards 5 PM! Better luck next Friday!",
  "🚫 Access Denied to Early Logout! Standard 5 PM departure authorized.",
];

const getRandomMessage = (messages: string[]) => messages[Math.floor(Math.random() * messages.length)];

const ATTEMPTS_IN_CYCLE = 3;

const ScratchCardPage: React.FC = () => {
  const cardWidth = 240;
  const cardHeight = 240;

  const [cards, setCards] = useState<Array<{ id: number; type: 'winner' | 'loser'; contentText: string }>>([]);
  const [resetToken, setResetToken] = useState<number>(0);
  const [attemptNumber, setAttemptNumber] = useState<number>(1); // Tracks the current attempt being displayed

  const setupCardsForAttempt = useCallback((targetAttempt: number) => {
    let newCardsSetup;

    if (targetAttempt === 3) {
      // 2 winners, 1 loser ONLY for attempt 3
      const winnerCard1 = { type: 'winner' as 'winner' | 'loser', contentText: getRandomMessage(WINNING_MESSAGES) };
      const winnerCard2 = { type: 'winner' as 'winner' | 'loser', contentText: getRandomMessage(WINNING_MESSAGES) };
      const loserCard1 = { type: 'loser' as 'winner' | 'loser', contentText: getRandomMessage(FUNNY_LOSING_MESSAGES) };
      newCardsSetup = [winnerCard1, winnerCard2, loserCard1].sort(() => Math.random() - 0.5);
    } else {
      // 1 winner, 2 losers for attempts 1 and 2
      const winnerCard = { type: 'winner' as 'winner' | 'loser', contentText: getRandomMessage(WINNING_MESSAGES) };
      const loserCard1 = { type: 'loser' as 'winner' | 'loser', contentText: getRandomMessage(FUNNY_LOSING_MESSAGES) };
      const loserCard2 = { type: 'loser' as 'winner' | 'loser', contentText: getRandomMessage(FUNNY_LOSING_MESSAGES) };
      newCardsSetup = [winnerCard, loserCard1, loserCard2].sort(() => Math.random() - 0.5);
    }

    setCards(newCardsSetup.map((card, index) => ({ ...card, id: index })));
    setResetToken(prevToken => prevToken + 1);
  }, []); // Dependencies are top-level constants

  // useEffect for initial card setup on component mount
  useEffect(() => {
    setAttemptNumber(1); // Start at attempt 1
    setupCardsForAttempt(1); // Setup cards for the first attempt
  }, [setupCardsForAttempt]);

  const handleTryAgainClick = () => {
    const nextAttemptInCycle = (attemptNumber % ATTEMPTS_IN_CYCLE) + 1;
    setAttemptNumber(nextAttemptInCycle);
    setupCardsForAttempt(nextAttemptInCycle);
  };

  const getCardContent = (text: string, type: 'winner' | 'loser') => {
    if (type === 'winner') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-white rounded-lg shadow-md">
          <p className="font-bold text-xl md:text-2xl text-yellow-500">
            {text}
          </p>
          <p className="text-green-600 text-md mt-2 font-semibold">Enjoy your early weekend!</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-100 rounded-lg shadow-md">
        <p className="font-semibold text-md md:text-lg text-red-700">
          {text}
        </p>
        <p className="text-red-500 text-sm mt-2">Keep up the great work!</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 selection:bg-red-200 selection:text-red-900">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 tracking-tight">
        Scratch & Reveal!
      </h1>
      <p className="text-gray-600 mb-8 text-sm">Attempt: {attemptNumber} / {ATTEMPTS_IN_CYCLE}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
        {cards.map((card) => (
          <ScratchCard
            key={`${card.id}-${resetToken}`}
            width={cardWidth}
            height={cardHeight}
            revealedContent={getCardContent(card.contentText, card.type)}
            coverColor="#ef4444"
            scratchRadius={30}
            thresholdPercent={50}
          />
        ))}
      </div>
      <Button
        onClick={handleTryAgainClick} // Button now calls handleTryAgainClick
        className="px-8 py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Try Again?
      </Button>
    </div>
  );
};

export default ScratchCardPage;
