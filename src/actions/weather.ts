import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const fetchWeather = async ({ lat, long }) => {
  const queryParams = encodeURIComponent(`${lat},${long}`);
  const url = `https://dev.pirateweather.net/forecast/${apiKey}/${queryParams}`;
  console.log(url);
  // TODO, this needs to implement some caching...only refresh every 5 or 10 mins
  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
  });

  return await response.json();
};

const apiKey = import.meta.env.PIRATE_WEATHER_API_KEY;

// "z" here is Zod (schema strong-typing)
export const weather = {
  getCurrent: defineAction({
    accept: "json",
    input: z.object({
      lat: z.number(),
      long: z.number(),
    }),
    handler: fetchWeather,
  }),
};
