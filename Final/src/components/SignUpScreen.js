import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Alert, Image, TouchableOpacity} from 'react-native';
import {Fab, Button, Toast, Container, Content, Form, Item, Input,Label, Text} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import {
    createAccount,
    inputUser,
    inputPwd,
    inputValid,
    inputDanger,
    inputEmail,
    inputSignUpOK,
    checkAccount
} from '../states/account-actions.js';

class SignUpScreen extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            isEmpty: false,
            isWrong: false,
            isSignup: false,
            isAccountExist: false
        };

        this.handleSignUp = this.handleSignUp.bind(this);

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeValidation = this.handleChangeValidation.bind(this);

        // Close Modal
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseSignupSuccessModal = this.handleCloseSignupSuccessModal.bind(this);
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
        const {user, pwd, validation, email, inputDanger} = this.props;
        return (
          <Container>
               <Content>
                   <Text style={{textAlign: 'center', fontSize: 24}}>{'\n'}註冊{'\n'}</Text>
                   <Form>
                       <Item floatingLabel>
                           <Label><Icon name='user-o'  style={{fontSize: 24}} />  帳號 ( Familia )</Label>
                           <Input value={user} onChange={this.handleChangeUser}/>
                       </Item>
                       <Item floatingLabel>
                           <Label><Icon name='envelope-o'  style={{fontSize: 24}} />  信箱 ( Hello@Familia.com )</Label>
                           <Input value={email} onChange={this.handleChangeEmail}/>
                       </Item>
                       <Item floatingLabel>
                           <Label><Icon name='key'  style={{fontSize: 24}} />  密碼 ( nthuss-demo )</Label>
                           <Input value={pwd} onChange={this.handleChangePassword}/>
                       </Item>
                       <Item floatingLabel>
                           <Label><Icon name='check-circle-o'  style={{fontSize: 24}} />  確認密碼 ( 再輸入一次密碼 )</Label>
                           <Input value={validation} onChange={this.handleChangeValidation}/>
                       </Item>
                       {/*<Button primary center
                           onPress={() => this.handleSignUp()}
                           style={styles.Button}>
                           <Text> 註冊 </Text>
                       </Button>*/}
                       <TouchableOpacity onPress={this.handleSignUp}>
                           <Text style={styles.Button}> 送出 </Text>
                       </TouchableOpacity>
                       <Modal isVisible={this.state.isEmpty} animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000}
                              animationOutTiming={1000} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}>
                           <Button style={{alignSelf: 'center'}} onPress={this.handleCloseModal} dark rounded large><Text style={{fontSize: 24}}>有欄位是空的唷！</Text></Button>
                       </Modal>
                       <Modal isVisible={this.state.isWrong} animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000}
                              animationOutTiming={1000} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}>
                           <Button style={{alignSelf: 'center'}} onPress={this.handleCloseModal} dark rounded large><Text style={{fontSize: 24}}>再確認一次密碼吧！</Text></Button>
                       </Modal>
                       <Modal isVisible={this.state.isAccountExist} animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000}
                              animationOutTiming={1000} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}>
                           <Button style={{alignSelf: 'center'}} onPress={this.handleCloseModal} dark rounded large><Text style={{fontSize: 24}}>帳號重複了呢！</Text></Button>
                       </Modal>
                       <Modal isVisible={this.state.isSignup} animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000}
                              animationOutTiming={1000} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}>
                           <Button style={{alignSelf: 'center'}} onPress={this.handleCloseSignupSuccessModal} dark rounded large><Text style={{fontSize: 24}}>註冊成功！</Text></Button>
                       </Modal>
                   </Form>
               </Content>
           </Container>
        );
    }

    handleCloseSignupSuccessModal() {
        this.setState({isSignup: false});
        this.props.navigation.navigate('Start');
    }

    handleCloseModal() {
        this.setState({isEmpty: false});
        this.setState({isWrong: false, isAccountExist: false});
    }

    handleSignUp() {
        const {dispatch, user, email, pwd, validation} = this.props;

        if(user === '' || email === '' || pwd === '' || validation === '')
        {
            this.setState({isEmpty: true});
            return;
        }
        if( pwd !== validation )
        {
            this.setState({isWrong: true});
            return;
        }

        if(this.props.accounts.length !== 0 )
        {
            this.setState({isAccountExist: true});
            return;
        }

        // Sign up
        dispatch(createAccount(user, pwd, validation, email));

        // Clear Content
        dispatch(inputUser(''));
        dispatch(inputPwd(''));
        dispatch(inputValid(''));
        dispatch(inputEmail(''));

        // Back to Log-in Screen
        this.setState({isSignup: true});
    }

    handleChangeUser(e) {
        const {dispatch} = this.props;
        const inputContent = e.nativeEvent.text;

        // Reload User Name
        dispatch(inputUser(inputContent));
    }

    handleChangeEmail(e) {
        const {dispatch} = this.props;
        const inputContent = e.nativeEvent.text;

        // Reload Email
        dispatch(inputEmail(inputContent));
    }

    handleChangePassword(e) {
        const {dispatch} = this.props;
        const inputContent = e.nativeEvent.text;

        // Reload Password
        dispatch(inputPwd(inputContent));
    }

    handleChangeValidation(e) {
        const {dispatch} = this.props;
        const inputContent = e.nativeEvent.text;

        // Reload validation
        dispatch(inputValid(inputContent));
    }

}

const styles = {
    Button: {
      alignSelf: 'center',
      marginTop: 50,
      flex: 1,
      flexDirection: 'row'
    }
};

export default connect((state, ownProps) => ({
    ...state.signupForm,
    ...state.check
}))(SignUpScreen);
