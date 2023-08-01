import classes from './Calender.module.css';
import calender from '../img/calender.svg';

const Calender = (props) => {
  const imageUrlList = props.imageUrlList;

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
        {setImgList(imageUrlList)}
      </div>
    </div>
  );
};

export default Calender;
