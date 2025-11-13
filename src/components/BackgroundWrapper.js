import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { backgrounds } from "../utils/weatherBackgrounds";

export default function BackgroundWrapper({ group = "sunny", isDay = true, children }) {
  // Ajusta o fundo de acordo com o horário e a condição
  const getBackground = () => {
    if (!isDay) return backgrounds.night;

    switch (group) {
      case "rain":
        return backgrounds.rain;
      case "storm":
        return backgrounds.storm;
      case "snow":
        return backgrounds.snow;
      case "fog":
        return backgrounds.fog;
      case "cloudy":
        return backgrounds.cloudy;
      default:
        return backgrounds.sunny;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getBackground()}
        style={styles.bg}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1, width: "100%", height: "100%" },
});
