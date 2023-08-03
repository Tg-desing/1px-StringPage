import classes from './Calender.module.css';
import calender from '../img/calender.svg';
import { useContext, useEffect, useState } from 'react';

import ImageContext from '../store/ImageContext';

const Calender = () => {
  const [calenderImageList, setCalenderImageList] = useState([]);
  const imageContextList = useContext(ImageContext);

  const setImgList = (imageUrlList) => {
    const tempImageList = [];
    imageUrlList.forEach((url, index) => {
      tempImageList.push(
        <img
          key={index}
          src={url}
          alt={`calender Img${index}`}
          className={classes.image}
        ></img>
      );
    });
    setCalenderImageList(tempImageList);
  };

  useEffect(() => {
    setImgList(imageContextList.imageList);
  }, [imageContextList]);

  return (
    <div className={classes['calender-pos']}>
      <img src={calender} alt={'calender'} className={classes.calender}></img>
      <div className={classes['calender-container']}>{calenderImageList}</div>
    </div>
  );
};

export default Calender;
