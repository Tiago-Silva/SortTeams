import {
  Container,
  Body,
  Title,
  ImageBack,
  Footer,
  FooterInfo,
  Info,
  TimesInput,
} from './styles';
import React, {useState} from 'react';
import {Button, Alert} from 'react-native';

import {shuffle} from 'lodash';
import {Player} from '../components/Player';
import {TeamsDrawn} from '../components/TeamsDrawn';
// import {CATEGORIES} from '../components/PlayerDetail';

export function Home() {
  const [bestPlayers, setBestPlayers] = useState<string[]>([]);
  const [worstPlayers, setWorstPlayers] = useState<string[]>([]);
  const [normalPlayers, setNormalPlayers] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[][]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);

  const [grupos, setGrupos] = useState<Record<string, string[]>>({
    'Grupo 1': ['Jogador 1', 'Jogador 2', 'Jogador 3', 'Jogador 4'],
    'Grupo 2': ['Jogador 1', 'Jogador 2', 'Jogador 3', 'Jogador 4'],
  });
  const [times, seTimes] = useState<number>(2);

  const updateList: Record<string, string[]> = {
    best: bestPlayers,
    worst: worstPlayers,
    normal: normalPlayers,
  };

  const setList: Record<
    string,
    React.Dispatch<React.SetStateAction<string[]>>
  > = {
    best: setBestPlayers,
    worst: setWorstPlayers,
    normal: setNormalPlayers,
  };

  const adicionarJogador = (grupo: string) => {
    setGrupos(prevGrupos => {
      const gruposExistentes = {...prevGrupos};
      const novoJogador = 'Jogador ' + (gruposExistentes[grupo].length + 1);
      gruposExistentes[grupo].push(novoJogador);
      return gruposExistentes;
    });
  };

  const adicionarGrupo = () => {
    setGrupos(prevGrupos => {
      const novoGrupo = {...prevGrupos}; // copia o estado atual dos grupos
      const novoNomeGrupo = 'Grupo ' + (Object.keys(novoGrupo).length + 1); // cria o nome do novo grupo
      novoGrupo[novoNomeGrupo] = []; // adiciona o novo grupo
      return novoGrupo; // atualiza o estado dos grupos
    });
  };

  const handleAddPlayerToCategory = (
    player: string,
    index: number,
    category: string,
  ) => {
    handlePlayerNameChange(player, index, category);
  };

  const handleCleanTeams = () => {
    setIsVisible(false);
    setTeams([]);
  };

  const createAlertNotification = (title: string, message: string) => {
    Alert.alert(title, message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const handleSortTeams = () => {
    if (
      bestPlayers.length < 2 ||
      worstPlayers.length < 2 ||
      normalPlayers.length < 4
    ) {
      createAlertNotification(
        'Atenção',
        'Melhores e medianos devem ter no mínimo dois jogadores em cada',
      );
      return;
    }

    if (
      bestPlayers.length < worstPlayers.length ||
      bestPlayers.length > worstPlayers.length
    ) {
      createAlertNotification(
        'Atenção',
        'Melhores e medianos devem ter a mesma quantidade',
      );
      return;
    }

    const totalTeams = Math.floor(totalPlayers / 4);

    if (
      bestPlayers.length < totalTeams ||
      worstPlayers.length < totalTeams ||
      bestPlayers.length > totalTeams ||
      worstPlayers.length > totalTeams
    ) {
      createAlertNotification(
        'Atenção!!!',
        'Melhores e medianos devem ser igual a quantidade total de times',
      );
      return;
    }

    const dividedTeams: string[][] = [];
    let bestTeams: any[] = shuffle(bestPlayers);
    let worstTeams: any[] = shuffle(worstPlayers);
    let nomalTeams: any[] = shuffle(normalPlayers);

    for (let i = 0; i < totalTeams; i++) {
      const teamsList: any[] = [];
      teamsList.push(bestTeams.shift());
      teamsList.push(worstTeams.shift());
      teamsList.push(nomalTeams.shift());
      teamsList.push(nomalTeams.shift());

      dividedTeams.push(teamsList);
    }

    if (totalPlayers % 4) {
      dividedTeams.push(nomalTeams);
    }

    setIsVisible(true);
    setTeams(dividedTeams);
  };

  const handleAddPlayer = (category: string) => {
    if (updateList[category].length >= 16) {
      createAlertNotification(
        'Atenção!!!',
        'A quantidade não pode ser maior que 16',
      );
      return;
    }
    addTotalPlayers(1);
    setList[category](prevPlayers => {
      return [...prevPlayers, ''];
    });
  };

  const handleRemoPlayer = (index: number, category: string) => {
    if (grupos[category].length > 0) {
      removeTotalPlayers(1);
      const updatePlayers = [...grupos[category]];
      updatePlayers.splice(index, 1);
      setGrupos(prevGrupos => {
        return {...prevGrupos, [category]: updatePlayers};
      });
    }
  };

  const handlePlayerNameChange = (
    text: string,
    index: number,
    category: string,
  ) => {
    const updatedPlayers = [...updateList[category]];
    updatedPlayers[index] = text;
    setList[category](() => {
      return updatedPlayers;
    });
  };

  const addTotalPlayers = (value: number) => {
    setTotalPlayers(totalPlayers + value);
  };

  const removeTotalPlayers = (value: number) => {
    setTotalPlayers(totalPlayers - value);
  };
  return (
    <Container>
      <Body contentContainerStyle={{flexGrow: 1}}>
        <TimesInput
          placeholder="Quantidade de times"
          value={times.toString()}
          onChangeText={(text: string) => seTimes(Number(text))}
        />
        {Object.entries(grupos).map(([grupo, jogadores], index) => (
          <Player
            key={index}
            listPlayers={jogadores}
            title={grupo}
            category={grupo}
            addPlayer={adicionarJogador}
            addToCategory={handleAddPlayerToCategory}
            onRemovePlayer={handleRemoPlayer}
          />
        ))}

        {/*<Player*/}
        {/*  listPlayers={worstPlayers}*/}
        {/*  title="Jogadores medianos:"*/}
        {/*  category="worst"*/}
        {/*  addPlayer={handleAddPlayer}*/}
        {/*  addToCategory={handleAddPlayerToCategory}*/}
        {/*  onRemovePlayer={handleRemoPlayer}*/}
        {/*/>*/}
        {/*<Player*/}
        {/*  listPlayers={normalPlayers}*/}
        {/*  title="Jogadores normais:"*/}
        {/*  category="normal"*/}
        {/*  addPlayer={handleAddPlayer}*/}
        {/*  addToCategory={handleAddPlayerToCategory}*/}
        {/*  onRemovePlayer={handleRemoPlayer}*/}
        {/*/>*/}
        <Info>Melhores e piores devem ser iguais</Info>
        <Info>Jogadores por time: 4</Info>
        <Info>Nenhuma lista deve está vazia</Info>
        <Info>Total de times: {Math.ceil(totalPlayers / 4)}</Info>
        <Title>Total de jogadores: {totalPlayers}</Title>
        {isVisible ? (
          <Button title="Limpar times" onPress={handleCleanTeams} />
        ) : (
          <Button title="Sortear Times" onPress={handleSortTeams} />
        )}
        <TeamsDrawn title="Times Sorteados:" teams={teams} />
        <Footer>
          <FooterInfo>
            Este aplicativo foi desenvolvido por [ Tiago Silva ].
          </FooterInfo>
        </Footer>
      </Body>
      <ImageBack
        source={require('../../public/futviva.png')}
        resizeMode="contain"
      />
    </Container>
  );
}
