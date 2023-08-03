import classes from './UploadButton.module.css';
import html2canvas from 'html2canvas';
import { useState, useContext, useCallback, useEffect } from 'react';

import { storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import ImageContext from '../store/ImageContext';

const UploadButton = (props) => {
  const [count, setCount] = useState(0);
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

  async function uploadBlobToFirebaseStorage(storage, blob) {
    try {
      const storageRef = ref(
        storage,
        `images/image${parseInt(Math.random())}.png`
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
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
    }
  }

  const onClickHandler = (e) => {
    const screenShotElement = props.element.current;

    if (screenShotElement) {
      html2canvas(screenShotElement).then((canvas) => {
        setCount((current) => {
          const newcount = current + 1;
          return newcount;
        });

        const image = canvas.toDataURL('image/png');
        const imageBlob = dataURLToBlob(image);
        uploadBlobToFirebaseStorage(storage, imageBlob);
        console.log(imageBlob);
      });
    }
  };

  return (
    <button className={classes.button} onClick={onClickHandler}>
      스크린샷 저장
    </button>
  );
};

export default UploadButton;
