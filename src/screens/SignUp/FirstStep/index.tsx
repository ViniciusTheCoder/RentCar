import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

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
            </Form>

        </Container>
    );
}