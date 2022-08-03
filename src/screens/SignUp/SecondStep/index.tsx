import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

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

export function SecondStep() {

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
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
                        />
                        <InputPassword
                            iconName='lock'
                            placeholder='Confirmar senha'
                        />
                    </Form>

                    <Button
                        title='Cadastrar'
                        color={theme.colors.success}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}