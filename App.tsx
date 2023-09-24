/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { shuffle } from 'lodash';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [bestPlayers, setBestPlayers] = useState<string[]>([]);
  const [worstPlayers, setWorstPlayers] = useState<string[]>([]);
  const [normalPlayers, setNormalPlayers] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<string>('');
  const [teams, setTeams] = useState<string[][]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleAddPlayerToCategory = (player: string, index: number, category: 'best' | 'worst' | 'normal') => {
    if (player.trim() === '') {
      return; // Não adicione jogadores vazios
    }

    if (category === 'best') {
      // setBestPlayers([...bestPlayers, player]);
      handleBestPlayerNameChange(player, index);
    } else if (category === 'worst') {
      // setWorstPlayers([...worstPlayers, player]);
      handleWorstPlayerNameChange(player, index);
    } else if (category === 'normal') {
      // setNormalPlayers([...normalPlayers, player]);
      handleNormnalPlayerNameChange(player, index);
    }
  };

  const handleCleanTeams = () => {
    setIsVisible(false);
    setTeams([]);
  }

  const handleSortTeams = () => {
    if (teamSize && parseInt(teamSize) > 0) {
      const allPlayers = [...shuffle(bestPlayers), ...shuffle(normalPlayers), ...shuffle(worstPlayers)];

      const numberOfTeams = Math.ceil(allPlayers.length / parseInt(teamSize));
      const dividedTeams: string[][] = [];

      for (let i = 0; i < numberOfTeams; i++) {
        const team = [];

        for (let j = i; j < allPlayers.length; j += numberOfTeams) {
          team.push(allPlayers[j]);
        }

        dividedTeams.push(team);
      }
      setIsVisible(true);
      setTeams(dividedTeams);
    }
  };

  const handleAddBestPlayer = () => {
    if (bestPlayers.length < 10) {
      setBestPlayers([...bestPlayers, '']);
    }
  };

  const handleRemoveBestPlayer = () => {
    if (bestPlayers.length > 0) {
      const updatedPlayers = [...bestPlayers];
      updatedPlayers.pop();
      setBestPlayers(updatedPlayers);
    }
  };

  const handleAddWorstPlayer = () => {
    if (worstPlayers.length < 10) {
      setWorstPlayers([...worstPlayers, '']);
    }
  };

  const handleRemoveWorstPlayer = () => {
    if (worstPlayers.length > 0) {
      const updatedPlayers = [...worstPlayers];
      updatedPlayers.pop();
      setWorstPlayers(updatedPlayers);
    }
  };

  const handleAddNormalPlayer = () => {
    if (normalPlayers.length < 40) {
      setNormalPlayers([...normalPlayers, '']);
    }
  };

  const handleRemoveNormalPlayer = () => {
    if (normalPlayers.length > 0) {
      const updatedPlayers = [...normalPlayers];
      updatedPlayers.pop();
      setNormalPlayers(updatedPlayers);
    }
  };

  const handleBestPlayerNameChange = (text: string, index: number) => {
    const updatedPlayers = [...bestPlayers];
    updatedPlayers[index] = text;
    setBestPlayers(updatedPlayers);
  };

  const handleWorstPlayerNameChange = (text: string, index: number) => {
    const updatedPlayers = [...worstPlayers];
    updatedPlayers[index] = text;
    setWorstPlayers(updatedPlayers);
  };

  const handleNormnalPlayerNameChange = (text: string, index: number) => {
    const updatedNormalPlayers = [...normalPlayers];
    updatedNormalPlayers[index] = text;
    setNormalPlayers(updatedNormalPlayers);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView style={[ styles.scrollview]} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white, flex: 1, 
            padding: 20, width: '100%', height: '100%', minHeight: '100%' }}>
            <Text style={{ fontSize: 20 }}>Melhores jogadores:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="+" onPress={handleAddBestPlayer} />
              <Button title="-" onPress={handleRemoveBestPlayer} />
            </View>
            {bestPlayers.map((player, index) => (
              <TextInput
                key={index}
                placeholder={`Jogador ${index + 1}`}
                value={player}
                onChangeText={(text) => handleAddPlayerToCategory(text, index, 'best')}
              />
            ))}

            <Text style={{ fontSize: 20 }}>Jogadores medianos:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="+" onPress={handleAddWorstPlayer} />
              <Button title="-" onPress={handleRemoveWorstPlayer} />
            </View>
            {worstPlayers.map((player, index) => (
              <TextInput
                key={index}
                placeholder={`Jogador ${index + 1}`}
                value={player}
                onChangeText={(text) => handleAddPlayerToCategory(text, index, 'worst')}
              />
            ))}

            <Text style={{ fontSize: 20 }}>Jogadores normais:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="+" onPress={handleAddNormalPlayer} />
              <Button title="-" onPress={handleRemoveNormalPlayer} />
            </View>
            {normalPlayers.map((player, index) => (
              <TextInput
                key={index}
                placeholder={`Jogador ${index + 1}`}
                value={player}
                onChangeText={(text) => handleAddPlayerToCategory(text, index, 'normal')}
              />
            ))}

            <Text style={{ fontSize: 20, marginTop: 20 }}>Tamanho do Time:</Text>
            <TextInput
              placeholder="Tamanho do Time"
              value={teamSize}
              onChangeText={(text) => setTeamSize(text)}
              keyboardType="numeric"
            />
            {isVisible 
              ? <Button title="Limpar times" onPress={handleCleanTeams} />
              : <Button title="Sortear Times" onPress={handleSortTeams} />  }

            <Text style={{ fontSize: 20, marginTop: 20 }}>Times Sorteados:</Text>
            {teams.map((team, index) => (
              <View key={index}>
                <Text style={{ fontSize: 16 }}>{`Time ${index + 1}:`}</Text>
                {team.map((player, playerIndex) => (
                  <Text key={playerIndex}>{player}</Text>
                ))}
              </View>
            ))}

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 12, color: 'gray', opacity: 0.4 }}>
                Este aplicativo foi desenvolvido por [ Tiago Silva ].
              </Text>
            </View>
          </View>
      </ScrollView>
      <ImageBackground
          source={require('./futviva.jpeg')} resizeMode="contain"
          style={[styles.fixed, {zIndex: -1}]}
          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
 scrollview: {
    backgroundColor: 'transparent',
    opacity: 0.9,
    fontWeight: 700,
    minHeight: '100%'
 }
});

export default App;
