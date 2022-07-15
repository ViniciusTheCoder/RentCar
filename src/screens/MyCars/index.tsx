import React, { useEffect, useState } from 'react';
import { DTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
    Container
}
    from './styles';

export function MyCars() {
    const [cars, setCars] = useState<DTO[]>([]);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
    }, [])

    return (
        <Container>

        </Container>
    );
}