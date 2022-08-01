import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

import theme from '../../styles/theme';

import {
    Container,
    InputText,
    IconContainer,
    ChangePasswordVisibilityButton
}
    from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function InputPassword({
    iconName,
    ...rest
}: InputProps) {
    const [isPasswordVisible, setisPasswordVisible] = useState(true);

    function handlePasswordVisibilityChange() {
        setisPasswordVisible(prevState => !prevState)
    }

    return (
        <Container >
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                secureTextEntry={isPasswordVisible}
                {...rest} />

            <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
                <IconContainer>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </ChangePasswordVisibilityButton>
        </Container>
    );
}