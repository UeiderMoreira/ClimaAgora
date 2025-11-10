import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export default function AnimatedFadeIn({ children, delay = 0, style }) {
  const translateY = useRef(new Animated.Value(20)).current; 
  const opacity = useRef(new Animated.Value(0)).current;    

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}
