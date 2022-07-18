import React from "react";

import { ActivityIndicator } from "react-native";

import {
    Container,
    Title
} from './styles';

interface Props {
    title: string;
    color?: string;
    onPress: () => void;
    enabled?: boolean;
    loading?: boolean
}

export function Button({
    title,
    color,
    onPress,
    enabled = true,
    loading = false
}: Props) {
    return (
        <Container
            onPress={onPress}
            color={color ? '#03B252' : '#DC1637'}
            enabled={enabled}
            style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
        >
            {loading ?
                <ActivityIndicator color={'#E1E1E8'} />
                : <Title>{title}</Title>
            }
        </Container>
    )
}