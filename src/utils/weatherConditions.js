export function mapConditionToGroup(text = '', isDay = 1) {
  const t = text.toLowerCase();
  const night = isDay === 0;

  if (t.includes('chuva')) return 'rain';
  if (t.includes('nublado') || t.includes('cloud')) return 'cloudy';
  if (t.includes('neve')) return 'snow';
  if (t.includes('storm')) return 'storm';
  if (t.includes('fog') || t.includes('neblina')) return 'fog';
  if (night) return 'night';
  return 'sunny';
}
