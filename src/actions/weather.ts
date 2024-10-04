import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const fetchWeather = async ({ lat, long }) => {
  //const response = await fetch(url)

  // parse response somewhat??
  return `this is today's weather at ${lat}:${long}`
}

// "z" here is Zod (schema strong-typing)
export const weather = {
  getCurrent: defineAction({
    input: z.object({
      lat: z.number(),
      long: z.number(),
    }),
    handler: fetchWeather
  })
}
