import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: column;
    margin-bottom: 10px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ContainerEvent = styled.TouchableOpacity`
    
`;

export const Event = styled.Image`
    height: 20px;
    width: 20px;
`;

export const Title = styled.Text`
    color: ${props => props.theme.color};
    font-size: 20px;
    font-weight: bold;
`;