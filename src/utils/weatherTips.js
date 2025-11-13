export function getWeatherTip(condition, isDay) {
    if (!condition) return "Tenha um ótimo dia!";
  
    const text = condition.toLowerCase();
  
    if (text.includes("sun") || text.includes("clear")) {
      return "Dia ensolarado! Use protetor solar e beba bastante água.";
    }
  
    if (text.includes("rain") || text.includes("shower")) {
      return "Chuva chegando! Leve guarda-chuva ou capa de chuva.";
    }
  
    if (text.includes("storm") || text.includes("thunder")) {
      return "Tempestade! Evite áreas abertas e se proteja.";
    }
  
    if (text.includes("cloud")) {
      return "Dia nublado! Boa hora para atividades ao ar livre sem muito calor.";
    }
  
    if (text.includes("snow")) {
      return "Nevando! Use roupas quentes e evite dirigir se possível.";
    }
  
    if (text.includes("fog") || text.includes("mist")) {
      return "Neblina forte! Tenha cuidado ao dirigir.";
    }
  
    if (text.includes("wind")) {
      return "Dia com muito vento! Evite objetos soltos.";
    }
  
    if (!isDay) {
      return "Boa noite! Aproveite para descansar — temperatura mais amena.";
    }
  
    return "Tenha um ótimo dia!";
  }
  