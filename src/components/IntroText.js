import classes from './IntroText.module.css';
import description from '../img/description.svg';

const IntroText = () => {
  return (
    <div>
      <div className={classes['intro-text']}>
        <p>실 | 인연의 시작</p>
      </div>
      <div className={classes['sub-text']}>
        <p>영화 - Threads: Our Tapestry of Love (2021)</p>
      </div>
      <div className={classes['author-text']}>
        <p>Zeze Takahisa</p>
        <p>Masaki Suda, Nana Komatsu</p>
      </div>
      <div className={classes['sub-box']}>
        <div className={classes.text}>
          <img src={description} className={classes.image}></img>
        </div>
      </div>
    </div>
  );
};

export default IntroText;
