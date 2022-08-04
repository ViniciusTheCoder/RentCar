import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';

import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { OkButton } from '../../components/OkButton';

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { title, message, nextScreenRoute } = route.params as Params;

    function handleRentalDone() {
        navigation.navigate(nextScreenRoute)
    }
    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                translucent
                backgroundColor={"transparent"}
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>
                <Message>{message}</Message>
            </Content>

            <Footer>
                <OkButton title='OK' onPress={handleRentalDone} />
            </Footer>

        </Container>
    );
}