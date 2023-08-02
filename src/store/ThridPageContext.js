import React from 'react';

const ThirdPageContext = React.createContext({
  imageList: [],
  setImageList: () => {},
  noteSavedList: { note1: [], note2: [], note3: [] },
  setNoteSavedList: () => {},
});

export default ThirdPageContext;
