import classes from './NoteBox.module.css';
import React, { useEffect, useState, memo, useRef } from 'react';

const NoteBox = (props) => {
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });
  const [cusorPos, setCusorPos] = useState({ x: 0, y: 0 });
  const originalNote = useRef();

  useEffect(() => {
    if (originPos.x !== 0 && originPos.y !== 0) {
      if (props.reset) {
        originalNote.current.style.top = `${originPos.y}px`;
        originalNote.current.style.left = `${originPos.x}px`;
        props.setResetIsValid(false);
      }
    }
  }, [props.reset]);

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

  const onDragStartHandler = (e) => {
    setOriginPos({
      x: e.target.offsetLeft,
      y: e.target.offsetTop,
    });
    setCusorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const onDragHandler = (e) => {
    e.target.style.left = `${e.clientX - cusorPos.x + originPos.x}px`;
    e.target.style.top = `${e.clientY - cusorPos.y + originPos.y}px`;
  };

  const onDragEndHandler = (e) => {
    e.target.style.left = `${e.clientX - cusorPos.x + originPos.x}px`;
    e.target.style.top = `${e.clientY - cusorPos.y + originPos.y}px`;

    setNoteList(props.id, props.img);
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
    </div>
  );
};

export default memo(NoteBox);
