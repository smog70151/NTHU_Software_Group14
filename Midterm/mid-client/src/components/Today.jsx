import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';


import {cancelWeather} from 'api/open-weather-map.js';
import {getWeather} from 'states/weather-actions.js';
import {listPosts, createPost, createVote} from 'states/post-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';
import Notify from  'components/Notify.jsx';
import NotifyS from  'components/NotifyS.jsx';
import NotifyR from  'components/NotifyR.jsx';

import './Today.css';

class Today extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        searchText: PropTypes.string,
        postLoading: PropTypes.bool,
        posts: PropTypes.array,
        role: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.props.dispatch(listPosts(this.props.searchUser, true));
        console.log(this.props.role);
        console.log(this.props);
    }

    componentWillUnmount() {
        if (this.props.weatherLoading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listPosts(this.props.searchUser, nextProps.searchText));
        }
    }

    render() {
        const {city, group, description, temp, unit, masking, posts, postLoading, isLogin} = this.props;

        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;
        return (

            <div>
                {!isLogin ? <div className="d-flex justify-content-center align-items-center loginWarning">請先登入！</div>:
                <div className='today'>
                    <div className='notify'>
                        {(group === 'rain' || group === 'drizzle' || group === 'thunderstorm')?<NotifyR/>:
                        (group === 'clear' && ((temp >= 30 && unit === 'metric') || (temp >= 86 && unit === 'imperial')))?<NotifyS/>:
                        <Notify/>
                        }
                    </div>
                    <div className='title text-center display-3 my-5'>
                        塗鴉牆
                    </div>
                    <div className='posts'>
                        <PostForm />
                        <PostList posts={posts} className="postList"/>{
                            postLoading &&
                            <Alert color='warning' className='loading'>Loading...</Alert>
                        }
                    </div>
                </div>}
            </div>
        );
    }
}

export default connect(state => ({
    role: state.role,
    ...state.weather,
    unit: state.unit,
    ...state.post,
    searchText: state.searchText,
    isLogin: state.loginAccount.isLogin,
    searchUser:state.searchLogin.searchUser
}))(Today);
