import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

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
    const [email, setEmail] = useState<any>();
    const [password, setPassword] = useState<any>();

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            onChangeText={setEmail}
                            value={email}
                        />

                        <InputPassword
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}