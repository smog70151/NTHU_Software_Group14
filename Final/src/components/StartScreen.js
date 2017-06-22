import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {Icon, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {
    listAccounts, checkAccount,
    setSearchUser, setSearchPwd, loginAccount
} from '../states/account-actions.js';
import {
    setRole
} from '../states/postit-actions.js';

class StartScreen extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            User_temp: '',
            Pwd_temp: '',
            Loading: true
        };

        /*this.handleEnterLogIn = this.handleEnterLogIn.bind(this);
        this.handleEnterSignUp = this.handleEnterSignUp.bind(this);*/
    }

    componentWillMount(){
        AsyncStorage.getItem('@Route:searchUser').then((value) => {
          this.setState({
              User_temp:value
          });
          if(this.state.User_temp !== null && this.state.User_temp !== ''){
              this.props.dispatch(setSearchUser(this.state.User_temp));
          }
            return AsyncStorage.getItem('@Route:searchPwd');
        }).then((value) => {
          this.setState({
              Pwd_temp:value
          });
          return AsyncStorage.getItem('@Route:Role');
      }).then((value)=>{
            if (value !== null) {
                this.props.dispatch(setRole(value));
            }
            if(this.state.Pwd_temp !== null && this.state.Pwd_temp !== ''){
                this.props.dispatch(setSearchUser(this.state.User_temp));
                this.props.navigation.navigate('Postit');
              }
        }).then(()=>{
            this.setState({
                Loading:false
            });
        }).catch((err) => console.log(err));
    }

    render() {

      if (!this.state.Loading) {
        return (
            <View style={styles.container}>
                  <Image style={styles.background} source={require('../images/Startback.jpg')} />
                  <Image style={styles.role} source={require('../images/Start.png')} />

                  <View style={styles.container}>
                    <Text style={[styles.title, { fontSize: 40}]}></Text>
                  </View>

                  <View style={styles.container}>
                    <Text style={styles.title}></Text>
                    <Text style={styles.desc}></Text>
                  </View>

                  <View style={styles.bottmContainer}>

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#53423D'}]}
                      onPress={() => this.handleEnterLogIn()}>
                      <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#A58987' }]}
                      onPress={() => this.handleEnterSignUp()}>
                      <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                  </View>
            </View>

        );
      } else {
          return (
            <View style={{ flex: 1 }}>
                <Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View>
          );
      }


    }

    handleEnterLogIn() {
        this.props.navigation.navigate('LogIn');
    }

    handleEnterSignUp() {
        this.props.navigation.navigate('SignUp');
    }



}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottmContainer: {
    height: 60,
    flexDirection: 'row',
  },
  background: {
    height: 800,
    width: 600,
    position: 'absolute',
  },
  role: {
    height: 400*0.7,
    width: 400*0.7,
    marginTop: 150,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  desc: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center'
  }
};

export default connect((state, ownProps) => ({
    ...state.searchLogin,
    ...state.loginAccount
}))(StartScreen);
