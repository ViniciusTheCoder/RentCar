
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedules } from "../screens/Schedules";
import { Confirmation } from "../screens/Confirmation";
import { ScheduleDetails } from "../screens/ScheduleDetails";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={'Home'}>
            <Screen name="Begin" component={Home} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Schedules" component={Schedules} />
            <Screen name="ScheduleDetails" component={ScheduleDetails} />
            <Screen name="Confirmation" component={Confirmation} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}