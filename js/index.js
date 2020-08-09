// deliverable 1
 
document.addEventListener("DOMContentLoaded",  loadAllMonsters(), loadForm() )

function loadAllMonsters(nextPage) {
    
fetch("http://localhost:3000/monsters/?_limit=5&_page=" + nextPage)
.then(resp => resp.json())
.then(monsters => {monsters.forEach(mon => {loadMonster(mon) } 
) } ) 
}

function loadMonster(mon) {
    let container = document.querySelector("#monster-container")
    let p = document.createElement("p")
    p.innerHTML = `${mon.name}<br> ${mon.age} <br> ${mon.description} <br> id: ${mon.id}`
    container.appendChild(p) }

//deliverable 2

function loadForm() {
let div = document.querySelector("#create-monster")
let form = document.createElement("form")
form.innerHTML  = 
`<label> Name: </label>
 <input type="text" name="name">
 <label> Age:</label>
 <input type="number" name="age"> 
 <label> Bio:</label>
<input type="text" name="description">
<input type="submit" value="Create Monster">`
div.appendChild(form)
}

let form = document.querySelector('form')

form.addEventListener("submit", function(e) {e.preventDefault() 
let name = e.target.name.value
let age = e.target.age.value
console.log(age)
let description = e.target.description.value
let newMonster = {name: name,  age: age, description: description}

loadMonster(newMonster)
fetch("http://localhost:3000/monsters", {
method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify(newMonster)
    } )
})



// deliverable 3 (not correct: "forward" button loads 5 more monsters )
 
let back = document.querySelector("#back");
back.addEventListener("click", function(){loadPreviousPage()} )
function loadPreviousPage() {nextPage = nextPage - 1; loadAllMonsters(nextPage)
}



let forward = document.querySelector("#forward");
forward.addEventListener("click", function(){loadNextPage()} )

let nextPage = 1
function loadNextPage() {nextPage = nextPage + 1 ; loadAllMonsters(nextPage) 
}


 
