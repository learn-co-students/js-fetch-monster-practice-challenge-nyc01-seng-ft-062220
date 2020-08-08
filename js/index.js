
document.addEventListener("DOMContentLoaded", function(e) {

    //global variables
    const createButton = document.querySelector(".start-form")
    const url = "http://localhost:3000/monsters/?_limit=20&_page="
    let pageNumber = 1
    //functions
    function createMonster(monster) {
        const monstersBox = document.querySelector("#monster-container")
        const monsterBox = document.createElement("div")
        const name = monster.name
        const age = monster.age
        const description = monster.description
        const id = monster.id
        
        monsterBox.innerHTML = `
        <h3>Name: ${name}</h3>
        <p>Age: ${age}</p>
        <p>Description: ${description}</p>
        `

        monstersBox.append(monsterBox)
    }

    function renderMonsters() {
        fetch(url + pageNumber)
        .then(res => res.json())
        .then(res => res.forEach(monster => createMonster(monster)))

        
    }



    //events

    createButton.addEventListener("click", function(event){
        const button = event.target
        
        
        if (button.innerText === "Create Monster") {
            const newform = document.createElement("form")
            newform.innerHTML = `
            <br>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
    
            <label for="age">Age:</label>
            <input type="text" id="age" name="age" />
    
            <label for="Description">Description:</label>
            <input type="text" id="description" name="description" />
            
            <input type="submit" id="submit"/>
            `
    
            button.insertAdjacentElement("afterend", newform)
            button.innerText = "Hide Form"
        } else {
            button.innerText = "Create Monster"
            let deleteForm = document.querySelector("form")
            deleteForm.remove()
        }

    })



    document.addEventListener("submit", function(event) {
       let submitButton = event.target
        event.preventDefault()

        let newName = document.querySelector("#name").value
        let newAge = document.querySelector("#age").value
        let newDescription = document.querySelector("#description").value

         const newMonster = {
             name: newName,
             age: newAge,
             description: newDescription
         }

         let options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newMonster)
         }

         fetch(url, options)
         .then(res => res.json())
         .then(res => createMonster(newMonster))

         let clearForm = document.querySelector("form")
         clearForm.reset()
    })


    function next() {
        const nextButton = document.getElementById("forward")

        nextButton.addEventListener("click", function(event){
            pageNumber = parseInt(pageNumber) + 1
            
            fetch(url + pageNumber)
            .then(res => res.json())
            .then(res => res.forEach(monster => createMonster(monster)))
            console.log(pageNumber)
        })
    }

    function previous() {
        const previousButton = document.getElementById("back")

        previousButton.addEventListener("click", function(event){
            if (parseInt(pageNumber) > 1) {
                pageNumber = parseInt(pageNumber) - 1
                
                fetch(url + pageNumber)
                .then(res => res.json())
                .then(res => res.forEach(monster => createMonster(monster)))
                console.log(pageNumber)
            }
        })
        
    }





    renderMonsters()
    next()
    previous()
});