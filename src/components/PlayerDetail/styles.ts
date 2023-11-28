import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const PlayerInput = styled.TextInput.attrs((props) => ({
    placeholderTextColor: props.theme.color,
  }))`
    align-items: center;
    color: ${props => props.theme.color};
`;

export const RemovePlayer = styled.TouchableOpacity`
    /* padding: 10px; */
`;

export const RemoveIcon = styled.Image`
    width: 20px;
    height: 20px;
`;

