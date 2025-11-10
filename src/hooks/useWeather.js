import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeatherByCoords } from '../services/api';

export function useWeather(coords) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    if (!coords) return;
    try {
      setLoading(true);
      const resp = await getCurrentWeatherByCoords(coords.latitude, coords.longitude);
      setData(resp);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [coords]);

  useEffect(() => { fetchWeather(); }, [fetchWeather]);

  return { data, loading, error, refresh: fetchWeather };
}
