import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform, AsyncStorage} from 'react-native'

import {Container, Content, Thumbnail, Badge, Button, Text as NbText} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    render() {
      const {navigate} = this.props;
      return (
        <Container style={styles.drawer}>
            <Image source={require('../images/family.jpg')} style={styles.header}>
                <Image large source={require('../images/Start.png')} style={{height: 100, width: 105}}/>
            </Image>
            <Button block transparent style={styles.item} onPress={() => navigate('Postit')}>
                <Text>&nbsp;&nbsp;&nbsp;</Text><Icon name='pencil-square-o' style={styles.icon} />
                <Text>&nbsp;</Text><Text style={styles.text}>便利貼</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Gallery')}>
                <Text>&nbsp;&nbsp;</Text><Icon name='picture-o' style={styles.icon} />
                <Text>&nbsp;</Text><Text style={styles.text}>回憶相簿</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Info')}>
                <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text><Icon name='info' style={styles.icon} />
                <Text></Text><Text style={styles.text}>&nbsp;&nbsp;&nbsp;關於</Text>
            </Button>
            <Image source={require('../images/son talking.png')}  style={{marginLeft: 30, marginTop: 30, height: 492/3, width: 688/3}}/>
            <View style={styles.item_logout}>
                <Button block transparent style={styles.item} onPress={this.handleLogOut}>
                    <Icon name='sign-out' style={styles.icon} />
                    <Text style={styles.text}>&nbsp;登出</Text>
                </Button>
            </View>
        </Container>
    );
    }

    handleLogOut(){
        AsyncStorage.setItem('@Route:searchPwd','').then(()=>{
          this.props.navigate('Start')
        });

    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    item: {
        alignItems: 'center',
        marginLeft: 10
    },
    icon: {
        color: appColors.primaryLightText,
        marginRight: 15,
        fontSize: 26
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    },
    item_logout: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 10
    }
};
