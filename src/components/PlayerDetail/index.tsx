import React from 'react';
import { 
    Container, 
    PlayerInput, 
    RemoveIcon, 
    RemovePlayer 
} from './styles';

interface Props {
    index: number;
    player: string;
    category: 'best' | 'worst' | 'normal';
    addToCategory: (text: string, index: number, category: 'best' | 'worst' | 'normal') => void;
    onRemovePlayer: (index:number) => void;
}

export function PlayerList({ 
    index, 
    player, 
    category,
    addToCategory,
    onRemovePlayer
}: Props) {

    const handleNameChange = (text:string, index:number, category: 'best' | 'worst' | 'normal') => {
        addToCategory(text, index, category);
    };

    const handleRemove = (index:number) => {
        onRemovePlayer(index);
    };

    return (
        <Container key={index}>
            <PlayerInput
                key={index}
                placeholder={`Jogador ${index + 1}`}
                value={player}
                onChangeText={(text) => handleNameChange(text, index, category)}
            />
            <RemovePlayer onPress={() => handleRemove(index)}>
                <RemoveIcon>-</RemoveIcon>
            </RemovePlayer>
        </Container>
    );
}