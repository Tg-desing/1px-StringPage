import classes from './StartPage.module.css';
import page from '../img/firstpage.svg';
import string from '../img/string.svg';
const StartPage = () => {
  return (
    <div className={classes['page']}>
      <img src={page} alt="page" className={classes.image}></img>
      <img src={string} alt="string" className={classes.string}></img>
    </div>
  );
};

export default StartPage;
