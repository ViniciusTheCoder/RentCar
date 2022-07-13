import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from "./styles";

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { DTO } from '../../dtos/CarDTO';

export function Home() {
    const [cars, setCars] = useState<DTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleCarDetails(car: DTO) {
        navigation.navigate('CarDetails', { car })
    }

    useEffect(() => {
        async function searchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        searchCars();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        heigt={RFValue(12)}
                    />

                    <TotalCars>
                        Total 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            {loading ? <Loading /> :

                <CarList
                    data={cars}
                    keyExtractor={item => (item.id)}
                    renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                />
            }
        </Container>
    );
}