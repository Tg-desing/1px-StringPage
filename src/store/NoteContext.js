import React from 'react';

const NoteContext = React.createContext({
  noteSavedList: { note1: [], note2: [], note3: [] },
  setNoteSavedList: () => {},
});

export default NoteContext;
