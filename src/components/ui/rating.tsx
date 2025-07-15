import React from "react";
interface RatingProps {
  rate: number;
  count: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Rating({
  rate,
  count,
  showCount = true,
  size = "md",
}: RatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const starSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= rate;
          const isPartial =
            !isFilled && starValue - rate < 1 && starValue - rate > 0;

          return (
            <span
              key={i}
              className={`${starSizeClasses[size]} ${
                isFilled
                  ? "text-yellow-500"
                  : isPartial
                  ? "text-yellow-300"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className={`text-muted-foreground ${sizeClasses[size]}`}>
          {rate.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}
