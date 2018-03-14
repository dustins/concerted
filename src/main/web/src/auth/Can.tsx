import React from 'react';
import abilities from './ability';
import { connect } from 'react-redux';
import { Ability } from 'casl';

export interface CanState {
    allowed: boolean;
}

export interface CanProps {
    principal: any;
    run: string;
    on: any;
}

class Can extends React.Component<CanProps, CanState> {
    state = {
        allowed: false
    };

    ability: Ability;

    constructor(props: CanProps, state: CanState) {
        super(props, state);
        this.ability = abilities(this.props.principal);
    }

    componentWillUpdate(nextProps: Readonly<CanProps>, nextState: Readonly<CanState>, nextContext: any): void {
        this.ability = abilities(nextProps.principal);
    }

    render() {
        return this.ability.can(this.props.run, this.props.on) ? React.Children.only(this.props.children) : '';
    }
}

const mapStateToProps = (state: any, props: any) => {
    return {
        principal: state.authentication.principal,
        ...props
    };
};
export default connect(mapStateToProps)(Can);