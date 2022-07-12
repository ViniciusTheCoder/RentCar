import React from "react";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

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
    About,
    Acessories,
    Footer
} from './styles';

export function CarDetails() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmCar() {
        navigation.navigate('Schedules')
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} color={""} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Acessories>
                    <Acessory name='380Km/hr' icon={speedSvg} />
                    <Acessory name='3.2s' icon={accelerationSvg} />
                    <Acessory name='800 HP' icon={forceSvg} />
                    <Acessory name='Gasolina' icon={gasolineSvg} />
                    <Acessory name='Auto' icon={exchangeSvg} />
                    <Acessory name='2 pessoas' icon={peopleSvg} />
                </Acessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestranza de Sevilla.
                    É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>

            <Footer>
                <Button title={"Escolher período do aluguel"} onPress={handleConfirmCar} />
            </Footer>

        </Container>
    )
}