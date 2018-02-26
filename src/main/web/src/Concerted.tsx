import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Route, RouteProps, Redirect } from 'react-router';
import './styles/concerted.scss';

interface ConcertedProperties {
    location?: string;
}

const Home = (props: RouteProps) => {
    return (
        <>
            <h1>Home</h1>
        </>
    );
};

const About = (props: RouteProps) => {
    return (
        <>
            <h1>About</h1>
        </>
    );
};

const RedirectToHome = () => {
    return (
        <>
            <Redirect to="/" />
        </>
    );
};

export default class Concerted extends React.Component<ConcertedProperties, any> {

    render(): React.ReactNode {
        return (
            <>
                <Header/>
                <main>
                    <div className="container">
                        <div className="row">
                            <Route exact={true} path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/login" component={RedirectToHome}/>
                            <Route path="/logout" component={RedirectToHome}/>
                        </div>
                    </div>
                </main>
                <Footer/>
            </>
        );
    }
}