import { FlatList } from "react-native";
import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
`;

export const Body = styled.ScrollView`
    flex-direction: column;
    min-height: '100%';
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const Info = styled.Text`
    font-size: 20px;
    margin-top: 10px;
    opacity: 0.7;
`;

export const ImageBack = styled.ImageBackground`
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
`;

export const Footer = styled.View`
    width: 100%;
    position: absolute;
    bottom: 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const FooterInfo = styled.Text`
    font-size: 12px;
    color: gray;
    opacity: 0.8;
`;