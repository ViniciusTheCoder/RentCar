import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';

import { Feather } from '@expo/vector-icons';
import theme from '../../styles/theme';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';


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
    OptionTitle,
    Section
}
    from './styles';

export function Profile() {
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const { user } = useAuth();
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
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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
                        {
                            option === 'dataEdit' ?
                                <Section>
                                    <Input
                                        iconName='user'
                                        placeholder='Nome'
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                    />
                                    <Input
                                        iconName='mail'
                                        editable={false}
                                        defaultValue={user.email}
                                    />
                                    <Input
                                        iconName='credit-card'
                                        placeholder='CNH'
                                        keyboardType='numeric'
                                        defaultValue={user.driver_license}
                                    />
                                </Section>
                                :
                                <Section>
                                    <InputPassword
                                        iconName='lock'
                                        placeholder='Senha atual'
                                    />
                                    <InputPassword
                                        iconName='lock'
                                        placeholder='Nova senha'
                                    />
                                    <InputPassword
                                        iconName='lock'
                                        placeholder='Confirme sua senha'
                                    />
                                </Section>
                        }
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}