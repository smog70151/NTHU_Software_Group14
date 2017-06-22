import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {connect} from 'react-redux';
// import {createVote, setTooltipToggle, toggleTooltip} from '../states/post-actions';
import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem, Card, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import { Col, Row, Grid } from "react-native-easy-grid";

// Get role icon
import {getRoleIcon} from '../utilities/role';
// Delete the Post-it
import {Delete} from '../states/postit-actions';

class PostitItem extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {id, color, user, text, ts} = this.props;

        return (
            <View >
                <Card style={{flexDirection: 'column',
                            alignSelf: 'center',
                            marginLeft: 0,
                            minHeight: 300,
                            width: 370,
                            backgroundColor:color,
                            marginTop: 15,
                            shadowColor: '#000',
                            shadowOffset: {width: 10, height:10},
                            shadowRadius: 5,
                            elevation: 10
                            }}>
                    <Grid>
                        <Col>
                            <Row>
                                {
                                    getRoleIcon({user: user, style: styles.roleIcon})
                                }
                                <Text style={{fontSize: 20, marginTop: 50, marginLeft: 45}}>{moment(ts * 1000).calendar()}</Text>
                                <Button transparent danger iconRight style={{marginTop:7, marginLeft: 32}} onPress={() => this.handleCancel(id)}>
                                      <Icon name='trash' size={24}/>
                                </Button>
                            </Row>
                            <Row style={{width: 300, alignSelf: 'center'}}>
                                <Text style={{fontSize:24}}>{text}</Text>
                            </Row>
                        </Col>

                    </Grid>
                </Card>
            </View>
        );
    }
/*
    <Col size={1}>
        {
            getRoleIcon({user: user, style: styles.roleIcon})
        }
    </Col>
    <Col size={4}>
        <Row size={1}>
        </Row>
        <Row size={10}>
            <Text style={{marginLeft:20,fontSize:24}}>{text}</Text>
        </Row>
    </Col>
    <Col size={1} style={{justifyContent:'space-between'}}>
        <Button transparent danger iconRight style={{marginTop:20}} onPress={() => this.handleCancel(id)}>
              <Icon name='trash' size={24}/>
        </Button>
        <Text style={{marginBottom:30}}>{moment(ts * 1000).calendar()}</Text>
    </Col>
*/
    handleCancel(id) {
        this.props.dispatch(Delete(this.props.searchUser,id));
    }

}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    cardItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0,
        minHeight: 300
    },
    postit: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    wrap: {
        flex: 1
    },
    ts: {
        color: appColors.textLight
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    },
    roleIcon: {
        color: appColors.text,
        fontSize: 32
    }
});

export default connect((state, ownProps) => ({
    searchUser:state.searchLogin.searchUser
}))(PostitItem);
