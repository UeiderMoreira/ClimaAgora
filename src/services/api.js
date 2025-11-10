import axios from 'axios';
import { WEATHER_API_KEY } from '../config/env';

const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 10000,
});

export async function getCurrentWeatherByCoords(lat, lon, lang = 'pt') {
  const url = `/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&lang=${lang}`;
  const { data } = await api.get(url);
  return data;
}
