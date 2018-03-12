import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import './styles/concerted.scss';
import Login from './auth/LoginForm';

interface ConcertedProperties {
    location?: string;
}

const SimplePage = (props: { text: string }) => {
    return <div><h1>{props.text}</h1></div>;
};

const Home = (props: RouteProps) => {
    return <SimplePage text="Home"/>;
};

const About = (props: RouteProps) => {
    return <SimplePage text="About"/>;
};

const RedirectToHome = () => {
    return <Redirect to="/"/>;
};

const NoRoute = () => {
    return <h1>404 Not Found</h1>;
};

export default class Concerted extends React.Component<ConcertedProperties, any> {

    render(): React.ReactNode {
        return (
            <div>
                <Header/>
                <main>
                    <div className="container">
                        <div className="row">
                            <Switch>
                            <Route exact={true} path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/logout" component={RedirectToHome}/>
                            <Route component={NoRoute}/>
                            </Switch>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}