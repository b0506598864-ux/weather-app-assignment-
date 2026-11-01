import axios from "axios";
import type { WeatherData } from "../types/weather-type";

const WEATHER_URL = "https://api.weatherapi.com/v1/current.json";

export async function getWeather(
  cityNameEn: string,
  signal?: AbortSignal,
): Promise<WeatherData> {
  const key = import.meta.env.VITE_WEATHER_API_KEY?.trim();

  if (!key) {
    throw new Error("חסר מפתח WeatherAPI בקובץ .env.local");
  }

  if (!cityNameEn.trim()) {
    throw new Error("ליישוב הזה אין שם באנגלית במאגר");
  }

  try {
    const { data } = await axios.get<WeatherData>(WEATHER_URL, {
      params: {
        key,
        q: cityNameEn,
      },
      signal,
      timeout: 15000,
    });

    if (
      !data.location ||
      !data.current ||
      !data.current.condition ||
      typeof data.current.temp_c !== "number"
    ) {
      throw new Error("התקבל מידע לא תקין משירות מזג האוויר");
    }

    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (axios.isAxiosError<{ error?: { message?: string } }>(error)) {
      throw new Error(
        error.response?.data.error?.message ||
          "לא ניתן לקבל את מזג האוויר. בדוק את החיבור והמפתח.",
      );
    }

    throw error;
  }
}
