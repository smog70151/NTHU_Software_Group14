import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {createPostit, input, inputDanger} from '../states/postit-actions';
import {setToast} from '../states/toast';

import {Container, Header, Content, Title, Left, Right, Body, Button, Item, Label, Input, Fab, Toast} from 'native-base';
import appColors from '../styles/colors';
import Modal from 'react-native-modal';


class PostitFormScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        inputValue: PropTypes.string.isRequired,
        inputDanger: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state={
            color:'rgb(255, 255, 207)',
            isColorPickerOpen: false
        };

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreatPostit = this.handleCreatPostit.bind(this);

        // Post-it Control
        // this.handlePin = this.handlePin.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleColorPicker = this.handleColorPicker.bind(this);

        // Handle Color Blue
        this.changeColorBlue1 = this.changeColorBlue1.bind(this);
        this.changeColorBlue2 = this.changeColorBlue2.bind(this);
        this.changeColorBlue3 = this.changeColorBlue3.bind(this);
        this.changeColorBlue4 = this.changeColorBlue4.bind(this);
        this.changeColorBlue5 = this.changeColorBlue5.bind(this);
        this.changeColorBlue6 = this.changeColorBlue6.bind(this);
        this.changeColorBlue7 = this.changeColorBlue7.bind(this);

        // Handle Color Green
        this.changeColorGreen1 = this.changeColorGreen1.bind(this);
        this.changeColorGreen2 = this.changeColorGreen2.bind(this);
        this.changeColorGreen3 = this.changeColorGreen3.bind(this);
        this.changeColorGreen4 = this.changeColorGreen4.bind(this);
        this.changeColorGreen5 = this.changeColorGreen5.bind(this);
        this.changeColorGreen6 = this.changeColorGreen6.bind(this);
        this.changeColorGreen7 = this.changeColorGreen7.bind(this);

        // Handle Color Red
        this.changeColorRed1 = this.changeColorRed1.bind(this);
        this.changeColorRed2 = this.changeColorRed2.bind(this);
        this.changeColorRed3 = this.changeColorRed3.bind(this);
        this.changeColorRed4 = this.changeColorRed4.bind(this);
        this.changeColorRed5 = this.changeColorRed5.bind(this);
        this.changeColorRed6 = this.changeColorRed6.bind(this);
        this.changeColorRed7 = this.changeColorRed7.bind(this);

    }

    //  Toast  --------------------------

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            })
            this.props.dispatch(setToast(''));
        }
    }

    render() {
        const {inputValue, inputDanger, postits} = this.props;
        return (
                <Container style={{backgroundColor: '#FFFFFF'}}>
                    <Header>
                        <Left><Button transparent
                            onPress={this.handleGoBack}>
                            <Icon name='arrow-left'  style={{fontSize: 24}} />
                        </Button></Left>
                    <Body><Title>便利貼</Title></Body>
                        <Right><Button transparent onPress={this.handleCreatPostit}>
                            <Icon name='check'  style={{fontSize: 24}} />
                        </Button></Right>
                    </Header>
                    <Content style={styles.content}>
                        <Text style={styles.notification}>
                            傳遞你的心意 !
                        </Text>
                        <View regular error={inputDanger} style={{backgroundColor: this.state.color, width: 370, height: 300, alignSelf: 'center'}}>
                            <Row style={{height: 50}}>
                                <Button transparent onPress={this.handleColorPicker}>
                                    <Icon name='paint-brush'  style={{fontSize: 24}} />
                                </Button>
                                <Button transparent onPress={this.handleClear}>
                                    <Icon name='trash'  style={{fontSize: 24}} />
                                </Button>
                            </Row>
                           {/* <Label>What's on your mind?</Label> */}
                           <Input autoFocus multiline maxLength={1024} placeholder=""
                                  style={styles.input} value={inputValue}
                                  onChange={this.handleInputChange} />

                        </View>
                        {!this.state.isColorPickerOpen && <Text style={{fontSize: 24, alignSelf: 'center', marginTop: 60}}><Text style={{color: 'rgb(236, 197, 120)'}}>F</Text>amalia </Text>}
                        <Modal isVisible={this.state.isColorPickerOpen}
                               backdropColor={'#000'}
                               backdropOpacity={0.3}
                               animationIn={'zoomInDown'}
                               animationOut={'zoomOutUp'}
                               animationInTiming={1000}
                               animationOutTiming={1000}
                               backdropTransitionInTiming={1000}
                               backdropTransitionOutTiming={1000}
                               style={styles.colorPickerModal}>
                                <Grid style={styles.colorPicker}>
                            <Row style={styles.colorRow}>
                                <Button style={styles.blue1} onPress={this.changeColorBlue1}>

                                </Button>

                                <Button style={styles.blue2} onPress={this.changeColorBlue2}>

                                </Button>

                                <Button style={styles.blue3} onPress={this.changeColorBlue3}>

                                </Button>

                                <Button style={styles.blue4} onPress={this.changeColorBlue4}>

                                </Button>

                                <Button style={styles.blue5} onPress={this.changeColorBlue5}>

                                </Button>

                                <Button style={styles.blue6} onPress={this.changeColorBlue6}>

                                </Button>

                                {/*<Button style={styles.blue7} onPress={this.changeColorBlue7}>

                                </Button>*/}
                            </Row>
                            <Row style={styles.colorRow}>
                                <Button style={styles.green1} onPress={this.changeColorGreen1}>

                                </Button>

                                <Button style={styles.green2} onPress={this.changeColorGreen2}>

                                </Button>

                                <Button style={styles.green3} onPress={this.changeColorGreen3}>

                                </Button>

                                <Button style={styles.green4} onPress={this.changeColorGreen4}>

                                </Button>

                                <Button style={styles.green5} onPress={this.changeColorGreen5}>

                                </Button>

                                <Button style={styles.green6} onPress={this.changeColorGreen6}>

                                </Button>

                                <Button style={styles.green7} onPress={this.changeColorGreen7}>

                                </Button>
                            </Row>
                            <Row style={styles.colorRow}>
                                <Button style={styles.red1} onPress={this.changeColorRed1} disabled={postits.length <= 5}>
                                    {(postits.length <= 5)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>

                                {/*<Button style={styles.red2} onPress={this.changeColorRed2} disabled={postits.length <= 10}>
                                    {(postits.length <= 10)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>*/}

                                <Button style={styles.red3} onPress={this.changeColorRed3} disabled={postits.length <= 10}>
                                    {(postits.length <= 10)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>

                                <Button style={styles.red4} onPress={this.changeColorRed4} disabled={postits.length <= 10}>
                                    {(postits.length <= 10)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>

                                <Button style={styles.red5} onPress={this.changeColorRed5} disabled={postits.length <= 20}>
                                    {(postits.length <= 20)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>

                                <Button style={styles.red6} onPress={this.changeColorRed6} disabled={postits.length <= 20}>
                                    {(postits.length <= 20)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>

                                <Button style={styles.red7} onPress={this.changeColorRed7} disabled={(this.props.postits.length <= 20)}>
                                    {(postits.length <= 20)&&<Icon name='lock'  style={{fontSize: 12}} />}
                                </Button>
                            </Row>
                        </Grid>
                        </Modal>
                    </Content>
                </Container>
        );
    }

    handleGoBack() {
         this.props.navigation.goBack();
    }

    handleInputChange(e) {
        const {inputDanger: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDanger(false));
        dispatch(input(inputValue));
    }

    handleCreatPostit() {
        const {inputValue, dispatch, account, user} = this.props;
        const {goBack} = this.props.navigation;
        if (inputValue) {
            dispatch(createPostit(account, user, inputValue, this.state.color)).then(() => {
                dispatch(setToast('發佈新便利貼中...'));
            });
            // Clear the Post-it Form Content
            dispatch(input(''));
            goBack();
        } else {
            dispatch(inputDanger(true));
        }
    }

    /* handle Post-it Control */

    // handlePin() {
    //     const {pin} = this.props;
    //     this.props.dispatch(selectPin(!pin));
    // }

    handleClear() {
        this.props.dispatch(input(''));
    }

    handleColorPicker() {
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
        this.props.dispatch(setToast('多發文可以解鎖新顏色唷'));
    }

    /* handle Color */
    changeColorBlue1(e) {
        this.setState({
            color:'#BBD1E3'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorBlue2(e) {
        this.setState({
            color:'#E0FFFF'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorBlue3(e) {
        this.setState({
            color:'#FCF6FD'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorBlue4(e) {
        this.setState({
            color:'#E5F1F5'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorBlue5(e) {
        this.setState({
            color:'#FFFAD8'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorBlue6(e) {
        this.setState({
            color:'#EFF7E8'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorBlue7(e) {
        this.setState({
            color:'#FFF4EC'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen1(e) {
        this.setState({
            color:'#E8FFE8'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen2(e) {
        this.setState({
            color:'#B5FFB5'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen3(e) {
        this.setState({
            color:'#84DCC6'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen4(e) {
        this.setState({
            color:'#A5FFD6'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen5(e) {
        this.setState({
            color:'#FFA69E'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen6(e) {
        this.setState({
            color:'#F5D8A2'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorGreen7(e) {
        this.setState({
            color:'#F8F4A6'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed1(e) {
        this.setState({
            color:'#FFF2F2'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed2(e) {
        this.setState({
            color:'#FFBFBF'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed3(e) {
        this.setState({
            color:'#FCFC7E'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed4(e) {
        this.setState({
            color:'#EBBCBB'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed5(e) {
        this.setState({
            color:'#FFCAD4'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed6(e) {
        this.setState({
            color:'#FFC4EB'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }

    changeColorRed7(e) {
        this.setState({
            color:'#F4E3B2'
        });
        this.setState({isColorPickerOpen: !this.state.isColorPickerOpen});
    }
    /* handle Color */
}

const styles = {
    content: {
        backgroundColor: '#fff'
    },
    color: {
        textAlign: 'center',
        height: 100,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        //backgroundColor: '#fff',
        // marginTop: 4,
        fontSize: 18
    },
    item: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    input: {
        height: 250,
        alignSelf: 'center',
        textAlign: 'center',
        width: 250
    },
    notification: {
        textAlign: 'center',
        height: 80,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        //backgroundColor: '#fff',
        marginTop: 48,
        fontSize: 18
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    colorPicker: {
        marginTop:20,
        height:150
    },
    colorRow: {
        alignItems:'center',
        alignSelf:'center',
        justifyContent: 'center'
    },
    colorIcon: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 2,
        marginLeft: 2,
    },
    blue1: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#BBD1E3'
    },
    blue2: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#E0FFFF'
    },
    blue3: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FCF6FD'
    },
    blue4: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#E5F1F5'
    },
    blue5: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFFAD8'
    },
    blue6: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#EFF7E8'
    },
    blue7: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFF4EC'
    },
    green1: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#E8FFE8'
    },
    green2: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#B5FFB5'
    },
    green3: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#84DCC6'
    },
    green4: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#A5FFD6'
    },
    green5: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFA69E'
    },
    green6: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#F5D8A2'
    },
    green7: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#F8F4A6'
    },
    red1: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFF2F2'
    },
    red2: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFBFBF'
    },
    red3: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FCFC7E'
    },
    red4: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#EBBCBB'
    },
    red5: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFCAD4'
    },
    red6: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#FFC4EB'
    },
    red7: {
        borderRadius:9999,
        borderColor:'#fff',
        borderStyle:'solid',
        borderWidth: 5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor:'#F4E3B2'
    },
    colorPickerModal: {
        paddingTop:450,
    }
};

export default connect(state => ({
    ...state.postitForm,
    user: state.role,
    account: state.searchLogin.searchUser,
    postits: state.postit.postits,
    toast: state.toast
}))(PostitFormScreen);
