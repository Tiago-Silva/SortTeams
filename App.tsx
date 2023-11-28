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
import themes from './src/Themes';

function App(): JSX.Element {

  const deviceTheme = useColorScheme();
  const theme = (deviceTheme && themes[deviceTheme]) || themes.dark;

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
