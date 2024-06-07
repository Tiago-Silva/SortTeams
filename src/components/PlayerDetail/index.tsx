import React from 'react';
import {Container, PlayerInput, RemoveIcon, RemovePlayer} from './styles';

export const CATEGORIES = {
  best: 'best',
  worst: 'worst',
  normal: 'normal',
} as const;

interface PropsDetails {
  index: number;
  player: string;
  category: string;
  addToCategory: (text: string, index: number, category: string) => void;
  onRemovePlayer: (index: number, category: string) => void;
}

export function PlayerList({
  index,
  player,
  category,
  addToCategory,
  onRemovePlayer,
}: PropsDetails) {
  const handleNameChange = (text: string, index: number, category: string) => {
    addToCategory(text, index, category);
  };

  const handleRemove = (index: number, category: string) => {
    onRemovePlayer(index, category);
  };

  return (
    <Container key={index}>
      <PlayerInput
        key={index}
        placeholder={`Jogador ${index + 1}`}
        value={player}
        onChangeText={(text: string) => handleNameChange(text, index, category)}
      />
      <RemovePlayer onPress={() => handleRemove(index, category)}>
        <RemoveIcon source={require('../../../public/cartao-vermelho.png')} />
      </RemovePlayer>
    </Container>
  );
}
