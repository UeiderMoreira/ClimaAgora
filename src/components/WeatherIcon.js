import { Image } from 'react-native';

export default function WeatherIcon({ icon, size = 140 }) {
  if (!icon) return null;

  const hdIcon = icon.replace("64x64", "128x128");

  const uri = hdIcon.startsWith("http") ? hdIcon : `https:${hdIcon}`;

  return (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
      }}
      resizeMode="contain"
    />
  );
}

/*import { Image } from 'react-native';

export default function WeatherIcon({ icon, size = 140 }) {
  if (!icon) return null;
  const uri = icon.startsWith('http') ? icon : `https:${icon}`;
  return <Image source={{ uri }} style={{ width: size, height: size }} />;
}*/
