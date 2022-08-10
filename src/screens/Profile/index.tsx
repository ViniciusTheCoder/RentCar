import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';

import { BackButton } from '../../components/BackButton';


import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton
}
    from './styles';

export function Profile() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSignOut() {

    }


    return (
        <Container>
            <Header>
                <HeaderTop>
                    <BackButton color={theme.colors.shape} onPress={handleGoBack} />
                    <HeaderTitle>Editar Perfil</HeaderTitle>
                    <LogoutButton onPress={handleSignOut}>
                        <Feather
                            name='power'
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeaderTop>

                <PhotoContainer>
                    <Photo source={{ uri: 'https://github.com/ViniciusTheCoder.png' }} />
                    <PhotoButton onPress={() => { }}>
                        <Feather
                            name='camera'
                            size={24}
                            color={theme.colors.shape}
                        />

                    </PhotoButton>
                </PhotoContainer>
            </Header>
        </Container>
    );
}