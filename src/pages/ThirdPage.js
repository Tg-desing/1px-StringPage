import React, { useEffect, useRef, useState } from 'react';

import classes from './ThirdPage.module.css';
import title from '../img/title.svg';
import notepage from '../img/notepage.svg';

import note1 from '../img/note1.svg';
import note2 from '../img/note2.svg';
import note3 from '../img/note3.svg';
import NoteBox from '../components/NoteBox';
// import ReButton from '../components/ReButton';
import UploadButton from '../components/UploadButton';
import { storage } from '../firebase/firebase';
import Calender from '../components/Calender';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import NoteContext from '../store/NoteContext';
import ImageContext from '../store/ImageContext';
import SaveButton from '../components/SaveButton';
import StringLayer from '../components/StringLayer';

const ThirdPage = () => {
  const [resetIsValid, setResetIsValid] = useState(false);
  const [noteList, setNoteList] = useState({
    note1: [],
    note2: [],
    note3: [],
  });
  const [noteSavedList, setNoteSavedList] = useState({
    note1: [],
    note2: [],
    note3: [],
  });
  const [isDropValid, setIsDropValid] = useState(false);
  //save 버튼을 눌렀는가
  const [saveIsValid, setSaveIsValid] = useState(false);
  const [imageList, setImageList] = useState([]);

  const element = useRef();

  useEffect(() => {
    //db에서 이미지 뽑아오기
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
      .then((url) => fetch(url))
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNoteSavedList(data);
      })
      .catch((e) => console.log('Error occurred during json download', e));
  }, []);

  // const onClickReButtonHandler = () => {
  //   setNoteList({ note1: [], note2: [], note3: [] });
  //   setResetIsValid(true);
  // };

  //save button눌렀을 때,
  const onClickSaveButtonHandler = (e) => {
    setSaveIsValid(true);
    setResetIsValid(true);
  };

  const onDragOverHandler = (e) => {
    e.preventDefault();
    setIsDropValid(true);
  };

  return (
    <NoteContext.Provider
      value={{
        noteSavedList: noteSavedList,
        setNoteSavedList: setNoteSavedList,
      }}
    >
      <ImageContext.Provider
        value={{ imageList: imageList, setImageList: setImageList }}
      >
        <div className={classes['background']}>
          <div className={classes.page}>
            <img src={title} alt={'title'} className={classes.title}></img>
            <Calender />
            <StringLayer />
            <div className={classes.notepage} ref={element}>
              <div className={classes['note-container']}>
                <NoteBox
                  resetIsValid={resetIsValid}
                  noteList={noteList}
                  setNoteList={setNoteList}
                  setResetIsValid={setResetIsValid}
                  img={note1}
                  id="1"
                  saveIsValid={saveIsValid}
                  setSaveIsValid={setSaveIsValid}
                  isDropValid={isDropValid}
                  setIsDropValid={setIsDropValid}
                ></NoteBox>
                <NoteBox
                  resetIsValid={resetIsValid}
                  noteList={noteList}
                  setNoteList={setNoteList}
                  setResetIsValid={setResetIsValid}
                  id="2"
                  img={note2}
                  saveIsValid={saveIsValid}
                  setSaveIsValid={setSaveIsValid}
                  isDropValid={isDropValid}
                  setIsDropValid={setIsDropValid}
                ></NoteBox>
                <NoteBox
                  resetIsValid={resetIsValid}
                  noteList={noteList}
                  setNoteList={setNoteList}
                  setResetIsValid={setResetIsValid}
                  id="3"
                  img={note3}
                  saveIsValid={saveIsValid}
                  setSaveIsValid={setSaveIsValid}
                  isDropValid={isDropValid}
                  setIsDropValid={setIsDropValid}
                ></NoteBox>
              </div>
              <div
                className={classes['img-div']}
                id="drag-on"
                onDragOver={onDragOverHandler}
              >
                <img
                  src={notepage}
                  className={classes.noteimg}
                  alt="note"
                ></img>
                {/* <ReButton onClick={onClickReButtonHandler}></ReButton> */}
              </div>
              <p className={classes.text}>
                음표를 붙인 후 체크 버튼을 꼭 눌러주세요!{' '}
              </p>
              <SaveButton onClick={onClickSaveButtonHandler}></SaveButton>
              <UploadButton element={element}></UploadButton>
            </div>
          </div>
        </div>
      </ImageContext.Provider>
    </NoteContext.Provider>
  );
};

export default ThirdPage;
