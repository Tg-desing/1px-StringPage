import React, { useRef } from 'react';
import classes from './SelectionBar.module.css';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';

const SelectionBar = (props) => {
  const setImageNum = props.setImageNum;

  const onClickHandler = (e) => {
    const id = e.target.id;
    console.log(e.target);
    if (id === '1') {
      setImageNum(0);
    } else if (id === '2') {
      setImageNum(1);
    } else if (id === '3') {
      setImageNum(2);
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes['image-container']} onClick={onClickHandler}>
        <img
          src={img1}
          alt="hello"
          className={classes.image}
          id="1"
          onClick={onClickHandler}
        />
      </div>
      <div className={classes['image-container']}>
        <img
          src={img2}
          alt="hello"
          className={classes.image}
          id="2"
          onClick={onClickHandler}
        />
      </div>
      <div className={classes['image-container']}>
        <img
          src={img3}
          alt="hello"
          className={classes.image}
          id="3"
          onClick={onClickHandler}
        />
      </div>
      <p className={classes['image-text']}>| 포스터 이미지를 클릭해보세요</p>
    </div>
  );
};

export default SelectionBar;
