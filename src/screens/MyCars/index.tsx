import { useIsFocused, useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { format, parseISO } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Subtitles,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
}
    from './styles';

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setIsLoading] = useState(true);
    const screenIsFocus = useIsFocused();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/rentals');
                const dataFormatted = response.data.map((data: DataProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                    }
                })
                setCars(dataFormatted)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCars()
    }, [screenIsFocus]);

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle={"light-content"}
                    translucent
                    backgroundColor={"transparent"}
                />
                <BackButton onPress={handleBack} color={"#E1E1E8"} />
                <Title>Seus agendamentos, {'\n'}
                    estão aqui.
                </Title>
                <Subtitles>
                    Conforto, segurança e praticidade.
                </Subtitles>
            </Header>
            {
                loading ? <LoadAnimation /> :
                    <Content>
                        <Appointments>
                            <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                        </Appointments>


                        <FlatList
                            data={cars}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <CarWrapper>
                                    <Car data={item.car} />
                                    <CarFooter>
                                        <CarFooterTitle>Período</CarFooterTitle>
                                        <CarFooterPeriod>
                                            <CarFooterDate>{item.start_date}</CarFooterDate>
                                            <AntDesign
                                                name='arrowright'
                                                size={20}
                                                color={'#47474D'}
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <CarFooterDate>{item.end_date}</CarFooterDate>
                                        </CarFooterPeriod>
                                    </CarFooter>
                                </CarWrapper>
                            )}
                        />
                    </Content>
            }
        </Container>
    );
}