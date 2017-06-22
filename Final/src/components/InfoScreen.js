import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    ScrollView,
    Linking,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import NavigationContainer from './NavigationContainer';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Content, Card, CardItem, Thumbnail, Left, Body } from 'native-base';

import {connect} from 'react-redux';

class InfoScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='關於我們'>
                <ScrollView style={{backgroundColor: '#FFFFFF'}}>
                    <Text style={{fontSize: 32, alignSelf: 'center', marginTop: 20}}>
                        <Text style={{color: 'rgb(236, 197, 120)'}}>F</Text>amalia
                    </Text>
                    <Text style={{width: 360, alignSelf: 'center', fontSize: 20, marginTop: 14, marginBottom: 6, alignItems: 'center', textAlign: 'center'}}>
                        你多久沒有打電話給爸媽了？{'\n'}
                        {'\n'}
                        學校生活多彩多姿{'\n'}
                        與朋友關係們越來越好{'\n'}
                        但你是否還記得自己的家人?{'\n'}
                        {'\n'}
                        我們是四位大學生{'\n'}
                        上了大學{'\n'}
                        跟父母講話的時間{'\n'}
                        變得很少很少{'\n'}
                        但我們希望去改變{'\n'}
                        {'\n'}
                        藉由 Familia{'\n'}
                        可以增進親子之間的關係{'\n'}
                        希望你喜歡這個APP{'\n'}
                        也請不吝給予指教{'\n'}
                    </Text>
                    <Grid>
                        <Row style={{width: 360, alignSelf: 'center'}}>
                            <Card style={styles.infocard}>
                                <CardItem>
                                    <Image style={{width: 150, height: 150}} source={require('../images/zheng.png')}/>
                                </CardItem>
                                <CardItem>
                                    <Text>鄭可寯</Text>
                                </CardItem>
                            </Card>
                            <Card style={styles.infocard}>
                                <CardItem>
                                    <Image style={{width: 150, height: 150}} source={require('../images/liao.png')}/>
                                </CardItem>
                                <CardItem>
                                    <Text>廖子毅</Text>
                                </CardItem>
                            </Card>
                        </Row>
                        <Row style={{width: 360, alignSelf: 'center'}}>
                            <Card style={styles.infocard}>
                                <CardItem>
                                    <Image style={{width: 150, height: 150}} source={require('../images/lin.png')}/>
                                </CardItem>
                                <CardItem>
                                    <Text>林敏皓</Text>
                                </CardItem>
                            </Card>
                            <Card  style={styles.infocard}>
                                <CardItem>
                                    <Image style={{width: 150, height: 150}} source={require('../images/chiu.png')}/>
                                </CardItem>
                                <CardItem>
                                    <Text>邱賢祐</Text>
                                </CardItem>
                            </Card>
                        </Row>
                    </Grid>
                    <Text style={{width: 360, alignSelf: 'center', textAlign: 'center'}}>
                        {'\n'}
                        <Text style={{fontSize: 18, color: 'rgb(212, 164, 157)'}} onPress={() => Linking.openURL('http://mid-14.us-west-2.elasticbeanstalk.com/')}> Familia Web App {'\n'}</Text>
                        {'\n'}
                        <Text style={{fontSize: 18, color: 'rgb(212, 164, 157)'}} onPress={() => Linking.openURL('https://www.facebook.com/familiakeepintouch/')}> Familia Facebook Page {'\n'}</Text>
                        {'\n'}
                        <Text> Photo source : Photo distributed by Freepik & Flaticon{'\n'}</Text>
                        {'\n'}
                    </Text>
                </ScrollView>
            </NavigationContainer>
        );
    }
}

const styles = {
    infocard: {
        height: 250,
        alignSelf: 'center',
        alignItems: 'center'
    }
}

export default connect(state => ({
}))(InfoScreen);
