import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import WeatherService from '../../services/weather.data.service';
import { Card } from '../card';
import './content.scss';

const Content: React.FC = (): JSX.Element => {
    const [coordinates, setCoordinates] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [data, setData] = useState<any>(null);

    const isCoordinatesValid = useMemo(
        () => coordinates?.latitude !== null && coordinates?.longitude !== null,
        [coordinates?.latitude, coordinates?.longitude],
    );

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition): void => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
            );

            if (isCoordinatesValid) {
                await WeatherService.getWeather(
                    coordinates?.latitude ?? 0,
                    coordinates?.longitude ?? 0,
                )
                    .then((res) => res.json())
                    .then((result) => {
                        setData(result);
                    });
            }
        };

        fetchData();
    }, [coordinates?.latitude, coordinates?.longitude, setCoordinates]);

    const currentDate = useMemo(() => {
        const date = moment(new Date()).format('ddd, MMMM DD h:mm A');

        return <div className="content__date">{date}</div>;
    }, []);

    return (
        <div className="content">
            {isCoordinatesValid && data !== null && (
                <Card
                    name={data.name}
                    iconId={data.weather[0].icon}
                    temperature={{
                        temperature: data.main.temp,
                        temperatureMax: data.main.temp_max,
                        temperatureMin: data.main.temp_min,
                        feelsLike: data.main.feels_like,
                    }}
                    humidity={data.main.humidity}
                    pressure={data.main.pressure}
                    wind={{
                        speed: data.wind.speed,
                        direction: data.wind.deg,
                    }}
                    description={data.weather[0].main}
                >
                    {currentDate}
                </Card>
            )}
        </div>
    );
};

export { Content };
