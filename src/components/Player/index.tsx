import React from 'react';

import { 
    Title,
    Container,
    Event,
    Header
} from "./styles";
import { PlayerList } from '../PlayerDetail';

interface Props {
    listPlayers: string[];
    title: string;
    category: 'best' | 'worst' | 'normal';
    addPlayer: () => void;
    addToCategory: (text: string, index: number, category: 'best' | 'worst' | 'normal') => void;
    onRemovePlayer: (index:number) => void;
}

export function Player({
    listPlayers,
    title, 
    category, 
    addPlayer, 
    addToCategory,
    onRemovePlayer
}: Props) {

    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <Event title="+" onPress={addPlayer}/>
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