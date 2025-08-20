import { FaUserShield, FaCheck, FaClock } from 'react-icons/fa';

interface ShareIndicatorProps {
  totalShares: number;
  collectedShares: number;
  threshold: number;
  className?: string;
}

export default function ShareIndicator({ 
  totalShares = 3, 
  collectedShares = 0, 
  threshold = 2,
  className = '' 
}: ShareIndicatorProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex -space-x-2 mr-3">
        {Array.from({ length: totalShares }).map((_, i) => (
          <div 
            key={i} 
            className={`w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center ${
              i < collectedShares 
                ? 'bg-green-500 text-white' 
                : i < threshold 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gray-600 text-gray-300'
            }`}
          >
            {i < collectedShares ? (
              <FaCheck className="text-xs" />
            ) : (
              <FaUserShield className="text-xs" />
            )}
          </div>
        ))}
      </div>
      
      <div className="text-sm">
        <span className="font-medium">
          {collectedShares >= threshold ? (
            <span className="text-green-400">Recovery ready</span>
          ) : (
            <span className="text-indigo-400">
              {collectedShares}/{threshold} shares collected
            </span>
          )}
        </span>
        <div className="flex items-center text-xs text-gray-400 mt-0.5">
          <FaClock className="mr-1" />
          <span>{totalShares} total shares available</span>
        </div>
      </div>
    </div>
  );
}