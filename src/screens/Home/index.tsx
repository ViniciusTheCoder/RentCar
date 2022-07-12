import React from "react";
import { StatusBar } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from "./styles";

import Logo from '../../assets/logo.svg';


export function Home() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>()

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120
        },
        thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
    }

    function handleCarDetails() {
        navigation.navigate('CarDetails')
    }

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

            <CarList
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={carData} onPress={handleCarDetails} />}
            />

        </Container>
    );
}