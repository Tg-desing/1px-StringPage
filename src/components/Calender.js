import classes from './Calender.module.css';
import calender from '../img/calender.svg';
import { useContext } from 'react';

import ThirdPageContext from '../store/ThridPageContext';

const Calender = (props) => {
  const imageList = useContext(ThirdPageContext);

  const setImgList = (imageUrlList) => {
    return imageUrlList.map((url, index) => {
      return (
        <img
          key={index}
          src={url}
          alt={`image${index}`}
          className={classes.image}
        ></img>
      );
    });
  };

  return (
    <div className={classes['calender-pos']}>
      <img src={calender} className={classes.calender}></img>
      <div className={classes['calender-container']}>
        {setImgList(imageList.imageList)}
      </div>
    </div>
  );
};

export default Calender;
