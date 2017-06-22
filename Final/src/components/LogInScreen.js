import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Alert, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {Fab, Button, Toast, Container, Content, Form, Item, Input, Label, Text, Radio, ListItem} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import {
    listAccounts, checkAccount,
    setSearchUser, setSearchPwd, loginAccount
} from '../states/account-actions.js';
import {
    setRole
} from '../states/postit-actions.js';

import {connect} from 'react-redux';

class LogInScreen extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            isMom: true,
            isEmpty: false,
            isAccountLogin: false
        };

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleChangeMom = this.handleChangeMom.bind(this);
        this.handleChangeSon = this.handleChangeSon.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(loginAccount(this.props.searchUser,this.props.searchPwd));
    }

    componentWillMount() {
        this.props.dispatch(setRole('parent'));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchUser !== this.props.searchUser || nextProps.searchPwd !== this.props.searchPwd) {
            this.props.dispatch(loginAccount(nextProps.searchUser, nextProps.searchPwd));
        }
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
          <Container>
               <Content>
                    <Text style={{textAlign: 'center', fontSize: 24}}>{'\n'}登入{'\n'}</Text>
                   <Form>
                       <Item floatingLabel>
                           <Label><Icon name='user-o'  style={{fontSize: 24}} />  帳號 ( Familia )</Label>
                           <Input value={this.props.searchUser} onChange={this.handleChangeUser}/>
                       </Item>
                       <Item floatingLabel last>
                           <Label><Icon name='key'  style={{fontSize: 24}} />  密碼 ( nthuss-demo )</Label>
                           <Input value={this.props.searchPwd} onChange={this.handleChangePassword}/>
                       </Item>
                   </Form>
                   <Grid>
                       <Row style={styles.btnRow}>
                           <Col></Col>
                           <Col style={{alignItems: 'center'}}>
                                <Text>{'\n'}</Text>
                                <Image style={styles.parent} source={require('../images/mom.jpg')} />
                                <Text>{'\n'}</Text>
                                <Radio selected={this.state.isMom} onPress={this.handleChangeMom} />
                            </Col>
                            <Col style={{alignItems: 'center'}}>
                                <Text>{'\n'}</Text>
                                <Image style={styles.child} source={require('../images/son.jpg')} />
                                <Text>{'\n'}</Text>
                                <Radio selected={!this.state.isMom} onPress={this.handleChangeSon} />
                            </Col>
                            <Col></Col>
                       </Row>
                   </Grid>
                   <TouchableOpacity onPress={this.handleLogIn} >
                       <Text style={styles.Button}> 送出 </Text>
                   </TouchableOpacity>
                   <Modal isVisible={this.state.isEmpty} animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000}
                          animationOutTiming={1000} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}>
                       <Button style={{alignSelf: 'center'}} onPress={this.handleCloseModal} dark rounded large><Text style={{fontSize: 24}}>有欄位是空的唷！</Text></Button>
                   </Modal>
                   <Modal isVisible={this.state.isAccountLogin} animationIn={'zoomInDown'} animationOut={'zoomOutUp'} animationInTiming={1000}
                          animationOutTiming={1000} backdropTransitionInTiming={1000} backdropTransitionOutTiming={1000}>
                       <Button style={{alignSelf: 'center'}} onPress={this.handleCloseModal} dark rounded large><Text style={{fontSize: 24}}>帳號密碼錯誤！</Text></Button>
                   </Modal>
               </Content>
           </Container>
        );
    }

    handleCloseModal() {
        this.setState({isEmpty: false, isAccountLogin: false});
    }

    handleChangeMom() {
        this.setState({isMom: true});
        this.props.dispatch(setRole('parent'));
    }

    handleChangeSon() {
        this.setState({isMom: false});
        this.props.dispatch(setRole('child'));
    }

    handleChangeUser(e) {
        const {dispatch} = this.props;
        const inputContent = e.nativeEvent.text;

        // Reload User Name
        dispatch(setSearchUser(inputContent));
    }

    handleChangePassword(e) {
        const {dispatch} = this.props;
        const inputContent = e.nativeEvent.text;

        // Reload Password
        dispatch(setSearchPwd(inputContent));
    }


    handleLogIn() {

        const {dispatch, searchUser, searchPwd} = this.props;

        console.log("User : " + searchUser) ;
        console.log("Password : " + searchPwd) ;


        if( searchUser === '' || searchPwd === '')
        {
            this.setState({isEmpty: true});
            return;
        }
        if(this.props.loginAccounts.length !== 1)
        {
            this.setState({isAccountLogin: true});
            return;
        }

        AsyncStorage.setItem('@Route:searchUser',searchUser).then(()=> {
            AsyncStorage.setItem('@Route:searchPwd',searchPwd);
            AsyncStorage.setItem('@Route:Role',this.props.role);
        }).then(()=>{
            dispatch(setSearchPwd(''));
        }).catch((err) => console.error(err))

        this.props.navigation.navigate('Postit');
        // dispatch(setSearchPwd(''));
    }
}

const styles = {
    Button: {
      alignSelf: 'center',
      marginTop: 50,
      flex: 1,
      flexDirection: 'row',
    },
    parent: {
        backgroundColor:'rgba(20, 13, 121, 0)',
        marginTop: 20,
        width: 300/3,
        height: 445/3
    },
    child: {
        backgroundColor:'rgba(20, 13, 121, 0)',
        marginTop: 40,
        width: 300/3,
        height: 387/3
    },
    roleBtn: {
        backgroundColor:'rgba(20, 13, 121, 0)'
    },
    btnRow: {
        borderWidth: 0
    }

};

export default connect((state, ownProps) => ({
    ...state.searchLogin,
    ...state.loginAccount,
    role: state.role
}))(LogInScreen);
