import saveImg from '../img/savebutton.svg';
import classes from './SaveButton.module.css';

const SaveButton = (props) => {
  const onClickHandler = (e) => {
    props.onClick();
  };
  return (
    <div className={classes['button-container']}>
      <img
        onClick={onClickHandler}
        src={saveImg}
        alt="save-button"
        className={classes.button}
      ></img>
    </div>
  );
};

export default SaveButton;
