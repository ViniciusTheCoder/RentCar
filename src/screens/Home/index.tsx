import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from "./styles";

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { DTO } from '../../dtos/CarDTO';

export function Home() {
    const [cars, setCars] = useState<DTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleCarDetails(car: DTO) {
        navigation.navigate('CarDetails', { car })
    }

    useEffect(() => {
        let isMounted = true;
        async function searchCars() {
            try {
                const response = await api.get('/cars');
                if (isMounted) {
                    setCars(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        searchCars();
        return () => {
            isMounted = false;
        };
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
                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {loading ? <LoadAnimation /> :

                <CarList
                    data={cars}
                    keyExtractor={item => (item.id)}
                    renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                />
            }
        </Container>
    );
}