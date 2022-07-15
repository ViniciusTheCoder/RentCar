import React from "react";

import { Feather } from '@expo/vector-icons';

import { ptBR } from "./localeConfig";
import { generateInterval } from "./generateInterval";

import {
    Calendar as CustomCalendar,
    LocaleConfig,
    DateCallbackHandler
} from "react-native-calendars";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDatesProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    },
}

interface CalendarProps {
    markedDates: MarkedDatesProps;
    onDayPress: DateCallbackHandler;
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
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
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    )
}

export {
    Calendar,
    MarkedDatesProps,
    DayProps,
    generateInterval
}