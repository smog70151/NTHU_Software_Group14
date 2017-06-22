'use strict';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Alert, Component, PanResponder, Image, BackHandler} from 'react-native';
import clamp from 'clamp';
import PropTypes from 'prop-types';
//import Animatable from 'react-native-animatable';

import * as Animatable from 'react-native-animatable';


const People = [
  'red',
  'green',
  'blue',
  'purple',
  'orange',
]

var SWIPE_THRESHOLD = 375;

export default class WelcomeScreen extends React.Component {

    static propTypes = {

    };

  constructor(props) {

    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: People[0],
    }
    this.gointro = this.gointro.bind(this);
    this.exit = this.exit.bind(this);
  }

  _goToNextPerson() {
    Alert.alert('gotonextperson');
    let currentPersonIdx = People.indexOf(this.state.person);
    let newIdx = currentPersonIdx + 1;

    this.setState({
      person: People[newIdx > People.length - 1 ? 0 : newIdx]
    });

    this.gointro();
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value)+Math.abs(this.state.pan.y._value) > SWIPE_THRESHOLD) {
          if(this.state.pan.x._value < 0 && this.state.pan.y._value > 0){
            Animated.decay(this.state.pan, {
              velocity: {x: vx, y: vy},
              deceleration: 0.98
            }).start(this.exit)
          }else if(this.state.pan.x._value > 0 && this.state.pan.y._value > 0){
            Animated.decay(this.state.pan, {
            velocity: {x: vx, y: vy},
            deceleration: 0.98
            }).start(this.gointro)
          }else {
              Animated.spring(this.state.pan, {
                toValue: {x: 0, y: 0},
                friction: 4
              }).start()
          }
        }else {
            Animated.spring(this.state.pan, {
              toValue: {x: 0, y: 0},
              friction: 4
            }).start()
        }
      }
    })
  }

    gointro() {
      this.state.pan.setValue({x: 0, y: 0});
      this.props.navigation.navigate('Intro');
    }

    exit(){
      BackHandler.exitApp();
    }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextPerson();
    this._animateEntrance();
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 100], outputRange: [0.85, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 100], outputRange: [0.85, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-100, 0], outputRange: [1, 0.85]});
    let nopeScale = pan.x.interpolate({inputRange: [-100, 0], outputRange: [1, 0.85], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require('../images/welcomeback.jpg')} />

        <Text style={styles.title}>Familia</Text>
        <Text style={styles.text}>把心意一直傳遞下去</Text>


        <Animatable.View style={styles.arrow} animation="bounce" easing="ease-in-out" iterationCount="infinite">
          <Image source={require('../images/arrow.png')} />
        </Animatable.View>


        <Animated.View style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
            <Image source={require('../images/heart.png')} />
        </Animated.View>

        <Image style={styles.role} source={require('../images/Welcome.png')} />

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>狠心地離開吧!</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>和爸媽聊天吧!</Text>
        </Animated.View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    width: 64,
    height: 64,
    marginTop: 15,
    zIndex: 5
  },
  role: {
    height: 593*0.45,
    width: 800*0.45,
    marginTop: 15,
  },
  yup: {
    position: 'absolute',
    padding: 15,
    bottom: 1,
    right: 20
  },
  yupText: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgb(120, 120, 120)',
    textShadowOffset:{width:1, height:1},
    textShadowRadius:10
  },
  background: {
    height: 800,
    width: 533,
    position: 'absolute'
  },
  nope: {
    position: 'absolute',
    padding: 15,
    bottom: 1,
    left: 20
  },
  nopeText: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgb(120, 120, 120)',
    textShadowOffset:{width:1, height:1},
    textShadowRadius:10
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
    textShadowColor: 'rgb(165, 165, 165)',
    textShadowOffset:{width:1, height:1},
    textShadowRadius:10
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
    textShadowColor: 'rgb(165, 165, 165)',
    textShadowOffset:{width:1, height:1},
    textShadowRadius:10
  },
  arrow: {
    height: 32,
    width: 32,
    alignSelf:"center",
    marginTop:35
  }
});
