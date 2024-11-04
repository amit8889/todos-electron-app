const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inputBtn = document.getElementById("input-btn");
let isUpated = false,currentId = null;

  function addTask(){
    if(inputBox.value === ''){
        alert("You must write something")
        return;
    }
    if(isUpated){
        updateTodos(inputBox.value,currentId)
        return;
    }
    const todos = getTodsData() || []
    const value ={value:inputBox.value,id:todos.length}
    createList(value)
    inputBox.value='';
    todos.push(value)
    setTodosData([todos]);
} 
function showTask(){
    const data = getTodsData()
    if(data){
        for(let val of data){
            if(val.value){
                createList(val)
            }
          
        }
    }
}

function getTodsData(){
    let data =   localStorage.getItem("data");
    console.log(data)
    if(data && data != undefined && data != "undefined"){
        return JSON.parse(data);
    } 
    return null;
}
function setTodosData(data){
    localStorage.setItem("data",JSON.stringify(data))
}



function createList(val){
    let li=document.createElement("li");
    li.innerHTML= val.value;
    li.setAttribute("id",val.id)
    listContainer.prepend(li);
    li.addEventListener("click", () => editTask(li));
}

function editTask(list){
    console.log(list.id)
    console.log(list.textContent)
    inputBtn.innerHTML = 'Update'
    inputBox.value = list.textContent;
    isUpated = true;
    currentId = list.id;
}

function updateTodos(value,id){
    const selectedList = document.getElementById(id);
    if(selectedList){
        // update it
        selectedList.textContent = value;
        const data = getTodsData()
        data[id].value = value;
        setTodosData(data)
        isUpated = false;
        currentId = null;
        inputBtn.innerHTML = 'Add'
        inputBox.value = ''

    }
}
showTask();
