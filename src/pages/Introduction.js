import IntroText from '../components/IntroText';
import SelectedImage from '../components/SelectedImage';
import SelectionBar from '../components/SelectionBar';
import classes from './Introduction.module.css';

import { useEffect, useState } from 'react';

const Introduction = (props) => {
  const [whichImageViewed, setWhichImageViewed] = useState(0);
  useEffect(() => {
    if (!(0 <= whichImageViewed && 3 > whichImageViewed)) {
      console.log('some error occured');
      setWhichImageViewed(0);
    }
  }, [whichImageViewed]);

  return (
    <div className={classes['intro-background']}>
      <div className={classes['main-section']}>
        <SelectionBar
          imageNum={whichImageViewed}
          setImageNum={setWhichImageViewed}
        ></SelectionBar>
        <SelectedImage imageNum={whichImageViewed}></SelectedImage>
        <IntroText></IntroText>
      </div>
    </div>
  );
};

export default Introduction;
