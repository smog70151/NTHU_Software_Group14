import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Col, InputGroupButton,
     Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import {
    toggleModal,
    setSearchUser,
    setSearchPwd,
    loginAccount,
    checkLogin
} from 'states/account-actions.js';

import './Login.css';

class Login extends React.Component {
    static propTypes = {
        searchUser: PropTypes.string,
        searchPwd: PropTypes.string,
        loginModalToggle: PropTypes.bool,
        dispatch: PropTypes.func
    };

  constructor(props) {
    super(props);
    console.log(this.props);
    this.Modaltoggle = this.Modaltoggle.bind(this);

    this.inputUserEl = null;
    this.inputPwdEl = null;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputPwdChange = this.handleInputPwdChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

}

  render() {
    const {searchUser, searchPwd} = this.props;

    return (
      <div>
        <Modal isOpen={this.props.loginModal} toggle={this.Modaltoggle}>
          <ModalHeader toggle={this.Modaltoggle}>歡迎來到 Famalia. </ModalHeader>
          <ModalBody>
              <Form>
                  <FormGroup row>
                    <Label for="user" sm={4} className='align-self-center'>帳號</Label>
                    <Col sm={8}>
                        <Input type="text" name="user" id="user" getRef={el => {this.inputUserEl = el}} value={this.props.searchUser} onChange={this.handleInputChange} placeholder="帳號" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="pwd" sm={4} className='align-self-center'>密碼</Label>
                    <Col sm={8}>
                          <Input type="password" name="pwd" id="pwd" getRef={el => {this.inputPwdEl = el}} value={this.props.searchPwd} onChange={this.handleInputPwdChange} placeholder="密碼" />
                    </Col>
                  </FormGroup>
              </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleLogin}>登入</Button>
            <Button color="danger"  onClick={this.Modaltoggle}>取消</Button>
          </ModalFooter>
        </Modal>
        {this.props.isLogin && <Alert className="loginSuccess" color='success'>Success!!</Alert>}
      </div>
    );
  }

  /* Modal Control */
  Modaltoggle() {
    this.props.dispatch(toggleModal());
  }

  /* User input */
  handleInputChange(e) {
      const text = e.target.value;
      console.log(this.props.searchUser);
      this.props.dispatch(setSearchUser(text));
      this.props.dispatch(loginAccount(text, this.props.searchPwd));
      this.props.dispatch(checkLogin(false));
  }

  /* Password input */
  handleInputPwdChange(e) {
      const pwd = e.target.value;
      console.log(this.props.searchPwd);
      this.props.dispatch(setSearchPwd(pwd));
      this.props.dispatch(loginAccount(this.props.searchUser, pwd));
     this.props.dispatch(checkLogin(false));
  }

  /* Login */
  handleLogin() {
      if(!this.props.searchUser || !this.props.searchPwd) {
          return;
      }
      this.props.dispatch(loginAccount(this.props.searchUser, this.props.searchPwd));
      console.log("login length :");
      console.log(this.props.loginAccounts);
      console.log(this.props.loginAccounts.length);
      this.props.dispatch(toggleModal());
      if(this.props.loginAccounts.length === 1)
        this.props.dispatch(checkLogin(true));
  }

}

export default connect(state => ({
    ...state.loginModalToggle,
    ...state.searchLogin,
    ...state.loginAccount
}))(Login);
