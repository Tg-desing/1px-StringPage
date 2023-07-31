import React, { useEffect, useRef, useState } from 'react';

import classes from './ThirdPage.module.css';
import title from '../img/title.svg';
import notepage from '../img/notepage.svg';
import calender from '../img/calender.svg';
import stringlayer from '../img/stringlayer.svg';

import note1 from '../img/note1.svg';
import note2 from '../img/note2.svg';
import note3 from '../img/note3.svg';
import NoteBox from '../components/NoteBox';
import ReButton from '../components/ReButton';
import UploadButton from '../components/UploadButton';
import { firestore } from '../firebase/firebase';
import Calender from '../components/Calender';

const ThirdPage = () => {
  const [todayDate, setTodayData] = useState('');
  const [resetIsValid, setResetIsValid] = useState(false);
  const [noteList, setNoteList] = useState({ note1: [], note2: [], note3: [] });

  const element = useRef();

  useEffect(() => {
    const now = new Date();
    setTodayData(now.getDate());
    console.log(todayDate);
  }, []);

  const onClickReButtonHandler = () => {
    setNoteList({ note1: [], note2: [], note3: [] });
    setResetIsValid(true);
  };

  return (
    <div className={classes['background']}>
      <img src={title} className={classes.title}></img>
      <Calender />
      <img src={stringlayer} className={classes.stringlayer}></img>
      <div className={classes.notepage} ref={element}>
        <div className={classes['note-container']}>
          <NoteBox
            reset={resetIsValid}
            noteList={noteList}
            setNoteList={setNoteList}
            setResetIsValid={setResetIsValid}
            img={note1}
            id="1"
          ></NoteBox>
          <NoteBox
            reset={resetIsValid}
            noteList={noteList}
            setNoteList={setNoteList}
            setResetIsValid={setResetIsValid}
            id="2"
            img={note2}
          ></NoteBox>
          <NoteBox
            reset={resetIsValid}
            noteList={noteList}
            setNoteList={setNoteList}
            setResetIsValid={setResetIsValid}
            id="3"
            img={note3}
          ></NoteBox>
        </div>
        <img src={notepage} className={classes.noteimg}></img>
        <ReButton onClick={onClickReButtonHandler}></ReButton>
      </div>
      <UploadButton element={element}></UploadButton>
    </div>
  );
};

export default ThirdPage;
