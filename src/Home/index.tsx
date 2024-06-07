import {
  Container,
  Body,
  Title,
  ImageBack,
  Footer,
  FooterInfo,
  Info,
  WrapperGroups,
  WrapperIcon,
  TextIcon,
  WrapperInput,
  InputTeams,
} from './styles';
import React, {useState} from 'react';
import {Button, Alert} from 'react-native';

import {shuffle} from 'lodash';
import {Player} from '../components/Player';
import {TeamsDrawn} from '../components/TeamsDrawn';
import {PlusSquare, XSquare} from 'react-native-feather';

export function Home() {
  // const [bestPlayers, setBestPlayers] = useState<string[]>([]);
  // const [worstPlayers, setWorstPlayers] = useState<string[]>([]);
  // const [normalPlayers, setNormalPlayers] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[][]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [totalPlayers, setTotalPlayers] = useState<number>(8);

  const [groups, setGroups] = useState<Record<string, string[]>>({
    'Grupo 1': ['', '', '', ''],
    'Grupo 2': ['', '', '', ''],
  });
  const [totalTeams, seTotalTeams] = useState<number>(2);

  // const updateList: Record<string, string[]> = {
  //   best: bestPlayers,
  //   worst: worstPlayers,
  //   normal: normalPlayers,
  // };
  //
  // const setList: Record<
  //   string,
  //   React.Dispatch<React.SetStateAction<string[]>>
  // > = {
  //   best: setBestPlayers,
  //   worst: setWorstPlayers,
  //   normal: setNormalPlayers,
  // };

  const handleAddPlayer = (grupo: string) => {
    setGroups(prevGrupos => {
      addTotalPlayers(1);
      const gruposExistentes = {...prevGrupos};
      const novoJogador = '';
      gruposExistentes[grupo].push(novoJogador);
      return gruposExistentes;
    });
  };

  const handleAddGroup = () => {
    setGroups(prevGrupos => {
      const novoGrupo = {...prevGrupos}; // copia o estado atual dos grupos
      const novoNomeGrupo = 'Grupo ' + (Object.keys(novoGrupo).length + 1); // cria o nome do novo grupo
      novoGrupo[novoNomeGrupo] = []; // adiciona o novo grupo
      return novoGrupo; // atualiza o estado dos grupos
    });
  };

  const handleRemoveGroup = () => {
    setGroups(prevGrupos => {
      const existingGroups = {...prevGrupos};
      const keyGroups = Object.keys(existingGroups);
      const lastGroup = keyGroups[keyGroups.length - 1];
      removeTotalPlayers(groups[lastGroup].length);
      delete existingGroups[lastGroup];
      return existingGroups;
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

  const areAllGroupsEqual = (groups: Record<string, string[]>): boolean => {
    const groupKeys = Object.keys(groups);
    const firstGroupSize = groups[groupKeys[0]].length;

    for (let i = 1; i < groupKeys.length; i++) {
      if (groups[groupKeys[i]].length !== firstGroupSize) {
        return false;
      }
    }

    return true;
  };

  const handleSortTeams = () => {
    if (!areAllGroupsEqual(groups)) {
      createAlertNotification(
        'Atenção',
        'Todos os grupos devem ter a mesma quantidade de jogadores',
      );
      return;
    }

    // Cria uma lista vazia para cada time
    const dividedTeams: string[][] = Array.from({length: totalTeams}, () => []);

    // Para cada grupo
    for (const group of Object.values(groups)) {
      // Embaralha a lista de jogadores
      const shuffledGroup = shuffle(group);

      // Distribui os jogadores nos times
      for (let i = 0; i < shuffledGroup.length; i++) {
        dividedTeams[i % totalTeams].push(shuffledGroup[i]);
      }
    }

    setIsVisible(true);
    setTeams(dividedTeams);
  };

  // const handleAddPlayer = (category: string) => {
  //   if (updateList[category].length >= 16) {
  //     createAlertNotification(
  //       'Atenção!!!',
  //       'A quantidade não pode ser maior que 16',
  //     );
  //     return;
  //   }
  //   addTotalPlayers(1);
  //   setList[category](prevPlayers => {
  //     return [...prevPlayers, ''];
  //   });
  // };

  const handleRemoPlayer = (index: number, category: string) => {
    if (groups[category].length > 0) {
      removeTotalPlayers(1);
      const updatePlayers = [...groups[category]];
      updatePlayers.splice(index, 1);
      setGroups(prevGrupos => {
        return {...prevGrupos, [category]: updatePlayers};
      });
    }
  };

  const handlePlayerNameChange = (
    text: string,
    index: number,
    category: string,
  ) => {
    setGroups(prevGroups => {
      const updatedGroups = {...prevGroups};
      updatedGroups[category][index] = text;
      return updatedGroups;
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
        <WrapperGroups>
          <TextIcon>Grupos: adicione ou remova</TextIcon>
          <WrapperIcon onPress={() => handleAddGroup()}>
            <PlusSquare stroke="blue" fill="#fff" width={24} />
          </WrapperIcon>
          <WrapperIcon onPress={() => handleRemoveGroup()}>
            <XSquare stroke="red" fill="#fff" width={24} />
          </WrapperIcon>
        </WrapperGroups>
        {Object.entries(groups).map(([grupo, jogadores], index) => (
          <Player
            key={index}
            listPlayers={jogadores}
            title={grupo}
            category={grupo}
            addPlayer={handleAddPlayer}
            addToCategory={handleAddPlayerToCategory}
            onRemovePlayer={handleRemoPlayer}
          />
        ))}
        {/*<Info>Melhores e piores devem ser iguais</Info>*/}
        <Info>
          Quantidade de jogadores no grupo deve ser igual a quantidade de times
        </Info>
        <Info>Nenhuma lista deve está vazia</Info>
        <WrapperInput>
          <TextIcon>Adicione o Total de times: </TextIcon>
          <InputTeams
            placeholder={totalTeams.toString()}
            keyboardType="numeric"
            value={totalTeams.toString()}
            onChangeText={(text: string) => seTotalTeams(Number(text))}
          />
        </WrapperInput>
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
