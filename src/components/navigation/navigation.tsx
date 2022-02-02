import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../utilities/routes';

const NavigatinContainer = styled.nav`
    display: flex;
    flex-direction: column;

    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;

    margin-top: 2em;
`;

const NavigatinLink = styled(Link)`
    padding: 1em 1.5em;

    color: #000;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Navigation: React.FC<{}> = () => {
    return (
        <NavigatinContainer>
            <NavigatinLink to={routes.todayTomorrow.route}>
                {routes.todayTomorrow.label}
            </NavigatinLink>
            <NavigatinLink to={routes.fiveDays.route}>
                {routes.fiveDays.label}
            </NavigatinLink>
        </NavigatinContainer>
    );
};

export { Navigation };
