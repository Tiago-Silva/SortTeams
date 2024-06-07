import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${props => props.theme.background};
  flex: 1;
`;

export const Body = styled.ScrollView`
  flex-direction: column;
  min-height: 100%;
  padding: 20px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.color};
  font-size: 20px;
  font-weight: bold;
`;

export const Info = styled.Text`
  color: ${props => props.theme.color};
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
  color: ${props => props.theme.color};
  font-size: 12px;
  color: gray;
  opacity: 0.8;
`;

export const TextIcon = styled.Text`
  color: ${props => props.theme.color};
  font-size: 20px;
  opacity: 0.7;
`;

export const WrapperGroups = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #f1e7e7;
  border-radius: 15px;
  padding: 5px;
`;

export const WrapperIcon = styled.TouchableOpacity`
  flex: 1;
  align-self: center;
`;

export const WrapperInput = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  background-color: #f1e7e7;
  border-radius: 15px;
  padding: 1px 1px 1px 8px;
`;

export const InputTeams = styled.TextInput`
  flex: 1;
  font-size: 20px;
`;
