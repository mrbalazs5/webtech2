import React from 'react';
import ReactCrop from 'react-image-crop';
import Popup from './Popup';
import 'react-image-crop/lib/ReactCrop.scss';
import './CropImage.scss';
import SimpleReactValidator from 'simple-react-validator';
import {imageMimeTypes} from '../utils/imageMimeTypes';

class CropImage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      file: null,
      src: null,
      crop: {
        unit: '%',
        width: 50,
        aspect: 1 / 1
      },
      croppedImageUrl: ''
    }

    this.validator = new SimpleReactValidator({
      validators: {
        imageIsValid: {
          message: 'Image must be png or jpeg',
          rule: (val, param, validator) => {
            return imageMimeTypes.includes(val.type);
          }
        }
      }
    });

    this.onImageSelect = this.onImageSelect.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
  }

  onImageSelect = (e) => {
    if(e.target.files && e.target.files[0]){
      if(imageMimeTypes.includes(e.target.files[0].type)){
        const reader = new FileReader();
        reader.addEventListener('load', () =>
          this.setState({
            src: reader.result
          })
        );
        reader.readAsDataURL(e.target.files[0]);
      }
      this.setState({
        file: e.target.files[0]
      });
    }
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  }

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({
      crop
    });
  };

  async makeClientCrop(crop) {
    if(this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({
        croppedImageUrl
      });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }


  render(){
    const {src, crop, croppedImageUrl, file} = this.state;

    return(
      <Popup>
        <div className={'crop'}>
          <div className={'crop-title'}>
            Select your file
          </div>

          <div className={'crop-validator'}>
            {this.validator.message('imagecrop', this.state.avatar, 'required|imageIsValid')}
          </div>

          <input
            type={'file'}
            id={'imagecrop'}
            onChange={this.onImageSelect}
            className={'crop-input'}
          />
          <label className={'crop-label'} htmlFor={'imagecrop'}>Choose</label>

          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}

          <div className={'crop-buttons'}>
            <button onClick={this.props.onCancel} className={'crop-button'} type={'button'}>Cancel</button>
            {src && (
              <button onClick={() => this.props.onSave(file, croppedImageUrl)} className={'crop-button'} type={'button'}>Save</button>
            )}
          </div>

        </div>
      </Popup>
    );
  }
}

export default CropImage;