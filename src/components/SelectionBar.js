import React from 'react';
import classes from './SelectionBar.module.css';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';

const SelectionBar = (props) => {
  return (
    <div className={classes.background}>
      <div className={classes['image-container']}>
        <img src={img1} alt="hello" className={classes.image} />
      </div>
      <div className={classes['image-container']}>
        <img src={img2} alt="hello" className={classes.image} />
      </div>
      <div className={classes['image-container']}>
        <img src={img3} alt="hello" className={classes.image} />
      </div>
    </div>
  );
};

export default SelectionBar;
