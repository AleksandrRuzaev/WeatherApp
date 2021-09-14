import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import WeatherService from '../../services/weather.data.service';
import { Card } from '../card';
import { CardProps } from '../card/card.types';
import { getFormattedDate } from '../card/get-formatted-date';
import './content.scss';

const Content: React.FC = (): JSX.Element => {
    const [coordinates, setCoordinates] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [currentData, setCurrentData] = useState<any>(null);
    const [tomorrowData, setTomorrowData] = useState<any>(null);

    const isCoordinatesValid = useMemo(
        () => coordinates?.latitude !== null && coordinates?.longitude !== null,
        [coordinates?.latitude, coordinates?.longitude],
    );

    const todayFormat = 'ddd, MMMM DD h:mm A';

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
                            setCurrentData(result);

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
                        setTomorrowData(result.daily[1]);
                        console.log(result.daily[1]);
                    });
            },
        );
    }, []);

    return (
        <div className="content">
            {isCoordinatesValid && currentData !== null && (
                <Card
                    name={currentData.name}
                    iconId={currentData.weather[0].icon}
                    temperature={{
                        temperature: currentData.main.temp,
                        temperatureMax: currentData.main.temp_max,
                        temperatureMin: currentData.main.temp_min,
                        feelsLike: currentData.main.feels_like,
                    }}
                    humidity={currentData.main.humidity}
                    pressure={currentData.main.pressure}
                    wind={{
                        speed: currentData.wind.speed,
                        direction: currentData.wind.deg,
                    }}
                    description={currentData.weather[0].main}
                    backSide={
                        tomorrowData ? (
                            <BackSide
                                name={currentData.name}
                                iconId={tomorrowData.weather[0].icon}
                                temperature={{
                                    temperature: tomorrowData.temp.day,
                                    temperatureMax: tomorrowData.temp.max,
                                    temperatureMin: tomorrowData.temp.min,
                                    feelsLike: tomorrowData.feels_like.day,
                                }}
                                humidity={tomorrowData.humidity}
                                pressure={tomorrowData.pressure}
                                wind={{
                                    speed: tomorrowData.wind_speed,
                                    direction: tomorrowData.wind_deg,
                                }}
                                description={tomorrowData.weather[0].main}
                            />
                        ) : undefined
                    }
                >
                    {
                        <div className="content__date">
                            {getFormattedDate(new Date(), todayFormat)}
                        </div>
                    }
                </Card>
            )}
        </div>
    );
};

const BackSide: React.FC<CardProps> = (props): JSX.Element => {
    const tomorrowFormat = 'ddd, MMMM DD';

    return (
        <Card
            name={props.name}
            iconId={props.iconId}
            temperature={{
                temperature: props.temperature.temperature,
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
            <div className="content__date">
                {getFormattedDate(
                    moment(new Date()).add(1, 'day').toDate(),
                    tomorrowFormat,
                )}
            </div>
        </Card>
    );
};

export { Content };
