import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

import theme from '../../styles/theme';

import {
    Container,
    InputText,
    IconContainer
}
    from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({
    iconName,
    ...rest
}: InputProps) {
    return (
        <Container >
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>

            <InputText {...rest} />

        </Container>
    );
}