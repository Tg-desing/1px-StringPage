import classes from './Calender.module.css';
import calender from '../img/calender.svg';
import { useContext, useEffect, useState } from 'react';

import ImageContext from '../store/ImageContext';

const OverlayModal = (props) => {
  return (
    <div className={classes.modal}>
      <img
        src={props.src}
        alt={`calender Img`}
        className={classes['modal-image']}
      ></img>
    </div>
  );
};

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Calender = () => {
  const [calenderImageList, setCalenderImageList] = useState([]);
  const imageContextList = useContext(ImageContext);

  const [srcUrl, setSrcUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const onClickHandler = (e) => {
    setSrcUrl(e.target.src);
    setModalOpen(true);
  };

  const onClickBackdropHandler = () => {
    setModalOpen(false);
  };

  const setImgList = (imageUrlList) => {
    const tempImageList = [];
    imageUrlList.forEach((url, index) => {
      tempImageList.push({ index: index, url: url });
    });
    setCalenderImageList(tempImageList);
  };

  useEffect(() => {
    setImgList(imageContextList.imageList);
  }, [imageContextList]);

  return (
    <>
      <div className={classes['calender-pos']}>
        <img src={calender} alt={'calender'} className={classes.calender}></img>
        <div className={classes['calender-container']}>
          {calenderImageList.map((item) => {
            return (
              <img
                key={item.index}
                src={item.url}
                alt={`calender Img${item.index}`}
                className={classes.image}
                onClick={onClickHandler}
              ></img>
            );
          })}
        </div>
      </div>
      {modalOpen && <OverlayModal src={srcUrl}></OverlayModal>}
      {modalOpen && <Backdrop onClick={onClickBackdropHandler}></Backdrop>}
    </>
  );
};

export default Calender;
