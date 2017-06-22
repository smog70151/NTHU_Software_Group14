import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Alert,
    Input,
    Button,
    Label,
    Col,
    FormGroup
} from 'reactstrap';
import {connect} from 'react-redux';

import './SignupForm.css';

// import {createPost, input, inputDanger, toggleMood, setMoodToggle, selectMood} from 'states/post-actions.js';
import {
    createAccount,
    inputUser,
    inputPwd,
    inputValid,
    inputDanger,
    inputEmail,
    inputSignUpOK,
    checkAccount
} from 'states/account-actions.js';
// import './PostForm.css';

class SignupForm extends React.Component {
    static propTypes = {
        user: PropTypes.string,
        pwd: PropTypes.string,
        validation: PropTypes.string,
        email: PropTypes.string,
        inputDanger: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputUserEl = null;
        this.inputPwdEl = null;
        this.inputValidationEl = null;
        this.inputEmailEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPwdChange = this.handleInputPwdChange.bind(this);
        this.handleInputValidationChange = this.handleInputValidationChange.bind(this);
        this.handleInputEmailChange = this.handleInputEmailChange.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(checkAccount(this.props.user,''));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.props.dispatch(checkAccount(nextProps.user,''));
        }
    }

    render() {
        const {user, pwd, validation, email} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div>
                <div className='signupform'>
                    <Alert color='primary' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                        <Form>
                            <br/>
                            <FormGroup row>
                                <Label className='signuptext' for='user' sm={4}> 帳號 </Label>
                                <Col sm={8}>
                                    <Input  className='input' id='user' type='text' getRef={el => {this.inputUserEl = el}} value={this.props.user} onChange={this.handleInputChange} placeholder="請輸入您的帳號"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label className='signuptext' for='mail' sm={4}> 信箱 </Label>
                                <Col sm={8}>
                                    <Input  className='input' id='mail' type='email' getRef={el => {this.inputEmailEl = el}} value={this.props.email} onChange={this.handleInputEmailChange} placeholder="請輸入您的信箱帳號"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label className='signuptext' for='pwd' sm={4}> 密碼 </Label>
                                <Col sm={8}>
                                    <Input  className='input' id='pwd'type='password' getRef={el => {this.inputPwdEl = el}} value={this.props.pwd} onChange={this.handleInputPwdChange} placeholder="請輸入您的密碼"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label className='signuptext' for='valid' sm={4}> 確認密碼 </Label>
                                <Col sm={8}>
                                    <Input  className='input' id='valid' type='password' getRef={el => {this.inputValidationEl = el}} value={this.props.validation} onChange={this.handleInputValidationChange} placeholder="再輸入一次輸入您的密碼"></Input>
                                </Col>
                            </FormGroup>
                            <br/>
                            <Col xs={{ size: 6, push: 2, pull: 2, offset: 2 }}>
                                <Button outline color="primary" className='btn-post align-self-center' onClick={this.handlePost}>註冊</Button>
                            </Col>
                            <br/>
                            { this.props.signupOK && <Alert>Success !</Alert> }
                            { this.props.signupFail && <Alert color='danger'>Fail !</Alert> }
                        </Form>
                    </Alert>
                </div>
            </div>

        );
    }

    /* User input */
    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(inputUser(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    /* Password input */
    handleInputPwdChange(e) {
        const pwd = e.target.value
        this.props.dispatch(inputPwd(pwd));
        if (pwd && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    /* Validation input */
    handleInputValidationChange(e) {
        const valid = e.target.value
        this.props.dispatch(inputValid(valid));
        if (valid && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    /* Email */
    handleInputEmailChange (e) {
        const mail = e.target.value
        this.props.dispatch(inputEmail(mail));
        if (mail && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    /* Sign up */
    handlePost() {
        console.log("handling Post...");
        if (!this.props.user || !this.props.pwd || !this.props.validation) {
            this.props.dispatch(inputDanger(true));
            this.props.dispatch(inputSignUpOK(false,true));
            console.log("User doesn't exist...");
            return;
        }

        if( this.props.pwd !== this.props.validation ) {
            this.props.dispatch(inputDanger(true));
            this.props.dispatch(inputSignUpOK(false,true));
            return;
        }
        console.log(this.props.accounts);
        if(this.props.accounts.length === 0)
        {
            this.props.dispatch(createAccount(this.props.user, this.props.pwd, this.props.validation, this.props.email));
            this.props.dispatch(inputUser(''));
            this.props.dispatch(inputPwd(''));
            this.props.dispatch(inputValid(''));
            this.props.dispatch(inputEmail(''));
            this.props.dispatch(inputSignUpOK(true,false));
        }
        else {
            this.props.dispatch(inputDanger(true));
            this.props.dispatch(inputSignUpOK(false,true));
        }
    }
}

export default connect(state => ({
    ...state.signupForm,
    ...state.signUpToggle,
    ...state.check
}))(SignupForm);
