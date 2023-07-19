import React from 'react';
import {View, StyleSheet, ViewStyle, ActivityIndicator} from 'react-native';
import {height, width} from '../../theme';

interface TransparentOverlayProps {
  visible: boolean;
}

export const TransparentOverlay: React.FC<TransparentOverlayProps> = ({
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      {/* Your overlay content goes here */}
      {/* For transparency, set the desired background color with some opacity */}
      <View style={styles.overlayContent}>
        <ActivityIndicator />
      </View>
    </View>
  );
};

interface Styles {
  overlay: ViewStyle;
  overlayContent: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    width: width,
    height: height,

    borderRadius: 10,
  },
});
