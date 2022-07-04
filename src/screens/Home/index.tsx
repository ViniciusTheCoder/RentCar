import React from "react";
import { StatusBar } from "react-native";

import {
    Container,
    Header,
    HeaderContent,
    TotalCars
} from "./styles";

import Logo from '../../assets/logo.svg';
import { RFValue } from "react-native-responsive-fontsize";

export function Home() {
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
        </Container>
    );
}