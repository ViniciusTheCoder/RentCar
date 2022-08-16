import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';
import { useNetInfo } from '@react-native-community/netinfo';

import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

import theme from '../../styles/theme';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';


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

    const netInfo = useNetInfo();
    const { user, signOut, updateUser } = useAuth();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack()
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
            Alert.alert('Você está offline', 'Para mudar a senha conecte-se a internet');
        } else {
            setOption(optionSelected)
        }
    }

    async function handleSignOut() {
        Alert.alert('Tem certeza?',
            'Se você sair, irá precisar de internet para conectar novamente.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Sair',
                    onPress: () => signOut()
                }
            ]
        )

    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                name: Yup.string().required('Nome é obrigatório')
            });

            const data = { name, driverLicense };
            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            });

            Alert.alert('Perfil atualizado')

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Não foi possível atualizar o perfil');
            }
        }

    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri)
        }
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
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleSelectAvatar}>
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
                                        onChangeText={setName}
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
                                        onChangeText={setDriverLicense}
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

                        <Button
                            title='Salvar alterações'
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}