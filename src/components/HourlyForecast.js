import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

export default function HourlyForecast({ hours, textColor }) {
  if (!hours || hours.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Previsão por hora</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hours.map((hour, index) => {
          const time = hour.time.split(" ")[1].slice(0, 5);
          const icon = hour.condition.icon.replace("64x64", "128x128");

          return (
            <View key={index} style={styles.item}>
              <Text style={[styles.time, { color: textColor }]}>
                {index === 0 ? "Agora" : time}
              </Text>

              <Image
                source={{ uri: `https:${icon}` }}
                style={styles.icon}
                resizeMode="contain"
              />

              <Text style={[styles.temp, { color: textColor }]}>
                {Math.round(hour.temp_c)}°C
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  item: {
    width: 80,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  time: {
    fontSize: 14,
    marginBottom: 4,
  },
  temp: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "600",
  },
  icon: {
    width: 50,
    height: 50,
  },
});
