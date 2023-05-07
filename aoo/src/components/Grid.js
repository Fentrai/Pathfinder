import React,{useState, useEffect, useRef, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import { changeState,clearCell, resetBoard, resetBlockers } from '../utils/functions';
import { themeContext } from '../utils/context';

function Grid(props) {
  const grid = [];
  const context = useContext(themeContext);
  for(let i = 0; i<20; i++){
    const columns = []
    for(let x = 0; x<30; x++){
      columns.push(`${i}-${x}`);
    }
    grid.push(columns);
  }

  const [startpoint, setStart] = useState(false);
  const [endpoint, setEnd] = useState(false);
  const [cellState, setCellState] = useState("start");
  const [mouseDown, setMouse] = useState(false);

  const handleClick = (cell) => {
    if(cellState == "start"){
      if(startpoint) {
        clearCell(startpoint);
      }
      changeState(cell, cellState);
      setStart(cell);
      context.updateStartPoint(cell);
   }   
   if(cellState == "end"){
    if(endpoint){
      clearCell(endpoint)
    }
    changeState(cell, cellState);
    setEnd(cell);
   }
  }

  const setBlocker = (cell) => {
    if(cell != startpoint && cell != endpoint){
      changeState(cell, cellState);
    }
  }
  const handleMouseEnter = (cell) => {
    if (!mouseDown || cellState != "blocker"){
      return;
    }
    setBlocker(cell);
  }

  return (
    <section className="w-full bg-green-200 h-full pt-8">
      <div className="flex justify-between items-center max-w-[600px] mx-auto mb-10">
        <h3 className="button min-w-[100px] text-center" onClick={()=> setCellState("start")}>Set Start</h3>
        <h3 className="button min-w-[100px] text-center" onClick={()=> setCellState("blocker")}>Set Blocker</h3>
        <h3 className="button min-w-[100px] text-center" onClick={()=> setCellState("end")}>Set Endpoint</h3>
      </div>
      <table className="max-w-[900px] mx-auto h-auto">
        <tbody>
          {
            grid.map(cols => {
              return(
                <tr className="cell-wrapper">
                  {
                    cols.map(cell => {
                      return(
                        <td id={cell} data-type="empty" onMouseDown={()=>setMouse(true)} onMouseUp={()=>setMouse(false)} onMouseEnter={()=>handleMouseEnter(cell)} onClick={() => handleClick(cell)} className="w-[25px] h-[25px] border border-solid border-black">
                          
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-x-10 mx-auto mb-20">
          <h2 className="pt-10 cursor-pointer" onClick={() => resetBoard()}>Reset Board</h2>
          <h2 className="pt-10 cursor-pointer" onClick={() => resetBlockers()}>Reset Blockers</h2>
      </div>
      <div className="h-[1px]">
        
      </div>
    </section>
  );
}        

export default Grid;
