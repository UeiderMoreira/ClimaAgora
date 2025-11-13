import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { getWeatherTip } from "../utils/weatherTips";
import { mapConditionToGroup } from "../utils/weatherConditions";

export default function HomeScreen() {
  const { coords, loading: loadingLocation, error: locationError } = useLocation();
  const { data, loading: loadingWeather, error: weatherError } = useWeather(coords);

  if (loadingLocation || loadingWeather) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  if (locationError || weatherError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Ops! Não foi possível obter a previsão do tempo.</Text>
      </View>
    );
  }

  // Dados principais da API
  const { location, current, forecast } = data;
  const conditionText = current?.condition?.text || "Tempo indefinido";
  const iconUrl = "https:" + current?.condition?.icon;
  const isDay = current?.is_day === 1;
  const group = mapConditionToGroup(conditionText);
  const textColor = isDay ? "#222" : "#fff";
  const tip = getWeatherTip(conditionText, isDay);

  return (
    <BackgroundWrapper group={group} isDay={isDay}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Local e condição */}
        <Text style={[styles.city, { color: textColor }]}>{location?.name}</Text>
        <Text style={[styles.condition, { color: textColor }]}>{conditionText}</Text>

        {/* Temperatura principal */}
        <View style={styles.tempBox}>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Text style={[styles.temp, { color: textColor }]}>
            {Math.round(current?.temp_c)}°C
          </Text>
        </View>

        {/* Cards de informações rápidas */}
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={[styles.cardLabel, { color: textColor }]}>🌡️ Sensação</Text>
            <Text style={[styles.cardValue, { color: textColor }]}>{Math.round(current?.feelslike_c)}°C</Text>
          </View>
          <View style={styles.card}>
            <Text style={[styles.cardLabel, { color: textColor }]}>💨 Vento</Text>
            <Text style={[styles.cardValue, { color: textColor }]}>{current?.wind_kph} km/h</Text>
          </View>
          <View style={styles.card}>
            <Text style={[styles.cardLabel, { color: textColor }]}>💧 Umidade</Text>
            <Text style={[styles.cardValue, { color: textColor }]}>{current?.humidity}%</Text>
          </View>
        </View>

        {/* Previsão por hora */}
        <View style={styles.hourlyContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Previsão para hoje</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {forecast?.forecastday?.[0]?.hour?.map((hour, index) => {
              const time = hour.time.split(" ")[1].slice(0, 5);
              const temp = Math.round(hour.temp_c);
              const icon = "https:" + hour.condition.icon;
              const isHourDay = hour.is_day === 1;
              const bgColor = isHourDay
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.4)";
              const textColorHour = isHourDay ? "#000" : "#fff";

              return (
                <View key={index} style={[styles.hourCard, { backgroundColor: bgColor }]}>
                  <Text style={[styles.hourTime, { color: textColorHour }]}>{time}</Text>
                  <Image source={{ uri: icon }} style={styles.hourIcon} />
                  <Text style={[styles.hourTemp, { color: textColorHour }]}>{temp}°C</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Dica do dia */}
        <View style={styles.tipBox}>
          <Text style={[styles.tipText, { color: textColor }]}>{tip}</Text>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

// 🌤️ Estilos
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  loading: { color: "#fff", fontSize: 18 },
  error: { color: "#fff", fontSize: 16, textAlign: "center", padding: 20 },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  city: { fontSize: 32, fontWeight: "bold", textAlign: "center" },
  condition: { fontSize: 18, marginBottom: 10, textAlign: "center" },
  tempBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: { width: 80, height: 80, marginRight: 10 },
  temp: { fontSize: 64, fontWeight: "bold" },

  // Cards rápidos
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 16,
    padding: 12,
    margin: 6,
    minWidth: 100,
    alignItems: "center",
  },
  cardLabel: { fontSize: 14, marginBottom: 4 },
  cardValue: { fontSize: 16, fontWeight: "bold" },

  // Previsão horária
  hourlyContainer: {
    marginTop: 25,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  hourCard: {
    alignItems: "center",
    borderRadius: 14,
    padding: 10,
    marginRight: 8,
    width: 80,
  },
  hourTime: { fontSize: 14, marginBottom: 4 },
  hourIcon: { width: 40, height: 40, marginBottom: 4 },
  hourTemp: { fontSize: 16, fontWeight: "bold" },

  // Dica
  tipBox: {
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 15,
    width: "90%",
  },
  tipText: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
});

/*
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
*/

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