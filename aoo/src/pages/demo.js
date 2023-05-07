import React,{useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../components/Navbar';

function demo() {

    const quoteList= [];

    const [text, setText] = useState("");
    const [users, setUsers] = useState(0);
    const handleClick = () => {
        setUsers(users+1);
        console.log(users);
    }
    useEffect(() => {
        setText(`There are ${users} users logged onto the site`);
    }, [])

    useEffect(() => {
        setText(`There are ${users} users logged onto the site`);
    }, [users, setUsers])
  return (
    <>
        <Navbar name={"Ishan"} quote={"First React"}/>
        <div>{text}</div>
        <h3 style = {{cursor: "pointer"}} onClick={handleClick}>Login</h3>
    </>
  );
}

export default demo;
