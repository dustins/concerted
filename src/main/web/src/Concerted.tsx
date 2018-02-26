import React from 'react';
import Header from './Header';
import { Route, RouteProps } from 'react-router';

interface ConcertedProperties {
    location?: string;
}

const Home = (props: RouteProps) => {
    return (
        <>
            <h1>home</h1>
        </>
    );
};

const Page1 = (props: RouteProps) => {
    return (
        <>
            <h1>page1</h1>
        </>
    );
};

export default class Concerted extends React.Component<ConcertedProperties, any> {

    render(): React.ReactNode {
        return (
            <>
                <Header/>
                <main>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/page1" component={Page1}/>
                </main>
            </>
        );
    }
}