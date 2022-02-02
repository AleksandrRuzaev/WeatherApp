import React from 'react';
import styled from 'styled-components';
import { Header } from '../../header/header';
import { Navigation } from '../../navigation';
import { LayoutProps } from './layout.types';

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 5em;
`;

const Content = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
`;

const Layout: React.FC<LayoutProps> = ({
    children,
    withNavigation = true,
}): JSX.Element => {
    return (
        <LayoutContainer>
            {withNavigation && <Navigation />}
            <Header />
            <Content>{children}</Content>
        </LayoutContainer>
    );
};

export { Layout };
