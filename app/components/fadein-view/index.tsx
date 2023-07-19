import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const FadeInView = ({children}: {children: React.ReactNode}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to start the animation on component mount
  useEffect(() => {
    fadeIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle the fade-in animation
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Target value (fully opaque)
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true, // Improves performance
    }).start();
  };
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        flex: 1,
        // Apply the opacity animation here
      }}>
      {children}
    </Animated.View>
  );
};
