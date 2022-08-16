import React, { useState, useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { StatusBar, StyleSheet } from "react-native";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolate } from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import theme from "../../styles/theme";

import { getAcessoryIcon } from '../../utils/getAcessoryIcons';
import { Car as ModelCar } from "../../database/model/Car";
import { DTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Acessories,
    Footer,
    OfflineInfo
} from './styles';

interface Params {
    car: ModelCar;
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<DTO>({} as DTO);
    const netInfo = useNetInfo();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmCar() {
        navigation.navigate('Schedules', { car })
    }

    function handleBack() {
        navigation.goBack();
    }

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
            <StatusBar
                barStyle={'dark-content'}
                translucent
                backgroundColor={'transparent'}
            />
            <Animated.View style={[headerStyleAnimation, { backgroundColor: theme.colors.background_secondary }]}>
                <Header>
                    <BackButton onPress={handleBack} color={""} />

                </Header>
                <Animated.View style={[sliderCarsStyleAnimation]}>
                    <CarImages>
                        <ImageSlider imagesUrl={
                            !!carUpdated.photos ?
                                carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                        } />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: getStatusBarHeight()
            }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R${
                            netInfo.isConnected === true ? car.price : '...'
                        }</Price>
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
                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title={"Escolher período do aluguel"}
                    onPress={handleConfirmCar}
                    enabled={netInfo.isConnected === true}
                />

                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e fazer seu agendamento.
                    </OfflineInfo>
                }
            </Footer>

        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    },
    back: {
        marginTop: 24
    }
})