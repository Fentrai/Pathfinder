import React,{useState, useEffect, useRef, useContext} from 'react';
import {DFS, BFS} from "../utils/functions"
import { themeContext } from '../utils/context';
import ReactDOM from 'react-dom/client';

function Navbar(props) {

  const [subMenu, setMenu] = useState("hidden");
  const [algo, setAlgo] = useState("DFS");
  const context = useContext(themeContext);
  const startAlgo = () => {
    if(algo == "DFS"){
      DFS(context.startpoint);
    }else{
      BFS(context.startpoint);
    }
  }
  return (
    <>
      <div className="w-full h-[80px] bg-blue-400 flex items-center">
        <div className="flex justify-between items-center w-full px-8">
          <h1 className="m-0 text-white text-4xl p-0">Pathfinder</h1>
          <div>
            <p onClick={() => startAlgo()} className="text-blue-400 bg-white p-3 rounded-lg hover:scale-110 hover:text-black cursor-pointer hover:font-semibold">
                Visualize
            </p>
          </div>
          <div className="relative">
            <p onMouseOver={() => setMenu("block")} className='text-default text-white hover:underline'>
              Algorithms
              <div onMouseLeave={() => setMenu("hidden")} className={`${subMenu} right-[2%] top-10 absolute w-full bg-white p-4 rounded-lg text-center`}>
                <p onClick={() => setAlgo("DFS")} className="inline-block cursor-pointer px-2 pb-3 hover:underline text-black">DFS</p>
                <p onClick={() => setAlgo("BFS")} className="inline-block cursor-pointer px-2 pb-3 hover:underline text-black">BFS</p>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
