import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Label, Input} from 'reactstrap';

import SignupForm from 'components/SignupForm.jsx';
import {createAccount} from 'states/account-actions.js';

import './Signup.css';

class Signup extends React.Component {
    static propTypes = {
        signupLoading: PropTypes.bool,
        accountLoading: PropTypes.bool,
        accounts: PropTypes.array,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

    }

    render() {
        const {user, accounts, accountLoading} = this.props;

        return (
            <div >
                <div >
                    <SignupForm />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
}))(Signup);
