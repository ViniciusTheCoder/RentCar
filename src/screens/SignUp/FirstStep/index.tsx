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

    const navigation = useNavigation<any>();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleFirstStepDone() {
        navigation.navigate('SecondStep')
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
                            keyboardType='email-address'
                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                        />
                    </Form>

                    <Button
                        title='Próximo'
                        onPress={handleFirstStepDone}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}