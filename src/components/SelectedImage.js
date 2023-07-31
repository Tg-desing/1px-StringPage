import classes from './SelectedImage.module.css';
import img1 from '../img/img1.jpg';

const SelectedImage = () => {
  return (
    <div className={classes['image-container']}>
      <img src={img1} alt="img1" className={classes.image}></img>
    </div>
  );
};

export default SelectedImage;
