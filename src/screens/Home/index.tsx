import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { Car } from "../../components/Car";
import { Car as ModelCar } from "../../database/model/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { database } from "../../database";

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
    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);

    const netInfo = useNetInfo();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleCarDetails(car: DTO) {
        navigation.navigate('CarDetails', { car })
    }

    async function offlineSync() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                    .get(`cars/sync/pull?/lastPulledVersion=${lastPulledAt || 0}`);

                const { changes, latestVersion } = response.data;
                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                await api.post('/users/sync', user);

            },
        });
    }

    useEffect(() => {
        let isMounted = true;

        async function searchCars() {
            try {
                const carCollection = database.get<ModelCar>('cars');
                const cars = await carCollection.query().fetch();

                if (isMounted) {
                    setCars(cars);
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

    useEffect(() => {
        if (netInfo.isConnected === true) {
            offlineSync();
        }
    }, [netInfo.isConnected])

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