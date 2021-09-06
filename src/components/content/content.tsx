import React, { useEffect, useState } from 'react';
import WeatherService from '../../services/weather.data.service';

const Content: React.FC = (): JSX.Element => {
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition): void => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
            );

            await WeatherService.getWeather(latitude, longitude)
                .then((res) => res.json())
                .then((result) => {
                    //   setData(result)
                    console.log(result);
                });
        };
    }, [latitude, longitude]);

    return <></>;
};

export { Content };
