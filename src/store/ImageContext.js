import React from 'react';

const ImageContext = React.createContext({
  imageList: [],
  setImageList: () => {},
});

export default ImageContext;
