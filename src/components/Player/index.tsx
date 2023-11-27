import React from 'react';

import { 
    Title,
    Container,
    Event,
    Header
} from "./styles";
import { CATEGORIES, PlayerList } from '../PlayerDetail';

interface PropsPlayer {
    listPlayers: string[];
    title: string;
    category: keyof typeof CATEGORIES;
    addPlayer: (category: keyof typeof CATEGORIES) => void;
    addToCategory: (text: string, index: number, category: keyof typeof CATEGORIES) => void;
    onRemovePlayer: (index:number, category: keyof typeof CATEGORIES) => void;
}

export function Player({
    listPlayers,
    title, 
    category, 
    addPlayer, 
    addToCategory,
    onRemovePlayer
}: PropsPlayer) {

    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <Event title="+" onPress={() => addPlayer(category)}/>
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