import React from 'react';
import './App.scss';
import { Content } from './content';
import { Header } from './header/header';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Content />
        </>
    );
};

export default App;
