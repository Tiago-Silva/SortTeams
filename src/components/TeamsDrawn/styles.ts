import styled from "styled-components/native";

export const Container = styled.View`
    margin-bottom: 30px;
`;

export const Header = styled.View`
    
`;

export const Title = styled.Text`
    color: ${props => props.theme.color};
    font-size: 20px;
    font-weight: bold;
`;

export const ContainerPlayersDrawn = styled.View`

`;

export const HeaderPlayersDrawn = styled.Text`
    color: ${props => props.theme.color};
    font-size: 16px;
    font-weight: 700;
`;

export const PlayersDrawn = styled.Text`
    color: ${props => props.theme.color};
`;