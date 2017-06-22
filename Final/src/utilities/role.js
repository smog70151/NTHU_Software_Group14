import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, TouchableWithoutFeedback, Alert, Image} from 'react-native';


import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getRoleIcon({user ='', size=appMetrics.fontSizeBase,
    onPress=undefined, style=undefined}) {
    switch (user) {
        case 'parent' :
            return <Image source={require('../images/mom.jpg')} onPress={onPress} style={styles.parent}/>;
        case 'child' :
            return <Image source={require('../images/son.jpg')} onPress={onPress} style={styles.child}/>;
        default:
            return <Icon name="help-circle" size={size} onPress={onPress} style={style} />;
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
        width: 300/6,
        height: 445/6,
        marginLeft: 20
    },
    child: {
        backgroundColor:'rgba(20, 13, 121, 0)',
        marginTop: 40,
        width: 300/6,
        height: 387/6,
        marginLeft: 20
    },
    roleBtn: {
        backgroundColor:'rgba(20, 13, 121, 0)'
    },
    btnRow: {
        borderWidth: 0,
        textShadow: 0,
        boxShadow: 0
    }

};
