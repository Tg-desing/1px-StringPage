import IntroText from '../components/IntroText';
import SelectedImage from '../components/SelectedImage';
import SelectionBar from '../components/SelectionBar';
import classes from './Introduction.module.css';

const Introduction = (props) => {
  return (
    <div className={classes['intro-background']}>
      <div className={classes['main-section']}>
        <SelectionBar></SelectionBar>
        <SelectedImage></SelectedImage>
        <IntroText></IntroText>
      </div>
    </div>
  );
};

export default Introduction;
