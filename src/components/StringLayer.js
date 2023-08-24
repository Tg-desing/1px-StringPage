import stringlayer from '../img/stringlayer.svg';
import classes from './StringLayer.module.css';

const StringLayer = () => {
  return (
    <div className={classes['stringlayer-container']}>
      <img
        src={stringlayer}
        alt={'stringlayer'}
        className={classes.stringlayer}
      ></img>
      <div className={classes['text-container']}>
        <p className={classes.text}>영화 ’실’의 모티브가 된 곡</p>
        <p className={classes.text}>
          ‘실’이 가로줄과 세로줄이 얽혀 하나의 면이 완성되듯
        </p>
        <p className={classes.text}>
          너와 내가 만나 서로의 인연이 되고 우주가 된다는 의미를 담고 있다
        </p>
      </div>
    </div>
  );
};

export default StringLayer;
