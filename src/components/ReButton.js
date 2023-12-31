import classes from './ReButton.module.css';
import img from '../img/rebutton.svg';

const ReButton = (props) => {
  const onClickButtonHandler = (e) => {
    props.onClick();
  };

  return (
    <img
      src={img}
      className={classes.rebutton}
      onClick={onClickButtonHandler}
      onDragStart={props.onDragStart}
      onDrag={props.onDrag}
      alt="re button"
    ></img>
  );
};

export default ReButton;
