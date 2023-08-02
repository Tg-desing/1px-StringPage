import { useEffect } from 'react';

const SaveButton = (props) => {
  const onClickHandler = (e) => {
    props.onClick();
  };
  return <button onClick={onClickHandler}>화면저장</button>;
};

export default SaveButton;
