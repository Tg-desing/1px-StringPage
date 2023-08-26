import classes from './NoteBox.module.css';
import React, {
  useEffect,
  useState,
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

  const [isNew, setIsNew] = useState(false);

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
        const templist = [];
        let tempo = [];
        const length = savedList.length;
        templist.push(savedList[0]);
        console.log(templist);
        for (let i = 0; i < length; i++) {
          tempo = [
            ...templist.filter(
              (item) => item.targetId !== savedList[i].targetId
            ),
          ];
          templist.push(savedList[i]);
          tempo.push(savedList[i]);
        }
        console.log(tempo);
        setNoteSavedContextList(tempo);
        setSaveIsValid(false);
      }
    }

    if (resetIsValid) {
      if (originPos.x !== 0 && originPos.y !== 0) {
        originalNote.current.style.top = `${originPos.y}vh`;
        originalNote.current.style.left = `${originPos.x}vw`;
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
      setShowSavedList(noteList);
    }
  }, [noteSavedContext.noteSavedList, id, img]);

  const setNoteList = (id, img, targetId) => {
    props.setNoteList((current) => {
      return {
        ...current,
        [`note${id}`]: [
          ...current[`note${id}`],
          // <img
          //   id={`${targetId}`}
          //   src={img}
          //   alt={`note${id}`}
          //   className={classes[`note${id}`]}
          //   onDrag={onDragHandler}
          //   onDragEnd={onDragEndHandler}
          //   onDragStart={onDragStartHandler}
          // ></img>,
          { id: id, targetId: targetId, img: img },
        ],
      };
    });
  };

  const setNoteSavedList = (id, targetId, top, left) => {
    setSavedList((current) => {
      return [...current, { id: id, targetId: targetId, top: top, left: left }];
    });
  };

  const [isResized, setIsResized] = useState(false);

  window.addEventListener('resize', () => {
    setIsResized(true);
  });

  const onDragStartHandler = (e) => {
    const offsetLeft = parseFloat(
      (e.target.offsetLeft / window.innerWidth) * 100
    );
    const offsetTop = parseFloat(
      (e.target.offsetTop / window.innerHeight) * 100
    );
    if (
      (originPos.x === 0 && originPos.y === 0) ||
      (originPos.x === offsetLeft && originPos.y === offsetTop) ||
      isResized
    ) {
      setOriginPos({
        x: parseFloat((e.target.offsetLeft / window.innerWidth) * 100),
        y: parseFloat((e.target.offsetTop / window.innerHeight) * 100),
      });
      setCusorPos({
        x: parseFloat((e.clientX / window.innerWidth) * 100),
        y: parseFloat((e.clientY / window.innerHeight) * 100),
      });
      setIsNew(true);
    }
    setIsResized(false);
  };

  const onDragEndHandler = (e) => {
    console.log(originPos);
    const x = parseFloat((e.clientX / window.innerWidth) * 100);
    const y = parseFloat((e.clientY / window.innerHeight) * 100);
    console.log(parseFloat(x - cusorPos.x + originPos.x));
    if (props.isDropValid) {
      console.log(1);
      e.target.style.left = `${parseFloat(x - cusorPos.x + originPos.x)}vw`;
      e.target.style.top = `${parseFloat(y - cusorPos.y + originPos.y)}vh`;

      const rannum = Math.floor(Math.random() * 100000);
      console.log(rannum);
      setNoteSavedList(
        props.id,
        e.target.id,
        e.target.style.top,
        e.target.style.left
      );
      if (isNew) {
        setNoteList(props.id, props.img, rannum);
      }
    } else {
      e.target.style.left = `${originPos.x}vw`;
      e.target.style.top = `${originPos.y}vh`;
    }
    props.setIsDropValid(false);
    setIsNew(false);
  };

  return (
    <div className={classes['note-box']}>
      <img
        id={props.id}
        src={props.img}
        alt={`note${props.id}`}
        className={classes[`note${props.id}`]}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        ref={originalNote}
        draggable="true"
      ></img>
      {props.noteList[`note${props.id}`].map((item) => (
        <img
          id={`${item.targetId}`}
          src={props.img}
          alt={`note${item.id}`}
          className={classes[`note${item.id}`]}
          onDragEnd={onDragEndHandler}
          onDragStart={onDragStartHandler}
          draggable="true"
        ></img>
      ))}
      {showSavedList}
    </div>
  );
};

export default NoteBox;
