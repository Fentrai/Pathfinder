import React,{useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../components/Navbar';
import Grid from '../components/Grid';
import { themeContext } from '../utils/context';

function Application() {
  const [start, setStart] = useState(""); 
 
  const updateStart = (cell) => {
    setStart(cell);
  }
  return (
    <themeContext.Provider value={{
      startpoint:start,
      updateStartPoint:updateStart
    }}>
        <Navbar />
        <Grid />
    </themeContext.Provider>
  );
}

export default Application;
