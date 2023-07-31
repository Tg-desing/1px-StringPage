import classes from './StartPage.module.css';

const StartPage = () => {
  return (
    <div className={classes['wrapper']}>
      <div className={classes.rope}></div>
      <div className={classes.knot}></div>
    </div>
  );
};

export default StartPage;
