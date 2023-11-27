import { 
    Container,
    Body,
    Header,
    Title,
    ImageBack,
    Footer,
    FooterInfo,
    Info,
} from "./styles";
import React, { useState } from 'react';
import {
  Button,
  Text,
  useColorScheme,
  Alert,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { shuffle } from 'lodash';
import { Player } from "../components/Player";
import { TeamsDrawn } from "../components/TeamsDrawn";
import { CATEGORIES } from "../components/PlayerDetail";

export function Home() {
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

  const updateList: Record<string, string[]> = {
    best: bestPlayers,
    worst: worstPlayers,
    normal: normalPlayers,
  };

  const setList: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
    best: setBestPlayers,
    worst: setWorstPlayers,
    normal: setNormalPlayers,
  };

  const handleAddPlayerToCategory = (player: string, index: number, category:  keyof typeof CATEGORIES) => {
    handlePlayerNameChange(player, index,category);
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
  

  const handleAddPlayer = (category: keyof typeof CATEGORIES) => {
    if (updateList[category].length < 8) {
      addTotalPlayers(1);
      setList[category]((prevPlayers) => {
        return [...prevPlayers, ''];
      });
    }
  };

  const handleRemoPlayer = (index:number, category: keyof typeof CATEGORIES) => {
    if (updateList[category].length > 0) {
      removeTotalPlayers(1);
      const updatePlayers = [...updateList[category]];
      updatePlayers.splice(index, 1);
      setList[category]((prevPlayers) => {
        return updatePlayers;
      })
    }
  };

  const handlePlayerNameChange = (text: string, index: number, category:  keyof typeof CATEGORIES) => {
    const updatedPlayers = [...updateList[category]];
    updatedPlayers[index] = text;
    setList[category]((prevPlayers) => {
      return updatedPlayers;
    });
  };

  const addTotalPlayers = (value: number) => {
    setTotalPlayers(totalPlayers + value);
  };

  const removeTotalPlayers = (value: number) => {
    setTotalPlayers(totalPlayers - value);
  }
    return (
      <Container style={backgroundStyle}>
        <Header>
          <Text>Header</Text>
        </Header>
        <Body contentContainerStyle={{ flexGrow: 1 }}>

          <Player 
            listPlayers={bestPlayers}
            title='Melhores jogadores:'
            category='best'
            addPlayer={handleAddPlayer}
            addToCategory={handleAddPlayerToCategory}
            onRemovePlayer={handleRemoPlayer}
          />

          <Player 
            listPlayers={worstPlayers}
            title="Jogadores medianos:"
            category="worst"
            addPlayer={handleAddPlayer}
            addToCategory={handleAddPlayerToCategory}
            onRemovePlayer={handleRemoPlayer}
          />

          <Player 
            listPlayers={normalPlayers}
            title="Jogadores normais:"
            category="normal"
            addPlayer={handleAddPlayer}
            addToCategory={handleAddPlayerToCategory}
            onRemovePlayer={handleRemoPlayer}
          />

          <Info>Melhores e piores devem ser iguais</Info>
          <Info>Jogadores por time: 4</Info>
          <Info>Nenhuma lista deve está vazia</Info>

          <Title>Total de jogadores: {totalPlayers}</Title>
          
          {isVisible 
            ? <Button title="Limpar times" onPress={handleCleanTeams} />
            : <Button title="Sortear Times" onPress={handleSortTeams} />  }

          <TeamsDrawn 
            title="Times Sorteados:"
            teams={teams}
          />

          <Footer>
            <FooterInfo>
              Este aplicativo foi desenvolvido por [ Tiago Silva ].
            </FooterInfo>
          </Footer>
        </Body>
        <ImageBack
          source={require('../../public/futviva.png')} resizeMode="contain"
        />
      </Container>
    );
}