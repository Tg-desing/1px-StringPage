import classes from './NoteBox.module.css';
import React, {
  useEffect,
  useState,
  memo,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { uploadString, ref } from 'firebase/storage';
import { storage } from '../firebase/firebase';

import ThirdPageContext from '../store/NoteContext';

const NoteBox = (props) => {
  const noteSavedContext = useContext(ThirdPageContext);

  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });
  const [cusorPos, setCusorPos] = useState({ x: 0, y: 0 });
  const originalNote = useRef();

  const [savedList, setSavedList] = useState([]);
  const [showSavedList, setShowSavedList] = useState([]);

  //부모 컴포넌트로부터 받은 변수들 저장
  const id = props.id;
  const img = props.img;
  const saveIsValid = props.saveIsValid;
  const resetIsValid = props.resetIsValid;

  const setSaveIsValid = useCallback(
    (data) => {
      props.setSaveIsValid(data);
    },
    [props]
  );

  const setResetIsValid = useCallback(
    (data) => {
      props.setResetIsValid(data);
    },
    [props]
  );

  const setNoteSavedContextList = useCallback(
    (data) => {
      noteSavedContext.setNoteSavedList((current) => {
        return {
          ...current,
          [`note${id}`]: [...current[`note${id}`], ...data],
        };
      });
    },
    [noteSavedContext, id]
  );

  useEffect(() => {
    if (saveIsValid) {
      if (savedList.length !== 0) {
        setNoteSavedContextList(savedList);
        setSaveIsValid(false);
      }
    }

    if (resetIsValid) {
      if (originPos.x !== 0 && originPos.y !== 0) {
        originalNote.current.style.top = `${originPos.y}px`;
        originalNote.current.style.left = `${originPos.x}px`;
        setResetIsValid(false);
        setSavedList([]);
      }
    }
  }, [
    resetIsValid,
    saveIsValid,
    id,
    originPos,
    setResetIsValid,
    setSaveIsValid,
    setNoteSavedContextList,
    savedList,
  ]);

  //수정한 json파일을 업로드한다.
  const uploadModifiedJson = (data) => {
    const jsonString = JSON.stringify(data);
    const jsonRef = ref(storage, 'json/noteboard-data.json');

    uploadString(jsonRef, jsonString)
      .then(() => {
        console.log('JSON uploaded successfully');
      })
      .catch((error) => {
        console.log('Error uploading JSON:', error);
      });
  };

  useEffect(() => {
    if (noteSavedContext.noteSavedList[`note${id}`].length !== 0) {
      console.log(noteSavedContext.noteSavedList[`note${id}`]);
      uploadModifiedJson(noteSavedContext.noteSavedList);
      const noteList = [];
      noteSavedContext.noteSavedList[`note${id}`].forEach((item) => {
        noteList.push(
          <img
            id={item.id}
            alt={`note${item.id}`}
            src={img}
            className={classes[`note${item.id}`]}
            style={{ top: item.top, left: item.left }}
          ></img>
        );
      });
      console.log(noteList);
      setShowSavedList(noteList);
    }
  }, [noteSavedContext.noteSavedList, id, img]);

  const setNoteList = (id, img) => {
    props.setNoteList((current) => {
      return {
        ...current,
        [`note${id}`]: [
          ...current[`note${id}`],
          <img
            id={id}
            src={img}
            alt={`note${id}`}
            className={classes[`note${id}`]}
            onDrag={onDragHandler}
            onDragEnd={onDragEndHandler}
            onDragStart={onDragStartHandler}
          ></img>,
        ],
      };
    });
  };

  const setNoteSavedList = (id, top, left) => {
    setSavedList((current) => {
      return [...current, { id: id, top: top, left: left }];
    });
  };

  const onDragStartHandler = (e) => {
    if (
      (originPos.x === 0 && originPos.y === 0) ||
      (originPos.x === e.target.offsetLeft &&
        originPos.y === e.target.offsetTop)
    ) {
      setOriginPos({
        x: e.target.offsetLeft,
        y: e.target.offsetTop,
      });
      setCusorPos({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const onDragHandler = (e) => {
    e.target.style.left = `${e.clientX - cusorPos.x + originPos.x}px`;
    e.target.style.top = `${e.clientY - cusorPos.y + originPos.y}px`;
  };

  const onDragEndHandler = (e) => {
    e.target.style.left = `${e.clientX - cusorPos.x + originPos.x}px`;
    e.target.style.top = `${e.clientY - cusorPos.y + originPos.y}px`;

    setNoteList(props.id, props.img);
    console.log(e.target.style.left);
    setNoteSavedList(props.id, e.target.style.top, e.target.style.left);
  };

  return (
    <div className={classes['note-box']}>
      <img
        id={props.id}
        src={props.img}
        alt={`note${props.id}`}
        className={classes[`note${props.id}`]}
        onDrag={onDragHandler}
        onDragEnd={onDragEndHandler}
        onDragStart={onDragStartHandler}
        ref={originalNote}
      ></img>
      {props.noteList[`note${props.id}`]}
      {showSavedList}
    </div>
  );
};

export default memo(NoteBox);
