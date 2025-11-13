import axios from "axios";
import { WEATHER_API_KEY } from "../config/env";

const api = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  timeout: 10000,
});

export async function getCurrentWeatherByCoords(lat, lon) {
  try {
    const url = `/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no&lang=pt`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro na API:", error.message);
    throw new Error("Erro na API: " + error.message);
  }
}

/*
import { WEATHER_API_KEY } from "../config/env";

const BASE_URL = "https://api.weatherapi.com/v1";

export async function getCurrentWeatherByCoords(lat, lon) {
  const url = `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Erro ao buscar dados do clima.");
  }

  return await resp.json();
}
*/

/*
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
*/