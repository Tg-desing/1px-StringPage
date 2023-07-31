import classes from './SelectedImage.module.css';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';

const SelectedImage = (props) => {
  const imageNum = props.imageNum;

  return (
    <>
      {imageNum === 0 && (
        <img src={img1} alt="img1" className={classes.image}></img>
      )}
      {imageNum === 1 && (
        <img src={img2} alt="img2" className={classes.image}></img>
      )}
      {imageNum === 2 && (
        <img src={img3} alt="img3" className={classes.image}></img>
      )}
    </>
  );
};

export default SelectedImage;
