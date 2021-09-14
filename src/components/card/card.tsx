import React, { useCallback, useMemo, useState } from 'react';
import { CardProps } from './card.types';
import './card.scss';
import { getSymbolDirection } from './get-symbol-direction/get-symbol-direction.function';
import { convertCelsiusToFahrenheit } from './convert-celsius-to-fahrenheit';
import classNames from 'classnames';
import { Tooltip } from '../tooltip';
import { getColorModifier } from './get-color-modifier';

const Card: React.FC<CardProps> = (props): JSX.Element => {
    const [isToday, setIsToday] = useState<boolean>(true);

    const windDirection = useMemo(() => {
        const degree = Number(props.wind.direction);

        return !Number.isNaN(degree) ? getSymbolDirection(degree) : 'N/A';
    }, [props.wind.direction]);

    const fixedCelsiusTemperature = useCallback(
        (temperature: string): string => {
            return `${Number(temperature).toFixed(0)}°C`;
        },
        [],
    );

    const fixedFahrenheitTemperature = useCallback(
        (temperature: string): string => {
            return `${convertCelsiusToFahrenheit(Number(temperature)).toFixed(
                0,
            )}°F`;
        },
        [],
    );

    const toggle = useCallback((): void => {
        document.querySelector('.card')?.classList.toggle('flipped');

        setIsToday((prevState) => !prevState);
    }, []);

    return (
        <>
            <section
                className={classNames(
                    'card',
                    `card--${getColorModifier(
                        Number(props.temperature.temperature),
                    )}`,
                )}
            >
                <div className="card__inner">
                    <div
                        className={classNames(
                            'card__front',
                            `card__front--${getColorModifier(
                                Number(props.temperature.temperature),
                            )}`,
                        )}
                    >
                        <h5 className="card__title">{props?.name}</h5>
                        <>{props.children}</>
                        <div className="card__temperature-info">
                            <div className="card__temperature--first">
                                <div className="card__icon">
                                    {props.iconId && (
                                        <img
                                            src={`http://openweathermap.org/img/wn/${props.iconId}@2x.png`}
                                        />
                                    )}
                                </div>

                                <Tooltip
                                    className="card__temperature--celsius"
                                    message={`${fixedFahrenheitTemperature(
                                        props.temperature.temperature,
                                    )}`}
                                >
                                    {fixedCelsiusTemperature(
                                        props.temperature.temperature,
                                    )}
                                </Tooltip>
                            </div>

                            <div className="card__temperature--second">
                                <Tooltip
                                    className="card__temperature-max"
                                    message={`${fixedFahrenheitTemperature(
                                        props.temperature.temperatureMax,
                                    )}`}
                                >
                                    {`${fixedCelsiusTemperature(
                                        props.temperature.temperatureMax,
                                    )}`}
                                </Tooltip>
                                <span className="card__temperature-separator">
                                    /
                                </span>
                                <Tooltip
                                    className="card__temperature-min"
                                    message={`${fixedFahrenheitTemperature(
                                        props.temperature.temperatureMin,
                                    )}`}
                                >
                                    {`${fixedCelsiusTemperature(
                                        props.temperature.temperatureMin,
                                    )}`}
                                </Tooltip>
                                <span className="card__temperature-separator">
                                    |
                                </span>
                                <Tooltip
                                    className="card__temperature-feel"
                                    message={`${fixedFahrenheitTemperature(
                                        props.temperature.feelsLike,
                                    )}`}
                                >
                                    {` RealFeel ${fixedCelsiusTemperature(
                                        props.temperature.feelsLike,
                                    )}`}
                                </Tooltip>
                            </div>
                        </div>

                        {props.description && (
                            <div className="card__description">
                                <div className="card__field-title">
                                    Description:
                                </div>
                                <div className="card__field-value">
                                    {props.description}
                                </div>
                            </div>
                        )}

                        <div className="card__wind">
                            <div className="card__field-title">Wind:</div>
                            <div
                                className={
                                    (classNames('card__field-value'),
                                    'card__field-value--couple')
                                }
                            >
                                {props.wind.speed} meter/sec
                            </div>
                            <div
                                className={
                                    (classNames('card__field-value'),
                                    'card__field-value--couple')
                                }
                            >
                                {windDirection}
                            </div>
                        </div>
                        <div className="card__humidity">
                            <div className="card__field-title">Humidity:</div>
                            <div className="card__field-value">
                                {props.humidity}%
                            </div>
                        </div>
                        <div className="card__pressure">
                            <div className="card__field-title">Pressure:</div>
                            <div className="card__field-value">
                                {props.pressure} hPa
                            </div>
                        </div>
                    </div>
                    {props.backSide && (
                        <div className="card__back">{props.backSide}</div>
                    )}
                </div>
            </section>

            {props.backSide && (
                <div className="card__action" onClick={toggle}>
                    {isToday ? 'Tomorrow' : 'Today'}
                </div>
            )}
        </>
    );
};

export { Card };
