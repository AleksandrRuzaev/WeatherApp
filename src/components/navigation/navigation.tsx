import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../utilities/routes';

const NavigatinContainer = styled.nav`
    display: flex;
    flex-direction: column;
`;

const NavigatinLink = styled.div`
    padding: 1em 1.5em;
`;

const Navigation: React.FC<{}> = () => {
    return (
        <NavigatinContainer>
            <NavigatinLink>
                <Link to={routes.todayTomorrow.route}>
                    {routes.todayTomorrow.label}
                </Link>
            </NavigatinLink>
            <NavigatinLink>
                <Link to={routes.fiveDays.route}>{routes.fiveDays.label}</Link>
            </NavigatinLink>
        </NavigatinContainer>
    );
};

export { Navigation };
