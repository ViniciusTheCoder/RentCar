import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { DTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Subtitles,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity
}
    from './styles';

interface CarProps {
    car: DTO;
    id: string;
    user_id: string;
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setIsLoading] = useState(true);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
    }, [])

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
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                    <AppointmentsQuantity>5</AppointmentsQuantity>
                </Appointments>
                <FlatList
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Car data={item.car} />
                    )}
                />
            </Content>
        </Container>
    );
}