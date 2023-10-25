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
  Alert,
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
  const [teams, setTeams] = useState<string[][]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);

  const handleAddPlayerToCategory = (player: string, index: number, category: 'best' | 'worst' | 'normal') => {

  if (category === 'best') {
      handleBestPlayerNameChange(player, index);
    } else if (category === 'worst') {
      handleWorstPlayerNameChange(player, index);
    } else if (category === 'normal') {
      handleNormnalPlayerNameChange(player, index);
    }
  };

  const handleCleanTeams = () => {
    setIsVisible(false);
    setTeams([]);
  }

  const createAlertNotification = (title:string, message:string) => {
    Alert.alert(title, message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  const isVerify = (array:string[]) => {
    return array.filter(elemento => elemento !== null && elemento !== undefined && elemento !== '');
  }

  const handleSortTeams = () => {
    
    if (bestPlayers.length < 2 || worstPlayers.length < 2 || normalPlayers.length < 4) {
      createAlertNotification('Atenção', 'Melhores e medianos devem ter no mínimo dois jogadores em cada');
      return;
    }

    if (bestPlayers.length < worstPlayers.length || bestPlayers.length > worstPlayers.length) {
      createAlertNotification('Atenção', 'Melhores e medianos devem ter a mesma quantidade');
      return;
    }

    const dividedTeams: string[][] = [];

    const [oneBest, twoBest, threeBest, fourBest, fiveBest, sixBest, sevenBest, eightBest] = shuffle(bestPlayers);
    const [oneWorst, twoWorst, threeWorst, fourWorst, fiveWorst, sixWorst, sevenWorst, eightWorst] = shuffle(worstPlayers);
    const [oneNormal, twoNormal, threeNormal, fourNormal, fiveNormal, sixNormal, sevenNormal, eightNormal,
        nineNormal, tenNormal, elevenNormal, twelveNormal, thirteenNormal, fourteenNormal, fifteenNormal,
        sixteenNormal] = shuffle(normalPlayers);

    const team01: string[] = [oneBest, oneWorst, oneNormal, twoNormal];
    const team02: string[] = [twoBest, twoWorst, threeNormal, fourNormal];
    let team3: string[] = [];
    let team4: string[] = [];
    let team5: string[] = [];
    let team6: string[] = [];
    let team7: string[] = [];
    let team8: string[] = [];

    if (!threeBest) {
      team3 = [fiveNormal, sixNormal, sevenNormal, eightNormal];
      team4 = [nineNormal, tenNormal, elevenNormal, twelveNormal];
      team5 = [thirteenNormal, fourteenNormal, fifteenNormal,sixteenNormal];
    } else {
      team3 = [threeBest, threeWorst, fiveNormal, sixNormal];
    }

    if (!fourBest && threeBest !== undefined && threeBest !== null) {
      team4 = [sevenNormal, eightNormal, nineNormal, tenNormal];
      team5 = [elevenNormal, twelveNormal, thirteenNormal, fourteenNormal];
      team6 = [fifteenNormal, sixteenNormal];
    } else if (threeBest !== undefined && threeBest !== null) {
      team4 = [fourBest, fourWorst, sevenNormal, eightNormal];
    }

    if (!fiveBest && fourBest !== undefined && fourBest !== null) {
      team5 = [nineNormal, tenNormal, elevenNormal, twelveNormal];
      team6 = [thirteenNormal, fourteenNormal, fifteenNormal, sixteenNormal];
    } else if (fourBest !== undefined && fourBest !== null) {
      team5 = [fiveBest, fiveWorst, nineNormal, tenNormal];
    }

    if (!sixBest && fiveBest !== undefined && fiveBest !== null) {
      team6 = [elevenNormal, twelveNormal, thirteenNormal, fourteenNormal];
      team7 = [fifteenNormal, sixteenNormal];
    } else if (fiveBest !== undefined && fiveBest !== null) {
      team6 = [sixBest, sixWorst, elevenNormal, twelveNormal];
    }

    if (!sevenBest && sixBest !== undefined && sixBest !== null) {
      team7 = [thirteenNormal, fourteenNormal, fifteenNormal, sixteenNormal];
    } else if (sixBest !== undefined && sixBest !== null) {
      team7 = [sevenBest, sevenWorst, thirteenNormal, fourteenNormal];
    }

    if (!eightBest && sevenBest !== undefined && sevenBest !== null) {
      team8 = [fifteenNormal, sixteenNormal];
    } else if (sevenBest !== undefined && sevenBest !== null) {
      team7 = [eightBest, eightWorst, fifteenNormal, sixteenNormal];
    }

    dividedTeams.push(isVerify(team01));
    dividedTeams.push(isVerify(team02));
    dividedTeams.push(isVerify(team3));
    dividedTeams.push(isVerify(team4));
    dividedTeams.push(isVerify(team5));
    dividedTeams.push(isVerify(team6));
    dividedTeams.push(isVerify(team7));
    dividedTeams.push(isVerify(team8));
  
    setIsVisible(true);
    setTeams(dividedTeams);
  };
  

  const handleAddBestPlayer = () => {
    if (bestPlayers.length < 8) {
      addTotalPlayers(1);
      setBestPlayers([...bestPlayers, '']);
    }
  };

  const handleRemoveBestPlayer = () => {
    if (bestPlayers.length > 0) {
      removeTotalPlayers(1);
      const updatedPlayers = [...bestPlayers];
      updatedPlayers.pop();
      setBestPlayers(updatedPlayers);
    }
  };

  const handleAddWorstPlayer = () => {
    if (worstPlayers.length < 8) {
      addTotalPlayers(1);
      setWorstPlayers([...worstPlayers, '']);
    }
  };

  const handleRemoveWorstPlayer = () => {
    if (worstPlayers.length > 0) {
      removeTotalPlayers(1);
      const updatedPlayers = [...worstPlayers];
      updatedPlayers.pop();
      setWorstPlayers(updatedPlayers);
    }
  };

  const handleAddNormalPlayer = () => {
    if (normalPlayers.length < 16) {
      addTotalPlayers(1);
      setNormalPlayers([...normalPlayers, '']);
    }
  };

  const handleRemoveNormalPlayer = () => {
    if (normalPlayers.length > 0) {
      removeTotalPlayers(1);
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

  const addTotalPlayers = (value: number) => {
    setTotalPlayers(totalPlayers + value);
  };

  const removeTotalPlayers = (value: number) => {
    setTotalPlayers(totalPlayers - value);
  }

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

            <Text style={{ fontSize: 20, marginTop: 20 }}>Melhores e piores devem ser iguais</Text>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Jogadores por time: 4</Text>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Nenhuma lista deve está vazia</Text>

            <Text style={{ fontSize: 20 }}>Total de jogadores: {totalPlayers}</Text>
            
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
          source={require('./public/futviva.png')} resizeMode="contain"
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
