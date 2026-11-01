import { useEffect, useState } from "react";
import { getCities } from "../../api/cities-api";
import { getWeather } from "../../api/weather-api";
import type { City } from "../../types/city-type";
import type { WeatherData } from "../../types/weather-type";
import { useHistory } from "../../context/HistoryContext";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import WeatherCard from "../../components/WeatherCard";

export default function HomePage() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [citiesLoading, setCitiesLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const [citiesError, setCitiesError] = useState("");
  const [weatherError, setWeatherError] = useState("");

  const { addSearch } = useHistory();

  useEffect(() => {
    let cancelled = false;

    async function loadCities() {
      try {
        const result = await getCities();

        if (!cancelled) {
          setCities(result);
        }
      } catch (error) {
        if (!cancelled) {
          setCitiesError(
            error instanceof Error ? error.message : "טעינת היישובים נכשלה",
          );
        }
      } finally {
        if (!cancelled) {
          setCitiesLoading(false);
        }
      }
    }

    void loadCities();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      setWeather(null);
      setWeatherError("");
      setWeatherLoading(false);
      return;
    }

    const city = selectedCity;
    const controller = new AbortController();
    const searchedAt = new Date().toISOString();

    async function loadWeather() {
      setWeatherLoading(true);
      setWeatherError("");
      setWeather(null);

      try {
        const result = await getWeather(city.nameEn, controller.signal);

        if (!controller.signal.aborted) {
          setWeather(result);
          addSearch(city.nameHe, result.location.country, searchedAt);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setWeatherError(
            error instanceof Error ? error.message : "טעינת מזג האוויר נכשלה",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setWeatherLoading(false);
        }
      }
    }

    void loadWeather();

    return () => {
      controller.abort();
    };
  }, [selectedCity, addSearch]);

  return (
    <section>
      <h2>מזג אוויר לפי יישוב</h2>
      <p>בחר יישוב כדי לקבל את מזג האוויר הנוכחי.</p>

      {citiesLoading && <Spinner />}

      {citiesError && <ErrorMessage message={citiesError} />}

      {!citiesLoading && !citiesError && (
        <div className="city-picker">
          <label htmlFor="city">יישוב</label>

          <select
            id="city"
            value={selectedCity?.nameEn ?? ""}
            onChange={(event) => {
              const city = cities.find(
                (item) => item.nameEn === event.target.value,
              );

              setSelectedCity(city ?? null);
            }}
          >
            <option value="">בחר יישוב</option>

            {cities.map((city) => (
              <option key={city.id} value={city.nameEn} disabled={!city.nameEn}>
                {city.nameHe}
                {!city.nameEn ? " — חסר שם באנגלית במאגר" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {weatherLoading && <Spinner />}

      {weatherError && <ErrorMessage message={weatherError} />}

      {!weatherLoading && weather && <WeatherCard weather={weather} />}
    </section>
  );
}
