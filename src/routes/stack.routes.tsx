
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedules } from "../screens/Schedules";
import { ScheduleComplete } from "../screens/ScheduleComplete";
import { ScheduleDetails } from "../screens/ScheduleDetails";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Screen name="Home" component={Home} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Schedules" component={Schedules} />
            <Screen name="ScheduleComplete" component={ScheduleComplete} />
            <Screen name="ScheduleDetails" component={ScheduleDetails} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}