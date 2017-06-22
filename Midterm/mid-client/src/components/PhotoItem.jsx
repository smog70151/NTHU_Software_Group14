import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Card, CardImg, CardText, CardBlock,
    CardTitle, CardSubtitle,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';

//import {Delete} from 'states/post-actions.js';

//import {getMoodIcon} from 'utilities/weather.js';
//import {createVote, setTooltipToggle, toggleTooltip} from 'states/post-actions.js';

import './PhotoItem.css';

export default class PhotoItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        url: PropTypes.string,
        ts: PropTypes.number,
        showIMG: PropTypes.function
    };

    constructor(props) {
        super(props);

        /*this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);*/
        //this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {id, url, ts} = this.props;

        return (
            <div className='photo-item' onClick={()=>this.handleClick(url)}>
                <Card className='photo'>
                  <CardImg top width="100%" src={url} />
                  <CardBlock>
                    <CardText>{moment(ts * 1000).calendar()}</CardText>
                  </CardBlock>
                </Card>
            </div>
        );
    }

    handleClick(url) {
        console.log('c');
        this.props.showIMG(url);
    }

    /*handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        this.props.dispatch(createVote(this.props.id, vote));
        this.props.dispatch(setTooltipToggle(this.props.id, false));
    }*/
    /*getRoleIcon() {
        if(this.props.user=='parent'){
            return 'images/momlogo.jpg';
        }
        else {
            return 'images/sonlogo.jpg';
        }
    }*/

    /*handleCancel(id) {
        console.log("cancel "+ id);
        this.props.dispatch(Delete(id));
    }*/
}

/*export function getUserIcon(user) {
    switch (user) {
        case 'parent':
            return 'parentIcon';
        case 'child':
            return 'childIcon';
        default:
            return 'fa fa-question-circle';
    }
}
*/
/*export default connect((state) => ({

}))(PostItem);*/
