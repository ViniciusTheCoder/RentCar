
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { Confirmation } from "../screens/Confirmation";
import { Splash } from "../screens/Splash";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={'Splash'}>
            <Screen name="Splash" component={Splash} />
            <Screen name="SignIn" component={SignIn} />
            <Screen name="FirstStep" component={FirstStep} />
            <Screen name="SecondStep" component={SecondStep} />
            <Screen name="Confirmation" component={Confirmation} />
        </Navigator>
    );
}