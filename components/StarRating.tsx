import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 16, 
  interactive = false,
  onRate 
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={`
            ${interactive ? 'cursor-pointer transition-colors hover:scale-110' : ''}
            ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          `}
          onClick={() => interactive && onRate && onRate(star)}
        />
      ))}
    </div>
  );
};