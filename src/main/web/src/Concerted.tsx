import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Settings from './settings/Settings';
import Login from './auth/LoginForm';
import Register from './auth/RegisterForm';
import RequireAuthentication from './auth/RequireAuthentication';
import './styles/concerted.scss';

interface ConcertedProperties {
    location?: string;
}

const SimplePage = (props: { text: string }) => {
    return <><h1>{props.text}</h1></>;
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
            <>
                <Header/>
                <main>
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route exact={true} path="/" component={Home}/>
                                <Route path="/about" component={About}/>
                                <Route path="/settings"
                                    render={(props: any) => (
                                        <RequireAuthentication>
                                            <Settings {...props}/>
                                        </RequireAuthentication>
                                    )}
                                />
                                <Route path="/register" component={Register}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/logout" component={RedirectToHome}/>
                                <Route component={NoRoute}/>
                            </Switch>
                        </div>
                    </div>
                </main>
                <Footer/>
            </>
        );
    }
}