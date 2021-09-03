import React from 'react';
import './header.scss';

const Header: React.FC = (): JSX.Element => {
    return (
        <header className="header">
            <h3 className="header__title">React Weather Application</h3>
        </header>
    );
};

export { Header };
