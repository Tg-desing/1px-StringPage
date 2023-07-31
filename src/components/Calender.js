import classes from './Calender.module.css';
import calender from '../img/calender.svg';

const Calender = (props) => {
  return <img src={calender} className={classes.calender}></img>;
};

export default Calender;
