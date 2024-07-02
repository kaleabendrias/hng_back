require("dotenv").config();

const hello = async (req, res) => {
  const visitorName = req.query.visitor_name;

  try {
    // Determine IP address (replace with actual IP logic)
    const ip = req.ip === "::ffff:127.0.0.1" ? "8.8.8.8" : req.ip;

    // Fetch location information from ipapi.co
    const locationRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await locationRes.json();
    const region = locationData.region || "Unknown";

    // Fetch weather information using OpenWeatherMap
    const apiKey = process.env.api_key;
    console.log(apiKey);
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData);
    const temperature = weatherData.main.temp || "Unknown";

    // Prepare response JSON
    const response = {
      client_ip: ip,
      location: region,
      greeting: `Hello, ${
        visitorName || "Guest"
      }! The temperature is ${temperature} degrees Celsius in ${region}.`,
    };

    // Send JSON response
    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = hello;
