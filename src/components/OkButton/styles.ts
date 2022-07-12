import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { ReactNode } from 'react';
import { RectButton } from 'react-native-gesture-handler';

type ScheduleButtonProps = {
    children: ReactNode
}

export const Container = styled(RectButton) <ScheduleButtonProps>`
width: 80px;
height: 56px;

background-color: ${({ theme }) => theme.colors.shape_dark};

align-items: center;
justify-content: center;
`;

export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.primary_500};
font-size: ${RFValue(15)}px;
color: ${({ theme }) => theme.colors.shape};
`;