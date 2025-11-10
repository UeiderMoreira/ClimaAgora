import { View, Text, StyleSheet } from 'react-native';

export default function WeatherInfo({ city, current, color = "#fff" }) {
  if (!current) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.city, { color }]}>{city}</Text>
      <Text style={[styles.temp, { color }]}>{Math.round(current.temp_c)}°</Text>
      <Text style={[styles.condition, { color }]}>{current.condition?.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 4 },
  city: { fontSize: 26, fontWeight: '600' },
  temp: { fontSize: 96, fontWeight: '700' },
  condition: { fontSize: 20 },
});
