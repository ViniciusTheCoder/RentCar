import React, { useState } from "react";
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
import { Calendar, DayProps } from "../../components/Calendar";
import { BackButton } from "../../components/BackButton";

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "react-native";



export function Schedules() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmDate() {
        navigation.navigate('ScheduleDetails')
    }

    function handleBack() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = 
    };

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle={"light-content"}
                    translucent
                    backgroundColor={"transparent"}
                />
                <BackButton onPress={handleBack} color={"#E1E1E8"} />
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

                <Calendar
                    markedDate={ }
                    onDayPress={handleChangeDate}
                />

            </Content>

            <Footer>
                <Button
                    title="Confirmar" onPress={handleConfirmDate} />
            </Footer>
        </Container>
    )
}