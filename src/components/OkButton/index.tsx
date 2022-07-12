import React from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Title
}
    from './styles';

interface Props extends RectButtonProps {
    title: string;
}

export function OkButton({
    title,
    ...rest
}: Props) {
    return (
        <Container {...rest} >
            <Title>{title}</Title>

        </Container>
    );
}