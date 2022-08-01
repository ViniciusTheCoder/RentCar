import React from 'react';
import { StatusBar } from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import theme from '../../styles/theme';

import {
    Container,
    Header,
    Title,
    Form,
    Subtitle,
    Footer
}
    from './styles';

export function SignIn() {
    return (
        <Container>
            <StatusBar
                barStyle='dark-content'
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <Title>Estamos{'\n'}quase lá.</Title>
                <Subtitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível
                </Subtitle>
            </Header>

            <Form>
                <Input
                    iconName='mail'
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize='none'
                />

                <InputPassword
                    iconName='lock'
                    placeholder='Senha'
                />


            </Form>

            <Footer>
                <Button
                    title='Login'
                    onPress={() => { }}
                    enabled={false}
                    loading={false}
                />

                <Button
                    title='Criar conta gratuita'
                    color={theme.colors.success}
                    light
                    onPress={() => { }}
                    enabled={true}
                    loading={false}
                />
            </Footer>
        </Container>
    );
}