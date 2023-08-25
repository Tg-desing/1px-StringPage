import classes from './IntroText.module.css';

import signImg from '../img/sign.svg';

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
          <p>
            <strong>“내가 너를 지켜줄게”</strong>
          </p>
          <p>열두 살에 만난 첫사랑 ‘렌’과 ‘아오이’.</p>
          <p>
            한눈에 서로의 상처를 알아보고 시작된 둘의 인연은 운명처럼 다시
            재회하길 반복한다.
          </p>
          <br></br>
          <p>
            <strong>“’운명의 실’이 있다고 생각해”</strong>
          </p>
          <p>‘아오이’가 준 소원팔찌를 8년 동안 간직한 ‘렌’.</p>
          <p>어느 날 소원팔찌가 끊어지고 두 사람은 운명처럼 재회한다.</p>
          <br></br>
          <p>‘실’ 이 이어주는 두 사람의 운명처럼 인연을 표현하기 위해</p>
          <p>
            두 가닥의 실이 얽혀 영화의 제목인 ‘실’을 만들어내는 타이포를 디자인
            하였다.
          </p>
          <p>
            또 주인공 두 사람의 운명의 매개체인 소원 팔찌를 모티프로 하였다.
          </p>
          <br></br>
          <p>
            일본의 다도(茶道)에는 ‘이치고 이치에(いちごいちえ)’라는 말이 있다.
          </p>
          <p>’일생에 단 한 번 만나는 인연’ 이라는 뜻으로 </p>
          <p>
            사람은 평생 한 번밖에 만날 수 없는 소중한 존재라는 의미로 사용된다.
          </p>
          <p>
            이러한 정서가 잘 녹아든 영화 ‘실’은 ‘실’ 이 가로줄과 세로줄이 얽혀
            하나의 면이 완성되듯,
          </p>
          <p>
            운명적인 사람과 사람이 만나 일생에 단 한 번인 소중한 인연의 모습을
            그려내고 있다.
          </p>
        </div>
        <p className={classes.sign}>haeun59100@naver.com</p>
      </div>
    </div>
  );
};

export default IntroText;
