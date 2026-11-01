export type WeatherData = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};
