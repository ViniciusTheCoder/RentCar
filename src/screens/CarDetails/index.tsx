import React from "react";
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
import { DTO } from "../../dtos/CarDTO";

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
    Footer
} from './styles';

interface Params {
    car: DTO;
}

export function CarDetails() {
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
                        <ImageSlider imagesUrl={car.photos} />
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
                        <Price>R${car.price}</Price>
                    </Rent>
                </Details>

                <Acessories>
                    {car.accessories.map(acessory => (
                        <Acessory
                            key={acessory.type}
                            name={acessory.name}
                            icon={getAcessoryIcon(acessory.type)}
                        />))
                    }
                </Acessories>
                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                <Button title={"Escolher período do aluguel"} onPress={handleConfirmCar} />
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