import classes from './UploadButton.module.css';
import html2canvas from 'html2canvas';
import { useContext, useCallback } from 'react';

import { storage } from '../firebase/firebase';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';

import ImageContext from '../store/ImageContext';

import camera from '../img/camera.svg';

const UploadButton = (props) => {
  const imageContext = useContext(ImageContext);

  //컨텍스트에서 받아온 함수, 데이터 저장
  const setImageContextList = useCallback(
    (data) => {
      imageContext.setImageList((current) => {
        return [...current, data];
      });
    },
    [imageContext]
  );

  function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  const uploadModifiedJson = (data) => {
    const jsonString = JSON.stringify(data);
    const jsonRef = ref(storage, 'json/noteboard-data.json');

    uploadString(jsonRef, jsonString)
      .then(() => {
        console.log('JSON uploaded successfully');
      })
      .catch((error) => {
        console.log('Error uploading JSON:', error);
      });
  };

  async function uploadBlobToFirebaseStorage(storage, blob) {
    try {
      const storageRef = ref(
        storage,
        `images/image${Math.floor(Math.random() * 100)}.png`
      );
      await uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log('UploadSuccess', snapshot);
        })
        .catch((error) => {
          console.log(error);
        });
      getDownloadURL(storageRef).then((url) => {
        setImageContextList(`${url}`);
      });
      uploadModifiedJson({
        note1: [],
        note2: [],
        note3: [],
      });
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
    }
  }

  const onClickHandler = (e) => {
    const screenShotElement = props.element.current;

    if (screenShotElement) {
      html2canvas(screenShotElement).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const imageBlob = dataURLToBlob(image);
        uploadBlobToFirebaseStorage(storage, imageBlob);
        console.log(imageBlob);
      });
    }
  };

  return (
    <div className={classes['button-container']}>
      <div
        className={classes.button}
        onClick={onClickHandler}
        alt="upload button"
      ></div>
    </div>
  );
};

export default UploadButton;
