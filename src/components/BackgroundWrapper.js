import { ImageBackground, StyleSheet, View } from 'react-native';
import { backgrounds } from '../utils/weatherBackgrounds';

export default function BackgroundWrapper({ group = 'sunny', children }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgrounds[group]} style={styles.bg} resizeMode="cover">
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1, width: '100%', height: '100%' },
});
