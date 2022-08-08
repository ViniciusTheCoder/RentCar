import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { DTO } from '../../dtos/CarDTO';
import { getAcessoryIcon } from "../../utils/getAcessoryIcons";

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from './styles'


interface Props extends RectButtonProps {
    data: DTO
}

export function Car({
    data,
    ...rest
}: Props) {

    const MotorIcon = getAcessoryIcon(data.fuel_type)

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${data.price}`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>

            <CarImage
                source={{ uri: data.thumbnail }}
                resizeMode="contain"
            />

        </Container>
    )
}