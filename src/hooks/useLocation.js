import { useEffect, useState, useCallback } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permissão de localização negada.');

      const pos = await Location.getCurrentPositionAsync({});
      setCoords(pos.coords);

      const geo = await Location.reverseGeocodeAsync(pos.coords);
      if (geo.length) {
        const place = geo[0];

        setCity(
          place.city ||
          place.subregion ||
          place.region ||
          place.district ||
          place.name ||
          "Localização não identificada"
        );
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLocation(); }, [fetchLocation]);

  return { coords, city, loading, error, refresh: fetchLocation };
}
