import React, { useState } from 'react';
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
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle
}
    from './styles';

export function Profile() {
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSignOut() {

    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
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

            <Content>
                <Options>
                    <Option
                        active={option === 'dataEdit'}
                        onPress={() => handleOptionChange('dataEdit')}
                    >
                        <OptionTitle active={option === 'dataEdit'}>
                            Dados
                        </OptionTitle>
                    </Option>
                    <Option
                        active={option === 'passwordEdit'}
                        onPress={() => handleOptionChange('passwordEdit')}
                    >
                        <OptionTitle active={option === 'passwordEdit'}>
                            Trocar senha
                        </OptionTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    );
}