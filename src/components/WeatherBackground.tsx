import { useAppSelector } from "../store/hooks";
import { selectAllCities } from "../store/slices/weatherSlice";

const WeatherBackground = () => {
  const cities = useAppSelector(selectAllCities);

  // Get the most common weather condition
  const getMostCommonCondition = () => {
    if (cities.length === 0) return "clear";

    const conditions = cities.map((city) => city.condition.toLowerCase());
    const conditionCount: Record<string, number> = {};

    conditions.forEach((condition) => {
      if (condition.includes("rain"))
        conditionCount["rain"] = (conditionCount["rain"] || 0) + 1;
      else if (condition.includes("cloud"))
        conditionCount["cloudy"] = (conditionCount["cloudy"] || 0) + 1;
      else if (condition.includes("clear") || condition.includes("sunny"))
        conditionCount["clear"] = (conditionCount["clear"] || 0) + 1;
      else if (condition.includes("snow"))
        conditionCount["snow"] = (conditionCount["snow"] || 0) + 1;
    });

    const mostCommon = Object.entries(conditionCount).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return mostCommon ? mostCommon[0] : "clear";
  };

  const condition = getMostCommonCondition();

  // Rainy background
  if (condition === "rain") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500 opacity-10"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-blue-400 opacity-30 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Snowy background
  if (condition === "snow") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-50 to-white opacity-30"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-2xl opacity-70 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
    );
  }

  // Cloudy background
  if (condition === "cloudy") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100 opacity-20"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${60 + Math.random() * 80}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Clear/Sunny background (default)
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 via-orange-50 to-blue-50 opacity-20"></div>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-yellow-200 rounded-full opacity-10 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WeatherBackground;
