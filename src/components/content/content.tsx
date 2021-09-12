import React, { useEffect, useState } from 'react';
import WeatherService from '../../services/weather.data.service';
import { Card } from '../card';
import './content.scss';

const Content: React.FC = (): JSX.Element => {
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [data, setData] = useState<any>(null);

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
                    setData(result);
                    console.log(result);
                });
        };

        fetchData();
    }, [latitude, longitude]);

    return (
        <div className="content">
            {latitude && longitude && data !== null && (
                <Card
                    name={data.name}
                    iconId={data.weather[0].icon}
                    temperature={data.main.temp}
                    humidity={data.main.humidity}
                    pressure={data.main.pressure}
                    wind={{ speed: data.wind.speed, direction: data.wind.deg }}
                    description={data.weather[0].main}
                />
            )}
        </div>
    );
};

export { Content };
