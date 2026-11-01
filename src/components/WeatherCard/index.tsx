import type { WeatherData } from "../../types/weather-type";

type Props = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: Props) {
  const { location, current } = weather;

  const iconUrl = current.condition.icon.startsWith("//")
    ? `https:${current.condition.icon}`
    : current.condition.icon.replace(/^http:/, "https:");

  return (
    <article className="weather-card">
      <h3>{location.name}</h3>

      <img src={iconUrl} alt={current.condition.text} width={80} height={80} />

      <dl>
        <dt>מדינה</dt>
        <dd>{location.country}</dd>

        <dt>עיר</dt>
        <dd>{location.name}</dd>

        <dt>טמפרטורה</dt>
        <dd>
          <span dir="ltr">{current.temp_c} °C</span>
        </dd>

        <dt>מזג האוויר</dt>
        <dd>{current.condition.text}</dd>

        <dt>מהירות הרוח</dt>
        <dd>{current.wind_kph} קמ״ש</dd>
      </dl>
    </article>
  );
}
