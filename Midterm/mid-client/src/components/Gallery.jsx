import Dropzone from 'react-dropzone';
import request from 'superagent';
import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {connect} from 'react-redux';

import {newPhoto as newPhotoFromApi,
        listPhotos as listPhotosFromApi
}from 'api/gallery.js';
import PhotoList from 'components/PhotoList.jsx'

import './Gallery.css'

const CLOUDINARY_UPLOAD_PRESET = 'guzt2w4v';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/nthuproject14/image/upload';

// const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoLoading:false,
      photos:[],
      zoneShow: false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
    this.handleUploadZoneShow = this.handleUploadZoneShow.bind(this);
  }

  componentDidMount() {
      this.listPhotos(this.props.account);
  }

  onImageDrop(files) {
    console.log('tt');
    this.setState({uploadedFile: files[0]});

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    console.log('tt');
    this.setState({photoLoading:true,zoneShow:false});
    let upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        newPhotoFromApi(this.props.account, response.body.secure_url).then(() => {
            this.listPhotos(this.props.account);
        }).catch(err => {
            console.error('Error creating photo', err);
        });
        this.setState({uploadedFileCloudinaryUrl: response.body.secure_url});
      }
    });
  }

  render() {
    return (
        <div className="gallery">
          <div className="photos">
              <div className="FileUpload">
                  <Button onClick={this.handleUploadZoneShow} className="formShow" color="warning">+</Button>
                  <Modal isOpen={this.state.zoneShow} toggle={this.handleUploadZoneShow}>
                      <ModalHeader>圖片集</ModalHeader>
                      <ModalBody className="text-center">
                          <div>
                              向家人分享你的精采生活吧！
                          </div>
                          <div id='dropblock'>
                              <Dropzone className="dropzone btn" onDrop={this.onImageDrop.bind(this)} multiple={false} accept="image/*">
                                  <div>選取或拖曳圖片到圖片集裡</div>
                              </Dropzone>
                          </div>
                      </ModalBody>
                      <ModalFooter></ModalFooter>
                  </Modal>
              </div>
              <PhotoList photos={this.state.photos} className="photoList"/>
          </div>
          <div>{this.state.photoLoading?
              <div className="sk-circle">
                  <div className="sk-circle1 sk-child"></div>
                  <div className="sk-circle2 sk-child"></div>
                  <div className="sk-circle3 sk-child"></div>
                  <div className="sk-circle4 sk-child"></div>
                  <div className="sk-circle5 sk-child"></div>
                  <div className="sk-circle6 sk-child"></div>
                  <div className="sk-circle7 sk-child"></div>
                  <div className="sk-circle8 sk-child"></div>
                  <div className="sk-circle9 sk-child"></div>
                  <div className="sk-circle10 sk-child"></div>
                  <div className="sk-circle11 sk-child"></div>
                  <div className="sk-circle12 sk-child"></div>
              </div>

          :''}</div>

        </div>
    )
  }

  handleUploadZoneShow(){
      this.setState({zoneShow : !this.state.zoneShow});
      console.log(this.state.zoneShow);
  }

  listPhotos(account) {
        this.setState({
            photoLoading: true
        }, () => {
            listPhotosFromApi(account).then(photos => {
                this.setState({
                    photos,
                    photoLoading: false
                });
            }).catch(err => {
                console.error('Error listing photos', err);

                this.setState({
                    photos: [],
                    photoLoading: false
                });
            });
        });
    }

}

/*<div>
  {this.state.uploadedFileCloudinaryUrl === ''
    ? null
    : <div>
      <p>{this.state.uploadedFile.name}</p>
      <img src={this.state.uploadedFileCloudinaryUrl}/>
    </div>}
</div>*/
