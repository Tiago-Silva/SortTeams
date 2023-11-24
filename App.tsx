/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useColorScheme } from 'react-native';
import { Home } from './src/Home';
import { ThemeProvider } from 'styled-components';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    // <ThemeProvider theme={isDarkMode ? Colors.black : Colors.white}>
      <Home />
    // </ThemeProvider>
  );
}

export default App;
