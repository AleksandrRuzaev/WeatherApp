import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import WeatherService from '../../services/weather.data.service';
import { Card } from '../card';
import { CardProps } from '../card/card.types';
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
        const fetchData = (): void => {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition): void => {
                    WeatherService.getCurrentWeather(
                        position.coords.latitude,
                        position.coords.longitude,
                    )
                        .then((res) => res.json())
                        .then((result) => {
                            setData(result);

                            setCoordinates({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            });
                        });
                },
            );
        };

        fetchData();
    }, [coordinates?.latitude, coordinates?.longitude]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition): void => {
                WeatherService.getForecastWeather(
                    position.coords.latitude,
                    position.coords.longitude,
                )
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                    });
            },
        );
    }, []);

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
                    backSide={
                        <BackSide
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
                        />
                    }
                >
                    {currentDate}
                </Card>
            )}
        </div>
    );
};

const BackSide: React.FC<CardProps> = (props): JSX.Element => {
    return (
        <Card
            name={props.name}
            iconId={props.iconId}
            temperature={{
                temperature: props.temperature.temperature+10,
                temperatureMax: props.temperature.temperatureMax,
                temperatureMin: props.temperature.temperatureMin,
                feelsLike: props.temperature.feelsLike,
            }}
            humidity={props.humidity}
            pressure={props.pressure}
            wind={{
                speed: props.wind.speed,
                direction: props.wind.direction,
            }}
            description={props.description}
        >
            {new Date().toDateString()}
        </Card>
    );
};

export { Content };
