import React from 'react';
import { ActivityIndicator } from 'react-native';

export function Loading() {
    return (
        <ActivityIndicator
            color={'#DC1637'}
            size={'large'}
            style={{ flex: 1 }}
        />
    );
}