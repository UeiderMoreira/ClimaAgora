import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import BackgroundWrapper from '../components/BackgroundWrapper';
import WeatherIcon from '../components/WeatherIcon';
import WeatherInfo from '../components/WeatherInfo';
import AnimatedFadeIn from '../components/AnimatedFadeIn';
import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';
import { mapConditionToGroup } from '../utils/weatherConditions';

export default function HomeScreen() {
  const { coords, city, loading: locLoading, error: locError, refresh: refreshLocation } = useLocation();
  const { data, loading: weatherLoading, error: weatherError, refresh: refreshWeather } = useWeather(coords);

  const loading = locLoading || weatherLoading;
  const error = locError || weatherError;
  const current = data?.current;

  const group = mapConditionToGroup(current?.condition?.text, current?.is_day);
  const isDay = current?.is_day === 1;
  const textColor = isDay ? "#1E293B" : "#FFFFFF";

  const onRefresh = async () => {
    await refreshLocation();
    await refreshWeather();
  };

  if (loading && !current) {
    return (
      <BackgroundWrapper group="night">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loading}>Carregando clima…</Text>
        </View>
      </BackgroundWrapper>
    );
  }

  if (error) {
    return (
      <BackgroundWrapper group="storm">
        <ScrollView contentContainerStyle={styles.center} refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
          <Text style={[styles.error, { color: textColor }]}>Ops! {error}</Text>
        </ScrollView>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper group={group}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >

        <AnimatedFadeIn delay={100}>
          <WeatherIcon icon={current?.condition?.icon} size={140} />
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={300}>
          <WeatherInfo
            city={city || data?.location?.name}
            current={current}
            color={textColor}
          />
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={500} style={{ width: '100%', alignItems: 'center' }}>
          <BlurView intensity={70} tint={isDay ? "light" : "dark"} style={styles.card}>
            <Text style={[styles.cardItem, { color: textColor }]}>🌡️ Sensação: {Math.round(current.feelslike_c)}°C</Text>
            <Text style={[styles.cardItem, { color: textColor }]}>💧 Umidade: {current.humidity}%</Text>
            <Text style={[styles.cardItem, { color: textColor }]}>💨 Vento: {Math.round(current.wind_kph)} km/h</Text>
          </BlurView>
        </AnimatedFadeIn>

      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingVertical: 60, alignItems: 'center', gap: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 24 },
  loading: { color: '#fff', fontSize: 18 },
  error: { fontSize: 18, textAlign: 'center' },
  card: {
    width: '85%',
    borderRadius: 24,
    padding: 20,
    gap: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  cardItem: { fontSize: 16, fontWeight: '500' },
});

/*
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import BackgroundWrapper from '../components/BackgroundWrapper';
import WeatherIcon from '../components/WeatherIcon';
import WeatherInfo from '../components/WeatherInfo';
import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';
import { mapConditionToGroup } from '../utils/weatherConditions';

export default function HomeScreen() {
  const { coords, city, loading: locLoading, error: locError, refresh: refreshLocation } = useLocation();
  const { data, loading: weatherLoading, error: weatherError, refresh: refreshWeather } = useWeather(coords);

  const loading = locLoading || weatherLoading;
  const error = locError || weatherError;
  const current = data?.current;

  const group = mapConditionToGroup(current?.condition?.text, current?.is_day);
  const isDay = current?.is_day === 1;
  const textColor = isDay ? "#1E293B" : "#FFFFFF"; // Azul escuro no dia, branco à noite

  const onRefresh = async () => {
    await refreshLocation();
    await refreshWeather();
  };

  if (loading && !current) {
    return (
      <BackgroundWrapper group="night">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loading}>Carregando clima…</Text>
        </View>
      </BackgroundWrapper>
    );
  }

  if (error) {
    return (
      <BackgroundWrapper group="storm">
        <ScrollView contentContainerStyle={styles.center} refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
          <Text style={[styles.error, { color: textColor }]}>Ops! {error}</Text>
        </ScrollView>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper group={group}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >

        <WeatherIcon icon={current?.condition?.icon} size={140} />

        <WeatherInfo
          city={city || data?.location?.name}
          current={current}
          color={textColor}
        />

        <BlurView intensity={70} tint={isDay ? "light" : "dark"} style={styles.card}>
          <Text style={[styles.cardItem, { color: textColor }]}>🌡️ Sensação: {Math.round(current.feelslike_c)}°C</Text>
          <Text style={[styles.cardItem, { color: textColor }]}>💧 Umidade: {current.humidity}%</Text>
          <Text style={[styles.cardItem, { color: textColor }]}>💨 Vento: {Math.round(current.wind_kph)} km/h</Text>
        </BlurView>

      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingVertical: 60, alignItems: 'center', gap: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 24 },
  loading: { color: '#fff', fontSize: 18 },
  error: { fontSize: 18, textAlign: 'center' },
  card: {
    width: '85%',
    borderRadius: 24,
    padding: 20,
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  cardItem: { fontSize: 16, fontWeight: '500' },
});
*/