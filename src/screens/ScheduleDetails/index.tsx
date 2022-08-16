import React, { useState, useEffect } from "react";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
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
    const [carUpdated, setCarUpdated] = useState<DTO>({} as DTO);
    const netInfo = useNetInfo();
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price)

    async function handleConfirmRental() {
        setLoading(true);

        await api.post('rentals', {
            user_id: 1,
            car_id: car.id,
            startDate: new Date(dates[0]),
            endDate: (new Date(dates[dates.length - 1])),
            total: rentTotal
        })
            .then(() => navigation.navigate('Confirmation', {
                nextScreenRoute: 'MyCars',
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a conscessionária RentX\npara pegar o seu automóvel.`
            }))
            .catch(() => {
                setLoading(false)
                Alert.alert('Não foi possível confirmar o agendamento');
            });

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

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }
        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} color={"#E1E1E8"} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={
                    !!carUpdated.photos ?
                        carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                }
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                {
                    carUpdated.accessories &&
                    <Acessories>
                        {carUpdated.accessories.map(acessory => (
                            <Acessory
                                key={acessory.type}
                                name={acessory.name}
                                icon={getAcessoryIcon(acessory.type)}
                            />))
                        }
                    </Acessories>
                }

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
                        <RentalPriceQuota>{`R$ ${car.price} ${dates.length}x diárias`}</RentalPriceQuota>
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
