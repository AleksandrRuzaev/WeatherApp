import React from 'react';
import './App.scss';
import { Content } from './content';
import { Header } from './header/header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { routes } from '../utilities/routes';
import { Layout } from './screens/layout';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={routes.todayTomorrow.route}>
                        <></>
                    </Route>
                    <Route path={routes.fiveDays.route}>
                        <></>
                    </Route>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Content />
                            </Layout>
                        }
                    ></Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
