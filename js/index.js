document.addEventListener("DOMContentLoaded", ()=> {
const limit = "?_limit=50&_page="
let current = 1
const url = "http://localhost:3000/monsters/"
const container = document.getElementById("monster-container")
const createcontainer = document.getElementById("create-monster")

//create form to fill out in HTML
const createForm = document.createElement('form')
createForm.id = "monster-form"
createForm.innerHTML = `<input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button id="monster-create">Create</button>`
createcontainer.append(createForm)


async function loadMonsters(){
    pageValue = current.toString()
    let resp = await fetch(url + limit + current)
    let data = await resp.json()
    data.map(monster => renderMonster(monster))
}

async function addMonster(obj){
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    }
    const res = await fetch(url, settings)
    const data = await res.json()
    return data;
}

function renderMonster(monster){
    let li = document.createElement("div");
    li.id = monster.id
    li.innerHTML = `<h3>${monster.name}</h3>
    <p>Age: ${monster.age}</p>
    <p><small>Bio: ${monster.description} </small><p>`;
    container.appendChild(li)
}

function changePage(dirID){
    if (dirID === "forward"){
        current++;
        loadMonsters()
    }else{
        if(current < 2){ 
            loadMonsters()
        }else{
            current--;
            loadMonsters()
        }
    }
}

document.addEventListener('click', e =>{
    //listen for back button and forward button.
    if (e.target.matches("#back")){
        let dirID = "back"
        changePage(dirID)
    }
    if (e.target.matches("#forward")){
        let dirID = "forward"
        changePage(dirID)
    }
    if (e.target.matches("#monster-create")){ //Important condition! the click event is storing each click, thus creating muliple submits
        const monsterForm = document.getElementById("monster-form")
        monsterForm.addEventListener('submit', e => {
         e.preventDefault();
         let name = monsterForm.querySelector("#name").value
         let age = monsterForm.querySelector("#age").value
         let description= monsterForm.querySelector("#description").value  
         let newMonster = {'name': name, 'age': age, 'description': description} 
         addMonster(newMonster);
        
        })
    }

})


//invoke on DOM load
loadMonsters()

})