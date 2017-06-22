import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem,
    CardColumns
} from 'reactstrap';

import PostItem from 'components/PostItem.jsx';
import {createVote} from 'api/posts.js';

import './PostList.css';

export default class PostList extends React.Component {
    static propTypes = {
        posts: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {posts} = this.props;

        let children = (
            <div className='col-12 empty d-flex justify-content-center align-items-center mx-auto'>
                <div className='empty-text'>沒有便利貼呢<br/>新增一些便利貼吧</div>
            </div>
        );
        if (posts.length) {
            children = posts.map(p => (
                <div className="fluid mb-2" key={p.id} action>
                    <PostItem {...p}/>
                </div>
            ));
        }

        return (
            <div className='row post-list mt-4'>
                <CardColumns className='deck'>{children}</CardColumns>
            </div>
        );
    }

}
