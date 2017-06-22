import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View, TouchableWithoutFeedback, Image, NativeModules, Text} from 'react-native';
import NavigationContainer from './NavigationContainer';
import moment from 'moment';
// import { BlurView, VibrancyView } from 'react-native-blur';

import {Container, Fab, Button, Toast} from 'native-base';
import {Content, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {newPhoto as newPhotoFromApi,
        listPhotos as listPhotosFromApi
}from '../api/gallery.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import Carousel from 'react-native-snap-carousel';
// Amplify ...
import DoubleClick from 'react-native-double-click';
import Modal from 'react-native-modal';


//------------------------------------------------------------------------------
var ImagePicker = require('react-native-image-picker');
const options = {
    title: 'Select from ...',

    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const CLOUDINARY_UPLOAD_PRESET = 'guzt2w4v';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/nthuproject14/image/upload';
var CryptoJS = require('crypto-js');
//------------------------------------------------------------------------------

import {connect} from 'react-redux';


class GalleryScreen extends React.Component {
    static propTypes = {
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
          photoLoading: 0,
          photos:[],
          zoneShow: false,
          uploadedFile: null,
          uploadedFileCloudinaryUrl: '',
          currentItem: null,
          currentCard: 0,
          firstLoading: true,
          isPhotoAmpifly: false
        };
        this.bgShow = this.bgShow.bind(this);
        this.handlePickFile = this.handlePickFile.bind(this);

        // Handle
        this.handleAmplify = this.handleAmplify.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    componentWillMount() {
        this.listPhotos(this.props.account);
    }

    componentDidMount() {
        this.bgShow();
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

        const slides = this.state.photos.map((photo) => {
            return (
                <Card key={photo.id} style={{marginTop: 15, maxHeight: 370, width: 300, alignItems:'center', backgroundColor: '#FFFFFF', shadowOffset: {width: 12, height: 12}, shadowOpacity: 0.58, shadowColor: '#000', shadowRadius: 16, elevation: 10}}>
                     <DoubleClick onClick={this.handleAmplify}>
                         <CardItem>
                            <Image style={{width: 250, height: 250, marginTop: 12}} source={{uri:photo.url}}/>
                         </CardItem>
                     </DoubleClick>
                     <CardItem>
                        <Text>{}{moment(photo.ts * 1000).calendar()}</Text>
                     </CardItem>
               </Card>
            );
        });

        if (this.state.photos[this.state.currentCard]){
            return (
                <NavigationContainer navigate={navigate} title='回憶相簿'>
                    <Spinner visible={this.state.photoLoading === 1} textContent={"Loading..."} textStyle={{color: '#FFF'}}>
                    </Spinner>
                    <Image style={styles.BG} source={{uri: this.state.photos[this.state.currentCard].url}}>
                        <View style={{backgroundColor:'rgba(252, 224, 224, 0.3)', height: 700 , width: 500}}>
                            <Text style={styles.gallery}>{'\n'}</Text>
                            <Carousel
                                ref={(carousel) => {this._carousel = carousel;}}
                                itemWidth={300}
                                sliderWidth={411}
                                inactiveSlideOpacity={0.9}
                                firstItem={this.state.currentCard}
                                cardNum={(num)=>{this.handleCardChange(num)}}>
                            { slides }
                            </Carousel>
                        </View>
                        {
                            this.state.isPhotoAmpifly &&
                            <DoubleClick onClick={this.handleCloseModal}>
                                <Modal
                                      isVisible={this.state.isPhotoAmpifly}
                                      backdropOpacity={1}
                                      animationIn={'zoomInDown'}
                                      animationOut={'zoomOutUp'}
                                      animationInTiming={1000}
                                      animationOutTiming={1000}
                                      backdropTransitionInTiming={1000}
                                      backdropTransitionOutTiming={1000}
                                >
                                    <Image style={styles.BG} source={{uri: this.state.photos[this.state.currentCard].url}} >
                                        <Button onPress={this.handleCloseModal} style={{backgroundColor: 'rgba(255, 255, 255, 0)', width: 50, height: 50, borderRadius: 99999, alignItems: 'center'}}>
                                            <Icon name='times'  style={{fontSize: 24, color: 'rgba(255, 255, 255, 0.3)', alignSelf: 'center', textAlign: 'center' }} />
                                        </Button>
                                    </Image>
                                </Modal>
                            </DoubleClick>
                        }
                        <Fab
                            containerStyle={styles.fabContainer}
                            style={styles.fab}
                            position="bottomRight"
                            onPress={this.handlePickFile}>
                            <Icon name='eercast' />
                        </Fab>
                    </Image>
                </NavigationContainer>
            );
        } else {
            return(
                <NavigationContainer navigate={navigate} title='回憶相簿'>
                    <Spinner visible={this.state.photoLoading === 1} textContent={"Loading..."} textStyle={{color: '#FFF'}}>
                    </Spinner>
                    {(this.state.photoLoading === 0) ?
                        <View style={styles.newBG}>
                            <Text style={{fontSize:30,alignSelf:'center', marginTop:250}}>增加一些回憶吧</Text>
                            <Fab
                                containerStyle={styles.fabContainer}
                                style={{backgroundColor: appColors.primary}}
                                position="bottomRight"
                                onPress={this.handlePickFile}>
                                <Icon name='eercast' />
                            </Fab>
                        </View>:<Text></Text>}
                </NavigationContainer>
            );
        }


    }

    handleAmplify() {
        this.setState({isPhotoAmpifly: true});
    }

    handleCloseModal() {
        this.setState({isPhotoAmpifly: false});
    }

    handleCardChange(num) {
        this.setState({currentCard: num}, ()=>{this.bgShow();});
    }

    bgShow() {
        //console.error(this.state.photos[this.state.photos.length-1-this.state.currentCard]);
    }


    listPhotos(account) {
          this.setState({
              photoLoading: 1
          }, () => {
              listPhotosFromApi(account).then(photos => {
                  this.setState({
                      photos,
                      photoLoading: 0,
                      firstLoading: false
                  });
              }).catch(err => {
                  console.error(err);

                  this.setState({
                      photos: [],
                      photoLoading: false
                  });
              });
          });
      }

//----------------------------------File Upload------------------------------------
    handlePickFile() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.uploadImage(response.uri);
            }
        });
    }

 
    uploadImage(uri) {
      let timestamp = (Date.now() / 1000 | 0).toString();
      let api_key = '784538242276318'
      let api_secret = 'WTiYi72dk734dzCAzmt22sWHDQw'
      let cloud = 'nthuproject14'
      let hash_string = 'timestamp=' + timestamp + api_secret
      let signature = CryptoJS.SHA1(hash_string).toString();
      let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'
     
      let xhr = new XMLHttpRequest();
      xhr.open('POST', upload_url);
      xhr.onload = () => {
        console.log(xhr);
        this.getURL(xhr);
      };
      let formdata = new FormData();
      formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
      formdata.append('timestamp', timestamp);
      formdata.append('api_key', api_key);
      formdata.append('signature', signature);
      xhr.send(formdata);
    }

    getURL(xhr) {
        let response = JSON.parse(xhr._response);
        console.log(response);
        console.log(response.secure_url);
        if (response.secure_url !== '') {
          newPhotoFromApi(this.props.account, response.secure_url).then(() => {
              this.listPhotos(this.props.account);
          }).catch(err => {
              console.error('Error creating photo', err);
          });
          this.setState({uploadedFileCloudinaryUrl: response.secure_url});
        }
    }
//------------------------------------------------------------------------------

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
    },
    gallery: {
        alignSelf: 'center',
        fontSize: 30,
        color: '#abbfba',
        marginTop: 30,
        borderRadius: 10,
        padding: 15,
        marginRight: 80
    },
    BG: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    newBG: {
        flex: 1,
        width: null,
        height: null
    }
};

export default connect((state, ownProps) => ({
    toast: state.toast,
    account: state.searchLogin.searchUser
}))(GalleryScreen);
