import React from 'react';

import {Title, Container, Event, Header, ContainerEvent} from './styles';
import {PlayerList} from '../PlayerDetail';

interface PropsPlayer {
  listPlayers: string[];
  title: string;
  category: string;
  addPlayer: (category: string) => void;
  addToCategory: (text: string, index: number, category: string) => void;
  onRemovePlayer: (index: number, category: string) => void;
}

export function Player({
  listPlayers,
  title,
  category,
  addPlayer,
  addToCategory,
  onRemovePlayer,
}: PropsPlayer) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ContainerEvent onPress={() => addPlayer(category)}>
          <Event source={require('../../../public/bola.png')} />
        </ContainerEvent>
      </Header>
      {listPlayers.map((player, index) => (
        <PlayerList
          index={index}
          player={player}
          category={category}
          addToCategory={addToCategory}
          onRemovePlayer={onRemovePlayer}
        />
      ))}
    </Container>
  );
}
