import React from "react";
import { StatusBar } from "react-native";

import { Car } from "../../components/car";

import {
    Container,
    Header,
    HeaderContent,
    TotalCars
} from "./styles";

import Logo from '../../assets/logo.svg';
import { RFValue } from "react-native-responsive-fontsize";

export function Home() {
    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120
        },
        thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
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

            <Car data={carData} />
        </Container>
    );
}