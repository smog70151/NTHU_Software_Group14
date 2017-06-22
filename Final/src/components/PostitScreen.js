import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Fab, Button, Toast, Text, Container} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import NavigationContainer from './NavigationContainer';
import PostitList from './PostitList';
import PostitItem from './PostitItem';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {setToast} from '../states/toast';
import {listPostits} from '../states/postit-actions';
import Spinner from 'react-native-loading-spinner-overlay';

class PostitScreen extends React.Component {
    static propTypes = {
        // creatingPostit: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        postits: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false
        };

        // this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePostit = this.handleCreatePostit.bind(this);
    }

    componentDidMount() {
        // this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.props.dispatch(listPostits(this.props.searchUser, true));
        // console.log(this.props.role);
        // console.log(this.props);
    }


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
        const {navigate} = this.props.navigation;

        return (
            <NavigationContainer navigate={navigate} title='便利貼'>
                <Spinner visible={this.props.postitLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}}>
                </Spinner>
                <PostitList />
                <Fab
                    active={this.state.fabActive}
                    containerStyle={styles.fabContainer}
                    style={styles.fab}
                    position="bottomRight"
                    onPress={this.handleCreatePostit}>
                    <Icon name='heart' />
                </Fab>
            </NavigationContainer>
        );
    }

    handleCreatePostit() {
        // this.handleFabClose();
        // this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostitForm');
    }
}

const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
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
    moodIcon: {
        color: appColors.primaryLightText
    }
};

export default connect((state, ownProps) => ({
    // creatingPostit: state.post.creatingPost,
    // creatingVote: state.post.creatingVote,
    toast: state.toast,
    ...state.postit,
    searchUser: state.searchLogin.searchUser
}))(PostitScreen);
