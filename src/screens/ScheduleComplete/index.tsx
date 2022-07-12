import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

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

export function ScheduleComplete() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleRentalDone() {
        navigation.navigate('Home')
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
                <Title>Carro alugado!</Title>
                <Message>Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.</Message>
            </Content>

            <Footer>
                <OkButton title='OK' onPress={handleRentalDone} />
            </Footer>

        </Container>
    );
}