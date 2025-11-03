interface WeatherIconProps {
  condition: string;
  size?: "sm" | "md" | "lg";
}

const WeatherIcon = ({ condition, size = "md" }: WeatherIconProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const lowerCondition = condition.toLowerCase();

  // Sunny/Clear
  if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100" className="animate-spin-slow">
          <circle cx="50" cy="50" r="20" fill="#FDB813" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2="50"
              y2="10"
              stroke="#FDB813"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
        </svg>
      </div>
    );
  }

  // Rainy
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {/* Cloud */}
          <path
            d="M25,45 Q25,35 35,35 Q35,25 45,25 Q55,25 55,35 Q65,35 65,45 Q65,55 55,55 L35,55 Q25,55 25,45"
            fill="#94A3B8"
          />
          {/* Rain drops */}
          {[30, 45, 60].map((x, i) => (
            <g key={i}>
              <line
                x1={x}
                y1="60"
                x2={x}
                y2="75"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-rain"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <line
                x1={x}
                y1="60"
                x2={x}
                y2="75"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-rain"
                style={{ animationDelay: `${i * 0.2 + 0.6}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Cloudy/Overcast
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {/* Back cloud */}
          <path
            d="M20,55 Q20,45 30,45 Q30,35 40,35 Q50,35 50,45 Q60,45 60,55 Q60,65 50,65 L30,65 Q20,65 20,55"
            fill="#CBD5E1"
            className="animate-float"
          />
          {/* Front cloud */}
          <path
            d="M35,50 Q35,40 45,40 Q45,30 55,30 Q65,30 65,40 Q75,40 75,50 Q75,60 65,60 L45,60 Q35,60 35,50"
            fill="#94A3B8"
            className="animate-float"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>
    );
  }

  // Partly Cloudy
  if (lowerCondition.includes("partly")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {/* Sun */}
          <circle
            cx="35"
            cy="35"
            r="12"
            fill="#FDB813"
            className="animate-pulse"
          />
          {/* Cloud */}
          <path
            d="M40,55 Q40,45 50,45 Q50,35 60,35 Q70,35 70,45 Q80,45 80,55 Q80,65 70,65 L50,65 Q40,65 40,55"
            fill="#E2E8F0"
            className="animate-float"
          />
        </svg>
      </div>
    );
  }

  // Snowy
  if (lowerCondition.includes("snow")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {/* Cloud */}
          <path
            d="M25,45 Q25,35 35,35 Q35,25 45,25 Q55,25 55,35 Q65,35 65,45 Q65,55 55,55 L35,55 Q25,55 25,45"
            fill="#94A3B8"
          />
          {/* Snowflakes */}
          {[30, 45, 60].map((x, i) => (
            <g key={i}>
              <text
                x={x}
                y="70"
                fontSize="12"
                fill="#E0F2FE"
                className="animate-snow"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                ❄
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Thunderstorm
  if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {/* Dark cloud */}
          <path
            d="M25,45 Q25,35 35,35 Q35,25 45,25 Q55,25 55,35 Q65,35 65,45 Q65,55 55,55 L35,55 Q25,55 25,45"
            fill="#475569"
          />
          {/* Lightning */}
          <path
            d="M45,55 L40,70 L47,70 L42,85"
            stroke="#FCD34D"
            strokeWidth="2"
            fill="none"
            className="animate-lightning"
          />
        </svg>
      </div>
    );
  }

  // Foggy/Mist
  if (
    lowerCondition.includes("fog") ||
    lowerCondition.includes("mist") ||
    lowerCondition.includes("haze")
  ) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {[35, 45, 55, 65].map((y, i) => (
            <line
              key={i}
              x1="20"
              y1={y}
              x2="80"
              y2={y}
              stroke="#CBD5E1"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-fog"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // Windy
  if (lowerCondition.includes("wind")) {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100">
          {[35, 50, 65].map((y, i) => (
            <path
              key={i}
              d={`M20,${y} Q50,${y - 5} 80,${y}`}
              stroke="#94A3B8"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="animate-wind"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // Default - Partly Cloudy
  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100">
        <path
          d="M30,50 Q30,40 40,40 Q40,30 50,30 Q60,30 60,40 Q70,40 70,50 Q70,60 60,60 L40,60 Q30,60 30,50"
          fill="#94A3B8"
        />
      </svg>
    </div>
  );
};

export default WeatherIcon;
