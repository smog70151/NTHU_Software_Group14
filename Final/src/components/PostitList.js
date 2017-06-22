import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView,
    RefreshControl,
    Text
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import PostitItem from './PostitItem';

import {connect} from 'react-redux';
import {listPostits} from '../states/postit-actions';

class PostitList extends React.Component {
    static propTypes = {
        postits: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        // this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listPostits(this.props.searchUser));
    }

    componentWillReceiveProps(nextProps) {
        const {searchText, dispatch, postits} = this.props;
        if (searchText !== nextProps.searchText) {
            dispatch(listPostits(nextProps.searchText));
        }
        if (postits !== nextProps.postits) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.postits)
            });
        }
    }

    render() {
        const {listingPostits, postits} = this.props;
        return (
            <View>{(postits.length === 0) ?<Text style={{fontSize:30,alignSelf:'center', marginTop:250}}>關心一下家人吧！</Text>:
                <ListView

                    dataSource={this.state.dataSource}
                    renderRow={(p) => {
                        return <PostitItem {...p} />;
                    }}
                    style={{backgroundColor: '#fff'}}
                />}
            </View>
        );
    }

    handleRefresh() {
        const {dispatch, searchUser} = this.props;
        dispatch(listPostits(searchUser));
    }

    // handleLoadMore() {
    //     const {listingMorePostits, dispatch, postits, searchText} = this.props;
    //     const start = postits[postits.length - 1].id;
    //     if (listingMorePostits !== start)
    //         dispatch(listMorePostits(searchText, start));
    // }
}

export default connect((state, ownProps) => ({
    postits: state.postit.postits,
    searchUser: state.searchLogin.searchUser,
    postitLoading: state.postit.postitLoading
}))(PostitList);
