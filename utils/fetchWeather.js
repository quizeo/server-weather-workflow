import axios from "axios";

const fetchWeather = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = res.data;
  const condition = data.weather[0].main.toLowerCase();
  let recommendation = "";

  if (
    condition.includes("cloud") ||
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("thunderstorm")
  ) {
    recommendation = "It's cloudy or about to rain. Bring an umbrella!";
  } else if (condition.includes("clear") || condition.includes("sun")) {
    recommendation = "It's sunny today. Don't forget to apply sunblock!";
  } else if (condition.includes("snow")) {
    recommendation = "It's snowing. Dress warmly!";
  } else if (condition.includes("fog") || condition.includes("mist")) {
    recommendation = "It's foggy. Drive carefully!";
  }

  return `Weather in ${data.name}: ${data.weather[0].description}, Temp: ${data.main.temp}°C. ${recommendation}`;
};

export default fetchWeather;
