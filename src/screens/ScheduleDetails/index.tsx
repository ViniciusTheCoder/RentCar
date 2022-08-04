import React, { useState, useEffect } from "react";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { Alert } from "react-native";

import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";
import { DTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { getAcessoryIcon } from '../../utils/getAcessoryIcons';
import { getPlatformDate } from "../../utils/getPlatformDates";

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Acessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer
} from './styles';

interface Params {
    car: DTO;
    dates: string[]
}

interface RentalPeriod {
    start: string;
    end: string
}

export function ScheduleDetails() {
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.rent.price)

    async function handleConfirmRental() {
        {
            const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

            const unavailable_dates = [
                ...schedulesByCar.data.unavailable_dates,
                ...dates,
            ];

            await api.post('schedules_byuser', {
                user_id: 1,
                car,
                startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
                endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
            })

            api.put(`/schedules_bycars/${car.id}`, {
                id: car.id,
                unavailable_dates
            }).then(() => navigation.navigate('Confirmation', {
                nextScreenRoute: 'MyCars',
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a conscessionária RentX\npara pegar o seu automóvel.`
            }))
                .catch(() => {
                    setLoading(false)
                    Alert.alert('Não foi possível confirmar o agendamento');
                });
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} color={"#E1E1E8"} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Acessories>
                    {car.accessories.map(acessory => (
                        <Acessory
                            key={acessory.type}
                            name={acessory.name}
                            icon={getAcessoryIcon(acessory.type)}
                        />
                    ))
                    }
                </Acessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={"#E1E1E8"}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={"#7A7A80"}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} ${dates.length}x diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title={"Alugar agora"}
                    color={'#03B252'}
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>

        </Container>
    )
}
