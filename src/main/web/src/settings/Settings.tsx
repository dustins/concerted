import React from 'react';
import Can from '../auth/Can';
// import { RelativeLink as Link } from 'react-router-relative-link';
import { Route, Switch, Link } from 'react-router-dom';
import Profile from './Profile';

export default class Settings extends React.Component<any, any> {
    render(): React.ReactNode {
        return (
            <>
                <div className="col-sm-3">
                    <nav>
                        <ul className="nav flex-column nav-pills my-1">
                            <li className="nav-item">
                                <Link to="profile" className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="friends" className="nav-link">Friends</Link>
                            </li>
                            <Can run="manage" on="users">
                                <li className="nav-item">
                                    <Link to="users" className="nav-link">Users</Link>
                                </li>
                            </Can>
                        </ul>
                    </nav>
                </div>
                <div className="col-sm-9">
                    <Switch>
                        <Route path={this.props.match.url + '/profile'} component={Profile}/>
                        <Route render={() => (<h2>no match found</h2>)}/>
                    </Switch>
                </div>
            </>
        );
    }
}