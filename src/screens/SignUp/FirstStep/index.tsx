import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

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

export function FirstStep() {

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
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName='user'
                            placeholder='Nome'
                        />
                        <Input
                            iconName='mail'
                            placeholder='Email'
                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                        />
                    </Form>

                    <Button
                        title='Próximo'
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}