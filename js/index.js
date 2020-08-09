
const url  = "http://localhost:3000/monsters/?"
const limit = 80;
let page = 1;
document.addEventListener("DOMContentLoaded", e => {
    


//fetches the monsters and saves the array to a variable on page load
function fetchMonsters(page=1){fetch(`${url}_limit=${limit}&_page=${page}`)
    .then(res => res.json())
    .then(monsters => renderMonsters(monsters))
}
       

// create a render function that only renders 50 monster objects at a time
function renderMonsters(monsters){
    const monsterContainer = document.getElementById("monster-container")
    
    monsters.forEach(monster => {
    const monsterDiv = document.createElement("div")
     monsterDiv.innerHTML =  
        `<h2>Name: ${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Description ${monster.description}</p>`

    monsterContainer.appendChild(monsterDiv)
    })
}

function createMonster(monsterInfo){
       const name = monsterInfo.name.value
       const age = monsterInfo.age.value
       const description =  monsterInfo.description.value
   
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
      };
    
    fetch(url, configObj)
    .then(res => {
        if(res.status === 201){
            alert("Your Monster has been created! Nice")
        } else if (res.status !== 201) {
            alert("uht ohh, something went wrong, try again or refresh your browser")
        }
    })
    .catch(err => {
        alert(err)
    })
}

//form

const formContainer = document.createElement("div")
formContainer.classList.add("create-monster-form")
document.querySelector("#create-monster").appendChild(formContainer)
formContainer.innerHTML = 
`<form>
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" placeholder="Jakem..."><br><br><br>
  <label for="age">Age:</label><br>
  <input type="text" id="age" age="age" placeholder="33 years..."><br><br><br>
  <label for="description">Description:</label><br>
  <input type="text" id="description" description="description" placeholder="Has hideous teeth:)..."><br><br>
  <input type="submit" id="create-monster" value="Create a new Monster">
</form>`



//event delegation for buttons and form 
function clickHandler(){
document.addEventListener("click", e=>{
    
    if(e.target.matches("#forward")){
        let monsterKids = document.querySelector("#monster-container")
        Array.from(monsterKids.children).forEach(child => child.remove())

        page += 1
        fetchMonsters(page)
    } else if(e.target.matches("#back")){

        let monsterKids = document.querySelector("#monster-container")
        Array.from(monsterKids.children).forEach(child => child.remove())
        page -= 1
        fetchMonsters(page)
    } 
});

}

function submitHandler(){
    document.addEventListener("submit", e =>{
        if(e.target.matches("form")){
        createMonster(e.target) 
       
        }
    });

}


submitHandler()
fetchMonsters()
clickHandler() 



});



// Objective 1    
// Fetch all the monsters and save it to an array  
// create a render function that only renders 50 monster objects at a time
// Objective 2
// 