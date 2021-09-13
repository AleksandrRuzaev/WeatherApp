import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ITooltipProps, ITooltipState } from './tooltip.types';
import './tooltip.scss';

const Tooltip: React.FC<ITooltipProps> = (props): JSX.Element => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    const [hoverStatus, setHoverStatus] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    const handleMouseEnter = (): void => {
        const ref = elementRef.current;
        const rect = ref?.getBoundingClientRect();

        setHoverStatus(true);

        if (rect) {
            setPosition(() => ({
                top: rect.top + 1.1 * rect.height,
                left: rect.left,
            }));
        }
    };

    useEffect(() => {
        elementRef.current &&
            elementRef.current.addEventListener('mouseenter', handleMouseEnter);
    }, []);

    useEffect(
        () => () => {
            elementRef.current &&
                elementRef.current.removeEventListener(
                    'mouseenter',
                    handleMouseEnter,
                );
        },
        [],
    );

    return (
        <div
            className={classNames(
                'tooltip',
                hoverStatus && 'tooltip--enabled',
                props.className,
            )}
            style={{ maxWidth: props.maxWidth ?? '100%' }}
        >
            <div className={classNames('tooltip__content')} ref={elementRef}>
                {props.children}
            </div>
            <div
                style={{ top: position.top, left: position.left }}
                className={classNames('tooltip__tooltip')}
            >
                {props.message}
            </div>
        </div>
    );
};

export { Tooltip };
