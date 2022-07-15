import React, { useState } from "react";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";
import { StatusBar, Alert } from "react-native";
import { format } from "date-fns";

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
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from "../../components/Calendar";
import { BackButton } from "../../components/BackButton";
import { getPlatformDate } from "../../utils/getPlatformDates";
import { DTO } from "../../dtos/CarDTO";

import ArrowSvg from '../../assets/arrow.svg';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: DTO;
}

export function Schedules() {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmDate() {
        if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
            Alert.alert('Selecione um intervalo para alugar')
        } else {
            navigation.navigate('ScheduleDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        }
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
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
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
                        <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>
                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>

                <Calendar
                    markedDates={markedDates}
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