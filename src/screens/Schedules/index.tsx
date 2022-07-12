import React from "react";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

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

import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import { BackButton } from "../../components/BackButton";

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "react-native";



export function Schedules() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmDate() {
        navigation.navigate('ScheduleDetails')
    }
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

                <Calendar />

            </Content>

            <Footer>
                <Button
                    title="Confirmar" onPress={handleConfirmDate} />
            </Footer>
        </Container>
    )
}