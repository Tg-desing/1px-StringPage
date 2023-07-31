import React from 'react';

const NoteContext = React.createContext({
  noteList: { note1: [], note2: [], note3: [] },
  setNoteList: () => {},
});

export default NoteContext;
