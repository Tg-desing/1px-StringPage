import classes from './UploadButton.module.css';
import html2canvas from 'html2canvas';
import { useState, useContext } from 'react';

import { storage } from '../firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage';

import ThirdPageContext from '../store/ThridPageContext';

const UploadButton = (props) => {
  const [count, setCount] = useState(0);
  const imageContext = useContext(ThirdPageContext);

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
      const storageRef = ref(storage, `images/image${count}.png`);
      await uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log('UploadSuccess', snapshot);
        })
        .catch((error) => {
          console.log(error);
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
      저장
    </button>
  );
};

export default UploadButton;
