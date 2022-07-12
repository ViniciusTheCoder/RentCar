import React from "react";

import {
    Container,
    Title
} from './styles';

interface Props {
    title: string;
    color?: string;
    onPress: () => void;
}

export function Button({
    title,
    color,
    onPress
}: Props) {
    return (
        <Container onPress={onPress} color={color ? '#03B252' : '#DC1637'}>
            <Title>{title}</Title>
        </Container>
    )
}