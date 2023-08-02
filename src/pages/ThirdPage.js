import React, { useEffect, useRef, useState, useContext } from 'react';

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
import { storage } from '../firebase/firebase';
import Calender from '../components/Calender';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import ImageContext from '../store/ThridPageContext';
import SaveButton from '../components/SaveButton';

const ThirdPage = () => {
  const [resetIsValid, setResetIsValid] = useState(false);
  const [noteList, setNoteList] = useState({ note1: [], note2: [], note3: [] });
  const [noteSavedList, setNoteSavedList] = useState({
    note1: [],
    note2: [],
    note3: [],
  });
  //save 버튼을 눌렀는가
  const [saveIsValid, setSaveIsValid] = useState(false);
  const [imageList, setImageList] = useState([]);

  const element = useRef();

  useEffect(() => {
    //db에서
    const tempImageList = [];
    const imageRef = ref(storage, 'images');
    listAll(imageRef)
      .then((result) => {
        result.items.forEach((itemRef) => {
          getDownloadURL(itemRef)
            .then((url) => {
              tempImageList.push(`${url}`);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setImageList(tempImageList);

    //db에서 json파일 받아오기
    const jsonRef = ref(storage, 'json/noteboard-data.json');
    getDownloadURL(jsonRef)
      .then((url) => fetch(url, { mode: 'no-cors' }))
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNoteSavedList(data);
      })
      .catch((e) => console.log('Error occurred during json download', e));
  }, []);

  const onClickReButtonHandler = () => {
    setNoteList({ note1: [], note2: [], note3: [] });
    setResetIsValid(true);
  };

  //save button눌렀을 때,
  const onClickSaveButtonHandler = (e) => {
    setSaveIsValid(true);
    setResetIsValid(true);
  };

  return (
    <ImageContext.Provider
      value={{
        imageList: imageList,
        setImageList: setImageList,
        noteSavedList: noteSavedList,
        setNoteSavedList: setNoteSavedList,
      }}
    >
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
              saveIsValid={saveIsValid}
              setSaveIsValid={setSaveIsValid}
            ></NoteBox>
            <NoteBox
              reset={resetIsValid}
              noteList={noteList}
              setNoteList={setNoteList}
              setResetIsValid={setResetIsValid}
              id="2"
              img={note2}
              saveIsValid={saveIsValid}
              setSaveIsValid={setSaveIsValid}
            ></NoteBox>
            <NoteBox
              reset={resetIsValid}
              noteList={noteList}
              setNoteList={setNoteList}
              setResetIsValid={setResetIsValid}
              id="3"
              img={note3}
              saveIsValid={saveIsValid}
              setSaveIsValid={setSaveIsValid}
            ></NoteBox>
          </div>
          <img src={notepage} className={classes.noteimg}></img>
          <ReButton onClick={onClickReButtonHandler}></ReButton>
        </div>
        <UploadButton element={element}></UploadButton>
        <SaveButton onClick={onClickSaveButtonHandler}></SaveButton>
      </div>
    </ImageContext.Provider>
  );
};

export default ThirdPage;
