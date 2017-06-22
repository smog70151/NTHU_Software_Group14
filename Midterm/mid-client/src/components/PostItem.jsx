import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Button,
    Card, CardImg, CardText, CardBlock,
    CardTitle, CardSubtitle, Col
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';
import {Delete} from 'states/post-actions.js';


import './PostItem.css';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        color: PropTypes.string,
        user: PropTypes.string,
        text: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {id, color, role, text, ts} = this.props;

        return (
            <div className='post-item'>
                <Card className={color+' post'}>
                    <CardBlock>
                        <CardSubtitle>
                            <div id='icon'><img src={this.getRoleIcon()}/></div>
                            <span className='ts'>{moment(ts * 1000).calendar()}</span>
                            <Button className="cancelBtn" onClick={()=>this.handleCancel(id)}>x</Button>
                        </CardSubtitle>
                        <CardText className='mx-2 my-3'>{text}</CardText>
                    </CardBlock>
                </Card>
            </div>

        );
    }

    handleCancel(id) {
        console.log("cancel "+ id);
        this.props.dispatch(Delete(this.props.searchUser,id));
    }

    getRoleIcon() {
        if(this.props.user ==='parent'){
            return 'images/parents.png';
        }
        else {
            return 'images/child.png';
        }
    }

}

/*<div className='post-item d-flex' draggable={true}>
    <div className='post d-flex'>
        <div className='mood'><img src={this.getRoleIcon()}></img></div>
        <div className='wrap'>
            <div className='ts'>{moment(ts * 1000).calendar()}</div>
            <div className='text'>{text}</div>
        </div>
        <Button className="align-right" onClick={()=>this.handleCancel(id)}>x</Button>
    </div>
</div>*/

export default connect((state) => ({
    searchUser:state.searchLogin.searchUser
}))(PostItem);
