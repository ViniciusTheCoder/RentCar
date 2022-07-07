import React from "react";

import {
    Container,
    Title
} from './styles';

interface Props {
    title: string;
    color?: string;
}

export function Button({
    title,
    ...rest
}: Props) {
    return (
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}