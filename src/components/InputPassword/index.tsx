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
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string
}

export function InputPassword({
    iconName,
    value,
    ...rest
}: InputProps) {
    const [isPasswordVisible, setisPasswordVisible] = useState(true);
    const [focused, setIsFocused] = useState(false);
    const [filled, setIsFilled] = useState(false);

    function handlePasswordVisibilityChange() {
        setisPasswordVisible(prevState => !prevState)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return (
        <Container isFocused={focused}>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={(focused || filled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                secureTextEntry={isPasswordVisible}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
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