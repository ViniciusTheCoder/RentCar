import React from "react";

import { BackButton } from "../../components/BackButton";

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";

export function Schedules() {
    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle={"light-content"}
                    translucent
                    backgroundColor={"transparent"}
                />
                <BackButton onPress={() => { }} color={"#E1E1E8"} />
                <Title>Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>
                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>

            </Content>

            <Footer>
                <Button
                    title="Confirmar" />
            </Footer>
        </Container>
    )
}