import React from "react";

import { Feather } from '@expo/vector-icons';

import {
    Calendar as CustomCalendar,
    LocaleConfig
} from "react-native-calendars";

LocaleConfig.locales['pt-br'] = {

    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

};

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
    return (
        <CustomCalendar
            renderArrow={(direction) =>
                <Feather
                    name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                    size={24}
                    color={"#7A7A80"}
                />
            }

            headerStyle={{
                backgroundColor: '#FFFFFF',
                borderBottomWidth: 0.5,
                borderBottomColor: '#AEAEB3',
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme={{
                textDayFontFamily: 'Inter_400Regular',
                textDayHeaderFontFamily: 'Inter_500Medium',
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                textMonthFontFamily: 'Archivo_600SemiBold',
                monthTextColor: '#47474D',
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={String(new Date())}
        />
    )
}