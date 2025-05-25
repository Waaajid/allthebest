import React from 'react';
import ScratchCard from '../components/ScratchCard';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ScratchCardPage: React.FC = () => {
  const navigate = useNavigate();
  const cardWidth = 150;
  const cardHeight = 150;

  const winningMessage = (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="text-4xl font-bold text-green-500">6</span>
      <p className="text-green-600 font-semibold mt-2">You Won!</p>
    </div>
  );

  const losingMessage = (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-red-500 font-semibold">Uh Oh!</p>
      <p className="text-sm text-gray-600">Better luck next time.</p>
    </div>
  );

  const cardsData = [
    { id: 1, content: losingMessage },
    { id: 2, content: losingMessage },
    { id: 3, content: losingMessage },
    { id: 4, content: losingMessage },
    { id: 5, content: losingMessage },
    { id: 6, content: winningMessage },
    { id: 7, content: losingMessage },
    { id: 8, content: losingMessage },
    { id: 9, content: winningMessage },
  ];

  // Shuffle the cards to randomize positions
  const shuffledCards = [...cardsData].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8 shadow-lg">Scratch & Win!</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {shuffledCards.map((card) => (
          <ScratchCard
            key={card.id}
            width={cardWidth}
            height={cardHeight}
            revealedContent={card.content}
            coverColor="#d1d5db" // Light gray, good for scratching
            scratchRadius={25}
            thresholdPercent={60} // Reveal after 60% scratched
          />
        ))}
      </div>
      <Button onClick={() => navigate('/')} variant="secondary" className="shadow-lg">
        Back to Home
      </Button>
    </div>
  );
};

export default ScratchCardPage;
