import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

import theme from '../../../styles/theme';

import {
    Container,
    Header,
    StepsWrapper,
    Title,
    Subtitle,
    Form,
    FormTitle
}
    from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicence: string;
    }
}

export function SecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const { user } = route.params as Params;

    function handleGoBack() {
        navigation.goBack();
    }

    function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert('Informe a sua senha e confirme.');
        }

        if (password != passwordConfirm) {
            return Alert.alert('As senhas digitadas são diferentes.');
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack} color={''} />
                        <StepsWrapper>
                            <Bullet active />
                            <Bullet />
                        </StepsWrapper>
                    </Header>

                    <Title>
                        Crie sua {'\n'}conta
                    </Title>
                    <Subtitle>Faça seu cadastro de {'\n'}forma rápida e fácil</Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <InputPassword
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                        <InputPassword
                            iconName='lock'
                            placeholder='Confirmar senha'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Button
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}