
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
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={'SignIn'}>
            <Screen name="SignIn" component={SignIn} />
            <Screen name="FirstStep" component={FirstStep} />
            <Screen name="SecondStep" component={SecondStep} />
            <Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Schedules" component={Schedules} />
            <Screen name="Confirmation" component={Confirmation} />
            <Screen name="ScheduleDetails" component={ScheduleDetails} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}