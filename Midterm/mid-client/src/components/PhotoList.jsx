import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem,
    CardColumns
} from 'reactstrap';

import PhotoItem from 'components/PhotoItem.jsx';
import Bigimg from 'components/bigIMG.jsx';


import './PhotoList.css';

export default class PhotoList extends React.Component {
    static propTypes = {
        photos: PropTypes.array
    };


    constructor(props) {
        super(props);
        this.state = {BigIMG:false,url:''};
        this.handleShowIMG = this.handleShowIMG.bind(this);
        this.closeIMG = this.closeIMG.bind(this);
    }

    render() {
        const {photos} = this.props;

        let children = (
            <div className='col-12 empty d-flex justify-content-center align-items-center mx-auto'>
                <div className='empty-text'>沒有圖片呢<br />新增一些圖片吧</div>
            </div>
        );
        if (photos.length) {
            children = photos.map(p => (
                <div className="fluid mb-2" key={p.id} action>
                    <PhotoItem {...p} showIMG={this.handleShowIMG}/>
                </div>
            ));
        }

        console.log(children);

        return (
            <div>
                <div className="bigimg">
                    {this.state.BigIMG ? <Bigimg url={this.state.url} close={this.closeIMG} />:""}
                </div>
                <div className='row photo-list mt-4'>
                    <CardColumns className='deck'>{children}</CardColumns>
                </div>
            </div>
        );
    }

    handleShowIMG(url){
        this.setState({
            BigIMG:true,
            url: url
        });
    }

    closeIMG(){
        this.setState({
            BigIMG:false,
            url: ''
        });
    }

}
