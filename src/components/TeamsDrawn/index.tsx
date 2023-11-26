import React from 'react';
import { 
    Container, ContainerPlayersDrawn, Header, HeaderPlayersDrawn, PlayersDrawn, Title
 } from './styles';
import { Text } from 'react-native';

 interface Props {
    title: string;
    teams: string[][];
 }

export function TeamsDrawn({title, teams}: Props) {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
            </Header>
            {teams.map((team, index) => (
                <ContainerPlayersDrawn key={index}>
                    <HeaderPlayersDrawn>
                        {`Time ${index + 1}:`}
                    </HeaderPlayersDrawn>
                    {team.map((player, playerIndex) => (
                        <PlayersDrawn key={playerIndex}>
                            {player}
                        </PlayersDrawn>
                    ))}
                </ContainerPlayersDrawn>
            ))}
        </Container>
    );
}