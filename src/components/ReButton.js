import classes from './ReButton.module.css';
import img from '../img/rebutton.svg';
import { useContext } from 'react';

const ReButton = (props) => {
  const onClickButtonHandler = (e) => {
    props.onClick();
  };

  return (
    <img
      src={img}
      className={classes.rebutton}
      onClick={onClickButtonHandler}
      alt="re button"
    ></img>
  );
};

export default ReButton;
