import React, { useMemo } from 'react';
import { CardProps } from './card.types';
import './card.scss';
import { getSymbolDirection } from './get-symbol-direction/get-symbol-direction.function';
import { convertCelsiusToFahrenheit } from './convert-celsius-to-fahrenheit';
import classNames from 'classnames';

const Card: React.FC<CardProps> = (props): JSX.Element => {
    const windDirection = useMemo(() => {
        const degree = Number(props.wind.direction);

        return !Number.isNaN(degree) ? getSymbolDirection(degree) : 'N/A';
    }, [props.wind.direction]);

    const fahrenheitDegree = useMemo(
        () => convertCelsiusToFahrenheit(Number(props.temperature)).toFixed(1),
        [props.temperature],
    );

    return (
        <section className="card">
            <h5 className="card__title">{props?.name}</h5>
            <div className="card__icon">
                {props.iconId && (
                    <img
                        src={`http://openweathermap.org/img/wn/${props.iconId}@2x.png`}
                    />
                )}
            </div>
            {props.description && (
                <div className="card__description">
                    <div className="card__field-title">Description:</div>
                    <div className="card__field-value">{props.description}</div>
                </div>
            )}

            <div className="card__temperature">
                <div className="card__field-title">Temperature:</div>
                <div
                    className={
                        (classNames('card__field-value'),
                        'card__field-value--couple')
                    }
                >
                    {Number(props.temperature).toFixed(1)}°C
                </div>
                <div
                    className={
                        (classNames('card__field-value'),
                        'card__field-value--couple')
                    }
                >
                    {fahrenheitDegree}°F
                </div>
            </div>

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
                <div className="card__field-value">{props.humidity}%</div>
            </div>
            <div className="card__pressure">
                <div className="card__field-title">Pressure:</div>
                <div className="card__field-value">{props.pressure} hPa</div>
            </div>
        </section>
    );
};

export { Card };
