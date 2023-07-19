// themes.ts
import {Dimensions} from 'react-native';

export const {height, width} = Dimensions.get('window');
export const scaleFactor = width < 350 ? 0.8 : 1.0;
export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  transparent: string;
  white: string;
  error: string;
}

export interface Fonts {
  regular: string;
  bold: string;
  medium: string;
}

export interface FontSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export interface Theme {
  colors: Colors;
  fonts: Fonts;
  fontSizes: FontSizes;
  // Add more style properties here
}

const colors: Colors = {
  primary: '#007bff',
  error: '#B00020',
  secondary: '#6c757d',
  background: '#f8f9fa',
  text: '#333333',
  transparent: 'rgba(0, 0, 0, 0.3)',
  white: '#ffff',
};

const fonts: Fonts = {
  regular: 'FiraSans-Regular',
  bold: 'FiraSans-Bold',
  medium: 'FiraSans-Medium',
};

const fontSizes: FontSizes = {
  small: 14,
  medium: 18,
  large: 24,
  xlarge: 28,
};

export const theme: Theme = {
  colors,
  fonts,
  fontSizes,
  // Add more style properties here
};
