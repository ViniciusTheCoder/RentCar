import React, { useEffect } from 'react';

import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, interpolate, Extrapolate } from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
    Container
}
    from './styles';

export function Splash() {
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 25, 50],
                [1, .3, 0],
                Extrapolate.CLAMP
            )
        }
    })

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 25, 50],
                [0, .3, 1],
                Extrapolate.CLAMP
            )
        }
    })

    useEffect(() => {
        splashAnimation.value = withTiming(50, { duration: 5000 })
    }, [])

    return (
        <Container>
            <Animated.View style={brandStyle}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={logoStyle}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
}
