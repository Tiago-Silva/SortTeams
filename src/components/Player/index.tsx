import React from 'react';

import { 
    Title,
    Container,
    Event,
    Header,
    ContainerEvent
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
                <ContainerEvent onPress={() => addPlayer(category)}>
                    <Event source={require('../../../public/add-player.png')} />
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