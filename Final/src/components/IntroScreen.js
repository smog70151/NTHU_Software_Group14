import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback ,Alert ,AsyncStorage} from 'react-native';
import {Icon, Fab, Button, Toast, Text, TouchableOpacity, Image} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import AppIntro from 'react-native-app-intro';

export default class IntroScreen extends React.Component {

  static propTypes = {

  };

  constructor(props) {
      super(props);

      this.state = {

      };

      this.skip = this.skip.bind(this);
      this.done = this.done.bind(this);
  }

  render() {
    const pageArray = [{
      title: '適時的提醒',
      description: '提醒你要記得好好關心爸媽',
      img: require('../images/page1.png'),
      imgStyle: {
        height: 100 * 1.5,
        width: 100 * 1.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: '生活的紀錄',
      description: '照片是分享生活最棒的方式',
      img: require('../images/page2.png'),
      imgStyle: {
        height: 100 * 1.5,
        width: 100 * 1.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }, {
      title: '溝通的空間',
      description: '用感受不到壓力的方式聊天',
      img: require('../images/page3.png'),
      imgStyle: {
        height: 100 * 1.5,
        width: 100 * 1.5,
      },
      backgroundColor: '#296993',
      fontColor: '#fff',
      level: 10,
    }];

    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }

  onSkipBtnHandle = (index) => {
    this.setStorage().done();
    this.skip();
  }

  doneBtnHandle = () => {
    this.setStorage().done();
    this.done();
  }

  setStorage = async () => {
    try {
      await AsyncStorage.setItem('@Route:initialPage', 'Start');
    } catch (error) {
      console.log(error);
    }
  }

  skip(){
    this.props.navigation.navigate('Start')
  }

  done(){
    this.props.navigation.navigate('Start');
  }
}
