import classes from './NoteBox.module.css';
import React, { useEffect, useState, memo, useRef, useContext } from 'react';

import ThirdPageContext from '../store/ThridPageContext';

const NoteBox = (props) => {
  const noteSavedContext = useContext(ThirdPageContext);

  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });
  const [cusorPos, setCusorPos] = useState({ x: 0, y: 0 });
  const originalNote = useRef();

  const [savedList, setSavedList] = useState([]);
  const [showSavedList, setShowSavedList] = useState([]);

  useEffect(() => {
    if (props.saveIsValid) {
      if (savedList.length !== 0) {
        noteSavedContext.setNoteSavedList((current) => {
          return {
            ...current,
            [`note${props.id}`]: [...current[`note${props.id}`], ...savedList],
          };
        });
        setSavedList([]);
      }
    }

    if (props.reset) {
      if (originPos.x !== 0 && originPos.y !== 0) {
        originalNote.current.style.top = `${originPos.y}px`;
        originalNote.current.style.left = `${originPos.x}px`;
        props.setResetIsValid(false);
        setSavedList([]);
      }
    }
  }, [props.reset, props.saveIsValid]);

  useEffect(() => {
    if (props.saveIsValid) {
      if (noteSavedContext.noteSavedList[`note${props.id}`].length !== 0) {
        const noteList = [];
        noteSavedContext.noteSavedList[`note${props.id}`].forEach((item) => {
          noteList.push(
            <img
              id={item.id}
              src={props.img}
              className={classes[`note${props.id}`]}
              style={{ top: item.top, left: item.left }}
            ></img>
          );
        });
        console.log(noteList);
        setShowSavedList(noteList);
      }
    }
  }, [noteSavedContext.noteSavedList]);

  const setNoteList = (id, img) => {
    props.setNoteList((current) => {
      return {
        ...current,
        [`note${id}`]: [
          ...current[`note${id}`],
          <img
            id={id}
            src={img}
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
    setOriginPos({
      x: e.target.offsetLeft,
      y: e.target.offsetTop,
    });
    setCusorPos({
      x: e.clientX,
      y: e.clientY,
    });
    props.setSaveIsValid(false);
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

  const reset = props.reset;
  return (
    <div className={classes['note-box']}>
      <img
        id={props.id}
        src={props.img}
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
