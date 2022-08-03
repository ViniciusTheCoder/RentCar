import React, { useState } from 'react';
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
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function Input({
    iconName,
    value,
    ...rest
}: InputProps) {
    const [focused, setIsFocused] = useState(false);
    const [filled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return (
        <Container>
            <IconContainer isFocused={focused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(focused || filled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={focused}
                {...rest}
            />

        </Container>
    );
}