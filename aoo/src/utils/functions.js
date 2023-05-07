
const colorMap = {
    "start" : "#32CD32",
    "end" : "#EE4B2B",
    "blocker" : "#3a3b38",
    "found" : "#0000ff",
    "visited" : "#A020F0",
    "recursive" : "#f0f5ab"
}

let found = false;

export const changeState = (id, state) => {
    const element = document.getElementById(id);
    element.style.backgroundColor = colorMap[state];
    element.setAttribute("data-type", state);
}

export const clearCell = (id) => {
    const element = document.getElementById(id);
    element.style.backgroundColor = 'transparent';
    element.setAttribute("data-type", 'empty');
}

export const resetBoard = () =>{
    for(let i = 0; i<20; i++){
        for(let x = 0; x<30; x++){
            const element = document.getElementById(`${i}-${x}`);
            element.setAttribute("data-type", 'empty');
            element.style.backgroundColor = 'transparent';
        }
    }
    found = false;
}

export const resetBlockers = () =>{
    for(let i = 0; i<20; i++){
        for(let x = 0; x<30; x++){
            const element = document.getElementById(`${i}-${x}`);
            if(element.getAttribute("data-type") === "blocker"){
                clearCell(`${i}-${x}`);
            }
        }
    }
}

export const BFS = async(point) =>{
    console.log("running")
    const nodeList = [];
    nodeList.push(point);
    while(nodeList.length > 0){
        await timeOut(1);
        const id = nodeList.shift()
        const element = document.getElementById(id);
        if(element === null){
            continue;
        }
        const type = element.getAttribute("data-type")
        if(type === "visited" || type === "blocker"){
            continue;
        }

        if(type === "end"){
            found = true
            element.setAttribute("data-type", "found")
            element.style.backgroundColor = colorMap["found"]
            return
        }
    
        element.setAttribute("data-type", "visited")
        element.style.backgroundColor = (type === "start")? colorMap["start"] : colorMap["visited"];

        const row = parseInt(id.substring(0, id.indexOf('-')));
        const column = parseInt(id.substring(id.indexOf("-") + 1, id.length));

        const left = `${row}-${column-1}`;
        const right = `${row}-${column+1}`;
        const up = `${row-1}-${column}`;
        const down = `${row+1}-${column}`;
        nodeList.push(left)
        nodeList.push(right)
        nodeList.push(up)
        nodeList.push(down)
    }
    
}

export const DFS = async(point) =>{
    console.log('going', point);
    if(found === true){
        return
    }
    await timeOut(10);

    const element = document.getElementById(point);
    if(element === null){
        return
    }
    
    const type = element.getAttribute("data-type")
    if(type === "visited" || type === "blocker"){
        return
    }

    if(type === "end"){
        found = true
        element.setAttribute("data-type", "found")
        element.style.backgroundColor = colorMap["found"]
        return
    }

    element.setAttribute("data-type", "visited")
    element.style.backgroundColor = (type === "start")? colorMap["start"] : colorMap["visited"];

    const row = parseInt(point.substring(0, point.indexOf('-')));
    const column = parseInt(point.substring(point.indexOf("-") + 1, point.length));
    //console.log(row, column)
    const left = `${row}-${column-1}`;
    const right = `${row}-${column+1}`;
    const up = `${row-1}-${column}`;
    const down = `${row+1}-${column}`;
    await DFS(up);
    await DFS(right);
    await DFS(down);
    await DFS(left);

    if(found === false){
        element.style.backgroundColor =(type === "start")? colorMap["start"] : colorMap["recursive"];
    }
    return
}

const timeOut = (delay) =>{
    return new Promise( res => setTimeout(res ,delay));
}

